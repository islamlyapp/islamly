# Islamly Domain & Vercel Infrastructure Configuration

This document outlines the technical steps required to verify the `islamly.uk` domain and deploy the platform to **Vercel** for global scholarly access.

## 1. Domain Verification (Resend) - STATUS: KEY INTEGRATED

The API Key `re_8Fw...` is now integrated. To complete the handshake and send authorized emails from `verification@islamly.uk`, you must:

### Required DNS Records (Add these in your Domain Provider Dashboard)
Log in to your domain provider (e.g., Namecheap, Cloudflare) and add the records provided in your [Resend Dashboard](https://resend.com/domains):

- **DKIM (TXT)**: Verifies that the email was actually sent by Islamly.
- **SPF (TXT)**: Authorizes Resend to send emails on your behalf.
- **DMARC (TXT)**: Provides instructions to receiving servers.

## 2. Vercel Terminal Deployment Workflow

If you encounter `bash: vercel: command not found`, install the CLI first:
```bash
npm i -g vercel
```

To anchor the "Universal Node" to Vercel via CLI:

1. **Push to Official Repo**:
   ```bash
   git add .
   git commit -m "chore: prepare for production"
   git push origin main
   ```

2. **Configure Node Keys**:
   Add the following environment variables using the CLI or Vercel Dashboard:
   - `RESEND_API_KEY`: `re_8FwBzPCV_N6qrnm1m2Js7sMRpuTF8Sx5w`
   - `NEXT_PUBLIC_HADITH_API_KEY`: (Add your key from HadithAPI.com)
   - `GOOGLE_GENAI_API_KEY`: (Add your Google AI Studio key)

3. **Production Deployment**:
   ```bash
   vercel --prod
   ```

## 3. Custom Domain on Vercel

1. In the Vercel Dashboard, go to **Settings** > **Domains**.
2. Add `islamly.uk`.
3. Vercel will provide an `A` record or `CNAME` record. Update your domain provider settings to point to Vercel.

---
© 2025 Islamly • Universal Vercel Infrastructure • Authorized Access Only