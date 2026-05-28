export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent?.trim() || '';
    const variant = cols[1]?.textContent?.trim().toLowerCase() || '';

    const chip = document.createElement('span');
    chip.classList.add('chip');

    if (variant.includes('small')) chip.classList.add('chip-small');
    if (variant.includes('light')) chip.classList.add('chip-light');
    if (variant.includes('active')) chip.classList.add('chip-active');

    const infoIcon = document.createElement('span');
    infoIcon.classList.add('chip-icon');
    infoIcon.innerHTML = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 7v4M8 5h0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

    const text = document.createElement('span');
    text.classList.add('chip-label');
    text.textContent = label;

    const closeIcon = document.createElement('span');
    closeIcon.classList.add('chip-icon', 'chip-close');
    closeIcon.innerHTML = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    closeIcon.addEventListener('click', () => chip.remove());

    chip.append(infoIcon, text, closeIcon);
    block.append(chip);
  });
}
