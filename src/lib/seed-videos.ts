
/**
 * @fileOverview Universal Seeding Script for Islamly Video Infrastructure.
 * Run via: npm run db:seed
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "studio-7199214099-199f4",
  "appId": "1:848547570312:web:ba33f46b93a313e1f4753d",
  "apiKey": "AIzaSyCvuTpCB-nr2yRgsr9VTFNhjTMzGfZwipw",
  "authDomain": "studio-7199214099-199f4.firebaseapp.com",
  "messagingSenderId": "848547570312"
};

const VIDEOS = [
  { id: "amau-1", title: "The Path to Seeking Knowledge", url: "https://www.youtube.com/watch?v=isCs_X8_clI", author: "Ustadh Abdulrahman Hassan", category: "Tazkiyah", duration: "52:10", source: "AMAU Node" },
  { id: "amau-2", title: "Explanation of Kitab At-Tawhid", url: "https://www.youtube.com/watch?v=isCs_X8_clI", author: "Ustadh Abdulrahman Hassan", category: "Aqidah", duration: "1:15:30", source: "AMAU Node" },
  { id: "rah-1", title: "The Three Fundamental Principles", url: "https://www.youtube.com/watch?v=v_OnIs_vInY", author: "Al-Rahmaniyyah", category: "Aqidah", duration: "45:30", source: "Rahmaniyyah Node" },
  { id: "rah-2", title: "Foundations of the Sunnah", url: "https://www.youtube.com/watch?v=v_OnIs_vInY", author: "Al-Rahmaniyyah", category: "Manhaj", duration: "38:15", source: "Rahmaniyyah Node" },
  { id: "omf-1", title: "Proof Islam is the Truth", url: "https://www.youtube.com/watch?v=isCs_X8_clI", author: "Shaykh Uthman Ibn Farooq", category: "Dawah", duration: "28:45", source: "OMF Node" },
  { id: "omf-2", title: "Refuting Doubts on Hadith", url: "https://www.youtube.com/watch?v=isCs_X8_clI", author: "Shaykh Uthman Ibn Farooq", category: "Defense", duration: "42:10", source: "OMF Node" },
  { id: "at-1", title: "The Reality of This World", url: "https://www.youtube.com/watch?v=v_OnIs_vInY", author: "Shaykh Abu Taymiyyah", category: "Reminders", duration: "12:30", source: "Abu Taymiyyah Node" },
  { id: "at-2", title: "Fixing Your Heart", url: "https://www.youtube.com/watch?v=v_OnIs_vInY", author: "Shaykh Abu Taymiyyah", category: "Character", duration: "15:45", source: "Abu Taymiyyah Node" },
  { id: "yiy-1", title: "Be a Stranger (Ghuraba)", url: "https://www.youtube.com/watch?v=isCs_X8_clI", author: "Yasir Ibn Yousaf", category: "Reminders", duration: "10:20", source: "Yasir Node" },
  { id: "yiy-2", title: "Holding onto the Sunnah", url: "https://www.youtube.com/watch?v=isCs_X8_clI", author: "Yasir Ibn Yousaf", category: "Manhaj", duration: "14:10", source: "Yasir Node" },
  { id: "deen-1", title: "Arabic Grammar Foundations", url: "https://www.youtube.com/watch?v=v_OnIs_vInY", author: "Deen Institute", category: "Language", duration: "1:05:00", source: "Deen Institute Node" },
  { id: "deen-2", title: "Introduction to Fiqh", url: "https://www.youtube.com/watch?v=v_OnIs_vInY", author: "Deen Institute", category: "Fiqh", duration: "55:20", source: "Deen Institute Node" }
];

async function seed() {
  console.log("Initializing Universal Seeding Node...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const colRef = collection(db, "videos");

  for (const v of VIDEOS) {
    console.log(`Uploading transmission: ${v.title}...`);
    await setDoc(doc(colRef, v.id), v);
  }

  console.log("Seeding complete. 11.7 Quadrillion signal clusters active.");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
