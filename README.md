# project8x

Consulting company profile and marketing site for **Project8X**.

## Platform roadmap (accounts, licensing, APIs)

**Primary planning doc:** **[`project8x-website/PLATFORM-PLAN.md`](project8x-website/PLATFORM-PLAN.md)** — auth, customer/employee portals, license validation, **Stripe** billing and webhooks, MFA, newsletter/compliance, SOC2-oriented tasks, and the **Current focus** handoff table.

**Related:** [`project8x-website/DATA-MODEL.md`](project8x-website/DATA-MODEL.md) (draft entities).

### Platform status

Platform implementation is tracked on **`feature/platform-accounts-licensing`** (not `main`, which auto-deploys the marketing site). Merge to `main` when a release is production-ready. **MVP-A locked:** authentication **AWS Cognito**, portal sessions **HTTP-only cookies + CSRF**, transactional email **AWS SES** (ESP deferred), API **AWS Lambda + API Gateway (HTTP API)** + Fastify. Remaining open items (Stripe Price→SKU/event specifics, analytics/consent, `www` canonical, etc.) live under **Open decisions** in [`PLATFORM-PLAN.md`](project8x-website/PLATFORM-PLAN.md); use **Current focus** for the next concrete task.

**Planned production hostnames:** marketing **`project8x.com`**, customer **`customer.project8x.com`**, employee **`employee.project8x.com`**. DNS steps: [`project8x-website/DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md`](project8x-website/DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md).

---

## Backend API (`project8x-api`)

SAM + Fastify on **Lambda + HTTP API**. Quickstart: [`project8x-api/README.md`](project8x-api/README.md) (`GET /health`, `POST /v1/webhooks/stripe`).

---

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

## Recent updates

### 2026-03 — Products and AZIMUTH

- **Home:** Hero actions include **View Products** (links to `/Products`) alongside services and contact.
- **Products:** Added **AZIMUTH** (antenna pointing desktop app) with marketing copy, **Download for Windows** pointing at the [GitHub release asset](https://github.com/oehamilton/AZIMUTH/releases/tag/v0.2.0), and links to the [repository](https://github.com/oehamilton/AZIMUTH) and [releases](https://github.com/oehamilton/AZIMUTH/releases). COMMS and EZ-SMS.NET retain legal PDFs and demo CTAs.
