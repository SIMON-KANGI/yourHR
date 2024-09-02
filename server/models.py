from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime
from sqlalchemy import JSON

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_only = ('username', 'email', 'role', 'skill', 'company')
    serialize_rules=()
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    role = db.Column(db.String(80), nullable=False)
    _password = db.Column(db.String(128), nullable=False)  # Renamed to avoid conflict with property
    skill = db.Column(db.String(128), nullable=False)
    category_id = db.Column(db.Integer, nullable=False)
    profile = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    last_login = db.Column(db.DateTime, nullable=True)
    company = db.Column(db.String(255), nullable=True)
    jobs = db.relationship('Job', backref='user', lazy=True)
    applications = db.relationship('Application', backref='user', lazy=True)

    @validates('username')
    def validate_username(self, key, value):
        if User.query.filter_by(username=value).first():
            raise ValueError('Username already exists')
        return value

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, plain_password_text):
        self._password = bcrypt.generate_password_hash(plain_password_text).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self._password, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile': self.profile,
            'role': self.role,
            'skill': self.skill,
            'is_active': self.is_active,
            'last_login': self.last_login,
            'company': self.company,
            'jobs': [job.to_dict() for job in self.jobs],
            'applications': [application.to_dict() for application in self.applications]
        }



class Job(db.Model, SerializerMixin):
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    skills = db.Column(JSON, nullable=False)  
    applications = db.relationship('Application', backref='job', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'details': self.details,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'skills': self.skills,
            'applications': [application.to_dict() for application in self.applications]
        }

class Application(db.Model, SerializerMixin):
    __tablename__ = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    application_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    letter = db.Column(db.String(1000), nullable=False)
    resume = db.Column(db.String(255), nullable=False)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'job_id', name='unique_application'),
    )
    
    def to_dict(self):
        user= User.query.filter(User.id==self.user_id).first()
        return {
            'id': self.id,
            'user_id': self.user_id,
            'job_id': self.job_id,
            'status': self.status,
            'application_date': self.application_date,
            'letter': self.letter,
            'resume': self.resume,
            'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        } if user else None 
        }

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    jobs = db.relationship('Job', backref='category', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'jobs': [job.to_dict() for job in self.jobs]
        }
