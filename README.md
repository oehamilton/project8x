# project8x

Consulting company profile and marketing site for **Project8X**.

## Website (`project8x-website`)

React (Vite) single-page app deployed via AWS Amplify (see `project8x-website/amplify.yml`).

**Roadmap (accounts, licensing, PayPal, etc.):** see [`project8x-website/PLATFORM-PLAN.md`](project8x-website/PLATFORM-PLAN.md).

### Local development

```bash
cd project8x-website
npm install
npm run dev
```

Dev server defaults to **http://localhost:3000/** (see Vite config).

### Production build

```bash
cd project8x-website
npm run build
```

Output is written to `project8x-website/build/`.

## Recent updates

### 2026-03 — Products and AZIMUTH

- **Home:** Hero actions include **View Products** (links to `/Products`) alongside services and contact.
- **Products:** Added **AZIMUTH** (antenna pointing desktop app) with marketing copy, **Download for Windows** pointing at the [GitHub release asset](https://github.com/oehamilton/AZIMUTH/releases/tag/v0.2.0), and links to the [repository](https://github.com/oehamilton/AZIMUTH) and [releases](https://github.com/oehamilton/AZIMUTH/releases). COMMS and EZ-SMS.NET retain legal PDFs and demo CTAs.
