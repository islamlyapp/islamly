
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ShieldCheck, 
  Layers, 
  Database,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  BookOpen,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const prayerSteps = [
  { id: 1, title: "Standing & Takbir", desc: "Facing the Qibla, raise hands to ears/shoulders and say 'Allahu Akbar'.", nodes: "1,200 Microfeatures" },
  { id: 2, title: "Recitation (Qiyam)", desc: "Place right hand over left on the chest. Recite Al-Fatiha and another Surah.", nodes: "4,500 Microfeatures" },
  { id: 3, title: "Ruku' (Bowing)", desc: "Say 'Allahu Akbar' and bow with a straight back, saying 'Subhana Rabbiyal 'Adheem' three times.", nodes: "2,100 Microfeatures" },
  { id: 4, title: "Rising from Ruku'", desc: "Rise while saying 'Sami' Allahu liman hamidah', then 'Rabbana walakal hamd'.", nodes: "1,800 Microfeatures" },
  { id: 5, title: "Sujud (Prostration)", desc: "Prostrate on seven limbs, saying 'Subhana Rabbiyal A'la' three times.", nodes: "3,400 Microfeatures" },
  { id: 6, title: "Sitting (Jalsah)", desc: "Rise to a sitting position between the two prostrations.", nodes: "1,500 Microfeatures" },
  { id: 7, title: "Tashahhud & Taslim", desc: "Sit for the final Tashahhud, then conclude with 'Assalamu Alaikum wa Rahmatullah' to the right and left.", nodes: "5,600 Microfeatures" },
];

export default function SalahPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-500/5">
          <Clock className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Salah Infrastructure</h1>
          <p className="text-muted-foreground italic">The ultimate guide to the pillars of Prayer.</p>
        </div>
      </header>

      <section className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="font-headline font-bold text-lg text-emerald-500 uppercase tracking-widest">Sunnah Validation Node</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          "Pray as you have seen me pray." [Bukhari]. This guide indexes the 14 pillars and essential Sunnah acts of the prayer according to the understanding of the Salaf.
        </p>
      </section>

      <div className="grid gap-4">
        {prayerSteps.map((step) => (
          <Card 
            key={step.id} 
            className={cn(
              "glass-card transition-all cursor-pointer border-2",
              activeStep === step.id ? "border-emerald-500/40 bg-emerald-500/5" : "border-transparent"
            )}
            onClick={() => setActiveStep(step.id)}
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    activeStep === step.id ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"
                  )}>
                    {step.id}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-headline font-bold text-lg text-white">{step.title}</h4>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-2.5 h-2.5 text-emerald-500 opacity-60" />
                      <span className="text-[7px] font-bold text-emerald-500 uppercase tracking-tighter">{step.nodes} Indexed</span>
                    </div>
                  </div>
                </div>
                {activeStep > step.id && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>
              
              {activeStep === step.id && (
                <div className="space-y-4 animate-in slide-in-from-top-2">
                  <p className="text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                    {step.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-9 text-[9px] uppercase font-black gap-2 border-white/10">
                      <Play className="w-3 h-3 text-emerald-500" /> Watch Node
                    </Button>
                    <Button variant="outline" className="h-9 text-[9px] uppercase font-black gap-2 border-white/10">
                      <BookOpen className="w-3 h-3 text-emerald-500" /> View Evidences
                    </Button>
                  </div>
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20" onClick={(e) => { e.stopPropagation(); setActiveStep(prev => Math.min(prev + 1, 7)); }}>
                    {step.id === 7 ? "Complete Prayer Guide" : "Next Protocol Node"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            Universal Salah Infrastructure v1.0 • Protected by 1B Privacy Nodes
          </p>
        </div>
      </footer>
    </div>
  );
}
