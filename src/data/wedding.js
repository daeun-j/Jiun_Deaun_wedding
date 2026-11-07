// Edit this file to personalize the invitation. Empty values stay disabled in the UI.
export const wedding = {
  couple: {
    groom: { en: 'Jiun Lee', ko: '이지언', phone: '', email: '' },
    bride: { en: 'Daeun Jung', ko: '정다은', phone: '', email: '' },
  },
  event: {
    // ISO 8601 with the venue's UTC offset; timezone controls display and D-day.
    startsAt: '2027-01-16T11:00:00+09:00',
    endsAt: '',
    timezone: 'Asia/Seoul',
    city: 'Seoul, Korea',
    venue: { ko: '지타워 컨벤션', en: 'G-Tower Convention' },
    hall: { ko: 'G타워 2층', en: 'G-Tower, 2nd floor' },
    address: { ko: '서울특별시 구로구 디지털로26길 38', en: '38 Digital-ro 26-gil, Guro-gu, Seoul' },
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=지타워컨벤션,+서울특별시+구로구+디지털로26길+38',
  },
  invitation: {
    ko: '저희의 결혼식에 초대합니다.\n함께 자리해 주시면 기쁘겠습니다.',
    en: 'Please join us on our wedding day.\nWe would love to see you there.',
  },
  schedule: [
    { time: '11:00', ko: '결혼식', en: 'Wedding ceremony' },
  ],
  transport: [
    { title: { ko: '지하철 · 셔틀', en: 'Subway & shuttle' }, detail: { ko: '가산디지털단지역 5번 출구 또는 구로디지털단지역 4번 출구에서 예식장 셔틀을 이용하실 수 있습니다.', en: 'Take the venue shuttle from Gasan Digital Complex Station (Exit 5) or Guro Digital Complex Station (Exit 4).' } },
    { title: { ko: '자가용', en: 'By car' }, detail: { ko: '디지털로26길에서 G타워 1번 또는 2번 게이트로 진입해 주세요.', en: 'Enter G-Tower through Gate 1 or 2 from Digital-ro 26-gil.' } },
  ],
  family: [], // Optional: { role: { ko: '…', en: '…' }, ko: '', en: '', phone: '', email: '' }
  accounts: [
    // Example: { side: 'groom', bank: '은행명', number: '000-0000-0000', holder: '예금주' }
  ],
  photos: [
    { src: './assets/gallery-01.svg', alt: { ko: '커플 사진 자리 1', en: 'Couple photo placeholder 1' } },
    { src: './assets/gallery-02.svg', alt: { ko: '커플 사진 자리 2', en: 'Couple photo placeholder 2' } },
    { src: './assets/gallery-03.svg', alt: { ko: '커플 사진 자리 3', en: 'Couple photo placeholder 3' } },
    { src: './assets/gallery-04.svg', alt: { ko: '커플 사진 자리 4', en: 'Couple photo placeholder 4' } },
    { src: './assets/gallery-05.svg', alt: { ko: '커플 사진 자리 5', en: 'Couple photo placeholder 5' } },
    { src: './assets/gallery-06.svg', alt: { ko: '커플 사진 자리 6', en: 'Couple photo placeholder 6' } },
  ],
  movieUrl: '',
  guestbook: { provider: null },
};

export const translations = {
  ko: {
    photoViewer: '사진 보기', closePhoto: '사진 닫기', prevPhoto: '이전 사진', nextPhoto: '다음 사진', photoUnavailable: '사진을 불러올 수 없어요',
    groom: '신랑', bride: '신부', call: '전화', email: '이메일', family: '가족 연락처', loadMovie: '웨딩 영상 열기',
    openLetter: '초대장 펼치기', albumLink: '사진첩', thankYou: '고맙습니다',

    viewGuestbook: '방명록 양식 보기',
    heroKicker: '우리, 결혼합니다', scroll: '아래로', invitationTitle: '소중한 분들을<br />저희 결혼식에 초대합니다',
    invitationBody: '이곳에 두 분의 초대 문구를 적어 주세요.<br />마음을 담은 문장은 설정 파일에서 쉽게 바꿀 수 있습니다.',
    dateTitle: '함께할 날', venueTitle: '오시는 길', copyAddress: '주소 복사', directions: '길찾기 ↗',
    galleryTitle: '두 사람의 순간', galleryNote: '사진을 누르면 크게 볼 수 있어요', movieTitle: '웨딩 무비',
    movieEmpty: '영상 URL을 설정하면 플레이어가 표시됩니다', contactTitle: '마음 전하실 곳',
    contactPrivacy: '연락처와 계좌는 공개 전 반드시 확인해 주세요', accountTitle: '계좌번호 안내',
    guestbookTitle: '축하의 마음', previewLabel: '미리보기', guestbookNotice: '지금은 미리보기예요. 메시지는 저장되지 않습니다.',
    nameLabel: '이름', messageLabel: '메시지', submitMessage: '미리보기 · 작성 불가',
    closingMessage: '저희의 새로운 시작을<br />따뜻한 마음으로 축복해 주세요.', share: '초대장 공유하기', copyLink: '링크 복사', addCalendar: '캘린더에 추가',
  },
  en: {
    photoViewer: 'Photo viewer', closePhoto: 'Close viewer', prevPhoto: 'Previous photo', nextPhoto: 'Next photo', photoUnavailable: 'Photo unavailable',
    groom: 'Groom', bride: 'Bride', call: 'Call', email: 'Email', family: 'Family contacts', loadMovie: 'Open wedding film',
    openLetter: 'Open invitation', albumLink: 'Album', thankYou: 'Thank you',

    viewGuestbook: 'Preview the guestbook form',
    heroKicker: 'WE ARE GETTING MARRIED', scroll: 'Scroll', invitationTitle: 'We warmly invite you<br />to celebrate with us',
    invitationBody: 'Add your personal invitation message here.<br />Every detail is editable in one configuration file.',
    dateTitle: 'Our day', venueTitle: 'Getting there', copyAddress: 'Copy address', directions: 'Directions ↗',
    galleryTitle: 'Our moments', galleryNote: 'Tap a photo to see it full screen', movieTitle: 'Wedding film',
    movieEmpty: 'Add a video URL to show the player', contactTitle: 'Contact us', contactPrivacy: 'Please review all contact and account details before publishing',
    accountTitle: 'Account information', guestbookTitle: 'Leave a note', previewLabel: 'Preview',
    guestbookNotice: 'This is a preview. Messages are not saved.', nameLabel: 'Name', messageLabel: 'Message',
    submitMessage: 'Preview · posting unavailable', closingMessage: 'Thank you for celebrating<br />this new beginning with us.',
    share: 'Share invitation', copyLink: 'Copy link', addCalendar: 'Add to calendar',
  },
};
