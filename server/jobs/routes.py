from config import create_app,db
from flask_restful import Resource, Api
from models import User, Job, Application, Category
from flask import jsonify, request, make_response, session, url_for, redirect

class Jobs(Resource):
    def get(self):
        jobs = [job.to_dict() for job in Job.query.all()]
        return jsonify(jobs)
    
    def post(self):
        data=request.get_json()
        user_id = data.get('user_id')
        title = data.get('title')
        details = data.get('details')
        category_id= data.get('category_id')
        
        skills = data.get('skills')
        
        new_job=Job(
            user_id=user_id,
            title=title,
            details=details,
            category_id=category_id,
            skills=skills
        )
        db.session.add(new_job)
        db.session.commit()
        
class JobId(Resource):
    def get(self, id):
        job = Job.query.get_or_404(id)
        return jsonify(job.to_dict())
    
    
    def delete(self, id):
        job = Job.query.get_or_404(id)
        db.session.delete(job)
        db.session.commit()
        return make_response(jsonify({'message': 'Job deleted successfully'}), 204)