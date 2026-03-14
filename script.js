// main hero slider
let slideIndex = 1;
const slides = document.querySelectorAll('.hero-slider .slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(s => s.classList.remove('active-slide'));
  dots.forEach(d => d.classList.remove('active-dot'));
  slides[slideIndex - 1].classList.add('active-slide');
  dots[slideIndex - 1].classList.add('active-dot');
}

function changeSlide(step) { showSlide(slideIndex += step); }
function currentSlide(n) { showSlide(slideIndex = n); }

setInterval(() => { changeSlide(1); }, 6000);

// modal gallery management
const galleryStates = {};

function initGallery(modalId) {
  if (!galleryStates[modalId]) galleryStates[modalId] = 0;
  updateGallery(modalId);
}

function moveGallery(modalId, step) {
  if (galleryStates[modalId] === undefined) galleryStates[modalId] = 0;
  const slidesContainer = document.getElementById(`slides-${modalId}`);
  if (!slidesContainer) return;
  const total = slidesContainer.children.length;
  galleryStates[modalId] = (galleryStates[modalId] + step + total) % total;
  updateGallery(modalId);
}

function setGallerySlide(modalId, index) {
  galleryStates[modalId] = index;
  updateGallery(modalId);
}

function updateGallery(modalId) {
  const slidesContainer = document.getElementById(`slides-${modalId}`);
  if (!slidesContainer) return;
  slidesContainer.style.transform = `translateX(-${galleryStates[modalId] * 100}%)`;
  
  const dotsContainer = document.getElementById(`dots-${modalId}`);
  if (dotsContainer) {
    Array.from(dotsContainer.children).forEach((dot, idx) => {
      dot.classList.toggle('active-gallery-dot', idx === galleryStates[modalId]);
    });
  }
}

function openModal(id) {
  document.getElementById(id).style.display = 'block';
  document.body.style.overflow = 'hidden';
  galleryStates[id] = 0; // reset to first slide
  updateGallery(id);
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
  const modalIds = ['wagonr', 'axio', 'aqua', 'sigiriya', 'kandy', 'ella', 'yala'];
  modalIds.forEach(id => {
    let modal = document.getElementById(id);
    if (event.target === modal) {
      closeModal(id);
    }
  });
};

// scroll reveal
function reveal() {
  document.querySelectorAll('.reveal').forEach(el => {
    let windowHeight = window.innerHeight;
    let elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 90) el.classList.add('active');
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', () => {
    showSlide(1);
    reveal();
});

