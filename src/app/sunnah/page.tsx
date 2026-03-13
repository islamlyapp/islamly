
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  ShieldCheck, 
  Database, 
  Layers, 
  ChevronRight, 
  Search, 
  BookOpen, 
  Star,
  Quote,
  History,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sunnahNodes = [
  { id: 1, title: "Manners of the Student", cat: "Adab", desc: "The foundational character required for seeking knowledge.", nodes: "15,400 Microfeatures" },
  { id: 2, title: "The Night Prayer", cat: "Worship", desc: "Virtues and methods of Qiyam al-Layl according to the Prophet (PBUH).", nodes: "12,800 Microfeatures" },
  { id: 3, title: "Etiquettes of Eating", cat: "Daily", desc: "Practicing the Sunnah in consumption and hospitality.", nodes: "9,500 Microfeatures" },
  { id: 4, title: "Travel Supplications", cat: "Protection", desc: "Authentic adhkar for the journey and safety.", nodes: "11,200 Microfeatures" },
];

export default function SunnahPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <Zap className="text-yellow-500 w-10 h-10" />
              The Sunnah Path
            </h1>
            <p className="text-muted-foreground italic">Living the guidance of the Final Messenger (PBUH).</p>
          </div>
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <ShieldCheck className="w-3 h-3 mr-1" /> Authentic Index
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Explore the Sunnah of daily life..." className="pl-10 glass-card h-14 focus-visible:ring-yellow-500/50" />
        </div>
      </header>

      <section className="bg-yellow-500/5 border border-yellow-500/20 p-6 rounded-3xl flex items-center gap-6">
        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0">
          <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h3 className="font-headline font-bold text-sm text-yellow-500 uppercase tracking-widest">Revival Infrastructure</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            "Whoever revives a Sunnah that has been forgotten after me, he will have a reward equal to those who act upon it." [Tirmidhi]
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        {sunnahNodes.map((node) => (
          <Card key={node.id} className="glass-card group hover:border-yellow-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-yellow-500/10 transition-colors">
                  <Star className="w-6 h-6 text-muted-foreground group-hover:text-yellow-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-lg group-hover:text-yellow-500 transition-colors">{node.title}</h3>
                    <Badge variant="outline" className="text-[8px] uppercase border-yellow-500/20 text-yellow-500">{node.cat}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{node.desc}</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-yellow-500/5 border border-yellow-500/10 shrink-0">
                      <Layers className="w-2.5 h-2.5 text-yellow-500 opacity-60" />
                      <span className="text-[7px] font-bold text-yellow-500 uppercase tracking-tighter">{node.nodes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-yellow-500 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/20 border-white/5 p-8 rounded-3xl text-center space-y-4">
        <Quote className="w-10 h-10 text-yellow-500 mx-auto opacity-20" />
        <p className="text-literata text-lg italic text-white leading-relaxed">
          "Stick to the path of guidance and do not be affected by the small number of those who follow it."
        </p>
        <div className="flex justify-center items-center gap-2">
          <History className="w-3 h-3 text-muted-foreground" />
          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Words of the Salaf</span>
        </div>
      </Card>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Sunnah Repository v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
