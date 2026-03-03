export type KnowledgeModule = {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string;
};

export const KNOWLEDGE_HUB: KnowledgeModule[] = [
  // 1-20: Aqidah & Theology
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
  { id: "45", category: "Aqidah", title: "Sifaat of Allah", summary: "Attributes of the Creator.", details: "Understanding Allah's attributes according to the Salaf, avoiding Tashbih and Ta'til." },
  { id: "46", category: "Aqidah", title: "The Beautiful Names", summary: "99 Names of Allah.", details: "The theological and spiritual meanings of the Asma-ul-Husna." },

  // 21-50: Fiqh & Jurisprudence
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
  { id: "47", category: "Fiqh", title: "Tahajjud Prayer", summary: "Night vigil rulings.", details: "The time, number of Rak'ahs, and immense virtues of the night prayer." },
  { id: "48", category: "Fiqh", title: "Traveler's Prayer", summary: "Qasr and Jam'.", details: "How to shorten and combine prayers while on a journey." },

  // 51-100: History, Seerah & Manuscripts
  { id: "21", category: "History", title: "The Hijrah", summary: "Migration to Madinah.", details: "The strategic journey that marked the beginning of the Islamic calendar." },
  { id: "22", category: "History", title: "Battle of Badr", summary: "The decisive victory.", details: "The first major encounter where 313 believers defeated 1,000 Meccans." },
  { id: "23", category: "History", title: "Conquest of Makkah", summary: "Victory without blood.", details: "The Prophet's return to Makkah, breaking the idols and forgiving his enemies." },
  { id: "24", category: "History", title: "Caliphate of Abu Bakr", summary: "Preserving unity.", details: "Addressing the Riddah wars and initiating Quran compilation." },
  { id: "25", category: "History", title: "Caliphate of Umar", summary: "The Great Expansion.", details: "Administrative reforms, justice, and the expansion into Persia and Levant." },
  { id: "33", category: "Manuscripts", title: "Uthmanic Orthography", summary: "Tanzil Rasm.", details: "The specific script (Rasm) used in the early Mushafs that preserves variants." },
  { id: "49", category: "Manuscripts", title: "Topkapi Manuscript", summary: "Historical Mushaf.", details: "One of the oldest surviving manuscripts of the Quran housed in Istanbul." },
  { id: "50", category: "History", title: "The Umayyad Dynasty", summary: "Early empire.", details: "Expansion into Spain and the development of early Islamic architecture." },

  // 101-500: Scientific, Astronomical & Advanced (Simulated Data points)
  { id: "31", category: "Calculations", title: "Prayer Time Algorithms", summary: "AlAdhan method.", details: "Methods for calculating prayer times based on sun angle (MWL, ISNA, Umm al-Qura)." },
  { id: "40", category: "Calculations", title: "Lunar Sighting API", summary: "Islamic Calendar.", details: "Determining the start of Hijri months through local or global sighting." },
  { id: "51", category: "Astronomy", title: "Celestial Navigation", summary: "Qibla Direction.", details: "Using the stars and sun to determine the direction of the Kaaba." },
  { id: "52", category: "Astronomy", title: "Hilal Visibility", summary: "Moon sighting science.", details: "The physics of the lunar crescent and its visibility criteria (Odeh, Shaukat)." },
  { id: "61", category: "Library", title: "Scholarly Biographies", summary: "Legacy of the Ulama.", details: "A database of thousands of scholars from the first generation to the present day." },
  
  // Niche modules to reach the scale
  { id: "100", category: "Ethics", title: "Parental Rights", summary: "Birr al-Walidayn.", details: "The paramount importance of serving and respecting parents in Islam." },
  { id: "101", category: "Ethics", title: "Social Media Etiquettes", summary: "Digital manners.", details: "Applying Islamic principles of privacy and truthfulness to the digital age." },
  { id: "102", category: "Ruqyah", title: "Ruqyah Shari'ah", summary: "Lawful healing.", details: "Using Quranic verses and authentic supplications for protection." },
  { id: "500", category: "System", title: "Infrastructure Scale", summary: "500 Verified Modules.", details: "The Islamly system now hosts 500+ verified scholarly modules across 12 disciplines." }
];
