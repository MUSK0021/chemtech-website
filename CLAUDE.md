# Chem-Tech Pest Solutions Website

This is a static website for **Chem-Tech Pest Solutions**, a family-owned pest control company serving Eastern Nebraska since 1984.

## Business Info

- **Phone:** (402) 215-6542
- **Service Area:** Eastern Nebraska
- **Tagline:** Your Best Defense Against Pests

## Tech Stack

- Pure vanilla HTML, CSS, and JavaScript — no framework, no build tools, no npm
- Single stylesheet: `css/styles.css`
- Single JS file: `js/main.js`
- Google Fonts: Playfair Display (headings) + DM Sans (body)
- Changes take effect immediately — no build step required

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, services overview, stats, testimonials, FAQ |
| `about.html` | Company history and team |
| `services.html` | Full service breakdown (residential, commercial, agricultural, bed bugs, termites, grain fumigation, WDI) |
| `pest-library.html` | Filterable pest reference guide |
| `service-areas.html` | Coverage area map/list |
| `reviews.html` | Customer reviews |
| `blog.html` | Tips and blog posts |
| `contact.html` | Contact form with urgency selector |

## Design Tokens (CSS Variables)

Defined in `:root` in `css/styles.css`:

- **Colors:** `--red` (#C41E24), `--green` (#2C3E2D), `--gold` (#D4A853), `--cream` (#F5F0EB), `--black` (#1A1A1A)
- **Fonts:** `--font-display` (Playfair Display), `--font-body` (DM Sans)

## JS Features (`js/main.js`)

- Scroll reveal animations (IntersectionObserver)
- Animated stat counters (`data-count` attribute)
- Navbar scroll/hide behavior
- Mobile hamburger menu
- FAQ accordion
- Pest library category filter
- Typewriter effect on hero (`data-typewriter` attribute)
- Smooth scroll for anchor links
