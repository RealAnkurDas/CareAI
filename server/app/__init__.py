from flask import Flask
from flask_cors import CORS
from .config import Config
from .database import db
from .routes.chatbot import chatbot_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    app.register_blueprint(chatbot_bp, url_prefix="/api")

    return app
