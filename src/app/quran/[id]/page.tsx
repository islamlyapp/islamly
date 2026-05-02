
"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlayCircle, Settings, Share2, BookOpen } from "lucide-react";
import { useParams } from 'next/navigation';

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

export default function QuranPage() {
  const params = useParams();
  const [showTafsir, setShowTafsir] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="glass-card p-4 rounded-lg flex items-center justify-between">
        <Button variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold font-headline text-white">{surahDetails.name}</h1>
          <p className="text-sm text-muted-foreground">{surahDetails.englishName} • {surahDetails.revelationType}</p>
        </div>
        <Button variant="ghost" size="icon">
          <ChevronRight />
        </Button>
      </header>

      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" className="gap-2 flex-1">
            <PlayCircle className="w-4 h-4" />
            Recite
        </Button>
        <Button variant="outline" className="gap-2 flex-1">
            <Share2 className="w-4 h-4" />
            Share
        </Button>
        <Button variant="outline" className="gap-2 flex-1">
            <Settings className="w-4 h-4" />
            Settings
        </Button>
      </div>

      <main className="space-y-4">
        {ayahs.map((ayah, index) => (
          <Card key={index} className="glass-card p-4">
            <div className="flex justify-between items-start">
                <p className="text-lg font-arabic leading-loose text-right w-full">{ayah.translation}</p>
            </div>
            <p className="text-muted-foreground mt-4">{ayah.number}. {ayah.text}</p>
            <div className="flex gap-2 mt-4">
                <Button size="sm" variant="ghost" className="gap-1" onClick={() => setShowTafsir(showTafsir === ayah.number ? null : ayah.number)}>
                    <BookOpen className="w-3 h-3"/>
                    Tafsir
                </Button>
            </div>
            {showTafsir === ayah.number && (
                <div className="mt-4 p-4 bg-background/50 rounded-lg text-sm text-muted-foreground">
                    <p>Tafsir for ayah {ayah.number} would be displayed here. This section is ready to be connected to a data source to provide detailed explanations.</p>
                </div>
            )}
          </Card>
        ))}
      </main>
    </div>
  );
}
