export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const questions = [];
  let currentQuestion = null;

  rows.forEach((row) => {
    const cols = [...row.children];
    const type = cols[0]?.textContent?.trim().toLowerCase() || '';

    if (type === 'question') {
      currentQuestion = {
        title: cols[1]?.textContent?.trim() || '',
        subtitle: '',
        options: [],
      };
      questions.push(currentQuestion);
    } else if (type === 'subtitle' && currentQuestion) {
      currentQuestion.subtitle = cols[1]?.textContent?.trim() || '';
    } else if (type === 'option' && currentQuestion) {
      currentQuestion.options.push(cols[1]?.textContent?.trim() || '');
    }
  });

  if (!questions.length) return;

  let currentIdx = 0;

  function render() {
    block.innerHTML = '';
    const q = questions[currentIdx];
    const total = questions.length;

    const progress = document.createElement('div');
    progress.classList.add('quiz-az-progress');
    const fill = document.createElement('div');
    fill.classList.add('quiz-az-progress-fill');
    fill.style.width = `${((currentIdx + 1) / total) * 100}%`;
    fill.textContent = `${currentIdx + 1}/${total}`;
    progress.append(fill);

    const card = document.createElement('div');
    card.classList.add('quiz-az-card');
    const inner = document.createElement('div');
    inner.classList.add('quiz-az-card-inner');

    const title = document.createElement('h3');
    title.textContent = q.title;
    inner.append(title);

    if (q.subtitle) {
      const sub = document.createElement('p');
      sub.textContent = q.subtitle;
      inner.append(sub);
    }

    if (q.options.length) {
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('quiz-az-options');
      q.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.classList.add('quiz-az-option');
        label.innerHTML = `<input type="radio" name="q${currentIdx}" value="${i}"><span>${opt}</span>`;
        optionsDiv.append(label);
      });
      inner.append(optionsDiv);
    }

    const nav = document.createElement('div');
    nav.classList.add('quiz-az-nav');

    if (currentIdx > 0) {
      const prevBtn = document.createElement('button');
      prevBtn.textContent = '← Previous question';
      prevBtn.addEventListener('click', () => { currentIdx -= 1; render(); });
      nav.append(prevBtn);
    }

    if (currentIdx < total - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('primary');
      nextBtn.textContent = 'Next question →';
      nextBtn.addEventListener('click', () => { currentIdx += 1; render(); });
      nav.append(nextBtn);
    }

    inner.append(nav);
    card.append(inner);
    block.append(progress, card);
  }

  render();
}
