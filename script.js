// Load profile data
async function loadProfileData() {
    try {
        const response = await fetch('profile.json');
        const data = await response.json();
        
        // Update the DOM with profile data
        document.getElementById('profileName').textContent = data.name;
        document.getElementById('shortDescription').textContent = data.short_description;
        document.getElementById('fullDescription').textContent = data.full_description;
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

// Toggle the All menu
function toggleMenu() {
    const dropdown = document.getElementById('menuDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Show full description modal
function showFullDescription() {
    document.getElementById('descriptionModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('descriptionModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('descriptionModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.matches('.all-button')) {
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
});

// Load profile data when page loads
document.addEventListener('DOMContentLoaded', loadProfileData);