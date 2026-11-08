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
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=지타워컨벤션,+서울특별시+구로구+디지털로26길+38',
    // Links and map embed supplied by the venue's official directions page.
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357c9f8c0cabd4e9%3A0xab40b833feaee5fb!2z7KeA7YOA7JuMIOy7qOuypOyFmA!5e0!3m2!1sko!2skr!4v1785902280327!5m2!1sko!2skr',
    maps: [
      { label: '네이버지도', mark: 'N', className: 'naver', url: 'https://naver.me/58NdkRJs' },
      { label: '카카오맵', mark: 'K', className: 'kakao', url: 'https://map.kakao.com/link/to/지타워컨벤션,37.479684,126.895539' },
      { label: '구글지도', mark: 'G', className: 'google', url: 'https://www.google.com/maps/dir/?api=1&destination=지타워컨벤션,+서울특별시+구로구+디지털로26길+38' },
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
    // Eighteen editable photo slots. Replace these placeholders with your photos.
    { src: './assets/gallery-01.svg', alt: { ko: '커플 사진 자리 1', en: 'Couple photo placeholder 1' } },
    { src: './assets/gallery-02.svg', alt: { ko: '커플 사진 자리 2', en: 'Couple photo placeholder 2' } },
    { src: './assets/gallery-03.svg', alt: { ko: '커플 사진 자리 3', en: 'Couple photo placeholder 3' } },
    { src: './assets/gallery-04.svg', alt: { ko: '커플 사진 자리 4', en: 'Couple photo placeholder 4' } },
    { src: './assets/gallery-05.svg', alt: { ko: '커플 사진 자리 5', en: 'Couple photo placeholder 5' } },
    { src: './assets/gallery-06.svg', alt: { ko: '커플 사진 자리 6', en: 'Couple photo placeholder 6' } },
    { src: './assets/gallery-01.svg', alt: { ko: '커플 사진 자리 7' } },
    { src: './assets/gallery-02.svg', alt: { ko: '커플 사진 자리 8' } },
    { src: './assets/gallery-03.svg', alt: { ko: '커플 사진 자리 9' } },
    { src: './assets/gallery-04.svg', alt: { ko: '커플 사진 자리 10' } },
    { src: './assets/gallery-05.svg', alt: { ko: '커플 사진 자리 11' } },
    { src: './assets/gallery-06.svg', alt: { ko: '커플 사진 자리 12' } },
    { src: './assets/gallery-01.svg', alt: { ko: '커플 사진 자리 13' } },
    { src: './assets/gallery-02.svg', alt: { ko: '커플 사진 자리 14' } },
    { src: './assets/gallery-03.svg', alt: { ko: '커플 사진 자리 15' } },
    { src: './assets/gallery-04.svg', alt: { ko: '커플 사진 자리 16' } },
    { src: './assets/gallery-05.svg', alt: { ko: '커플 사진 자리 17' } },
    { src: './assets/gallery-06.svg', alt: { ko: '커플 사진 자리 18' } },
  ],
  movieUrl: '',
};
