from . import db
from .models.user import User
from faker import Faker

fake = Faker()

def init_db():
    db.create_all()

def seed_data():
    if not User.query.first():
        for _ in range(5):
            user = User(name=fake.name())
            db.session.add(user)
        db.session.commit()
