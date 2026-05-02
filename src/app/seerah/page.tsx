'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Milestone, ChevronRight, ChevronLeft } from 'lucide-react';
import { SEERAH_DATA, SeerahEvent } from '@/lib/seerah-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SeerahPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SEERAH_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + SEERAH_DATA.length) % SEERAH_DATA.length
    );
  };

  const currentEvent = SEERAH_DATA[currentIndex];

  return (
    <div className='space-y-8 animate-in fade-in duration-500 pb-16 max-w-4xl mx-auto'>
      <header className='flex items-center justify-between gap-4 bg-secondary/10 p-8 rounded-[2.5rem] border border-white/5'>
        <div className='flex items-center gap-4'>
          <div className='p-3 bg-primary/20 rounded-2xl'>
            <BookOpen className='w-8 h-8 text-primary' />
          </div>
          <div>
            <h1 className='text-3xl font-headline font-black text-white uppercase tracking-tight'>
              The Prophet's Journey
            </h1>
            <p className='text-muted-foreground italic text-sm'>
              Key milestones from the life of Prophet Muhammad (ﷺ).
            </p>
          </div>
        </div>
      </header>

      <div className='relative h-[550px]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className='w-full h-full absolute'
          >
            <Card className='glass-card border-none shadow-2xl h-full flex flex-col'>
              <CardHeader className='p-8 bg-black/20 border-b border-white/5'>
                <div className='flex justify-between items-start'>
                  <div className='space-y-2'>
                    <Badge
                      variant={currentEvent.era === 'Meccan' ? 'secondary' : 'default'}
                      className='text-[10px] uppercase font-black tracking-widest'
                    >
                      {currentEvent.era} Period
                    </Badge>
                    <CardTitle className='text-2xl font-headline font-bold text-white'>
                      {currentEvent.title}
                    </CardTitle>
                    <p className='text-sm text-muted-foreground'>
                      Year {currentEvent.year} AD
                    </p>
                  </div>
                  <Milestone className='w-10 h-10 text-primary' />
                </div>
              </CardHeader>
              <CardContent className='p-8 flex-1 flex flex-col justify-between'>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  {currentEvent.description}
                </p>
                <div className='space-y-4'>
                  <h3 className='text-sm font-bold uppercase tracking-widest text-primary'>
                    Key Lessons & Takeaways
                  </h3>
                  <ul className='space-y-3 list-disc list-inside text-muted-foreground'>
                    {currentEvent.lessons.map((lesson, i) => (
                      <li key={i} className='italic'>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='flex justify-between items-center'>
        <Button
          variant='outline'
          className='rounded-xl h-14 px-8 gap-3 border-white/5 hover:bg-white/5 font-headline font-black uppercase text-[10px] tracking-widest group'
          onClick={handlePrev}
        >
          <ChevronLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          Previous Event
        </Button>
        <div className='flex gap-2'>
          {SEERAH_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                currentIndex === i ? 'bg-primary scale-125' : 'bg-muted-foreground/20'
              )}
            />
          ))}
        </div>
        <Button
          variant='outline'
          className='rounded-xl h-14 px-8 gap-3 border-white/5 hover:bg-white/5 font-headline font-black uppercase text-[10px] tracking-widest group'
          onClick={handleNext}
        >
          Next Event
          <ChevronRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
        </Button>
      </div>
    </div>
  );
}
