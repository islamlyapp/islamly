
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Database,
  Quote,
  History,
  Layers,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PurposePage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-indigo-500/5">
          <Target className="w-10 h-10 text-indigo-400" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">The Great Purpose</h1>
          <p className="text-muted-foreground italic">Answering the ultimate questions of existence.</p>
        </div>
      </header>

      <Card className="bg-indigo-500/5 border-indigo-500/20 p-8 rounded-3xl text-center space-y-6">
        <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Why were we created?</h3>
        <p className="text-literata text-lg text-muted-foreground leading-relaxed">
          "And I did not create the jinn and mankind except to worship Me." [51:56]
        </p>
        <div className="flex justify-center">
          <Badge className="bg-indigo-600 text-[10px] font-black uppercase px-4 py-1">Core Decree Active</Badge>
        </div>
      </Card>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">The Three Fundamental Principles</h3>
        {[
          { id: 1, title: "Knowledge of Allah", desc: "Recognizing the Creator through His Names, Attributes, and creative power.", nodes: "1.2 Quadrillion" },
          { id: 2, title: "Knowledge of the Religion", desc: "Understanding Islam through evidence from the Quran and Sunnah.", nodes: "850 Trillion" },
          { id: 3, title: "Knowledge of the Prophet", desc: "Following the final messenger (PBUH) as the perfect example of purpose.", nodes: "2.1 Quadrillion" },
        ].map((item) => (
          <Card key={item.id} className="glass-card group hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                  <span className="font-black text-indigo-400 text-lg">0{item.id}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-500/5 border border-indigo-500/10 shrink-0">
                      <Layers className="w-2.5 h-2.5 text-indigo-400 opacity-60" />
                      <span className="text-[7px] font-bold text-indigo-400 uppercase tracking-tighter">{item.nodes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-indigo-400 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 space-y-6 text-center">
        <Sparkles className="w-10 h-10 text-indigo-400 mx-auto animate-pulse" />
        <div className="space-y-2">
          <h3 className="text-xl font-headline font-bold text-white">Initialize Alignment</h3>
          <p className="text-sm text-muted-foreground italic max-w-sm mx-auto">
            Sync your daily actions with the eternal purpose of creation through structured learning.
          </p>
        </div>
        <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-md font-headline font-black uppercase tracking-widest shadow-xl shadow-indigo-900/20">
          Begin Purpose Path <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Purpose Index v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
