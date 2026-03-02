
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const adhkarData = {
  morning: [
    {
      id: 1,
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      transliteration: "Asbahna wa-asbahal-mulku lillahi walhamdu lillahi, la ilaha illallahu wahdahu la sharika lahu.",
      translation: "We have entered a new day and with it all dominion is Allah's. Praise is to Allah. None has the right to be worshipped but Allah alone, Who has no partner.",
      count: 1
    },
    {
      id: 2,
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      transliteration: "Subhanallahi wa bihamdihi.",
      translation: "Glory is to Allah and praise is to Him.",
      count: 100
    }
  ],
  evening: [
    {
      id: 3,
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
      transliteration: "Amsayna wa-amsal-mulku lillah...",
      translation: "We have entered the evening and with it all dominion is Allah's...",
      count: 1
    }
  ]
};

export default function AdhkarPage() {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleComplete = (id: number) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-headline font-bold">Daily Adhkar</h1>
        <p className="text-muted-foreground italic">Remembrance of the Most Merciful.</p>
      </header>

      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-1">
          <TabsTrigger value="morning" className="data-[state=active]:bg-primary data-[state=active]:text-white">Morning</TabsTrigger>
          <TabsTrigger value="evening" className="data-[state=active]:bg-primary data-[state=active]:text-white">Evening</TabsTrigger>
        </TabsList>

        <TabsContent value="morning" className="mt-6 space-y-4">
          {adhkarData.morning.map((dhikr) => (
            <DhikrCard 
              key={dhikr.id} 
              dhikr={dhikr} 
              isCompleted={completed.includes(dhikr.id)}
              onToggle={() => toggleComplete(dhikr.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="evening" className="mt-6 space-y-4">
          {adhkarData.evening.map((dhikr) => (
            <DhikrCard 
              key={dhikr.id} 
              dhikr={dhikr} 
              isCompleted={completed.includes(dhikr.id)}
              onToggle={() => toggleComplete(dhikr.id)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DhikrCard({ dhikr, isCompleted, onToggle }: { dhikr: any, isCompleted: boolean, onToggle: () => void }) {
  return (
    <Card className={cn("glass-card transition-all", isCompleted && "opacity-60 border-primary/20 bg-primary/5")}>
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <Badge variant="secondary" className="font-headline">{dhikr.count}x</Badge>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggle}>
            <CheckCircle2 className={cn("h-5 w-5", isCompleted ? "text-primary fill-primary" : "text-muted-foreground")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        <p className="text-2xl font-serif text-literata leading-loose text-right" dir="rtl">
          {dhikr.arabic}
        </p>
        <div className="space-y-3">
          <p className="text-sm text-accent italic">{dhikr.transliteration}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{dhikr.translation}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
