from config import create_app, db
from flask_restful import Api, Resource
from flask import request, jsonify, make_response, session, url_for, redirect
from models import User, Job, Application, Category 
from user import user_blueprint
from auth import auth_blueprint
from applications import application_blueprint
from jobs import job_blueprint
app = create_app()
api = Api(app)
@app.route('/')
def your_hr():
    return 'Hello HR!'

# Register the user blueprint
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(application_blueprint, url_prefix='/apply')
app.register_blueprint(job_blueprint, url_prefix='/job')

class Categories(Resource):
    def get(self):
        categories = Category.query.all()
        return jsonify([category.to_dict() for category in categories])
    
api.add_resource(Categories, '/categories')

if __name__ == '__main__':
    app.run(debug=True, port=5555)
