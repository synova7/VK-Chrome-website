/* VK Chrome — Main JS */

/* ── Nav scroll ──────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Mobile nav ──────────────────────────────── */
const burger  = document.getElementById('nav-burger');
const mobileNav = document.getElementById('nav-mobile');
const closeBtn  = document.getElementById('nav-close');
if (burger && mobileNav) {
  burger.addEventListener('click', () => mobileNav.classList.add('open'));
  closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

/* ── Active nav link ─────────────────────────── */
const currentPage = location.pathname.replace(/\/$/, '').split('/').pop() || 'index';
document.querySelectorAll('.nav-links a, #nav-mobile a').forEach(a => {
  const href = a.getAttribute('href').replace('.html', '');
  if (href === currentPage || (currentPage === '' && href === 'index')) {
    a.classList.add('active');
  }
});

/* ── Footer year ─────────────────────────────── */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Scroll reveal ───────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Parallax hero ───────────────────────────── */
const parallaxEls = document.querySelectorAll('.hero-video, .hero-img');
if (parallaxEls.length) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    parallaxEls.forEach(el => {
      el.style.transform = `translateY(${y * 0.38}px)`;
    });
  }, { passive: true });
}

/* ── Video mute/play guard ───────────────────── */
document.querySelectorAll('video[autoplay]').forEach(v => {
  v.muted = true;
  v.play().catch(() => {});
});

/* ── Contact form (Web3Forms) ────────────────── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById('form-success');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
      } else {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please try again or email enquiries@vkchrome.com directly.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Network error. Please email enquiries@vkchrome.com directly.');
    }
  });
}
