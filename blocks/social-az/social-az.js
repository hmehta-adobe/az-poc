function createActionButton(label, svgHtml) {
  const btn = document.createElement('button');
  btn.setAttribute('aria-label', label);
  btn.innerHTML = svgHtml;
  return btn;
}

export default function decorate(block) {
  const text = block.querySelector('p')?.textContent?.trim() || '';
  block.innerHTML = '';

  const dateEl = document.createElement('span');
  dateEl.classList.add('social-az-date');
  dateEl.textContent = text;

  const actions = document.createElement('div');
  actions.classList.add('social-az-actions');

  const likeBtn = createActionButton('Like', '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C12 21 3 15.5 3 9.5C3 6.42 5.42 4 8.5 4C10.24 4 11.91 4.81 12 6C12.09 4.81 13.76 4 15.5 4C18.58 4 21 6.42 21 9.5C21 15.5 12 21 12 21Z"/></svg>');
  const saveBtn = createActionButton('Save', '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 3h14a1 1 0 011 1v18l-8-4-8 4V4a1 1 0 011-1z"/></svg>');
  const shareBtn = createActionButton('Share', '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>');

  actions.append(likeBtn, saveBtn, shareBtn);
  block.append(dateEl, actions);
}
