/**
 * @fileOverview Data and metadata for the 10 Authentic Qira'at (canonical variant readings).
 */

export type Qiraah = {
  id: string;
  name: string;
  reciter: string;
  narrator: string;
  region: string;
  description: string;
};

export const QIRAAT_DATA: Qiraah[] = [
  {
    id: "hafs",
    name: "Hafs 'an 'Asim",
    reciter: "Asim al-Kufi",
    narrator: "Hafs ibn Sulayman",
    region: "Kufa (Iraq)",
    description: "The most widely used Qira'ah in the world today, standard in most Mus-hafs."
  },
  {
    id: "warsh",
    name: "Warsh 'an Nafi'",
    reciter: "Nafi' al-Madani",
    narrator: "Warsh (Uthman ibn Sa'id)",
    region: "Madinah / North Africa",
    description: "Common in North and West Africa. Known for specific rules of lengthening and pronunciation."
  },
  {
    id: "qalun",
    name: "Qalun 'an Nafi'",
    reciter: "Nafi' al-Madani",
    narrator: "Qalun (Isa ibn Mina)",
    region: "Madinah / Libya",
    description: "Used primarily in Libya and parts of Tunisia and Qatar."
  },
  {
    id: "duri",
    name: "Ad-Duri 'an Abu 'Amr",
    reciter: "Abu 'Amr al-Basri",
    narrator: "Ad-Duri",
    region: "Basra / Sudan",
    description: "The dominant reading in Sudan and parts of East Africa."
  },
  {
    id: "shubah",
    name: "Shu'bah 'an 'Asim",
    reciter: "Asim al-Kufi",
    narrator: "Shu'bah ibn 'Ayyash",
    region: "Kufa (Iraq)",
    description: "The companion narration to Hafs, used in advanced scholarly study."
  },
  {
    id: "susi",
    name: "As-Susi 'an Abu 'Amr",
    reciter: "Abu 'Amr al-Basri",
    narrator: "As-Susi",
    region: "Basra (Iraq)",
    description: "Notable for extensive rules of Idgham (merging of letters)."
  },
  {
    id: "qunbul",
    name: "Qunbul 'an Ibn Kathir",
    reciter: "Ibn Kathir al-Makki",
    narrator: "Qunbul",
    region: "Makkah (Saudi Arabia)",
    description: "Preserves the early Meccan tradition of recitation."
  },
  {
    id: "bazzi",
    name: "Al-Bazzi 'an Ibn Kathir",
    reciter: "Ibn Kathir al-Makki",
    narrator: "Al-Bazzi",
    region: "Makkah (Saudi Arabia)",
    description: "Another major narration from the scholar of Makkah."
  },
  {
    id: "khalaf",
    name: "Khalaf 'an Hamzah",
    reciter: "Hamzah al-Kufi",
    narrator: "Khalaf ibn Hisham",
    region: "Kufa (Iraq)",
    description: "Known for its unique pause and emphasis rules (Sakt)."
  },
  {
    id: "hisham",
    name: "Hisham 'an Ibn 'Amir",
    reciter: "Ibn 'Amir ad-Dimashqi",
    narrator: "Hisham ibn 'Ammar",
    region: "Damascus (Syria)",
    description: "Representing the early Syrian tradition of the Levant."
  }
];
