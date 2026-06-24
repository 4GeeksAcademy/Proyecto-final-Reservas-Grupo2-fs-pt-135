from flask import Blueprint

business_profile = Blueprint("business_profile", __name__)

from . import routes