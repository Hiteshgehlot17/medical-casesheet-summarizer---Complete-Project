import os
import json

from dotenv import load_dotenv
from google import genai

from app.ai.prompt_templates import MEDICAL_SUMMARY_PROMPT

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def summarize_medical_text(text):

    prompt = MEDICAL_SUMMARY_PROMPT.replace("{text}", text)

    print("\n========== PROMPT ==========\n")
    print(prompt[:1000])
    print("\n============================\n")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    print("\n========== GEMINI RESPONSE ==========\n")
    print(response.text)
    print("\n=====================================\n")

    return json.loads(response.text)