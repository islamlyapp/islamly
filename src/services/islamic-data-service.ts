/**
 * @fileOverview Service for interacting with external Islamic data providers.
 */

export type PrayerTimings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export async function fetchPrayerTimes(city: string, country: string, method: number = 2): Promise<PrayerTimings> {
  try {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`);
    const data = await response.json();
    return data.data.timings;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    throw error;
  }
}

export async function fetchSurahList() {
  try {
    const response = await fetch('https://api.quran.com/api/v4/chapters?language=en');
    const data = await response.json();
    return data.chapters;
  } catch (error) {
    console.error("Error fetching surahs:", error);
    throw error;
  }
}

export async function fetchSurahVerses(surahId: number, translationId?: number) {
  try {
    const translationParam = translationId ? `&translations=${translationId}` : '';
    const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}${translationParam}`);
    const data = await response.json();
    
    // If we want translation text too, we need a slightly different endpoint or combine them
    // For simplicity in this UI, we fetch the Uthmani script and if translation is needed, we'd fetch translations specifically
    return data.verses;
  } catch (error) {
    console.error("Error fetching verses:", error);
    throw error;
  }
}

export async function fetchVerseTranslations(surahId: number, translationId: number) {
  try {
    const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translationId}?chapter_number=${surahId}`);
    const data = await response.json();
    return data.translations;
  } catch (error) {
    console.error("Error fetching translations:", error);
    throw error;
  }
}

export async function fetchAvailableTranslations() {
  try {
    const response = await fetch('https://api.quran.com/api/v4/resources/translations');
    const data = await response.json();
    return data.translations;
  } catch (error) {
    console.error("Error fetching translation list:", error);
    throw error;
  }
}
