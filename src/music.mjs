// Use a direct audio file when supplied. Until then, the official Spotify
// player offers its clearly labelled preview without installing the app.
export function createMusicPlayer(music) {
  const dock = document.querySelector('.music-dock');
  const toggle = document.querySelector('#music-toggle');
  const label = document.querySelector('#music-toggle-label');
  const panel = document.querySelector('#music-panel');
  const frame = document.querySelector('#music-frame');
  const close = document.querySelector('#music-close');
  const notice = document.querySelector('#music-notice');
  const link = document.querySelector('#music-link');
  let audioUrl = '';
  try {
    const url = new URL(music.audioUrl, document.baseURI);
    if (music.audioUrl && (url.protocol === 'https:' || url.origin === location.origin)) audioUrl = url.href;
  } catch { /* An incomplete setting keeps the official preview available. */ }
  const title = music.title;
  document.querySelector('.music-title').textContent = title;
  document.querySelector('.music-artist').textContent = music.artist;
  const idleLabel = audioUrl ? '음악 듣기' : '음악 미리듣기';
  label.textContent = idleLabel;
  link.hidden = !!audioUrl;
  link.href = 'https://open.spotify.com/track/' + encodeURIComponent(music.spotifyTrackId);

  function closePlayer() {
    const audio = frame.querySelector('audio');
    if (audio) { audio.pause(); audio.removeAttribute('src'); audio.load(); }
    frame.replaceChildren();
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    label.textContent = idleLabel;
  }

  function openPlayer() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    label.textContent = '음악 닫기';
    notice.textContent = audioUrl ? '' : '30초 미리듣기';
    notice.hidden = !!audioUrl;
    if (audioUrl) {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.loop = true;
      audio.preload = 'none';
      audio.setAttribute('aria-label', title + ' 재생');
      audio.src = audioUrl;
      audio.volume = .45;
      audio.addEventListener('error', () => {
        notice.textContent = '음악을 불러오지 못했어요. 잠시 후 다시 눌러주세요.';
        notice.hidden = false;
      });
      frame.replaceChildren(audio);
      audio.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    } else {
      const player = document.createElement('iframe');
      player.title = music.artist + ' — ' + title + ' 미리듣기';
      player.width = '100%';
      player.height = '152';
      player.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
      player.allowFullscreen = true;
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.src = 'https://open.spotify.com/embed/track/' + encodeURIComponent(music.spotifyTrackId) + '?theme=0';
      frame.replaceChildren(player);
    }
  }

  toggle.addEventListener('click', () => panel.hidden ? openPlayer() : closePlayer());
  close.addEventListener('click', () => { closePlayer(); toggle.focus(); });
  dock.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) { closePlayer(); toggle.focus(); }
  });
  // Photo/contact dialogs cover the controls without interrupting the music.
  document.addEventListener('visibilitychange', () => { if (document.hidden) closePlayer(); });
  window.addEventListener('pagehide', closePlayer);
  return { show() { dock.hidden = false; } };
}
