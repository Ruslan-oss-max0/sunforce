# Sunforce Beauty — unofficial design concept

A Ukrainian-language, frontend-only demo built with React, Vite, Tailwind CSS and Motion. No backend, analytics, forms, storage, or appointment processing. Booking links open the salon's public Instagram.

## Local preview

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. For a production build, run `npm run build`, then `npm run preview`. Deploy the generated `dist` directory to a static preview host (Vercel/Netlify); use a password-protected preview where available. The approved silk background is the production default.

## Content

Edit `src/data.js` for service descriptions, reference prices, gallery and outbound links. Layout and copy are in `src/main.jsx`; responsive styles are in `src/styles.css`.

The five service categories, address and six permanent-makeup prices come from the supplied screenshots. Prices are explicitly indicative and require confirmation. No unverified phone number, hours, credentials, testimonials or staff were added. The supplied logo informed the green/gold wordmark treatment.

## Photography — Version 2

Ten distinct, locally served Pexels photographs appear in the services, About, and gallery. The portrait-free hero uses the user-supplied silk texture. These are illustrative images, not the salon, its clients, or its results. License: https://www.pexels.com/license/

| Asset | Pexels source |
| --- | --- |
| service-facial.jpg | https://www.pexels.com/photo/7446693/ |
| service-lips.jpg | https://www.pexels.com/photo/7479545/ |
| service-hair.jpg | https://www.pexels.com/photo/38714663/ |
| service-lashes.jpg | https://www.pexels.com/photo/7446922/ |
| service-laser.jpg | https://www.pexels.com/photo/36930637/ |
| about-massage.jpg | https://www.pexels.com/photo/5659020/ |
| gallery-ritual.jpg | https://www.pexels.com/photo/8532757/ |
| gallery-texture.jpg | https://www.pexels.com/photo/6689397/ |
| gallery-glass.jpg | https://www.pexels.com/photo/8903695/ |
| gallery-bottles.jpg | https://www.pexels.com/photo/8015462/ |

Images are downloaded at web-optimized resolutions. Service images are preloaded as persistent layers, decoded before selection, and crossfade with reduced-motion support. The decorative hero badge and its CSS have been removed.

## Checks

`npm run build` produces the static site. With local Chrome installed and the dev server running, `node tests/responsive.mjs` checks 1920, 1440, 1280, 1024, 768, 430, 390, 375 and 320px widths, image loading, horizontal overflow, mobile navigation, services, gallery and browser errors. Screenshots are saved under ignored `qa/`.

## Public demo hosting

Public URL: https://ruslan-oss-max0.github.io/sunforce/

GitHub Pages serves the compiled site from the `gh-pages` branch. Run `npm ci` and `npm run build:pages`, then publish the contents of `dist/` (with `.nojekyll`) to that branch. Do not point Pages at the source files on `main`; browsers cannot run the uncompiled React entrypoint. The Sites deployment remains separate.
