
export type Hadith = {
  id: number;
  collection: string;
  book: string;
  hadith_number: number;
  text_en: string;
  text_ar: string;
  narrator: string;
  grade: string;
};

export const HADITH_DATA: Hadith[] = [
  {
    id: 1,
    collection: "Sahih al-Bukhari",
    book: "Book of Revelation",
    hadith_number: 1,
    text_en: "Actions are but by intentions and every man shall have but that which he intended...",
    text_ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى...",
    narrator: "Umar ibn al-Khattab",
    grade: "Sahih (Authentic)",
  },
  {
    id: 2,
    collection: "Sahih Muslim",
    book: "Book of Faith",
    hadith_number: 8,
    text_en: "Islam has been built on five [pillars]: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, performing the prayers, paying the zakat, making the pilgrimage to the House, and fasting in Ramadan.",
    text_ar: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ.",
    narrator: "Ibn Umar",
    grade: "Sahih (Authentic)",
  },
  {
    id: 3,
    collection: "Jami` at-Tirmidhi",
    book: "Book on Righteousness and Maintaining Good Relations with Relatives",
    hadith_number: 1986,
    text_en: "The merciful are shown mercy by the Most Merciful. Be merciful to those on the earth and the One above the heavens will have mercy upon you.",
    text_ar: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ.",
    narrator: "Abdullah ibn Amr",
    grade: "Hasan (Good)",
  },
  {
    id: 4,
    collection: "Sunan an-Nasa'i",
    book: "The Book of Knowledge",
    hadith_number: 4490,
    text_en: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.",
    text_ar: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ.",
    narrator: "Abu Huraira",
    grade: "Sahih (Authentic)",
  },
  {
    id: 5,
    collection: "Sunan Abi Dawud",
    book: "Book of Combing the Hair",
    hadith_number: 4163,
    text_en: "Cleanliness is half of faith.",
    text_ar: "الطُّهُورُ شَطْرُ الإِيمَانِ.",
    narrator: "Abu Malik al-Ash'ari",
    grade: "Sahih (Authentic)",
  },
];
