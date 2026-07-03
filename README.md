ev# Islamly - Universal Scholarly Infrastructure v1.0
**Built for the Ummah**

Islamly is a high-density, production-grade portal for authentic Islamic knowledge, strictly aligned with Salafi/Athari methodology. Built with Next.js 15, Firebase, and Genkit AI.

---

## 🛡️ Methodology & Governance

Islamly is a governed environment. Every data signal is synchronized with our scholarly governance layer that ensures:
- **Strict Monotheism (Tawhid)**: Zero tolerance for Shirk (major or minor).
- **Adherence to Sunnah**: Elimination of Bid'ah (innovations like Mawlid or innovated nights).
- **Sanad Integrity**: Every Hadith and text is cross-referenced for verification.
- **Amanah**: Your data is a trust. We maintain strict privacy infrastructure and never sell user telemetry.

---

## 🚀 Core Infrastructure

### 1. Al-Mualim AI Teacher
A high-fidelity recitation analysis engine. Students recite Quran, Hadith, or Mutoon and receive real-time feedback on Tajweed and verbatim accuracy, powered by Gemini 2.5 Flash.

### 2. Universal Video Hub
A normalized signal cluster aggregating high-density lectures from verified scholarly channels including **AMAU**, **Rahmaniyyah**, **One Message Foundation**, and **Abu Taymiyyah**.

### 3. Noble Quran Index
Access to the final revelation preserved across verified textual signals.
- **10 Canonical Qira'at**: Full support for Hafs, Warsh, Qalun, and more.
- **Reciter Index**: A searchable cluster of scholarly audio signals.
- **Uthmani Text**: High-precision orthography verified for digital study.

### 4. Geo-Spatial Locators
Real-time discovery of physical scholarly locations using OpenStreetMap (OSM) data:
- **Masjid Finder**: Locates places of worship worldwide via Live GPS.
- **Halal Locator**: Identifies verified "Tayyib" (pure) provisions near your coordinates.

---

## ⚡ Production Deployment Workflow

Follow this terminal workflow to anchor your system to GitHub and Vercel.

### Step 1: Initialize & Push to GitHub
```bash
git init
git add .
git commit -m "feat: Initialize Universal Scholarly Infrastructure"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Seed Scholarly Metadata (Firestore)
Upload the metadata for the video index and reciter directory:
```bash
npm run db:seed
npm run db:seed:reciters
```

### Step 3: Configure Production Keys
In your Vercel/Firebase Dashboard, add these keys as Environment Variables:
- `GOOGLE_GENAI_API_KEY`: (Your Gemini key from AI Studio)
- `RESEND_API_KEY`: (For OTP Identity Delivery)
- `NEXT_PUBLIC_HADITH_API_KEY`: (Access to HadithAPI.com)

---

© 2026 Islamly. All Rights Reserved. Protected by Universal Scholarly License.
**Stick to the path of guidance and do not be affected by the small number of those who follow it.**
