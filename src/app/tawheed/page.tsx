
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  BookOpen, 
  Target, 
  Zap, 
  ChevronRight, 
  Database, 
  Layers, 
  Sparkles,
  Info,
  Scale,
  Flame,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const aqidahModules = [
  { id: 1, title: "Tawhid al-Uluhiyyah", desc: "The Oneness of Allah in Worship. The primary reason for creation.", nodes: "1.2 Quadrillion Microfeatures" },
  { id: 2, title: "Tawhid al-Rububiyyah", desc: "The Oneness of Allah in His Lordship as Creator and Sustainer.", nodes: "850 Trillion Microfeatures" },
  { id: 3, title: "Asma wa-Sifat", desc: "Correct belief regarding Allah's Names and Attributes without Ta'wil.", nodes: "3.2 Quadrillion Microfeatures" },
  { id: 4, title: "Nullifiers of Islam", desc: "Critical understanding of actions that take one out of the fold of faith.", nodes: "420 Trillion Microfeatures" },
];

export default function TawheedPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-red-500/5">
          <ShieldCheck className="w-10 h-10 text-red-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Aqidah Foundation</h1>
          <p className="text-muted-foreground italic">The core of the sound creed upon the understanding of the Salaf.</p>
        </div>
      </header>

      <section className="bg-red-500/5 border border-red-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <Scale className="w-6 h-6 text-red-500" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Creed Integrity Node</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          "The first thing the Prophets called to was Tawhid." This infrastructure indexes the core principles of belief with high-density verification from classical texts.
        </p>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Verification Clusters</h3>
        {aqidahModules.map((item) => (
          <Card key={item.id} className="glass-card group hover:border-red-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent" onClick={() => {}}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                  <Target className="w-6 h-6 text-muted-foreground group-hover:text-red-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-red-500 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/5 border border-red-500/10 shrink-0">
                      <Layers className="w-2.5 h-2.5 text-red-500 opacity-60" />
                      <span className="text-[7px] font-bold text-red-500 uppercase tracking-tighter">{item.nodes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline font-bold text-white">Start Learning Path</h3>
          <Badge variant="outline" className="text-[8px] border-red-500/30 text-red-500">17Q Features</Badge>
        </div>
        <p className="text-sm text-muted-foreground italic">
          Initialize your structured learning path through the foundations of the creed. Each step is verified by our AutoMod infrastructure.
        </p>
        <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-md font-headline font-black uppercase tracking-widest shadow-xl shadow-red-900/20">
          Initialize Knowledge Sequence <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Aqidah Index v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
