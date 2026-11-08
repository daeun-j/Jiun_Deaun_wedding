# Reference-to-implementation mapping

[WEBSITE REFERENCE] [Live invitation](https://mungg.github.io/yekyung-and-hochul/)

The tap-to-open portrait cover leads to a bilingual hero, a personal invitation and portrait, an itinerary, attire guidance, a map with directions and address copying, a guest questionnaire, and a three-column album. The gallery dialog exposes close, previous, and next controls. The design uses a centered reading column, fine dividing rules, warm light surfaces, a serif hierarchy (the hero declares Cormorant Garamond), and generous space between sections. No form was submitted to the reference site.

[VIDEO REFERENCE]

The supplied attachment contains the brief but no recording. No video frames, timings or video-only interactions have been verified. The motion and gallery decisions below come from the written brief and the subsequent winter-envelope design requests, superseded by the supplied ivory-and-blue floral reference on November 7, 2026.

[OUR IMPLEMENTATION DECISION]

| Reference / comparison | Decision for this invitation | Priority |
| --- | --- | --- |
| Portrait card over a neutral surround | Updated to the November 7 reference: a full-height ivory card without mobile margins, blue camellia border, script names Jiun Lee and Daeun Jung, and “Join us for the wedding of”. Venue and time are visible before opening. | Keep the couple’s chosen cover. |
| Named illustrated hero with a real portrait | Ivory letter with a floral engraving and Korean-only body copy; no masthead or language switcher. The Korean names are 이지언 and 정다은; the cover names remain Jiun Lee and Daeun Jung. Portraits remain placeholders. | Replace sample photos when approved. |
| Multi-day schedule, dress code, Hawaii map and questionnaire | One confirmed ceremony, Seoul-local calendar, venue shuttle and driving directions. Omit travel RSVP and attire requirements that do not apply. | Address and correct time are essential. |
| Long narrow page with photo grid and tap-to-zoom | Centered 550px maximum reading width. The two-column, nine-row grid has 18 editable photo slots. The viewer fills the viewport using cover cropping, with overlaid controls, swipe and keyboard navigation. | Preserve the mobile reading and gallery flow. |
| Optional interactions described in the brief | User-initiated film, family/contact disclosures, separate account groups, copy/share and calendar export. Hide optional sections without content. | Never publish invented personal details. |

Design tokens in `styles.css`: warm ivory paper (#fbf7f2), blue-gray surround (#e9eef0), ink (#4a6378), muted blue (#607789), dusty-blue accent (#718fa7); Pinyon Script names, Cormorant Garamond English, Gowun Batang Korean and system sans. Content uses 22–44px gutters, section spacing of 60–86px, headings at 29–39px / 1.45, 3:4 thumbnails, restrained corners and 400ms ease-out reveals. The card fades and moves upward over 900ms, skipped when reduced motion is requested.

Architecture: static HTML/CSS/ES modules, centralized wedding content, a separate date/calendar module with UTC boundary tests, and an allowlisted Pages build. The invitation has no guestbook or message collection form.

## November 7 family-and-story layout

The user's eight screenshots guide the body sequence and interaction patterns. Keep the existing full-screen blue camellia cover and Korean-only controls. The body now uses an unboxed invitation poem, the supplied parent names, a groom/bride contact dialog, a January 2027 calendar with a live countdown, official venue map and transport details, gallery, account tabs, elapsed time since January 9, 2025, a ceremony summary, and a closing thank-you. The final footer reproduces the user-supplied excerpt attributed to 흔글, 〈계절〉, followed by the user's invitation message. Reference couples, dates, bank numbers, and addresses are not reused.

Parents: 이철수 · 곽향숙의 아들 이지언; 정용익 · 이옥주의 딸 정다은. Per user instruction, phone and account details remain empty and can be filled in `src/data/wedding.js`. Phone/SMS controls are disabled without a number; incomplete bank records are never shown. The first-met date is measured from Seoul midnight because no time was provided.

Venue map, phone, hall and transit details were checked against https://www.g-towerconvention.kr/reservation/ on November 7, 2026. Its official map targets are https://naver.me/58NdkRJs and https://map.kakao.com/link/to/지타워컨벤션,37.479684,126.895539. Navigation uses Naver Map, Kakao Map and Google Maps web links, without requiring an application key.

Latest copy cleanup: remove the guestbook and the small labels above the invitation, calendar, venue, gallery and elapsed-time sections. The first-met caption reads “2025.01.09부터”; the closing heading reads “새로운 시작을 함께 축하해 주세요.”

Cover appointment: date, “토요일 오전 11:00”, venue; no separate weekday line. Remove the venue phone and album preview note. Keep the transport source link at https://www.g-towerconvention.kr/reservation/. The six existing placeholders repeat across 18 slots until actual photos are supplied.

## Sparrow and camellia story

The user's two minhwa references inform new, transparent hand-painted sparrow and camellia assets. Preserve the blue cover and all existing copy. Opening the invitation starts a small sparrow's slow 30-second flight around the reading column. At the final poem, two sparrows approach separate branch perches over 5.8 and 7.2 seconds; only after both land does the grey camellia illustration regain its red blossoms and green leaves over 4.2 seconds. This sequence runs once per opening, without a control or extra label.

All birds are decorative, hidden from assistive technology and transparent to pointer input. Photo/contact dialogs, external-link handoffs, tab/app switches and full-screen media hide the birds and pause their animation clocks. Leaving the ending out of view pauses its sequence; returning resumes it. Reduced motion omits the flight and shows the finished illustration when the ending enters view. Keep the existing 18-photo viewer, transport information and poem untouched.
