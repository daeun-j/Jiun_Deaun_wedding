import test from 'node:test';
import assert from 'node:assert/strict';
import { tmapNavigation } from '../src/navigation.mjs';

const destination = { name: '지타워 컨벤션', longitude: 126.895539, latitude: 37.479684 };

test('iPhone and desktop-mode iPad pass the exact venue name and WGS84 coordinates', () => {
  for (const device of [{userAgent: 'iPhone'}, {userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 5}]) {
    const link = tmapNavigation(destination, device);
    const url = new URL(link.href);
    assert.equal(link.mobile, true);
    assert.equal(url.protocol, 'tmap:');
    assert.equal(url.searchParams.get('rGoName'), destination.name);
    assert.equal(Number(url.searchParams.get('rGoX')), destination.longitude);
    assert.equal(Number(url.searchParams.get('rGoY')), destination.latitude);
  }
});

test('Android provides the venue destination and a TMAP installation fallback', () => {
  const link = tmapNavigation(destination, {userAgent: 'Android'});
  const url = new URL(link.href);
  assert.equal(link.mobile, true);
  assert.equal(url.protocol, 'intent:');
  assert.equal(url.searchParams.get('goalname'), destination.name);
  assert.equal(Number(url.searchParams.get('goalx')), destination.longitude);
  assert.equal(Number(url.searchParams.get('goaly')), destination.latitude);
  assert.match(url.hash, /package=com\.skt\.tmap\.ku;/);
  assert.match(decodeURIComponent(url.hash), /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.skt\.tmap\.ku/);
});

test('desktop is identified for a helpful notice rather than an unsupported app launch', () => {
  assert.equal(tmapNavigation(destination, {userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 0}).mobile, false);
});
