# Reference-to-implementation mapping

[WEBSITE REFERENCE] [Live invitation](https://mungg.github.io/yekyung-and-hochul/)

The tap-to-open portrait cover leads to a bilingual hero, a personal invitation and portrait, an itinerary, attire guidance, a map with directions and address copying, a guest questionnaire, and a three-column album. The gallery dialog exposes close, previous, and next controls. The design uses a centered reading column, fine dividing rules, warm light surfaces, a serif hierarchy (the hero declares Cormorant Garamond), and generous space between sections. No form was submitted to the reference site.

[VIDEO REFERENCE]

The supplied attachment contains the brief but no recording. No video frames, timings or video-only interactions have been verified. The motion and gallery decisions below come from the written brief and the subsequent winter-envelope design requests.

[OUR IMPLEMENTATION DECISION]

| Reference / comparison | Decision for this invitation | Priority |
| --- | --- | --- |
| Portrait card over a neutral surround | Intentionally different: a wide forest-green envelope, yellow seal, snow in two layers and a softly blurred snowbank. Venue and time are visible before opening. | Keep the couple’s chosen cover. |
| Named illustrated hero with a real portrait | Ivory letter with a floral engraving and editable Korean/English copy. Names and portraits remain unfilled. | Replace sample photos when approved. |
| Multi-day schedule, dress code, Hawaii map and questionnaire | One confirmed ceremony, Seoul-local calendar, venue shuttle and driving directions. Omit travel RSVP and attire requirements that do not apply. | Address and correct time are essential. |
| Long narrow page with photo grid and tap-to-zoom | Centered 550px maximum reading width. The three-column grid crops thumbnails; the viewer contains the full image and provides arrows, swipe, and keyboard navigation. | Preserve the mobile reading and gallery flow. |
| Optional interactions described in the brief | User-initiated film, family/contact disclosures, separate account groups, guestbook preview, copy/share and calendar export. Hide optional sections without content. | Never publish invented personal details. |

Design tokens in `styles.css`: warm ivory paper (#fbf9f3), linen (#ece9e1), ink (#333b31), muted moss (#626958), green accent (#41523d); Korean serif, Latin serif and system sans. Content uses 22–44px gutters, section spacing of 60–86px, headings at 29–39px / 1.45, 3:4 thumbnails, restrained corners and 400ms ease-out reveals. The slower opening sequence yields immediately when reduced motion is requested.

Architecture: static HTML/CSS/ES modules, centralized wedding content, a separate date/calendar module with UTC boundary tests, and an allowlisted Pages build. Only a persistent guestbook requires a backend. See the README for options and the privacy decisions still needed.
