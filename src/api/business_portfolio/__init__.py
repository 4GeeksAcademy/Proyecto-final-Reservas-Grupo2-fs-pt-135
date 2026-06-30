from flask import Blueprint

business_portfolio = Blueprint("business_portfolio", __name__)

from . import routes