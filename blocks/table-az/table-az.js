export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const isHeader = block.classList.contains('grouped-header');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  let headerRowCount = 1;
  if (isHeader) {
    headerRowCount = 2;
  }

  rows.forEach((row, rowIdx) => {
    const cols = [...row.children];
    const isHeaderRow = rowIdx < headerRowCount;
    const tr = document.createElement('tr');

    cols.forEach((col) => {
      const cell = document.createElement(isHeaderRow ? 'th' : 'td');
      const text = col.textContent.trim();

      const colspanMatch = text.match(/\[colspan=(\d+)\]/);
      if (colspanMatch) {
        cell.setAttribute('colspan', colspanMatch[1]);
        col.innerHTML = col.innerHTML.replace(/\[colspan=\d+\]/, '').trim();
      }

      const rowspanMatch = text.match(/\[rowspan=(\d+)\]/);
      if (rowspanMatch) {
        cell.setAttribute('rowspan', rowspanMatch[1]);
        col.innerHTML = col.innerHTML.replace(/\[rowspan=\d+\]/, '').trim();
      }

      cell.innerHTML = col.innerHTML;

      const hasHighlight = col.classList.contains('highlight')
        || col.querySelector('.highlight')
        || text.includes('[highlight]');
      if (hasHighlight) {
        cell.classList.add('highlight');
        cell.innerHTML = cell.innerHTML.replace(/\[highlight\]/g, '').trim();
      }

      tr.append(cell);
    });

    if (isHeaderRow) {
      thead.append(tr);
    } else {
      tbody.append(tr);
    }
  });

  block.innerHTML = '';
  table.append(thead, tbody);
  block.append(table);
}
