export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cols = [...row.children];
    const card = document.createElement('div');
    card.classList.add('card');

    if (cols[0]) {
      cols[0].classList.add('card-image');
      card.append(cols[0]);
    }

    if (cols[1]) {
      cols[1].classList.add('card-content');
      card.append(cols[1]);
    }

    row.replaceWith(card);
  });
}
