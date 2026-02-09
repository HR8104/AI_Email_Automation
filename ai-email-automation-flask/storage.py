import json
from datetime import datetime
from pathlib import Path

DATA_FILE = Path("data.json")


def save_log(sender, message, intent, reply):
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = []

    data.append({
        "sender": sender,
        "message": message,
        "intent": intent,
        "reply": reply,
        "timestamp": datetime.now().isoformat()
    })

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
        
def get_logs():
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []
