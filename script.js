// Hero Slider Logic
let heroIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slider .slide');

function showHeroSlide(n) {
    heroSlides.forEach(s => s.classList.remove('active-slide'));
    heroIndex = (n + heroSlides.length) % heroSlides.length;
    heroSlides[heroIndex].classList.add('active-slide');
}

function changeHeroSlide(n) { showHeroSlide(heroIndex + n); }
setInterval(() => changeHeroSlide(1), 5000);

// Modal Gallery Logic
const galleryStates = {};

function openModal(id) {
    document.getElementById(id).style.display = 'block';
    document.body.style.overflow = 'hidden';
    galleryStates[id] = 0;
    updateGallery(id);
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function moveGallery(modalId, step) {
    const slides = document.getElementById(`slides-${modalId}`);
    if (!slides) return;
    const total = slides.children.length;
    galleryStates[modalId] = (galleryStates[modalId] + step + total) % total;
    updateGallery(modalId);
}

function updateGallery(modalId) {
    const slides = document.getElementById(`slides-${modalId}`);
    if (slides) {
        slides.style.transform = `translateX(-${galleryStates[modalId] * 100}%)`;
    }
}

// Close on background click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
