# DNS, SSL, and Amplify — subdomain checklist

**Purpose:** Point **`customer.project8x.com`** and **`employee.project8x.com`** at the correct **AWS Amplify** apps with HTTPS. Use this as your runbook when portal apps are ready.

**Related roadmap:** [PLATFORM-PLAN.md](./PLATFORM-PLAN.md)

---

## Important

Subdomains are **not** HTTP “redirects” to Amplify. You add **DNS records** so each hostname resolves to Amplify; Amplify issues the **SSL certificate** (ACM) after DNS validates.

Until this is done, use each app’s default **`*.amplifyapp.com`** URL for builds and testing.

---

## Prerequisites

- [ ] Know where **DNS for `project8x.com`** is managed (registrar, **Route 53**, **Cloudflare**, etc.).
- [ ] Ability to create **DNS records** (CNAME; apex may use ALIAS/CNAME flattening where supported).

---

## Per subdomain (repeat for customer and employee)

**Hostnames**

| Portal   | Hostname                      |
|----------|-------------------------------|
| Customer | `customer.project8x.com`      |
| Employee | `employee.project8x.com`      |

**Steps** (do once per portal, in the matching Amplify app):

- [ ] Open **AWS Amplify Console** → the **customer** or **employee** portal **app** (each portal should usually be its own Amplify app + Git connection).
- [ ] **Hosting** → **Custom domains** → **Add domain**.
- [ ] Enter **`customer.project8x.com`** or **`employee.project8x.com`**. If Amplify requires **root domain verification**, add the **CNAME** or **TXT** records it shows at your DNS host.
- [ ] Copy the **exact records** Amplify displays (often a **CNAME** from the subdomain to a CloudFront/Amplify target).
- [ ] In your **DNS provider**, create those records (optionally lower **TTL** before cutover for faster rollback).
- [ ] In Amplify, wait until **SSL certificate** status is **Available** (~30–60 minutes after DNS propagates is common).
- [ ] In a browser, open **`https://customer.project8x.com`** or **`https://employee.project8x.com`** and confirm the **correct app** loads with a **valid** certificate.

---

## Marketing site: `www` vs apex (optional)

- [ ] Decide canonical URL: **`www.project8x.com`** ↔ **`project8x.com`** (redirect one to the other).
- [ ] Configure in **Amplify** domain settings (redirect rules) or your DNS host if it offers redirects.

---

## After custom domains are live

- [ ] In the **marketing** Amplify app (or CI env), set **`VITE_CUSTOMER_PORTAL_URL`** = `https://customer.project8x.com` and **`VITE_EMPLOYEE_PORTAL_URL`** = `https://employee.project8x.com` (rebuild/redeploy marketing).
- [ ] In your runbook, record **which Amplify app ID / name** maps to **which hostname** (useful for audits and SOC2 change history).

---

## Quick reference — target hostnames

| Role       | Production URL                          |
|------------|-----------------------------------------|
| Marketing  | `https://project8x.com` (and/or `www`)  |
| Customer   | `https://customer.project8x.com`        |
| Employee   | `https://employee.project8x.com`        |
