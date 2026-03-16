
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password);
}

/** Initiate Google sign-in (non-blocking redirect). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(authInstance, provider);
}

/** Initiate Discord sign-in (non-blocking redirect). */
export function initiateDiscordSignIn(authInstance: Auth): void {
  const provider = new OAuthProvider('discord.com');
  signInWithRedirect(authInstance, provider);
}

/** Initiate Microsoft sign-in (non-blocking redirect). */
export function initiateMicrosoftSignIn(authInstance: Auth): void {
  const provider = new OAuthProvider('microsoft.com');
  signInWithRedirect(authInstance, provider);
}

/** Initiate Phone sign-in (returns a promise for confirmation). */
export async function initiatePhoneSignIn(authInstance: Auth, phoneNumber: string): Promise<ConfirmationResult | null> {
  try {
    const container = document.getElementById('phone-sign-in-container');
    if (!container) {
      console.error("Phone sign-in container not found.");
      return null;
    }
    const recaptchaVerifier = new RecaptchaVerifier(authInstance, 'phone-sign-in-container', {
      size: 'invisible'
    });
    return await signInWithPhoneNumber(authInstance, phoneNumber, recaptchaVerifier);
  } catch (error) {
    console.error("Phone sign-in error:", error);
    return null;
  }
}
