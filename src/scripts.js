// Minimal, dependency-free enhancements

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scroll for anchor links
document.addEventListener('click', (event) => {
  const target = event.target.closest('a[href^="#"]');
  if (!target) return;
  const id = target.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    event.preventDefault();
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
});

// Contact form success message (looks for ?sent=1)
const statusEl = document.getElementById('status');
if (statusEl && window.location.search.includes('sent=1')) {
  statusEl.textContent = 'Thanks — your message was sent!';
}

// Light marquee pause on hover
const marquee = document.querySelector('.marquee span');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}

// Placeholder: replace GA in site data before going live.
