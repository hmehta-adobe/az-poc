import { fetchPlaceholders } from '../../scripts/aem.js';

async function fetchData(source) {
  const response = await fetch(source);
  if (!response.ok) return null;
  const json = await response.json();
  return json?.data || null;
}

function filterData(searchTerms, data) {
  if (!data) return [];
  return data.filter((item) => {
    const content = `${item.title} ${item.description || ''} ${item.path}`.toLowerCase();
    return searchTerms.every((term) => content.includes(term));
  }).slice(0, 5);
}

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();
  const source = block.querySelector('a[href]')?.href || `${window.hlx.codeBasePath}/query-index.json`;
  block.innerHTML = '';

  const box = document.createElement('div');
  box.classList.add('search-az-box');

  const searchIcon = document.createElement('span');
  searchIcon.classList.add('search-az-icon');
  searchIcon.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="6" stroke-width="2"/><path d="M13.5 13.5L17 17" stroke-width="2" stroke-linecap="round"/></svg>';

  const input = document.createElement('input');
  input.type = 'search';
  input.classList.add('search-az-input');
  input.placeholder = placeholders.searchPlaceholder || 'search by keyword...';
  input.setAttribute('aria-label', 'Search');

  const clearBtn = document.createElement('button');
  clearBtn.classList.add('search-az-clear');
  clearBtn.setAttribute('aria-label', 'Clear search');
  clearBtn.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 5l10 10M15 5L5 15" stroke-width="2" stroke-linecap="round"/></svg>';

  box.append(searchIcon, input, clearBtn);

  const dropdown = document.createElement('ul');
  dropdown.classList.add('search-az-dropdown');

  block.append(box, dropdown);

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.classList.remove('visible');
    block.classList.remove('search-az-expanded');
    dropdown.innerHTML = '';
    input.focus();
  });

  let debounceTimer;
  input.addEventListener('input', () => {
    const value = input.value.trim();

    if (value.length > 0) {
      clearBtn.classList.add('visible');
    } else {
      clearBtn.classList.remove('visible');
      block.classList.remove('search-az-expanded');
      dropdown.innerHTML = '';
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (value.length < 2) return;

      const searchTerms = value.toLowerCase().split(/\s+/).filter(Boolean);
      const data = await fetchData(source);
      const results = filterData(searchTerms, data);

      dropdown.innerHTML = '';

      if (results.length > 0) {
        block.classList.add('search-az-expanded');
        results.forEach((result) => {
          const li = document.createElement('li');
          li.textContent = result.title || result.path;
          li.addEventListener('click', () => {
            window.location.href = result.path;
          });
          dropdown.append(li);
        });

        const moreLi = document.createElement('li');
        moreLi.classList.add('search-az-more');
        const moreBtn = document.createElement('button');
        moreBtn.type = 'button';
        moreBtn.textContent = 'Show more';
        moreBtn.addEventListener('click', () => {
          window.location.href = `/search?q=${encodeURIComponent(value)}`;
        });
        moreLi.append(moreBtn);
        dropdown.append(moreLi);
      } else {
        block.classList.remove('search-az-expanded');
      }
    }, 300);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearBtn.click();
    }
  });
}
