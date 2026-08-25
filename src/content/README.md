# Site Content

Every piece of copy on the site — headings, paragraphs, nav labels, captions, form
text — lives in the JSON files here, one per page (plus `site.json` for things
shared across every page: nav, footer, contact details, the repeated CTA banner).

Edit a JSON file and reload the site — no component code needs to change.

| File             | Powers                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `site.json`       | Nav links, footer, brand name, shared contact info, shared CTA banner |
| `home.json`       | Hero carousel captions, mission strip, services preview, stats, testimonials |
| `about.json`       | About page: story, mission/vision, values, milestones, team          |
| `services.json`    | Services page: service list, "how it works" steps                    |
| `gallery.json`     | Gallery page: intro text + one caption per gallery image             |
| `contact.json`     | Contact page: info cards, map placeholder, form labels + success text|

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
