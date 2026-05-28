function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  if (current <= 4) {
    for (let i = 1; i <= 5; i += 1) pages.push(i);
    pages.push('...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...');
    for (let i = total - 4; i <= total; i += 1) pages.push(i);
  } else {
    pages.push(1, '...');
    for (let i = current - 1; i <= current + 1; i += 1) pages.push(i);
    pages.push('...', total);
  }
  return pages;
}

export default function decorate(block) {
  const rows = [...block.children];
  const config = {};

  rows.forEach((row) => {
    const cols = [...row.children];
    const key = cols[0]?.textContent?.trim().toLowerCase();
    const value = cols[1]?.textContent?.trim();
    if (key && value) config[key] = value;
  });

  const totalPages = parseInt(config.pages || '12', 10);
  const currentPage = parseInt(config.current || '1', 10);
  const showLabels = (config.variant || 'icon-text') === 'icon-text';

  block.innerHTML = '';

  const chevronLeft = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-6 6 6 6"/></svg>';
  const chevronRight = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4l6 6-6 6"/></svg>';

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('pagination-az-nav');
  if (currentPage === 1) prevBtn.classList.add('disabled');
  prevBtn.innerHTML = `${chevronLeft}${showLabels ? '<span>Previous</span>' : ''}`;
  prevBtn.setAttribute('aria-label', 'Previous page');
  block.append(prevBtn);

  const pages = getPageNumbers(currentPage, totalPages);
  pages.forEach((page) => {
    if (page === '...') {
      const ellipsis = document.createElement('span');
      ellipsis.classList.add('pagination-az-ellipsis');
      ellipsis.textContent = '...';
      block.append(ellipsis);
    } else {
      const item = document.createElement('a');
      item.classList.add('pagination-az-item');
      item.textContent = page;
      item.href = `?page=${page}`;
      if (page === currentPage) item.classList.add('active');
      block.append(item);
    }
  });

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('pagination-az-nav');
  if (currentPage === totalPages) nextBtn.classList.add('disabled');
  nextBtn.innerHTML = `${showLabels ? '<span>Next</span>' : ''}${chevronRight}`;
  nextBtn.setAttribute('aria-label', 'Next page');
  block.append(nextBtn);
}
