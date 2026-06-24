from flask import Blueprint

business_gallery = Blueprint("business_gallery", __name__)

from . import routes