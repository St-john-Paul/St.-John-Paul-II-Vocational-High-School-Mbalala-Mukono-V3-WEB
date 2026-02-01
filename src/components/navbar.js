export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  navbar.innerHTML = `
    <div class="container nav-content" style="padding: 0 40px; justify-content: space-between;">
      <a href="/" class="logo" style="display: flex; align-items: center; text-decoration: none;">
        <img src="/logo.png" alt="Badge" style="height: 60px; width: auto; margin-right: 20px;">
        <div class="school-name-nav" style="line-height: 1.1;">
          <span style="font-size: 0.8rem; font-weight: 900; color: var(--color-primary); display: block; letter-spacing: 0.5px; text-transform: uppercase;">St. John Paul II Vocational &</span>
          <span style="font-size: 0.8rem; font-weight: 900; color: var(--color-primary); display: block; letter-spacing: 0.5px; text-transform: uppercase;">High School Mbalala-Mukono</span>
        </div>
      </a>
      
      <button class="menu-toggle" aria-label="Toggle Menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li class="dropdown">
          <a href="/about.html">About Us ▼</a>
          <ul class="dropdown-menu">
            <li><a href="/mission-vision.html">Mission & Vision</a></li>
            <li><a href="/leadership.html">Leadership</a></li>
            <li><a href="/staff.html">Our Staff</a></li>
            <li><a href="/facilities.html">Facilities</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="/programs.html">Programs ▼</a>
          <ul class="dropdown-menu">
            <li><a href="/programs.html#vocational">Vocational Courses</a></li>
            <li><a href="/programs.html#academic">Academic Subjects</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="/admissions.html">Admissions ▼</a>
          <ul class="dropdown-menu">
            <li><a href="/admissions.html">How to Apply</a></li>
            <li><a href="/fees.html">Fees Structure</a></li>
            <li><a href="/requirements.html">Requirements</a></li>
            <li><a href="/student-life.html">Student Life</a></li>
          </ul>
        </li>
        <li><a href="/academics.html">Performance</a></li>
        <li class="dropdown">
          <a href="#">More ▼</a>
          <ul class="dropdown-menu">
            <li><a href="/news.html">News & Updates</a></li>
            <li><a href="/events.html">School Events</a></li>
            <li><a href="/gallery.html">Gallery</a></li>
            <li><a href="/videos.html">Videos</a></li>
            <li><a href="/clubs.html">Clubs</a></li>
            <li><a href="/faqs.html">FAQs</a></li>
          </ul>
        </li>
        <li><a href="/contact.html" class="btn btn-primary" style="color: white !important; padding: 8px 20px; font-size: 0.9rem;">Contact</a></li>
        <li><a href="/login.html" class="btn btn-primary" style="background: #e74c3c; margin-left: 10px; color: white !important; padding: 8px 20px; font-size: 0.9rem;">Login</a></li>
      </ul>
    </div>
  `;

  const menuToggle = navbar.querySelector('.menu-toggle');
  const navLinks = navbar.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Handle mobile dropdowns
  const dropdowns = navbar.querySelectorAll('.dropdown > a');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        dropdown.parentElement.classList.toggle('active');
      }
    });
  });
}
