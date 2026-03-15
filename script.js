// Keep all your previous Slider/Modal/Reveal logic...

// ---------- BOOKING FORM LOGIC ----------
function sendBooking(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message').value;

  // Construct WhatsApp Message
  const whatsappText = `Hello Jayasinghe Tours!%0A%0A` +
    `I would like to book a service:%0A` +
    `*Name:* ${name}%0A` +
    `*Email:* ${email}%0A` +
    `*Service:* ${service}%0A` +
    `*Date:* ${date}%0A` +
    `*Details:* ${message}`;

  // Open WhatsApp
  window.open(`https://wa.me/94787077007?text=${whatsappText}`, '_blank');
}

// Ensure global access
window.sendBooking = sendBooking;

// (All your other code: showSlide, openModal, checkReveal, etc. remains below)
