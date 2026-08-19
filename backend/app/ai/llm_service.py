import os
import json
import time
from pathlib import Path

from dotenv import load_dotenv
from google import genai

from backend.app.ai.prompt_templates import MEDICAL_SUMMARY_PROMPT


# Load backend/.env regardless of where the application is started
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")


# Get Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not configured")


# Create Gemini client
client = genai.Client(
    api_key=api_key
)


def summarize_medical_text(text):

    prompt = MEDICAL_SUMMARY_PROMPT.replace("{text}", text)

    print("\n========== PROMPT ==========\n")
    print(prompt[:1000])
    print("\n============================\n")

    models = [
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite"
    ]

    last_error = None

    for model in models:

        for attempt in range(3):

            try:

                print(
                    f"Trying model: {model} "
                    f"(attempt {attempt + 1}/3)"
                )

                response = client.models.generate_content(
                    model=model,
                    contents=prompt
                )

                print(
                    "\n========== GEMINI RESPONSE ==========\n"
                )

                print(response.text)

                print(
                    "\n=====================================\n"
                )

                result = json.loads(response.text)

                return result

            except Exception as e:

                last_error = e

                error_text = str(e)

                print(
                    f"Gemini error with {model}: "
                    f"{error_text}"
                )

                if (
                    "503" in error_text
                    or "UNAVAILABLE" in error_text
                    or "500" in error_text
                    or "502" in error_text
                    or "504" in error_text
                    or "429" in error_text
                    or "RESOURCE_EXHAUSTED" in error_text
                ):

                    wait_time = 2 ** attempt

                    print(
                        f"Retrying in {wait_time} seconds..."
                    )

                    time.sleep(wait_time)

                    continue

                if isinstance(e, json.JSONDecodeError):

                    print(
                        "Gemini returned invalid JSON."
                    )

                    raise

                raise

    print(
        "\n========== GEMINI FINAL ERROR ==========\n"
    )

    print(last_error)

    print(
        "\n========================================\n"
    )

    raise RuntimeError(
        "Gemini service is temporarily unavailable. "
        "Please try again later."
    )