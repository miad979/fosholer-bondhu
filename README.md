# ফসলের বন্ধু (Fosholer Bondhu) - AI Agricultural Assistant

An AI-powered mobile application to help farmers in Bangladesh identify crop diseases and get treatment advice. This is an IDP project.

## 📊 Presentation

A professional PowerPoint presentation for this project is available! 

**Quick Start:**
```bash
pip install python-pptx
python generate_presentation.py
```

This generates a comprehensive 21-slide presentation covering:
- Project introduction and motivation
- System architecture and implementation
- Results and evaluation metrics
- Future work and conclusions

For details, see [`QUICKSTART.md`](QUICKSTART.md) and [`PRESENTATION_README.md`](PRESENTATION_README.md).

## Project Phases

### Phase 1: AI Model Development (Current Focus)
-   [ ] Select the first target crop (e.g., Potato).
-   [ ] Gather and preprocess a dataset of healthy and diseased leaves.
-   [ ] Train a Convolutional Neural Network (CNN) using Transfer Learning (e.g., MobileNetV2) for disease classification.
-   [ ] Convert the trained model to TensorFlow Lite (`.tflite`) format for mobile deployment.

### Phase 2: Mobile Application
-   [ ] Develop a cross-platform mobile app (e.g., using Flutter or React Native).
-   [ ] Create a simple UI to capture or upload an image.
-   [ ] Integrate the `.tflite` model into the app to perform inference.
-   [ ] Display the prediction result (disease name) to the user.

### Phase 3: Advice and Integration
-   [ ] Create a database (e.g., a JSON file) of treatment advice for each disease in Bengali.
-   [ ] Display the appropriate advice based on the model's prediction.
-   [ ] Add advanced features like a Bengali NLP chatbot or weather integration.
