from flask import Flask
import os
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from dotenv import load_dotenv
import secrets

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
secret_key=secrets.token_hex(16)

def create_app():
    app=Flask(__name__)
    CORS(app,supports_credentials=True)
    app.config['SECRET_KEY']=secret_key
    app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///hr.db'
    app.config['JWT_SECRET_KEY']=secret_key
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    jwt=JWTManager(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    return app