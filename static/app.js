/**
 * Fosholer Bondhu - Potato Disease Prediction
 * Client-side JavaScript for file upload and prediction handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const fileName = document.getElementById('file-name');
    const clearBtn = document.getElementById('clear-btn');
    const uploadForm = document.getElementById('upload-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const resultCard = document.getElementById('result-card');
    const resultContent = document.getElementById('result-content');
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');

    let selectedFile = null;

    // Drag and Drop Event Handlers
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInput.click();
        }
    });

    // File Input Change Handler
    fileInput.addEventListener('change', handleFileSelect);

    // Clear Button Handler
    clearBtn.addEventListener('click', clearSelection);

    // Form Submit Handler
    uploadForm.addEventListener('submit', handleSubmit);

    /**
     * Handle drag over event
     */
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    }

    /**
     * Handle drag leave event
     */
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
    }

    /**
     * Handle file drop event
     */
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (validateFile(file)) {
                selectedFile = file;
                showPreview(file);
            }
        }
    }

    /**
     * Handle file selection from input
     */
    function handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            if (validateFile(file)) {
                selectedFile = file;
                showPreview(file);
            }
        }
    }

    /**
     * Validate file type
     */
    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            showError('Please select a valid image file (JPG, PNG, or JPEG).');
            return false;
        }
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showError('File size must be less than 10MB.');
            return false;
        }
        hideError();
        return true;
    }

    /**
     * Show image preview
     */
    function showPreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.alt = 'Preview of ' + file.name;
            fileName.textContent = file.name + ' (' + formatFileSize(file.size) + ')';
            previewContainer.classList.remove('d-none');
            submitBtn.disabled = false;
        };
        reader.onerror = function() {
            showError('Failed to read the file. Please try again.');
        };
        reader.readAsDataURL(file);
    }

    /**
     * Format file size for display
     */
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    /**
     * Clear file selection
     */
    function clearSelection() {
        selectedFile = null;
        fileInput.value = '';
        previewContainer.classList.add('d-none');
        previewImage.src = '';
        fileName.textContent = '';
        submitBtn.disabled = true;
        hideResult();
        hideError();
    }

    /**
     * Handle form submission
     */
    async function handleSubmit(e) {
        e.preventDefault();

        if (!selectedFile) {
            showError('Please select an image first.');
            return;
        }

        // Show loading state
        setLoading(true);
        hideError();
        hideResult();

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                let errorText = 'Prediction failed. Please try again.';
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorText = errorData.error || errorText;
                }
                throw new Error(errorText);
            }

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                showResult(data);
            } else {
                const text = await response.text();
                showResultText(text);
            }
        } catch (error) {
            showError(error.message || 'An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Set loading state
     */
    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.classList.add('d-none');
            btnSpinner.classList.remove('d-none');
        } else {
            btnText.classList.remove('d-none');
            btnSpinner.classList.add('d-none');
            if (selectedFile) {
                submitBtn.disabled = false;
            }
        }
    }

    // Valid Bootstrap icon classes for result display
    const ICON_CONFIG = {
        success: {
            iconClass: 'bi-check-circle-fill',
            cssClass: 'success'
        },
        warning: {
            iconClass: 'bi-exclamation-triangle-fill',
            cssClass: 'warning'
        }
    };

    // Disease keywords that indicate a problem (warning icon)
    const WARNING_KEYWORDS = ['blight', 'disease', 'rot', 'wilt', 'virus', 'infected'];

    /**
     * Show prediction result (JSON format)
     */
    function showResult(data) {
        const probability = data.probability || 0;
        const probabilityPercent = (probability * 100).toFixed(1);
        const label = data.label || 'Unknown';

        // Determine icon type based on label using whitelist
        const labelLower = label.toLowerCase();
        const isWarning = WARNING_KEYWORDS.some(keyword => labelLower.includes(keyword));
        const iconType = isWarning ? 'warning' : 'success';
        const icon = ICON_CONFIG[iconType];

        resultContent.innerHTML = `
            <div class="result-icon ${icon.cssClass}">
                <i class="bi ${icon.iconClass}"></i>
            </div>
            <div class="result-label">${escapeHtml(label)}</div>
            <div class="result-probability">
                Confidence: <strong>${probabilityPercent}%</strong>
            </div>
            <div class="probability-bar">
                <div class="probability-fill" style="width: ${probabilityPercent}%"></div>
            </div>
        `;

        resultCard.classList.remove('d-none');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Show prediction result (plain text format)
     */
    function showResultText(text) {
        resultContent.innerHTML = `
            <div class="result-icon success">
                <i class="bi bi-info-circle-fill"></i>
            </div>
            <div class="result-label">Result</div>
            <p class="mt-3">${escapeHtml(text)}</p>
        `;

        resultCard.classList.remove('d-none');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Hide result card
     */
    function hideResult() {
        resultCard.classList.add('d-none');
        resultContent.innerHTML = '';
    }

    /**
     * Show error message
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorAlert.classList.remove('d-none');
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Hide error message
     */
    function hideError() {
        errorAlert.classList.add('d-none');
        errorMessage.textContent = '';
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
