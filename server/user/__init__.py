from flask import Blueprint
from config import create_app
from flask_restful import Api
from .routes import Users, UserId
app = create_app()
api = Api(app)

user_blueprint = Blueprint('user', __name__)
api = Api(user_blueprint)

api.add_resource(Users, '/users')
api.add_resource(UserId, '/users/<int:id>')

__all__ = ['user_blueprint']