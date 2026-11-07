import { wedding, translations } from './data/wedding.js?v=camellia-2';
import { calendarParts, daysUntil, calendarFile } from './event-time.mjs';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
let language = 'ko';
try { if (localStorage.getItem('wedding-language') === 'en') language = 'en'; } catch { /* Storage may be disabled. */ }
let activePhoto = 0;

function localeValue(value) { return value?.[language] || value?.ko || value?.en || ''; }
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2200); }
function formatDate(date) { return new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', { dateStyle: 'full', timeZone: wedding.event.timezone }).format(date); }
function formatTime(date) { return new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', { hour: 'numeric', minute: '2-digit', timeZone: wedding.event.timezone, ...(language === 'en' ? { timeZoneName: 'short' } : {}) }).format(date); }

function renderCalendar(date) {
  const grid = $('#calendar-grid');
  if (!date) { grid.innerHTML = `<span class="calendar-empty">${language === 'ko' ? '날짜를 설정하면 달력이 표시됩니다' : 'Set a date to display the calendar'}</span>`; $('#calendar-month').textContent = 'DATE'; return; }
  $('#calendar-month').textContent = new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', { month: 'long', year: 'numeric', timeZone: wedding.event.timezone }).format(date);
  const { year, month, day } = calendarParts(date, wedding.event.timezone);
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  grid.innerHTML = `${'<span></span>'.repeat(first)}${Array.from({length: days}, (_, i) => `<span class="${i + 1 === day ? 'is-wedding-day' : ''}">${i + 1}</span>`).join('')}`;
}

function render() {
  const t = translations[language];
  $('#lightbox').setAttribute('aria-label', t.photoViewer);
  for (const [cls,key] of [['close','closePhoto'], ['prev','prevPhoto'], ['next','nextPhoto']]) $('.lightbox-' + cls).setAttribute('aria-label', t[key]);
  document.documentElement.lang = language;
  $$('[data-i18n]').forEach(el => { const value = t[el.dataset.i18n]; if (value) el.innerHTML = value; });
  $$('.language-button').forEach(button => { const active = button.dataset.lang === language; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', active); });
  const { groom, bride } = wedding.couple;
  $('.hero-title').textContent = language === 'ko' ? '우리, 결혼합니다.' : 'We’re getting married.';
  const names = [groom, bride].map(localeValue).filter(Boolean);
  $('#hero-local-names').textContent = names.join(' · ');
  $('#hero-local-names').hidden = names.length === 0;
  const start = wedding.event.startsAt ? new Date(wedding.event.startsAt) : null;
  $('#hero-date').textContent = start ? formatDate(start) : (language === 'ko' ? '날짜를 입력해 주세요' : 'Add your wedding date');
  $('#hero-time').textContent = start ? formatTime(start) : (language === 'ko' ? '시간을 입력해 주세요' : 'Add the ceremony time');
  $('#hero-venue').textContent = localeValue(wedding.event.venue);
  if ($('#opening')) {
    const coverNames = [groom, bride].map(person => person.en || localeValue(person)).filter(Boolean);
    $('.cover-sheet').classList.toggle('has-couple-names', coverNames.length > 0);
    $('#opening-title').replaceChildren(...coverNames.flatMap((name, index) => {
      const label = element('span', name);
      if (!index) return [label];
      const ampersand = element('span', '&'); ampersand.className = 'name-ampersand';
      return [ampersand, label];
    }));
    if (!coverNames.length) $('#opening-title').append(element('span', 'Our'), element('span', 'Wedding'));
    $('.cover-monogram').replaceChildren(...(coverNames.length ? coverNames.map(name => element('span', name[0])) : [element('span', 'W')]));
    $('.cover-names').textContent = language === 'ko' ? '우리, 결혼합니다.' : 'We’re getting married.';
    $('.opening-weekday').textContent = start ? new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', {weekday:'long',timeZone:wedding.event.timezone}).format(start) : '';
    const parts = start && calendarParts(start, wedding.event.timezone);
    $('.opening-numeric-date').textContent = parts ? [parts.year, String(parts.month).padStart(2,'0'), String(parts.day).padStart(2,'0')].join(' · ') : '';
    $('.opening-time').textContent = start ? formatTime(start) : '';
    $('.opening-venue').textContent = localeValue(wedding.event.venue);
  }
  $('#invitation-message').textContent = localeValue(wedding.invitation);
  renderCalendar(start);
  $('#countdown').textContent = start ? countdownText(start) : (language === 'ko' ? '결혼식 날짜를 기다리고 있어요' : 'The wedding date will be announced');
  $('#schedule-list').replaceChildren(...wedding.schedule.map(item => {
    const row = element('div'); row.append(element('time', item.time), element('p', localeValue(item))); return row;
  }));
  $('#venue-name').textContent = localeValue(wedding.event.venue); $('#venue-hall').textContent = localeValue(wedding.event.hall); $('#venue-address').textContent = localeValue(wedding.event.address);
  const hasAddress = Boolean(wedding.event.mapUrl); $('#copy-address').disabled = !localeValue(wedding.event.address); $('#map-link').classList.toggle('is-disabled', !hasAddress); $('#map-link').setAttribute('aria-disabled', String(!hasAddress)); $('#map-link').href = wedding.event.mapUrl || '#venue';
  $('#transport-list').replaceChildren(...wedding.transport.map(item => {
    const row = element('article'); row.append(element('h3', localeValue(item.title)), element('p', localeValue(item.detail))); return row;
  }));
  renderContacts(); renderAccounts(); renderGallery(); renderMovie();
  $('#gallery').hidden = !wedding.photos.length;
  $('.quick-links a[href="#gallery"]').hidden = !wedding.photos.length;
  const sampleAlbum = wedding.photos.every(photo => photo.src.startsWith('./assets/gallery-') && photo.src.endsWith('.svg'));
  $('#gallery-note').textContent = sampleAlbum
    ? (language === 'ko' ? '사진첩 미리보기 · 샘플 이미지' : 'Album preview · sample images')
    : t.galleryNote;
  $('#calendar-button').disabled = !start;
}

function countdownText(date) { const days = daysUntil(date, new Date(), wedding.event.timezone); if (days < 0) return language === 'ko' ? '함께해 주셔서 감사합니다' : 'Thank you for celebrating with us'; if (days === 0) return language === 'ko' ? '오늘, 저희 결혼합니다' : 'Today is the day'; return language === 'ko' ? `결혼식까지 ${days}일` : `${days} ${days === 1 ? 'day' : 'days'} until the wedding`; }
function element(tag, text) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  return el;
}
function renderContacts() {
  const t = translations[language];
  const hasContact = person => person.phone || person.email;
  const row = (person, role) => {
    const article = element('article'), info = element('div'), links = element('div');
    info.append(element('small', role), element('strong', localeValue(person)));
    links.className = 'contact-actions';
    for (const [scheme, value, label] of [['tel',person.phone,t.call], ['mailto',person.email,t.email]]) {
      if (!value) continue;
      const a = element('a', label); a.href = scheme + ':' + value; links.append(a);
    }
    article.append(info, links); return article;
  };
  const people = Object.entries(wedding.couple).filter(([, person]) => hasContact(person));
  $('#contact-list').replaceChildren(...people.map(([side, person]) => row(person, t[side])));
  const family = wedding.family.filter(hasContact);
  $('#family-contacts').hidden = !family.length;
  $('#family-list').replaceChildren(...family.map(person => row(person, localeValue(person.role))));
  $('#contact').hidden = !(people.length || family.length || wedding.accounts.length);
}
function renderAccounts() {
  const groups = ['groom', 'bride'].map(side => {
    const accounts = wedding.accounts.filter(account => account.side === side);
    if (!accounts.length) return null;
    const details = element('details'); details.className = 'account-side';
    details.append(element('summary', translations[language][side] + (language === 'ko' ? '측 계좌' : '’s side')));
    for (const account of accounts) {
      const row = element('article'), info = element('div'), button = element('button', language === 'ko' ? '복사' : 'Copy');
      info.append(element('small', account.bank), element('strong', account.number), element('span', account.holder));
      button.type = 'button'; button.dataset.account = wedding.accounts.indexOf(account);
      row.append(info, button); details.append(row);
    }
    return details;
  }).filter(Boolean);
  $('#account-list').replaceChildren(...groups);
  $('#accounts').hidden = !groups.length;
}
function renderGallery() {
  const t = translations[language];
  $('#gallery-grid').replaceChildren(...wedding.photos.map((photo, index) => {
    const button = element('button'), img = element('img'); button.type = 'button';
    button.dataset.photo = index;
    button.setAttribute('aria-label', localeValue(photo.alt) || t.photoViewer + ' ' + (index + 1));
    img.alt = localeValue(photo.alt); img.loading = 'lazy'; img.width = 600; img.height = 800;
    img.addEventListener('error', () => { button.disabled = true; button.textContent = t.photoUnavailable; }, { once: true });
    img.src = photo.src; button.append(img); return button;
  }));
}
function renderMovie() {
  const frame = $('#movie-frame'), t = translations[language];
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

function openPhoto(index) { activePhoto = (index + wedding.photos.length) % wedding.photos.length; const photo = wedding.photos[activePhoto]; $('#lightbox-image').src = photo.src; $('#lightbox-image').alt = localeValue(photo.alt); $('#lightbox-caption').textContent = `${activePhoto + 1} / ${wedding.photos.length}`; if (!$('#lightbox').open) $('#lightbox').showModal(); }
function shareUrl() { return location.origin + location.pathname; }
async function copyText(text, success) { try { await navigator.clipboard.writeText(text); showToast(success); } catch { showToast(language === 'ko' ? '복사하지 못했어요' : 'Could not copy'); } }
$('#open-invitation').addEventListener('click', async () => {
  const opening = $('#opening');
  opening.classList.add('is-opening');
  // The overlay's fade is the final animation. Reduced motion skips the sequence.
  await Promise.allSettled(opening.getAnimations().map(animation => animation.finished));
  opening.remove();
  $('meta[name="theme-color"]').content = '#fbf7f2';
  $('#invitation').inert = false;
  document.body.classList.add('is-invitation-open');
  window.scrollTo({ top: 0, behavior: 'instant' });
  $('.hero-title').focus({ preventScroll: true });
}, { once: true });
$$('.language-button').forEach(button => button.addEventListener('click', () => { language = button.dataset.lang; try { localStorage.setItem('wedding-language', language); } catch { /* The toggle still works. */ } render(); }));
let swipeStart;
const photoFrame = $('#lightbox figure');
photoFrame.addEventListener('touchstart', e => { swipeStart = e.touches.length === 1 ? [e.touches[0].clientX, e.touches[0].clientY] : null; }, {passive:true});
photoFrame.addEventListener('touchcancel', () => { swipeStart = null; });
photoFrame.addEventListener('touchend', e => {
  if (!swipeStart) return;
  const dx = e.changedTouches[0].clientX - swipeStart[0], dy = e.changedTouches[0].clientY - swipeStart[1];
  swipeStart = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > 1.5 * Math.abs(dy)) openPhoto(activePhoto + (dx < 0 ? 1 : -1));
}, {passive:true});
$('#gallery-grid').addEventListener('click', event => { const button = event.target.closest('[data-photo]'); if (button) openPhoto(Number(button.dataset.photo)); });
$('.lightbox-close').addEventListener('click', () => $('#lightbox').close()); $('.lightbox-prev').addEventListener('click', () => openPhoto(activePhoto - 1)); $('.lightbox-next').addEventListener('click', () => openPhoto(activePhoto + 1));
$('#lightbox').addEventListener('click', event => { if (event.target === $('#lightbox')) $('#lightbox').close(); });
document.addEventListener('keydown', event => { if (!$('#lightbox').open) return; if (event.key === 'ArrowLeft') openPhoto(activePhoto - 1); if (event.key === 'ArrowRight') openPhoto(activePhoto + 1); });
$('#copy-address').addEventListener('click', () => copyText(localeValue(wedding.event.address), language === 'ko' ? '주소를 복사했어요' : 'Address copied'));
$('#account-list').addEventListener('click', event => { const button = event.target.closest('[data-account]'); if (button) copyText(wedding.accounts[Number(button.dataset.account)].number, language === 'ko' ? '계좌번호를 복사했어요' : 'Account number copied'); });
$('#copy-link').addEventListener('click', () => copyText(shareUrl(), language === 'ko' ? '링크를 복사했어요' : 'Link copied'));
$('#share-button').addEventListener('click', async () => { if (navigator.share) { try { await navigator.share({ title: document.title, text: language === 'ko' ? '결혼식에 초대합니다' : 'You are invited to our wedding', url: shareUrl() }); } catch (error) { if (error.name !== 'AbortError') showToast(language === 'ko' ? '공유하지 못했어요' : 'Could not share'); } } else copyText(shareUrl(), language === 'ko' ? '링크를 복사했어요' : 'Link copied'); });
$('#calendar-button').addEventListener('click', () => { const names = [wedding.couple.groom, wedding.couple.bride].map(localeValue).filter(Boolean).join(' & '); const title = [names, language === 'ko' ? '결혼식' : 'Wedding'].filter(Boolean).join(' '); const place = [localeValue(wedding.event.venue), localeValue(wedding.event.address)].filter(Boolean).join(', '); const blob = new Blob([calendarFile(wedding.event, title, place, location.hostname)], {type: 'text/calendar;charset=utf-8'}); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'wedding.ics'; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); });

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
$$('.reveal').forEach(element => observer.observe(element));
render();
