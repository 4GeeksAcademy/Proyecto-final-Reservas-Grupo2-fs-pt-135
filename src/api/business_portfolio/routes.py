from flask import Blueprint, request, jsonify
from api.models import db, BusinessProfile, BusinessPortfolio
import cloudinary.uploader

business_portfolio = Blueprint("business_portfolio", __name__)


def upload_image(file, folder):
    result = cloudinary.uploader.upload(file, folder=folder)
    return result["secure_url"]

# ----------------------------------------------------------------------------------
# BUSINESS PORTFOLIO
# ----------------------------------------------------------------------------------

@business_portfolio.route("/", methods=["POST"])
def create_portfolio():

    business_profile_id = request.form.get("business_profile_id")
    description = request.form.get("description")
    logo = request.files.get("logo")

    if not business_profile_id:
        return jsonify({"msg": "business_profile_id is required"}), 400

    business = BusinessProfile.query.get(business_profile_id)

    if not business:
        return jsonify({"msg": "Business not found"}), 404

    existing_portfolio = BusinessPortfolio.query.filter_by(
        business_profile_id=business_profile_id
    ).first()

    if existing_portfolio:
        return jsonify({"msg": "Portfolio already exists"}), 400

    try:

        logo_url = None

        if logo:
            logo_url = upload_image(logo, "business_portfolio")

        new_portfolio = BusinessPortfolio(
            business_profile_id=business_profile_id,
            logo_url=logo_url,
            description=description
        )

        db.session.add(new_portfolio)
        db.session.commit()

        return jsonify({
            "msg": "Portfolio created successfully",
            "portfolio": new_portfolio.serialize()
        }), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "msg": "Internal server error",
            "error": str(e)
        }), 500


@business_portfolio.route("/<int:business_profile_id>", methods=["GET"])
def get_portfolio(business_profile_id):

    portfolio = BusinessPortfolio.query.filter_by(
        business_profile_id=business_profile_id
    ).first()

    if not portfolio:
        return jsonify({
            "msg": "Portfolio not found"
        }), 404

    return jsonify(portfolio.serialize()), 200


@business_portfolio.route("/<int:business_profile_id>", methods=["PATCH"])
def update_portfolio(business_profile_id):

    portfolio = BusinessPortfolio.query.filter_by(
        business_profile_id=business_profile_id
    ).first()

    if not portfolio:
        return jsonify({
            "msg": "Portfolio not found"
        }), 404

    data = request.form
    logo = request.files.get("logo")

    if logo:
        portfolio.logo_url = upload_image(
            logo,
            "business_portfolio"
        )

    if "description" in data:
        portfolio.description = data["description"]

    db.session.commit()

    return jsonify({
        "msg": "Portfolio updated successfully",
        "portfolio": portfolio.serialize()
    }), 200

