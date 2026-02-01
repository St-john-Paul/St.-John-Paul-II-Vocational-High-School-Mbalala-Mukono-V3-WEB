import { API_URL } from '../config.js';

export function initFooter() {
  const footerContainer = document.querySelector('.footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <div class="container footer-content">
      <div class="footer-brand">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <img src="/logo.png" alt="Badge" style="height: 60px; margin-right: 15px;">
          <h3 style="color: white; font-size: 1.1rem; line-height: 1.2;">ST. JOHN PAUL II VOC & HIGH SCHOOL</h3>
        </div>
        <p style="color: var(--color-accent); font-weight: 700; margin-bottom: 20px;">YOUR SUCCESS BEGINS HERE</p>
        <p style="font-size: 0.9rem; opacity: 0.8; line-height: 1.6;">At ST. JOHN PAUL II VOC & HIGH SCH MBALALA-MUKONO, we are always excited to welcome new members to our community.</p>
        
        <div style="margin-top: 30px;">
           <h2 style="color: white; margin-bottom: 20px;">Stay Updated</h2>
           <p style="font-size: 0.85rem; margin-bottom: 15px;">Subscribe to get our latest news and updates.</p>
           <form id="homeNewsletterForm" style="display: flex;">
             <input type="email" name="email" id="newsletterEmail" placeholder="Your email" required style="padding: 10px; border-radius: 4px 0 0 4px; border: none; width: 100%;">
             <button type="submit" style="background: var(--color-accent); color: white; padding: 10px 20px; border-radius: 0 4px 4px 0; border: none; font-weight: 700; cursor: pointer;">Subscribe</button>
           </form>
           <p id="newsletterMsg" style="font-size: 0.8rem; margin-top: 8px; display: none;"></p>
        </div>
      </div>

      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/staff.html">Our Staff</a></li>
          <li><a href="/academics.html">Academics</a></li>
          <li><a href="/student-life.html">Student Life</a></li>
          <li><a href="/admissions.html">How to Apply</a></li>
          <li><a href="/faqs.html">FAQs</a></li>
          <li><a href="/contact.html">Contact Us</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h3>Contact Info</h3>
        <p style="display: flex; gap: 10px; font-size: 0.9rem; margin-bottom: 15px;">
          <i class="fas fa-map-marker-alt" style="color: var(--color-accent); margin-top: 3px;"></i> 1.5km off Mukono-Mbalala along the Kampala-Jinja Highway.
        </p>
        <p style="display: flex; gap: 10px; font-size: 0.9rem; margin-bottom: 10px;">
          <i class="fas fa-phone-alt" style="color: var(--color-accent); margin-top: 3px;"></i> 0784 824 441 | 0777 609 907
        </p>
        <p style="display: flex; gap: 10px; font-size: 0.9rem;">
          <i class="fas fa-envelope" style="color: var(--color-accent); margin-top: 3px;"></i> stjohnpaulvoc@gmail.com
        </p>
        
        <div style="margin-top: 30px;">
          <h3>Social Media</h3>
          <div style="display: flex; gap: 15px;">
            <a href="https://www.facebook.com/share/CVwpA78nN8zzn8hM/" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.1); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; transition: all 0.3s ease; text-decoration: none;" onmouseover="this.style.background='var(--color-primary)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://youtu.be/MkDQ3S-eEoo" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.1); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; transition: all 0.3s ease; text-decoration: none;" onmouseover="this.style.background='#ff0000'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.1); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; transition: all 0.3s ease; text-decoration: none;" onmouseover="this.style.background='#1DA1F2'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.1); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; transition: all 0.3s ease; text-decoration: none;" onmouseover="this.style.background='#E4405F'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-gallery">
        <h3>Gallery Preview</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          <a href="gallery.html"> <img src="https://i.ibb.co/hM4yBTf/1.jpg" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;"></a>
          <a href="gallery.html"> <img src="https://i.ibb.co/557LQ3C/6.jpg" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;"></a>
          <a href="gallery.html"> <img src="https://i.ibb.co/1q41nPY/8.jpg" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;"></a>
          <a href="gallery.html"> <img src="https://i.ibb.co/Y2GpZSx/t2.jpg" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;"></a>
          <a href="gallery.html"> <img src="https://i.ibb.co/HT3SMTs/25.jpg" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;"></a>
          <a href="gallery.html"> <img src="https://i.ibb.co/sKZV1sS/20.jpg" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;"></a>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 60px; padding-top: 30px;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; font-size: 0.85rem; opacity: 0.7;">
        <p>© ST. JOHN PAUL II VOC & HIGH SCH MBALALA-MUKONO, All Right Reserved.</p>
        <p>Designed By @jbzkalla</p>
      </div>
    </div>
  `;

  // Newsletter subscription handler
  const form = document.getElementById('homeNewsletterForm');
  const msg = document.getElementById('newsletterMsg');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;

      try {
        const res = await fetch(`${API_URL}/content/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const data = await res.json();
        msg.style.display = 'block';

        if (res.ok) {
          msg.style.color = '#4caf50';
          msg.textContent = data.message;
          form.reset();
        } else {
          msg.style.color = '#ff9800';
          msg.textContent = data.message;
        }
      } catch (err) {
        msg.style.display = 'block';
        msg.style.color = '#f44336';
        msg.textContent = 'Error subscribing. Please try again.';
      }
    });
  }
}

