
'use server';
/**
 * @fileOverview Universal OTP Service for the Islamly Infrastructure.
 * Handles generation, dispatch (Resend/Console), and verification of scholarly access tokens.
 * 
 * PRODUCTION READY: 
 * This service now supports real email delivery via Resend.
 * Ensure RESEND_API_KEY is set in your Vercel/Local environment variables.
 */

import { doc, setDoc, getDoc, serverTimestamp, deleteDoc, getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/firebase/config";
import { Resend } from 'resend';

// Initialize internal firestore instance for the service
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Generates a 6-digit OTP and stores it in an ephemeral collection.
 * Dispatches via Resend if configured, otherwise falls back to console logs.
 */
export async function sendOtpToEmail(email: string): Promise<boolean> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const otpRef = doc(db, "ephemeral_otps", email.toLowerCase());
    
    // 1. Store in ephemeral verification node
    await setDoc(otpRef, {
      otp,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minute expiry
    });

    // 2. Dispatch Logic (Real vs Prototype)
    if (resend) {
      await resend.emails.send({
        from: 'Islamly Infrastructure <verification@islamly.uk>',
        to: email,
        subject: `[${otp}] Your Islamly Access Code`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0304; color: #ffffff; border-radius: 20px; border: 1px solid #222;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #ad1f37; font-size: 48px; margin: 0;">إسلاملي</h1>
              <p style="text-transform: uppercase; letter-spacing: 4px; font-size: 10px; color: #888; margin-top: 10px;">Universal Scholarly Infrastructure</p>
            </div>
            
            <div style="background-color: #111; padding: 30px; border-radius: 15px; text-align: center; border: 1px solid #333;">
              <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #ad1f37;">NODE VERIFICATION REQUIRED</h2>
              <p style="font-size: 14px; color: #ccc; line-height: 1.6;">
                A request has been made to initialize or access a scholarly node using this address. Use the code below to verify your identity.
              </p>
              
              <div style="font-size: 42px; font-weight: bold; letter-spacing: 10px; color: #ffffff; margin: 30px 0; background: #000; padding: 20px; border-radius: 10px;">
                ${otp}
              </div>
              
              <p style="font-size: 11px; color: #666; margin-top: 20px;">
                This code expires in 10 minutes. If you did not request this, please ignore this email.
              </p>
            </div>
            
            <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #222;">
              <p style="font-size: 9px; color: #444; text-transform: uppercase; letter-spacing: 2px;">
                © 2025 Islamly • Ahlus-Sunnah wal-Jama'ah • Protected by 1 Billion Privacy Nodes
              </p>
            </div>
          </div>
        `
      });
      console.log(`[OTP Success] Real email dispatched to ${email}`);
    } else {
      /**
       * PROTOTYPE FALLBACK
       */
      console.log("%c[Universal Node] SCHOLARLY OTP DISPATCHED (Simulation)", "color: #ad1f37; font-weight: bold; font-size: 14px;");
      console.log(`%cRECIPIENT: ${email}`, "color: #ffffff;");
      console.log(`%cCODE: ${otp}`, "color: #00ff00; font-weight: bold; font-size: 18px;");
      console.log("%c------------------------------------------------", "color: #ad1f37;");
      console.log("%cPROTIP: To send real emails, add RESEND_API_KEY to your environment variables.", "color: #888888; font-style: italic;");
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
      console.log(`[OTP Success] Node verified for ${email}`);
    } else {
      console.warn(`[OTP Failure] Incorrect token provided for ${email}`);
    }

    return isValid;
  } catch (error) {
    console.error("[OTP Error] Verification sequence failed:", error);
    return false;
  }
}
