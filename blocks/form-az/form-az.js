export default function decorate(block) {
  const rows = [...block.children];
  const form = document.createElement('form');
  form.setAttribute('novalidate', '');

  let currentRow = null;

  rows.forEach((row) => {
    const cols = [...row.children];
    const type = cols[0]?.textContent?.trim().toLowerCase() || '';

    if (type === 'checkbox') {
      const checkboxes = form.querySelector('.form-checkboxes') || document.createElement('div');
      checkboxes.classList.add('form-checkboxes');

      const label = cols[1]?.textContent?.trim() || '';
      const checkbox = document.createElement('label');
      checkbox.classList.add('form-checkbox');
      checkbox.innerHTML = `<input type="checkbox"><span>${label}</span>`;
      checkboxes.append(checkbox);

      if (!form.querySelector('.form-checkboxes')) form.append(checkboxes);
    } else if (type === 'submit') {
      const label = cols[1]?.textContent?.trim() || 'Submit';
      const submitDiv = document.createElement('div');
      submitDiv.classList.add('form-submit');
      submitDiv.innerHTML = `<button type="submit">${label}</button>`;
      form.append(submitDiv);
    } else {
      if (!currentRow || currentRow.children.length >= 2) {
        currentRow = document.createElement('div');
        currentRow.classList.add('form-row');
        form.append(currentRow);
      }

      const field = document.createElement('div');
      field.classList.add('form-field');

      const labelText = cols[0]?.textContent?.trim() || '';
      const placeholder = cols[1]?.textContent?.trim() || '';
      const fieldType = cols[2]?.textContent?.trim().toLowerCase() || 'text';

      const labelEl = document.createElement('label');
      labelEl.innerHTML = `${labelText} <span class="required">*</span>`;
      field.append(labelEl);

      if (fieldType === 'select') {
        const select = document.createElement('select');
        select.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
        field.append(select);
      } else {
        const input = document.createElement('input');
        input.type = fieldType === 'password' ? 'password' : 'text';
        input.placeholder = placeholder;
        field.append(input);
      }

      currentRow.append(field);
    }
  });

  block.innerHTML = '';
  block.append(form);
}
