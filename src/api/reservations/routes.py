from flask import request, jsonify

from api.models import db, Service, Reservas, ClientProfile
from . import reservations


# --- RUTA PARA OBTENER UNA RESERVA ---
@reservations.route('/<int:id>', methods=['GET'])
def get_reserva(id):

    reserva = db.session.get(Reservas, id)

    if reserva is None:
        return jsonify({"msg": "Reserva no encontrada"}), 404

    return jsonify(reserva.serialize()), 200


# --- RUTA PARA CREAR UNA RESERVA ---
@reservations.route('', methods=['POST'])
def create_reserva():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No se enviaron datos"
        }), 400

    client_id = data.get("client_id")
    service_id = data.get("service_id")

    if not client_id or not service_id:
        return jsonify({
            "error": "client_id y service_id son obligatorios"
        }), 400

    if not db.session.get(ClientProfile, client_id):
        return jsonify({
            "error": "Cliente no encontrado"
        }), 404

    if not db.session.get(Service, service_id):
        return jsonify({
            "error": "Servicio no encontrado"
        }), 404

    nueva_reserva = Reservas(
        client_id=client_id,
        service_id=service_id,
        status=data.get("status", "pendiente"),
        notes=data.get("notes", "")
    )

    db.session.add(nueva_reserva)
    db.session.commit()

    return jsonify(nueva_reserva.serialize()), 201


# --- RUTA PARA CANCELAR UNA RESERVA ---
@reservations.route('/<int:reserva_id>', methods=['DELETE'])
def delete_reserva(reserva_id):

    reserva = db.session.get(Reservas, reserva_id)

    if not reserva:
        return jsonify({
            "error": "Reserva no encontrada"
        }), 404

    reserva.status = "cancelada"
    db.session.commit()

    return jsonify({
        "message": "Reserva cancelada"
    }), 200