'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DUA_DATA } from '@/lib/dua-data';
import {
  Sunrise,
  Shield,
  BookOpen,
  Copy,
  Check,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: { [key: string]: React.ReactNode } = {
  Sunrise: <Sunrise className='w-5 h-5 mr-2' />,
  Shield: <Shield className='w-5 h-5 mr-2' />,
  BookOpen: <BookOpen className='w-5 h-5 mr-2' />,
};

export default function DuaPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className='space-y-8 animate-in fade-in duration-500 pb-16 max-w-4xl mx-auto'>
      <header className='flex items-center justify-between gap-4 bg-secondary/10 p-8 rounded-[2.5rem] border border-white/5'>
        <div className='flex items-center gap-4'>
          <div className='p-3 bg-primary/20 rounded-2xl'>
            <Heart className='w-8 h-8 text-primary' />
          </div>
          <div>
            <h1 className='text-3xl font-headline font-black text-white uppercase tracking-tight'>
              Supplications
            </h1>
            <p className='text-muted-foreground italic text-sm'>
              A collection of daily prayers from the Quran & Sunnah.
            </p>
          </div>
        </div>
      </header>

      <Tabs defaultValue='morning-evening' className='w-full'>
        <TabsList className='grid w-full grid-cols-3 h-16 glass-card p-2'>
          {DUA_DATA.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className='flex items-center justify-center text-xs font-bold uppercase tracking-widest h-full rounded-lg'
            >
              {iconMap[category.icon]} {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {DUA_DATA.map((category) => (
          <TabsContent key={category.id} value={category.id} className='mt-6'>
            <div className='space-y-4'>
              {category.duas.map((dua) => (
                <Card key={dua.id} className='glass-card border-none shadow-lg'>
                  <CardHeader>
                    <CardTitle className='text-lg font-headline font-bold text-white'>
                      {dua.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <p
                      className='text-2xl font-serif text-literata leading-loose text-right'
                      dir='rtl'
                    >
                      {dua.text_ar}
                    </p>
                    <p className='text-md text-muted-foreground leading-relaxed italic'>
                      {dua.text_en}
                    </p>
                  </CardContent>
                  <div className='flex justify-between items-center p-4 bg-black/10 border-t border-white/5'>
                    <p className='text-xs text-muted-foreground font-mono'>
                      {dua.reference}
                    </p>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(dua.text_ar, dua.id)}
                    >
                      {copiedId === dua.id ? (
                        <Check className='w-4 h-4 text-green-500' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                      <span className='ml-2 text-xs'>
                        {copiedId === dua.id ? 'Copied!' : 'Copy'}
                      </span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
