
from flask import Blueprint
from config import create_app
from flask_restful import Api
from .routes import Applications
app = create_app()
api = Api(app)

application_blueprint = Blueprint('apply', __name__)
api = Api(application_blueprint)

api.add_resource(Applications, '/applications')



__all__ = ['application_blueprint']