# Lukman Tech & Print

A lightweight, mobile-first business website built with React 19, TypeScript and Vite. It includes a cinematic introduction, service catalogue, illustrative portfolio, business information, enquiry links, SEO foundations and Netlify deployment configuration.

## Run locally

Requires Node.js 20 or later.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`; preview it with `npm run preview`.

## Configure the business

The WhatsApp number is configured centrally in `src/config/business.ts` as `256751703270`. All enquiry links use that number through the official `wa.me` format and encode their messages. The website intentionally does not display a telephone number.

Review `src/data/services.ts` before publishing to confirm every listed service is ready to deliver. Edit `src/data/portfolio.ts` to replace illustrative stock images with approved work; the current gallery is explicitly labelled as illustrative samples and is not represented as client work. Service, hero, intro, and portfolio photographs are stored locally as WebP files under `public/images/`; source pages and license notes are in `public/images/IMAGE-SOURCES.md`.

Set the real domain in `src/config/business.ts`, then replace the placeholder in `public/sitemap.xml`. Canonical and LocalBusiness structured data should only be added after the production domain and verified location/contact details are known. Submit the deployed sitemap in Google Search Console.

## Deploy to Netlify

Push the project to GitHub and import that repository in Netlify. `netlify.toml` defines the build command (`npm run build`), publish directory (`dist`) and SPA fallback. No paid service or environment variable is required. Set up the domain only when one is available.

## Structure

- `src/config/business.ts` — central business and contact configuration
- `src/data/services.ts` — editable service catalogue
- `src/data/portfolio.ts` — editable, clearly illustrative gallery samples
- `src/App.tsx` — page sections, responsive navigation, intro, gallery and enquiry links
- `src/styles.css` — responsive visual system and reduced-motion rules
- `public/` — official logo, logo favicon, local photographs, image source notes, robots.txt and sitemap

## Owner details needed before launch

- Confirmed location (optional)
- Production domain (optional initially)
- Confirmation that each listed service is currently available
- Approved real portfolio images, if samples are to be replaced
