
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, 
  ShieldCheck, 
  CheckCircle2, 
  Info, 
  Zap, 
  Search, 
  Database,
  Layers,
  ChevronRight,
  ArrowRight,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const halalPrinciples = [
  { id: 1, title: "Permissibility Baseline", desc: "In food, everything is Halal (permissible) except what is explicitly prohibited by text.", nodes: "1.4 Quadrillion" },
  { id: 2, title: "Zabiha Standards", desc: "The method of slaughtering according to Sharia: mentioning Allah's name and swift drainage.", nodes: "2.1 Quadrillion" },
  { id: 3, title: "The Tayyib Concept", desc: "Food must not only be Halal but also wholesome, pure, and ethically sourced.", nodes: "800 Trillion" },
  { id: 4, title: "Hidden Ingredients", desc: "Navigating E-numbers, gelatin, and cross-contamination in modern processing.", nodes: "1.1 Quadrillion" },
];

export default function HalalGuidePage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-500/5">
          <Utensils className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Tayyib Guide</h1>
          <p className="text-muted-foreground italic">Maintaining purity in consumption across 17 Quadrillion life signals.</p>
        </div>
      </header>

      <section className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Purity Node</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          "O Messengers, eat of the good things and work righteousness." [23:51]. Consumption is directly linked to the acceptance of worship and spiritual clarity.
        </p>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Scholarly Rulings Clusters</h3>
        {halalPrinciples.map((item) => (
          <Card key={item.id} className="glass-card group hover:border-emerald-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
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

      <section className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 space-y-6 text-center">
        <Store className="w-10 h-10 text-emerald-500 mx-auto animate-pulse" />
        <div className="space-y-2">
          <h3 className="text-xl font-headline font-bold text-white">Find Tayyib Provisions</h3>
          <p className="text-sm text-muted-foreground italic max-w-sm mx-auto">
            Access the geo-spatial locator to find verified Halal establishments near your current coordinates.
          </p>
        </div>
        <Button asChild className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-md font-headline font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20">
          <Link href="/halal-locator">
            Enter Locator Node <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Halal Infrastructure v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
