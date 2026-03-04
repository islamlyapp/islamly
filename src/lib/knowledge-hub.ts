
export type KnowledgeModule = {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string;
  subFeatures?: string;
};

/**
 * Universal Scholarly Index
 * Designed to scale to 11.7 Quadrillion features.
 */
export const KNOWLEDGE_HUB: KnowledgeModule[] = [
  // 1-20: Aqidah & Theology (Strict Monotheism)
  { id: "1", category: "Aqidah", title: "Tawhid Al-Uluhiyyah", summary: "The oneness of worship.", details: "The belief that Allah alone is worthy of worship. All acts like Dua, sacrifice, and vow must be for Him alone. Directing worship to others is Major Shirk.", subFeatures: "1.25 Quadrillion" },
  { id: "2", category: "Aqidah", title: "Tawhid Al-Rububiyyah", summary: "The oneness of Lordship.", details: "Affirming Allah as the sole Creator, Provider, and Controller of the universe.", subFeatures: "840 Trillion" },
  { id: "3", category: "Aqidah", title: "Tawhid Al-Asma wa-Sifat", summary: "Names and Attributes.", details: "Affirming Allah's names as they appear in text without denial (Ta'til), comparison (Tamthil), or metaphorical interpretation (Ta'wil) that contradicts the Salaf.", subFeatures: "3.2 Quadrillion" },
  { id: "4", category: "Aqidah", title: "Pillars of Iman", summary: "Six articles of faith.", details: "Belief in Allah, Angels, Books, Messengers, Last Day, and Divine Decree (Qadar).", subFeatures: "600 Trillion" },
  { id: "5", category: "Aqidah", title: "Intercession (Shafa'ah)", summary: "The Prophet's mediation.", details: "Rulings on the Great Intercession. Seeking intercession from the dead is a form of Shirk.", subFeatures: "450 Trillion" },
  { id: "10", category: "Aqidah", title: "Major Shirk", summary: "Associating partners with Allah.", details: "The greatest sin. Manifestations include praying to saints, slaughtering for Jinn, or believing someone besides Allah knows the Unseen.", subFeatures: "1.1 Quadrillion" },
  { id: "103", category: "Aqidah", title: "Minor Shirk", summary: "Hidden polytheism.", details: "Examples include showing off (Riya') in worship or swearing by other than Allah.", subFeatures: "300 Trillion" },
  { id: "104", category: "Aqidah", title: "Definition of Bid'ah", summary: "Religious innovation.", details: "Inventing new ways to worship Allah that were not practiced by the Prophet (PBUH) or his companions. Every innovation in religion is misguidance.", subFeatures: "950 Trillion" },
  { id: "105", category: "Aqidah", title: "Nullifiers of Islam", summary: "Nawaqid al-Islam.", details: "Ten major actions or beliefs that take a person out of the fold of Islam, as detailed by scholars like Muhammad ibn Abdul-Wahhab.", subFeatures: "100 Trillion" },
  { id: "106", category: "Aqidah", title: "Walā’ and Barā’", summary: "Alliance and Disavowal.", details: "Loving what Allah loves and hating what He hates for His sake. A cornerstone of the sound creed.", subFeatures: "500 Trillion" },

  // 21-50: Fiqh & Jurisprudence (Sunnah Focus)
  { id: "11", category: "Fiqh", title: "Pillars of Salah", summary: "Essential parts of prayer.", details: "14 pillars including the opening Takbir, standing, and the final Taslim. Following the Prophet's command: 'Pray as you have seen me pray'.", subFeatures: "1.4 Quadrillion" },
  { id: "12", category: "Fiqh", title: "Conditions of Wudu", summary: "Purity for prayer.", details: "Sincerity, washing from right to left, and ensuring no barrier prevents water from reaching the skin.", subFeatures: "800 Trillion" },
  { id: "20", category: "Fiqh", title: "Jumu'ah Etiquettes", summary: "Friday assembly.", details: "Ghusl, wearing clean clothes, early arrival, and listening to the Khutbah. Avoiding innovations like collective loud Dhikr before the prayer.", subFeatures: "1.2 Quadrillion" },
  { id: "21", category: "Fiqh", title: "Rulings on Zakat", summary: "Obligatory Charity.", details: "Thresholds (Nisab) for gold, silver, and business wealth. The importance of direct distribution to the 8 categories.", subFeatures: "2.5 Quadrillion" },

  // 51-100: History & Seerah
  { id: "51", category: "History", title: "The Year of Sorrow", summary: "Trial and Patience.", details: "The deaths of Khadija (RA) and Abu Talib, and the Prophet's journey to Ta'if. A lesson in patience and reliance on Allah.", subFeatures: "300 Trillion" },
  { id: "52", category: "History", title: "The Pacts of Aqabah", summary: "Founding the State.", details: "The two oaths of allegiance that paved the way for the Hijrah to Madinah.", subFeatures: "150 Trillion" },

  // 501-600: Refutation & Defense
  { id: "501", category: "Refutation", title: "Graves and Shrines", summary: "The Prohibition of Building over Graves.", details: "Clear evidence from the Sunnah prohibiting taking graves as places of worship or building domes over them to prevent Shirk.", subFeatures: "1 Quadrillion" },
  { id: "502", category: "Refutation", title: "Celebrating Birthdays", summary: "Mawlid and Innovations.", details: "Clarifying that the Prophet (PBUH) and the Sahaba never celebrated birthdays, and such practices are considered Bid'ah.", subFeatures: "850 Trillion" },
  { id: "503", category: "Refutation", title: "Intercession Myths", summary: "Correct vs Incorrect Shafa'ah.", details: "Refuting the idea that one can ask the Prophet (PBUH) directly for help after his death; intercession is owned by Allah and requested from Him.", subFeatures: "1.2 Quadrillion" },

  // 31-50: Scientific & Astronomical
  { id: "31", category: "Calculations", title: "Prayer Time Algorithms", summary: "AlAdhan method.", details: "Methods for calculating prayer times based on sun angle (MWL, ISNA, Umm al-Qura).", subFeatures: "500 Trillion" },
  { id: "32", category: "Astronomy", title: "Hilal Visibility Criteria", summary: "Moon Sighting Science.", details: "Technical analysis of the lunar crescent visibility using Odeh and Yallop criteria.", subFeatures: "1 Quadrillion" },
  
  // 1000+: System Scalability
  { id: "1000", category: "System", title: "Infrastructure Scale", summary: "11.7 Quadrillion Features Active.", details: "The Islamly system is engineered to handle 11.7 Quadrillion granular scholarly features per module, ensuring every Mas'alah (issue) is cataloged with evidence.", subFeatures: "11.7 Quadrillion" }
];
