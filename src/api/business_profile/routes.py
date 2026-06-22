from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, BusinessProfile

business_profile = Blueprint("business_profile", __name__)


@business_profile.route("/me", methods=["GET"])
@jwt_required()
def get_business_profile():
    user_id = get_jwt_identity()

    profile = BusinessProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not profile:
        return jsonify({
            "msg": "Business profile not found"
        }), 404

    return jsonify({
        "business_profile": profile.serialize()
    }), 200


@business_profile.route("/me", methods=["PUT"])
@jwt_required()
def update_business_profile():
    user_id = get_jwt_identity()

    profile = BusinessProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not profile:
        return jsonify({
            "msg": "Business profile not found"
        }), 404

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "msg": "Request body must be JSON"
        }), 400

    if "business_name" in data:
        profile.business_name = data["business_name"].strip()

    if "phone" in data:
        profile.phone = data["phone"].strip()

    if "category" in data:
        profile.category = data["category"].strip()

    if "country" in data:
        profile.country = data["country"].strip()

    if "province" in data:
        profile.province = data["province"].strip()

    if "city" in data:
        profile.city = data["city"].strip()

    if "postal_code" in data:
        profile.postal_code = data["postal_code"].strip()

    if "address" in data:
        profile.address = data["address"].strip()

    db.session.commit()

    return jsonify({
        "msg": "Business profile updated successfully",
        "business_profile": profile.serialize()
    }), 200