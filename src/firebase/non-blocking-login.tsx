'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
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

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider);
}

/** Initiate Apple sign-in (non-blocking). */
export function initiateAppleSignIn(authInstance: Auth): void {
  const provider = new OAuthProvider('apple.com');
  signInWithPopup(authInstance, provider);
}

/** Initiate Microsoft sign-in (non-blocking). */
export function initiateMicrosoftSignIn(authInstance: Auth): void {
  const provider = new OAuthProvider('microsoft.com');
  signInWithPopup(authInstance, provider);
}

/** Initiate GitHub sign-in (non-blocking). */
export function initiateGithubSignIn(authInstance: Auth): void {
  const provider = new GithubAuthProvider();
  signInWithPopup(authInstance, provider);
}

/** Initiate Discord sign-in (non-blocking). */
export function initiateDiscordSignIn(authInstance: Auth): void {
  const provider = new OAuthProvider('discord.com');
  signInWithPopup(authInstance, provider);
}
