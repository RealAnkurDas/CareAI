def get_bot_reply(message):
    msg = message.lower()
    if "hello" in msg or "hi" in msg:
        return "Hello! How can I assist you today?"
    if "medication" in msg:
        return "Please check the Medications section for your full schedule."
    if "help" in msg:
        return "If you need urgent help, please press the 'Request Help' button."
    return "Thanks for your message! I'm here to help with your questions."
