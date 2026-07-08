from flask import Blueprint

business_schedule = Blueprint("business_schedule", __name__)

from . import routes