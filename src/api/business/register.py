@business.route("/register", methods=["POST"])
def register_business():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({"msg": "Request body must be JSON"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    business_name = data.get("business_name", "").strip()
    phone = data.get("phone", "").strip()
    address = data.get("address", "").strip()

    if not all([
        email,
        password,
        business_name,
        phone,
        address
    ]):
        return jsonify({"msg": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"msg": "Email already exists"}), 400

    try:

        user = User(
            email=email,
            password=bcrypt.generate_password_hash(password).decode("utf-8"),
            name=business_name,
            phone=phone,
            role="business"
        )

        db.session.add(user)
        db.session.flush()

        new_business = Business(
            user_id=user.id,
            business_name=business_name,
            address=address
        )

        db.session.add(new_business)

        db.session.commit()

        return jsonify({
            "msg": "Business created successfully",
            "business": new_business.serialize()
        }), 201

    except Exception:
        db.session.rollback()
        return jsonify({"msg": "Internal server error"}), 500