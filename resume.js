// Load and display projects data
async function loadProjectsData() {
    try {
        const response = await fetch('description.json');
        const data = await response.json();
        const container = document.getElementById('projectsContent');

        Object.entries(data).forEach(([projectName, project]) => {
            // Create project box
            const box = document.createElement('div');
            box.className = 'project-box';
            box.onclick = () => showProjectModal(projectName, project);

            // Create image container
            const imgContainer = document.createElement('div');
            imgContainer.className = 'project-image-container';
            
            const img = document.createElement('img');
            img.src = `img/projects/${projectName.toLowerCase()}/1.jpg`; // Assuming first image is thumbnail
            img.alt = `${projectName} Preview`;
            img.className = 'project-image';
            imgContainer.appendChild(img);

            // Create content container
            const content = document.createElement('div');
            content.className = 'project-content';

            const title = document.createElement('h2');
            title.className = 'project-title';
            title.textContent = projectName;

            const description = document.createElement('p');
            description.className = 'project-description';
            description.textContent = project.short_description;

            content.appendChild(title);
            content.appendChild(description);

            box.appendChild(imgContainer);
            box.appendChild(content);
            container.appendChild(box);
        });

    } catch (error) {
        console.error('Error loading projects data:', error);
    }
}

// Show project modal
function showProjectModal(projectName, project) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalProjectName');
    const modalDescription = document.getElementById('modalDescription');
    const imageSlider = document.getElementById('modalImageSlider');

    // Clear previous content
    imageSlider.innerHTML = '';

    // Set content
    modalTitle.textContent = projectName;
    modalDescription.textContent = project.full_description;

    // Load images (assuming there are multiple images numbered 1.jpg, 2.jpg, etc.)
    for (let i = 1; i <= 5; i++) { // Adjust the number based on your actual images
        const img = document.createElement('img');
        img.src = `img/projects/${projectName.toLowerCase()}/${i}.jpg`;
        img.alt = `${projectName} Image ${i}`;
        img.className = 'slider-image';
        imageSlider.appendChild(img);

        // Handle image load error
        img.onerror = () => {
            img.remove();
        };
    }

    // Setup horizontal scroll with custom scrollbar
    setupScrollbar();

    // Show modal
    modal.style.display = 'block';
}

// Setup custom scrollbar
function setupScrollbar() {
    const slider = document.getElementById('modalImageSlider');
    const thumb = document.querySelector('.scrollbar-thumb');
    
    // Update thumb position on scroll
    slider.addEventListener('scroll', () => {
        const scrollPercent = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
        const maxOffset = 100 - ((slider.clientWidth / slider.scrollWidth) * 100);
        thumb.style.left = `${Math.min(scrollPercent, maxOffset)}%`;
    });

    // Make thumb draggable
    let isDragging = false;
    let startX;
    let scrollLeft;

    thumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - thumb.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - startX;
        const walk = (x / (slider.clientWidth)) * slider.scrollWidth;
        slider.scrollLeft = walk;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Close modal
function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjectsData);