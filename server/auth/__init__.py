from flask import Blueprint
from config import create_app
from flask_restful import Api
from .routes import Login, UserToken,Logout
app = create_app()
api = Api(app)

auth_blueprint = Blueprint('auth', __name__)
api = Api(auth_blueprint)

api.add_resource(Login, '/login')
api.add_resource(UserToken, '/token')
api.add_resource(Logout, '/logout')


__all__ = ['user_blueprint']