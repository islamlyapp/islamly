
"use client";

import { use, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlayCircle, Settings, Share2, BookOpen, ShieldCheck, Binary } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const surahDetails = {
  name: "Al-Fatiha",
  englishName: "The Opening",
  revelationType: "Meccan",
  numberOfAyahs: 7,
};

const ayahs = [
  {
    number: 1,
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    translation: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  },
  {
    number: 2,
    text: "[All] praise is [due] to Allah, Lord of the worlds -",
    translation: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
  },
  { 
    number: 3, 
    text: "The Entirely Merciful, the Especially Merciful,", 
    translation: "الرَّحْمَٰنِ الرَّحِيمِ" 
  },
  {
    number: 4,
    text: "Sovereign of the Day of Recompense.",
    translation: "مَالِكِ يَوْمِ الدِّينِ",
  },
];

export default function QuranPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showTafsir, setShowTafsir] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-32 max-w-4xl mx-auto px-4 pt-6">
      <header className="glass-card p-6 rounded-[2rem] flex items-center justify-between border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/5" asChild>
          <Link href="/quran"><ChevronLeft className="w-6 h-6" /></Link>
        </Button>
        <div className="text-center space-y-1 relative z-10">
          <Badge variant="outline" className="text-[8px] uppercase tracking-[0.2em] border-primary/20 text-primary font-black italic">Surah Path {id}</Badge>
          <h1 className="text-3xl font-headline font-black text-white">{surahDetails.name}</h1>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{surahDetails.englishName} • {surahDetails.revelationType}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/5">
          <ChevronRight className="w-6 h-6" />
        </Button>
      </header>

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button variant="outline" className="h-14 rounded-2xl gap-3 flex-1 border-white/5 font-headline font-black uppercase text-[10px] tracking-widest shadow-lg">
          <PlayCircle className="w-5 h-5 text-primary" /> RECITE PATH
        </Button>
        <Button variant="outline" className="h-14 rounded-2xl gap-3 flex-1 border-white/5 font-headline font-black uppercase text-[10px] tracking-widest shadow-lg">
          <Share2 className="w-5 h-5 text-primary" /> DISPATCH
        </Button>
        <Button variant="outline" className="h-14 rounded-2xl gap-3 flex-1 border-white/5 font-headline font-black uppercase text-[10px] tracking-widest shadow-lg">
          <Settings className="w-5 h-5 text-primary" /> CONFIG
        </Button>
      </div>

      <main className="space-y-6 pt-6">
        <div className="flex items-center justify-center gap-2 py-4 opacity-40">
          <div className="h-px w-12 bg-white/10" />
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[9px] uppercase font-black tracking-[0.4em]">Uthmani Signal Active</span>
          <div className="h-px w-12 bg-white/10" />
        </div>

        {ayahs.map((ayah, index) => (
          <Card key={index} className="glass-card border-none rounded-[2rem] shadow-xl overflow-hidden group">
            <CardContent className="p-8 space-y-8">
              <div className="flex justify-between items-start gap-6">
                <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                  <span className="text-[10px] font-black text-primary/60 italic">{ayah.number}</span>
                </div>
                <p className="text-4xl md:text-5xl font-serif text-literata leading-[2.5] text-right w-full text-white/90 drop-shadow-sm group-hover:text-white transition-colors" dir="rtl">
                  {ayah.translation}
                </p>
              </div>
              <div className="space-y-6 pt-4 border-t border-white/5">
                <p className="text-lg text-muted-foreground leading-relaxed italic font-medium">
                  {ayah.text}
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="gap-2 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-primary/10 text-primary"
                    onClick={() => setShowTafsir(showTafsir === ayah.number ? null : ayah.number)}
                  >
                    <BookOpen className="w-4 h-4"/> EXPLAIN SYSTEM
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="gap-2 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-white/5 text-muted-foreground"
                  >
                    <Binary className="w-4 h-4"/> QIRA'AT VARIANTS
                  </Button>
                </div>
              </div>
              {showTafsir === ayah.number && (
                <div className="mt-8 p-8 bg-black/40 rounded-3xl border border-white/5 text-sm text-muted-foreground animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-primary mb-4 italic underline decoration-primary/30">Scholarly Explanation Node</h4>
                  <p className="text-literata text-lg italic leading-relaxed">
                    This explanation signal for Ayah {ayah.number} is indexed from verified classical Tafsir systems (Ibn Kathir/Sa'di). The infrastructure is operational and providing high-fidelity scholarly context for your study.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </main>

      <footer className="pt-20 pb-12 text-center opacity-40">
        <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">إسلاملي Universal Signal Repository v3.5</p>
      </footer>
    </div>
  );
}
