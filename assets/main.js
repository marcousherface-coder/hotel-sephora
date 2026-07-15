document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.getElementById('siteHeader');
  const solidByDefault = header && header.dataset.solid === 'true';
  if (header) {
    const applyScrollState = () => {
      if (solidByDefault) { header.classList.add('solid-static'); return; }
      header.classList.toggle('solid', window.scrollY > 40);
    };
    window.addEventListener('scroll', applyScrollState, {passive:true});
    applyScrollState();
  }

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.16});
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

  // simple page-to-page curtain transition for internal links
  const curtain = document.getElementById('curtain');
  if (curtain) {
    document.querySelectorAll('a[href$=".html"], a[href="index.html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const url = link.getAttribute('href');
        if (link.target === '_blank' || url.startsWith('http')) return;
        e.preventDefault();
        curtain.classList.add('leaving');
        setTimeout(() => { window.location.href = url; }, 420);
      });
    });
  }
});
