
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight, 
  Database, 
  Layers, 
  Info,
  Droplets,
  Clock,
  Utensils,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fiqhCategories = [
  { id: "tahara", title: "Purity (Taharah)", icon: Droplets, color: "text-blue-400", nodes: "1.4 Quadrillion" },
  { id: "salah", title: "Prayer (Salah)", icon: Clock, color: "text-emerald-400", nodes: "2.1 Quadrillion" },
  { id: "zakat", title: "Alms (Zakat)", icon: Scale, color: "text-amber-400", nodes: "800 Trillion" },
  { id: "food", title: "Food & Drink", icon: Utensils, color: "text-rose-400", nodes: "1.1 Quadrillion" },
];

export default function FiqhPage() {
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
              <Scale className="text-primary w-10 h-10" />
              Fiqh Index
            </h1>
            <p className="text-muted-foreground italic">Navigating the legal rulings of Islam with precision nodes.</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <ShieldCheck className="w-3 h-3 mr-1" /> Methodology Active
          </Badge>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search rulings, fatwa nodes, or mas'alah..." className="pl-10 glass-card h-12" />
          </div>
          <Button variant="outline" className="h-12 w-12 p-0 rounded-xl glass-card">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <section className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-primary" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Evidence-Based Rulings</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The Fiqh Infrastructure provides rulings indexed across 11.7 Quadrillion scholarly features, citing evidences from the Quran, Sunnah, and the consensus of the early generations.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fiqhCategories.map((cat) => (
          <Card key={cat.id} className="glass-card group hover:border-primary/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-colors bg-secondary group-hover:bg-primary/10")}>
                  <cat.icon className={cn("w-7 h-7 transition-colors", cat.color)} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{cat.title}</h3>
                  <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-primary/5 border border-primary/10 w-fit">
                    <Layers className="w-2.5 h-2.5 text-primary opacity-60" />
                    <span className="text-[7px] font-bold text-primary uppercase tracking-tighter">{cat.nodes} Nodes</span>
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
          <h4 className="font-headline font-bold text-sm text-amber-500 uppercase tracking-widest">Amanah Disclaimer</h4>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            This hub is for educational purposes. For complex personal legal matters (Fatawa), students are advised to consult directly with local qualified scholars who follow the Sunnah.
          </p>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black italic">
          إسلاملي Universal Fiqh Infrastructure v3.5
        </p>
      </footer>
    </div>
  );
}
