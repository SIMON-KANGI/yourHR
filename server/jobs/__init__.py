
from flask import Blueprint
from config import create_app
from flask_restful import Api
from .routes import Jobs, JobId
app = create_app()
api = Api(app)

job_blueprint = Blueprint('job', __name__)
api = Api(job_blueprint)

api.add_resource(Jobs, '/jobs')
api.add_resource(JobId, '/jobs/<int:id>')


__all__ = ['job_blueprint']