from flask import Flask, request, jsonify
from services.gemini_service import classify_intent, generate_reply
from flask import render_template
from storage import save_log
from storage import get_logs

app = Flask(__name__)

@app.route("/process-email", methods=["POST"])
def process_email():
    data = request.get_json()

    sender = data.get("sender")
    message = data.get("message")

    if not sender or not message:
        return jsonify({"error": "sender and message are required"}), 400

    intent = classify_intent(message)
    reply = generate_reply(intent, message)

    response = {
        "sender": sender,
        "message": message,
        "intent": intent,
        "reply": reply
    }

    save_log(sender, message, intent, reply)

    return jsonify(response), 200

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@app.route("/ui-process", methods=["POST"])
def ui_process():
    sender = request.form.get("sender")
    message = request.form.get("message")

    intent = classify_intent(message)
    reply = generate_reply(intent, message)

    result = {
        "sender": sender,
        "message": message,
        "intent": intent,
        "reply": reply
    }

    save_log(sender, message, intent, reply)

    return render_template("index.html", result=result)

@app.route("/logs")
def logs():
    logs = get_logs()
    logs.reverse()  # latest first
    return render_template("logs.html", logs=logs)

if __name__ == "__main__":
    app.run(debug=True)
