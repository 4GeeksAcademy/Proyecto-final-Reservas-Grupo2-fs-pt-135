from flask import Blueprint

favorites = Blueprint("favorites", __name__)

from . import routes