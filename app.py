from flask import Flask, render_template, request, redirect, url_for, flash
import os
from werkzeug.utils import secure_filename
from utils.ocr import extract_text
from utils.analyzer import analyze_text, check_consistency
from utils.scorer import calculate_score

app = Flask(__name__)
app.secret_key = "hackathon_secret_key"
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB limit

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/verify', methods=['POST'])
def verify():
    if 'certificate' not in request.files:
        flash("No certificate file uploaded")
        return redirect(request.url)
    
    cert_file = request.files['certificate']
    offer_file = request.files.get('offer_letter')

    if cert_file.filename == '':
        flash("No selected file")
        return redirect(request.url)

    if cert_file and allowed_file(cert_file.filename):
        cert_filename = secure_filename(cert_file.filename)
        cert_path = os.path.join(app.config['UPLOAD_FOLDER'], cert_filename)
        cert_file.save(cert_path)

        # Extract text from Certificate
        cert_text = extract_text(cert_path)
        
        offer_text = ""
        has_offer = False
        if offer_file and allowed_file(offer_file.filename):
            offer_filename = secure_filename(offer_file.filename)
            offer_path = os.path.join(app.config['UPLOAD_FOLDER'], offer_filename)
            offer_file.save(offer_path)
            offer_text = extract_text(offer_path)
            has_offer = True

        # Analyze
        analysis = analyze_text(cert_text)
        consistency = check_consistency(cert_text, offer_text)
        
        # Score
        result = calculate_score(analysis, consistency, has_offer)
        
        # Cleanup uploaded files (optional for production)
        # os.remove(cert_path)
        # if has_offer: os.remove(offer_path)

        return render_template('result.html', result=result)

    return redirect(url_for('index'))

if __name__ == '__main__':
    # Running on 0.0.0.0 to be accessible in various environments
    app.run(debug=True, host='0.0.0.0', port=5000)
