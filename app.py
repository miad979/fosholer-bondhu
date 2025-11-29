from flask import Flask, request, render_template
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# --- Load Model and Define Constants (Global Scope) ---
# This ensures the model is loaded only once when the app starts.
try:
    model = tf.keras.models.load_model('models/potato_disease_model.h5')
    # Define the class names from the training notebook
    CLASS_NAMES = ['Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight']
    # Define the expected image size
    IMG_SIZE = (224, 224)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return "Model not loaded. Please check server logs.", 500

    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']
    
    if file.filename == '':
        return "No selected file", 400
        
    if file:
        try:
            # 1. Read image from the request stream
            img_bytes = file.read()
            img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
            
            # 2. Preprocess the image for the model
            img = img.resize(IMG_SIZE)
            img_array = tf.keras.preprocessing.image.img_to_array(img)
            # Use the specific preprocessing for MobileNetV2
            img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
            img_array = tf.expand_dims(img_array, 0)  # Create a batch

            # 3. Make a prediction
            predictions = model.predict(img_array)
            
            # 4. Get the top prediction
            predicted_index = np.argmax(predictions[0])
            predicted_class = CLASS_NAMES[predicted_index]
            # Convert numpy float to a standard Python float for JSON serialization
            confidence = float(predictions[0][predicted_index]) 
            
            # 5. Format the class name for display
            display_label = predicted_class.replace("Potato___", "").replace("_", " ")

            # 6. Return the result as JSON
            return {
                "label": display_label,
                "probability": confidence
            }
        except Exception as e:
            print(f"Error during prediction: {e}")
            return "Error processing the image", 500
            
    return "Something went wrong", 500

if __name__ == '__main__':
    app.run(debug=True)
