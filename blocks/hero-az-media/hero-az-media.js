export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const col = row.children[0];
  if (!col) return;

  const container = document.createElement('div');
  container.classList.add('media-container');

  const picture = col.querySelector('picture');
  const link = col.querySelector('a');

  if (link && (link.href.includes('youtube') || link.href.includes('vimeo') || link.href.endsWith('.mp4'))) {
    if (picture) container.append(picture);
    const playBtn = document.createElement('button');
    playBtn.classList.add('play-button');
    playBtn.setAttribute('aria-label', 'Play video');
    playBtn.addEventListener('click', () => {
      window.open(link.href, '_blank');
    });
    container.append(playBtn);
  } else if (picture) {
    container.append(picture);
  } else {
    container.append(...col.childNodes);
  }

  block.textContent = '';
  block.append(container);
}
