# Islamly - Universal Quadrillion-Scale Infrastructure
**Deployment Target: Vercel (Global Edge Network)**

This platform is a high-density portal for authentic Islamic knowledge, aligned with the Salafi/Athari methodology, featuring the Al-Mualim AI Teacher and a scale of **11.7 Quadrillion verified features**.

## 🚀 Deployment to Vercel (Terminal Workflow)

To take the "Universal Node" live on `islamly.uk` using the terminal:

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Initialize & Push to GitHub**:
   ```bash
   git init
   git remote add origin https://github.com/islamlyapp/islamly.git
   git add .
   git commit -m "feat: Initialize Production Infrastructure"
   git branch -M main
   git push -u origin main
   ```

3. **Deploy via Vercel CLI**:
   ```bash
   # Login and Link
   vercel login
   vercel link

   # Add Scholarly Secret Node Keys
   vercel env add RESEND_API_KEY re_8FwBzPCV_N6qrnm1m2Js7sMRpuTF8Sx5w

   # Deploy to Production
   vercel --prod
   ```

4. **DNS Handshake**:
   - Go to your Resend Dashboard and add the SPF/DKIM records to your domain provider to authorize `verification@islamly.uk`.

## Core Features
- **Al-Mualim AI**: Real-time feedback on Quran, Hadith, and Mutoon recitations.
- **10 Authentic Qira'at**: Canonical variant readings integrated into the reader.
- **Universal OTP**: Secure scholarly identity verification via Resend.
- **Amanah Guarantee**: 1 Billion privacy nodes protect student data.

## 🛡️ Scholarly Standards
- Strictly following the methodology of the Salaf-us-Salih.
- Zero tolerance for Shirk or Bid'ah.

## ⚖️ Legal & Copyright
© 2025 Islamly. All Rights Reserved. Licensed under the Universal Scholarly Infrastructure License (USIL).