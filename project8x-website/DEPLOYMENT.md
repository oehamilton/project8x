# AWS Amplify Deployment Guide

## Prerequisites
- AWS Account
- AWS Amplify Console access
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Connect Repository
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Select the branch (usually `main` or `master`)

### 2. Build Settings
The `amplify.yml` file is already configured with the correct build settings:
- **Build command**: `npm run build`
- **Base directory**: `build`
- **Node version**: Latest LTS (automatically detected)

### 3. Environment Variables (if needed)
If you have any environment variables, add them in the Amplify Console under:
- App settings → Environment variables

The `/admin` area is retired, so the site no longer reads `ADMIN_PASSWORD_HASH`, `AGENTFORGE_DEMO_STATUS_URL`, or `AGENTFORGE_STATUS_URL`. Those Amplify environment variables can be deleted. Contact-form variables, if used, are listed in `project8x-website/.env.example`. A new Amplify build is required after a variable changes.

These `VITE_` names are also inlined into the public bundle. Leave them unset to keep the feature off. Do not put API keys in `VITE_` variables.

| Name | Purpose |
| --- | --- |
| `VITE_CF_BEACON_TOKEN` | Cloudflare Web Analytics site token for `www.project8x.com`. Unset = the beacon is not loaded. |
| `VITE_NEWS_SIGNUP_ENDPOINT` | https URL for the News email form. It must accept `POST` JSON `{ "email", "source" }` and return 2xx. Unset = the form stays disabled. |

### 4. Custom Headers (Optional)
For additional security, you can add custom headers in the Amplify Console:
- App settings → Custom headers

### 5. Domain Configuration
1. Go to Domain management in Amplify Console
2. Add your custom domain
3. Configure SSL certificate (automatically managed by AWS)

## SPA Configuration

Amplify Hosting does not read `public/_redirects`. That file is a Netlify convention and is not in this repo. `amplify.yml` only installs, builds, and publishes `project8x-website/build`. `customHttp.yml` can set response headers; it cannot 301. There is no in-repo file Amplify Hosting will apply as rewrites and redirects.

What this repo does instead:

- The production build writes a copy of `index.html` to `admin/index.html` (see `spaFallback.js`). Amplify’s clean-URL behavior 301s `/admin` to `/admin/` when `admin.html` is absent, then looks for `admin/index.html`. Without that file, `/admin/` is a 404 and the client router never runs.
- Do not add `admin.html` back. When that file exists, Amplify answers `/admin` with it and status 200.
- React Router sends `/admin`, `/admin/`, `/admin/*`, and `/admin.html` to `/` when a host serves the SPA shell for those paths. That navigation is client-side. It is not an HTTP 301.

The HTTP 301s are Amplify console rules. Ordered source, target, and type are in `amplifyConsoleRedirects.js`. Paste them under Hosting → Rewrites and redirects, above the SPA catch-all. Saving that editor replaces the whole list, so merge them with rules already saved there. If a 200 rewrite to `/index.html` is already present, keep that rule last and do not add a second catch-all.

The SPA catch-all must be the last rule. The regex in `amplifyConsoleRedirects.js` excludes `.html`, so it will not redirect `/admin.html`. That URL needs its own 301, listed first.

## Build Process
The build process will:
1. Install dependencies (`npm install`, as `amplify.yml` specifies)
2. Build the React application (`npm run build`)
3. Deploy the `build` folder contents
4. Leave rewrites and redirects unchanged until someone edits them in the Amplify console

## Troubleshooting
- `/admin` 301s to `/admin/` and `/admin/` returns 404 when `admin/index.html` is missing from the publish output, or returns 200 with a client redirect until the console 301s are saved
- After the console rules are saved, `curl -sI https://www.project8x.com/admin` and `curl -sI https://www.project8x.com/admin/` should both be `301` with `Location` pointing at `/`. A `200` on `/admin/` means the 301 is not matching and Amplify is serving `admin/index.html` instead
- Check build logs in Amplify Console for any build errors
- Verify that all dependencies are listed in `package.json`
