const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  const hero = document.querySelector('.hero-copy');
  const field = document.querySelector('.ambient-field');

  window.addEventListener('pointermove', event => {
    if (!hero || !field) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    hero.style.transform = `translate3d(${x * 3}px, ${y * 2}px, 0)`;
    field.style.transform = `translate3d(${x * -5}px, ${y * -3}px, 0)`;
  }, { passive: true });
}
