from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from api.models import db, User, ClientProfile, BusinessProfile, FavoriteBusiness
from api.favorites import favorites


def get_current_client():
    user_id = get_jwt_identity()

    client = ClientProfile.query.filter_by(user_id=user_id).first()

    if not client:
        return None

    return client


@favorites.route("/business", methods=["GET"])
@jwt_required()
def get_favorite_businesses():
    client = get_current_client()

    if not client:
        return jsonify({"msg": "Client profile not found"}), 404

    favorites_list = FavoriteBusiness.query.filter_by(client_id=client.id).all()

    return jsonify({
        "favorites": [favorite.serialize() for favorite in favorites_list]
    }), 200


@favorites.route("/business/<int:business_id>", methods=["POST"])
@jwt_required()
def add_favorite_business(business_id):
    client = get_current_client()

    if not client:
        return jsonify({"msg": "Client profile not found"}), 404

    business = BusinessProfile.query.get(business_id)

    if not business:
        return jsonify({"msg": "Business not found"}), 404

    existing_favorite = FavoriteBusiness.query.filter_by(
        client_id=client.id,
        business_id=business_id
    ).first()

    if existing_favorite:
        return jsonify({"msg": "Business already in favorites"}), 400

    favorite = FavoriteBusiness(
        client_id=client.id,
        business_id=business_id
    )

    db.session.add(favorite)
    db.session.commit()

    return jsonify({
        "msg": "Business added to favorites",
        "favorite": favorite.serialize()
    }), 201


@favorites.route("/business/<int:business_id>", methods=["DELETE"])
@jwt_required()
def remove_favorite_business(business_id):
    client = get_current_client()

    if not client:
        return jsonify({"msg": "Client profile not found"}), 404

    favorite = FavoriteBusiness.query.filter_by(
        client_id=client.id,
        business_id=business_id
    ).first()

    if not favorite:
        return jsonify({"msg": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"msg": "Business removed from favorites"}), 200