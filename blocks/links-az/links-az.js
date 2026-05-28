export default function decorate(block) {
  const rows = [...block.children];
  const ul = document.createElement('ul');

  rows.forEach((row) => {
    const cols = [...row.children];
    const li = document.createElement('li');
    const link = cols[0]?.querySelector('a');
    const type = cols[1]?.textContent?.trim().toLowerCase() || '';

    if (link) {
      li.append(link);
    } else {
      const text = cols[0]?.textContent?.trim() || '';
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = text;
      li.append(a);
    }

    if (type === 'child' || type === 'sub') {
      li.classList.add('child');
    }

    ul.append(li);
  });

  block.innerHTML = '';
  block.append(ul);
}
