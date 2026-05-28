export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row) => {
    const cols = [...row.children];
    const type = cols[0]?.textContent?.trim().toLowerCase() || '';
    const content = cols[1]?.textContent?.trim() || cols[0]?.textContent?.trim() || '';

    if (type === 'heading' || type === 'title') {
      const heading = document.createElement('p');
      heading.classList.add('toggle-az-heading');
      heading.innerHTML = `${cols[1]?.textContent?.trim() || ''} <span class="required">*</span>`;
      block.append(heading);
    } else if (type === 'note') {
      const note = document.createElement('p');
      note.classList.add('toggle-az-note');
      note.textContent = `* ${cols[1]?.textContent?.trim() || ''}`;
      block.append(note);
    } else {
      const item = document.createElement('div');
      item.classList.add('toggle-az-item');

      const text = document.createElement('span');
      text.classList.add('toggle-az-item-text');
      text.textContent = content;

      const toggle = document.createElement('button');
      toggle.classList.add('toggle-az-switch');
      toggle.setAttribute('role', 'switch');
      toggle.setAttribute('aria-checked', 'false');
      toggle.setAttribute('aria-label', content.substring(0, 50));

      toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        toggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
      });

      item.append(text, toggle);
      block.append(item);
    }
  });
}
