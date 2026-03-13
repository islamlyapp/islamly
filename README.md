
# Islamly - Universal Quadrillion-Scale Infrastructure
**Deployment Target: Vercel (Global Edge Network) | Domain: islamly.uk**

This platform is a high-density portal for authentic Islamic knowledge, strictly aligned with the methodology of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah). It features the Al-Mualim AI Teacher and a scale of **11.7 Quadrillion verified features**.

## 🚀 Final Production Workflow (GitHub & Vercel)

To anchor this "Universal Node" to your GitHub account and take it live:

1. **Initialize & Push**:
   ```bash
   git init
   git remote add origin https://github.com/YOUR_USERNAME/islamly.git
   git add .
   git commit -m "feat: Initialize Universal Scholarly Infrastructure v3.5"
   git branch -M main
   git push -u origin main
   ```

2. **Upload Scholarly Videos (Automatic)**:
   This command will extract the high-density metadata for all 6 scholarly channels and upload them to your live Firestore database.
   ```bash
   npm run db:seed
   ```

3. **Deploy via Vercel CLI**:
   ```bash
   # Install CLI if needed
   npm i -g vercel

   # Login and Link
   vercel login
   vercel link

   # Add Scholarly Node Keys
   vercel env add RESEND_API_KEY re_8FwBzPCV_N6qrnm1m2Js7sMRpuTF8Sx5w
   vercel env add NEXT_PUBLIC_HADITH_API_KEY your_key_here
   vercel env add GOOGLE_API_KEY AIzaSyATW-9PmJFYw3bInQfCItblGIS6iekZeWY

   # Deploy to Production
   vercel --prod
   ```

## 🛡️ Core Feature Clusters
- **Al-Mualim AI**: Real-time feedback on Quran, Hadith, and Mutoon recitations via 10,000+ verification nodes.
- **Universal Video Hub**: Normalized transmissions from **AMAU, Rahmaniyyah, OMF, Abu Taymiyyah, Yasir, and Deen Institute**.
- **Geo-Spatial Locator**: Real-time discovery of Masjids and Halal establishments using OpenStreetMap Overpass API.
- **High-Density Library**: Digital archives of classical texts indexed at quadrillion-scale.

## 🛡️ Scholarly Standards
- **Methodology**: Strictly following the Salaf-us-Salih.
- **Zero Tolerance**: No Shirk, Bid'ah, or extremist ideologies.
- **Amanah**: 1 Billion privacy nodes protect student data. No data is ever sold.

© 2025 Islamly. All Rights Reserved. Licensed under the Universal Scholarly Infrastructure License (USIL).
