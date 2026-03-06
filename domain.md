
# Islamly Domain & Email Infrastructure Configuration

This document outlines the technical steps required to verify the `islamly.uk` domain and enable professional scholarly email dispatch for the global Ummah.

## 1. Domain Verification (Resend) - STATUS: KEY INTEGRATED

To send authorized emails from `verification@islamly.uk`, you must verify ownership in the [Resend Dashboard](https://resend.com/domains). 

### Required DNS Records
The API Key `re_8Fw...` is now active in the Islamly environment. You must now add these records to your domain provider's dashboard (e.g., Namecheap, Cloudflare, or GoDaddy) to complete the handshake:

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

The scholarly infrastructure is now using the following keys:

| Variable Key | Status | Purpose |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | **ACTIVE** | Enables real email OTP dispatch via `verification@islamly.uk`. |
| `GOOGLE_GENAI_API_KEY` | Pending | Powers the Al-Mualim AI Teacher. |
| `NEXT_PUBLIC_HADITH_API_KEY` | Pending | Enables the Hadith Explorer search. |

## 4. Production Checklist

- [x] Resend API Key integrated into `.env`.
- [ ] Domain status in Resend shows **"Verified"**.
- [ ] Vercel deployment has finished building with the new environment variables.
- [ ] Test a real registration to confirm the OTP arrives in the inbox from `@islamly.uk`.

---
© 2025 Islamly • Universal Domain Infrastructure • Authorized Access Only
