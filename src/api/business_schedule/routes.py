from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, BusinessProfile, BusinessWorkingSchedule
from . import business_schedule


@business_schedule.route("/me", methods=["GET"])
@jwt_required()
def get_my_business_schedule():
    user_id = get_jwt_identity()

    profile = BusinessProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"msg": "Business profile not found"}), 404

    schedule = BusinessWorkingSchedule.query.filter_by(
        business_profile_id=profile.id
    ).first()

    if not schedule:
        return jsonify({"msg": "Business working schedule not found"}), 404

    return jsonify({
        "schedule": schedule.serialize()
    }), 200


@business_schedule.route("/", methods=["POST"])
@jwt_required()
def create_or_update_business_schedule():
    user_id = get_jwt_identity()

    profile = BusinessProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"msg": "Business profile not found"}), 404

    data = request.get_json(silent=True)

    if not data:
        return jsonify({"msg": "Request body must be JSON"}), 400

    opening_time = data.get("opening_time", "").strip()
    closing_time = data.get("closing_time", "").strip()

    if not opening_time or not closing_time:
        return jsonify({"msg": "Opening time and closing time are required"}), 400

    if opening_time >= closing_time:
        return jsonify({"msg": "Closing time must be greater than opening time"}), 400

    try:
        schedule = BusinessWorkingSchedule.query.filter_by(
            business_profile_id=profile.id
        ).first()

        if schedule:
            schedule.opening_time = opening_time
            schedule.closing_time = closing_time
            message = "Business working schedule updated successfully"
        else:
            schedule = BusinessWorkingSchedule(
                business_profile_id=profile.id,
                opening_time=opening_time,
                closing_time=closing_time
            )
            db.session.add(schedule)
            message = "Business working schedule created successfully"

        db.session.commit()

        return jsonify({
            "msg": message,
            "schedule": schedule.serialize()
        }), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({
            "msg": "Internal server error",
            "error": str(error)
        }), 500
    
