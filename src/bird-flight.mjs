export const FLIGHT_DURATION = 36000;

// A continuous loop with both turns beyond the clipping edges. Sampling by arc
// length gives the browser a steady speed instead of easing to a stop at each bend.
export function flightFrames(width, height) {
  const w = Math.max(1, width), h = Math.max(1, height);
  const curves = [
    [[-100, .64*h], [.12*w, .64*h], [.17*w, .24*h], [.43*w, .28*h]],
    [[.43*w, .28*h], [.70*w, .32*h], [.9*w, .48*h], [w+100, .42*h]],
    [[w+100, .42*h], [w+230, .35*h], [w+230, .69*h], [w+100, .65*h]],
    [[w+100, .65*h], [.78*w, .61*h], [.72*w, .38*h], [.48*w, .42*h]],
    [[.48*w, .42*h], [.24*w, .46*h], [.15*w, .56*h], [-100, .36*h]],
    [[-100, .36*h], [-230, .29*h], [-230, .64*h], [-100, .64*h]],
  ];
  const samples = [];
  let distance = 0;
  curves.forEach((points, curveIndex) => {
    for (let step = curveIndex ? 1 : 0; step <= 60; step++) {
      const t = step / 60, u = 1-t;
      const [a,b,c,d] = points;
      const coordinate = axis => u**3*a[axis] + 3*u*u*t*b[axis] + 3*u*t*t*c[axis] + t**3*d[axis];
      const derivative = axis => 3*u*u*(b[axis]-a[axis]) + 6*u*t*(c[axis]-b[axis]) + 3*t*t*(d[axis]-c[axis]);
      const x = coordinate(0), y = coordinate(1), dx = derivative(0), dy = derivative(1);
      const facing = dx < 0 ? -1 : 1;
      const bank = Math.max(-12, Math.min(12, Math.atan2(dy*facing, Math.abs(dx)) * 180/Math.PI * .35));
      const previous = samples.at(-1);
      if (previous) distance += Math.hypot(x-previous.x, y-previous.y);
      samples.push({ x, y, facing, bank, distance });
    }
  });
  return samples.map(({x, y, facing, bank, distance: at}) => ({
    offset: at/distance,
    transform: `translate3d(${x-32}px, ${y-32}px, 0) rotate(${bank}deg) scaleX(${facing})`,
  }));
}
