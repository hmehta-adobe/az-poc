export default function decorate(block) {
  const rows = [...block.children];
  const tabList = document.createElement('div');
  tabList.classList.add('tabs-az-list');
  tabList.setAttribute('role', 'tablist');

  const panels = [];

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent?.trim() || `Tab ${idx + 1}`;

    const tab = document.createElement('button');
    tab.classList.add('tabs-az-tab');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', `tabs-az-panel-${idx}`);
    tab.id = `tabs-az-tab-${idx}`;
    tab.textContent = label;
    tabList.append(tab);

    const panel = document.createElement('div');
    panel.classList.add('tabs-az-panel');
    if (idx === 0) panel.classList.add('active');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tabs-az-tab-${idx}`);
    panel.id = `tabs-az-panel-${idx}`;
    if (cols[1]) {
      panel.append(...cols[1].childNodes);
    }
    panels.push(panel);
  });

  block.innerHTML = '';
  block.append(tabList);

  const dropdown = document.createElement('div');
  dropdown.classList.add('tabs-az-dropdown');

  const dropdownActive = document.createElement('button');
  dropdownActive.classList.add('tabs-az-dropdown-active');
  dropdownActive.textContent = rows[0]?.children[0]?.textContent?.trim() || 'Tab 1';

  const dropdownToggle = document.createElement('button');
  dropdownToggle.classList.add('tabs-az-dropdown-toggle');
  dropdownToggle.setAttribute('aria-label', 'Show tabs');
  dropdownToggle.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  dropdown.append(dropdownActive, dropdownToggle);
  block.append(dropdown);

  const dropdownMenu = document.createElement('div');
  dropdownMenu.classList.add('tabs-az-dropdown-menu');
  rows.forEach((row, idx) => {
    const label = row.children[0]?.textContent?.trim() || `Tab ${idx + 1}`;
    const menuBtn = document.createElement('button');
    menuBtn.textContent = label;
    menuBtn.dataset.index = idx;
    dropdownMenu.append(menuBtn);
  });
  block.append(dropdownMenu);

  panels.forEach((panel) => block.append(panel));

  function switchTab(index) {
    tabList.querySelectorAll('.tabs-az-tab').forEach((t, i) => {
      t.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    block.querySelectorAll('.tabs-az-panel').forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });
    dropdownActive.textContent = tabList.querySelectorAll('.tabs-az-tab')[index]?.textContent || '';
    dropdownMenu.classList.remove('open');
  }

  tabList.addEventListener('click', (e) => {
    const tab = e.target.closest('.tabs-az-tab');
    if (!tab) return;
    const index = [...tabList.children].indexOf(tab);
    switchTab(index);
  });

  dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('open');
  });

  dropdownMenu.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    switchTab(parseInt(btn.dataset.index, 10));
  });
}
