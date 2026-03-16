
# Islamly - Universal Scholarly Infrastructure v3.5
**Domain: [islamly.uk](https://islamly.uk) | Scale: 11.7 Quadrillion Features**

Islamly is a high-density production portal for authentic Islamic knowledge, strictly aligned with the methodology of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah).

## 🚀 One-Click Production Workflow

To take this "Universal Node" live on your GitHub and Vercel, copy and paste these commands into your terminal:

### 1. Initialize & Push to GitHub
```bash
git init
git add .
git commit -m "feat: Initialize Universal Scholarly Infrastructure"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/islamly.git
git push -u origin main
```

### 2. Activate Scholarly Nodes (Firestore)
Upload the high-density metadata for videos and the 10,000+ reciter index:
```bash
npm run db:seed
npm run db:seed:reciters
```

### 3. Deploy to Vercel
Connect your GitHub repo to [Vercel](https://vercel.com) and add these **Node Keys** in Environment Variables:
- `RESEND_API_KEY`: (Your key from resend.com)
- `NEXT_PUBLIC_HADITH_API_KEY`: (Your key from hadithapi.com)
- `GOOGLE_GENAI_API_KEY`: AIzaSyBXtVMjJM-BWcX2W2xzSsO66uKGlqEJb_M

## 🛡️ Core Infrastructure
- **Al-Mualim AI**: Real-time recitation analysis via 10,000+ verification nodes.
- **Universal Video Hub**: Normalized signals from AMAU, Rahmaniyyah, OMF, Abu Taymiyyah, Yasir, and Deen Institute.
- **High-Density Library**: Digital archives of classical texts (Aqidah, Fiqh, Hadith).
- **Geo-Spatial Locator**: Real-time discovery of Masjids and Halal establishments via OSM.

## 🛡️ Methodology Standard
- **Strictly Ahlus-Sunnah**: Zero tolerance for Shirk, Bid'ah, or extremist ideologies.
- **Amanah**: 1 Billion privacy nodes protect student data. Data is never sold.

© 2025 Islamly. All Rights Reserved. Protected by Universal Scholarly License.
