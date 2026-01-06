def calculate_score(analysis_results, consistency_issues, has_offer_letter):
    """
    Calculates a confidence score from 0 to 100.
    """
    score = 85  # Base score for a document that passes basic OCR
    reasons = []

    # Penalize for scam phrases
    scam_count = len(analysis_results.get("found_scam_phrases", []))
    if scam_count > 0:
        penalty = scam_count * 20
        score -= penalty
        reasons.append(f"Found {scam_count} common scam/fraudulent phrases.")

    # Penalize for missing fields
    missing_count = len(analysis_results.get("missing_fields", []))
    if missing_count > 0:
        penalty = missing_count * 5
        score -= penalty
        reasons.append(f"Missing critical fields: {', '.join(analysis_results['missing_fields'])}.")

    # Consistency issues are a major red flag
    if consistency_issues:
        score -= 30
        reasons.extend(consistency_issues)

    # Bonus for providing an offer letter that matches
    if has_offer_letter and not consistency_issues:
        score += 10
        reasons.append("Verification boosted by consistent supplementary documents.")

    # Ensure score is within 0-100
    score = max(0, min(100, score))

    # Determine status
    if score >= 75:
        status = "High Confidence"
        color = "success"
    elif score >= 40:
        status = "Medium Confidence"
        color = "warning"
    else:
        status = "Low Confidence"
        color = "danger"

    return {
        "score": score,
        "status": status,
        "color": color,
        "reasons": reasons if reasons else ["No major red flags detected."]
    }
