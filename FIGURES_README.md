# Figure Generation for LaTeX Report

This document describes the `generate_figures.py` script that creates professional-quality figures for the Fosholer Bondhu academic report.

## Overview

The script generates 6 high-quality figures (300 DPI) suitable for inclusion in LaTeX reports and academic publications.

## Generated Figures

### 1. System Architecture (`system_architecture.png`)
- **Size:** 1200×800 pixels
- **Description:** Shows the three-tier architecture of the Fosholer Bondhu system
  - User/Mobile Interface (top layer)
  - Flask Backend Server (middle layer)
  - AI Model - MobileNetV2 (bottom layer)
- **Features:** Data flow arrows with labels showing image upload, HTTP POST, preprocessing, inference, and JSON response

### 2. Model Architecture (`model_architecture.png`)
- **Size:** 1000×1400 pixels
- **Description:** Neural network architecture diagram showing all layers
  - Input Layer (224×224×3)
  - MobileNetV2 Base (pre-trained, initially frozen)
  - GlobalAveragePooling2D
  - Dropout (0.4)
  - Dense Output (3 neurons with softmax)
- **Features:** Color-coded layers by type, dimensions and parameter counts

### 3. Workflow Diagram (`workflow_diagram.png`)
- **Size:** 1200×1600 pixels
- **Description:** Flowchart of the complete prediction workflow
- **Steps:**
  1. User uploads image
  2. File validation (decision point)
  3. Image preprocessing (resize, normalize)
  4. Model inference
  5. Get prediction and confidence
  6. Confidence check (decision point)
  7. Format JSON response
  8. Return to user
- **Features:** Standard flowchart shapes (circles, rectangles, diamonds)

### 4. Training Curves (`training_curves.png`)
- **Size:** 1400×600 pixels
- **Description:** Two-subplot figure showing model performance during training
- **Left subplot:** Training vs Validation Accuracy
  - Training: 77% → 94.8%
  - Validation: 75% → 92.8%
- **Right subplot:** Training vs Validation Loss
  - Training: 0.556 → 0.19
  - Validation: 0.6 → 0.21
- **Features:** 35 epochs total (25 initial + 10 fine-tuning), vertical line at epoch 25 marking fine-tuning start

### 5. Confusion Matrix (`confusion_matrix.png`)
- **Size:** 800×700 pixels
- **Description:** Heatmap showing classification performance on test set
- **Classes:**
  - Early Blight: 184 correct (92%)
  - Late Blight: 190 correct (95%)
  - Healthy: 25 correct (83.3%)
- **Overall Accuracy:** 92.8%
- **Features:** Blue color gradient, annotated cells, class accuracies

### 6. Confidence Distribution (`confidence_distribution.png`)
- **Size:** 900×600 pixels
- **Description:** Histogram showing distribution of model confidence scores
- **Statistics:**
  - Mean: ~89%
  - Median: ~92%
  - Range: 40-100%
- **Features:** 20 bins, mean and median lines, statistics box

## Usage

### Prerequisites

Install required dependencies:

```bash
pip install matplotlib seaborn numpy
```

Or install all project dependencies:

```bash
pip install -r requirements.txt
```

### Running the Script

Simply execute the script:

```bash
python generate_figures.py
```

The script will:
1. Create a `Figures/` directory (if it doesn't exist)
2. Generate all 6 figures with professional quality (300 DPI)
3. Save them as PNG files in the `Figures/` directory
4. Display a summary of generated files

### Output

```
============================================================
Generating Professional Figures for LaTeX Report
Fosholer Bondhu - Potato Disease Detection System
============================================================

Creating Figures directory...
✅ Directory created: Figures/

Generating figures...

✅ Generated: system_architecture.png
✅ Generated: model_architecture.png
✅ Generated: workflow_diagram.png
✅ Generated: training_curves.png
✅ Generated: confusion_matrix.png
✅ Generated: confidence_distribution.png

============================================================
✅ All figures generated successfully!
📁 Location: Figures/
============================================================
```

## Using Figures in LaTeX

### Including a Figure

```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{Figures/system_architecture.png}
    \caption{System architecture of Fosholer Bondhu application}
    \label{fig:system_architecture}
\end{figure}
```

### Full-width Figure (Two-column format)

```latex
\begin{figure*}[t]
    \centering
    \includegraphics[width=\textwidth]{Figures/training_curves.png}
    \caption{Training and validation accuracy and loss over 35 epochs}
    \label{fig:training_curves}
\end{figure*}
```

### Side-by-side Figures

```latex
\begin{figure}[h]
    \centering
    \begin{subfigure}{0.45\textwidth}
        \includegraphics[width=\textwidth]{Figures/confusion_matrix.png}
        \caption{Confusion matrix}
        \label{fig:confusion_matrix}
    \end{subfigure}
    \hfill
    \begin{subfigure}{0.45\textwidth}
        \includegraphics[width=\textwidth]{Figures/confidence_distribution.png}
        \caption{Confidence distribution}
        \label{fig:confidence_dist}
    \end{subfigure}
    \caption{Model evaluation metrics}
\end{figure}
```

## Customization

The script can be easily customized by modifying the individual generation functions:

- **Colors:** Change the color scheme by modifying the color hex codes
- **Dimensions:** Adjust figure sizes in the `plt.subplots(figsize=(...))` calls
- **Data:** Update the training curves or confusion matrix values
- **DPI:** Change the DPI in `plt.savefig(..., dpi=300)` calls

## Technical Details

- **Library:** matplotlib and seaborn for plotting
- **Format:** PNG (portable, widely supported)
- **Resolution:** 300 DPI (publication quality)
- **Style:** Professional color schemes with proper labels, legends, and titles
- **Compatibility:** Works with Python 3.7+

## File Structure

```
fosholer-bondhu/
├── generate_figures.py          # Main script
├── Figures/                     # Output directory
│   ├── system_architecture.png
│   ├── model_architecture.png
│   ├── workflow_diagram.png
│   ├── training_curves.png
│   ├── confusion_matrix.png
│   └── confidence_distribution.png
└── requirements.txt             # Dependencies
```

## Notes

- All figures are designed for print quality (300 DPI)
- Color schemes are chosen to be colorblind-friendly where possible
- Figures maintain professional appearance in both color and grayscale
- All dimensions and statistics reflect the actual Fosholer Bondhu model

## License

Part of the Fosholer Bondhu project - AI Agricultural Assistant for Bangladesh farmers.
