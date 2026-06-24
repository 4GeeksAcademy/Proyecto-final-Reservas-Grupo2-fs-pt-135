from flask import jsonify
from api.models import Category
from . import categories


@categories.route("/", methods=["GET"])
def get_categories():
    categories_list = Category.query.filter_by(is_active=True).all()

    return jsonify(
        [category.serialize() for category in categories_list]
    ), 200