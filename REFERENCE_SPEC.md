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
| Long narrow page with photo grid and tap-to-zoom | Centered 550px maximum reading width. The three-column grid crops thumbnails; the viewer contains the full image and provides arrows, swipe, and keyboard navigation. | Preserve the mobile reading and gallery flow. |
| Optional interactions described in the brief | User-initiated film, family/contact disclosures, separate account groups, guestbook preview, copy/share and calendar export. Hide optional sections without content. | Never publish invented personal details. |

Design tokens in `styles.css`: warm ivory paper (#fbf7f2), blue-gray surround (#e9eef0), ink (#4a6378), muted blue (#607789), dusty-blue accent (#718fa7); Pinyon Script names, Cormorant Garamond English, Gowun Batang Korean and system sans. Content uses 22–44px gutters, section spacing of 60–86px, headings at 29–39px / 1.45, 3:4 thumbnails, restrained corners and 400ms ease-out reveals. The card fades and moves upward over 900ms, skipped when reduced motion is requested.

Architecture: static HTML/CSS/ES modules, centralized wedding content, a separate date/calendar module with UTC boundary tests, and an allowlisted Pages build. Only a persistent guestbook requires a backend. See the README for options and the privacy decisions still needed.

## November 7 family-and-story layout

The user's eight screenshots guide the body sequence and interaction patterns. Keep the existing full-screen blue camellia cover and Korean-only controls. The body now uses an unboxed invitation poem, the supplied parent names, a groom/bride contact dialog, a January 2027 calendar with a live countdown, official venue map and transport details, gallery, account tabs, optional guestbook preview, elapsed time since January 9, 2025, a ceremony summary, and a closing thank-you. The final footer reproduces the user-supplied excerpt attributed to 이수동, 「사랑가」. Reference couples, dates, bank numbers, and addresses are not reused.

Parents: 이철수 · 곽향숙의 아들 이지언; 정용익 · 이옥주의 딸 정다은. Per user instruction, phone and account details remain empty and can be filled in `src/data/wedding.js`. Phone/SMS controls are disabled without a number; incomplete bank records are never shown. The first-met date is measured from Seoul midnight because no time was provided.

Venue map, phone, hall and transit details were checked against https://www.g-towerconvention.kr/reservation/ on November 7, 2026. Its official map targets are https://naver.me/58NdkRJs and https://map.kakao.com/link/to/지타워컨벤션,37.479684,126.895539. Navigation uses Naver Map, Kakao Map and Google Maps web links, without requiring an application key.
