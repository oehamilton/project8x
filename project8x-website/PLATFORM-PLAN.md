# Project8X — Platform, accounts, and licensing (living plan)

**Status:** Planning / not started (implementation tracked below)  
**Last updated:** 2026-04-04 (Git branch workflow: feature branch, not `main`)  

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
| Deployment | **One React app** for all users; **hide routes/UI** by role; **API enforces** access |
| Compliance target | **SOC2-oriented** controls (audit logs, least privilege, vendor list, encryption) |
| Database direction | **PostgreSQL** (managed) as primary; optional **Redis** for MFA/rate limits |
| Git / website deploy | **`main`** auto-publishes the marketing site (e.g. Amplify). Platform work ships on **`feature/platform-accounts-licensing`** until reviewed; **merge to `main`** only when ready for production. |

**Open (owner to decide):** newsletter tooling (ESP vs SES-only), visitor analytics/cookies policy, exact PayPal products vs internal SKUs, whether to use **Cognito/Auth0** vs custom auth for MVP.

---

## Master checklist

### A. Foundation

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

### F. Frontend (existing Vite app)

- [ ] Route guards: **public**, **customer**, **employee** (by permission)
- [ ] Pages: register, verify email, login, MFA step, profile, licenses, support, newsletter prefs
- [ ] Employee areas: ticket queue, admin license overrides (as per permissions)
- [ ] Hide nav/links based on **permissions**; mirror checks on API

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

---

## How to maintain this file

- Follow **Working agreement** during implementation; push to the **platform feature branch**, not `main`, until production-ready.  
- After each planning call: update **Decisions captured** and **Open** rows.  
- During implementation: check boxes in **Master checklist**; add rows if scope grows; update **Current focus** when starting/stopping (include **Git branch**).  
- Keep **prd.md** and root **README** pointing here so the team has one link.
