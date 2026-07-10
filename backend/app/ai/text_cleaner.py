import re


def clean_ocr_text(text: str) -> str:
    """
    Clean OCR text before sending it to Gemini.
    """

    # Normalize line endings
    text = text.replace("\r", "\n")

    # Remove extra spaces
    text = re.sub(r"[ \t]+", " ", text)

    # Remove multiple blank lines
    text = re.sub(r"\n\s*\n+", "\n", text)

    # Remove page numbers
    text = re.sub(r"Page\s*\d+", "", text, flags=re.IGNORECASE)

    # Remove image file names
    text = re.sub(r"page_\d+\.png", "", text)

    # Remove repeated dots
    text = re.sub(r"\.{2,}", ".", text)

    # Remove repeated dashes
    text = re.sub(r"-{2,}", "-", text)

    # Remove underscores
    text = re.sub(r"_+", "", text)

    # Remove OCR symbols
    text = re.sub(r"[■◆●•▪◦]", "", text)

    # Remove duplicate consecutive lines
    cleaned_lines = []
    previous = ""

    for line in text.split("\n"):
        line = line.strip()

        if not line:
            continue

        if line == previous:
            continue

        cleaned_lines.append(line)
        previous = line

    text = "\n".join(cleaned_lines)

    # Remove hospital headers that appear on every page
    unwanted_patterns = [
        r"VISWABHARATHI GENERAL HOSPITAL",
        r"GENERAL HOSPITAL",
        r"KURNOOL",
        r"CASE SHEETS",
        r"MR No",
        r"OP No",
        r"IP No",
    ]

    for pattern in unwanted_patterns:
        text = re.sub(
            pattern,
            "",
            text,
            flags=re.IGNORECASE
        )

    # Remove multiple blank lines again
    text = re.sub(r"\n{2,}", "\n", text)

    return text.strip()