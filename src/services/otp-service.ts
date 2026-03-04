/**
 * @fileOverview Universal OTP Service for the Islamly Infrastructure.
 * Handles generation, "sending", and verification of scholarly access tokens.
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
 */
export async function sendOtpToEmail(email: string): Promise<boolean> {
  // In a production environment, this would call a Cloud Function to send a real email via SendGrid/Twilio.
  // For this high-density prototype, we generate the OTP and store it for verification.
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const otpRef = doc(db, "ephemeral_otps", email.toLowerCase());
    await setDoc(otpRef, {
      otp,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minute expiry
    });

    // LOGGING FOR PROTOTYPE VISIBILITY
    console.log(`[Universal Node] OTP for ${email}: ${otp}`);
    
    // Simulate email latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error("OTP Generation Error:", error);
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

    if (!snap.exists()) return false;

    const data = snap.data();
    const isValid = data.otp === userOtp;

    if (isValid) {
      // Clean up after successful verification
      await deleteDoc(otpRef);
    }

    return isValid;
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return false;
  }
}
