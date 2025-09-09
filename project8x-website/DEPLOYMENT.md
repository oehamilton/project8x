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

### 4. Custom Headers (Optional)
For additional security, you can add custom headers in the Amplify Console:
- App settings → Custom headers

### 5. Domain Configuration
1. Go to Domain management in Amplify Console
2. Add your custom domain
3. Configure SSL certificate (automatically managed by AWS)

## SPA Configuration
The application is already configured as a Single Page Application:
- `_redirects` file redirects all routes to `index.html`
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
