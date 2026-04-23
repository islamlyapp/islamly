"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  Fingerprint, 
  Sun, 
  Moon, 
  Clock, 
  CheckCircle2,
  Volume2,
  Database,
  Pause,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const adhkars = {
  morning: [
    { title: "Ayat al-Kursi", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", trans: "Recite once for protection until evening.", count: 1 },
    { title: "Al-Mu'awwidhatayn", arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (1) مِن شَرِّ مَا خَلَقَ (2) وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ (3) وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ (4) وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ (5) . قُلْ أَعُوذُ بِرَبِّ النَّاسِ (1) مَلِكِ النَّاسِ (2) إِلَٰهِ النَّاسِ (3) مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ (4) الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ (5) مِنَ الْجِنَّةِ وَالنَّاسِ (6)", trans: "Recite three times each.", count: 3 },
    { title: "Sayyidul Istighfar", arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطعتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", trans: "The chief supplication for forgiveness.", count: 1 },
  ],
  evening: [
    { title: "Ayat al-Kursi", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", trans: "Recite once for protection until morning.", count: 1 },
    { title: "Mu'awwidhatayn (Evening)", arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (1) مِن شَرِّ مَا خَلَقَ (2) وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ (3) وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ (4) وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ (5) . قُلْ أَعُوذُ بِرَبِّ النَّاسِ (1) مَلِكِ النَّاسِ (2) إِلَٰهِ النَّاسِ (3) مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ (4) الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ (5) مِنَ الْجِنَّةِ وَالنَّاسِ (6)", trans: "Recite three times each.", count: 3 },
    { title: "Protection from Harm", arabic: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ فِي الْأَرْضِ وَلَا فِي السَّمَاء وَهُوَ السَّمِيعُ الْعَلِيمُ", trans: "Nothing shall harm you.", count: 3 },
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const saved = localStorage.getItem("islamly-adhkar-progress");
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load progress");
      }
    }
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("islamly-adhkar-progress", JSON.stringify(completed));
    }
  }, [completed, hasMounted]);

  const handleTap = (id: string, max: number) => {
    setCompleted(prev => {
      const current = prev[id] || 0;
      if (current >= max) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  const resetCount = (id: string) => {
    setCompleted(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const resetAll = () => {
    setCompleted({});
    toast({ title: "Cycle Reset", description: "All remembrances have been recalibrated." });
  };

  const handleAudioSync = () => {
    if (!audioRef.current) {
      setIsLoadingAudio(true);
      const audio = new Audio("https://www.islamcan.com/audio/adhan/azan1.mp3");
      audio.oncanplaythrough = () => {
        setIsLoadingAudio(false);
        audio.play();
        setIsPlaying(true);
      };
      audio.onended = () => setIsPlaying(false);
      audioRef.current = audio;
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-24 h-24 bg-yellow-500/20 rounded-[2.5rem] flex items-center justify-center mb-4 ring-8 ring-yellow-500/5 rotate-12">
          <Zap className="w-12 h-12 text-yellow-500 fill-yellow-500/20" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Divine Adhkar</h1>
          <p className="text-muted-foreground italic text-lg">Essential remembrances for spiritual fortification.</p>
        </div>
      </header>

      <Tabs defaultValue="morning" onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between gap-4 mb-6">
          <TabsList className="grid flex-1 grid-cols-3 bg-secondary/50 p-1 h-12 rounded-xl">
            <TabsTrigger value="morning" className="gap-2 rounded-lg">
              <Sun className="w-4 h-4" /> Morning
            </TabsTrigger>
            <TabsTrigger value="evening" className="gap-2 rounded-lg">
              <Moon className="w-4 h-4" /> Evening
            </TabsTrigger>
            <TabsTrigger value="daily" className="gap-2 rounded-lg">
              <Clock className="w-4 h-4" /> General
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 rounded-xl border-white/5" onClick={resetAll}>
            <RotateCcw className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {Object.entries(adhkars).map(([key, items]) => (
          <TabsContent key={key} value={key} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {items.map((item, idx) => {
              const id = `${key}-${idx}`;
              const count = completed[id] || 0;
              const isDone = count >= item.count;

              return (
                <Card 
                  key={id} 
                  className={cn(
                    "glass-card transition-all active:scale-[0.98] cursor-pointer group relative overflow-hidden border-2 rounded-2xl",
                    isDone ? "border-emerald-500/30 bg-emerald-500/5" : "border-transparent"
                  )}
                  onClick={() => handleTap(id, item.count)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-headline font-bold text-xl">{item.title}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black italic">{item.trans}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-in zoom-in" />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center font-black text-xl text-primary border border-white/5 shadow-inner">
                            {item.count - count}
                          </div>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 opacity-20 hover:opacity-100 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); resetCount(id); }}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-3xl md:text-4xl font-serif text-literata text-right leading-loose py-4 text-white/90" dir="rtl">
                      {item.arabic}
                    </p>

                    <div className="absolute bottom-0 left-0 h-1.5 bg-primary/20 transition-all duration-500" style={{ width: `${(count / item.count) * 100}%` }} />
                    
                    {!isDone && (
                      <div className="flex justify-center pt-2 opacity-40 group-hover:opacity-100 transition-all">
                        <span className="text-[8px] uppercase font-black tracking-[0.4em] text-primary flex items-center gap-2">
                          <Fingerprint className="w-3 h-3" /> Tap to Progress
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

      <section className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black uppercase text-primary tracking-widest">Fortress of the Student</p>
            <p className="text-[11px] text-muted-foreground italic leading-relaxed max-w-xs">These adhkars are compiled from Hisnul Muslim based on authentic sources of the Sunnah.</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-14 px-8 rounded-2xl text-[10px] uppercase font-black tracking-widest border-primary/20 gap-2 hover:bg-primary/5" 
          onClick={handleAudioSync}
          disabled={isLoadingAudio}
        >
          {isLoadingAudio ? <Loader2 className="w-4 h-4 animate-spin" /> : isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isPlaying ? "Stop Audio System" : "Initialize Audio System"}
        </Button>
      </section>

      <footer className="text-center pt-12 opacity-40">
        <div className="flex justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.5em] font-black italic">
            Universal Scholarly Remembrances
          </p>
        </div>
      </footer>
    </div>
  );
}
