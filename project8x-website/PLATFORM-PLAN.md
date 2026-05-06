# Project8X — Platform, accounts, and licensing (living plan)

**Status:** Planning / not started (implementation tracked below)  
**Last updated:** 2026-04-04 (DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md runbook)  

This document is the **single place** we update for the backend-adjacent work: auth, customers, employees, licenses, PayPal, MFA, support, newsletter, and SOC2-oriented practices. Check boxes as work completes; add notes under **Change log**.

---

## Working agreement (process)

These rules apply whenever we implement items from the **Master checklist**.

### Per feature (small increments)

1. **Implement** one focused change (or the smallest vertical slice that is shippable).
2. **Automate tests** for that change (unit and/or integration as appropriate; add to CI when CI exists).
3. **Manual test** — you exercise the behavior in a real environment before we call it done.
4. **Commit and push to the feature branch on GitHub** — only after automated tests pass and your manual check is satisfied; then move to the **next** feature/task.

### Git branches and production (`main`)

- **`main`** is **production** for the website: new commits **trigger automatic publish** (e.g. AWS Amplify). Do **not** land in-progress platform work on `main` until it is ready to go live.
- **Platform / backend / account work** lives on a **long-lived feature branch** (e.g. `feature/platform-accounts-licensing`). Push commits there as you complete each tested slice.
- When a **release is ready**, open a **pull request** (or merge) **into `main`** and deploy through your normal production checklist.

The rule stays: **no piling untested work** before a commit — only the **target branch** changes (`main` vs feature branch).

### End of each feature group (A, B, C, …)

When all checklist items under a section are done (or explicitly deferred):

1. **Review** what was delivered vs what the plan assumed.
2. **Decide** whether **later sections** (C–H) need edits — new tasks, reordered priorities, or removed scope.
3. Record outcomes in **Change log** and adjust **Master checklist** / **Backlog** so the document stays truthful.

### Ideas during testing

When something new comes up while you test:

- **Backlog** — add a row to **Backlog / parking lot** below if it should not block current work.
- **Next up** — if it should displace or precede the immediate next task, update **Current focus** and the checklist order; note the reason in **Change log**.

### Documentation and handoff (pick up where we left off)

Keep enough detail that a future session (or another person) can resume without memory:

- **Change log** — date, what changed, PR/commit hash if useful.
- **Session notes** — use **Current focus** for: last completed task, what is in progress, exact next command or ticket, blockers, environment (branch, URLs, feature flags).
- **Decisions captured** — any new “locked” decision gets a table row or an update to **Open**.

Update **Last updated** at the top when you edit this file meaningfully.

---

## Current focus (edit when you start / stop)

| Field | Value |
|--------|--------|
| **Date** | _YYYY-MM-DD_ |
| **Git branch** | e.g. `feature/platform-accounts-licensing` (not `main` until production-ready) |
| **Active feature group** | e.g. A. Foundation |
| **Last completed** | _task + commit SHA_ |
| **In progress** | _none / description_ |
| **Next step** | _single concrete action_ |
| **Blockers** | _none / …_ |

---

## Backlog / parking lot

| Added | Item | Disposition (backlog / next / done) | Notes |
|-------|------|-------------------------------------|-------|
| | | | |

---

## Decisions captured (refine as needed)

| Topic | Decision |
|--------|----------|
| Default mode | **Visitor** (unauthenticated) |
| Roles | **Customer**, **Employee** with **permissions** (Admin, Support, …) — not a separate “subscriber” product role |
| Newsletter | **Marketing list** + consent flag/timestamp; **not** the same as Customer |
| License in app | User enters **license key** in **external app**; app calls **validation API** with key + **device/instance id** |
| Device model | **Per device**; track activations; **customer can revoke** a device to free a slot for a new one |
| Payments | **PayPal** (account integration + webhooks → entitlements) |
| MFA | **Email** one-time code (hash + TTL server-side) |
| Customers | **Individuals or companies**; anyone may own **many licenses** |
| Deployment | **Marketing site** (brochure) stays **separate** from logged-in experiences. **Customer** and **Employee** portals are **separate apps/deployments**, each on its **own subdomain** of the existing domain (no second domain registration). Marketing site only **links** to portal URLs (env-configurable). |
| Hostnames | **F1** `project8x.com` (marketing). **F2** `customer.project8x.com` (customer portal). **F3** `employee.project8x.com` (employee portal). DNS + TLS on the primary domain. |
| Compliance target | **SOC2-oriented** controls (audit logs, least privilege, vendor list, encryption) |
| Database direction | **PostgreSQL** (managed) as primary; optional **Redis** for MFA/rate limits |
| Git / website deploy | **`main`** auto-publishes the **marketing** site only (e.g. Amplify). Customer/employee portals use **their own** repos/branches and Amplify apps (see subdomains). Brochure repo may still use **`feature/platform-accounts-licensing`** for marketing-safe changes until merged to `main`. |

**Open (owner to decide):** newsletter tooling (ESP vs SES-only), visitor analytics/cookies policy, exact PayPal products vs internal SKUs, whether to use **Cognito/Auth0** vs custom auth for MVP, whether **`www.project8x.com`** redirects to apex or the reverse.

---

## Hostnames (planned — subdomains)

Use **subdomains of the existing registrable domain** (e.g. `project8x.com`). No additional domain purchase—only **DNS records** (and attach each hostname in Amplify or your CDN for TLS).

| Purpose | Hostname | Deploy / repo |
|--------|-------------------|---------------|
| **F1 — Marketing / brochure** | **`project8x.com`** (apex; align `www` via redirect as you prefer) | Current Vite site; tied to **`main`** auto-publish |
| **F2 — Customer portal** | **`customer.project8x.com`** | Separate Amplify app (or stack); auth, profile, licenses, PayPal, support |
| **F3 — Employee portal** | **`employee.project8x.com`** | Separate Amplify app (or stack); admin/support tools |

**Development:** each app can use its **default `*.amplifyapp.com`** URL until custom subdomains are wired.

**Marketing site change:** header or menu entries **Customer portal** / **Employee portal** → `https://customer.project8x.com` and `https://employee.project8x.com` (use Vite env vars in code, e.g. `VITE_CUSTOMER_PORTAL_URL`, `VITE_EMPLOYEE_PORTAL_URL`, defaulting to these production URLs).

---

## DNS, SSL, and Amplify — action items (you / ops)

**Standalone copy for day-to-day use:** [DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md](./DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md)

Subdomains **do not use HTTP “redirects”** to reach Amplify. You **point DNS** at AWS so traffic for `customer.project8x.com` and `employee.project8x.com` is **served by the right Amplify app**; Amplify provisions **HTTPS** (ACM) once DNS validates.

Complete these when each portal app exists in Amplify and you are ready to go live on custom hostnames.

### Prerequisites

- [ ] Know where **DNS for `project8x.com`** is managed (registrar only, **Route 53**, **Cloudflare**, etc.).
- [ ] Ability to create **DNS records** (CNAME, and sometimes **CNAME flattening** or **ALIAS** at apex if you ever move the marketing apex—marketing is already on Amplify today).

### Per subdomain (`customer` and `employee`)

Repeat for **`customer.project8x.com`** and **`employee.project8x.com`** (each usually has its **own Amplify app** connected to its Git repo/branch).

- [ ] In **AWS Amplify Console**, open the **correct app** (customer portal app or employee portal app).
- [ ] Go to **Hosting** → **Custom domains** → **Add domain**.
- [ ] Enter the subdomain (e.g. `customer.project8x.com` or `employee.project8x.com`). If Amplify asks to verify **root domain** ownership, follow the wizard (may add a one-time **CNAME** or **TXT** at the registrar).
- [ ] Amplify shows **records to create** (typically **CNAME** from the subdomain to something like `xxxxx.cloudfront.net` or an Amplify target—copy exactly what the console displays).
- [ ] In your **DNS provider**, create those records (no TTL change needed unless your provider requires it; lower TTL before a cutover can speed rollback).
- [ ] Wait for **SSL certificate** status in Amplify to become **Available** (can take up to ~30–60 minutes after DNS propagates).
- [ ] Open `https://customer.project8x.com` / `https://employee.project8x.com` in a browser and confirm the **expected app** loads with a **valid certificate**.

### Marketing apex / `www` (optional cleanup)

- [ ] Decide **`www.project8x.com` ↔ `project8x.com`** behavior (redirect one to the other for SEO/bookmarks).
- [ ] Implement in **Amplify domain settings** (redirect rules) or **DNS-only** redirect if your host supports it—keep **one canonical** URL.

### After DNS is live

- [ ] Set **`VITE_CUSTOMER_PORTAL_URL`** / **`VITE_EMPLOYEE_PORTAL_URL`** in the **marketing** Amplify app (or build env) to the production `https://…` URLs so header links match production.
- [ ] Document **which Amplify app** maps to which hostname in your runbook (helps SOC2 change tracking).

**Note:** Until these steps are done, keep using each app’s **`*.amplifyapp.com`** URL in env vars for dev/staging and for early testing.

---

## Master checklist

### A. Foundation

- [ ] **DNS + Amplify:** complete [DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md](./DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md) when portal apps are ready
- [ ] Choose and provision **PostgreSQL** (e.g. RDS / Neon / Supabase) + environments (dev/staging/prod)
- [ ] **Secrets** store (Amplify env, SSM, or vault) — no secrets in repo
- [ ] **API** project (e.g. Node/Fastify, or Lambda + API Gateway) with health check and structured logging
- [ ] **Audit log** model (append-only: actor, action, resource, metadata, timestamp)
- [ ] Document **subprocessors** (PayPal, email provider, DB host, hosting) for SOC2 packet

### B. Identity and access

- [ ] **Registration** + **email verification** (token link or code; store hashed token + expiry)
- [ ] **Login** / logout / password reset
- [ ] **Email MFA** (send code, verify, rate limits; lockout policy)
- [ ] **Session** strategy (prefer **HttpOnly cookie** or secure token pattern; document cookie use)
- [ ] **RBAC**: roles + permissions in DB; JWT or session includes **role/permissions**; API middleware enforces
- [ ] **Employee** accounts with distinct **Admin** vs **Support** (and extend as needed)

### C. Customer portal (web)

- [ ] **Profile** CRUD (basic fields; optional org/company name)
- [ ] **License list**: products, keys (masked?), device count, revoke device UI
- [ ] **PayPal** checkout or subscription flow wired to **customer id** metadata
- [ ] **Webhook** handler: idempotent create/update **entitlements** from PayPal events
- [ ] **Support / feedback** form for customers (and optionally visitors with email)

### D. License API (for external apps)

- [ ] `POST /v1/licenses/validate` (or similar): **license_key** + **device_id** → valid / invalid + metadata
- [ ] **Activation** record on first success; enforce **max devices** per entitlement
- [ ] **Revocation** API + portal action updates DB; validation fails for revoked device
- [ ] **API rate limiting** + abuse monitoring
- [ ] Optional: short-lived **signed token** after validation to reduce round-trips

### E. Visitors and marketing

- [ ] **Visitor capture** policy: forms only vs analytics (document in privacy notice)
- [ ] **Newsletter signup** (email + basic info) + **unsubscribe** (token link)
- [ ] **Double opt-in** if required by policy/region
- [ ] Integrate chosen **ESP** or transactional + list in DB (TBD)

### F. Frontend

**F1. Marketing site — `project8x.com` (existing Vite app)**  
- [ ] **Portals** entry in header: links to **`https://customer.project8x.com`** and **`https://employee.project8x.com`** (env-driven for non-prod; Amplify default URLs OK until DNS is live)  
- [ ] No embedded login for portals—users authenticate **on the portal host** only  

**F2. Customer portal — `customer.project8x.com` (new app / deployment)**  
- [ ] Pages: register, verify email, login, MFA, profile, licenses/devices, PayPal flows, support/feedback  
- [ ] Route guards + **API** enforce customer role  

**F3. Employee portal — `employee.project8x.com` (new app / deployment)**  
- [ ] Ticket queue, license admin, other tools by **permission**  
- [ ] Route guards + **API** enforce employee permissions  

### G. SOC2-oriented hardening

- [ ] **MFA** for all employee logins
- [ ] **Least privilege** DB users; no shared prod passwords
- [ ] **Backups** + restore test documented
- [ ] **Dependency** and **container** scanning (if applicable)
- [ ] **Incident response** runbook (short internal doc)

### H. QA and launch

- [ ] Webhook **replay** tests (PayPal)
- [ ] License **validate** integration tests (key + device + revoke)
- [ ] Staging **e2e** smoke: register → verify → buy (sandbox) → validate → revoke
- [ ] Production cutover checklist

---

## Phased delivery (suggested)

1. **MVP-A:** DB + API skeleton + register/verify/login + email MFA + audit log  
2. **MVP-B:** Entitlements + PayPal webhook + customer portal license view + validate API + per-device activation  
3. **MVP-C:** Support/feedback + employee roles + ticket UI  
4. **MVP-D:** Newsletter list + consent + employee admin polish + SOC2 evidence pack  

Adjust order if PayPal or license API must come first for a pilot.

---

## Change log

| Date | Change |
|------|--------|
| 2026-04-04 | Initial plan and checklist from stakeholder decisions |
| 2026-04-04 | Added **Working agreement** (implement → automate tests → manual test → commit/push per feature); **end-of-group review** for A–H; **ideas during testing** (backlog vs next); **Current focus** and **Backlog / parking lot** tables for handoff |
| 2026-04-04 | **Git workflow:** commits for platform work go to **`feature/platform-accounts-licensing`**, not **`main`** (production auto-deploy). Merge to `main` when release-ready. |
| 2026-04-04 | **Architecture:** marketing site separate from portals; **subdomains** on existing domain for customer + employee apps; brochure site only **links** out (env URLs). Updated **Decisions**, **Hostnames (planned)**, and **F. Frontend** checklist. |
| 2026-04-04 | **Locked hostnames:** F1 **`project8x.com`**, F2 **`customer.project8x.com`**, F3 **`employee.project8x.com`**. |
| 2026-04-04 | Added **DNS, SSL, and Amplify — action items** (owner checklist) and **A. Foundation** link; clarified DNS point vs HTTP redirect. |
| 2026-04-04 | Saved standalone runbook **DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md**; cross-linked from PLATFORM-PLAN and README. |

---

## How to maintain this file

- Follow **Working agreement** during implementation; push to the **platform feature branch**, not `main`, until production-ready.  
- After each planning call: update **Decisions captured** and **Open** rows.  
- During implementation: check boxes in **Master checklist**; add rows if scope grows; update **Current focus** when starting/stopping (include **Git branch**).  
- Keep **prd.md** and root **README** pointing here so the team has one link.
