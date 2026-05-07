"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

const FirebaseAppContext = createContext<any>(undefined);
const AuthContext = createContext<User | null>(null);
const FirestoreContext = createContext<any>(undefined);

export const useFirebaseApp = () => useContext(FirebaseAppContext);
export const useAuth = () => useContext(AuthContext);
export const useFirestore = () => useContext(FirestoreContext);

export default function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <FirebaseAppContext.Provider value={app}>
      <AuthContext.Provider value={user}>
        <FirestoreContext.Provider value={firestore}>
          {children}
        </FirestoreContext.Provider>
      </AuthContext.Provider>
    </FirebaseAppContext.Provider>
  );
}
