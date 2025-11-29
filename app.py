"""
Flask application for Potato Disease Prediction.
Provides a web interface for users to upload images and get disease predictions.
"""

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Placeholder prediction constants (to be replaced with ML model integration)
PLACEHOLDER_LABEL = 'Early Blight'
PLACEHOLDER_PROBABILITY = 0.84


@app.route('/')
def index():
    """Render the main page with the upload form."""
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    """
    Handle image upload and return disease prediction.
    
    Returns JSON with label and probability for the happy path.
    Currently returns placeholder values (no ML model integration yet).
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Placeholder prediction response
    # TODO: Integrate actual ML model for real predictions
    return jsonify({
        'label': PLACEHOLDER_LABEL,
        'probability': PLACEHOLDER_PROBABILITY
    })


if __name__ == '__main__':
    # NOTE: debug=True is for development only; disable in production
    app.run(debug=True)
