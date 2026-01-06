import pytesseract
from PIL import Image
import os

def extract_text(image_path):
    """
    Extracts text from an image using Tesseract OCR.
    In a real-world hackathon, this would require tesseract-ocr binary installed.
    """
    try:
        # Load the image
        img = Image.open(image_path)
        
        # Use pytesseract to extract text
        text = pytesseract.image_to_string(img)
        
        return text.strip()
    except Exception as e:
        print(f"Error during OCR: {e}")
        return ""

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF. Simplified for this hackathon project.
    In a full production app, you might use pdfplumber or PyMuPDF.
    """
    # For simplicity in this hackathon version, we assume image-based PDFs 
    # would be handled by converting pages to images first.
    # Here we just return a placeholder or use a basic library if available.
    return "Sample extracted text from PDF (requires pdf-to-image conversion for full OCR)"
