export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent?.trim() || 'Select';
    const options = cols[1]?.textContent?.trim().split(',').map((o) => o.trim()) || [];

    const wrapper = document.createElement('div');
    wrapper.classList.add('sortbar-az-select');

    const select = document.createElement('select');
    select.setAttribute('aria-label', label);

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = label;
    select.append(defaultOpt);

    options.forEach((opt) => {
      if (opt) {
        const option = document.createElement('option');
        option.value = opt.toLowerCase().replace(/\s+/g, '-');
        option.textContent = opt;
        select.append(option);
      }
    });

    wrapper.append(select);
    block.append(wrapper);
  });
}
