'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Feather } from 'lucide-react';
import { HADITH_DATA } from '@/lib/hadith-data';

export default function HadithPage() {
  return (
    <div className='space-y-8 animate-in fade-in duration-500 pb-16 max-w-4xl mx-auto'>
      <header className='flex items-center justify-between gap-4 bg-secondary/10 p-8 rounded-[2.5rem] border border-white/5'>
        <div className='flex items-center gap-4'>
          <div className='p-3 bg-primary/20 rounded-2xl'>
            <Feather className='w-8 h-8 text-primary' />
          </div>
          <div>
            <h1 className='text-3xl font-headline font-black text-white uppercase tracking-tight'>
              Prophetic Traditions
            </h1>
            <p className='text-muted-foreground italic text-sm'>
              A curated collection of authentic narrations (Ahadith).
            </p>
          </div>
        </div>
      </header>

      <div className='space-y-6'>
        {HADITH_DATA.map((hadith) => (
          <Card key={hadith.id} className='glass-card border-none shadow-lg'>
            <CardHeader className='p-6 bg-black/10 border-b border-white/5'>
              <div className='flex justify-between items-start'>
                <div className='space-y-2'>
                  <CardTitle className='text-xl font-headline font-bold text-white'>
                    {hadith.collection} {hadith.hadith_number}
                  </CardTitle>
                  <p className='text-xs text-muted-foreground font-mono'>
                    {hadith.book}
                  </p>
                </div>
                <Badge
                  variant={hadith.grade === 'Sahih (Authentic)' ? 'success' : 'warning'}
                  className='text-[10px] uppercase font-black tracking-widest'
                >
                  {hadith.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='p-6 space-y-4'>
              <p
                className='text-2xl font-serif text-literata leading-loose text-right'
                dir='rtl'
              >
                {hadith.text_ar}
              </p>
              <p className='text-md text-muted-foreground leading-relaxed italic'>
                {hadith.text_en}
              </p>
            </CardContent>
            <CardFooter className='p-4 bg-black/10 border-t border-white/5 text-xs text-muted-foreground'>
              <p>Narrated by: {hadith.narrator}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
