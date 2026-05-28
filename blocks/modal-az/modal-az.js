import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const dialog = document.createElement('div');
  dialog.classList.add('modal-az-dialog');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('modal-az-close');
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  closeBtn.addEventListener('click', () => {
    block.classList.remove('modal-az-open');
  });

  const content = document.createElement('div');
  content.classList.add('modal-az-content');

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length === 1) {
      const el = cols[0];
      if (el.querySelector('picture')) {
        el.classList.add('modal-az-image');
      } else if (el.querySelector('a')) {
        el.classList.add('modal-az-actions');
      } else {
        el.classList.add('modal-az-text');
      }
      content.append(el);
    } else if (cols.length >= 2) {
      cols[0].classList.add('modal-az-image');
      cols[1].classList.add('modal-az-text');
      content.append(cols[0], cols[1]);
    }
    moveInstrumentation(row, content);
  });

  dialog.append(closeBtn, content);
  block.append(dialog);

  block.classList.add('modal-az-open');

  const backdrop = document.createElement('div');
  backdrop.classList.add('modal-az-backdrop');
  backdrop.addEventListener('click', () => {
    block.classList.remove('modal-az-open');
  });
  block.prepend(backdrop);
}
