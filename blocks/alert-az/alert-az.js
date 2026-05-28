const ICONS = {
  info: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 16v-4M12 8h0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  success: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12l3 3 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  warning: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 20h20L12 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 9v4M12 16h0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  error: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

export default function decorate(block) {
  const rows = [...block.children];
  const message = rows[0]?.textContent?.trim() || '';

  let variant = 'info';
  if (block.classList.contains('success')) variant = 'success';
  else if (block.classList.contains('warning')) variant = 'warning';
  else if (block.classList.contains('error')) variant = 'error';

  const container = document.createElement('div');
  container.classList.add('alert-container');
  container.setAttribute('role', 'alert');

  const icon = document.createElement('span');
  icon.classList.add('alert-icon');
  icon.innerHTML = ICONS[variant];

  const content = document.createElement('div');
  content.classList.add('alert-content');
  content.innerHTML = rows[0]?.children[0]?.innerHTML || `<p>${message}</p>`;

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('alert-close');
  closeBtn.setAttribute('aria-label', 'Dismiss');
  closeBtn.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  closeBtn.addEventListener('click', () => {
    block.remove();
  });

  container.append(icon, content, closeBtn);
  block.textContent = '';
  block.append(container);
}
