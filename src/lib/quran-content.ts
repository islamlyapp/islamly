
import { QuranAyah, QiraatVariant } from "./quran-data";

export const BASE_QURAN: QuranAyah[] = [
  { surah: 1, ayah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", page: 1 },
  { surah: 1, ayah: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", page: 1 },
  { surah: 1, ayah: 3, text: "الرَّحْمَنِ الرَّحِيمِ", page: 1 },
  { surah: 1, ayah: 4, text: "مَالِكِ يَوْمِ الدِّينِ", page: 1 },
  { surah: 21, ayah: 4, text: "قَالَ رَبِّي يَعْلَمُ الْقَوْلَ فِي السَّمَاءِ وَالْأَرْضِ وَهُوَ السَّمِيعُ الْعَلِيمُ", page: 322 },
];

export const VARIANTS: QiraatVariant[] = [
  {
    surah: 1,
    ayah: 4,
    variants: {
      "Hafs 'an 'Asim": "مَالِكِ يَوْمِ الدِّينِ",
      "Warsh 'an Nafi'": "مَلِكِ يَوْمِ الدِّينِ",
      "Qalun 'an Nafi'": "مَلِكِ يَوْمِ الدِّينِ",
      "Khalaf 'an Hamzah": "مَلِكِ يَوْمِ الدِّينِ",
    }
  },
  {
    surah: 21,
    ayah: 4,
    variants: {
      "Hafs 'an 'Asim": "قَالَ",
      "Warsh 'an Nafi'": "قُل",
      "Ad-Duri 'an Abu 'Amr": "قُل",
    }
  }
];
