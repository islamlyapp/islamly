export type KnowledgeModule = {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string;
};

export const KNOWLEDGE_HUB: KnowledgeModule[] = [
  // 1-10: Aqidah & Theology (The Core)
  { id: "1", category: "Aqidah", title: "Tawhid Al-Uluhiyyah", summary: "The oneness of worship.", details: "The belief that Allah alone is worthy of worship. All acts like Dua, sacrifice, and vow must be for Him alone." },
  { id: "2", category: "Aqidah", title: "Tawhid Al-Rububiyyah", summary: "The oneness of Lordship.", details: "Affirming Allah as the sole Creator, Provider, and Controller of the universe." },
  { id: "3", category: "Aqidah", title: "Tawhid Al-Asma wa-Sifat", summary: "Names and Attributes.", details: "Affirming Allah's names as they appear in text without denial (Ta'til) or comparison (Tamthil)." },
  { id: "4", category: "Aqidah", title: "Pillars of Iman", summary: "Six articles of faith.", details: "Belief in Allah, Angels, Books, Messengers, Last Day, and Divine Decree (Qadar)." },
  { id: "5", category: "Aqidah", title: "Intercession (Shafa'ah)", summary: "The Prophet's mediation.", details: "Rulings on the Great Intercession on the Day of Judgment and other types of mediation." },
  { id: "6", category: "Aqidah", title: "Al-Wala' wal-Bara'", summary: "Loyalty and Disavowal.", details: "Loving what Allah loves and hating what Allah hates for the sake of faith." },
  { id: "7", category: "Aqidah", title: "Status of the Sahaba", summary: "Honor of the Companions.", details: "The collective integrity ('Adalah) of the companions of Prophet Muhammad." },
  { id: "8", category: "Aqidah", title: "The Fitrah", summary: "Natural inclination.", details: "Every child is born with an innate inclination towards monotheism." },
  { id: "9", category: "Aqidah", title: "Nifaq (Hypocrisy)", summary: "Types of hypocrisy.", details: "Distinguishing between hypocrisy in belief (major) and hypocrisy in action (minor)." },
  { id: "10", category: "Aqidah", title: "Shirk (Polytheism)", summary: "The unforgivable sin.", details: "Detailed breakdown of major and minor Shirk and its manifestations." },

  // 11-20: Fiqh & Law (The Practice)
  { id: "11", category: "Fiqh", title: "Pillars of Salah", summary: "Essential parts of prayer.", details: "14 pillars including the opening Takbir, standing, and the final Taslim." },
  { id: "12", category: "Fiqh", title: "Nullifiers of Wudu", summary: "Breaking ritual purity.", details: "Bodily discharges, deep sleep, loss of consciousness, and touching private parts." },
  { id: "13", category: "Fiqh", title: "Rulings of Zakat", summary: "Obligatory charity.", details: "Calculation methods for gold, silver, crops, and trade goods." },
  { id: "14", category: "Fiqh", title: "Fasting Rules", summary: "Ramadan jurisprudence.", details: "What breaks the fast, who is exempt, and the virtue of Suhoor." },
  { id: "15", category: "Fiqh", title: "Hajj Rituals", summary: "Pilgrimage step-by-step.", details: "Ihram, Tawaf, Sa'i, Arafat, Muzdalifah, and Jamarat." },
  { id: "16", category: "Fiqh", title: "Inheritance (Mirath)", summary: "Division of estates.", details: "The fixed shares (Fara'id) for family members defined in Surah An-Nisa." },
  { id: "17", category: "Fiqh", title: "Islamic Finance (Mu'amalat)", summary: "Ethical trade.", details: "Prohibition of Riba (interest), Gharar (uncertainty), and Maysir (gambling)." },
  { id: "18", category: "Fiqh", title: "Halal Slaughter (Dhabihah)", summary: "Dietary laws.", details: "Conditions for permissible meat and the mention of Allah's name." },
  { id: "19", category: "Fiqh", title: "Nikah (Marriage)", summary: "Contract requirements.", details: "Offer/Acceptance, Guardian (Wali), Witnesses, and the Dowry (Mahr)." },
  { id: "20", category: "Fiqh", title: "Jumu'ah Etiquettes", summary: "Friday assembly.", details: "Ghusl, wearing clean clothes, early arrival, and listening to the Khutbah." },

  // 21-30: Seerah & History (The Legacy)
  { id: "21", category: "History", title: "The Hijrah", summary: "Migration to Madinah.", details: "The strategic journey that marked the beginning of the Islamic calendar." },
  { id: "22", category: "History", title: "Battle of Badr", summary: "The decisive victory.", details: "The first major encounter where 313 believers defeated 1,000 Meccans." },
  { id: "23", category: "History", title: "Conquest of Makkah", summary: "Victory without blood.", details: "The Prophet's return to Makkah, breaking the idols and forgiving his enemies." },
  { id: "24", category: "History", title: "Caliphate of Abu Bakr", summary: "Preserving unity.", details: "Addressing the Riddah wars and initiating Quran compilation." },
  { id: "25", category: "History", title: "Caliphate of Umar", summary: "The Great Expansion.", details: "Administrative reforms, justice, and the expansion into Persia and Levant." },
  { id: "26", category: "History", title: "Caliphate of Uthman", summary: "Standardizing the Text.", details: "Finalizing the Mushaf and his legendary modesty/generosity." },
  { id: "27", category: "History", title: "Caliphate of Ali", summary: "Wisdom in trials.", details: "Managing internal discord and the move of the capital to Kufa." },
  { id: "28", category: "History", title: "The Ummayad Period", summary: "Growth of the Empire.", details: "Consolidation of power and the spread of Islam to Spain and India." },
  { id: "29", category: "History", title: "The Abbasid Golden Age", summary: "Rise of Sciences.", details: "The House of Wisdom in Baghdad and the preservation of classical knowledge." },
  { id: "30", category: "History", title: "Scholars of the Salaf", summary: "The early imams.", details: "Biographies of Imam Malik, Ash-Shafi'i, Ahmad, and Abu Hanifah." },

  // 31-40: Hadith & Quran Sciences
  { id: "31", category: "Calculations", title: "Prayer Time Algorithms", summary: "AlAdhan method.", details: "Methods for calculating prayer times based on sun angle (MWL, ISNA, Umm al-Qura)." },
  { id: "32", category: "Quran", title: "The 10 Mutawatir Qira'at", summary: "Canonical variant readings.", details: "The 10 authentic ways of reciting the Quran transmitted through multiple chains (Mutawatir)." },
  { id: "33", category: "Manuscripts", title: "Uthmanic Orthography", summary: "Tanzil Rasm.", details: "The specific script (Rasm) used in the early Mushafs that preserves variants." },
  { id: "34", category: "Hadith", title: "Mustalah al-Hadith", summary: "Hadith terminology.", details: "Classifying narrations into Sahih (authentic), Hasan (good), and Da'if (weak)." },
  { id: "35", category: "Quran", title: "Asbab al-Nuzul", summary: "Context of revelation.", details: "The historical events surrounding the revelation of specific verses." },
  { id: "36", category: "Quran", title: "Tafsir Methodology", summary: "Interpreting the Word.", details: "Principles of explaining the Quran by Quran, Sunnah, and statements of the Sahaba." },
  { id: "37", category: "Hadith", title: "Sahih al-Bukhari Index", summary: "The most authentic book.", details: "Structure and conditions of Al-Bukhari's collection of 7,000+ hadiths." },
  { id: "38", category: "Hadith", title: "Sahih Muslim Index", summary: "The refined collection.", details: "Overview of Imam Muslim's thematic arrangement and rigorous chains." },
  { id: "39", category: "Quran", title: "Tajweed Principles", summary: "Art of recitation.", details: "Rules of pronunciation (Makharij) and characteristics (Sifat) of letters." },
  { id: "40", category: "Calculations", title: "Lunar Sighting API", summary: "Islamic Calendar.", details: "Determining the start of Hijri months through local or global sighting." },

  // 41-60: Specialized Ethics, Living & Ruqyah
  { id: "41", category: "Ethics", title: "Adab (Manners)", summary: "Prophetic character.", details: "The importance of truthfulness, humility, and keeping promises." },
  { id: "42", category: "Ruqyah", title: "Ruqyah Shari'ah", summary: "Lawful spiritual healing.", details: "Using Quranic verses and authentic supplications for protection and cure." },
  { id: "43", category: "Ruqyah", title: "Evil Eye ('Ayn)", summary: "The reality of 'Ayn.", details: "Proofs from the Sunnah regarding the effects of the evil eye and its treatment." },
  { id: "44", category: "Ruqyah", title: "Magic (Sihr)", summary: "Protection from magic.", details: "Understanding the dangers of magic and the lawful ways to dissolve its effects." },
  { id: "45", category: "Aqidah", title: "Sifaat of Allah", summary: "Attributes of the Creator.", details: "Understanding Allah's attributes according to the Salaf, avoiding Tashbih and Ta'til." },
  { id: "46", category: "Spirituality", title: "Tazkiyah (Purification)", summary: "Curing the heart.", details: "Removing diseases of the heart like envy, pride, and ostentation (Riya)." },
  { id: "61", category: "Library", title: "Scholarly Biographies", summary: "Legacy of the Ulama.", details: "A database of thousands of scholars from the first generation to the present day." }
];
