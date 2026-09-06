# Stays of the Smokies — Two Smoky Mountain Cabins

Static direct-booking website, brand name **Stays of the Smokies**, for two
cabins in Pigeon Forge, Tennessee: **Bearadise** and **Rustic Retreat**. The
owner has a stake in both (one owner in common between them, plus other
co-owners per cabin — see About page for the family story), so the site
presents them as one shared brand.

Goal: a warm, trustworthy site that converts visitors who currently book
these same cabins on Airbnb, VRBO, and Booking.com into direct bookers, by
demonstrating the listings are real (linking out to their existing reviews)
and that direct booking saves money (no platform fees passed to the guest).

Full detailed build spec: `booking_site_brief_final.md` (repo root). Treat
that file as the source of truth for exact page-by-page requirements; this
file is the quick-reference summary for working sessions.

## Location branding — read before touching copy

Site copy describes both cabins as located in **Pigeon Forge** only, per
explicit owner direction. Gatlinburg and Sevierville are mentioned only as
nearby towns in area/attractions content (e.g. the Home page's area section,
the About page), never as the cabins' own location. This is a deliberate
marketing choice — the guest guides in `/reference` list the actual mailing
addresses as Sevierville, TN, so there's a known divergence between the
real mailing city and the public-facing brand story. LodgingBusiness schema
on both cabin detail pages uses `addressLocality: "Pigeon Forge"` to match.
If this ever needs to change, check with the owner rather than reverting
unilaterally either direction.

## Status

Full site built: Home, About, Listings, both cabin detail pages, Contact,
FAQ, Privacy Policy, Cancellation Policy (placeholder), custom 404,
sitemap.xml, favicon. Owner reviews and gives feedback from here.

Hospitable booking widgets are live on both cabin detail pages (real embed
scripts from `cdn.hsptb.com`, not placeholders). The widget snippets
themselves carry no cancellation/refund policy text — that has to come
from the owner's Hospitable dashboard directly, so don't infer or fabricate
policy copy from the widget code.

Each cabin detail page has a "Where You'll Be" section with a Leaflet
(OpenStreetMap via cdnjs, no API key) map showing a shaded circle, not a
pin, over the cabin's general area (`data-map-lat`/`data-map-lng`, both
filled in with real coordinates, radius 805m = 0.5 mile). `fitBounds` uses
extra padding and a capped zoom (`maxZoom: 15`) so the circle doesn't
fill the whole frame — showing surrounding context is what makes a fixed
radius actually read as "precise" rather than just "big." If the map ever
shows "Map could not load" again, don't guess at a fix blind — open it in
a browser and read the console error (see `js/location-map.js`'s history:
the tile subdomain deprecation and the missing `map.setView()` call were
both found this way, not guessed). This exists specifically so the
real address never has to appear on the page while still giving guests a
genuinely accurate sense of location. The circle's center coordinates must
never be derived by sending the real street address (from `/reference`)
to an external geocoding service — that's an explicit privacy line the
owner asked to hold. Get coordinates only from the owner directly (they
look them up in Maps and hand back just the numbers), never by geocoding
the address text.

There is no standalone photo gallery section anymore — it was deliberately
merged away. Every real photo of each cabin (from `/images/{cabin}`) now
lives inside "The Space," attached directly to the room it belongs to.
Each `.room-item` has a `.room-photo` container holding every photo for
that room (only the first `<img>` displays; the rest are inert in the DOM
until opened). A `.photo-count-badge` ("N photos") only appears when a
room has more than one, so it's visually obvious there's more to see.
Area attraction photos (Dollywood, GSMNP sign, Hatfields & McCoys, Roaring
Fork, The Island, WonderWorks — duplicated identically across both
cabins' folders) live on the Home page's "The Area" section instead,
since those depict the region, not the property. Only the floor plan PDF
is excluded site-wide (different asset type, not a photo). Each cabin
also has an "Exterior" room-item (no bullet list to speak of, just
photos) so exterior shots that don't belong to any interior room still
have a home.

Photos are clickable (`js/lightbox.js`, shared across both cabin pages):
each `.room-photo` container is read as its own independent group, so
clicking into one room's photos only cycles through that room's photos
(prev/next, arrow keys), not the whole page. Opens a full-size overlay
with the alt text as a caption, a counter (hidden for single-photo
rooms), Escape/click-outside to close, and focus returns to the
thumbnail that opened it.

**Photo order on a cabin's listing is controlled entirely by the order
of the `<img>` tags inside that room's `.room-photo` div** (which photo
shows as the visible thumbnail = whichever `<img>` is first), and **room
order** is controlled by the order of `.room-item` blocks inside
`.room-list`, nothing else to configure. Each room-item's level label
("Main Level" / "Upper Level" / "Lower Level") is a `<span
class="level-tag">`, kept deliberately separate from the room name so it
reads as a small pill next to the heading rather than being baked into
the heading text.

Each cabin's **hero photo** (the big banner under the nav, and the same
photo used for that cabin's teaser card on Home and Listings) is a
specific choice, not just "whatever the first real photo was": Bearadise
uses the twilight exterior (`ChatGPT Image May 3, 2026...jpg`), Rustic
Retreat uses the twilight aerial (`winner.jpg`). Both are set in three
places per cabin — the cabin's own `.cabin-hero`, `index.html`'s teaser
card, and `listings.html`'s card — keep those three in sync if the hero
ever changes again. The Home page's rotating carousel is separate from
this and can keep whatever mix of photos it already has.

The Hospitable widget is a black box past the loader script: things like
showing taxes/fees inline (vs. only at the reserve step) are controlled
in the owner's Hospitable dashboard settings, not in this site's code —
don't invent undocumented `data-*` attributes hoping they do something.

Remaining placeholders, not blockers, just waiting on real values:
- Formspree form endpoint on Contact page (`YOUR_FORM_ID` placeholder)
- Actual cancellation/refund policy text (placeholder section on both
  cabin pages plus its own page) — must come from the owner's Hospitable
  dashboard, not the widget embed code
- Real domain for `sitemap.xml` and the schema `image` URLs
  (`REPLACE-WITH-LIVE-DOMAIN` placeholders)

## Stack and hosting constraints

- Plain HTML/CSS, no framework, no build step, no npm.
- Vanilla JS for site behavior (carousel, mobile nav) — no external JS
  libraries there. The one exception is Leaflet (loaded via CDN, no API
  key) for the location map circle on cabin detail pages, since that needs
  real map tiles; don't add other external JS dependencies beyond that.
- Netlify hosting, already connected, auto-deploys on push to `main`.
- No backend. Contact form uses Formspree free tier (placeholder endpoint
  until the owner sets up a dedicated business email).
- Mobile-first — most guests will browse and book from phones.

## Property management system (PMS)

Currently **Hospitable** (Professional plan + Direct Premium). Each cabin's
detail page has its real Hospitable embeddable booking widget (a `<script>`
loader tag with `data-site-uuid` and `data-property-id`), marked with a
`<!-- HOSPITABLE WIDGET: {cabin} -->` comment for easy identification.

The owner may switch PMS providers in the future. Keep widget embeds
isolated (one container div per cabin, not tangled into layout CSS) so a
future provider's widget can be dropped in without restructuring the page.

## Reference material (`/reference`)

Two existing post-booking guest guide HTML files, one per cabin:
- `reference/bearadise-guest-guide.html`
- `reference/rustic-retreat-guide.html`

Use these for **tone and factual details only** (house rules, what's
provided, parking, about-us content) — match each cabin's content to the
correct guide. Do **not** reuse their post-booking voice directly: those
guides speak to guests who already booked; this site is pre-booking and
needs its own more polished, conversion-focused voice — still warm, but
with a clearer layer of professionalism since guests are being asked to
trust the site enough to pay directly.

**Style rule pulled from the guides, carried forward to all guest-facing
copy on this site:** no hyphens, en dashes, or em dashes. Rewrite around
them (e.g. "3 days before check in" not "3 days pre-check-in").

## The two cabins

**Bearadise** — 8 guests, 3 bedrooms, 3 bathrooms
- Airbnb: 4.96★ (130+ reviews, note "top 5% of homes on Airbnb")
  https://www.airbnb.co.uk/rooms/1104481339632536285
- VRBO: 5.0★, link only, no review count
  https://www.vrbo.com/3888383?dateless=true
- Booking.com: 5.0★, link only, no review count
  https://www.booking.com/hotel/us/private-cabin-sleeps-8-with-3-full-bathrooms-pool-table-and-wet-bar-sevierville.html

**Rustic Retreat** — 6 guests, 3 bedrooms, 2 bathrooms
- Airbnb: 4.93★ (215+ reviews)
  https://www.airbnb.co.uk/rooms/605084321768371829
- VRBO: 5.0★ (35+ reviews)
  https://www.vrbo.com/2707751
- Booking.com: 5.0★, link only, no review count (too few reviews to be a
  meaningful proof point)
  https://www.booking.com/hotel/us/rustic-charm-w-modern-amenities-and-secluded-feel.html

Review numbers are entered manually, not live-synced — a maintenance note,
not something to build dynamic sync for. Convert VRBO/Booking.com's
10-point scale to a 5-star equivalent for visual consistency with Airbnb,
or clearly label the differing scales if shown side by side.

Never publish either cabin's physical address anywhere on the public
site (only shared with confirmed guests via Hospitable's guest portal).

## Photos (`/images`)

Folders are `images/bearadise/` and `images/rustic-retreat/` (renamed from
the original "Images/Bearadise" / "Images/Rustic Retreat" with spaces and
mixed case, for clean escape-free paths in HTML/CSS).

**Working copies are resized for web** (max 2000px on the long edge, JPEG
~78 quality; stray PNGs converted to JPEG) — originals were 30 to 50MB
camera files, ~900MB total, unusable for a live site. Full-resolution
originals are backed up outside the repo at
`~/Desktop/Cabin Photos - Full Resolution Originals` — go there if a
print-quality or full-res version of a photo is ever needed. Any new
photos added later should get the same treatment before committing
(`sips -Z 2000 -s format jpeg -s formatOptions 78 file.jpg --out file.jpg`).

Alt text must be specific and descriptive of actual image content, never
generic.

## File structure

```
index.html, about.html, listings.html, contact.html, faq.html,
privacy.html, cancellation-policy.html, 404.html, sitemap.xml, favicon.svg
cabins/bearadise.html, cabins/rustic-retreat.html
css/base.css        — shared layout, typography, header/nav/footer, buttons,
                       carousel, trust rows, icon rows, FAQ accordion
css/bearadise.css   — Bearadise accent (ember/gold) + photo treatment
css/rustic-retreat.css — Rustic Retreat accent (slate blue) + photo treatment
js/nav.js           — mobile nav toggle + header scroll behavior, all pages
js/carousel.js      — Home page hero carousel, vanilla JS, no libraries
js/lightbox.js      — per-room photo groups, both cabin pages
js/location-map.js  — Leaflet "Where You'll Be" circle, both cabin pages
```

Both cabins' accent color CSS variables live in `css/base.css` `:root`
(`--bearadise-*`, `--rustic-*`) since they're reused sitewide on teaser
cards; the per-cabin stylesheets only hold that cabin's own detail-page
flourishes (heading color, etc.).

The header is transparent/overlaid (`.header-overlay` class, only on
`index.html` and both cabin pages, since those are the only pages with a
hero image directly underneath it) so the hero photo shows through at
the top of the page. `js/nav.js` adds `.is-solid` once scrolled past
60px, turning it into the normal solid forest-green bar for the rest of
the page. Other pages (About, Listings, Contact, FAQ, etc.) keep the
plain sticky solid header — there's no hero photo for a transparent one
to reveal there.

## SEO and structured data

Every page needs a title and meta description. Cabin detail pages need
`LodgingBusiness` schema markup. Also needed: `sitemap.xml`, favicon,
custom 404 page matching site tone/design with a link back to Home.

## Future consideration

The owner may later want the interactive guest-guide HTML (the files in
`/reference`, or their successors) accessible through this site itself,
so booked guests can reach their cabin's guide from whichever platform
they booked on. Not in scope for the initial build, but avoid decisions
that would make wiring that in later awkward (e.g. keep each cabin's
assets/content reasonably self-contained per cabin).
