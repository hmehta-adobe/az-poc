export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('teaser-row');
    const cols = [...row.children];

    cols.forEach((col) => {
      if (col.querySelector('picture')) {
        col.classList.add('column-image');
      } else {
        col.classList.add('column-content');
      }
    });
  });
}
