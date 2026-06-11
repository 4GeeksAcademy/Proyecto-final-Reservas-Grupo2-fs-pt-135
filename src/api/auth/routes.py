import re
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from api.models import db, User
from api.extensions import bcrypt

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
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
            name=name,
            phone=phone,
            password=bcrypt.generate_password_hash(password).decode("utf-8"),
            is_active=True
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "msg": "User created successfully",
            "user": new_user.serialize()
        }), 201

    except Exception:
        db.session.rollback()
        return jsonify({"msg": "Internal server error"}), 500
    
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
