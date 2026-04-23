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
  if (typeof gtag === 'function') gtag('event', 'form_submit', { form: 'contact' });
}

// GA4 event tracking on key outbound / contact CTAs
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || typeof gtag !== 'function') return;
  const href = link.getAttribute('href');
  let name = null;
  if (href.startsWith('mailto:')) name = 'email_click';
  else if (href.includes('linkedin.com')) name = 'linkedin_click';
  else if (href.includes('github.com')) name = 'github_click';
  else if (href.endsWith('/rss.xml') || href.endsWith('rss.xml')) name = 'rss_click';
  else if (href.endsWith('jay-egger-resume.pdf')) name = 'resume_click';
  else if (href === '/contact/' || href.endsWith('/contact/')) name = 'contact_click';
  if (name) gtag('event', name, { href, label: link.textContent.trim().slice(0, 60) });
});

// Light marquee pause on hover
const marquee = document.querySelector('.marquee span');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}
