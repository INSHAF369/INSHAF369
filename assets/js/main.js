// Load header and footer components
function loadComponents() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });

    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}

// Tool data structure
const tools = [
    // Image Tools
    { id: 1, name: 'Image to PNG Converter', category: 'image', icon: 'fa-image', link: 'tools/image-to-png.html' },
    { id: 2, name: 'Image to JPG Converter', category: 'image', icon: 'fa-image', link: 'tools/image-to-jpg.html' },
    { id: 3, name: 'Image Resizer', category: 'image', icon: 'fa-expand', link: 'tools/image-resizer.html' },
    // Add more tools here...
];

// Function to display tools
function displayTools(category = 'all') {
    const toolsGrid = document.getElementById('tools-grid');
    toolsGrid.innerHTML = '';

    const filteredTools = category === 'all' 
        ? tools 
        : tools.filter(tool => tool.category === category);

    filteredTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'col-md-4 col-lg-3 mb-4';
        toolCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-center">
                    <i class="fas ${tool.icon} fa-3x mb-3 text-primary"></i>
                    <h5 class="card-title">${tool.name}</h5>
                    <a href="${tool.link}" class="btn btn-outline-primary">Use Tool</a>
                </div>
            </div>
        `;
        toolsGrid.appendChild(toolCard);
    });
}

// Search functionality
document.getElementById('toolSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const toolsGrid = document.getElementById('tools-grid');
    const cards = toolsGrid.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.parentElement.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
});

// Category filter
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        displayTools(this.dataset.category);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    displayTools();
}); 