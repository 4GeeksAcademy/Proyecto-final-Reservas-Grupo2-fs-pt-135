from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, ClientProfile
from . import client_profile

@client_profile.route("/me", methods=["GET"])
@jwt_required()
def get_client_profile():

    user_id = get_jwt_identity()

    profile = ClientProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not profile:
        return jsonify({
            "msg": "Client profile not found"
        }), 404

    return jsonify({
        "client_profile": profile.serialize()
    }), 200

@client_profile.route("/me", methods=["PUT"])
@jwt_required()
def update_client_profile():

    user_id = get_jwt_identity()

    profile = ClientProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not profile:
        return jsonify({
            "msg": "Client profile not found"
        }), 404

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "msg": "Request body must be JSON"
        }), 400

    if "name" in data:
        profile.name = data["name"].strip()

    if "phone" in data:
        profile.phone = data["phone"].strip()

    db.session.commit()

    return jsonify({
        "msg": "Client profile updated successfully",
        "client_profile": profile.serialize()
    }), 200