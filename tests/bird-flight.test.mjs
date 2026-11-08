import test from 'node:test';
import assert from 'node:assert/strict';
import { flightFrames } from '../src/bird-flight.mjs';

function points(width, height) {
  return flightFrames(width, height).map(frame => {
    const values = [...frame.transform.matchAll(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g)].map(match => Number(match[0]));
    // The first number belongs to the transform name, translate3d.
    return { offset: frame.offset, x: values[1]+32, y: values[2]+32, bank: values[4], facing: values[5] };
  });
}

for (const [width,height] of [[320,568], [390,844], [550,720]]) {
  test(`flight is continuous, steady and turns offscreen at ${width}×${height}`, () => {
    const path = points(width, height);
    assert.deepEqual({...path[0], offset:1}, path.at(-1));
    assert.equal(path[0].offset, 0);
    assert.equal(path.at(-1).offset, 1);
    const speeds = [];
    let turns = 0;
    for (let i=1; i<path.length; i++) {
      const a=path[i-1], b=path[i];
      assert.ok(b.offset>a.offset);
      assert.ok(Number.isFinite(b.x+b.y+b.bank));
      speeds.push(Math.hypot(b.x-a.x,b.y-a.y)/(b.offset-a.offset));
      if (a.facing!==b.facing) {
        turns++;
        assert.ok((a.x<-64 && b.x<-64) || (a.x>width+64 && b.x>width+64), 'turn only after the whole bird exits');
      }
      if (b.x>=0 && b.x<=width) {
        assert.ok(b.y>64 && b.y<height-64, 'stay inside the vertical reading area');
        assert.equal(Math.sign(b.x-a.x), b.facing, 'face the direction of flight');
        assert.ok(Math.abs(b.bank-a.bank)<4, 'bank gradually through visible bends');
      }
    }
    assert.equal(turns, 2);
    assert.ok(Math.max(...speeds)/Math.min(...speeds)<1.001, 'no stop at a waypoint');
    for (const facing of [-1,1]) assert.ok(path.some(p=>p.x>width*.4 && p.x<width*.6 && p.facing===facing));
  });
}
