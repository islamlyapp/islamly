
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

/** 
 * Initiate anonymous sign-in (non-blocking). 
 */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance).catch((error) => {
    console.error("Anonymous Sign-In Error:", error);
    toast({ variant: "destructive", title: "Access Error", description: "Failed to initialize guest session." });
  });
}

/** 
 * Initiate email/password sign-up (non-blocking). 
 */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password).catch((error) => {
    console.error("Sign-Up Error:", error);
    toast({ variant: "destructive", title: "Registration Error", description: error.message });
  });
}

/** 
 * Initiate email/password sign-in (non-blocking). 
 */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password).catch((error) => {
    console.error("Sign-In Error:", error);
    toast({ variant: "destructive", title: "Access Denied", description: "Invalid credentials for this scholarly node." });
  });
}

/** 
 * Initiate Google sign-in (non-blocking). 
 */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider).catch((error) => {
    if (error.code !== 'auth/popup-closed-by-user') {
      console.error("Google Sign-In Error:", error);
      toast({ variant: "destructive", title: "Auth Error", description: "Failed to sync with Google node." });
    }
  });
}

/** 
 * Initiate Discord sign-in (non-blocking). 
 */
export function initiateDiscordSignIn(authInstance: Auth): void {
  const provider = new OAuthProvider('discord.com');
  signInWithPopup(authInstance, provider).catch((error) => {
    if (error.code !== 'auth/popup-closed-by-user') {
      console.error("Discord Sign-In Error:", error);
      toast({ variant: "destructive", title: "Auth Error", description: "Failed to sync with Discord node." });
    }
  });
}

/** 
 * Initiate Microsoft sign-in (non-blocking). 
 */
export function initiateMicrosoftSignIn(authInstance: Auth): void {
  const provider = new OAuthProvider('microsoft.com');
  signInWithPopup(authInstance, provider).catch((error) => {
    if (error.code !== 'auth/popup-closed-by-user') {
      console.error("Microsoft Sign-In Error:", error);
      toast({ variant: "destructive", title: "Auth Error", description: "Failed to sync with Microsoft node." });
    }
  });
}

/** 
 * Initiate Phone sign-in (non-blocking). 
 * Note: Requires a container element with id "phone-sign-in-container" for Recaptcha.
 */
export async function initiatePhoneSignIn(authInstance: Auth, phoneNumber: string): Promise<ConfirmationResult | null> {
  try {
    const recaptchaVerifier = new RecaptchaVerifier(authInstance, 'phone-sign-in-container', {
      size: 'invisible'
    });
    const result = await signInWithPhoneNumber(authInstance, phoneNumber, recaptchaVerifier);
    return result;
  } catch (error: any) {
    console.error("Phone Sign-In Error:", error);
    toast({ variant: "destructive", title: "Phone Error", description: error.message });
    return null;
  }
}
