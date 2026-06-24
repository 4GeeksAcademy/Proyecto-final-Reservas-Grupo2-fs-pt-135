from flask import Blueprint

client_profile = Blueprint("client_profile", __name__)

from . import routes