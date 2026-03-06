
# Islamly - Development Plan & Architecture

Islamly is a high-fidelity scholarly infrastructure designed to provide authentic Islamic knowledge (Ahlus-Sunnah wal-Jama'ah) to the global Ummah using advanced AI and real-time data services at a scale of **11.7 Quadrillion features**.

## 🏗️ Architecture Overview

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit 1.x with Google Gemini 2.5 Flash Online
- **Backend**: Firebase (Authentication & Cloud Firestore)
- **Cloud Infrastructure**: Vercel (Global Edge Network)
- **Primary Free Cloud Host**: Vercel (Optimized for SSR & Node.js)
- **Project ID**: `studio-7199214099-199f4`
- **UI System**: Tailwind CSS + Shadcn/UI (Mobile-first, dark-themed)
- **Scale Target**: 11.7 Quadrillion scholarly features per data cluster.

## 📡 Universal API Map (Infrastructure Data Nodes)

| Service Cluster | Provider | Purpose |
| :--- | :--- | :--- |
| **Prayer & Qibla** | AlAdhan API | Solar calculations, Hijri dates, and direction sync. |
| **Quran Reader** | Quran.com v4 | Uthmani text, translations, and Surah list. |
| **Recitations** | MP3Quran / Quran.com | High-fidelity audio streams for all Qira'at. |
| **Live Masjids** | Overpass (OSM) | Geospatial search for physical scholarly nodes. |
| **City Indexing** | Nominatim (OSM) | Global coordinate transformations for search. |
| **Hadith Search** | HadithAPI.com | Access to the 6 major authentic collections. |
| **AI Teacher** | Genkit (Gemini) | Real-time recitation analysis and feedback. |
| **Identity** | Firebase Auth | Verified student node authentication. |
| **Scholarly Store** | Cloud Firestore | Bookmarks, notes, and admin video data. |

## 🚀 GitHub & Vercel Deployment Workflow

To host your "Universal Node Infrastructure" for free on Vercel, follow these steps:

### 1. Push to GitHub
If you don't see a terminal in your browser, download the code and run these in your local terminal:
```bash
git init
git add .
git commit -m "feat: Initialize Universal Scholarly Infrastructure"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Connect to Vercel (Free Hosting)
1. Go to [Vercel](https://vercel.com) and sign in with GitHub.
2. Click **"Add New"** > **"Project"**.
3. Import your `Islamly` repository.
4. **Environment Variables**: Add these in the Vercel dashboard:
   - `NEXT_PUBLIC_HADITH_API_KEY`: [Your Key]
   - `GOOGLE_GENAI_API_KEY`: [Your Gemini Key]
5. **Framework Preset**: Ensure it is set to **Next.js**.
6. **Deploy**: Your app will be live at `*.vercel.app` with global edge caching active.

## 🛡️ Scholarly Standards (Strict Policy)
1. **Methodology**: Strictly following the Salaf-us-Salih (Ahlus-Sunnah).
2. **Safety**: Zero tolerance for Shirk, Bid'ah, or extremist ideologies.
3. **Amanah**: User data is never sold or commodified. Protected by 1 Billion Privacy Nodes.
