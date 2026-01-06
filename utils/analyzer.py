import json
import re
import os

def load_fake_phrases():
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'fake_phrases.json')
    with open(data_path, 'r') as f:
        return json.load(f)

def analyze_text(text, doc_type="certificate"):
    """
    Analyzes text for indicators of authenticity or lack thereof.
    """
    phrases = load_fake_phrases()
    results = {
        "found_scam_phrases": [],
        "found_generic_phrases": [],
        "missing_fields": [],
        "consistency_issues": []
    }

    # Check for scam phrases
    for phrase in phrases['scam_phrases']:
        if phrase.lower() in text.lower():
            results["found_scam_phrases"].append(phrase)

    # Check for generic phrases (not necessarily fake, but common in templates)
    for phrase in phrases['generic_phrases']:
        if phrase.lower() in text.lower():
            results["found_generic_phrases"].append(phrase)

    # Check for critical fields
    critical_fields = ["intern", "certificate", "completion", "duration", "date"]
    for field in critical_fields:
        if field.lower() not in text.lower():
            results["missing_fields"].append(field)

    return results

def check_consistency(cert_text, offer_text):
    """
    Compares certificate text with offer letter text for consistency.
    """
    if not cert_text or not offer_text:
        return []

    issues = []
    
    # Simple name matching (very basic for hackathon)
    # In a real app, you'd use NER (Named Entity Recognition)
    def extract_name(t):
        match = re.search(r"Mr\.|Ms\.|Mrs\.\s+([A-Z][a-z]+\s+[A-Z][a-z]+)", t)
        return match.group(1) if match else None

    cert_name = extract_name(cert_text)
    offer_name = extract_name(offer_text)

    if cert_name and offer_name and cert_name != offer_name:
        issues.append(f"Name mismatch: '{cert_name}' on cert vs '{offer_name}' on offer letter")

    return issues
