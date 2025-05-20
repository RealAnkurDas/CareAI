from flask import Blueprint, request, jsonify
from ..services.groq_client import call_groq_model

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    response = call_groq_model(message)
    return jsonify({"reply": response})