
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Database, 
  ChevronRight, 
  Info,
  ScrollText,
  Gavel
} from "lucide-react";
import { Button } from "@/components/ui/button";

const shariaModules = [
  { id: 1, title: "Maqasid al-Sharia", desc: "The five higher objectives: Protection of Religion, Life, Intellect, Lineage, and Wealth.", nodes: "1.4 Quadrillion" },
  { id: 2, title: "Sources of Law", desc: "Understanding Quran, Sunnah, Ijma (Consensus), and Qiyas (Analogy).", nodes: "2.1 Quadrillion" },
  { id: 3, title: "Fiqh of Transactions", desc: "Ethical guidelines for trade, finance, and community contracts.", nodes: "1.1 Quadrillion" },
  { id: 4, title: "Family Law Node", desc: "The scholarly framework for marriage, divorce, and inheritance.", nodes: "950 Trillion" },
];

export default function ShariaPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <Gavel className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Sharia Guidance</h1>
          <p className="text-muted-foreground italic">The divine framework for justice and thoughtful guidance.</p>
        </div>
      </header>

      <section className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h3 className="font-headline font-bold text-lg text-white">Justice guidance</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The Sharia is not merely a set of rules, but a complete system designed to bring benefit (*Maslaha*) and prevent harm (*Mafsada*) across many aspects of life.
        </p>
      </section>

      <div className="grid gap-4">
        <h3 className="text-sm font-semibold text-muted-foreground pl-1">Key topics</h3>
        {shariaModules.map((item) => (
          <Card key={item.id} className="glass-card group hover:border-primary/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/5 border border-primary/10 shrink-0">
                      <Layers className="w-2.5 h-2.5 text-primary opacity-60" />
                      <span className="text-[7px] font-bold text-primary uppercase tracking-tighter">{item.nodes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-primary transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 flex gap-4">
        <Info className="w-6 h-6 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <h4 className="font-headline font-bold text-sm text-amber-500">Amanah note</h4>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            This page is for scholarly study and educational orientation. Complex legal issues should be discussed with a qualified judge (*Qadi*) or trusted scholars.
          </p>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] italic">
            Sharia resources • updated guidance
          </p>
        </div>
      </footer>
    </div>
  );
}
