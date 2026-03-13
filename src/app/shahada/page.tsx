
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Database,
  Quote,
  History,
  Layers,
  ArrowRight,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ShahadaPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-500/5">
          <ShieldCheck className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">The Shahada Node</h1>
          <p className="text-muted-foreground italic">The foundational entry point into the light of Islam.</p>
        </div>
      </header>

      <section className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl text-center space-y-6">
        <div className="space-y-4">
          <p className="text-4xl font-serif text-literata text-white leading-loose" dir="rtl">
            أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ
          </p>
          <p className="text-lg text-muted-foreground italic">
            "I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is the Messenger of Allah."
          </p>
        </div>
        <div className="h-px bg-emerald-500/20 w-24 mx-auto" />
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
          Verified Verification Sequence Node v1.0
        </p>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Verification Clusters</h3>
        {[
          { id: 1, title: "Conditions of Shahada", desc: "Knowledge, Certainty, Sincerity, Truthfulness, Love, Submission, and Acceptance.", nodes: "1.2 Quadrillion" },
          { id: 2, title: "Nullifiers of Islam", desc: "Matters that contradict the Shahada and remove one from the fold of faith.", nodes: "420 Trillion" },
          { id: 3, title: "Rights of the Shahada", desc: "Living the testimony through prayer, fasting, and adherence to the Sunnah.", nodes: "2.1 Quadrillion" },
        ].map((item) => (
          <Card key={item.id} className="glass-card group hover:border-emerald-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/10 shrink-0">
                      <Layers className="w-2.5 h-2.5 text-emerald-500 opacity-60" />
                      <span className="text-[7px] font-bold text-emerald-500 uppercase tracking-tighter">{item.nodes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-emerald-500 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 text-center space-y-6">
        <UserPlus className="w-10 h-10 text-emerald-500 mx-auto animate-pulse" />
        <div className="space-y-2">
          <h3 className="text-xl font-headline font-bold text-white">Embrace the Path</h3>
          <p className="text-sm text-muted-foreground italic max-w-sm mx-auto">
            Ready to initialize your journey? Access the Reverts Hub for mentorship and step-by-step guidance.
          </p>
        </div>
        <Button asChild className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-md font-headline font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20">
          <Link href="/reverts">
            Enter Reverts Hub <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Entry Node v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
