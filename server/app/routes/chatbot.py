from flask import Blueprint, request, jsonify
from ..services.groq_client import get_bot_reply

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    reply = get_bot_reply(user_message)
    return jsonify({"reply": reply})
