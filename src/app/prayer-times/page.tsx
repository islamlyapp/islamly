'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Sun, Moon, Sunrise, Sunset, Bell, Compass, MapPin, Search, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const prayerIcons = {
  Fajr: <Sunrise className='w-6 h-6' />,
  Dhuhr: <Sun className='w-6 h-6' />,
  Asr: <Sun className='w-6 h-6' />,
  Maghrib: <Sunset className='w-6 h-6' />,
  Isha: <Moon className='w-6 h-6' />,
};

const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

type PrayerName = (typeof prayerOrder)[number];

type PrayerTime = {
  name: PrayerName;
  time: string;
  isNext: boolean;
};

type PrayerApiResponse = {
  timings: Record<string, string>;
  qibla: { direction: number };
  locationLabel: string;
  error?: string;
};

function parsePrayerDate(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour ?? 0, minute ?? 0, 0, 0);
  return date;
}

function getNextPrayerIndex(times: Record<string, string>) {
  const now = new Date();
  const entries = prayerOrder.map((name) => ({ name, date: parsePrayerDate(times[name] || '00:00') }));
  const nextIndex = entries.findIndex((entry) => entry.date > now);
  return nextIndex === -1 ? 0 : nextIndex;
}

export default function PrayerTimesPage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [locationLabel, setLocationLabel] = useState('Current location');
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatPrayerTimes = (timings: Record<string, string>) => {
    const nextIndex = getNextPrayerIndex(timings);
    return prayerOrder.map((name, index) => ({
      name,
      time: timings[name] || '--:--',
      isNext: index === nextIndex,
    }));
  };

  const loadPrayerData = async (params: { lat?: number; lng?: number; city?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = (await response.json()) as PrayerApiResponse;
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Unable to load prayer times.');
      }

      setPrayerTimes(formatPrayerTimes(data.timings));
      setQiblaDirection(Math.round(data.qibla.direction));
      setLocationLabel(data.locationLabel || 'Current location');
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Unable to load prayer schedule.');
      setPrayerTimes([]);
      setQiblaDirection(null);
    } finally {
      setLoading(false);
    }
  };

  const requestCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLoading(false);
      setError('Geolocation is unavailable in this browser. Search by city instead.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await loadPrayerData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLoading(false);
        setError('Location permission denied. Search by city below.');
      }
    );
  };

  useEffect(() => {
    requestCurrentLocation();
  }, []);

  const handleSearch = async () => {
    if (!searchCity.trim()) {
      setError('Enter a city name to search.');
      return;
    }

    await loadPrayerData({ city: searchCity.trim() });
  };

  return (
    <div className='space-y-8 animate-in fade-in duration-500 pb-16 max-w-2xl mx-auto'>
      <header className='flex flex-col items-center text-center gap-4 bg-secondary/10 p-8 rounded-[2.5rem] border border-white/5'>
        <div className='p-3 bg-primary/20 rounded-2xl'>
          <Clock className='w-8 h-8 text-primary' />
        </div>
        <h1 className='text-3xl font-headline font-black text-white uppercase tracking-tight'>
          Prayer Times Live
        </h1>
        <p className='text-muted-foreground italic text-sm max-w-md'>
          Live prayer times and Qibla direction based on your location or a city search.
        </p>
        <div className='flex flex-col sm:flex-row items-center gap-3'>
          <Button variant='outline' onClick={requestCurrentLocation} disabled={loading} className='gap-2'>
            <RefreshCw className='w-4 h-4' /> Refresh
          </Button>
          <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20 gap-2'>
            <MapPin className='w-3 h-3' /> {locationLabel}
          </Badge>
        </div>
      </header>

      <div className='grid gap-4 md:grid-cols-[1fr_280px]'>
        <Card className='glass-card border-none shadow-2xl'>
          <CardContent className='p-6 space-y-6'>
            <div className='space-y-2'>
              <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground font-black'>Live Prayer Node</p>
              <p className='text-sm text-muted-foreground'>Your prayer schedule is connected to AlAdhan's API and the universal Qibla node.</p>
            </div>

            {loading ? (
              <div className='h-[240px] flex flex-col items-center justify-center gap-3 text-muted-foreground'>
                <Loader2 className='w-10 h-10 animate-spin text-primary opacity-40' />
                Fetching prayer times…
              </div>
            ) : error ? (
              <div className='rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-100'>
                {error}
              </div>
            ) : (
              <ul className='divide-y divide-white/5'>
                {prayerTimes.map((prayer) => (
                  <li
                    key={prayer.name}
                    className={cn(
                      'flex items-center justify-between p-6 transition-colors',
                      prayer.isNext && 'bg-primary/10'
                    )}
                  >
                    <div className='flex items-center gap-4'>
                      <div
                        className={cn(
                          'p-3 rounded-full',
                          prayer.isNext ? 'bg-primary/20 text-primary' : 'bg-muted-foreground/10 text-muted-foreground'
                        )}
                      >
                        {prayerIcons[prayer.name]}
                      </div>
                      <div>
                        <p className='text-lg font-bold text-white'>{prayer.name}</p>
                        <p className='text-xs text-muted-foreground'>Adhan / Iqamah</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-xl font-headline font-bold text-white'>{prayer.time}</p>
                      {prayer.isNext && (
                        <Badge variant='success' className='mt-1 text-[9px] uppercase font-black tracking-widest'>
                          Next Prayer
                        </Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className='glass-card border-none shadow-2xl p-6 space-y-6'>
          <div className='flex items-center gap-3'>
            <Compass className='w-6 h-6 text-emerald-400' />
            <div>
              <p className='text-sm font-bold text-white'>Qibla Direction</p>
              <p className='text-xs text-muted-foreground'>Based on your current coordinates.</p>
            </div>
          </div>

          <div className='rounded-3xl border border-white/5 bg-white/5 p-6 flex flex-col items-center justify-center gap-4 text-center'>
            <div className='relative w-32 h-32 rounded-full bg-background/80 border border-white/10 flex items-center justify-center'>
              <div className='absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent' />
              <div
                className='absolute w-0.5 h-24 bg-emerald-300 origin-bottom'
                style={{ transform: `rotate(${qiblaDirection ?? 0}deg)` }}
              />
              <span className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>N</span>
            </div>
            <div>
              <p className='text-2xl font-semibold text-white'>{qiblaDirection ?? '--'}°</p>
              <p className='text-xs text-muted-foreground uppercase tracking-[0.3em]'>from true north</p>
            </div>
          </div>

          <div className='space-y-3'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Search className='w-4 h-4' />
              <p>Enter a city name if GPS is unavailable.</p>
            </div>
            <div className='flex gap-2'>
              <Input
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder='Search city name'
                className='glass-card h-12'
              />
              <Button onClick={handleSearch} disabled={loading} className='h-12'>
                Search
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className='text-center'>
        <Button variant='ghost' size='lg' className='gap-2'>
          <Bell className='w-4 h-4' />
          Manage Notifications
        </Button>
      </div>
    </div>
  );
}
