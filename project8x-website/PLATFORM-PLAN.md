# Project8X — Platform, accounts, and licensing (living plan)

**Status:** Planning / not started (implementation tracked below)  
**Last updated:** 2026-05-08  

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

Use this table as the **handoff surface** for every platform session.

**When you start:** set **Date**, **Git branch**, **Active feature group**, and exactly one **Next step** (verb + artifact + environment, e.g. “Create Cognito User Pool in staging”).  
**When you stop:** fill **Last completed** (what shipped + commit SHA), update **In progress** (or `_none_`), and note **Blockers**.

### Template (replace placeholders)

| Field | Value |
|--------|--------|
| **Date** | `_YYYY-MM-DD_` |
| **Git branch** | `_feature/platform-accounts-licensing_` (not `main` until production-ready) |
| **Active feature group** | `_e.g. B. Identity and access_` |
| **Last completed** | `_task summary + short SHA (or “none”)_` |
| **In progress** | `_none / short description_` |
| **Next step** | `_one concrete next action_` |
| **Blockers** | `_none / …_` |

### Example row (typical next step — copy and adapt)

| Field | Value |
|--------|--------|
| **Date** | `2026-05-07` |
| **Git branch** | `feature/platform-accounts-licensing` |
| **Active feature group** | `B. Identity and access` |
| **Last completed** | `PLATFORM-PLAN polish — commit abc1234` |
| **In progress** | `none` |
| **Next step** | `Provision Cognito User Pool + app client in **staging**; document pool IDs and callback URLs in Amplify env` |
| **Blockers** | `none` |

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
| Authentication provider | **AWS Cognito** — User Pools for identities; **Identity Pools** when we need temporary AWS credentials or federation patterns Cognito recommends |
| Portal authorization | **HTTP-only cookies** for browser portals (customer + employee), with **CSRF protection** (SameSite + CSRF token on mutating requests). Avoid storing access tokens in `localStorage` |
| Transactional email | **AWS SES** for all transactional mail for MVP-A; **ESP deferred** until marketing automation warrants it |

---

## Open decisions

Rows below are either **Decided** (locked) or **Open** (still need a call). **Decided** items unblock MVP-A identity + session work immediately.

| Decision | Options | Recommended / Default | Owner | Target Decision Date | Status | Notes |
|----------|---------|-----------------------|-------|----------------------|--------|-------|
| Authentication Provider | AWS Cognito, Auth0, Custom auth | **AWS Cognito** (User Pools + Identity Pools when needed; aligns with Amplify) | Othell Hamilton | 2026-05-13 | **Decided** | **Locked for MVP-A.** Amplify Auth (`amplify add auth` or equivalent); built-in verify/MFA/password policy; CloudTrail-ready; low ops overhead. Drawback: less UI polish than Auth0 — use Amplify hosted UI or custom UI on Cognito primitives. SAML/social later without migration off Cognito. |
| Authorization Mechanism | HTTP-only cookies, Bearer JWT | **HTTP-only cookies** (CSRF protected) | Othell Hamilton | 2026-05-13 | **Decided** | **Locked for portals.** Backend sets `Set-Cookie` on login; SPA uses `credentials: 'include'` (Axios `withCredentials: true`). SameSite + CSRF token on forms/API mutations. **Bearer JWT** reserved for **non-browser** clients if needed (e.g. license-adjacent flows)—never primary storage in browser. |
| Email Service | AWS SES only, SendGrid/Mailgun (ESP) | **AWS SES** for transactional | Othell Hamilton | 2026-05-13 | **Decided** | **ESP deferred.** Cognito can send via SES; Lambda/backend sends MFA/license notices via SES. **Actions:** verify sending domain in SES; production sending limits/access if required; SES templates for consistent branding on verify/MFA/reset. |
| Payment Processor Details | PayPal only, Stripe secondary | **PayPal primary** (one-time + subscriptions) | Othell Hamilton | 2026-05-20 | Open | Define internal SKUs and the webhook events we will support. |
| API Architecture | Node/Fastify on EC2/Lambda, AppSync/GraphQL, Serverless | **Node.js + Fastify** (start REST-first) | Othell Hamilton | 2026-05-15 | Open | Hosting target (Lambda vs ECS) decided with infra constraints. |
| Analytics & Cookie Consent | None, Minimal (privacy-first), Full GA | **Minimal with explicit consent** | Othell Hamilton | 2026-05-20 | Open | Ensure GDPR/CCPA posture is documented in the privacy notice. |
| Domain & Redirect Strategy | www → non-www, non-www → www | **Non-www primary with redirect** | Othell Hamilton | 2026-05-10 | Open | Implement via Amplify redirect rules; keep one canonical. |
| MFA Requirement | Optional for all, Required for employees/customers | **Required for employees; optional for customers** | Othell Hamilton | 2026-05-20 | Open | Balance security vs friction; still rate-limit + lockout on login. |
| License Validation Rate Limits | Per-key, per-IP, per-device | **10 req/min per key + per-IP fallback** | Othell Hamilton | 2026-05-15 | Open | Tune based on observed abuse + legitimate app polling behavior. |

### MVP-A actions (from decided rows)

1. **Cognito:** run `amplify add auth` (or create User Pool + app clients manually), configure callbacks for `customer.*` / `employee.*` portal URLs per environment.
2. **Sessions:** implement cookie-based session handoff between Cognito sign-in and API (BFF pattern if needed); enforce CSRF on mutating routes.
3. **SES:** verify domain; wire Cognito custom messages or SES templates for verification/MFA/reset; log critical sends in **AuditLog** where applicable.

**Decision process:** each **Open** item needs brief rationale + impact notes when moved to **Decided.**

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

## Personas, account types, and roles

This section defines “who uses what” so we don’t accidentally blur marketing vs portals.

### Personas (product perspective)

- **Visitor (default)**: unauthenticated; can browse marketing pages; may submit support/feedback and/or newsletter signup.
- **Newsletter subscriber**: **not a product role**—a marketing list entry with consent fields (may or may not have a Customer account).
- **Customer**: authenticated user with access to `customer.project8x.com`; can view entitlements/licenses/devices; manages billing outcomes and support.
- **Employee**: authenticated user on `employee.project8x.com`; performs admin/support tasks by permission.

### Roles & permissions (implementation perspective)

- **Customer role**: base permissions for customer portal
- **Employee role**: permission-based (Admin, Support, BillingOps, …)
- Authorization is enforced **server-side** in API middleware; UI route guards are convenience only.

---

## User registration & onboarding flow

### User progression (conceptual)

1. **Visitor (default)** → newsletter signup and/or direct account registration.
2. **Newsletter subscriber** → marketing list entry (consent + preferences). **Not a product role**.
3. **Customer** → registers + verifies email → completes purchase → gains portal access to entitlements/licenses/devices.
4. **Employee** → invited/provisioned by an admin (separate flow; higher security bar).

### Registration process (step-by-step)

1. **Form submission** (Customer portal: `/register`)
   - Fields: email, password (if provider-managed auth not used), first name, last name, company (optional)
   - Client-side validation
   - Optional abuse controls: CAPTCHA and/or IP throttling (usually better server-side)

2. **Backend handling**
   - Enforce email uniqueness
   - Create user via **Cognito User Pools** (MVP-A default); backend persists linkage to Customer/profile tables as needed
   - Set account state to “pending verification” until email is confirmed
   - Send verification email (SES or chosen provider) with time-limited token (e.g., 24h expiry)

3. **Email verification**
   - User clicks link → frontend route consumes token → API verifies
   - On success: mark email verified, start session/login flow, audit-log
   - Resend limit (example): 3 attempts/hour per email + per IP

4. **Post-registration**
   - Redirect to profile completion
   - If the user has no entitlement yet: show “Get a license” CTA (PayPal) and/or a “Talk to us” support path

### Employee onboarding (separate flow)

- Employee accounts are **not** self-registered.
- Flow: Admin creates invite → employee accepts → sets password/MFA → role/permissions assigned.
- MFA: required (see Open decisions).

### Profile management page (`/account/profile`)

- Editable: name, company, phone, avatar, password change (if applicable), newsletter preferences + unsubscribe
- Customers-only: view entitlements, masked license keys, device activations, billing history (as implemented)
- All sensitive changes produce **AuditLog** entries

### Security & compliance baseline (MVP)

- Password policy (if password-based): minimum 12 characters (complexity optional but rate limiting is mandatory)
- Account lockout: 5 failed attempts → 15-minute lock (tunable)
- Consent captured for newsletter + privacy notice version
- Audit log: login/logout, email verify/resend, profile edits, license/device changes, billing state changes

### Success criteria (initial targets)

- ≥ 95% of registrations complete email verification within 24 hours (measure once instrumentation exists)
- No “unverified but active” accounts remain older than 30 days in production (cleanup job / policy)

---

## Minimal data model (MVP)

This is intentionally small—enough to unblock the API + portals. Expand as needs emerge.

**Reference:** [`DATA-MODEL.md`](./DATA-MODEL.md)

- **User**
  - id, email, password_hash, email_verified_at, created_at, disabled_at
- **Customer**
  - id, primary_user_id, display_name (individual/company), created_at
- **Employee**
  - id, user_id, created_at
- **Role / Permission / UserRole / RolePermission**
  - role names + permission slugs; join tables
- **Entitlement**
  - id, customer_id, sku, status, starts_at, ends_at (nullable), created_at, updated_at
- **LicenseKey**
  - id, entitlement_id, license_key_hash (never store raw if possible), display_key_last4, status, created_at
- **Activation (Device)**
  - id, license_key_id, device_id, activated_at, revoked_at (nullable), last_validated_at, metadata_json
- **AuditLog (append-only)**
  - id, actor_user_id (nullable), actor_type, action, resource_type, resource_id, metadata_json, created_at
- **NewsletterSubscriber**
  - id, email, consented_at, consent_source, unsubscribed_at, privacy_notice_version

---

## API baseline

### Purpose

Provide a secure, scalable backend for user management, license validation, payments, and customer/employee portals. The API supports both:

- **Public** marketing site flows (newsletter, visitor support/feedback)
- **Protected** customer/employee portals (authenticated)
- **Public-but-abuse-prone** license validation (must be rate-limited + monitored)

### Technology stack

- **Runtime**: Node.js (LTS) with Fastify (preferred) *(Express acceptable if it wins on team familiarity)*
- **Hosting**: AWS Lambda + API Gateway **or** ECS/Fargate (see Open decisions)
- **Database**: **PostgreSQL (managed)** as primary (per **Decisions captured** — locked direction). Optional **Redis** for MFA tokens, rate limiting, or cache layers.
  - Relational model fits customers, entitlements, devices, payments idempotency, and audit rows. If we later add a non-relational store (e.g., event ingestion), treat it as **additive**, not a replacement for Postgres.
- **Authentication**: **AWS Cognito** (User Pools; Identity Pools when needed) integrated with Amplify on the frontend (**locked** — see Open decisions table).
- **Authorization**: **RBAC** enforced at API middleware + business logic layer
  - **Portal auth**: **HTTP-only cookies** + CSRF protection (**locked**). Bearer JWT only where justified for non-browser clients—not stored in browser storage.
- **API style**: REST + JSON; consider GraphQL only if/when it solves a real client problem
- **Documentation**: OpenAPI/Swagger spec maintained with the code

### Environment URLs (planned)

- Development: `https://api.dev.project8x.com`
- Staging: `https://api.staging.project8x.com`
- Production: `https://api.project8x.com`

### Core cross-cutting concerns

- **Logging & tracing**:
  - Structured JSON logs
  - Request correlation id on every request
  - Add distributed tracing (e.g., AWS X-Ray) when the first multi-service boundary exists
- **Error handling**:
  - Standard error envelope: `{ code, message, details? }`
  - Correct HTTP status codes (`400/401/403/404/409/422/429/5xx`)
  - No sensitive data in responses or logs (license keys, passwords, MFA codes)
- **Rate limiting**:
  - Public endpoints: per-IP baseline (exact numbers tuned later)
  - License validation: per-key + per-IP fallback (see Open decisions row); return `429` + retry hints
- **Security**:
  - Strict CORS (explicit allowlist per environment)
  - Input validation (Zod/Joi/etc.) on every request
  - Secure headers (“helmet-style”)
  - Webhook signature verification (PayPal) + idempotency key storage
- **Secrets management**:
  - AWS Secrets Manager or SSM Parameter Store
  - No secrets in repo; avoid printing secrets in logs; rotate as needed
- **Monitoring**:
  - CloudWatch metrics/alarms for error rate, latency, and license validation volume

### Versioning strategy

- URL-based versioning: `/v1/...`
- Maintain backwards compatibility within a major version; plan deprecations before `/v2`

### Starter endpoints (MVP — adjust names in OpenAPI)

Exact paths and payloads ship with the OpenAPI spec; this list is the **bread-and-butter surface** for portals + licensing.

| Area | Method & path | Notes |
|------|----------------|-------|
| Auth / session | `POST /v1/auth/register` | If signup flows through our API; may be partially Cognito-hosted — document whichever is true |
| Auth / session | `POST /v1/auth/verify-email` | Token from email → verified user |
| Auth / session | `POST /v1/auth/login`, `POST /v1/auth/logout` | Session cookies or provider tokens |
| Auth / session | `POST /v1/auth/mfa/challenge`, `POST /v1/auth/mfa/verify` | Email OTP |
| Customer | `GET /v1/me`, `PATCH /v1/me/profile` | Current user + profile |
| Customer | `GET /v1/customer/entitlements` | Licenses / SKUs / status for portal |
| Licenses (public) | `POST /v1/licenses/validate` | External apps; no portal session |
| PayPal | `POST /v1/webhooks/paypal` | Signature verify + idempotent processing |
| Marketing / ops | `POST /v1/newsletter/subscribe`, `POST /v1/support/contact` | Optional early slice |

**Implementation note:** start with a minimal viable API (auth + license validation + PayPal webhook ingestion) before expanding to full portal feature breadth.

---

## Master checklist

### A. Foundation

- [ ] **DNS + Amplify:** complete [DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md](./DNS-AMPLIFY-SUBDOMAIN-CHECKLIST.md) when portal apps are ready
- [ ] **AWS Cognito (MVP-A):** User Pool + app clients per env (`amplify add auth` or manual); redirect/callback URLs for `customer.*` / `employee.*`; Identity Pools only if needed for AWS credential federation
- [ ] **AWS SES:** verify sending domain (and production sending access if required); wire Cognito to send via SES where applicable; SES templates for verification / MFA / password reset branding
- [ ] Choose and provision **PostgreSQL** (e.g. RDS / Neon / Supabase) + environments (dev/staging/prod)
- [ ] **Secrets** store (Amplify env, SSM, or vault) — no secrets in repo
- [ ] **API** project (e.g. Node/Fastify, or Lambda + API Gateway) with health check and structured logging
- [ ] **Audit log** model (append-only: actor, action, resource, metadata, timestamp)
- [ ] Document **subprocessors** (PayPal, email provider, DB host, hosting) for SOC2 packet

### B. Identity and access

- [ ] **Registration** + **email verification** (Cognito User Pools + Amplify Auth; backend syncs Customer/profile as needed)
- [ ] **Login** / logout / password reset
- [ ] **Email MFA** (send code, verify, rate limits; lockout policy)
- [ ] **Session** strategy — **locked:** **HttpOnly cookies** + CSRF for portals; document cookie names, TTL, and SameSite policy
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

#### D.1 License validation contract (lock early)

**Endpoint**

- `POST /v1/licenses/validate`
- **Public endpoint** (no portal session required). Must be heavily rate-limited + monitored.

**Request payload**

```json
{
  "licenseKey": "string (required)",
  "deviceId": "string (required)",
  "appVersion": "string (optional)",
  "metadata": {
    "os": "string (optional)",
    "platform": "string (optional)",
    "locale": "string (optional)"
  }
}
```

Validation rules (MVP):
- `licenseKey`: treat as opaque; enforce basic length bounds (do not leak “exists/doesn’t exist” via timing/logging).
- `deviceId`: treat as opaque stable identifier per device/instance (UUID or hardware-derived hash are both acceptable).
- Never log `licenseKey` or `deviceId` in plaintext. Persist only **hashed** license keys.

**Success response (200)**

```json
{
  "valid": true,
  "entitlements": [
    {
      "sku": "P8X-EXAMPLE",
      "status": "ACTIVE",
      "endsAt": "2026-12-31T23:59:59Z",
      "maxDevices": 3
    }
  ],
  "device": {
    "deviceId": "opaque",
    "activatedAt": "2026-05-06T15:04:05Z",
    "revokedAt": null
  }
}
```

**Error responses (standardized)**

- `400` — invalid request format (missing/invalid fields)
- `401` — invalid, expired, or revoked license (treat as not authorized to use)
- `403` — device limit reached (license valid but this device cannot activate)
- `429` — rate limit exceeded (**include** `Retry-After` header)

Recommended error body shape:

```json
{
  "code": "INVALID_LICENSE",
  "message": "License is invalid."
}
```

Recommended `code` values:
- `INVALID_LICENSE`
- `LICENSE_EXPIRED`
- `LICENSE_REVOKED`
- `DEVICE_REVOKED`
- `DEVICE_LIMIT_REACHED`
- `RATE_LIMITED`

**Behavior rules**
- On first successful validation for a **new** device: create an **Activation** (counts toward `maxDevices`).
- Device id must be unique **per license**. Normalize `deviceId` consistently (e.g., trim + lowercase) and enforce uniqueness on the normalized form.
- If `maxDevices` would be exceeded: return `403` with `DEVICE_LIMIT_REACHED`.
- Activation reset policy: allow reset **once per 30 days** via support/admin workflow (track last reset timestamp or derive from AuditLog).
- **Caching (explicit):** successful validation responses may be cached **server-side for up to 5 minutes** (TTL = 300s) per cache key. Negative results (invalid/expired) may use a shorter TTL or no cache—pick one policy in implementation and document it.
  - Cache key: licenseKeyHash/licenseKeyId + normalized deviceId + entitlement state version
  - Revocation and payment status changes **must invalidate** affected keys so entitlement changes remain consistent with “immediate” revocation policy.
- Revocation: immediate on admin action or payment failure; grace period configurable per SKU (default **0 days**).
- Rate limiting: **10 requests/min per licenseKeyHash (or internal licenseKeyId)** + per-IP fallback. Exceeding returns `429` + `Retry-After`.

**Idempotency & security notes**
- Every request carries/returns a correlation id (see API baseline).
- Abuse detection: flag rapid device changes and repeated invalid keys per IP/customer; alert/log for support review.
- PayPal webhook-driven updates must be the source of truth for entitlement status.

**Quick test (once implemented)** — replace host and sample values:

```bash
curl -sS -X POST "https://api.staging.project8x.com/v1/licenses/validate" \
  -H "Content-Type: application/json" \
  -H "X-Correlation-Id: manual-test-1" \
  -d "{\"licenseKey\":\"YOUR_LICENSE_KEY\",\"deviceId\":\"550e8400-e29b-41d4-a716-446655440000\",\"appVersion\":\"1.0.0\"}"
```

Use a unique `X-Correlation-Id` per request in shared environments.

Expect `200` + JSON body on success; `401`/`403`/`429` per **Error responses** above.

#### D.2 PayPal → entitlement fulfillment (minimum detail)

- Decide whether we support **one-time**, **subscription**, or both (see Open decisions)
- Webhooks must be:
  - verified (signature validation)
  - idempotent (store event id + processed_at)
  - mapped through an internal SKU table (PayPal product/plan → sku)
- On successful payment/activation:
  - create/update Entitlement
  - issue LicenseKey(s) as needed
  - audit-log the change

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

#### AuditLog — mandatory events (minimum bar)

Append-only audit rows for the actions below (actor, timestamp, resource id, correlation id where available). Extend the list as features ship.

| Event / action | When to log | Notes |
|----------------|-------------|--------|
| `AUTH_LOGIN_SUCCESS` | Successful portal login | No passwords/tokens in payload |
| `AUTH_LOGIN_FAILURE` | Failed login | Reason code only; avoid leaking account existence |
| `AUTH_LOGOUT` | Explicit logout | |
| `AUTH_MFA_VERIFY` | MFA success/failure | Never store raw OTP |
| `USER_EMAIL_VERIFIED` | Email verification completed | |
| `PROFILE_UPDATE` | Profile or preferences changed | Diff summary optional |
| `ROLE_ASSIGN` / `ROLE_REVOKE` | Employee permission changes | Who granted + target user |
| `LICENSE_ISSUED` / `LICENSE_REVOKED` | Entitlement or key lifecycle | Link entitlement/key ids |
| `DEVICE_ACTIVATED` / `DEVICE_REVOKED` | Activation slot consumed or freed | Normalized device id reference |
| `PAYPAL_WEBHOOK_RECEIVED` | Webhook accepted (pre-processing) | Store event id for idempotency |
| `PAYPAL_WEBHOOK_PROCESSED` | Entitlement/payment updated | Outcome + linked records |
| `NEWSLETTER_CONSENT` / `NEWSLETTER_UNSUBSCRIBE` | Marketing consent changes | Consent version + source |

---

## Environments (dev / staging / prod)

Define this early so PayPal, email, and DNS don’t become a late-stage tangle.

- **Dev**
  - local + `*.amplifyapp.com` preview URLs
  - test email + test PayPal (if needed)
- **Staging**
  - mirrors production infrastructure where possible
  - PayPal **sandbox** mapped to staging endpoints
- **Production**
  - `project8x.com`, `customer.project8x.com`, `employee.project8x.com`
  - PayPal live, production webhooks, production email domain

Secrets:
- store per-environment in Amplify env vars and/or AWS parameter store; no secrets in repo

QA:
- one smoke flow per env: register → verify → login → MFA → view licenses; and PayPal webhook replay in staging

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
| 2026-05-06 | Expanded plan with **Open decisions table**, **personas/roles**, **minimal data model**, **API baseline**, **license validation contract**, and **environments** section to reduce ambiguity before authenticated portal + licensing work begins. |
| 2026-05-07 | Polish: **Current focus** template + example row; **API starter endpoints** + PostgreSQL clarification; license **cURL** + explicit **caching** wording; **AuditLog mandatory events** table under SOC2. |
| 2026-05-08 | **Locked MVP-A decisions:** Authentication (**AWS Cognito** User Pools + Identity Pools when needed), portal authorization (**HTTP-only cookies** + CSRF), transactional email (**AWS SES**; ESP deferred). Added **Decisions captured** rows and **MVP-A actions** checklist under Open decisions. |

---

## How to maintain this file

- Follow **Working agreement** during implementation; push to the **platform feature branch**, not `main`, until production-ready.  
- After each planning call: update **Decisions captured** and **Open** rows.  
- During implementation: check boxes in **Master checklist**; add rows if scope grows; update **Current focus** when starting/stopping (include **Git branch**).  
- Keep **prd.md** and root **README** pointing here so the team has one link.
