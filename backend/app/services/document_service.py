import os
import shutil
import json

from app.ai.ocr_service import pdf_to_images, extract_text
from app.ai.text_cleaner import clean_ocr_text
from app.ai.llm_service import summarize_medical_text
from app.ai.chunker import chunk_text

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def save_uploaded_file(file):

    print("1. Saving uploaded file...")

    # Save uploaded PDF
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("2. PDF saved")

    # Convert PDF to Images
    images = pdf_to_images(file_path)
    print(f"3. PDF converted to {len(images)} images")

    # OCR
    raw_text = extract_text(images)

    # Clean OCR
    extracted_text = clean_ocr_text(raw_text)

    print(f"4. OCR completed ({len(extracted_text)} characters)")

    print("\n===== OCR Preview =====")
    print(extracted_text[:500])
    print("=======================\n")

    # Save OCR Text
    with open(
        "uploads/extracted_text.txt",
        "w",
        encoding="utf-8"
    ) as f:
        f.write(extracted_text)

    print("5. OCR text saved")

    # Split text into chunks
    chunks = chunk_text(extracted_text)

    print(f"Total Chunks: {len(chunks)}")

    summaries = []

    for i, chunk in enumerate(chunks):

        print(f"Processing Chunk {i + 1}/{len(chunks)}")

        chunk_summary = summarize_medical_text(chunk)

        summaries.append(chunk_summary)

    print("6. Gemini summary completed")

    # Save JSON Summary
    with open(
        "uploads/summary.json",
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            summaries,
            f,
            indent=4,
            ensure_ascii=False
        )

    print("7. Summary saved")

    return {
        "status": "success",
        "message": "Medical Case Sheet Processed Successfully",
        "pages": len(images),
        "characters": len(extracted_text),
        "chunks": len(chunks),
        "summary": summaries
    }