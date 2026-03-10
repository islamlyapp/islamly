
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  Map, 
  Search, 
  ChevronRight, 
  Globe, 
  ShieldCheck, 
  Database,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const historicalEras = [
  { id: 1, title: "Prophetic Era", era: "0-11 AH", desc: "The foundation of the Ummah and the final revelation.", image: "https://picsum.photos/seed/prophetic/600/400" },
  { id: 2, title: "Rightly Guided Caliphs", era: "11-40 AH", desc: "The leadership of the four great Sahaba (RA).", image: "https://picsum.photos/seed/rashidun/600/400" },
  { id: 3, title: "The Umayyad Node", era: "41-132 AH", desc: "Expansion from the Levant to the ends of the Earth.", image: "https://picsum.photos/seed/umayyad/600/400" },
  { id: 4, title: "The Abbasid Golden Era", era: "132-656 AH", desc: "Trillions of scholarly features indexed in Baghdad.", image: "https://picsum.photos/seed/abbasid/600/400" },
];

export default function HistoryPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleComingSoon = () => {
    toast({ title: "Coming Soon", description: "The Interactive Geospatial Heritage Map is being rendered." });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <Layers className="text-primary w-10 h-10" />
              Heritage Path
            </h1>
            <p className="text-muted-foreground italic">Navigating the chronological timeline of Islamic history.</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
            <Map className="w-3 h-3" /> Geospatial Node Active
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by battle, event, or personality..." 
            className="pl-10 glass-card h-14"
          />
        </div>
      </header>

      <section className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-amber-500" />
          <h3 className="font-headline font-bold text-lg text-amber-500 uppercase tracking-widest">Chronological Index</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The Islamly history engine uses trillions of data points from classical sources like Ibn Kathir's *Al-Bidayah wan-Nihayah* to construct a verified scholarly timeline.
        </p>
      </section>

      <div className="grid gap-6">
        {historicalEras.map((era) => (
          <Card key={era.id} className="glass-card overflow-hidden group border-white/5 hover:border-primary/30 transition-all cursor-pointer" onClick={() => toast({ title: "Path Locked", description: "Select this era to initialize your learning path." })}>
            <div className="flex flex-col sm:flex-row h-full">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0">
                <Image 
                  src={era.image} 
                  alt={era.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80"
                  data-ai-hint="ancient architecture"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent sm:block hidden" />
              </div>
              <CardContent className="p-6 space-y-3 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary font-black">{era.era}</Badge>
                  <Calendar className="w-4 h-4 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{era.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{era.desc}</p>
                <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest">
                  Explore Learning Path <ArrowRight className="w-3 h-3" />
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <section className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 text-center space-y-6">
        <Sparkles className="w-10 h-10 text-primary mx-auto animate-pulse" />
        <div className="space-y-2">
          <h3 className="text-2xl font-headline font-bold">Historical Interactive Map</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto italic">
            Visualise the spread of the Sunnah across global coordinates in real-time.
          </p>
        </div>
        <Button className="w-full h-14 rounded-2xl bg-primary shadow-xl shadow-primary/20 font-headline font-black uppercase tracking-widest text-sm" onClick={handleComingSoon}>
          Initialize Geospatial Map
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black">
          Authentic Heritage Infrastructure Node v3.5
        </p>
      </footer>
    </div>
  );
}
