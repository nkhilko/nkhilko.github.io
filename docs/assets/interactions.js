(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const cases = [...document.querySelectorAll('[data-case]')];
  const sections = [...document.querySelectorAll('[data-nav-section]')];
  const links = new Map([...header.querySelectorAll('nav a')].map((link) => [link.hash, link]));
  let activeLink;

  root.classList.add('enhanced');

  function updateNavigation() {
    header.classList.toggle('compact', window.scrollY > 76);
    const marker = Math.max(110, window.innerHeight * 0.25);
    const visible = sections.filter((section) => section.getBoundingClientRect().top <= marker);
    const last = sections.at(-1);
    const atBottom = last.getBoundingClientRect().top < window.innerHeight &&
      window.innerHeight + window.scrollY >= root.scrollHeight - 3;
    const current = atBottom ? last : visible.at(-1);
    const next = current && links.get('#' + current.id);
    if (next !== activeLink) {
      activeLink?.removeAttribute('aria-current');
      next?.setAttribute('aria-current', 'location');
      activeLink = next;
    }
  }

  let queued = false;
  function scheduleNavigation() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      updateNavigation();
    });
  }

  function revealLinkedCase() {
    const target = cases.find((item) => '#' + item.id === location.hash);
    if (!target) return;
    cases.forEach((other) => { if (other !== target) other.open = false; });
    target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }

  function closeCase(item) {
    const summary = item.firstElementChild;
    item.open = false;
    summary.focus({ preventScroll: true });
    if (summary.getBoundingClientRect().bottom < header.getBoundingClientRect().bottom) {
      item.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }

  cases.forEach((item) => {
    const summary = item.firstElementChild;
    const resetProjectHash = () => {
      if (location.hash === '#' + item.id) {
        history.replaceState(null, '', '#' + item.closest('section').id);
      }
    };
    summary.addEventListener('click', (event) => {
      if (item.open) {
        resetProjectHash();
        return;
      }
      event.preventDefault();
      const oldTop = summary.getBoundingClientRect().top;
      cases.forEach((other) => { if (other !== item) other.open = false; });
      item.open = true;
      const movedBy = summary.getBoundingClientRect().top - oldTop;
      if (Math.abs(movedBy) > 2) window.scrollBy({ top: movedBy, behavior: 'instant' });
      if (cases.some((other) => location.hash === '#' + other.id) && location.hash !== '#' + item.id) {
        history.replaceState(null, '', '#' + item.id);
      }
      scheduleNavigation();
    });
    item.querySelector('[data-close]').addEventListener('click', () => {
      resetProjectHash();
      closeCase(item);
    });
    item.querySelector('[data-project-link]').addEventListener('click', (event) => {
      event.preventDefault();
      history.replaceState(null, '', '#' + item.id);
      item.scrollIntoView({ block: 'start' });
      summary.focus({ preventScroll: true });
    });
    item.addEventListener('toggle', scheduleNavigation);
  });

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const motion = new IntersectionObserver((entries, observer) => {
      entries.filter(({ isIntersecting }) => isIntersecting).forEach(({ target }) => {
        target.classList.add(target.hasAttribute('data-diagram') ? 'diagram-enter' : 'reveal-enter');
        observer.unobserve(target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal], [data-diagram]').forEach((item) => motion.observe(item));
  }

  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation, { passive: true });
  window.addEventListener('hashchange', revealLinkedCase);
  revealLinkedCase();
  updateNavigation();
})();
