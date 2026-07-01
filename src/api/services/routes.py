from flask import Blueprint, request, jsonify
from datetime import datetime
from api.models import db, Service, Reservas, ClientProfile


reservas = Blueprint("reservas_api", __name__)


# --- RUTA PARA OBTENER UNA RESERVA POR ID ---
@reservas.route('/<int:id>', methods=['GET'])
def get_reserva(id):

    reserva = db.session.get(Reservas, id)

    if reserva is None:
        return jsonify({"msg": "Reserva no encontrada"}), 404

    return jsonify(reserva.serialize()), 200


# --- RUTA PARA OBTENER RESERVAS DE UN CLIENTE ---
@reservas.route('/client/<int:client_id>', methods=['GET'])
def get_reservas_by_client(client_id):

    client = db.session.get(ClientProfile, client_id)

    if client is None:
        return jsonify({"error": "Cliente no encontrado"}), 404

    reservas_cliente = Reservas.query.filter_by(client_id=client_id).all()

    return jsonify([
        reserva.serialize() for reserva in reservas_cliente
    ]), 200


# --- RUTA PARA CREAR UNA RESERVA ---
@reservas.route('', methods=['POST'])
def create_reserva():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No se enviaron datos"}), 400

    client_id = data.get("client_id")
    service_id = data.get("service_id")
    appointment_datetime = data.get("appointment_datetime")

    if not client_id or not service_id or not appointment_datetime:
        return jsonify({
            "error": "client_id, service_id y appointment_datetime son obligatorios"
        }), 400

    if not db.session.get(ClientProfile, client_id):
        return jsonify({"error": "Cliente no encontrado"}), 404

    if not db.session.get(Service, service_id):
        return jsonify({"error": "Servicio no encontrado"}), 404

    try:
        parsed_datetime = datetime.fromisoformat(appointment_datetime)
    except ValueError:
        return jsonify({
            "error": "appointment_datetime debe tener formato ISO. Ejemplo: 2026-07-01T17:00:00"
        }), 400

    nueva_reserva = Reservas(
        client_id=client_id,
        service_id=service_id,
        appointment_datetime=parsed_datetime,
        status=data.get("status", "Activa"),
        notes=data.get("notes", "")
    )

    db.session.add(nueva_reserva)
    db.session.commit()

    return jsonify(nueva_reserva.serialize()), 201


# --- RUTA PARA CANCELAR UNA RESERVA ---
@reservas.route('/<int:reserva_id>', methods=['DELETE'])
def delete_reserva(reserva_id):

    reserva = db.session.get(Reservas, reserva_id)

    if not reserva:
        return jsonify({"error": "Reserva no encontrada"}), 404

    reserva.status = "Cancelada"
    db.session.commit()

    return jsonify({
        "message": "Reserva cancelada",
        "reserva": reserva.serialize()
    }), 200