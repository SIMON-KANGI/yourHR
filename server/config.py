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

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
import os

db = SQLAlchemy()
migrate = Migrate()
secret_key = os.getenv('SECRET_KEY', 'your-secret-key')

def create_app():
    app = Flask(__name__)
    
    # CORS configuration
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "https://your-hr-theta.vercel.app"}})
    
    app.config['SECRET_KEY'] = secret_key
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['JWT_SECRET_KEY'] = secret_key
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    jwt = JWTManager(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    return app
