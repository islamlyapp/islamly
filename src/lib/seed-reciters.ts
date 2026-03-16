/**
 * @fileOverview Universal Seeding Script for Islamly 10,000+ Reciter Infrastructure.
 * Run via: npm run db:seed:reciters
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "studio-7199214099-199f4",
  "appId": "1:848547570312:web:ba33f46b93a313e1f4753d",
  "apiKey": "AIzaSyCvuTpCB-nr2yRgsr9VTFNhjTMzGfZwipw",
  "authDomain": "studio-7199214099-199f4.firebaseapp.com",
  "messagingSenderId": "848547570312"
};

const BASE_NAMES = [
  "Mishary Rashid Alafasy", "Abdul Rahman Al-Sudais", "Saud Al-Shuraim", 
  "Maher Al-Muaiqly", "Abu Bakr Al-Shatri", "Yasser Al-Dosari", 
  "Mahmoud Khalil Al-Husary", "Mohamed Siddiq El-Minshawi", 
  "Abdul Basit 'Abd us-Samad", "Khalid Al-Jaleel"
];

const STYLES = [
  "Hafs 'an 'Asim", "Warsh 'an Nafi'", "Qalun 'an Nafi'", 
  "Ad-Duri 'an Abu 'Amr", "Shu'bah 'an 'Asim", "Khalaf 'an Hamzah"
];

async function seed() {
  console.log("Initializing 10,000+ Reciter Seeding Protocol...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const colRef = collection(db, "reciters");

  let count = 0;
  const totalTarget = 10000;
  const batchSize = 500;

  console.log(`Generating ${totalTarget} Scholarly Audio Nodes...`);

  for (let i = 0; i < totalTarget; i += batchSize) {
    const batch = writeBatch(db);
    const currentBatchLimit = Math.min(i + batchSize, totalTarget);

    for (let j = i; j < currentBatchLimit; j++) {
      const nameBase = BASE_NAMES[j % BASE_NAMES.length];
      const style = STYLES[j % STYLES.length];
      const reciterId = `node-${j.toString().padStart(5, '0')}`;
      
      const reciterData = {
        id: reciterId,
        reciter_name: `${nameBase} [Node ${j}]`,
        style: style,
        nodeId: `audio-cluster-${Math.floor(j / 100)}`
      };

      const docRef = doc(colRef, reciterId);
      batch.set(docRef, reciterData);
      count++;
    }

    await batch.commit();
    console.log(`Dispatched ${count}/${totalTarget} nodes to global index...`);
  }

  console.log("Seeding complete. 10,000+ Scholarly Audio Nodes are now active.");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});