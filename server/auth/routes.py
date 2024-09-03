from models import User
from flask import jsonify, request, make_response, session, url_for, redirect
from config import create_app
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies
app = create_app()
api = Api(app)
class Login(Resource):
    def post(self):
        if request.content_type != 'application/json':
            return jsonify({"error": "Content-Type must be application/json"}), 415
        
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        app.logger.info(f"Recieved Data: email={email} ,password={password}")
        user = User.query.filter_by(email=email).first()
        
        try:
            if user and user.check_password(password):
                access_token = create_access_token(identity={'user': user.id,})
                refresh_token = create_refresh_token(identity={'user': user.id,})
                data={
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                     "user": user.to_dict()
                    }
                if data:
                    
                    return data
                
                else:
                    return jsonify({"error": "No user found"}), 404
            return jsonify({"message": "Invalid username or password"}), 401
        except Exception as e:
            print({"error": str(e)})
            return jsonify({"error": "An error occurred while processing your request"}), 500

api.add_resource(Login, '/login')

class UserToken(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return jsonify({'token': current_user}, 200)
    
    
class Logout(Resource):
    @jwt_required()
    def post(self):
        unset_jwt_cookies()
        return jsonify({"message": "Logged out successfully"}), 200
