export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const contentRows = rows.slice(1);

  block.innerHTML = '';

  const imageCol = imageRow?.children[0];
  if (imageCol) {
    const picture = imageCol.querySelector('picture');
    if (picture) {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('cta-banner-az-image');
      imageDiv.append(picture);
      block.append(imageDiv);
    }
  }

  const content = document.createElement('div');
  content.classList.add('cta-banner-az-content');

  contentRows.forEach((row) => {
    const col = row.children[0] || row;
    const text = col.textContent?.trim() || '';

    if (col.querySelector('a')) {
      col.classList.add('cta-banner-az-actions');
      content.append(col);
    } else if (text.startsWith('[select') || text.startsWith('[input')) {
      const fieldDiv = document.createElement('div');
      fieldDiv.classList.add('cta-banner-az-field');
      const labelMatch = text.match(/label="([^"]+)"/);
      const placeholderMatch = text.match(/placeholder="([^"]+)"/);
      const labelText = labelMatch ? labelMatch[1] : 'Input label';
      const placeholder = placeholderMatch ? placeholderMatch[1] : 'Placeholder text';

      fieldDiv.innerHTML = `<label>${labelText} *</label><select><option value="" disabled selected>${placeholder}</option></select><p class="supportive">Supportive text</p>`;
      content.append(fieldDiv);
    } else {
      content.append(...col.childNodes);
    }
  });

  block.append(content);
}
