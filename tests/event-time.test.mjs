import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarParts, daysUntil, calendarFile } from '../src/event-time.mjs';

const zone = 'Asia/Seoul';
const event = { startsAt: '2027-01-16T11:00:00+09:00' };
const start = new Date(event.startsAt);
test('D-day changes at Seoul midnight and lasts all wedding day', () => {
  for (const [now, days] of [['2027-01-15T14:59:59Z', 1], ['2027-01-15T15:00:00Z', 0], ['2027-01-16T14:59:59Z', 0], ['2027-01-16T15:00:00Z', -1]]) {
    assert.equal(daysUntil(start, new Date(now), zone), days);
  }
  assert.deepEqual(calendarParts(start, zone), { month: 1, day: 16, year: 2027 });
});
test('the exported event is 11 am in Seoul; Unicode venue lines survive folding', () => {
  const location = '지타워 컨벤션, ' + '서울특별시 구로구 디지털로26길 38'.repeat(3);
  const file = calendarFile(event, '결혼식', location, 'example.test', start);
  assert.match(file, /DTSTART:20270116T020000Z\r\n/);
  assert.doesNotMatch(file, /DTEND/);
  assert.ok(file.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
  assert.ok(file.replaceAll('\r\n ', '').includes('LOCATION:' + location.replace(',', '\\,')));
});
