from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from api.models import db, BusinessProfile, Service
from . import services


def get_current_business():
    current_user_id = get_jwt_identity()

    business = BusinessProfile.query.filter_by(
        user_id=current_user_id
    ).first()

    return business


@services.route("/", methods=["GET"])
@jwt_required()
def get_services():
    business = get_current_business()

    if not business:
        return jsonify({"error": "Business profile not found"}), 404

    services_list = Service.query.filter_by(
        business_id=business.id).all()

    return jsonify({"services": [service.serialize() for service in services_list]}), 200


@services.route("/", methods=["POST"])
@jwt_required()
def create_service():
    business = get_current_business()

    if not business:
        return jsonify({"error": "Business profile not found"}), 404

    data = request.get_json() or {}

    name = data.get("name", "").strip()
    description = data.get("description", "").strip()
    price = data.get("price")
    duration_minutes = data.get("duration_minutes")

    if not name or price is None or duration_minutes is None:
        return jsonify({
            "error": "name, price and duration_minutes are required"
        }), 400

    try:
        price = float(price)
    except (TypeError, ValueError):
        return jsonify({
            "error": "price must be a number"
        }), 400

    if price <= 0:
        return jsonify({
            "error": "price must be greater than 0"
        }), 400

    try:
        duration_minutes = int(duration_minutes)
    except (TypeError, ValueError):
        return jsonify({
            "error": "duration_minutes must be a number"
        }), 400

    if duration_minutes <= 0:
        return jsonify({
            "error": "duration_minutes must be greater than 0"
        }), 400

    if duration_minutes > 480:
        return jsonify({
            "error": "duration_minutes cannot be greater than 480"
        }), 400

    new_service = Service(
        business_id=business.id,
        name=name,
        description=description,
        price=price,
        duration_minutes=duration_minutes,
        status=True
    )

    db.session.add(new_service)
    db.session.commit()

    return jsonify({
        "message": "Service created successfully",
        "service": new_service.serialize()
    }), 201


@services.route("/<int:service_id>", methods=["PUT"])
@jwt_required()
def update_service(service_id):
    business = get_current_business()

    if not business:
        return jsonify({"error": "Business profile not found"}), 404

    service = Service.query.filter_by(
        id=service_id,
        business_id=business.id
    ).first()

    if not service:
        return jsonify({"error": "Service not found"}), 404

    data = request.get_json() or {}

    if "name" in data:
        service.name = data.get("name", "").strip()

    if "description" in data:
        service.description = data.get("description", "").strip()

    if "price" in data:
        service.price = data.get("price")

    if "duration_minutes" in data:
        service.duration_minutes = data.get("duration_minutes")

    if "status" in data:
        service.status = data.get("status")

    db.session.commit()

    return jsonify({
        "message": "Service updated successfully",
        "service": service.serialize()
    }), 200


