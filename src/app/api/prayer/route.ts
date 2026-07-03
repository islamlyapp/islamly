import { NextRequest, NextResponse } from 'next/server';
import { fetchPrayerTimesByCoords, fetchQibla, fetchCityCoordinates } from '@/services/islamic-data-service';

type PrayerRequestBody = {
  lat?: number;
  lng?: number;
  city?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PrayerRequestBody;
    let { lat, lng, city } = body;
    let locationLabel = 'Current location';

    if ((!lat || !lng) && city) {
      const geo = await fetchCityCoordinates(city);
      if (!geo) {
        return NextResponse.json({ error: 'Unable to resolve the requested city name.' }, { status: 400 });
      }
      lat = geo.lat;
      lng = geo.lon;
      locationLabel = geo.display_name || city;
    }

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json({ error: 'A latitude and longitude or city name are required.' }, { status: 400 });
    }

    const { timings } = await fetchPrayerTimesByCoords(lat, lng);
    const qibla = await fetchQibla(lat, lng);

    return NextResponse.json({ timings, qibla, locationLabel });
  } catch (error) {
    console.error('Prayer API error:', error);
    return NextResponse.json({ error: 'Unable to fetch prayer data at the moment.' }, { status: 500 });
  }
}
