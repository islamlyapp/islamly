
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Moon, 
  Clock, 
  ShieldCheck, 
  Database, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen,
  Info,
  Sparkles,
  Zap,
  Mic2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const taraweehSteps = [
  { id: 1, title: "Intention (Niyyah)", desc: "Making the sincere intention to pray the voluntary night prayer for Allah's sake.", nodes: "1,200 Microfeatures" },
  { id: 2, title: "The Units (Rak'at)", desc: "Prayed in units of two, with the Taslim after every two Rak'ah.", nodes: "4,500 Microfeatures" },
  { id: 3, title: "Recitation Focus", desc: "Listening attentively to the Imam's recitation of the Noble Quran.", nodes: "8,200 Microfeatures" },
  { id: 4, title: "Completion (Witr)", desc: "Concluding the night prayer with an odd-numbered unit (1, 3, or 5).", nodes: "2,100 Microfeatures" },
];

export default function TaraweehPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-24 h-24 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center mb-4 ring-8 ring-indigo-500/5 rotate-12">
          <Moon className="w-12 h-12 text-indigo-400 fill-indigo-400/20" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-black text-white tracking-tight uppercase">Taraweeh Node</h1>
          <p className="text-muted-foreground italic">The spiritual harvest of the Ramadan nights.</p>
        </div>
      </header>

      <section className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Qiyam Protocol</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          "Whoever stands in prayer during Ramadan with faith and seeking reward, his previous sins will be forgiven." [Bukhari]. This guide follows the authentic Sunnah of the night prayer.
        </p>
      </section>

      <div className="grid gap-4">
        {taraweehSteps.map((step) => (
          <Card 
            key={step.id} 
            className={cn(
              "glass-card transition-all cursor-pointer border-2",
              activeStep === step.id ? "border-indigo-500/40 bg-indigo-500/5" : "border-transparent"
            )}
            onClick={() => setActiveStep(step.id)}
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    activeStep === step.id ? "bg-indigo-500 text-white" : "bg-secondary text-muted-foreground"
                  )}>
                    {step.id}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-headline font-bold text-lg text-white">{step.title}</h4>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-2.5 h-2.5 text-indigo-400 opacity-60" />
                      <span className="text-[7px] font-bold text-indigo-400 uppercase tracking-tighter">{step.nodes} Indexed</span>
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
                  <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-900/20" onClick={(e) => { e.stopPropagation(); setActiveStep(prev => Math.min(prev + 1, 4)); }}>
                    {step.id === 4 ? "Complete Night Guide" : "Next Protocol Node"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-indigo-500/10 border border-indigo-500/20 p-8 rounded-[3rem] text-center space-y-6">
        <Mic2 className="w-10 h-10 text-indigo-400 mx-auto animate-pulse" />
        <h3 className="text-xl font-headline font-bold text-white">Interactive Qira'at Sync</h3>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          Follow the Imam's recitation using the **Islamly Noble Quran Reader** with the correct Qira'ah signal selected in your profile.
        </p>
        <Button variant="outline" className="w-full h-14 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 font-headline font-black uppercase tracking-widest text-xs">
          Open Quran Reader Node
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Taraweeh Repository v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
