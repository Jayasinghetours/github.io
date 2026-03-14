const galleryStates = {};

function openModal(id) {
    document.getElementById(id).style.display = 'block';
    galleryStates[id] = 0;
    updateGallery(id);
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function moveGallery(modalId, step) {
    if (galleryStates[modalId] === undefined) galleryStates[modalId] = 0;
    const slides = document.getElementById(`slides-${modalId}`);
    const total = slides.children.length;
    galleryStates[modalId] = (galleryStates[modalId] + step + total) % total;
    updateGallery(modalId);
}

function updateGallery(modalId) {
    const slides = document.getElementById(`slides-${modalId}`);
    slides.style.transform = `translateX(-${galleryStates[modalId] * 100}%)`;
}

// Close on background click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
