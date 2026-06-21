
'use server';
/**
 * @fileOverview Universal OTP Service for the Islamly Infrastructure.
 * Handles generation, dispatch (Resend/Console), and verification of scholarly access tokens.
 * 
 * PRODUCTION READY: 
 * This service uses real email delivery via Resend.
 * The RESEND_API_KEY is now active.
 */

import { doc, setDoc, getDoc, serverTimestamp, deleteDoc, getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/firebase/config";
import { Resend } from 'resend';

// Initialize internal firestore instance for the service
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Initialize Resend with the integrated API Key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Generates a 6-digit OTP and stores it in an ephemeral collection.
 * Dispatches via Resend if configured, otherwise falls back to console logs.
 */
export async function sendOtpToEmail(email: string): Promise<boolean> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const otpRef = doc(db, "ephemeral_otps", email.toLowerCase());
    
    // 1. Store in ephemeral verification feature
    await setDoc(otpRef, {
      otp,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minute expiry
    });

    // 2. Dispatch Logic (Real vs Prototype)
    if (resend) {
      await resend.emails.send({
        from: 'Islamly <verification@islamly.uk>',
        to: email,
        subject: `Your Islamly access code: ${otp}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #e2e8f0; border-radius: 22px; border: 1px solid #1f2937;">
            <div style="text-align: center; margin-bottom: 28px;">
              <h1 style="color: #ad1f37; font-size: 44px; margin: 0;">إسلاملي</h1>
              <p style="margin-top: 10px; font-size: 12px; color: #94a3b8;">Your secure access code for Islamly</p>
            </div>
            
            <div style="background-color: #111827; padding: 28px; border-radius: 18px; text-align: center; border: 1px solid #334155;">
              <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 18px; color: #ad1f37;">Verify your sign in</h2>
              <p style="font-size: 14px; color: #cbd5e1; line-height: 1.7;">
                We received a request to sign in with this address. Enter the code below to continue.
              </p>
              
              <div style="font-size: 44px; font-weight: 700; letter-spacing: 8px; color: #ffffff; margin: 30px 0; background: #0f172a; padding: 22px; border-radius: 14px;">
                ${otp}
              </div>
              
              <p style="font-size: 12px; color: #94a3b8; margin-top: 18px;">
                This code is valid for 10 minutes. If you did not request it, no further action is needed.
              </p>
            </div>
            
            <div style="margin-top: 30px; text-align: center; padding-top: 18px; border-top: 1px solid #1f2937;">
              <p style="font-size: 11px; color: #64748b;">
                © 2025 Islamly • Trusted by Ahlus-Sunnah wal-Jama'ah
              </p>
            </div>
          </div>
        `
      });
      console.log(`[OTP Success] Email sent to ${email}`);
    } else {
      /**
       * PROTOTYPE FALLBACK (If key is removed)
       */
      console.log("%c[Universal Feature] SCHOLARLY OTP DISPATCHED (Simulation)", "color: #ad1f37; font-weight: bold; font-size: 14px;");
      console.log(`%cRECIPIENT: ${email}`, "color: #ffffff;");
      console.log(`%cCODE: ${otp}`, "color: #00ff00; font-weight: bold; font-size: 18px;");
      console.log("%c------------------------------------------------", "color: #ad1f37;");
    }
    
    return true;
  } catch (error) {
    console.error("[OTP Error] Failed to dispatch token:", error);
    return false;
  }
}

/**
 * Verifies the provided OTP against the ephemeral storage.
 */
export async function verifyOtp(email: string, userOtp: string): Promise<boolean> {
  try {
    const otpRef = doc(db, "ephemeral_otps", email.toLowerCase());
    const snap = await getDoc(otpRef);

    if (!snap.exists()) {
      console.warn(`[OTP Warning] No verification token found for ${email}`);
      return false;
    }

    const data = snap.data();
    
    // Check for expiration
    const expiresAt = data.expiresAt?.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt);
    if (new Date() > expiresAt) {
      console.warn(`[OTP Warning] Verification token for ${email} has expired.`);
      await deleteDoc(otpRef);
      return false;
    }

    const isValid = data.otp === userOtp;

    if (isValid) {
      // Clean up after successful verification to prevent reuse
      await deleteDoc(otpRef);
      console.log(`[OTP Success] Feature verified for ${email}`);
    } else {
      console.warn(`[OTP Failure] Incorrect token provided for ${email}`);
    }

    return isValid;
  } catch (error) {
    console.error("[OTP Error] Verification sequence failed:", error);
    return false;
  }
}
