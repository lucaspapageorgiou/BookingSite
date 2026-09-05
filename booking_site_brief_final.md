I'm building a direct booking website for two cabins in the Smoky Mountains 
(Sevierville/Pigeon Forge/Gatlinburg area, Tennessee). I have an ownership 
stake in both cabins (one owner in common between them, though each also has 
other co-owners), so the site can reasonably imply shared ownership/one 
brand behind both properties.

GOAL
A simple, professional, and warm direct booking site that helps guests save 
money compared to booking through Airbnb, VRBO, or Booking.com. The site 
must instill trust and easily demonstrate that these listings exist 
elsewhere with strong reviews, so guests feel safe booking and paying 
directly.

CONTEXT
- Property management system: Hospitable (Professional plan + Direct Premium)
- Hospitable provides an embeddable booking widget per property. I will 
  provide the actual embed codes in a follow-up message once the site 
  structure exists and I can see exactly where each one should go, for now 
  build a clearly marked placeholder div per cabin page
- Hosting: Netlify (already connected, auto-deploys on push), static site, 
  no backend needed
- Tech stack: plain HTML/CSS, no framework, no build step
- Tone: warm and welcoming, but with a clear layer of professionalism, 
  guests should trust it enough to book and pay through it directly

REFERENCE MATERIAL
There are guest guide HTML files for both cabins in /reference (confirm 
exact filenames and casing on disk before referencing them, one is Rustic 
Retreat's guide, the other is Bearadise's). Look at both for tone and 
language conventions where relevant (no hyphens, en dashes, or em dashes in 
guest-facing text, write around them instead), and pull factual details from 
each where needed (house rules, what's provided, parking, about us), using 
the correct cabin's guide for that cabin's content. Note these guides were 
written for post-booking guests, this site is pre-booking and needs its own 
more polished, professional voice suited to conversion.

Photos currently live in folders named "Rustic Retreat" and "Bearadise" 
(with a space, mixed case). Rename these to "rustic-retreat" and "bearadise" 
for clean, escape-free paths in HTML/CSS, then use these images directly. 
Use best judgement for which photo goes where, I'll review the live site and 
give feedback on any rearranging needed.

CABINS
1. Bearadise — 8 guests, 3 bedrooms, 3 bathrooms
   Airbnb: https://www.airbnb.co.uk/rooms/1104481339632536285
   VRBO: https://www.vrbo.com/3888383?dateless=true
   Booking.com: https://www.booking.com/hotel/us/private-cabin-sleeps-8-with-3-full-bathrooms-pool-table-and-wet-bar-sevierville.html
2. Rustic Retreat — 6 guests, 3 bedrooms, 2 bathrooms
   Airbnb: https://www.airbnb.co.uk/rooms/605084321768371829
   VRBO: https://www.vrbo.com/2707751
   Booking.com: https://www.booking.com/hotel/us/rustic-charm-w-modern-amenities-and-secluded-feel.html

REVIEW TRUST SIGNALS
On each cabin's teaser (Home/Listings) and detail page, display a small 
trust row with star rating and review count per platform, each linking to 
that platform's listing:

Rustic Retreat: Airbnb 4.93★ (215+ reviews), VRBO 5.0★ (35+ reviews), 
Booking.com 5.0★ (link only, no review count displayed, too few reviews to 
be a meaningful proof point)

Bearadise: Airbnb 4.96★ (130+ reviews, include the note "top 5% of homes on 
Airbnb"), VRBO 5.0★ (link only, no review count displayed), Booking.com 
5.0★ (link only, no review count displayed)

Convert VRBO/Booking.com's 10-point scale to a 5-star equivalent for visual 
consistency with Airbnb's rating, or clearly label the differing scales if 
shown side by side. These numbers are entered manually and not live-synced, 
note this simply as a maintenance consideration, no need to build anything 
dynamic.

NAVIGATION AND PAGE STRUCTURE
Top-level nav: Home, About, Listings, Contact, FAQ

HOME PAGE, in this order:
1. Hero: full-width image carousel cycling through photos from both cabins 
   (pull from /images/bearadise and /images/rustic-retreat) as the very 
   first thing visitors see, auto-advance with manual arrows/dots, plain JS, 
   no external library. Each carousel image should show a small, subtle 
   caption naming which cabin it belongs to, positioned so it doesn't 
   obscure the image or compete with headline text. Overlaid or below the 
   carousel: a confident headline naming both cabins and the region, a 
   one-line subheading on direct booking value, and a primary CTA button to 
   Listings. Ensure carousel controls are keyboard navigable with proper 
   aria labels.
2. Teaser of both cabins linking to Listings. Each teaser includes an icon 
   row (people emoji + guest count, bed emoji + bedroom count, bath emoji + 
   bathroom count) and the review trust row described above.
3. "Book direct" benefit blurb: direct booking is always cheaper than the 
   platforms, phrased generally ("always cheaper than the platform, compare 
   for yourself below"), with one sentence explaining why (no platform 
   service fees passed to the guest), links out to each cabin's actual 
   Airbnb, VRBO, and Booking.com listings, a link to About, and a line 
   noting common questions are answered on the FAQ page with a link to it
4. Short area teaser (hiking, Dollywood, Gatlinburg/Pigeon Forge strip)

ABOUT
Frame the ownership story as: a family who loves the Smoky Mountains area, 
originally bought the cabins to enjoy themselves, and rents them out as 
direct bookings when not in personal use. Pull relevant tone/detail from 
both cabins' guest guide "about us" sections in /reference. I'll review and 
supplement after seeing the draft.

LISTINGS
Cards for both cabins linking to each cabin's own detail page, including the 
icon row and review trust row.

CABIN DETAIL PAGES (x2)
Each should feel visually distinct (own accent color, own photography 
treatment), including:
- Photo gallery (lazy-load images below the fold for mobile performance)
- Description
- Amenities list
- Review trust row (as specified above)
- Condensed house rules (pull real rules from reference material: guest 
  max, minimum age for hot tub, no pets, quiet hours, etc.)
- Parking note
- Placeholder cancellation/refund policy section (to be filled in later 
  with actual Hospitable policy terms)
- Placeholder section clearly marked for where the Hospitable booking 
  widget will go (real embed code provided in a follow-up message)
- A small trust/security note near the booking widget placeholder (e.g. 
  "Secure checkout" or similar), offsetting first-time-direct-booker 
  hesitation
- LodgingBusiness schema markup (structured data) for SEO
- Specific, descriptive alt text on every image (not generic labels), 
  written to reflect actual image content

CONTACT
A form (Formspree, free tier, no backend) for pre-reservation questions 
only, since Hospitable's guest portal handles all post-booking 
communication, make this scope clear in the copy. State inquiries typically 
get a response within 12 hours, often faster. Notification email goes to a 
dedicated business address set up later, use a placeholder Formspree 
endpoint for now.

FAQ
Build 5 to 10 questions. Use these as the core set, rewritten in a warm, 
friendly tone with accurate factual content, plus propose a few more to 
round it out (e.g. cancellation policy, minimum age to book, whether smoking 
is allowed):

Q: How does this work?
A: Booking direct through this site saves on Airbnb/VRBO/Booking.com fees. 
We'll be in immediate contact to confirm the reservation and next steps, and 
3 days before check in you'll receive the address and door code, no keys, no 
in-person check-in meeting.

Q: Do you have reviews?
A: This site doesn't host reviews directly, but you can check our Airbnb, 
VRBO, and Booking.com listings to see what past guests have said (link to 
all three).

Q: How do I check in?
A: 3 days before arrival you'll get a detailed email with cabin instructions 
and your access code. Electronic locks mean you can drive straight to the 
cabin and check in yourself.

Q: Are the cabins pet friendly?
A: Not pet friendly, the land is steep and doesn't give pets a good area to 
relieve themselves.

Q: What's provided?
A: Pull from the reference guest guide, mention two towels are provided per 
person, one for the hot tub and one for the shower, plus whatever else the 
reference material lists as included.

Q: How do I contact you once I've booked?
A: Once booked, you'll get access to a guest portal where you can ask 
anything you need throughout your stay.

Q: Where do I park?
A: Pull from the reference material's parking instructions, rewritten 
friendly and clear.

FOOTER (every page)
Short warm tagline about the two cabins, links to Contact, FAQ, Privacy 
Policy, and each cabin's Airbnb, VRBO, and Booking.com listing, a copyright 
line, and a placeholder cancellation/refund policy link. Do not include 
physical addresses, these are only shared with confirmed guests.

PRIVACY POLICY
A short, plain-language page covering what's collected via the Contact form 
and booking process, linked from the footer.

404 PAGE
Custom 404 matching the site's tone and design, with a link back to Home.

SEO
Page titles and meta descriptions for every page, sitemap.xml, and a 
favicon, in addition to the schema markup and alt text noted above.

COLORS
No fixed brand colors yet. Propose a warm, cabin-appropriate base palette 
for shared elements, then a distinct accent color per cabin pulled from each 
cabin's own photos, explain your choice briefly before applying it.

FILE STRUCTURE AND STYLING APPROACH
Separate CSS files per cabin plus one shared base stylesheet for layout, 
typography, and shared components (header, footer, nav). Propose a clean 
file structure and briefly explain it before building.

Mobile-first: most guests will browse and book from phones.

BUILD ORDER
Start with the Home page and the Bearadise cabin detail page as a first 
pass, then commit and push so I can see it live on Netlify before building 
the rest.
