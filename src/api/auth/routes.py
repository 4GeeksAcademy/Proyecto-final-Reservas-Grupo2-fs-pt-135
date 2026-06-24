import re
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, ClientProfile, BusinessProfile, BusinessPortfolio, BusinessGallery, Category
from api.extensions import bcrypt
from . import auth

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
    category_ids = data.get("category_ids", [])
    country = data.get("country", "").strip()
    province = data.get("province", "").strip()
    city = data.get("city", "").strip()
    postal_code = data.get("postal_code", "").strip()
    address = data.get("address", "").strip()

    if not email or not password or not business_name or not phone or not category_ids or not country or not province or not city or not postal_code or not address:
        return jsonify({"msg": "All fields are required"}), 400

    if not isinstance(category_ids, list):
        return jsonify({"msg": "category_ids must be a list"}), 400

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

    categories = Category.query.filter(Category.id.in_(category_ids)).all()

    if len(categories) != len(category_ids):
        return jsonify({"msg": "One or more categories do not exist"}), 400

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
            country=country,
            province=province,
            city=city,
            postal_code=postal_code,
            address=address
        )

        new_business_profile.categories = categories

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

    business_profile_id = None

    if user.role == "business":
        business_profile = BusinessProfile.query.filter_by(user_id=user.id).first()
        business_profile_id = business_profile.id if business_profile else None

    return jsonify({
        "msg": "Login successful",
        "token": token,
        "user": user.serialize(),
        "business_profile_id": business_profile_id
    }), 200


@auth.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "user": user.serialize()
    }), 200