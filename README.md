# smart-solutionbd.com — Under Maintenance & Automated CI/CD Pipeline

Production-ready web platform for **Smart Solution BD** ([smart-solutionbd.com](https://smart-solutionbd.com)).

---

## 📁 Project Architecture

```text
smart-solutionbd.com/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions automated deployment on push
├── .cpanel.yml               # Native cPanel Git Version Control deployment recipe
├── assets/
│   └── images/
│       └── hero-tech.jpg     # High-tech 3D visual render
├── css/ / style.css          # Glassmorphic cyberpunk design system & responsive layout
├── js/ / script.js           # Real-time Dhaka BST clock, countdown, particle engine, modals
├── index.html                # Under Maintenance / Launching Soon portal
├── .gitignore                # Git exclusions
└── README.md                 # Deployment & automation documentation
```

---

## 🚀 Fully Automated Deployment (Push-to-Deploy)

Choose either **Method A** (Recommended: GitHub Actions via FTPS) or **Method B** (Native cPanel Git).

### Method A: GitHub Actions (Recommended — Works on all cPanel hosts)

Every time you execute `git push origin main`, GitHub Actions automatically pushes updated files directly to your cPanel `public_html` directory in seconds.

#### 1. Push this project to GitHub
```bash
git add .
git commit -m "feat: initial under maintenance launch and ci/cd pipeline"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/smart-solutionbd.git
git push -u origin main
```

#### 2. Add Secrets in GitHub
In your GitHub repository:
1. Go to **Settings** > **Secrets and variables** > **Actions**.
2. Click **New repository secret** and add:
   - `CPANEL_FTP_SERVER`: Your server FTP host (e.g. `ftp.smart-solutionbd.com` or your shared VPS IP address)
   - `CPANEL_FTP_USERNAME`: Your cPanel username or dedicated FTP account username (e.g. `deploy@smart-solutionbd.com` or `cpaneluser`)
   - `CPANEL_FTP_PASSWORD`: Your FTP account password

Whenever you make any change and `git push`, the site is updated automatically.

---

### Method B: cPanel Native Git Version Control & Webhook

If your shared VPS cPanel account has the **Git™ Version Control** icon enabled:

1. **In cPanel**: Click **Git™ Version Control** > **Create**.
2. Enter your GitHub Clone URL (`https://github.com/<user>/smart-solutionbd.git`).
3. Set repository path to `/home/<your_username>/repositories/smart-solutionbd`.
4. Click **Create**.
5. Click **Manage** next to the repo, then click **Deploy HEAD Commit**.
6. Copy the **Webhook URL** provided by cPanel.
7. Go to **GitHub Repository** > **Settings** > **Webhooks** > **Add webhook**.
8. Paste the Webhook URL.
9. Every `git push` triggers the webhook and cPanel automatically runs `.cpanel.yml` to copy files to `public_html`.
