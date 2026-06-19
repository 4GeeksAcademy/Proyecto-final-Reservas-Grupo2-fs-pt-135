import re
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from api.models import db, User, ClientProfile, BusinessProfile, BusinessPortfolio, BusinessGallery
from api.extensions import bcrypt
import cloudinary.uploader

auth = Blueprint("auth", __name__)

def upload_image(file, folder):
    result = cloudinary.uploader.upload(file, folder=folder)
    return result["secure_url"]


@auth.route("/register/client", methods=["POST"])
def register_client():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"msg": "Request body must be JSON"}), 400

    email = data.get("email", "").strip().lower()
    name = data.get("name", "").strip()
    phone = data.get("phone", "").strip()
    password = data.get("password", "").strip()

    if not email or not name or not phone or not password:
        return jsonify({"msg": "All fields are required"}), 400

    email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.match(email_regex, email):
        return jsonify({"msg": "Invalid email format"}), 400

    if len(password) < 8:
        return jsonify({"msg": "Password must be at least 8 characters long"}), 400

    phone_regex = r"^\+?[0-9\s\-]{7,20}$"
    if not re.match(phone_regex, phone):
        return jsonify({"msg": "Invalid phone format"}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "Email already exists"}), 400

    try:
        new_user = User(
            email=email,
            password=bcrypt.generate_password_hash(password).decode("utf-8"),
            role="client",
            is_active=True
        )

        db.session.add(new_user)
        db.session.flush()

        new_client_profile = ClientProfile(
            user_id=new_user.id,
            name=name,
            phone=phone
        )

        db.session.add(new_client_profile)
        db.session.commit()

        return jsonify({
            "msg": "Client created successfully",
            "user": new_user.serialize(),
            "client_profile": new_client_profile.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "msg": "Internal server error",
            "error": str(e)
        }), 500


@auth.route("/register/business", methods=["POST"])
def register_business():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"msg": "Request body must be JSON"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()
    business_name = data.get("business_name", "").strip()
    phone = data.get("phone", "").strip()
    category = data.get("category", "").strip()
    country = data.get("country", "").strip()
    province = data.get("province", "").strip()
    city = data.get("city", "").strip()
    postal_code = data.get("postal_code", "").strip()
    address = data.get("address", "").strip()

    if not email or not password or not business_name or not phone or not category or not country or not province or not city or not postal_code or not address:
        return jsonify({"msg": "All fields are required"}), 400

    email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.match(email_regex, email):
        return jsonify({"msg": "Invalid email format"}), 400

    if len(password) < 8:
        return jsonify({"msg": "Password must be at least 8 characters long"}), 400

    phone_regex = r"^\+?[0-9\s\-]{7,20}$"
    if not re.match(phone_regex, phone):
        return jsonify({"msg": "Invalid phone format"}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "Email already exists"}), 400

    try:
        new_user = User(
            email=email,
            password=bcrypt.generate_password_hash(password).decode("utf-8"),
            role="business",
            is_active=True
        )

        db.session.add(new_user)
        db.session.flush()

        new_business_profile = BusinessProfile(
            user_id=new_user.id,
            business_name=business_name,
            phone=phone,
            category=category,
            country=country,
            province=province,
            city=city,
            postal_code=postal_code,
            address=address
        )

        db.session.add(new_business_profile)
        db.session.commit()

        return jsonify({
            "msg": "Business created successfully",
            "user": new_user.serialize(),
            "business_profile": new_business_profile.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "msg": "Internal server error",
            "error": str(e)
        }), 500


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"msg": "Request body must be JSON"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "Invalid email or password"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({
        "msg": "Login successful",
        "token": token,
        "user": user.serialize()
    }), 200

# ----------------------------------------------------------------------------------
# BUSINESS PORTFOLIO
# ----------------------------------------------------------------------------------

@auth.route("/business/portfolio", methods=["POST"])
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


@auth.route("/business/portfolio/<int:business_profile_id>", methods=["GET"])
def get_portfolio(business_profile_id):

    portfolio = BusinessPortfolio.query.filter_by(
        business_profile_id=business_profile_id
    ).first()

    if not portfolio:
        return jsonify({
            "msg": "Portfolio not found"
        }), 404

    return jsonify(portfolio.serialize()), 200


@auth.route("/business/portfolio/<int:business_profile_id>", methods=["PATCH"])
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


# ----------------------------------------------------------------------------------
# BUSINESS GALLERY
# ----------------------------------------------------------------------------------

@auth.route("/business/gallery", methods=["POST"])
def create_gallery_image():

    business_profile_id = request.form.get("business_profile_id")
    image = request.files.get("image")

    if not business_profile_id or not image:
        return jsonify({
            "msg": "business_profile_id and image are required"
        }), 400

    business = BusinessProfile.query.get(business_profile_id)

    if not business:
        return jsonify({
            "msg": "Business not found"
        }), 404

    images_count = BusinessGallery.query.filter_by(
        business_profile_id=business_profile_id
    ).count()

    if images_count >= 6:
        return jsonify({
            "msg": "Maximum 6 images allowed"
        }), 400

    image_url = upload_image(
        image,
        "business_gallery"
    )

    new_image = BusinessGallery(
        business_profile_id=business_profile_id,
        image_url=image_url
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify({
        "msg": "Image added successfully",
        "image": new_image.serialize()
    }), 201


@auth.route("/business/gallery/<int:business_profile_id>", methods=["GET"])
def get_gallery_images(business_profile_id):

    images = BusinessGallery.query.filter_by(
        business_profile_id=business_profile_id
    ).all()

    return jsonify({
        "business_profile_id": business_profile_id,
        "images": [image.serialize() for image in images]
    }), 200


@auth.route("/business/gallery/<int:image_id>", methods=["DELETE"])
def delete_gallery_image(image_id):

    image = BusinessGallery.query.get(image_id)

    if not image:
        return jsonify({
            "msg": "Image not found"
        }), 404

    db.session.delete(image)
    db.session.commit()

    return jsonify({
        "msg": "Image deleted successfully"
    }), 200


