'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Sun, Moon, Sunrise, Sunset, Bell } from 'lucide-react';
import { PRAYER_TIMES_DATA, PrayerTime } from '@/lib/prayer-times-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const prayerIcons = {
  Fajr: <Sunrise className='w-6 h-6' />,
  Dhuhr: <Sun className='w-6 h-6' />,
  Asr: <Sun className='w-6 h-6' />,
  Maghrib: <Sunset className='w-6 h-6' />,
  Isha: <Moon className='w-6 h-6' />,
};

export default function PrayerTimesPage() {
  return (
    <div className='space-y-8 animate-in fade-in duration-500 pb-16 max-w-2xl mx-auto'>
      <header className='flex flex-col items-center text-center gap-4 bg-secondary/10 p-8 rounded-[2.5rem] border border-white/5'>
        <div className='p-3 bg-primary/20 rounded-2xl'>
          <Clock className='w-8 h-8 text-primary' />
        </div>
        <h1 className='text-3xl font-headline font-black text-white uppercase tracking-tight'>
          Daily Prayer Schedule
        </h1>
        <p className='text-muted-foreground italic text-sm max-w-md'>
          Based on your current location. Times are updated automatically.
        </p>
        <Button variant='outline' className='mt-2'>
          Change Location
        </Button>
      </header>

      <Card className='glass-card border-none shadow-2xl'>
        <CardContent className='p-0'>
          <ul className='divide-y divide-white/5'>
            {PRAYER_TIMES_DATA.map((prayer, index) => (
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
                  <p className='text-xl font-headline font-bold text-white'>
                    {prayer.time}
                  </p>
                  {prayer.isNext && (
                    <Badge
                      variant='success'
                      className='mt-1 text-[9px] uppercase font-black tracking-widest'
                    >
                      Next Prayer
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className='text-center'>
        <Button variant='ghost' size='lg' className='gap-2'>
          <Bell className='w-4 h-4' />
          Manage Notifications
        </Button>
      </div>
    </div>
  );
}
