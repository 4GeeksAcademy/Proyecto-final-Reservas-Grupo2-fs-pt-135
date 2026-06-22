from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, Service, Reservas, ClientProfile


reservas = Blueprint("reservas", __name__)



@reservas.route('/reserva', methods=['GET'])
@reservas.route('/<int:reserva_id>', methods=['GET'])
def get_reservas(reserva_id=None):
    if reserva_id:
        reserva = db.session.get(Reservas, reserva_id)
        if not reserva:
            return jsonify({"error": "Reserva no encontrada"}), 404
        return jsonify(reserva.serialize()), 200

    # Obtener todas las reservas
    lista_reservas = db.session.scalars(db.select(Reservas)).all()
    return jsonify([r.serialize() for r in lista_reservas]), 200


@reservas.route('/reserva', methods=['POST'])
def create_reserva():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se proporcionaron datos"}), 400

    client_id = data.get('client_id')
    service_id = data.get('service_id')

    if not client_id or not service_id:
        return jsonify({"error": "Faltan campos obligatorios: client_id y service_id"}), 400

    # Validaciones de existencia en la DB
    client_exists = db.session.get(ClientProfile, client_id)
    service_exists = db.session.get(Service, service_id)

    if not client_exists:
        return jsonify({"error": f"El cliente con id {client_id} no existe"}), 404
    if not service_exists:
        return jsonify({"error": f"El servicio con id {service_id} no existe"}), 404

    nueva_reserva = Reservas(
        client_id=client_id,
        service_id=service_id,
        status=data.get('status', 'pendiente'),
        notes=data.get('notes')
    )

    try:
        db.session.add(nueva_reserva)
        db.session.commit()
        return jsonify({"message": "Reserva creada con éxito", "reserva": nueva_reserva.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al procesar la solicitud", "details": str(e)}), 500


@reservas.route('/<int:reserva_id>', methods=['PUT'])
def update_reserva(reserva_id):
    reserva = db.session.get(Reservas, reserva_id)
    if not reserva:
        return jsonify({"error": "Reserva no encontrada"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No se proporcionaron datos para actualizar"}), 400

    if 'status' in data:
        reserva.status = data['status']
    if 'notes' in data:
        reserva.notes = data['notes']
        
    if 'service_id' in data:
        if not db.session.get(Service, data['service_id']):
            return jsonify({"error": "El nuevo servicio no existe"}), 404
        reserva.service_id = data['service_id']
        
    if 'client_id' in data:
        if not db.session.get(ClientProfile, data['client_id']):
            return jsonify({"error": "El nuevo cliente no existe"}), 404
        reserva.client_id = data['client_id']

    try:
        db.session.commit()
        return jsonify({"message": "Reserva actualizada con éxito", "reserva": reserva.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar", "details": str(e)}), 500


@reservas.route('/<int:reserva_id>', methods=['DELETE'])
def delete_reserva(reserva_id):
    reserva = db.session.get(Reservas, reserva_id)
    if not reserva:
        return jsonify({"error": "Reserva no encontrada"}), 404

    try:
        # Por defecto aplicamos el borrado lógico (actualizar estatus)
        reserva.status = "cancelada"
        db.session.commit()
        return jsonify({"message": "Reserva cancelada con éxito", "reserva": reserva.serialize()}), 200

        # Si en el futuro quieres borrado físico, sustituye las 4 líneas de arriba por:
        # db.session.delete(reserva)
        # db.session.commit()
        # return jsonify({"message": "Reserva eliminada permanentemente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al procesar la cancelación", "details": str(e)}), 500