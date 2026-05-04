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
  const stored = localStorage.getItem('theme');
  const dark = stored ? stored === 'dark' : true;
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

// Read More functionality - wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Get all read more buttons
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const article = this.closest('article');
      const details = article.querySelector('.project-details');
      
      if (details.style.display === 'block') {
        details.style.display = 'none';
        this.textContent = 'Read More';
      } else {
        details.style.display = 'block';
        this.textContent = 'Read Less';
      }
    });
  });

  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    const label = document.getElementById('copyEmailLabel');
    const original = label.textContent;
    copyBtn.addEventListener('click', async function () {
      const email = this.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = original; }, 1500);
    });
  }
});