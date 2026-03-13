
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Heart, 
  ShieldCheck, 
  Star, 
  Baby, 
  Home, 
  ChevronRight, 
  Database,
  Layers,
  Quote,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";

const familyModules = [
  { id: 1, title: "Rights of Parents", desc: "The highest obligation after Tawhid. Serving and obeying them in what is good.", nodes: "1.2 Quadrillion" },
  { id: 2, title: "Marital Harmony", desc: "Building a household based on tranquility, love, and the Sunnah.", nodes: "850 Trillion" },
  { id: 3, title: "Raising Children", desc: "Protecting the Fitrah and teaching the three fundamental principles from a young age.", nodes: "2.1 Quadrillion" },
  { id: 4, title: "Ties of Kinship", desc: "Maintaining the Silah (connection) with extended family for Allah's sake.", nodes: "1.1 Quadrillion" },
];

export default function FamilyPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-rose-500/5">
          <Home className="w-10 h-10 text-rose-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Family Infrastructure</h1>
          <p className="text-muted-foreground italic">The foundational unit of the Ummah upon the Sunnah.</p>
        </div>
      </header>

      <section className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-rose-500" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Household Node</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          "Each of you is a shepherd and each of you is responsible for his flock." [Bukhari]. This hub provides scholarly guidance for the domestic path.
        </p>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Transmission Modules</h3>
        {familyModules.map((item) => (
          <Card key={item.id} className="glass-card group hover:border-rose-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
                  <Users className="w-6 h-6 text-rose-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-rose-500 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/5 border border-rose-500/10 shrink-0">
                      <Layers className="w-2.5 h-2.5 text-rose-500 opacity-60" />
                      <span className="text-[7px] font-bold text-rose-500 uppercase tracking-tighter">{item.nodes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/20 border-white/5 p-8 rounded-3xl text-center space-y-4">
        <Quote className="w-10 h-10 text-rose-500 mx-auto opacity-20" />
        <p className="text-literata text-lg italic text-white leading-relaxed">
          "The best of you are those who are best to their families." [Sahih Hadith]
        </p>
        <div className="flex justify-center items-center gap-2">
          <Scale className="w-3 h-3 text-muted-foreground" />
          <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Balanced Rights Node</span>
        </div>
      </Card>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Family Infrastructure v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
