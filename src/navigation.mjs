// TMAP uses different destination parameter names on iOS and Android.
export function tmapNavigation(destination, device = {}) {
  const agent = device.userAgent || '';
  const ios = /iPhone|iPad|iPod/i.test(agent) || (device.platform === 'MacIntel' && device.maxTouchPoints > 1);
  const android = /Android/i.test(agent);
  const name = encodeURIComponent(destination.name);
  const { longitude: x, latitude: y } = destination;
  if (ios) return { mobile: true, href: `tmap://route?rGoName=${name}&rGoX=${x}&rGoY=${y}` };
  const route = `route?goalname=${name}&goalx=${x}&goaly=${y}`;
  if (android) {
    const store = encodeURIComponent('https://play.google.com/store/apps/details?id=com.skt.tmap.ku');
    return { mobile: true, href: `intent://${route}#Intent;scheme=tmap;package=com.skt.tmap.ku;S.browser_fallback_url=${store};end` };
  }
  return { mobile: false, href: `tmap://${route}` };
}
