# project8x-api

AWS **SAM** stack: **Fastify** behind **API Gateway HTTP API** + **Lambda**, using [`@fastify/aws-lambda`](https://github.com/fastify/aws-lambda-fastify).

First routes:

- `GET /health` — deploy/smoke check  
- `POST /v1/webhooks/stripe` — verifies `Stripe-Signature` using raw body (required for Stripe)

## Prerequisites

- **Node.js 20+**
- **AWS SAM CLI** — [Install SAM (official guide)](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- AWS credentials configured (`aws configure` or env) for deploy

### Windows — “sam is not recognized”

SAM is **not** installed via npm; it is a separate CLI (often bundled with its own Python runtime).

**Option A — winget (recommended)**

Open **PowerShell as Administrator** (some setups accept non-admin; if install fails, use Admin):

```powershell
winget install Amazon.SAM-CLI --accept-package-agreements --accept-source-agreements
```

Then **close and reopen** the terminal (PATH updates apply on new sessions). Confirm:

```powershell
sam --version
```

**Option B — MSI**

Download the current Windows x64 installer from the [AWS SAM CLI releases](https://github.com/aws/aws-sam-cli/releases) page (`AWS_SAM_CLI_64_PY3.msi`), run it, reopen the terminal, then `sam --version`.

**If `sam` still fails:** SAM usually installs under  
`C:\Program Files\Amazon\AWSSAMCLI\bin\`. Check that folder exists and add it to your **user PATH**, or invoke explicitly:

```powershell
& "C:\Program Files\Amazon\AWSSAMCLI\bin\sam.cmd" --version
```

**Docker:** Optional for `sam local start-api` / `sam local invoke`; install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) if you plan to emulate Lambda locally.

## Install

```bash
cd project8x-api
npm install
```

## Run locally (Fastify only)

```bash
npm start
# curl http://localhost:3001/health
```

Webhook route locally needs real Stripe signatures — use **Stripe CLI** (below) or SAM local.

## SAM build & local API

```bash
sam build
sam local start-api
# curl http://127.0.0.1:3000/health
```

Port may differ; SAM prints it.

## Deploy

First time (stores config in `samconfig.toml`):

```bash
sam build
sam deploy --guided
```

Set parameter **`StripeWebhookSecret`** when you have `whsec_...` from Stripe Dashboard → Webhooks → your endpoint (or leave empty until then; webhook route returns `503 webhook_not_configured`).

Later deploys:

```bash
sam build && sam deploy
```

Stack output **`HttpApiUrl`** is the base URL (e.g. `https://xxxx.execute-api.region.amazonaws.com`). Webhook URL:

`{HttpApiUrl}/v1/webhooks/stripe`

Register that in Stripe Dashboard (test mode first), then paste the signing secret into SAM parameter **`StripeWebhookSecret`**.

## Stripe CLI (recommended for dev)

Forward signed webhooks to local SAM or localhost:

```bash
stripe listen --forward-to http://127.0.0.1:3000/v1/webhooks/stripe
```

Use the CLI-printed **webhook signing secret** as `STRIPE_WEBHOOK_SECRET` when running locally (export env) or rely on SAM `--parameter-overrides`.

## Environment variables

| Variable | Where | Purpose |
|----------|--------|---------|
| `STRIPE_WEBHOOK_SECRET` | SAM parameter → Lambda env | Stripe `whsec_...` |
| `STRIPE_SECRET_KEY` | Optional Lambda env | SDK init only; `constructEvent` does not call Stripe APIs |
| `LOG_LEVEL` | Lambda env | Default `info` |

## Project layout

| Path | Role |
|------|------|
| `template.yaml` | HTTP API + Lambda + IAM |
| `src/app.js` | Fastify app, routes, Stripe raw-body parser |
| `src/lambda.js` | Lambda entry; wraps Fastify with `@fastify/aws-lambda` |
| `src/local.js` | Optional `node` HTTP server for quick checks |

## Next steps (platform plan)

- Persist processed Stripe **`evt_`** ids for idempotency ([`PLATFORM-PLAN.md`](../project8x-website/PLATFORM-PLAN.md)).  
- Add Postgres + entitlement issuance after verified events.  
- Add API Gateway throttling / WAF as traffic grows.
