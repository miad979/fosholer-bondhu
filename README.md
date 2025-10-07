# ফসলের বন্ধু (Fosholer Bondhu) - AI Agricultural Assistant

An AI-powered mobile application to help farmers in Bangladesh identify crop diseases and get treatment advice. This is an IDP project.

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
