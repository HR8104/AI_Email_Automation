import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def classify_intent(message: str) -> str:
    prompt = f"""
You are an AI assistant for a company.

Classify the following message into ONLY ONE category:
- lead
- support
- spam

Message:
{message}

Return ONLY one word: lead OR support OR spam.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text.strip().lower()


def generate_reply(intent: str, message: str) -> str:
    if intent == "lead":
        prompt = f"""
You are a sales assistant for an AI automation company.

Write a professional, friendly reply to a potential customer
who is interested in our AI services.

Customer message:
{message}

Reply in 3–4 sentences.
"""
    elif intent == "support":
        prompt = f"""
You are a customer support assistant.

Write a helpful and polite reply acknowledging the issue
and asking for any missing details if required.

Customer message:
{message}

Reply in 3–4 sentences.
"""
    else:
        prompt = f"""
Write a very short, polite reply declining the message.

Customer message:
{message}

Reply in 1–2 sentences.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text.strip()
