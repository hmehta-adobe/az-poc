export default function decorate(block) {
  const rows = [...block.children];

  const inner = document.createElement('div');
  inner.classList.add('hero-branded-inner');

  const content = document.createElement('div');
  content.classList.add('hero-branded-content');

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('hero-branded-image');

  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      const picture = col.querySelector('picture');
      if (picture && !imageDiv.querySelector('picture')) {
        const img = picture.querySelector('img');
        if (img && (img.alt?.toLowerCase().includes('logo') || img.alt?.toLowerCase().includes('brand'))) {
          const logoDiv = document.createElement('div');
          logoDiv.classList.add('hero-branded-logo');
          logoDiv.append(picture);
          content.append(logoDiv);
        } else {
          imageDiv.append(picture);
        }
      } else {
        const textDiv = document.createElement('div');
        textDiv.classList.add('hero-branded-text');
        textDiv.append(...col.childNodes);
        content.append(textDiv);
      }
    });
  });

  block.innerHTML = '';
  inner.append(content, imageDiv);
  block.append(inner);
}
