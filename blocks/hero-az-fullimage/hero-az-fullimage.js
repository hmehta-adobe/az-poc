export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cols = [...row.children];

  const backgroundDiv = document.createElement('div');
  backgroundDiv.classList.add('hero-background');

  if (cols[0]) {
    const picture = cols[0].querySelector('picture');
    if (picture) {
      backgroundDiv.append(picture);
    }
  }

  const overlay = document.createElement('div');
  overlay.classList.add('hero-overlay');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('hero-content');

  if (cols[1]) {
    contentDiv.append(...cols[1].childNodes);
  }

  block.textContent = '';
  block.append(backgroundDiv, overlay, contentDiv);
}
