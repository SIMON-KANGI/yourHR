from flask import jsonify, request, make_response, session, url_for, redirect
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from models import User, Category
from config import create_app, db
from dotenv import load_dotenv
import cloudinary
from cloudinary import uploader
import cloudinary.api
import os
import requests


cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)
load_dotenv()
app = create_app()
api = Api(app)



class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify(users)
    
    def post(self):
        data = request.form
        email = data.get('email')
        username = data.get('name')
        password = data.get('password')
        role = data.get('role')
        company=data.get('company')
        skill=data.get('skill')
        profile = data.get('profile')
        file_to_upload = request.files.get('file')
        category= Category.query.filter(Category.name== skill).first()
        print(skill)
        app.logger.info(
            f"Received Data: email={email}, username={username}, password={password}, role={role}, company={company}, skill={skill}, profile={profile}"
        )
        if User.query.filter_by(email=email).first():
            return make_response(jsonify({'error': 'Email already exists'}), 400)
        
        try:
            if profile == 'image':
                upload_result = uploader.upload(file_to_upload, resource_type='image')
            else:
                return make_response(jsonify({'error': 'Invalid profile type'}), 400)
        except Exception as e:
            app.logger.error(f"Error uploading file: {e}")
            return make_response(jsonify({'error': 'An error occurred while uploading the file'}), 500)
        file_url= upload_result.get('url')
        
        new_user=User(
            email=email,
            username=username,
            password=password,
            role=role,
            company=company,
            skill=skill,
            profile=file_url,
            category_id=category.id,
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify({'message': 'User created successfully'}), 201)
    
class UserId(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return jsonify(user.to_dict())
    
    def patch(self,id):
        user = User.query.get_or_404(id)
        data = request.get_json()
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return jsonify(user.to_dict())
    
    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    
