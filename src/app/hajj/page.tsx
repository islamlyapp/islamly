
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tent, 
  Map, 
  Compass, 
  ShieldCheck, 
  Loader2, 
  ChevronRight, 
  CircleDot,
  Navigation,
  Info,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const hajjSteps = [
  { id: "ihram", title: "Ihram & Niyyah", loc: "Miqat", desc: "Assuming the state of purity and making intention." },
  { id: "tawaf", title: "Tawaf al-Qudum", loc: "Masjid al-Haram", desc: "Circling the Ka'bah seven times anti-clockwise." },
  { id: "mina", title: "Day of Tarwiyah", loc: "Mina", desc: "The 8th of Dhul-Hijjah, resting in the city of tents." },
  { id: "arafat", title: "Day of Arafat", loc: "Arafat", desc: "The pillar of Hajj. Seeking forgiveness on the plain." },
  { id: "muzdalifah", title: "Muzdalifah", loc: "Muzdalifah", desc: "Collecting pebbles and resting under the open sky." },
  { id: "jamarat", title: "Stoning of Jamarat", loc: "Mina", desc: "Rejecting Shaytan by stoning the large pillar." },
];

export default function HajjPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(hajjSteps[0].id);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-amber-500/5">
          <Tent className="w-10 h-10 text-amber-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Hajj Navigator</h1>
          <p className="text-muted-foreground italic">The ultimate guide for the journey of a lifetime.</p>
        </div>
      </header>

      <section className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-amber-500" />
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-amber-500 uppercase tracking-tight">Geospatial Protocol</p>
            <p className="text-[10px] text-muted-foreground">Interactive ritual mapping active for Makkah region.</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[9px] border-amber-500/30 text-amber-500">Node v1.0</Badge>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">The Ritual Sequence</h3>
        {hajjSteps.map((step) => (
          <Card 
            key={step.id} 
            className={cn(
              "glass-card transition-all cursor-pointer group border-2",
              activeStep === step.id ? "border-amber-500/40 bg-amber-500/5" : "border-transparent"
            )}
            onClick={() => setActiveStep(step.id)}
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  activeStep === step.id ? "bg-amber-500 text-white" : "bg-secondary text-muted-foreground group-hover:bg-amber-500/10"
                )}>
                  <CircleDot className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-headline font-bold text-md text-white">{step.title}</h4>
                  <p className="text-[10px] text-amber-500 uppercase font-bold flex items-center gap-1">
                    <Navigation className="w-2.5 h-2.5" /> {step.loc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/20" />
            </CardContent>
            {activeStep === step.id && (
              <div className="px-5 pb-5 animate-in slide-in-from-top-2">
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                  {step.desc}
                </p>
                <Button className="w-full mt-4 h-10 bg-amber-600 hover:bg-amber-700 text-[10px] font-black uppercase tracking-widest">
                  View Rulings Node
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-6 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-white">Sunnah Guard</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed italic">
          This guide strictly follows the Hajj rituals as performed by Prophet Muhammad (PBUH) and documented by the companions (RA). Avoid any innovations introduced into the pilgrimage sequence.
        </p>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black italic">
          إسلاملي Universal Hajj Infrastructure v1.0
        </p>
      </footer>
    </div>
  );
}
