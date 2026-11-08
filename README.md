# Jiun & Daeun · Camellia wedding invitation

2027년 1월 16일 토요일 오전 11시(한국 시간), 서울 지타워 컨벤션. 아이보리 바탕의 블루 동백꽃 청첩장에 Jiun Lee와 Daeun Jung의 이름을 담았습니다. 표지의 ‘초대장 펼치기’를 누르면 본문이 나타납니다. 본문은 한국어로 고정하며 별도의 상단 바나 언어 선택 버튼은 표시하지 않습니다.

## 개발과 배포

빌드 도구나 npm 패키지 설치 없이 HTML, CSS, ES modules로 동작합니다. 프로젝트 폴더에서 `python3 -m http.server 4173`을 실행하고 `http://localhost:4173/`을 여세요. Node 20 이상으로 `node --test tests/event-time.test.mjs`를 실행하면 서울 자정과 캘린더 파일을 검사합니다.

`sh scripts/build.sh`는 실제 공개할 파일만 새 `dist/`에 복사합니다. 이미 있으면 다른 새 폴더 이름을 인수로 주세요(예: `sh scripts/build.sh /tmp/wedding-preview-v2`). GitHub Actions는 매번 깨끗한 작업 폴더에서 같은 스크립트를 실행합니다. 개인 메모·원본·연락처 파일을 `assets/`나 `src/`에 보관하지 마세요. 두 폴더는 공개됩니다.

1. 본인 계정의 청첩장 전용 저장소를 사용하세요. 상위 Desktop 저장소를 올리지 마세요.
2. 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
3. 이 프로젝트(숨김 폴더 `.github/` 포함)를 저장소의 `main` 브랜치에 반영합니다. 기존 작업을 덮어쓰거나 force push하지 마세요.
4. **Actions → Deploy wedding invitation to Pages**에서 테스트와 배포가 모두 성공하면 **github-pages** 환경의 링크를 엽니다. 하위 경로에서도 작동하도록 모든 로컬 자산 경로는 상대 경로입니다.
5. 공개 주소를 아이폰 Safari에서 열고 표지 → 연락하기 → 사진첩 → 길찾기 → 캘린더 순으로 확인한 뒤 하객에게 공유하세요. localhost는 하객용 주소가 아닙니다.

[GitHub Pages 공식 워크플로 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## 내용 바꾸기

`src/data/wedding.js`에서 이름, 혼주 소개, 초대 글, 예식 일시, 장소, 교통, 사진, 영상과 선택 항목을 수정합니다. 본문에는 `ko` 값을 사용하며, 표지의 영문 이름에는 `en` 값을 사용합니다. 이전 방문자의 언어 선택 기록은 사용하지 않습니다. 일시는 오프셋을 포함한 ISO 형식(예: `2027-01-16T11:00:00+09:00`)으로, 시간대는 `Asia/Seoul`처럼 지정하세요. 지도와 교통·주차 안내의 출처는 [지타워 컨벤션](https://www.g-towerconvention.kr/reservation/)입니다. 셔틀 운행은 예식일 전에 다시 확인하세요.

- **사진:** 공유에 동의한 사진을 WebP/JPEG로 줄여 `assets/`에 넣고 `photos`의 경로와 한국어 대체 텍스트를 바꿉니다. 총 18개 항목을 2열 × 9행으로 표시합니다. 현재는 기존 자리표시자 6개를 반복한 상태이며, 각 항목을 실제 사진으로 교체하면 됩니다. 별도의 미리보기 안내 문구는 표시하지 않습니다. 빈 배열이면 사진첩을 숨깁니다. 확대 화면은 여백 없이 채우므로 화면 비율에 따라 사진 가장자리가 잘릴 수 있습니다. 닫기·이전·다음 버튼과 순서는 사진 위에 표시됩니다.
- **영상:** `movieUrl`에 `./assets/wedding.mp4` 또는 YouTube/Vimeo 링크를 넣으세요. 외부 플레이어는 하객이 눌렀을 때만 로드하며 자동 재생하지 않습니다. 빈 값이면 섹션을 숨깁니다.
- **연락처:** `couple`과 `family`에 여섯 분의 이름을 넣어 두었습니다. `phone`에 번호를 넣으면 연락하기 창의 전화·문자 버튼이 활성화됩니다. 현재 전화번호는 모두 빈칸이며 임의 번호는 표시하지 않습니다.
- **계좌:** `accounts`에 신랑·신부측 세 분씩 편집할 자리를 두었습니다. `bank`와 `number`를 둘 다 입력한 카드만 표시됩니다. `holder`는 예금주, 선택 항목 `kakaoPayUrl`은 본인의 카카오페이 공유 링크입니다. 계좌를 넣기 전에는 안내 문구만 보입니다. 탭은 방향키로도 전환할 수 있습니다.
- **함께 걸어온 시간:** `firstMet`는 2025년 1월 9일입니다. 만난 시각은 미제공이므로 한국 시간 자정부터 경과 시간을 계산합니다. 예식 카운터는 실제 남은 시간, 아래 D-day 문구는 서울의 달력 날짜 기준입니다.
- **마지막 글귀:** 사용자가 제공한 흔글 〈계절〉 구절과 뒤이은 초대 문장을 `index.html`의 마지막 `poem-ending`에 배치했습니다.
- **참새와 동백꽃 연출:** 초대장을 펼친 뒤 작은 참새가 왼쪽에서 오른쪽 밖으로 날아간 다음, 오른쪽에서 다시 나타나 왼쪽 밖으로 날아갑니다. 36초 주기로 왕복하며 화면 밖에서 방향을 바꿉니다. 마지막 꽃 그림이 화면에 들어오면 두 마리가 1.7초 안에 차례로 내려앉고, 이어 1.3초 동안 흑백 동백꽃에 붉은 색이 들어옵니다(마지막 장면 총 3초). 사진 확대·연락처 창, 외부 페이지 이동, 다른 탭이나 앱에서는 새를 숨기고 움직임을 멈춥니다. 마지막 장면을 지나쳐 스크롤해도 해당 연출은 멈췄다가 돌아오면 이어집니다. 기기의 ‘동작 줄이기’ 설정에서는 비행 없이 두 마리와 붉은 꽃을 보여줍니다. `src/bird-story.mjs`가 진행 상태를, `styles.css`가 경로와 시간을 관리합니다. 새로고침하면 처음부터 시작합니다.
- **연출 그림:** 내장 Imagegen으로 생성한 민화풍 참새는 `assets/sparrow-sprite.webp`, 동백꽃 가지는 `assets/camellia-branch.webp`입니다. 투명 배경을 유지하고 웹용으로 압축했으며 생성 사양은 `assets/bird-story.prompt.txt`에 있습니다. 참고 그림 자체나 그림 속 글자는 사용하지 않습니다.
- **공유:** 네이티브 공유가 지원되지 않으면 링크 복사를 사용합니다. 전용 카카오톡 공유 버튼은 미설정입니다. 추가하려면 소유한 Kakao Developers 앱의 JavaScript 키와 배포 도메인 등록이 필요합니다. [공식 가이드](https://developers.kakao.com/docs/ko/kakaotalk-share/js-link)
- **지도:** 예식장 공식 페이지에 포함된 구글 지도를 표시하고 공식 네이버·카카오 링크와 구글 길찾기를 제공합니다. 앱 설치 없이도 열 수 있는 웹 링크를 사용합니다.
- **지하철 아이콘:** 사용자가 첨부한 이미지에서 자른 `assets/subway-line-1.png`, `assets/subway-line-7.png`, `assets/subway-line-2.png`를 사용합니다. 가산디지털단지역에는 1·7호선, 구로디지털단지역에는 2호선을 표시하며 `transport`의 `stops`에서 역·출구·셔틀 안내를 수정할 수 있습니다.
- **꽃 장식:** 제공된 참고 이미지의 분위기를 바탕으로 Imagegen으로 새로 만든 동백꽃 선화입니다. 표지는 `assets/camellia-frame.webp`, 작은 장식은 `assets/camellia-mark.svg`입니다. 생성 사양은 `assets/camellia-frame.prompt.txt`에 있습니다.
- **색상·서체:** `styles.css`의 `:root`에서 아이보리·더스티 블루 팔레트를 관리합니다. Pinyon Script 이름, Cormorant Garamond 영문, Gowun Batang 한글을 사용합니다.
- **이전 디자인 자산:** 사용하지 않는 설경은 [Mariana Buras / Unsplash](https://unsplash.com/photos/a-snow-covered-pine-tree-in-the-snow-opLzqpzcif8)의 사진입니다. 현재 페이지에서는 로드하지 않습니다.

방명록은 요청에 따라 제거했습니다. 초대 글·날짜·장소·사진첩·함께한 시간 위의 작은 제목도 표시하지 않습니다.
