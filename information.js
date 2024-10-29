// Load and display information data
async function loadInformationData() {
    try {
        const response = await fetch('information.json');
        const data = await response.json();
        const container = document.getElementById('informationContent');

        // Create a box for each topic
        Object.entries(data).forEach(([topic, details]) => {
            // Create main box container
            const box = document.createElement('div');
            box.className = 'info-topic-box';

            // Create image container and image
            const imgContainer = document.createElement('div');
            imgContainer.className = 'info-image-container';
            
            const img = document.createElement('img');
            img.src = `img/information/${topic.toLowerCase()}.jpg`;
            img.alt = `${topic} Image`;
            img.className = 'info-image';
            imgContainer.appendChild(img);

            // Create content container
            const content = document.createElement('div');
            content.className = 'info-content';

            // Add title
            const title = document.createElement('h2');
            title.className = 'info-title';
            title.textContent = topic;

            // Create details container
            const detailsContainer = document.createElement('div');
            detailsContainer.className = 'info-details';

            // Add each detail
            Object.entries(details).forEach(([key, value]) => {
                const item = document.createElement('div');
                item.className = 'info-item';

                const label = document.createElement('span');
                label.className = 'info-label';
                label.textContent = key + ' : ';

                const valueSpan = document.createElement('span');
                valueSpan.className = 'info-value';
                valueSpan.textContent = value;

                item.appendChild(label);
                item.appendChild(valueSpan);
                detailsContainer.appendChild(item);
            });

            // Assemble the box
            content.appendChild(title);
            content.appendChild(detailsContainer);
            box.appendChild(imgContainer);
            box.appendChild(content);
            container.appendChild(box);
        });

    } catch (error) {
        console.error('Error loading information data:', error);
    }
}

// Load information when page loads
document.addEventListener('DOMContentLoaded', loadInformationData);