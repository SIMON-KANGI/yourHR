from models import User
from flask import jsonify, request, session, url_for, redirect
from config import create_app, db
from flask_restful import Api, Resource
from authlib.integrations.flask_client import OAuth
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies

app = create_app()
api = Api(app)

# OAuth Configuration
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=app.config['GOOGLE_CLIENT_ID'],
    client_secret=app.config['GOOGLE_CLIENT_SECRET'],
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={'scope': 'openid profile email'},
)

# Google Login Resource
class GoogleLogin(Resource):
    def get(self):
        # This will redirect to Google OAuth login page
        redirect_uri = url_for('google_authorize', _external=True)
        return google.authorize_redirect(redirect_uri)
    
# Authorize endpoint where Google redirects after login
@app.route('/oauth/google/authorize')
def google_authorize():
    try:
        # Retrieve the access token after user authorizes
        token = google.authorize_access_token()
        user_info = google.get('userinfo').json()

        # Check if user exists, if not create a new user
        user = User.query.filter_by(email=user_info['email']).first()
        if not user:
            user = User(
                email=user_info['email'], 
                name=user_info['given_name'], 
                last_name=user_info['family_name']
            )
            db.session.add(user)
            db.session.commit()

        # Generate JWT tokens
        access_token = create_access_token(identity={'user': user.id})
        refresh_token = create_refresh_token(identity={'user': user.id})

        # Prepare response data
        data = {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": user.to_dict()  # Ensure user has a method to return JSON-friendly data
        }

        # Return tokens and user info to frontend
        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Adding GoogleLogin route to API
api.add_resource(GoogleLogin, '/oauth/google')

# Standard Login Resource for email/password auth
class Login(Resource):
    def post(self):
        if request.content_type != 'application/json':
            return jsonify({"error": "Content-Type must be application/json"}), 415
        
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()

        try:
            if user and user.check_password(password):
                access_token = create_access_token(identity={'user': user.id})
                refresh_token = create_refresh_token(identity={'user': user.id})
                data = {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "user": user.to_dict()
                }
                return jsonify(data)
            
            return jsonify({"message": "Invalid username or password"}), 401
        
        except Exception as e:
            return jsonify({"error": "An error occurred while processing your request"}), 500

api.add_resource(Login, '/login')

# Route to get the JWT token information
class UserToken(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return jsonify({'token': current_user})

api.add_resource(UserToken, '/user/token')

# Logout Resource to unset JWT cookies
class Logout(Resource):
    @jwt_required()
    def post(self):
        unset_jwt_cookies()
        return jsonify({"message": "Logged out successfully"}), 200

api.add_resource(Logout, '/logout')
