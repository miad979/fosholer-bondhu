from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return "No file part"
    file = request.files['file']
    if file.filename == '':
        return "No selected file"
    if file:
        # For now, we'll just return a placeholder prediction
        # In the future, we will process the image and use the model
        return "Prediction: Early Blight (Placeholder)"
    return "Something went wrong"

if __name__ == '__main__':
    app.run(debug=True)
