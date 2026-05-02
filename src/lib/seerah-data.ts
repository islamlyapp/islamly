
export type SeerahEvent = {
  id: number;
  title: string;
  era: 'Meccan' | 'Medinan';
  year: number;
  description: string;
  lessons: string[];
};

export const SEERAH_DATA: SeerahEvent[] = [
  {
    id: 1,
    title: "The First Revelation",
    era: "Meccan",
    year: 610,
    description: "In the cave of Hira, the Prophet Muhammad (peace be upon him) received the first verses of the Quran from the Angel Jibril, marking the beginning of his prophethood.",
    lessons: [
      "The importance of solitude and reflection.",
      "The divine nature of the Quranic revelation.",
      "The weight of the prophetic mission.",
    ],
  },
  {
    id: 2,
    title: "The Year of Sorrow",
    era: "Meccan",
    year: 619,
    description: "A period of intense grief for the Prophet, marked by the deaths of his beloved wife Khadijah and his uncle Abu Talib, who was his protector.",
    lessons: [
      "Patience and trust in Allah during times of hardship.",
      "The human side of the Prophet and his experience of loss.",
      "The importance of family and support systems.",
    ],
  },
  {
    id: 3,
    title: "The Hijra (Migration) to Medina",
    era: "Meccan",
    year: 622,
    description: "The perilous journey of the Prophet and his companion Abu Bakr from Mecca to Medina to escape persecution, establishing the first Islamic state.",
    lessons: [
      "The necessity of sacrifice for the sake of faith.",
      "The strategic planning and trust in Allah's plan.",
      "The foundation of brotherhood between the Muhajirun and Ansar.",
    ],
  },
  {
    id: 4,
    title: "The Battle of Badr",
    era: "Medinan",
    year: 624,
    description: "A decisive victory for the nascent Muslim community against a much larger Meccan army, solidifying their presence and faith.",
    lessons: [
      "Victory comes from Allah, not from numbers or strength.",
      "The importance of unity and discipline in the face of adversity.",
      "The power of prayer and faith in achieving the seemingly impossible.",
    ],
  },
  {
    id: 5,
    title: "The Treaty of Hudaybiyyah",
    era: "Medinan",
    year: 628,
    description: "A peace treaty between the Muslims and the Quraysh of Mecca, which, despite seeming unfavorable at first, was a strategic victory that led to the conquest of Mecca.",
    lessons: [
      "The wisdom of prioritizing long-term goals over short-term gains.",
      "The power of diplomacy and peaceful negotiation.",
      "Patience and foresight are key to ultimate success.",
    ],
  },
  {
    id: 6,
    title: "The Conquest of Mecca",
    era: "Medinan",
    year: 630,
    description: "The peaceful and bloodless conquest of Mecca by the Muslims, marked by the Prophet's forgiveness and mercy towards his former enemies.",
    lessons: [
      "The ultimate triumph of truth and faith.",
      "The power of forgiveness and reconciliation.",
      "The importance of humility in victory.",
    ],
  },
  {
    id: 7,
    title: "The Farewell Sermon",
    era: "Medinan",
    year: 632,
    description: "The final sermon delivered by the Prophet during his farewell pilgrimage, summarizing the core principles of Islam and emphasizing justice, equality, and the rights of all individuals.",
    lessons: [
      "The completion of the divine message.",
      "The establishment of a just and equitable society.",
      "The universal and timeless guidance of Islam.",
    ],
  },
];
