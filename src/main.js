import { initNavbar } from './components/navbar.js';
import { initFooter } from './components/footer.js';
import { initWhatsApp } from './components/whatsapp.js';

// Hero Slider Logic
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  if (slides.length === 0) return;

  // Ensure the first slide is active initially
  slides[currentSlide].classList.add('active');

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  setInterval(nextSlide, 5000); // Change image every 5 seconds
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooter();
  initWhatsApp();
  initHeroSlider();

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.animate-slide-up, .course-card, .why-item, .animate-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  console.log('ST. JOHN PAUL II Website Initialized');
});
