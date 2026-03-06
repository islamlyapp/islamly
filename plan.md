
# Islamly - Development Plan & Architecture

Islamly is a high-fidelity scholarly infrastructure designed to provide authentic Islamic knowledge (Ahlus-Sunnah wal-Jama'ah) to the global Ummah using advanced AI and real-time data services at a scale of **11.7 Quadrillion features**.

## 🏗️ Architecture Overview

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit 1.x with Google Gemini 2.5 Flash Online
- **Backend**: Firebase (Authentication & Cloud Firestore)
- **Email Node**: Resend (Professional OTP Delivery)
- **Primary Cloud Host**: Vercel (Optimized for Edge SSR)
- **Scale Target**: 11.7 Quadrillion scholarly features per data cluster.

## 📡 Universal API Map (Infrastructure Data Nodes)

| Service Cluster | Provider | Purpose |
| :--- | :--- | :--- |
| **Prayer & Qibla** | AlAdhan API | Solar calculations, Hijri dates, and direction sync. |
| **Quran Reader** | Quran.com v4 | Uthmani text, translations, and Surah list. |
| **Recitations** | MP3Quran / Quran.com | High-fidelity audio streams for all 10 Qira'at. |
| **Live Masjids** | Overpass (OSM) | Geospatial search for physical scholarly nodes. |
| **City Indexing** | Nominatim (OSM) | Global coordinate transformations for search. |
| **Hadith Search** | HadithAPI.com | Access to the 6 major authentic collections. |
| **AI Teacher** | Genkit (Gemini) | Real-time recitation analysis and feedback. |
| **Identity (OTP)** | Resend | Secure email verification via 6-digit tokens. |
| **Identity (Auth)** | Firebase Auth | Verified student node authentication with OTP. |
| **Scholarly Store** | Cloud Firestore | Bookmarks, notes, and admin video data. |

## 📧 Email Infrastructure & Domain Verification

The platform is configured to send verification emails from `verification@islamly.uk`. To enable this in production:

### 1. Resend Setup
1. Sign up at [Resend.com](https://resend.com).
2. Go to **Domains** > **Add New Domain** (`islamly.uk`).
3. **DNS Configuration**: Resend will provide 3-5 DNS records (MX, TXT). You must add these to your domain provider's dashboard (e.g., Namecheap, Cloudflare, or GoDaddy).
4. Wait for the status to show **"Verified"**.

### 2. Vercel Environment Variables
**DO NOT** share your API keys in chat or commit them to GitHub. Add them directly to Vercel:
1. Go to your project in the [Vercel Dashboard](https://vercel.com).
2. Navigate to **Settings** > **Environment Variables**.
3. Add `RESEND_API_KEY` with your production key from Resend.
4. Add `NEXT_PUBLIC_HADITH_API_KEY` for Hadith search.
5. Add `GOOGLE_GENAI_API_KEY` for the Al-Mualim AI.

## 🚀 GitHub & Vercel Deployment Workflow

To host your "Universal Node Infrastructure" for free on Vercel:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Initialize Universal Scholarly Infrastructure"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Import the repository.
   - Vercel will auto-detect Next.js and deploy.
   - The app will be live at `*.vercel.app` or your custom domain.

## 🛡️ Scholarly Standards (Strict Policy)
1. **Methodology**: Strictly following the Salaf-us-Salih (Ahlus-Sunnah).
2. **Safety**: Zero tolerance for Shirk, Bid'ah, or extremist ideologies.
3. **Amanah**: User data is protected by 1 Billion Privacy Nodes and is never sold.
4. **Copyright**: © 2025 Islamly. All Rights Reserved.
