/**
 * @fileOverview Service for interacting with external Islamic data providers.
 * Uses only free-tier or open APIs (AlAdhan, Quran.com, Overpass).
 */

export type PrayerTimings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

/**
 * Fetches prayer times based on city and country using AlAdhan API.
 */
export async function fetchPrayerTimes(city: string, country: string, method: number = 2): Promise<PrayerTimings> {
  try {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`);
    const data = await response.json();
    return data.data.timings;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    throw error;
  }
}

/**
 * Fetches prayer times based on geographic coordinates using AlAdhan API.
 */
export async function fetchPrayerTimesByCoords(lat: number, lng: number, method: number = 2): Promise<{ timings: PrayerTimings, meta: any }> {
  try {
    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`);
    const data = await response.json();
    return {
      timings: data.data.timings,
      meta: data.data.meta
    };
  } catch (error) {
    console.error("Error fetching prayer times by coords:", error);
    throw error;
  }
}

/**
 * Fetches Qibla direction for a given location.
 */
export async function fetchQibla(lat: number, lng: number) {
  try {
    const response = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Qibla:", error);
    throw error;
  }
}

/**
 * Fetches Masjids using OpenStreetMap Overpass API (around a radius).
 */
export async function fetchMasjids(lat: number, lng: number, radius: number = 5000) {
  try {
    const query = `[out:json];node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});out;`;
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.elements.map((node: any) => ({
      id: node.id,
      name: node.tags.name || "Unnamed Masjid",
      address: node.tags["addr:street"] ? `${node.tags["addr:street"]} ${node.tags["addr:housenumber"] || ""}` : "Address not listed",
      lat: node.lat,
      lon: node.lon,
      tags: node.tags
    }));
  } catch (error) {
    console.error("Error fetching masjids from Overpass:", error);
    return [];
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

export async function fetchSurahAudio(surahId: number, reciterId: number = 7) {
  try {
    const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahId}`);
    const data = await response.json();
    return data.audio_file;
  } catch (error) {
    console.error("Error fetching audio:", error);
    throw error;
  }
}
