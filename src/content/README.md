# Site Content

Every piece of copy on the site — headings, paragraphs, nav labels, captions, form
text — lives in the JSON files here, one per page (plus `site.json` for things
shared across every page: nav, footer, contact details, the repeated CTA banner).

Edit a JSON file and reload the site — no component code needs to change.

| File             | Powers                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `site.json`       | Nav links, footer, brand name, shared contact info, shared CTA banner |
| `home.json`       | Hero carousel captions, find-us band, mission strip, services preview, stats, testimonials |
| `about.json`       | About page: story, mission/vision, values, milestones, team          |
| `gallery.json`     | Gallery page: intro text + one caption per gallery image             |
| `contact.json`     | Contact page: info cards, embedded Google Map, form labels + success/error text|
| `de-addiction-treatment.json` | Services → De-Addiction Treatment page (`/services/de-addiction-treatment`) |
| `neuro-psychological-treatment.json` | Services → Neuro-Psychological Treatment page (`/services/neuro-psychological-treatment`) |

## Notes

- **Icons** are referenced by string key (e.g. `"icon": "heart-handshake"`) and
  mapped to an actual icon component inside the relevant `.tsx` file. Adding a
  brand-new icon (not already used elsewhere) still requires a one-line code
  change to register it in that file's icon map — everything else (text) does not.
- **`home.json`'s `hero.captions`** and **`gallery.json`'s `images`** are matched
  by *position* to the image files in `src/assets/images/carousel/` and
  `src/assets/images/gallery/`, which are sorted alphabetically by filename (see
  `scripts/generate-image-manifests.mjs`). If you add/remove/reorder images in
  those folders, update the matching entry's position in the JSON.
- `footer.copyright` supports a `{year}` placeholder that's replaced with the
  current year automatically.
- `contact.json`'s `mapEmbedSrc` is the `src` of the Google Maps `<iframe>` on
  the Contact page. To point it at a different address: open Google Maps →
  search the address → Share → Embed a map → copy the `src="..."` URL from the
  provided `<iframe>` snippet and paste it in as the value (just the URL, not
  the whole `<iframe>` tag).
- The contact form actually sends email via Web3Forms (see the project root
  `README.md`'s "Contact form email delivery" section and `.env.example`) — it
  is not just a UI demo. `contact.json`'s `form.success`/`form.error` text is
  shown depending on whether that submission succeeds.
- The Home page's "Find Us" band (`src/components/home/VisitUsBand.tsx`, just
  below the hero) reuses `contact.json`'s `mapEmbedSrc`/`mapTitle` and
  `site.json`'s `contactInfo.address` rather than duplicating them — only its
  motivational line and button label live in `home.json`'s `visit` key.
  Updating the map or address in one place updates both this band and the
  Contact page.
- There is no standalone `/services` overview page. "Services" in the nav
  (`site.json`'s `nav.links`) has no `href` of its own — it's a label-only
  trigger that only opens the dropdown (hover on desktop, tap on mobile) listing
  its `children`. Clicking/tapping the "Services" label itself does nothing but
  toggle the dropdown; only the child links navigate anywhere.
- The two treatment sub-pages (`de-addiction-treatment.json`,
  `neuro-psychological-treatment.json`) share one layout component,
  `src/components/services/TreatmentProgramPage.tsx`. Both JSON files follow the
  same shape (`header`, `overview`, `offerings`, `whoItsFor`, `process`) — copy
  that shape if you add a third specialized-care page, then add a route under
  `src/app/services/<slug>/page.tsx` and a link in `site.json`'s
  `nav.links` → Services `children` (and, if you want it discoverable from the
  footer too, in `footer.quickLinks`).
