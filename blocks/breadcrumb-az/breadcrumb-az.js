function createSeparator() {
  const sep = document.createElement('span');
  sep.classList.add('breadcrumb-separator');
  sep.setAttribute('aria-hidden', 'true');
  sep.innerHTML = '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return sep;
}

export default function decorate(block) {
  const links = block.querySelectorAll('a');
  if (!links.length) return;

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  links.forEach((link, idx) => {
    if (idx > 0) {
      nav.append(createSeparator());
    }

    if (idx === links.length - 1) {
      const current = document.createElement('span');
      current.classList.add('breadcrumb-current');
      current.setAttribute('aria-current', 'page');
      current.textContent = link.textContent;
      nav.append(current);
    } else {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent;
      nav.append(a);
    }
  });

  block.textContent = '';
  block.append(nav);
}
