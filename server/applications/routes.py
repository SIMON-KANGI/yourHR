from config import create_app,db
from flask_restful import Resource, Api
from models import User, Job, Application, Category
from flask import jsonify, request, make_response, session, url_for, redirect
import cloudinary
from cloudinary import uploader
import cloudinary.api
import os
import requests
from dotenv import load_dotenv

app=create_app()
api = Api(app)
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)

class Applications(Resource):
    def get(self):
        applications=Application.query.all()
        return jsonify([app.to_dict() for app in applications])
    
    def post(self):
        data= request.get_json()
        user_id =data.get('user_id')
        job_id = data.get('job_id')
        status = data.get('status')
        letter = data.get('letter')
        file_to_upload = request.files.get('file')
        
        
        try:
            # Upload the file if it's a PDF
            if file_to_upload.mimetype == 'application/pdf':
                upload_result = uploader.upload(file_to_upload, resource_type='raw')
            else:
                return jsonify({"error": "Please upload a PDF file"}), 400
        except Exception as e:
            app.logger.error(f"Error uploading file: {e}")
            return ({"error": "An error occurred while uploading the file"}), 500

        # Get the file URL from the upload result
        file_url = upload_result.get('url')
        
        new_application=Application(
            user_id=user_id,
            job_id=job_id,
            status=status,
            letter=letter,
            resume=file_url,
           )
        db.session.add(new_application)
        db.session.commit()