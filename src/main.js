import { wedding } from './data/wedding.js?v=camellia-bus';
import { calendarParts, daysUntil, durationParts, calendarFile } from './event-time.mjs?v=camellia-story';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const localeValue = value => value?.ko || '';
const start = new Date(wedding.event.startsAt);
const firstMet = wedding.firstMet ? new Date(wedding.firstMet) : null;
let activePhoto = 0;

function element(tag, text, className) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (className) el.className = className;
  return el;
}
function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon'); svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#icon-' + name); svg.append(use); return svg;
}
function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}
function formatDate(date) { return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full', timeZone: wedding.event.timezone }).format(date); }
function formatTime(date) { return new Intl.DateTimeFormat('ko-KR', { hour: 'numeric', minute: '2-digit', timeZone: wedding.event.timezone }).format(date); }
function numericDate(date) { const p = calendarParts(date, wedding.event.timezone); return [p.year, String(p.month).padStart(2, '0'), String(p.day).padStart(2, '0')].join('.'); }
function externalLink(label, href, className) {
  const a = element('a', label, className); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
}
function phoneNumber(value) { return (value || '').replace(/[^+0-9]/g, ''); }

function renderCover() {
  const names = Object.values(wedding.couple).map(person => person.en || person.ko);
  $('.cover-sheet').classList.add('has-couple-names');
  $('#opening-title').replaceChildren(element('span', names[0]), element('span', '&', 'name-ampersand'), element('span', names[1]));
  $('.cover-names').textContent = '우리, 결혼합니다.';
  $('.opening-numeric-date').textContent = numericDate(start).replaceAll('.', ' · ');
  const weekday = new Intl.DateTimeFormat('ko-KR', {weekday:'long',timeZone:wedding.event.timezone}).format(start);
  $('.opening-time').textContent = weekday + ' ' + formatTime(start);
  $('.opening-venue').textContent = localeValue(wedding.event.venue);
}
function renderIntroduction() {
  $('#invitation-message').textContent = localeValue(wedding.invitation);
  $('#family-introduction').replaceChildren(...['groom', 'bride'].map(side => {
    const parents = wedding.family.filter(person => person.side === side).map(localeValue);
    const line = element('p');
    line.append(element('span', parents.join(' · '), 'parents'), element('span', side === 'groom' ? '의 아들' : '의 딸', 'relationship'), element('strong', localeValue(wedding.couple[side])));
    return line;
  }));
}
function renderCalendar() {
  $('#ceremony-date').textContent = numericDate(start);
  $('#ceremony-time').textContent = new Intl.DateTimeFormat('ko-KR', {weekday:'long',timeZone:wedding.event.timezone}).format(start) + ' ' + formatTime(start);
  $('#calendar-month').textContent = new Intl.DateTimeFormat('ko-KR', { month: 'long', year: 'numeric', timeZone: wedding.event.timezone }).format(start);
  const { year, month, day } = calendarParts(start, wedding.event.timezone);
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells = Array.from({length: first}, () => element('span'));
  for (let n = 1; n <= days; n++) {
    const cell = element('span', String(n));
    if ((first + n - 1) % 7 === 0) cell.classList.add('is-sunday');
    if (n === day) { cell.classList.add('is-wedding-day'); cell.setAttribute('aria-label', `${month}월 ${day}일 결혼식`); }
    cells.push(cell);
  }
  $('#calendar-grid').replaceChildren(...cells);
}
function fillCounter(id, parts) {
  if (!parts) return;
  $$('[data-unit]', $(id)).forEach(el => { el.textContent = el.dataset.unit === 'days' ? String(parts.days) : String(parts[el.dataset.unit]).padStart(2, '0'); });
}
function updateCounters() {
  const now = new Date();
  fillCounter('#wedding-counter', durationParts(now, start));
  const days = daysUntil(start, now, wedding.event.timezone);
  $('#countdown').textContent = days < 0 ? '함께해 주셔서 감사합니다.' : days === 0 ? '오늘, 저희 결혼합니다.' : `지언, 다은의 결혼식이 ${days}일 남았습니다.`;
  if (firstMet) fillCounter('#together-counter', durationParts(firstMet, now));
}
function renderStory() {
  $('#our-time').hidden = !firstMet || !Number.isFinite(firstMet.getTime());
  if (firstMet) $('#since-date').textContent = numericDate(firstMet) + '부터';
  $('#summary-date').textContent = formatDate(start);
  $('#summary-time').textContent = formatTime(start);
  $('#summary-place').append(element('strong', localeValue(wedding.event.venue)), element('span', localeValue(wedding.event.address)));
}
function renderVenue() {
  $('#venue-name').textContent = localeValue(wedding.event.venue);
  $('#venue-hall').textContent = localeValue(wedding.event.hall);
  $('#venue-address').textContent = localeValue(wedding.event.address);
  $('#venue-map').src = wedding.event.mapEmbed;
  $('#map-link').href = wedding.event.mapUrl;
  $('#map-app-links').replaceChildren(...wedding.event.maps.map(map => {
    const a = externalLink('', map.url, 'map-app');
    const mark = element('span', map.mark, 'map-app-mark ' + map.className); mark.setAttribute('aria-hidden', 'true');
    a.append(mark, element('span', map.label)); return a;
  }));
  $('#transport-list').replaceChildren(...wedding.transport.map(item => {
    const row = element('article'); row.append(element('h3', localeValue(item.title)));
    for (const stop of item.stops || []) {
      const block = element('div', '', 'subway-stop');
      const station = element('p', '', 'subway-station');
      const badges = element('span', '', 'subway-lines');
      for (const line of stop.lines) {
        const img = element('img'); img.src = `./assets/subway-line-${line}.png`;
        img.alt = `${line}호선`; img.width = 24; img.height = 24;
        badges.append(img);
      }
      station.append(badges, element('span', stop.station, 'subway-station-name'));
      block.append(station, element('p', stop.direction, 'subway-directions'));
      row.append(block);
    }
    row.append(element('p', localeValue(item.detail), item.stops ? 'subway-note' : ''));
    return row;
  }));
}
function renderContacts() {
  let hasMissing = false;
  const groups = ['groom', 'bride'].map(side => {
    const group = element('section', '', 'contact-group');
    group.append(element('h3', side === 'groom' ? '신랑측' : '신부측'));
    const people = [{...wedding.couple[side], role: side === 'groom' ? '신랑' : '신부'}, ...wedding.family.filter(person => person.side === side)];
    for (const person of people) {
      const row = element('div', '', 'contact-row'), actions = element('div', '', 'contact-actions');
      row.append(element('span', person.role, 'contact-role'), element('strong', localeValue(person)));
      const number = phoneNumber(person.phone);
      if (!number) hasMissing = true;
      for (const [scheme, label, symbol] of [['tel', '전화', 'phone'], ['sms', '문자', 'mail']]) {
        const control = element(number ? 'a' : 'button');
        control.setAttribute('aria-label', `${localeValue(person)} ${label}${number ? '' : ' · 연락처 준비 중'}`);
        if (number) control.href = scheme + ':' + number;
        else { control.type = 'button'; control.disabled = true; }
        control.append(icon(symbol)); actions.append(control);
      }
      row.append(actions); group.append(row);
    }
    return group;
  });
  $('#contact-groups').replaceChildren(...groups);
  $('#contact-notice').hidden = !hasMissing;
}
function renderAccounts() {
  const complete = wedding.accounts.filter(account => account.bank.trim() && account.number.trim());
  if (complete.length) $('#account-message').innerHTML = '참석이 어려우신 분들을 위해<br />계좌번호를 안내드립니다.<br />따뜻한 마음에 감사드립니다.';
  for (const side of ['groom', 'bride']) {
    const accounts = complete.filter(account => account.side === side);
    const cards = accounts.map(account => {
      const card = element('article', '', 'account-card'); card.append(element('h3', account.holder));
      const line = element('div', '', 'account-number');
      const copy = element('button'); copy.type = 'button'; copy.dataset.account = wedding.accounts.indexOf(account); copy.setAttribute('aria-label', account.holder + ' 계좌번호 복사'); copy.append(icon('copy'));
      line.append(element('p', account.bank + ' ' + account.number), copy); card.append(line);
      if (account.kakaoPayUrl) {
        try { const url = new URL(account.kakaoPayUrl); if (url.protocol === 'https:') card.append(externalLink('카카오페이로 마음 전하기 ↗', url.href, 'secondary-button kakao-pay')); } catch { /* Hide incomplete links. */ }
      }
      return card;
    });
    if (!cards.length) cards.push(element('p', '계좌 정보는 추후 안내드릴게요.', 'account-empty'));
    $('#' + side + '-accounts').replaceChildren(...cards);
  }
}
function selectAccountSide(side, focus = false) {
  $$('.account-tabs [role="tab"]').forEach(tab => {
    const selected = tab.dataset.side === side;
    tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
    $('#' + tab.getAttribute('aria-controls')).hidden = !selected;
    if (selected && focus) tab.focus();
  });
}
function renderGallery() {
  $('#gallery').hidden = !wedding.photos.length;
  $('#gallery-grid').replaceChildren(...wedding.photos.map((photo, index) => {
    const button = element('button'), img = element('img'); button.type = 'button'; button.dataset.photo = index;
    button.setAttribute('aria-label', localeValue(photo.alt) || '사진 보기 ' + (index + 1));
    img.alt = localeValue(photo.alt); img.loading = 'lazy'; img.width = 600; img.height = 800;
    img.addEventListener('error', () => { button.disabled = true; button.textContent = '사진을 불러올 수 없어요'; }, { once: true });
    img.src = photo.src; button.append(img); return button;
  }));
}
function renderMovie() {
  const frame = $('#movie-frame'), t = { loadMovie: '웨딩 영상 열기', movieTitle: '우리의 이야기' };
  frame.replaceChildren(); $('#movie').hidden = true;
  if (!wedding.movieUrl) return;
  let url;
  try { url = new URL(wedding.movieUrl, document.baseURI); } catch { return; }
  const localFile = url.origin === location.origin && /\.(mp4|webm)$/i.test(url.pathname);
  let embed = '';
  if (url.protocol === 'https:') {
    const youtube = ['www.youtube.com','youtube.com','www.youtube-nocookie.com'].includes(url.hostname);
    const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : youtube ? (url.searchParams.get('v') || url.pathname.split('/embed/')[1]) : '';
    if (/^[\w-]{11}$/.test(id || '')) embed = 'https://www.youtube-nocookie.com/embed/' + id;
    const vimeo = ['vimeo.com','player.vimeo.com'].includes(url.hostname) && url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/);
    if (vimeo) embed = 'https://player.vimeo.com/video/' + vimeo[1];
  }
  if (!localFile && !embed) return;
  $('#movie').hidden = false;
  if (localFile) {
    const video = element('video'); video.controls = true; video.playsInline = true; video.preload = 'none'; video.src = url.href; frame.append(video);
    return;
  }
  const button = element('button', t.loadMovie); button.type = 'button'; button.className = 'film-play';
  button.onclick = () => { const player = element('iframe'); player.title = t.movieTitle; player.allowFullscreen = true; player.src = embed; frame.replaceChildren(player); player.focus(); };
  frame.append(button);
}

function openPhoto(index) {
  activePhoto = (index + wedding.photos.length) % wedding.photos.length;
  const photo = wedding.photos[activePhoto]; $('#lightbox-image').src = photo.src; $('#lightbox-image').alt = localeValue(photo.alt);
  $('#lightbox-caption').textContent = `${activePhoto + 1} / ${wedding.photos.length}`;
  if (!$('#lightbox').open) $('#lightbox').showModal();
}
function shareUrl() { return location.origin + location.pathname; }
async function copyText(text, success) {
  try { await navigator.clipboard.writeText(text); showToast(success); } catch { showToast('복사하지 못했어요. 다시 시도해 주세요.'); }
}
$('#open-invitation').addEventListener('click', async () => {
  const opening = $('#opening'); opening.classList.add('is-opening');
  await Promise.allSettled(opening.getAnimations().map(animation => animation.finished));
  opening.remove(); $('#invitation').inert = false; document.body.classList.add('is-invitation-open');
  window.scrollTo({ top: 0, behavior: 'instant' }); $('.hero-title').focus({ preventScroll: true });
}, { once: true });
$('#open-contacts').addEventListener('click', () => $('#contact-dialog').showModal());
$('.dialog-close').addEventListener('click', () => $('#contact-dialog').close());
$('#contact-dialog').addEventListener('click', event => {
  if (event.target !== event.currentTarget) return;
  const r = event.currentTarget.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.currentTarget.close();
});
$$('.account-tabs [role="tab"]').forEach(tab => {
  tab.addEventListener('click', () => selectAccountSide(tab.dataset.side));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const side = event.key === 'Home' ? 'groom' : event.key === 'End' ? 'bride' : tab.dataset.side === 'groom' ? 'bride' : 'groom';
    selectAccountSide(side, true);
  });
});
let swipeStart;
const photoFrame = $('#lightbox figure');
photoFrame.addEventListener('touchstart', e => { swipeStart = e.touches.length === 1 ? [e.touches[0].clientX, e.touches[0].clientY] : null; }, {passive:true});
photoFrame.addEventListener('touchcancel', () => { swipeStart = null; });
photoFrame.addEventListener('touchend', e => {
  if (!swipeStart) return;
  const dx = e.changedTouches[0].clientX - swipeStart[0], dy = e.changedTouches[0].clientY - swipeStart[1]; swipeStart = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > 1.5 * Math.abs(dy)) openPhoto(activePhoto + (dx < 0 ? 1 : -1));
}, {passive:true});
$('#gallery-grid').addEventListener('click', e => { const b = e.target.closest('[data-photo]'); if (b) openPhoto(Number(b.dataset.photo)); });
$('.lightbox-close').addEventListener('click', () => $('#lightbox').close());
$('.lightbox-prev').addEventListener('click', () => openPhoto(activePhoto - 1));
$('.lightbox-next').addEventListener('click', () => openPhoto(activePhoto + 1));
$('#lightbox').addEventListener('click', e => { if (e.target === $('#lightbox')) $('#lightbox').close(); });
document.addEventListener('keydown', e => { if (!$('#lightbox').open) return; if (e.key === 'ArrowLeft') openPhoto(activePhoto - 1); if (e.key === 'ArrowRight') openPhoto(activePhoto + 1); });
$('#copy-address').addEventListener('click', () => copyText(localeValue(wedding.event.address), '주소를 복사했어요'));
$('#account-list').addEventListener('click', e => { const b = e.target.closest('[data-account]'); if (b) copyText(wedding.accounts[Number(b.dataset.account)].number, '계좌번호를 복사했어요'); });
$('#copy-link').addEventListener('click', () => copyText(shareUrl(), '링크를 복사했어요'));
$('#share-button').addEventListener('click', async () => {
  if (navigator.share) { try { await navigator.share({title:document.title, text:'결혼식에 초대합니다', url:shareUrl()}); } catch (e) { if (e.name !== 'AbortError') showToast('공유하지 못했어요'); } }
  else copyText(shareUrl(), '링크를 복사했어요');
});
$('#calendar-button').addEventListener('click', () => {
  const title = Object.values(wedding.couple).map(localeValue).join(' · ') + ' 결혼식';
  const place = [localeValue(wedding.event.venue), localeValue(wedding.event.address)].join(', ');
  const blob = new Blob([calendarFile(wedding.event, title, place, location.hostname)], {type:'text/calendar;charset=utf-8'});
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'wedding.ics'; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
});
renderCover(); renderIntroduction(); renderCalendar(); renderStory(); renderVenue(); renderContacts(); renderAccounts(); renderGallery(); renderMovie(); updateCounters();
let counterTimer;
function syncCounterTimer() { clearInterval(counterTimer); updateCounters(); if (!document.hidden) counterTimer = setInterval(updateCounters, 1000); }
document.addEventListener('visibilitychange', syncCounterTimer); syncCounterTimer();
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));
