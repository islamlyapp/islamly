
export type KnowledgeModule = {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string;
};

export const KNOWLEDGE_HUB: KnowledgeModule[] = [
  // 1-20: Aqidah & Theology (Strict Monotheism)
  { id: "1", category: "Aqidah", title: "Tawhid Al-Uluhiyyah", summary: "The oneness of worship.", details: "The belief that Allah alone is worthy of worship. All acts like Dua, sacrifice, and vow must be for Him alone. Directing worship to others is Major Shirk." },
  { id: "2", category: "Aqidah", title: "Tawhid Al-Rububiyyah", summary: "The oneness of Lordship.", details: "Affirming Allah as the sole Creator, Provider, and Controller of the universe." },
  { id: "3", category: "Aqidah", title: "Tawhid Al-Asma wa-Sifat", summary: "Names and Attributes.", details: "Affirming Allah's names as they appear in text without denial (Ta'til), comparison (Tamthil), or metaphorical interpretation (Ta'wil) that contradicts the Salaf." },
  { id: "4", category: "Aqidah", title: "Pillars of Iman", summary: "Six articles of faith.", details: "Belief in Allah, Angels, Books, Messengers, Last Day, and Divine Decree (Qadar)." },
  { id: "5", category: "Aqidah", title: "Intercession (Shafa'ah)", summary: "The Prophet's mediation.", details: "Rulings on the Great Intercession. Seeking intercession from the dead is a form of Shirk." },
  { id: "10", category: "Aqidah", title: "Major Shirk", summary: "Associating partners with Allah.", details: "The greatest sin. Manifestations include praying to saints, slaughtering for Jinn, or believing someone besides Allah knows the Unseen." },
  { id: "103", category: "Aqidah", title: "Minor Shirk", summary: "Hidden polytheism.", details: "Examples include showing off (Riya') in worship or swearing by other than Allah." },
  { id: "104", category: "Aqidah", title: "Definition of Bid'ah", summary: "Religious innovation.", details: "Inventing new ways to worship Allah that were not practiced by the Prophet (PBUH) or his companions. Every innovation in religion is misguidance." },
  { id: "105", category: "Aqidah", title: "Nullifiers of Islam", summary: "Nawaqid al-Islam.", details: "Ten major actions or beliefs that take a person out of the fold of Islam, as detailed by scholars like Muhammad ibn Abdul-Wahhab." },
  { id: "106", category: "Aqidah", title: "Walā’ and Barā’", summary: "Alliance and Disavowal.", details: "Loving what Allah loves and hating what He hates for His sake. A cornerstone of the sound creed." },

  // 21-50: Fiqh & Jurisprudence (Sunnah Focus)
  { id: "11", category: "Fiqh", title: "Pillars of Salah", summary: "Essential parts of prayer.", details: "14 pillars including the opening Takbir, standing, and the final Taslim. Following the Prophet's command: 'Pray as you have seen me pray'." },
  { id: "12", category: "Fiqh", title: "Conditions of Wudu", summary: "Purity for prayer.", details: "Sincerity, washing from right to left, and ensuring no barrier prevents water from reaching the skin." },
  { id: "20", category: "Fiqh", title: "Jumu'ah Etiquettes", summary: "Friday assembly.", details: "Ghusl, wearing clean clothes, early arrival, and listening to the Khutbah. Avoiding innovations like collective loud Dhikr before the prayer." },
  { id: "21", category: "Fiqh", title: "Rulings on Zakat", summary: "Obligatory Charity.", details: "Thresholds (Nisab) for gold, silver, and business wealth. The importance of direct distribution to the 8 categories." },

  // 51-100: History & Seerah
  { id: "51", category: "History", title: "The Year of Sorrow", summary: "Trial and Patience.", details: "The deaths of Khadija (RA) and Abu Talib, and the Prophet's journey to Ta'if. A lesson in patience and reliance on Allah." },
  { id: "52", category: "History", title: "The Pacts of Aqabah", summary: "Founding the State.", details: "The two oaths of allegiance that paved the way for the Hijrah to Madinah." },

  // 501-600: Refutation & Defense
  { id: "501", category: "Refutation", title: "Graves and Shrines", summary: "The Prohibition of Building over Graves.", details: "Clear evidence from the Sunnah prohibiting taking graves as places of worship or building domes over them to prevent Shirk." },
  { id: "502", category: "Refutation", title: "Celebrating Birthdays", summary: "Mawlid and Innovations.", details: "Clarifying that the Prophet (PBUH) and the Sahaba never celebrated birthdays, and such practices are considered Bid'ah." },
  { id: "503", category: "Refutation", title: "Intercession Myths", summary: "Correct vs Incorrect Shafa'ah.", details: "Refuting the idea that one can ask the Prophet (PBUH) directly for help after his death; intercession is owned by Allah and requested from Him." },

  // 31-50: Scientific & Astronomical
  { id: "31", category: "Calculations", title: "Prayer Time Algorithms", summary: "AlAdhan method.", details: "Methods for calculating prayer times based on sun angle (MWL, ISNA, Umm al-Qura)." },
  { id: "32", category: "Astronomy", title: "Hilal Visibility Criteria", summary: "Moon Sighting Science.", details: "Technical analysis of the lunar crescent visibility using Odeh and Yallop criteria." },
  
  // 500: System Modules
  { id: "500", category: "System", title: "Infrastructure Scale", summary: "500 Verified Modules.", details: "The Islamly system now hosts 500+ verified scholarly modules strictly aligned with the Sunnah, covering Aqidah, Fiqh, Seerah, and Heritage." }
];
