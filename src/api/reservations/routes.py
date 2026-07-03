from flask import request, jsonify
from datetime import datetime

from api.models import db, Service, Reservas, ClientProfile
from . import reservations

from flask_jwt_extended import jwt_required, get_jwt_identity


@reservations.route('/<int:id>', methods=['GET'])
def get_reserva(id):
    reserva = db.session.get(Reservas, id)

    if reserva is None:
        return jsonify({"msg": "Reserva no encontrada"}), 404

    return jsonify(reserva.serialize()), 200


@reservations.route('/client/<int:client_id>', methods=['GET'])
def get_reservas_by_client(client_id):
    client = db.session.get(ClientProfile, client_id)

    if client is None:
        return jsonify({"error": "Cliente no encontrado"}), 404

    reservas_cliente = Reservas.query.filter_by(client_id=client_id).all()

    return jsonify([reserva.serialize() for reserva in reservas_cliente]), 200


@reservations.route('', methods=['POST'])
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

    nueva_reserva = Reservas(
        client_id=client_id,
        service_id=service_id,
        appointment_datetime=datetime.fromisoformat(appointment_datetime),
        status=data.get("status", "Activa"),
        notes=data.get("notes", "")
    )

    db.session.add(nueva_reserva)
    db.session.commit()

    return jsonify(nueva_reserva.serialize()), 201


@reservations.route('/<int:reserva_id>', methods=['DELETE'])
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


@reservations.route('/me', methods=['GET'])
@jwt_required()
def get_my_reservations():
    user_id = get_jwt_identity()

    client = ClientProfile.query.filter_by(user_id=user_id).first()

    if not client:
        return jsonify({"msg": "Client profile not found"}), 404

    reservas = Reservas.query.filter(
        Reservas.client_id == client.id,
        Reservas.status != "Cancelada"
    ).limit(3).all()

    return jsonify({
        "reservations": [reserva.serialize() for reserva in reservas]
    }), 200


@reservations.route('/<int:reserva_id>/cancel', methods=['PATCH'])
def cancel_reserva(reserva_id):
    reserva = db.session.get(Reservas, reserva_id)

    if not reserva:
        return jsonify({"error": "Reserva no encontrada"}), 404

    if reserva.status != "Activa":
        return jsonify({"error": "Solo se pueden cancelar reservas activas"}), 400

    reserva.status = "Cancelada"
    db.session.commit()

    return jsonify({
        "message": "Reserva cancelada",
        "reserva": reserva.serialize()
    }), 200