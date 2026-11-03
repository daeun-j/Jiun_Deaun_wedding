# 겨울 청첩장 · Winter wedding invitation

2027년 1월 16일 토요일 오전 11시(한국 시간), 서울 지타워 컨벤션. 눈 덮인 숲의 봉인을 누르면 청첩장이 열립니다. 한국어와 영어를 지원합니다.

## 개발과 배포

빌드 도구나 npm 패키지 설치 없이 HTML, CSS, ES modules로 동작합니다. 프로젝트 폴더에서 `python3 -m http.server 4173`을 실행하고 `http://localhost:4173/`을 여세요. Node 20 이상으로 `node --test tests/event-time.test.mjs`를 실행하면 서울 자정과 캘린더 파일을 검사합니다.

`sh scripts/build.sh`는 실제 공개할 파일만 새 `dist/`에 복사합니다. 이미 있으면 다른 새 폴더 이름을 인수로 주세요(예: `sh scripts/build.sh /tmp/wedding-preview-v2`). GitHub Actions는 매번 깨끗한 작업 폴더에서 같은 스크립트를 실행합니다. 개인 메모·원본·연락처 파일을 `assets/`나 `src/`에 보관하지 마세요. 두 폴더는 공개됩니다.

1. 본인 계정의 청첩장 전용 저장소를 사용하세요. 상위 Desktop 저장소를 올리지 마세요.
2. 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
3. 이 프로젝트(숨김 폴더 `.github/` 포함)를 저장소의 `main` 브랜치에 반영합니다. 기존 작업을 덮어쓰거나 force push하지 마세요.
4. **Actions → Deploy wedding invitation to Pages**에서 테스트와 배포가 모두 성공하면 **github-pages** 환경의 링크를 엽니다. 하위 경로에서도 작동하도록 모든 로컬 자산 경로는 상대 경로입니다.
5. 공개 주소를 아이폰 Safari에서 열고 봉투 → 사진첩 → 길찾기 → 캘린더 순으로 확인한 뒤 하객에게 공유하세요. localhost는 하객용 주소가 아닙니다.

[GitHub Pages 공식 워크플로 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## 내용 바꾸기

`src/data/wedding.js`에서 이름, 초대 글, 예식 일시, 장소, 일정, 교통, 사진, 영상과 선택 항목을 수정합니다. 한국어와 영어는 각각 `ko`, `en`입니다. 일시는 오프셋을 포함한 ISO 형식(예: `2027-01-16T11:00:00+09:00`)으로, 시간대는 `Asia/Seoul`처럼 지정하세요. 예식장 주소·교통의 출처는 [지타워 컨벤션](https://www.g-towerconvention.kr/reservation/)입니다. 셔틀 운행은 예식일 전에 다시 확인하세요.

- **사진:** 공유에 동의한 사진을 WebP/JPEG로 줄여 `assets/`에 넣고 `photos`의 경로와 양국어 대체 텍스트를 바꿉니다. 현재 6장은 예시라고 표시됩니다. 빈 배열이면 메뉴와 사진첩 모두 숨겨집니다.
- **영상:** `movieUrl`에 `./assets/wedding.mp4` 또는 YouTube/Vimeo 링크를 넣으세요. 외부 플레이어는 하객이 눌렀을 때만 로드하며 자동 재생하지 않습니다. 빈 값이면 섹션을 숨깁니다.
- **연락처·계좌:** 공개에 동의한 값만 입력하세요. 전화·메일은 `couple`에, 선택 가족 연락처는 `family`에, 계좌는 `accounts`에 추가합니다. `side`는 `groom` 또는 `bride`입니다. 접어 둔 내용도 소스에는 공개됩니다.
- **공유:** 네이티브 공유가 지원되지 않으면 링크 복사를 사용합니다. 전용 카카오톡 공유 버튼은 미설정입니다. 추가하려면 소유한 Kakao Developers 앱의 JavaScript 키와 배포 도메인 등록이 필요합니다. [공식 가이드](https://developers.kakao.com/docs/ko/kakaotalk-share/js-link)
- **배경:** [Mariana Buras의 노르웨이 설경](https://unsplash.com/photos/a-snow-covered-pine-tree-in-the-snow-opLzqpzcif8)을 [Unsplash License](https://unsplash.com/license)에 따라 사용했습니다. 모바일·가로 화면용 이미지를 로컬에서 제공합니다.

## 방명록

현재는 **비활성 미리보기**입니다. 이름이나 메시지를 전송·저장하지 않으며 관리할 데이터도 없습니다. 저장소 정책만으로 정적 사이트에 방명록이 생기지는 않습니다.

| 선택지 | 운영 방식과 무료 사용 시 제약 | 설정할 보호 장치 |
| --- | --- | --- |
| [Supabase](https://supabase.com/docs/guides/platform/billing-on-supabase) | SQL 테이블로 승인·삭제 상태를 관리하기 쉽습니다. 무료 프로젝트는 비활동 시 [일시 중지](https://supabase.com/docs/guides/platform/free-project-pausing)될 수 있습니다. | 승인된 글만 읽는 RLS 정책, 작성 요청의 서버 측 검증·속도 제한, 운영자 전용 삭제 |
| [Firebase Firestore](https://firebase.google.com/docs/firestore/quotas) | 서버 운영 없이 문서 목록을 제공하지만 무료 읽기·쓰기 일일 한도가 있어 목록을 페이지로 나눠야 합니다. | Security Rules, App Check, 운영자 인증, 클라이언트의 임의 수정·삭제 차단 |

운영을 원하면 제공자, 누가 글을 볼지, 승인할 사람, 보관 기간을 먼저 정합니다. 공개 쓰기 전에 입력 제한, 도배 방지, 삭제 경로를 검증하세요. 비밀번호 평문이나 관리자 키를 프런트엔드에 넣지 마세요. 이 설정이 끝나기 전에는 양식을 활성화하지 않습니다.
