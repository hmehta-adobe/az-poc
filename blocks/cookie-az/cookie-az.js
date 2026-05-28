export default function decorate(block) {
  if (localStorage.getItem('cookie-consent')) {
    block.classList.add('hidden');
    return;
  }

  const rows = [...block.children];
  const messageRow = rows[0];
  const buttonsRow = rows[1];

  const inner = document.createElement('div');
  inner.classList.add('cookie-inner');

  const text = document.createElement('div');
  text.classList.add('cookie-text');
  if (messageRow) {
    text.innerHTML = messageRow.children[0]?.innerHTML || messageRow.innerHTML;
  }

  const actions = document.createElement('div');
  actions.classList.add('cookie-actions');

  const acceptLabel = buttonsRow?.children[0]?.textContent?.trim() || 'Accept All';
  const rejectLabel = buttonsRow?.children[1]?.textContent?.trim() || 'Reject All';

  const acceptBtn = document.createElement('button');
  acceptBtn.classList.add('cookie-btn-accept');
  acceptBtn.textContent = acceptLabel;
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    block.classList.add('hidden');
  });

  const rejectBtn = document.createElement('button');
  rejectBtn.classList.add('cookie-btn-reject');
  rejectBtn.textContent = rejectLabel;
  rejectBtn.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'rejected');
    block.classList.add('hidden');
  });

  actions.append(acceptBtn, rejectBtn);
  inner.append(text, actions);

  block.textContent = '';
  block.append(inner);
}
