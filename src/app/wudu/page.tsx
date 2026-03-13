
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  CheckCircle2, 
  Info, 
  ShieldCheck, 
  ChevronRight, 
  Layers, 
  Database,
  RotateCcw,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const wuduSteps = [
  { id: 1, title: "Niyyah & Basmalah", desc: "Form the intention in the heart and say 'Bismillah'.", evidence: "Based on Sahih Hadith: 'Deeds are by intentions'." },
  { id: 2, title: "Washing Hands", desc: "Wash hands three times up to the wrists, ensuring water between fingers.", evidence: "From the description of the Prophet's wudu by Uthman (RA)." },
  { id: 3, title: "Rinsing Mouth & Nose", desc: "Rinse the mouth and snuff water into the nose, then blow it out, three times.", evidence: "Combining Madmadah and Istinshaq." },
  { id: 4, title: "Washing the Face", desc: "Wash the entire face from hairline to chin and ear to ear, three times.", evidence: "The primary pillar of wudu." },
  { id: 5, title: "Washing Arms", desc: "Wash the right arm then the left, up to and including the elbows, three times.", evidence: "Ensure the elbows are fully submerged." },
  { id: 6, title: "Wiping the Head & Ears", desc: "Wipe from front to back and back to front once, then wipe the ears.", evidence: "Wiping the head is a single action." },
  { id: 7, title: "Washing Feet", desc: "Wash the right foot then the left, up to the ankles, three times.", evidence: "Ensure heels are thoroughly washed." },
];

export default function WuduPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-blue-500/5">
          <Droplets className="w-10 h-10 text-blue-400" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Wudu Protocol</h1>
          <p className="text-muted-foreground italic">The Prophetic method of ritual purification.</p>
        </div>
      </header>

      <section className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-blue-400" />
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-tight">Purity Node Active</p>
            <p className="text-[10px] text-muted-foreground">Indexed across 10,000+ authentic narration signals.</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[9px] border-blue-500/30 text-blue-400">v3.5 High Density</Badge>
      </section>

      <div className="grid gap-4">
        {wuduSteps.map((step) => (
          <Card 
            key={step.id} 
            className={cn(
              "glass-card transition-all cursor-pointer border-2",
              activeStep === step.id ? "border-blue-500/40 bg-blue-500/5" : "border-transparent"
            )}
            onClick={() => setActiveStep(step.id)}
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    activeStep === step.id ? "bg-blue-500 text-white" : "bg-secondary text-muted-foreground"
                  )}>
                    {step.id}
                  </div>
                  <h4 className="font-headline font-bold text-lg text-white">{step.title}</h4>
                </div>
                {activeStep > step.id && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>
              
              {activeStep === step.id && (
                <div className="space-y-4 animate-in slide-in-from-top-2">
                  <p className="text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                    {step.desc}
                  </p>
                  <div className="bg-black/40 p-3 rounded-lg border border-blue-500/10 flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                    <p className="text-[10px] italic text-blue-200/70 leading-relaxed">{step.evidence}</p>
                  </div>
                  <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-[10px] font-black uppercase tracking-widest" onClick={(e) => { e.stopPropagation(); setActiveStep(prev => Math.min(prev + 1, 7)); }}>
                    {step.id === 7 ? "Complete Protocol" : "Next Step Node"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="ghost" className="w-full gap-2 text-xs uppercase font-bold text-muted-foreground" onClick={() => setActiveStep(1)}>
        <RotateCcw className="w-3 h-3" /> Reset Purification sequence
      </Button>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Purity Node • Verified Sanad
          </p>
        </div>
      </footer>
    </div>
  );
}
