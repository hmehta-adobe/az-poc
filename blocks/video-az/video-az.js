function getVideoUrl(link) {
  const href = link?.href || '';
  if (href.includes('youtube.com/watch')) {
    const id = new URL(href).searchParams.get('v');
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (href.includes('youtu.be/')) {
    const id = href.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (href.includes('vimeo.com/')) {
    const id = href.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return href;
}

export default function decorate(block) {
  const rows = [...block.children];
  const firstRow = rows[0];
  const secondRow = rows[1];

  const link = firstRow?.querySelector('a');
  const picture = firstRow?.querySelector('picture');
  const caption = secondRow?.textContent?.trim();

  const container = document.createElement('div');
  container.classList.add('video-container');

  if (picture) {
    container.append(picture);
  }

  if (link) {
    const overlay = document.createElement('div');
    overlay.classList.add('video-overlay');

    const playBtn = document.createElement('button');
    playBtn.classList.add('video-play-btn');
    playBtn.setAttribute('aria-label', 'Play video');
    playBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>';

    overlay.append(playBtn);
    container.append(overlay);

    overlay.addEventListener('click', () => {
      const embedUrl = getVideoUrl(link);
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      container.textContent = '';
      container.append(iframe);
      container.classList.add('playing');
    });
  }

  block.textContent = '';
  block.append(container);

  if (caption) {
    const cap = document.createElement('p');
    cap.classList.add('video-caption');
    cap.textContent = caption;
    block.append(cap);
  }
}
