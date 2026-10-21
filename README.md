# project8x

Consulting company profile and marketing site for **Project8X**.

## Website (`project8x-website`)

React (Vite) single-page app deployed via AWS Amplify (see `project8x-website/amplify.yml`).

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

`/admin`, `/admin/`, `/admin/*`, and `/admin.html` send visitors to `/` in the client router. Amplify Hosting does not read a Netlify `_redirects` file, so the HTTP 301s have to be entered in the Amplify console. The ordered rules are in `project8x-website/amplifyConsoleRedirects.js` and `project8x-website/DEPLOYMENT.md`. The client-side passphrase gate and its status-file fetch have been removed.

## Recent updates

### 2026-03 — Products and AZIMUTH

- **Home:** Hero actions include **View Products** (links to `/Products`) alongside services and contact.
- **Products:** Added **AZIMUTH** (antenna pointing desktop app) with marketing copy, **Download for Windows** pointing at the [GitHub release asset](https://github.com/oehamilton/AZIMUTH/releases/tag/v0.2.0), and links to the [repository](https://github.com/oehamilton/AZIMUTH) and [releases](https://github.com/oehamilton/AZIMUTH/releases). COMMS and EZ-SMS.NET retain legal PDFs and demo CTAs.
