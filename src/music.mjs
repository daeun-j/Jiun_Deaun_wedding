const preferenceKey = 'jiun-daeun-music';
const savedPreference = {
  get() { try { return localStorage.getItem(preferenceKey); } catch { return null; } },
  set(value) { try { localStorage.setItem(preferenceKey, value); } catch { /* Playback also works without storage. */ } }
};

// Audible autoplay depends on the browser. Keep a real play control available
// on the cover, and retry synchronously within the guest's first interaction.
export function createBackgroundMusic({ audio, button, label, page = document, preferences = savedPreference, onError = () => {} }) {
  let wanted = preferences.get() !== 'off';
  let pending = false;
  let attempt = 0;
  // The playback asset is already attenuated to 50%, including on iOS.
  // Keep the native volume unchanged so desktop playback is not halved again.
  audio.loop = true;

  function render() {
    const playing = !audio.paused && !audio.ended;
    button.dataset.music = playing ? 'playing' : pending ? 'loading' : 'paused';
    button.setAttribute('aria-pressed', String(playing));
    const action = playing || pending ? '음악 끄기' : '음악 켜기';
    button.setAttribute('aria-label', action);
    label.textContent = action;
  }

  async function play() {
    if (!wanted || page.hidden || pending) return;
    const currentAttempt = ++attempt;
    pending = true;
    render();
    try {
      await audio.play();
      if (!wanted || page.hidden) audio.pause();
    } catch (error) {
      if (currentAttempt === attempt && !['NotAllowedError', 'AbortError'].includes(error.name)) {
        onError('음악을 불러오지 못했어요. 음악 켜기를 눌러 다시 시도해 주세요.');
      }
    } finally {
      if (currentAttempt === attempt) {
        pending = false;
        render();
      }
    }
  }

  function pause() {
    ++attempt;
    pending = false;
    audio.pause();
    render();
  }

  button.addEventListener('click', () => {
    if (!audio.paused || pending) {
      wanted = false;
      preferences.set('off');
      pause();
    } else {
      wanted = true;
      preferences.set('on');
      play();
    }
  });

  function retryFromGesture(event) {
    // The music button handles its own click; never start then immediately stop.
    if (button.contains(event.target)) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    if (wanted && audio.paused && !pending) play();
  }
  page.addEventListener('click', retryFromGesture, true);
  page.addEventListener('keydown', retryFromGesture, true);
  page.addEventListener('visibilitychange', () => {
    if (page.hidden) pause();
    else if (wanted) play();
  });
  for (const event of ['play', 'playing', 'pause', 'ended']) audio.addEventListener(event, render);
  render();
  if (wanted) play();
}
