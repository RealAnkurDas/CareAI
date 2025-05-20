from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    from .routes.chatbot import chatbot_bp
    app.register_blueprint(chatbot_bp)

    with app.app_context():
        from . import database
        database.init_db()
        database.seed_data()

    return app