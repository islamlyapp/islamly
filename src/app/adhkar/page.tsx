
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  ShieldCheck, 
  Heart, 
  Star, 
  RotateCcw, 
  Fingerprint, 
  Sun, 
  Moon, 
  Clock, 
  CheckCircle2,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const adhkars = {
  morning: [
    { title: "Ayat al-Kursi", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...", trans: "Recite once for protection until evening.", count: 1 },
    { title: "Al-Mu'awwidhatayn", arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ...", trans: "Recite three times each.", count: 3 },
    { title: "Sayyidul Istighfar", arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ...", trans: "The chief supplication for forgiveness.", count: 1 },
  ],
  evening: [
    { title: "Ayat al-Kursi", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...", trans: "Recite once for protection until morning.", count: 1 },
    { title: "Last two verses of Baqarah", arabic: "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ...", trans: "Sufficient for the night.", count: 1 },
    { title: "Protection from Harm", arabic: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ...", trans: "Nothing shall harm you.", count: 3 },
  ],
  daily: [
    { title: "Tasbih", arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", trans: "Glorified is Allah and praised.", count: 100 },
    { title: "Tahmid", arabic: "الْحَمْدُ للهِ", trans: "Praise be to Allah.", count: 33 },
    { title: "Takbir", arabic: "اللهُ أَكْبَرُ", trans: "Allah is the Greatest.", count: 34 },
  ]
};

export default function AdhkarPage() {
  const [activeTab, setActiveTab] = useState("morning");
  const [completed, setCompleted] = useState<Record<string, number>>({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleTap = (id: string, max: number) => {
    setCompleted(prev => {
      const current = prev[id] || 0;
      if (current >= max) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  const resetCount = (id: string) => {
    setCompleted(prev => ({ ...prev, [id]: 0 }));
  };

  const handleComingSoon = () => {
    toast({ title: "Coming Soon", description: "This scholarly audio node is currently being indexed." });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-yellow-500/5">
          <Zap className="w-10 h-10 text-yellow-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold">Divine Adhkar</h1>
          <p className="text-muted-foreground italic">Essential remembrances for spiritual fortification.</p>
        </div>
      </header>

      <Tabs defaultValue="morning" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50 p-1 h-12">
          <TabsTrigger value="morning" className="gap-2">
            <Sun className="w-4 h-4" /> Morning
          </TabsTrigger>
          <TabsTrigger value="evening" className="gap-2">
            <Moon className="w-4 h-4" /> Evening
          </TabsTrigger>
          <TabsTrigger value="daily" className="gap-2">
            <Clock className="w-4 h-4" /> General
          </TabsTrigger>
        </TabsList>

        {Object.entries(adhkars).map(([key, items]) => (
          <TabsContent key={key} value={key} className="mt-6 space-y-4">
            {items.map((item, idx) => {
              const id = `${key}-${idx}`;
              const count = completed[id] || 0;
              const isDone = count >= item.count;

              return (
                <Card 
                  key={id} 
                  className={cn(
                    "glass-card transition-all active:scale-[0.98] cursor-pointer group relative overflow-hidden border-2",
                    isDone ? "border-emerald-500/30 bg-emerald-500/5" : "border-transparent"
                  )}
                  onClick={() => handleTap(id, item.count)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-headline font-bold text-lg">{item.title}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.trans}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-in zoom-in" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-black text-primary border border-white/5">
                            {item.count - count}
                          </div>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 opacity-40 hover:opacity-100"
                          onClick={(e) => { e.stopPropagation(); resetCount(id); }}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-3xl font-serif text-literata text-right leading-loose py-2" dir="rtl">
                      {item.arabic}
                    </p>

                    <div className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all" style={{ width: `${(count / item.count) * 100}%` }} />
                    
                    {/* Interaction Hint */}
                    {!isDone && (
                      <div className="flex justify-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] uppercase font-bold tracking-[0.3em] text-primary flex items-center gap-2">
                          <Fingerprint className="w-2.5 h-2.5" /> Tap Node to Progress
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>

      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <div className="space-y-0.5">
            <p className="text-xs font-bold uppercase text-primary">Fortress of the Student</p>
            <p className="text-[10px] text-muted-foreground">These adhkars are compiled from Hisnul Muslim based on authentic sources.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-[9px] uppercase font-black" onClick={handleComingSoon}>
          <Volume2 className="w-3 h-3 mr-1" /> Audio Node
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black italic">
          Scholarly Remembrances: Protected by 1 Billion Privacy Nodes
        </p>
      </footer>
    </div>
  );
}
