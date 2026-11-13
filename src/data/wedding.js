// Edit this file to personalize the invitation. Empty values stay disabled in the UI.
export const wedding = {
  couple: {
    groom: { en: 'Jiun Lee', ko: '이지언', phone: '', email: '' },
    bride: { en: 'Daeun Jung', ko: '정다은', phone: '', email: '' },
  },
  // Only the date was provided; elapsed time starts at midnight in Seoul.
  firstMet: '2025-01-09T00:00:00+09:00',
  event: {
    // ISO 8601 with the venue's UTC offset; timezone controls display and D-day.
    startsAt: '2027-01-16T11:00:00+09:00',
    endsAt: '',
    timezone: 'Asia/Seoul',
    city: 'Seoul, Korea',
    venue: { ko: '지타워 컨벤션', en: 'G-Tower Convention' },
    hall: { ko: 'G타워 2층 그랜드볼룸', en: 'G-Tower, 2nd floor' },
    address: { ko: '서울특별시 구로구 디지털로26길 38', en: '38 Digital-ro 26-gil, Guro-gu, Seoul' },
    // Destination coordinates and alternative map links come from the venue.
    destination: { name: '지타워 컨벤션', longitude: 126.895539, latitude: 37.479684 },
    mapUrl: 'https://naver.me/58NdkRJs',
    mapPreview: './assets/naver-venue-map.png',
    maps: [
      { label: '네이버지도', mark: 'N', className: 'naver', url: 'https://naver.me/58NdkRJs' },
      { label: '티맵', mark: 'T', className: 'tmap', app: 'tmap' },
      { label: '카카오맵', mark: 'K', className: 'kakao', url: 'https://map.kakao.com/link/to/지타워컨벤션,37.479684,126.895539' },
    ],
  },
  invitation: {
    ko: '우연처럼 다가온 인연이\n매일을 특별하게 만들었습니다.\n서로의 이야기를 들으며 웃고,\n함께의 내일을 꿈꾸게 되었습니다.\n\n하루하루 마음이 깊어진 끝에\n우리라는 한 편의 이야기가 시작됩니다.\n두 사람의 설레는 시작에\n소중한 분의 따뜻한 축복을 기다립니다.',
    en: 'Please join us on our wedding day.\nWe would love to see you there.',
  },
  schedule: [
    { time: '11:00', ko: '결혼식', en: 'Wedding ceremony' },
  ],
  transport: [
    {
      title: { ko: '지하철 · 셔틀버스' },
      stops: [
        { lines: [1, 7], station: '가산디지털단지역 5번 출구', direction: '출구에서 약 20m 직진 후 셔틀 탑승' },
        { lines: [2], station: '구로디지털단지역 4번 출구', direction: '출구에서 약 100m 직진 후 셔틀 탑승' },
      ],
      detail: { ko: '예식장 셔틀버스가 15분 간격으로 순환합니다.' },
    },
    {
      title: { ko: '버스' },
      detail: { ko: '디지털로 버스 이용하는 경우\n지선 : 5536, 5615\n- 지하이시티, G밸리보건지소 하차하여\n- 에이스하이엔드/ 한화비즈메카 사이 도로로 약 200m\n\n남부순환로의 버스 이용하는 경우\n간선 : 504, 643, 651\n지선 : 5528, 5615, 5619, 5626\n- 지타워 건물 뒤편에서 진입하게 됨\n- 정성요양병원별관을 끼고 우회전하여 골목길로 진입하여 지타워 건물 뒤편 3층 도착\n- 에스컬레이터 이용하여 2층으로 이동\n\n마을버스 : 금천07\n- 에이스하이엔드타워2차, 대륭타워8차, 지타워(넷마블), G밸리산업박물관(지타워)' },
    },
    { title: { ko: '자가용 · 주차' }, detail: { ko: '내비게이션에 “지타워 컨벤션” 또는\n“서울 구로구 디지털로26길 38”을 검색해 주세요.\n\n디지털로26길에서 Gate 1 또는 Gate 2로 진입\n1,400대 주차 가능 · 2시간 무료 주차' } },
  ],
  family: [
    { side: 'groom', role: '아버지', ko: '이철수', phone: '', email: '' },
    { side: 'groom', role: '어머니', ko: '곽향숙', phone: '', email: '' },
    { side: 'bride', role: '아버지', ko: '정용익', phone: '', email: '' },
    { side: 'bride', role: '어머니', ko: '이옥주', phone: '', email: '' },
  ],
  accounts: [
    // Fill only the accounts you want displayed. Incomplete entries stay hidden.
    { side: 'groom', holder: '이지언', bank: '', number: '', kakaoPayUrl: '' },
    { side: 'groom', holder: '이철수', bank: '', number: '', kakaoPayUrl: '' },
    { side: 'groom', holder: '곽향숙', bank: '', number: '', kakaoPayUrl: '' },
    { side: 'bride', holder: '정다은', bank: '', number: '', kakaoPayUrl: '' },
    { side: 'bride', holder: '정용익', bank: '', number: '', kakaoPayUrl: '' },
    { side: 'bride', holder: '이옥주', bank: '', number: '', kakaoPayUrl: '' },
  ],
  photos: [
    // Keep source 012 first, followed by the remaining source numbers descending.
    { src: './assets/photos/wedding-012.jpg', thumbnail: './assets/photos/wedding-012-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 1' } },
    { src: './assets/photos/wedding-020.jpg', thumbnail: './assets/photos/wedding-020-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 2' } },
    { src: './assets/photos/wedding-019.jpg', thumbnail: './assets/photos/wedding-019-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 3' } },
    { src: './assets/photos/wedding-018.jpg', thumbnail: './assets/photos/wedding-018-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 4' } },
    { src: './assets/photos/wedding-017.jpg', thumbnail: './assets/photos/wedding-017-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 5' } },
    { src: './assets/photos/wedding-016.jpg', thumbnail: './assets/photos/wedding-016-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 6' } },
    { src: './assets/photos/wedding-015.jpg', thumbnail: './assets/photos/wedding-015-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 7' } },
    { src: './assets/photos/wedding-014.jpg', thumbnail: './assets/photos/wedding-014-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 8' } },
    { src: './assets/photos/wedding-013.jpg', thumbnail: './assets/photos/wedding-013-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 9' } },
    { src: './assets/photos/wedding-010.jpg', thumbnail: './assets/photos/wedding-010-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 10' } },
    { src: './assets/photos/wedding-008.jpg', thumbnail: './assets/photos/wedding-008-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 11' } },
    { src: './assets/photos/wedding-007.jpg', thumbnail: './assets/photos/wedding-007-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 12' } },
    { src: './assets/photos/wedding-006.jpg', thumbnail: './assets/photos/wedding-006-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 13' } },
    { src: './assets/photos/wedding-005.jpg', thumbnail: './assets/photos/wedding-005-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 14' } },
    { src: './assets/photos/wedding-004.jpg', thumbnail: './assets/photos/wedding-004-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 15' } },
    { src: './assets/photos/wedding-003.jpg', thumbnail: './assets/photos/wedding-003-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 16' } },
    { src: './assets/photos/wedding-002.jpg', thumbnail: './assets/photos/wedding-002-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 17' } },
    { src: './assets/photos/wedding-001.jpg', thumbnail: './assets/photos/wedding-001-thumb.jpg', alt: { ko: '이지언과 정다은의 웨딩 사진 18' } },
  ],
  movieUrl: '',
};
