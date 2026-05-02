
export type DuaCategory = {
  id: string;
  name: string;
  icon: string;
  duas: Dua[];
};

export type Dua = {
  id: number;
  title: string;
  text_ar: string;
  text_en: string;
  reference: string;
};

export const DUA_DATA: DuaCategory[] = [
  {
    id: "morning-evening",
    name: "Morning & Evening",
    icon: "Sunrise",
    duas: [
      {
        id: 1,
        title: "Upon Waking Up",
        text_ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        text_en: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
        reference: "Bukhari",
      },
      {
        id: 2,
        title: "Before Sleeping",
        text_ar: "بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ...",
        text_en: "In Your name my Lord, I lie down and in Your name I rise...",
        reference: "Bukhari & Muslim",
      },
    ],
  },
  {
    id: "protection",
    name: "Protection",
    icon: "Shield",
    duas: [
      {
        id: 3,
        title: "Seeking Refuge from Evil",
        text_ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        text_en: "I seek refuge in the perfect words of Allah from the evil of that which He has created.",
        reference: "Muslim",
      },
    ],
  },
  {
    id: "quranic",
    name: "Quranic Duas",
    icon: "BookOpen",
    duas: [
      {
        id: 4,
        title: "For Guidance",
        text_ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        text_en: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
        reference: "Quran 2:201",
      },
    ],
  },
];
