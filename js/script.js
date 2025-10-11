const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn?.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  mobileNav.hidden = expanded;
});
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('header nav a[href^="#"]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`header nav a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
sections.forEach(s => observer.observe(s));
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('hidden', window.scrollY < 500);
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();
const themeToggle = document.getElementById('themeToggle');
function applyTheme() {
  const dark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark', dark);
  themeToggle?.setAttribute('aria-pressed', String(dark));
  themeToggle.textContent = dark ? '☀️' : '🌙';
}
themeToggle?.addEventListener('click', () => {
  const isDark = localStorage.getItem('theme') === 'dark';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  applyTheme();
});
applyTheme();

// Toggle project details for Read More functionality using event delegation
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('read-more-btn')) {
    const button = e.target;
    const article = button.closest('article');
    const details = article.querySelector('.project-details');
    const isExpanded = details.style.display === 'block';
    
    if (isExpanded) {
      details.style.display = 'none';
      button.textContent = 'Read More';
    } else {
      details.style.display = 'block';
      button.textContent = 'Read Less';
    }
  }
});