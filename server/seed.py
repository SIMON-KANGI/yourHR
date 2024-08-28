from app import app
from models import User, Job, Application,Category
from config import db

with app.app_context():
    print("Dropping all tables...")
    db.drop_all()
    print("Creating all tables...")
    db.create_all()
    
    user=[
        User(username="John Doe", email="john.doe@example.com", password_hash="secret", role="employee"),
        User(username="Jane Smith", email="jane.smith@example.com", password_hash="secret", role="employer")
    ]
    db.session.add_all(user)
    db.session.commit()
    
    
    category=[
        Category(name="Software Development"),
        Category(name="Marketing"),
        Category(name="Finance"),
        Category(name="Customer Service"),
        Category(name="Data Science"),
        Category(name="Product Management"),
        Category(name="Data Entry"),
        Category(name="Product Design"),
        Category(name="Quality Assurance")
    ]
    db.session.add_all(category)
    db.session.commit()
    
    jobs=[
        Job(title="Senior Software Engineer", details="Full-stack developer with experience in React, Node.js, and Python", user_id=1, category_id=1, skills={"React": 8, "Node.js": 7, "Python": 9}),
        Job(title="Product Manager", details="Lead the development of new products and services", user_id=2, category_id=6, skills={"Product Management": 10, "Leadership": 9})
    ]
    db.session.add_all(jobs)
    db.session.commit()