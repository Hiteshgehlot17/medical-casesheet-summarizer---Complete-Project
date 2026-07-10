import os
import fitz
from paddleocr import PaddleOCR

IMAGE_FOLDER = "uploads/images"

os.makedirs(IMAGE_FOLDER, exist_ok=True)

# Initialize OCR model only once
ocr = PaddleOCR(
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False,
    lang="en"
)


def pdf_to_images(pdf_path: str):
    pdf_document = fitz.open(pdf_path)

    image_paths = []

    for page_number in range(len(pdf_document)):
        page = pdf_document.load_page(page_number)

        pix = page.get_pixmap(
            matrix=fitz.Matrix(2, 2)
        )

        image_path = os.path.join(
            IMAGE_FOLDER,
            f"page_{page_number + 1}.png"
        )

        pix.save(image_path)

        image_paths.append(image_path)

    pdf_document.close()

    return image_paths


def extract_text(image_paths):

    extracted_text = ""

    for image in image_paths:

        result = ocr.predict(image)

        if not result:
            continue

        for page in result:

            if "rec_texts" not in page:
                continue

            for text in page["rec_texts"]:
                extracted_text += text + "\n"

    return extracted_text