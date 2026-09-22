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

### Admin demo gate (`/admin`)

Unlisted page for the AgentForge demo link. A muted **Admin** link on the AgentForge page opens it. It is not in the header or footer. `/admin` responds with `noindex, nofollow`.

The usual screens are **offline** and **live on the internal network** (no public URL). **Open demo** is shown only when status has `live: true` and an https `demo_url`. A missing status fetch also shows offline.

This host is a static Vite build (AWS Amplify). There is no server runtime, so the passphrase check is a **client-side SHA-256 compare**. The hash is compiled into the admin bundle. Treat that as obfuscation, not authentication. Do not commit a real passphrase or a real demo hostname.

Set these at **build time** (Amplify Console → Environment variables, or `project8x-website/.env` locally). Changing them requires a new build. Keep the names below. Vite inlines them with `define`; a `VITE_` rename is not required.

| Name | Purpose |
| --- | --- |
| `ADMIN_PASSWORD_HASH` | Lowercase SHA-256 hex of the shared passphrase, with no trailing newline. Empty keeps the gate closed. |
| `AGENTFORGE_DEMO_STATUS_URL` | Status JSON URL. Blank uses `https://agentforge-foundation-status.s3.us-east-1.amazonaws.com/demo/status.json`. A failed fetch shows offline. `AGENTFORGE_STATUS_URL` is used when this name is unset. |

Generate the hash with no trailing newline. `echo passphrase | sha256sum` includes a newline and will not match the gate (`Access denied.`). `echo -n` and this node command do not:

```bash
node -e "const c=require('crypto');process.stdout.write(c.createHash('sha256').update(process.argv[1]).digest('hex'))" 'your-passphrase'
```

Local fixtures (no AgentForge): see `project8x-website/.env.example` and `project8x-website/public/fixtures/`.

## Recent updates

### 2026-03 — Products and AZIMUTH

- **Home:** Hero actions include **View Products** (links to `/Products`) alongside services and contact.
- **Products:** Added **AZIMUTH** (antenna pointing desktop app) with marketing copy, **Download for Windows** pointing at the [GitHub release asset](https://github.com/oehamilton/AZIMUTH/releases/tag/v0.2.0), and links to the [repository](https://github.com/oehamilton/AZIMUTH) and [releases](https://github.com/oehamilton/AZIMUTH/releases). COMMS and EZ-SMS.NET retain legal PDFs and demo CTAs.
