# AI-Based Internship Certificate Verifier (Fair & Startup-Friendly)

## 🚀 Overview
The **AI-Based Internship Certificate Verifier** is a submission-ready hackathon project designed to tackle the growing problem of fraudulent internship certificates in a fair and transparent manner. Unlike traditional methods that may be biased against startups, virtual internships, or NGOs, this tool uses pattern analysis and multi-document consistency checks to provide an **Authenticity Confidence Score**.

## 🧠 The Problem
Colleges and recruiters often struggle to verify certificates. Many genuine students from startups or virtual internships are unfairly doubted, while professional certificate generators produce realistic but fake templates (often using tools like Canva). 

## 💡 The Solution
This application uses **OCR (Optical Character Recognition)** to extract text and analyzes it against known fraudulent patterns and phrases. Key features include:
- **No Company-Name Bias**: Every organization is treated as valid.
- **Confidence-Based Scoring**: Outputs a score (0-100) instead of a binary "Fake/Real".
- **Multi-Doc Consistency**: Optionally cross-references the certificate with an offer letter.
- **Privacy First**: Works offline/locally with no reliance on cloud APIs or paid services.

## 🛠️ Tech Stack
- **Backend**: Python + Flask
- **OCR**: pytesseract + Pillow
- **Frontend**: Clean HTML5 & CSS3 (Modern, Responsive UI)
- **Data**: Local JSON-based phrase detection

## 📊 Scoring Logic Table
| Factor | Impact on Score | Description |
| :--- | :--- | :--- |
| Base Score | +85 | Starting confidence for a legible document. |
| Scam Phrases | -20 per phrase | Detection of phrases like "Instant Certificate" or "Buy Now". |
| Missing Fields | -5 per field | Absence of critical info (e.g., Duration, Date, Intern Name). |
| Doc Consistency | -30 | Mismatch in name or dates between cert and offer letter. |
| Supplementary Doc | +10 | Bonus for providing a consistent offer/joining letter. |

## 🏁 Future Scope
- **Blockchain Integration**: Issuing certificates as NFTs for immutable verification.
- **Advanced NER**: Using Spacy or NLTK for more accurate name/entity extraction.
- **Template Signature Analysis**: Comparing digital signatures and watermarks.

## ⚙️ How to Run Locally
1. **Prerequisites**:
   - Install Tesseract OCR binary on your system.
   - Install Python 3.11+.

2. **Installation**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Execution**:
   ```bash
   python app.py
   ```
   The app will be available at `http://localhost:5000`.

---
*Developed for Hackathon submission with a focus on fairness, scalability, and clean code.*
