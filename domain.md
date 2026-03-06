# Islamly Domain & Email Infrastructure Configuration

This document outlines the technical steps required to verify the `islamly.uk` domain and enable professional scholarly email dispatch for the global Ummah.

## 1. Domain Verification (Resend)

To send authorized emails from `verification@islamly.uk`, you must verify ownership in the [Resend Dashboard](https://resend.com/domains). This protects the "Amanah" of our communication nodes.

### Required DNS Records
After adding `islamly.uk` to Resend, you will be provided with 3-5 DNS records. You must add these to your domain provider's dashboard (e.g., Namecheap, Cloudflare, or GoDaddy):

- **DKIM (TXT)**: Verifies that the email was actually sent by Islamly.
- **SPF (TXT)**: Authorizes Resend to send emails on your behalf.
- **DMARC (TXT)**: Provides instructions to receiving servers on how to handle unauthorized mail.

## 2. Vercel Hosting Configuration

To anchor the "Universal Node" to your primary domain:

1. Navigate to your project in the **Vercel Dashboard**.
2. Go to **Settings** > **Domains**.
3. Add `islamly.uk`.
4. Follow the prompts to update your `A` record or `CNAME` record at your registrar.

## 3. Environment Variables (Secret Node Keys)

The scholarly infrastructure requires secret keys to communicate with external APIs. Add these to **Vercel Settings > Environment Variables**:

| Variable Key | Source | Purpose |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | [Resend.com](https://resend.com/api-keys) | Enables real email OTP dispatch. |
| `GOOGLE_GENAI_API_KEY` | [Google AI Studio](https://aistudio.google.com/) | Powers the Al-Mualim AI Teacher. |
| `NEXT_PUBLIC_HADITH_API_KEY` | [HadithAPI.com](https://hadithapi.com/) | Enables the Hadith Explorer search. |

## 4. Production Checklist

- [ ] Domain status in Resend shows **"Verified"**.
- [ ] Vercel deployment has finished building with the new environment variables.
- [ ] Test a real registration to confirm the OTP arrives in the inbox of an `@islamly.uk` address.

---
© 2025 Islamly • Universal Domain Infrastructure • Authorized Access Only