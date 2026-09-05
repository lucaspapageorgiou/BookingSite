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

Remaining placeholders, not blockers, just waiting on real values:
- Hospitable booking widget embed codes (one per cabin, clearly marked
  `<!-- HOSPITABLE WIDGET: {cabin} -->` divs in each detail page)
- Formspree form endpoint on Contact page (`YOUR_FORM_ID` placeholder)
- Actual cancellation/refund policy text (placeholder section on both
  cabin pages plus its own page)
- Real domain for `sitemap.xml` and the schema `image` URLs
  (`REPLACE-WITH-LIVE-DOMAIN` placeholders)

## Stack and hosting constraints

- Plain HTML/CSS, no framework, no build step, no npm.
- Vanilla JS only where needed (image carousel) — no external JS libraries.
- Netlify hosting, already connected, auto-deploys on push to `main`.
- No backend. Contact form uses Formspree free tier (placeholder endpoint
  until the owner sets up a dedicated business email).
- Mobile-first — most guests will browse and book from phones.

## Property management system (PMS)

Currently **Hospitable** (Professional plan + Direct Premium). Each cabin's
detail page gets a Hospitable embeddable booking widget — until the owner
supplies the real embed code, use a **clearly marked placeholder div** per
cabin page (e.g. `<!-- HOSPITABLE WIDGET: bearadise --><div class="widget-placeholder" data-cabin="bearadise">...</div>`).

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
js/nav.js           — mobile nav toggle, shared across all pages
js/carousel.js      — Home page hero carousel, vanilla JS, no libraries
```

Both cabins' accent color CSS variables live in `css/base.css` `:root`
(`--bearadise-*`, `--rustic-*`) since they're reused sitewide on teaser
cards; the per-cabin stylesheets only hold that cabin's own detail-page
flourishes (gallery border treatment, heading color, etc.).

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
