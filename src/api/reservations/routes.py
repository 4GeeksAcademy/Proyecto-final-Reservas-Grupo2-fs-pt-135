from flask import request, jsonify
from datetime import datetime, timedelta

from api.models import db, Service, Reservas, ClientProfile, BusinessProfile,  BusinessWorkingSchedule
from . import reservations

from flask_jwt_extended import jwt_required, get_jwt_identity


@reservations.route('/business/me', methods=['GET'])
@jwt_required()
def get_my_business_reservations():
    user_id = int(get_jwt_identity())

    business = BusinessProfile.query.filter_by(user_id=user_id).first()

    if not business:
        return jsonify({"msg": "Business profile not found"}), 404

    services = Service.query.filter_by(business_id=business.id).all()
    service_ids = [service.id for service in services]

    if not service_ids:
        return jsonify({
            "reservations": []
        }), 200

    reservas = Reservas.query.filter(
        Reservas.service_id.in_(service_ids),
        Reservas.status != "Cancelada"
    ).all()

    return jsonify({
        "reservations": [reserva.serialize() for reserva in reservas]
    }), 200


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


@reservations.route("/availability", methods=["GET"])
def get_service_availability():
    service_id = request.args.get("service_id", "").strip()
    selected_date = request.args.get("date", "").strip()

    if not service_id or not selected_date:
        return jsonify({
            "msg": "service_id and date are required"
        }), 400

    if not service_id.isdigit():
        return jsonify({
            "msg": "service_id must be a number"
        }), 400

    try:
        selected_day = datetime.strptime(
            selected_date,
            "%Y-%m-%d"
        ).date()
    except ValueError:
        return jsonify({
            "msg": "date must use YYYY-MM-DD format"
        }), 400

    today = datetime.now().date()

    if selected_day < today:
        return jsonify({
            "msg": "Past dates are not allowed"
        }), 400

    service = db.session.get(Service, int(service_id))

    if not service or not service.status:
        return jsonify({
            "msg": "Service not found"
        }), 404

    schedule = BusinessWorkingSchedule.query.filter_by(
        business_profile_id=service.business_id
    ).first()

    if not schedule:
        return jsonify({
            "msg": "Business working schedule not found"
        }), 404

    opening_time = datetime.strptime(
        schedule.opening_time,
        "%H:%M"
    ).time()

    closing_time = datetime.strptime(
        schedule.closing_time,
        "%H:%M"
    ).time()

    opening_datetime = datetime.combine(
        selected_day,
        opening_time
    )

    closing_datetime = datetime.combine(
        selected_day,
        closing_time
    )

    existing_reservations = Reservas.query.filter(
        Reservas.service_id == service.id,
        Reservas.status != "Cancelada",
        db.func.date(Reservas.appointment_datetime) == selected_day
    ).all()

    occupied_ranges = []

    for reservation in existing_reservations:
        reservation_start = reservation.appointment_datetime

        reservation_end = reservation_start + timedelta(
            minutes=service.duration_minutes
        )

        occupied_ranges.append({
            "start": reservation_start,
            "end": reservation_end
        })

    available_times = []
    current_slot = opening_datetime
    now = datetime.now()

    while (
        current_slot + timedelta(
            minutes=service.duration_minutes
        )
        <= closing_datetime
    ):
        slot_end = current_slot + timedelta(
            minutes=service.duration_minutes
        )

        is_past = (
            selected_day == now.date()
            and current_slot <= now
        )

        overlaps = any(
            current_slot < occupied["end"]
            and slot_end > occupied["start"]
            for occupied in occupied_ranges
        )

        if not overlaps and not is_past:
            available_times.append(
                current_slot.strftime("%H:%M")
            )

        current_slot += timedelta(minutes=30)

    return jsonify({
        "service_id": service.id,
        "service_name": service.name,
        "duration_minutes": service.duration_minutes,
        "date": selected_date,
        "opening_time": schedule.opening_time,
        "closing_time": schedule.closing_time,
        "available_times": available_times
    }), 200


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
        appointment_datetime=datetime.fromisoformat(appointment_datetime.replace("Z", "+00:00")),
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
    user_id = int(get_jwt_identity())

    client = ClientProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not client:
        return jsonify({
            "msg": "Client profile not found"
        }), 404

    reservas = Reservas.query.filter(
        Reservas.client_id == client.id
    ).order_by(
        Reservas.appointment_datetime.desc()
    ).all()

    return jsonify({
        "reservations": [
            reserva.serialize()
            for reserva in reservas
        ]
    }), 200


@reservations.route('/<int:reserva_id>/cancel', methods=['PATCH'])
@jwt_required()
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


@reservations.route('/business/today', methods=['GET'])
@jwt_required()
def get_today_business_reservations():
    user_id = int(get_jwt_identity())

    business = BusinessProfile.query.filter_by(user_id=user_id).first()

    if not business:
        return jsonify({"msg": "Business profile not found"}), 404

    services = Service.query.filter_by(business_id=business.id).all()
    service_ids = [service.id for service in services]

    if not service_ids:
        return jsonify({
            "count": 0,
            "reservations": []
        }), 200

    today = datetime.now().date()

    reservas = Reservas.query.filter(
        Reservas.service_id.in_(service_ids),
        Reservas.status != "Cancelada",
        db.func.date(Reservas.appointment_datetime) == today
    ).all()

    return jsonify({
        "count": len(reservas),
        "reservations": [reserva.serialize() for reserva in reservas]
    }), 200
