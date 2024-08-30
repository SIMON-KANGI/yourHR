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
        applications = Application.query.all()
        return jsonify([app.to_dict() for app in applications])
    
    def post(self):
        # Ensure Content-Type is multipart/form-data
        if 'multipart/form-data' not in request.content_type:
            return jsonify({"error": "Content-Type must be multipart/form-data"}), 415

        # Extracting the file and form data
        file_to_upload = request.files.get('file')
        user_id = request.form.get('user_id')
        job_id = request.form.get('job_id')
        status = request.form.get('status')
        letter = request.form.get('letter')
        
        app.logger.info(
            f"Received Data: user_id={user_id}, job_id={job_id}, status={status}, letter={letter}"
        )

        # Check if the file is provided
        if not file_to_upload:
            return make_response({"error": "No file provided"}), 400

        try:
            # Upload the file if it's a PDF
            if file_to_upload.mimetype == 'application/pdf':
                upload_result = uploader.upload(file_to_upload, resource_type='raw')
                file_url = upload_result.get('url')
                app.logger.info(f"File uploaded successfully: {file_url}")
            else:
                return jsonify({"error": "Please upload a PDF file"}), 400
        except Exception as e:
            app.logger.error(f"Error uploading file: {e}")
            return jsonify({"error": "An error occurred while uploading the file"}), 500

        # Create a new application record
        new_application = Application(
            user_id=user_id,
            job_id=job_id,
            status=status,
            letter=letter,
            resume=file_url,
        )

        try:
            db.session.add(new_application)
            db.session.commit()
            return ({"message": "Application submitted successfully"}), 201
        except Exception as e:
            app.logger.error(f"Error saving application: {e}")
            db.session.rollback()
            return jsonify({"error": "An error occurred while saving the application"}), 500

class ApplicationId(Resource):
    def get(self, id):
        application = Application.query.get_or_404(id)
        return jsonify(application.to_dict())
    
    def delete(self, id):
        application= Application.query.get_or_404(id)
        db.session.delete(application)
        db.session.commit()