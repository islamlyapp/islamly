
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Quote, 
  History, 
  ShieldCheck, 
  Database, 
  ChevronRight, 
  RotateCcw,
  Zap,
  Bookmark,
  Share2,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const inspirations = [
  { id: 1, text: "Knowledge is not what is memorized, but what benefits.", author: "Imam Ash-Shafi'i", era: "Salaf" },
  { id: 2, text: "If the heart is sound, the limbs will be sound.", author: "Prophetic Wisdom", era: "Foundation" },
  { id: 3, text: "Do not let the small number of people on the path of truth sadden you.", author: "Al-Fudayl ibn Iyad", era: "Salaf" },
  { id: 4, text: "The scholar is the one who fears Allah.", author: "Abdullah ibn Mas'ud (RA)", era: "Sahaba" },
  { id: 5, text: "Patience is a light.", author: "Prophetic Wisdom", era: "Foundation" },
];

export default function InspirationPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [currentIndex, setCurrentIndext] = useState(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const nextQuote = () => {
    setCurrentIndext((prev) => (prev + 1) % inspirations.length);
  };

  const handleAction = (msg: string) => {
    toast({ title: "Inspiration Node", description: msg });
  };

  if (!hasMounted) return null;

  const current = inspirations[currentIndex];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Spiritual Pulse</h1>
          <p className="text-muted-foreground italic">Daily wisdom from the luminous history of the Salaf.</p>
        </div>
      </header>

      <Card className="glass-card border-none shadow-2xl overflow-hidden relative group min-h-[400px] flex flex-col items-center justify-center text-center p-10">
        <div className="absolute top-0 left-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
          <Quote className="w-48 h-48" />
        </div>
        
        <CardContent className="space-y-8 relative z-10">
          <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary tracking-[0.2em] font-black">
            {current.era} Node Active
          </Badge>
          
          <div className="space-y-6">
            <p className="text-3xl md:text-4xl font-serif text-literata leading-relaxed italic text-white drop-shadow-lg animate-in slide-in-from-bottom-4">
              "{current.text}"
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="h-px w-12 bg-primary/40" />
              <p className="text-lg font-headline font-bold text-primary uppercase tracking-widest">{current.author}</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => handleAction("Saved to Favorites")}>
              <Heart className="w-5 h-5 text-rose-500" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => handleAction("Node Dispatched")}>
              <Share2 className="w-5 h-5 text-blue-400" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={() => handleAction("Archived to Profile")}>
              <Bookmark className="w-5 h-5 text-emerald-400" />
            </Button>
          </div>
        </CardContent>

        <div className="absolute bottom-6 w-full px-10 flex justify-center">
          <Button onClick={nextQuote} className="rounded-full h-14 px-10 gap-3 font-headline font-black uppercase tracking-widest shadow-xl shadow-primary/20">
            Next Wisdom Node <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <section className="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex gap-4">
        <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
        <div className="space-y-1">
          <h4 className="font-headline font-bold text-sm text-primary uppercase tracking-widest">Amanah Note</h4>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            This node only displays wisdom from authenticated Sahaba and the Righteous Predecessors. We avoid any philosophical or innovated "inspirational" content.
          </p>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Inspiration Node v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
