(() => {
  const config = window.VEYRA_CONFIG || {};

  const scrollbarStyle = document.createElement('style');
  scrollbarStyle.textContent = 'html{scrollbar-color:#e5393f #080808!important}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:#080808!important}::-webkit-scrollbar-thumb{background:#e5393f!important;border:3px solid #080808!important;border-radius:999px}::-webkit-scrollbar-thumb:hover{background:#ff4b52!important}::-webkit-scrollbar-corner{background:#080808!important}';
  document.head.appendChild(scrollbarStyle);

  // Keep internal section navigation out of the URL. No #hash is added.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Add dedicated detail pages beside the long-form product sections.
  const performanceCopy = document.querySelector('.split:not(.split-reverse) .copy-block');
  const clientCopy = document.querySelector('.split-reverse .copy-block');

  function addLearnMore(container, href) {
    if (!container || container.querySelector('.learn-more')) return;
    const link = document.createElement('a');
    link.className = 'button button-dark learn-more';
    link.href = href;
    link.textContent = 'LEARN MORE';
    container.appendChild(link);
  }

  addLearnMore(performanceCopy, 'performance.html');
  addLearnMore(clientCopy, 'client.html');

  const learnMoreStyle = document.createElement('style');
  learnMoreStyle.textContent = '.learn-more{margin-top:18px;min-height:35px;padding:0 14px;font-size:9px}.learn-more:hover{border-color:var(--red);color:var(--red)}';
  document.head.appendChild(learnMoreStyle);

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    nav.id = 'primary-nav';
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  document.querySelectorAll('[data-download]').forEach(link => {
    if (config.windowsDownload) {
      link.href = config.windowsDownload;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.addEventListener('click', event => {
        event.preventDefault();
        alert('The Veyra Windows release is not available yet.');
      });
    }
  });

  const stage = document.querySelector('.gallery-stage');
  const image = document.querySelector('.gallery-image');
  const dotsContainer = document.querySelector('.dots');
  const prev = document.querySelector('.gallery-button.prev');
  const next = document.querySelector('.gallery-button.next');
  const shots = Array.isArray(config.screenshots) ? config.screenshots.filter(Boolean) : [];
  let index = 0;

  if (!stage || !image || !dotsContainer || !shots.length) return;

  const dots = shots.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Screenshot ${i + 1}`);
    dot.addEventListener('click', () => show(i));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function show(i) {
    index = (i + shots.length) % shots.length;
    stage.classList.remove('missing-image');
    image.src = shots[index];
    image.alt = `Veyra client screenshot ${index + 1}`;
    dots.forEach((dot, n) => {
      dot.classList.toggle('active', n === index);
      dot.setAttribute('aria-current', n === index ? 'true' : 'false');
    });
  }

  image.addEventListener('error', () => stage.classList.add('missing-image'));
  prev?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));
  show(0);
})();
