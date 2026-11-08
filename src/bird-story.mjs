// One uninterrupted story: opening → flight → two landings → camellias in colour.
// CSS animation time pauses with the page; no wall-clock timers skip the ending.
export function createBirdStory() {
  const body = document.body;
  const scene = document.querySelector('.camellia-story');
  const branch = scene.querySelector('.camellia-branch');
  const birds = [...scene.querySelectorAll('.landing-bird')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;
  let away = !document.hasFocus();
  let sceneVisible = false;
  let sceneReady = false;
  let stage = 'closed';

  function setStage(next) {
    stage = next;
    body.dataset.birdStory = stage;
  }

  function settle() {
    birds.forEach(bird => bird.classList.add('is-perched'));
    setStage('settled');
  }

  function sync() {
    const hidden = !started || away || document.hidden || !!document.querySelector('dialog[open]') || !!document.fullscreenElement;
    body.dataset.birdsHidden = String(hidden);
    // Keep a partially seen ending paused until the guest scrolls back to it.
    body.dataset.birdsPaused = String(hidden || (stage !== 'flying' && !sceneVisible));
    if (hidden) return;
    if (stage === 'flying' && sceneReady && branch.complete && branch.naturalWidth) {
      if (reducedMotion.matches) settle();
      else setStage('landing');
    } else if (reducedMotion.matches && ['landing', 'blooming'].includes(stage)) {
      settle();
    }
  }

  const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    sceneVisible = entry.isIntersecting && entry.intersectionRatio > .05;
    sceneReady = entry.isIntersecting && entry.intersectionRatio >= .55;
    sync();
  }, { threshold: [0, .05, .55] });
  observer.observe(scene);
  branch.addEventListener('load', sync);

  scene.addEventListener('animationend', event => {
    if (stage === 'landing' && event.target.matches('.landing-bird')) {
      event.target.classList.add('is-perched');
      if (birds.every(bird => bird.classList.contains('is-perched'))) setStage('blooming');
    } else if (event.target === branch && event.animationName === 'camellia-colour') {
      setStage('settled');
    }
    sync();
  });

  // The photo viewer and contact sheet must never have decorative birds over them.
  const dialogs = new MutationObserver(sync);
  document.querySelectorAll('dialog').forEach(dialog => dialogs.observe(dialog, { attributes: true, attributeFilter: ['open'] }));
  document.addEventListener('fullscreenchange', sync);
  reducedMotion.addEventListener('change', sync);

  const leave = () => { away = true; sync(); };
  const returnToInvitation = () => { away = false; sync(); };
  window.addEventListener('blur', leave);
  window.addEventListener('focus', returnToInvitation);
  window.addEventListener('pagehide', leave);
  window.addEventListener('pageshow', returnToInvitation);
  document.addEventListener('visibilitychange', () => {
    away = document.hidden;
    sync();
  });
  // Hide before handing off to a map, another tab, or an external application.
  // A normal pointer/key interaction also restores the page after a blocked popup.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || event.defaultPrevented) return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || destination.pathname !== location.pathname) leave();
  });
  document.addEventListener('pointerdown', returnToInvitation, { passive: true });
  document.addEventListener('keydown', returnToInvitation);

  setStage('closed');
  sync();
  return {
    start() {
      if (started) return;
      started = true;
      setStage('flying');
      sync();
    }
  };
}
