# Fosholer Bondhu Presentation Generator

This directory contains a Python script to automatically generate a professional PowerPoint presentation for the Fosholer Bondhu (ফসলের বন্ধু) project.

## Overview

The presentation generator creates a comprehensive 21-slide PowerPoint presentation covering:
- Project introduction and motivation
- Problem statement and objectives
- System architecture and technology stack
- Dataset and model architecture
- Training strategy and implementation
- Results and evaluation metrics
- Challenges, limitations, and future work
- Conclusion

## Prerequisites

Make sure you have Python 3.8+ installed. Install the required dependency:

```bash
pip install python-pptx
```

## Usage

### Generate the Presentation

Simply run the generator script:

```bash
python generate_presentation.py
```

This will create a file named `Fosholer_Bondhu_Presentation.pptx` in the current directory.

### Customize the Presentation

After generating the presentation, open it in PowerPoint or LibreOffice Impress and customize:

1. **Title Slide (Slide 1):**
   - Replace `[Your Name]` with your actual name
   - Replace `[Your Student ID]` with your student ID
   - Replace `[Your Department]` with your department name
   - Update the date if needed

2. **Thank You Slide (Slide 21):**
   - Add your email address
   - Update contact information

3. **Add Images (Optional):**
   If you have generated figures from your training notebooks, you can add them:
   - Slide 7: Add `system_architecture.png`
   - Slide 10: Add `model_architecture.png`
   - Slide 12: Add `workflow_diagram.png`
   - Slide 13: Add `training_curves.png`
   - Slide 14: Add `confusion_matrix.png`

4. **Review Content:**
   - Check all metrics match your actual results
   - Adjust any project-specific details
   - Add speaker notes if presenting

## Presentation Structure

### Slides Overview:

1. **Title Slide** - Project title and student information
2. **Agenda** - Presentation outline
3. **Introduction** - Agriculture in Bangladesh and AI's role
4. **Motivation** - Why this project matters
5. **Problem Statement** - Key challenges addressed
6. **Objectives** - Primary and secondary goals
7. **System Architecture** - Three-tier design
8. **Technology Stack** - ML, backend, and development tools
9. **Dataset** - PlantVillage dataset statistics
10. **Model Architecture** - MobileNetV2 details
11. **Training Strategy** - Two-phase training approach
12. **Implementation Workflow** - System workflow
13. **Results: Training Performance** - Accuracy metrics
14. **Results: Classification Performance** - Per-class metrics
15. **Results: Field Testing** - Real-world accuracy
16. **Results: Model Comparison** - Comparison with other models
17. **Key Achievements** - Project accomplishments
18. **Challenges & Limitations** - Issues faced and current limits
19. **Future Work** - Short and long-term goals
20. **Conclusion** - Summary and impact
21. **Thank You** - Contact information

## Design Features

### Professional Styling:
- **Color Scheme:**
  - Primary: Blue (#0066CC)
  - Secondary: Green (#4CAF50)
  - Accent: Orange (#FF9800)
  
- **Typography:**
  - Consistent font sizes for hierarchy
  - Title: 32pt
  - Content: 16-18pt
  - Notes: 14pt

- **Layout:**
  - Title bar on each slide
  - Consistent spacing and alignment
  - Two-column layouts where appropriate
  - Professional tables with colored headers

### Content Organization:
- Bullet points with proper hierarchy
- Data tables for metrics
- Placeholder for images
- Speaker notes on key slides

## Customization Options

### Modify the Script:

If you want to change colors, fonts, or content, edit `generate_presentation.py`:

```python
# Color scheme (lines 12-16)
PRIMARY_COLOR = RGBColor(0, 102, 204)    # Blue
SECONDARY_COLOR = RGBColor(76, 175, 80)  # Green
ACCENT_COLOR = RGBColor(255, 152, 0)     # Orange

# Font sizes in utility functions
title_para.font.size = Pt(44)  # Title slide
title_para.font.size = Pt(32)  # Content slide titles
```

### Add Your Own Slides:

Use the utility functions to add custom slides:

```python
# Add a content slide
add_content_slide(prs, "Your Title", ["Bullet 1", "Bullet 2"])

# Add a table slide
add_table_slide(prs, "Your Title", ["Col1", "Col2"], [["Data1", "Data2"]])

# Add an image slide
add_image_slide(prs, "Your Title", "path/to/image.png", "Caption")
```

## Tips for Presentation

1. **Practice:** Rehearse your presentation multiple times
2. **Timing:** Aim for 15-20 minutes total
3. **Engagement:** Make eye contact and explain technical terms
4. **Demos:** Consider showing a live demo of the web interface
5. **Questions:** Prepare for common questions about:
   - Why MobileNetV2 over other architectures?
   - How does class imbalance affect results?
   - What are the real-world deployment challenges?
   - How can this scale to other crops?

## Troubleshooting

### Issue: Module not found error
**Solution:** Install python-pptx: `pip install python-pptx`

### Issue: Images not appearing
**Solution:** Check that image paths are correct and files exist

### Issue: Presentation looks different in PowerPoint
**Solution:** This is normal - slight rendering differences exist between viewers

### Issue: Want different colors/fonts
**Solution:** Edit the constants at the top of `generate_presentation.py`

## Export Options

Once you've customized the presentation:

1. **PDF Export:** File → Export → PDF (for sharing)
2. **Video:** PowerPoint → File → Export → Create a Video
3. **Web:** Upload to Google Slides or OneDrive for online sharing

## License

This presentation generator is part of the Fosholer Bondhu project.

## Support

For issues or questions:
- Check the main project README
- Review the code comments in `generate_presentation.py`
- Open an issue on GitHub: github.com/miad979/fosholer-bondhu

---

**Happy Presenting! 🎤📊**
