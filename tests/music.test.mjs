import test from 'node:test';
import assert from 'node:assert/strict';
import { createBackgroundMusic } from '../src/music.mjs';

class Control extends EventTarget {
  dataset = {};
  attributes = {};
  setAttribute(name, value) { this.attributes[name] = value; }
  contains(target) { return target === this; }
}
class Audio extends EventTarget {
  paused = true;
  ended = false;
  currentTime = 0;
  calls = 0;
  blocked = false;
  deferred = false;
  play() {
    this.calls++;
    if (this.blocked) return Promise.reject(Object.assign(new Error('Gesture required'), {name: 'NotAllowedError'}));
    const begin = () => { this.paused = false; this.dispatchEvent(new Event('play')); };
    if (this.deferred) return new Promise(resolve => { this.finish = () => { begin(); resolve(); }; });
    begin();
    return Promise.resolve();
  }
  pause() { this.paused = true; this.dispatchEvent(new Event('pause')); }
}
const flush = () => new Promise(resolve => setImmediate(resolve));
function setup({ stored = null, blocked = false, deferred = false } = {}) {
  const audio = new Audio(); audio.blocked = blocked; audio.deferred = deferred;
  const page = new EventTarget(); page.hidden = false;
  const button = new Control(), label = {textContent: ''}, errors = [];
  const preferences = {get: () => stored, set: value => { stored = value; }};
  createBackgroundMusic({audio, button, label, page, preferences, onError: message => errors.push(message)});
  return {audio, page, button, label, preferences, errors};
}

test('starts on the cover without opening the invitation, and loops the supplied audio', async () => {
  const {audio, button} = setup();
  await flush();
  assert.equal(audio.calls, 1);
  assert.equal(audio.paused, false);
  assert.equal(audio.loop, true);
  assert.equal(button.attributes['aria-pressed'], 'true');
});

test('blocked autoplay waits for a gesture and shows an honest play control', async () => {
  const {audio, page, button, label, errors} = setup({blocked: true});
  await flush();
  assert.equal(label.textContent, '음악 켜기');
  assert.equal(button.attributes['aria-pressed'], 'false');
  assert.deepEqual(errors, []);
  audio.blocked = false;
  page.dispatchEvent(new Event('click'));
  await flush();
  assert.equal(audio.paused, false);
  assert.equal(label.textContent, '음악 끄기');
});

test('the music control handles the first tap once instead of auto-starting then stopping', async () => {
  const {audio, page, button} = setup({blocked: true});
  await flush();
  audio.blocked = false;
  const click = new Event('click');
  Object.defineProperty(click, 'target', {value: button});
  page.dispatchEvent(click);
  button.dispatchEvent(new Event('click'));
  await flush();
  assert.equal(audio.calls, 2);
  assert.equal(audio.paused, false);
});

test('an explicit off choice survives unrelated taps and tab changes, and resumes at the same position', async () => {
  const {audio, page, button, preferences} = setup();
  await flush();
  audio.currentTime = 27;
  button.dispatchEvent(new Event('click'));
  page.dispatchEvent(new Event('click'));
  page.hidden = true; page.dispatchEvent(new Event('visibilitychange'));
  page.hidden = false; page.dispatchEvent(new Event('visibilitychange'));
  await flush();
  assert.equal(audio.paused, true);
  assert.equal(audio.calls, 1);
  assert.equal(preferences.get(), 'off');
  const returning = setup({stored: preferences.get()});
  assert.equal(returning.audio.calls, 0);
  button.dispatchEvent(new Event('click'));
  await flush();
  assert.equal(audio.paused, false);
  assert.equal(audio.currentTime, 27);
});

test('leaving the page pauses music and returning resumes only an enabled player', async () => {
  const {audio, page} = setup();
  await flush();
  page.hidden = true; page.dispatchEvent(new Event('visibilitychange'));
  assert.equal(audio.paused, true);
  page.hidden = false; page.dispatchEvent(new Event('visibilitychange'));
  await flush();
  assert.equal(audio.paused, false);
});

test('switching off during a delayed play request cannot restart sound later', async () => {
  const {audio, button} = setup({deferred: true});
  button.dispatchEvent(new Event('click'));
  audio.finish();
  await flush();
  assert.equal(audio.paused, true);
  assert.equal(button.attributes['aria-pressed'], 'false');
});
