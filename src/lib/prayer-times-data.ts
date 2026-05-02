
export type PrayerTime = {
  name: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  time: string;
  isNext: boolean;
};

export const PRAYER_TIMES_DATA: PrayerTime[] = [
  { name: "Fajr", time: "04:30 AM", isNext: false },
  { name: "Dhuhr", time: "01:15 PM", isNext: true },
  { name: "Asr", time: "05:00 PM", isNext: false },
  { name: "Maghrib", time: "07:45 PM", isNext: false },
  { name: "Isha", time: "09:15 PM", isNext: false },
];

export const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
