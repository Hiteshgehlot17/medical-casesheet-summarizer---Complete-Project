from app.ai.ocr_service import extract_text

images = [
    "uploads/images/page_1.png"
]

text = extract_text(images)

print(text)