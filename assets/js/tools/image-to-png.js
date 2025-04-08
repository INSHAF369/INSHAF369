// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const convertBtn = document.getElementById('convertBtn');
const downloadSection = document.getElementById('downloadSection');
const downloadLink = document.getElementById('downloadLink');

// Event Listeners
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-primary');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-primary');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-primary');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

convertBtn.addEventListener('click', convertToPNG);

// Functions
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        previewSection.classList.remove('d-none');
        convertBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

function convertToPNG() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the image
    canvas.width = imagePreview.naturalWidth;
    canvas.height = imagePreview.naturalHeight;
    
    // Draw the image on the canvas
    ctx.drawImage(imagePreview, 0, 0);
    
    // Convert to PNG and create download link
    const pngDataUrl = canvas.toDataURL('image/png');
    downloadLink.href = pngDataUrl;
    downloadLink.download = 'converted-image.png';
    
    // Show download section
    downloadSection.classList.remove('d-none');
    
    // Scroll to download section
    downloadSection.scrollIntoView({ behavior: 'smooth' });
} 