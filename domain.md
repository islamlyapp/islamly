# Islamly Domain & Vercel Infrastructure Configuration

This document outlines the technical steps required to verify the `islamly.uk` domain and deploy the platform to **Vercel** for global scholarly access.

## 1. Domain Verification (Resend) - STATUS: KEY INTEGRATED

The API Key `re_8Fw...` is now integrated into the Islamly environment. To complete the handshake and send authorized emails from `verification@islamly.uk`, you must:

### Required DNS Records (Add these in your Domain Provider Dashboard)
Log in to your domain provider (e.g., Namecheap, Cloudflare) and add the records provided in your [Resend Dashboard](https://resend.com/domains):

- **DKIM (TXT)**: Verifies that the email was actually sent by Islamly.
- **SPF (TXT)**: Authorizes Resend to send emails on your behalf.
- **DMARC (TXT)**: Provides instructions to receiving servers on how to handle unauthorized mail.

## 2. Vercel Deployment Workflow

To anchor the "Universal Node" to Vercel:

1. **Push to GitHub**: Initialize a Git repo and push this codebase to a private/public GitHub repository.
2. **Import to Vercel**: Go to [Vercel.com](https://vercel.com), click "Add New" > "Project", and select your GitHub repo.
3. **Configure Environment Variables**:
   In the Vercel Project Settings, add the following keys:
   - `RESEND_API_KEY`: `re_8FwBzPCV_N6qrnm1m2Js7sMRpuTF8Sx5w`
   - `NEXT_PUBLIC_HADITH_API_KEY`: (Add your key from HadithAPI.com)
   - `GOOGLE_GENAI_API_KEY`: (Add your Google AI Studio key)
4. **Deploy**: Vercel will automatically detect Next.js and build the infrastructure.

## 3. Custom Domain on Vercel

1. In the Vercel Dashboard, go to **Settings** > **Domains**.
2. Add `islamly.uk`.
3. Vercel will provide an `A` record or `CNAME` record. Update your domain provider settings to point to Vercel.

---
© 2025 Islamly • Universal Vercel Infrastructure • Authorized Access Only