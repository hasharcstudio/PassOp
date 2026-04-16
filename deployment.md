# Deploy PassOp to Vercel (Step-by-Step)

This guide is written specifically for this project (React + Vite).

## 0) Fastest Path (Use This First)

If your goal is to deploy right now with minimum steps, do this:

1. Ensure these files exist in root:
  - package.json
  - vercel.json (SPA rewrite for React Router)
2. Verify build:

```bash
npm run build
```

3. Login to Vercel:

```bash
npx vercel login
```

4. Deploy to production:

```bash
npx vercel --prod
```

5. Open the returned URL and test:
  - /
  - /about
  - /contact

If route refresh works on /about and /contact, deployment is successful.

## 1) Prerequisites

Before deploying, make sure you have:

- A GitHub account
- A Vercel account (you can sign in with GitHub)
- Node.js installed locally (recommended: latest LTS)
- The project pushed to a GitHub repository

Optional (for CLI deployment):

- Vercel CLI installed globally

## 2) Verify Project Configuration (Already Good)

This project already has the correct scripts in package.json:

- dev: vite
- build: vite build
- preview: vite preview

Vercel can auto-detect this Vite setup.

## 3) Important for React Router (SPA Fallback)

Your app uses BrowserRouter with routes like:

- /
- /about
- /contact

Without a rewrite rule, opening these URLs directly may show a 404 on Vercel.

Create a file named vercel.json in the project root with this content:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes are served by index.html, and React Router handles route rendering on the client side.

## 4) Method A (Recommended): Deploy from Vercel Dashboard

### Step 1: Push your latest code to GitHub

If not already pushed:

```bash
git add .
git commit -m "Prepare Vercel deployment"
git push origin main
```

### Step 2: Import project in Vercel

1. Go to Vercel dashboard.
2. Click Add New -> Project.
3. Select your GitHub repository: PassOp.
4. Click Import.

### Step 3: Configure build settings

Usually Vercel detects Vite automatically. Confirm these values:

- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist
- Install Command: npm install

Root Directory should be project root (where package.json is located).

### Step 4: Environment variables (if needed)

This current project appears to be frontend-only and does not require secrets by default.
If you later add environment variables:

1. In Vercel project settings, open Environment Variables.
2. Add keys like VITE_API_URL.
3. Redeploy after adding/updating variables.

Reminder: Vite client-exposed variables must start with VITE_.

### Step 5: Deploy

Click Deploy.
When build finishes, Vercel gives a live URL, for example:

- https://your-project-name.vercel.app

## 5) Method B: Deploy with Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from project root

Run inside this folder (where package.json exists):

```bash
vercel
```

Answer prompts:

- Set up and deploy: Yes
- Scope: your account/team
- Link to existing project: No (first time) / Yes (if already created)
- Project name: passop (or any)
- Directory: ./

For production deployment:

```bash
vercel --prod
```

## 6) Verify Deployment

After deployment, verify these pages:

- Home: /
- About: /about
- Contact: /contact

Also verify:

- Refresh on /about and /contact does not return 404
- App loads styles and icons correctly
- Local storage based features (password save/edit/delete) work normally

## 7) Troubleshooting

### Problem: Build fails on Vercel

Try locally first:

```bash
npm ci
npm run build
```

If local build fails, fix code/lint/build issues before redeploying.

### Problem: Route URLs return 404

Cause: Missing SPA rewrite.
Fix: Ensure vercel.json exists with rewrite to /index.html and redeploy.

### Problem: Environment variable not found

- Confirm variable starts with VITE_ for frontend usage
- Confirm variable is added in Vercel project settings
- Redeploy after changes

### Problem: Wrong folder deployed

Ensure project root in Vercel points to the folder containing package.json.

## 8) Continuous Deployment Workflow

After first setup, your workflow becomes:

1. Make code changes locally.
2. Commit and push to main (or your production branch).
3. Vercel auto-builds and updates deployment.

Useful git flow:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

## 9) Optional: Custom Domain

1. Open Vercel project -> Settings -> Domains.
2. Add your domain.
3. Configure DNS records as instructed by Vercel.
4. Wait for SSL certificate provisioning.

## 10) Deployment Checklist

Use this quick checklist each time:

- Code pushed to GitHub
- vercel.json rewrite exists (for React Router)
- npm run build works locally
- Vercel build settings are correct
- Environment variables set (if needed)
- Production deployment verified on all routes

---

If you want, the next step can be creating vercel.json in this repository now so deployment works immediately with your React routes.
