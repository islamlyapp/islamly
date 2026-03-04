/**
 * @fileOverview Universal OTP Service for the Islamly Infrastructure.
 * Handles generation, automated "sending" logs, and verification of scholarly access tokens.
 */

import { doc, setDoc, getDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/firebase/config";

// Initialize internal firestore instance for the service if not present
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

/**
 * Generates a 6-digit OTP and stores it in an ephemeral collection.
 * In this prototype environment, it auto-logs the code to the console for the user to find.
 */
export async function sendOtpToEmail(email: string): Promise<boolean> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const otpRef = doc(db, "ephemeral_otps", email.toLowerCase());
    
    // Store in ephemeral verification node
    await setDoc(otpRef, {
      otp,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minute expiry
    });

    // HIGH VISIBILITY LOGGING FOR PROTOTYPE
    console.log("%c[Universal Node] SCHOLARLY OTP DISPATCHED", "color: #ad1f37; font-weight: bold; font-size: 14px;");
    console.log(`%cRECIPIENT: ${email}`, "color: #ffffff;");
    console.log(`%cCODE: ${otp}`, "color: #00ff00; font-weight: bold; font-size: 18px;");
    console.log("%c------------------------------------------------", "color: #ad1f37;");
    
    // Simulate network latency for authentic feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
      // Clean up after successful verification
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
