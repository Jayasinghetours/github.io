// ==========================================
// 1. HERO SLIDER LOGIC
// ==========================================
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let sliderInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active-slide'));
  dots.forEach(d => d.classList.remove('active-dot'));
  if(slides[index]) slides[index].classList.add('active-slide');
  if(dots[index]) dots[index].classList.add('active-dot');
}

function nextSlide() {
  if(slides.length === 0) return;
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

sliderInterval = setInterval(nextSlide, 5000);

window.currentSlide = function(index) {
  clearInterval(sliderInterval); 
  slideIndex = index;
  showSlide(slideIndex);
  sliderInterval = setInterval(nextSlide, 5000); 
};


// ==========================================
// 2. MODAL & INNER GALLERY LOGIC
// ==========================================
const galleryState = {};

window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
    
    galleryState[id] = 0;
    const track = document.getElementById(`track-${id}`);
    if(track) {
      track.style.transform = `translateX(0%)`;
    }
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
  }
};

window.moveModalGallery = function(modalId, step) {
  if(galleryState[modalId] === undefined) {
    galleryState[modalId] = 0;
  }
  
  const track = document.getElementById(`track-${modalId}`);
  if(!track) return;
  
  const totalImages = track.children.length;
  galleryState[modalId] += step;
  
  if (galleryState[modalId] >= totalImages) {
    galleryState[modalId] = 0;
  }
  if (galleryState[modalId] < 0) {
    galleryState[modalId] = totalImages - 1;
  }
  
  track.style.transform = `translateX(-${galleryState[modalId] * 100}%)`;
};

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};


// ==========================================
// 3. WHATSAPP BOOKING LOGIC
// ==========================================
window.sendBooking = function(event) {
  event.preventDefault(); 
  
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const service = document.getElementById('service').value;
  
  const whatsappMessage = `Hello Jayasinghe Tours!%0A%0A` +
                          `I would like to make an inquiry:%0A` +
                          `*Name:* ${name}%0A` +
                          `*Date:* ${date}%0A` +
                          `*Selected Tour/Car:* ${service}%0A%0A` +
                          `Please let me know the details and availability.`;
                          
  const phone = "94787077007";
  window.open(`https://wa.me/${phone}?text=${whatsappMessage}`, '_blank');
};


// ==========================================
// 4. SCROLL ANIMATIONS (Reveal)
// ==========================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});

// ==========================================
// 5. SMART WHATSAPP BUTTON (Prevent overlapping footer)
// ==========================================
window.addEventListener('scroll', function() {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  const footer = document.querySelector('.premium-footer');
  
  if (!whatsappBtn || !footer) return;

  // Calculate how far the user has scrolled
  const scrollPosition = window.innerHeight + window.scrollY;
  const footerPosition = document.body.offsetHeight - footer.offsetHeight;

  // If the user has scrolled down into the footer area...
  if (scrollPosition >= footerPosition) {
    // Push the button up so it sits nicely above the footer text
    whatsappBtn.style.bottom = '100px'; 
  } else {
    // Otherwise, keep it in its normal bottom-right corner
    whatsappBtn.style.bottom = '25px';
  }
});
