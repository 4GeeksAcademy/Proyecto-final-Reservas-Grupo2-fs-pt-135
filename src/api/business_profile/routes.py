from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import (
    db,
    BusinessProfile,
    Category,
    BusinessPortfolio,
    BusinessWorkingSchedule,
    Service
)
from . import business_profile


@business_profile.route("/me", methods=["GET"])
@jwt_required()
def get_business_profile():
    user_id = get_jwt_identity()

    profile = BusinessProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"msg": "Business profile not found"}), 404

    return jsonify({"business_profile": profile.serialize()}), 200


@business_profile.route("/me", methods=["PUT"])
@jwt_required()
def update_business_profile():
    user_id = get_jwt_identity()

    profile = BusinessProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"msg": "Business profile not found"}), 404

    data = request.get_json(silent=True)

    if not data:
        return jsonify({"msg": "Request body must be JSON"}), 400

    if "business_name" in data:
        profile.business_name = data["business_name"].strip()

    if "phone" in data:
        profile.phone = data["phone"].strip()

    if "category_ids" in data:
        category_ids = data.get("category_ids", [])

        if not isinstance(category_ids, list):
            return jsonify({"msg": "category_ids must be a list"}), 400

        categories = Category.query.filter(Category.id.in_(category_ids)).all()

        if len(categories) != len(category_ids):
            return jsonify({"msg": "One or more categories do not exist"}), 400

        profile.categories = categories

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


@business_profile.route("/setup-status", methods=["GET"])
@jwt_required()
def get_business_setup_status():
    user_id = get_jwt_identity()

    profile = BusinessProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"msg": "Business profile not found"}), 404

    portfolio = BusinessPortfolio.query.filter_by(
        business_profile_id=profile.id
    ).first()

    working_schedule = BusinessWorkingSchedule.query.filter_by(
        business_profile_id=profile.id
    ).first()

    services_count = Service.query.filter_by(
        business_id=profile.id
    ).count()

    return jsonify({
        "business_profile_id": profile.id,
        "has_portfolio": portfolio is not None,
        "has_working_schedule": working_schedule is not None,
        "has_services": services_count > 0
    }), 200


@business_profile.route("/<int:business_profile_id>", methods=["GET"])
def get_public_business_profile(business_profile_id):
    profile = BusinessProfile.query.get(business_profile_id)

    if not profile:
        return jsonify({"msg": "Business profile not found"}), 404

    return jsonify({
        "business_profile": profile.serialize_search()
    }), 200


@business_profile.route("/search", methods=["GET"])
def search_business_profiles():
    city = request.args.get("city", "").strip()
    province = request.args.get("province", "").strip()
    category_id = request.args.get("category_id", "").strip()

    query = BusinessProfile.query

    if city:
        query = query.filter(BusinessProfile.city.ilike(f"%{city}%"))

    if province:
        query = query.filter(BusinessProfile.province.ilike(f"%{province}%"))

    if category_id:
        if not category_id.isdigit():
            return jsonify({"msg": "category_id must be a number"}), 400

        query = query.join(BusinessProfile.categories).filter(
            Category.id == int(category_id)
        )

    businesses = query.all()

    return jsonify(
        [business.serialize_search() for business in businesses]
    ), 200
