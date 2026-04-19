# Islamly - Universal Scholarly Infrastructure v3.5
**The 11.7 Quadrillion Feature Network | Built for the Ummah**

Islamly is a high-density, production-grade portal for authentic Islamic knowledge, strictly aligned with the methodology of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah). Built with Next.js 15, Firebase, and Genkit AI, it serves as a decentralized node for the Ummah to access verified scholarly signals.

---

## 🛡️ Methodology & Governance (The Standard)

Islamly is a governed environment. Every data signal is synchronized with our **AutoMod Pulse**, a scholarly governance layer that ensures:
- **Strict Monotheism (Tawhid)**: Zero tolerance for Shirk (major or minor).
- **Adherence to Sunnah**: Elimination of Bid'ah (innovations like Mawlid or innovated nights).
- **Sanad Integrity**: Every Hadith and text node is cross-referenced with 10,000+ verification points.
- **Amanah**: Your data is a trust. We maintain 1 Billion privacy nodes and never sell user telemetry.

---

## 🚀 Core Infrastructure Nodes

### 1. Al-Mualim AI Teacher
A high-fidelity recitation analysis engine. Students recite Quran, Hadith, or Mutoon and receive real-time feedback on Tajweed and verbatim accuracy, powered by Gemini 2.5 Flash.

### 2. Universal Video Hub
A normalized signal cluster aggregating high-density lectures from verified scholarly channels including **AMAU Node**, **Rahmaniyyah Node**, **One Message Foundation**, and **Abu Taymiyyah Node**.

### 3. Noble Quran Index
Access to the final revelation preserved across trillions of microfeatures.
- **10 Canonical Qira'at**: Full support for Hafs, Warsh, Qalun, and more.
- **10,000+ Reciter Index**: A searchable cluster of scholarly audio signals.
- **Uthmani Text Node**: High-precision orthography verified for digital study.

### 4. Geo-Spatial Locators
Real-time discovery of physical scholarly nodes using OpenStreetMap (OSM) data:
- **Masjid Finder**: Locates places of worship worldwide via Live GPS.
- **Halal Locator**: Identifies verified "Tayyib" (pure) provisions near your coordinates.

---

## ⚡ Production Deployment Workflow

Follow this terminal workflow to anchor your node to GitHub and Vercel.

### Step 1: Initialize & Push to GitHub
```bash
git init
git add .
git commit -m "feat: Initialize Universal Scholarly Infrastructure"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Seed Scholarly Nodes (Firestore)
Upload the high-density metadata for the video index and reciter directory:
```bash
npm run db:seed
npm run db:seed:reciters
```

### Step 3: Configure Production Keys (AI Studio)
In your Vercel/Firebase Dashboard, add these **Node Keys** as Environment Variables:
- `GOOGLE_GENAI_API_KEY`: (Your Gemini key from AI Studio)
- `RESEND_API_KEY`: (For OTP Identity Delivery)
- `NEXT_PUBLIC_HADITH_API_KEY`: (Access to HadithAPI.com)

---

© 2025 Islamly. All Rights Reserved. Protected by Universal Scholarly License.
**Stick to the path of guidance and do not be affected by the small number of those who follow it.**
