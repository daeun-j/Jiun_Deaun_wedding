import { flightFrames, FLIGHT_DURATION } from './bird-flight.mjs?v=smooth-flight';

// One uninterrupted story: opening → flight → two landings → camellias in colour.
// Both animation clocks pause with the page; no wall-clock timer skips the ending.
export function createBirdStory() {
  const body = document.body;
  const scene = document.querySelector('.camellia-story');
  const branch = scene.querySelector('.camellia-branch');
  const birds = [...scene.querySelectorAll('.landing-bird')];
  const journey = document.querySelector('.bird-journey');
  const traveler = journey.querySelector('.traveling-bird');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;
  let away = !document.hasFocus();
  let sceneVisible = false;
  let sceneReady = false;
  let stage = 'closed';
  let flight;

  // Reuse the painted sheet as a fixed body and two articulated wings. Never
  // replace the whole bird with another frame, which shifts its head and chest.
  document.querySelectorAll('.sparrow').forEach(sparrow => {
    const rig = document.createElement('span');
    rig.className = 'sparrow-flight';
    for (const name of ['sparrow-wing sparrow-wing-far', 'sparrow-body', 'sparrow-wing sparrow-wing-near']) {
      const part = document.createElement('span');
      part.className = name;
      rig.append(part);
    }
    sparrow.append(rig);
  });

  function resizeFlight() {
    if (!started || reducedMotion.matches) return;
    const frames = flightFrames(journey.clientWidth, journey.clientHeight);
    if (flight) flight.effect.setKeyframes(frames);
    else flight = traveler.animate(frames, { duration: FLIGHT_DURATION, iterations: Infinity, easing: 'linear' });
  }
  new ResizeObserver(() => { resizeFlight(); sync(); }).observe(journey);

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
    if (flight) {
      const play = !hidden && stage === 'flying' && !reducedMotion.matches;
      if (play && flight.playState !== 'running') flight.play();
      else if (!play && flight.playState !== 'paused') flight.pause();
    }
    if (hidden) return;
    if (stage === 'flying' && sceneReady && branch.complete && branch.naturalWidth) {
      if (reducedMotion.matches) settle();
      else setStage('landing');
      flight?.pause();
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
  reducedMotion.addEventListener('change', () => { resizeFlight(); sync(); });

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
      resizeFlight();
      sync();
    }
  };
}
