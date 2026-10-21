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
The application is already configured as a Single Page Application:
- `_redirects` sends `/admin`, `/admin/`, `/admin/*`, and `/admin.html` to `/` (301), then rewrites other routes to `index.html`
- React Router also sends `/admin` and `/admin/*` to `/` when a host serves the SPA shell for those paths
- React Router handles client-side routing
- All routes (`/`, `/Products`, `/CompanyServices`, `/ContactUs`, `/ExecutiveLeadership`) will work correctly

## Build Process
The build process will:
1. Install dependencies (`npm ci`)
2. Build the React application (`npm run build`)
3. Deploy the `build` folder contents
4. Configure SPA routing with the `_redirects` file

## Troubleshooting
- If routes return 404, ensure the `_redirects` file is in the `public` folder
- Check build logs in Amplify Console for any build errors
- Verify that all dependencies are listed in `package.json`
