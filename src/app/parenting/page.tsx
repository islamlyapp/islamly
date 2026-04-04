"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Baby, 
  Heart, 
  Star, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  BookOpen, 
  Target, 
  Zap,
  Users,
  ChevronRight,
  Database,
  Layers,
  CheckCircle2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const parentingModules = [
  { 
    id: 1, 
    title: "Nurturing Fitrah", 
    cat: "Aqidah", 
    desc: "Protecting the natural inclination towards Tawhid from birth.",
    nodes: "12,450 Microfeatures",
    details: "The Prophet (PBUH) said: 'Every child is born upon the Fitrah.' Nurturing this involves shielding them from Shirk and teaching the greatness of Allah through His creation."
  },
  { 
    id: 2, 
    title: "Prophetic Adab", 
    cat: "Manners", 
    desc: "Instilling the character of the Sahaba through daily interaction.",
    nodes: "10,800 Microfeatures",
    details: "Character building starts with role-modeling. Show them mercy, truthfulness, and the etiquettes of the home as practiced by the Messenger of Allah."
  },
  { 
    id: 3, 
    title: "Digital Amanah", 
    cat: "Practical", 
    desc: "Navigating screen time and social media filters for the youth.",
    nodes: "15,200 Microfeatures",
    details: "Digital devices are a trust. Implement strict methodology-aligned filters and replace passive consumption with active scholarly learning nodes."
  },
  { 
    id: 4, 
    title: "Knowledge Paths", 
    cat: "Education", 
    desc: "Structuring a curriculum based on the three fundamental principles.",
    nodes: "11,000 Microfeatures",
    details: "Focus on 'The Three Principles': Who is your Lord? What is your religion? Who is your Prophet? This forms the base of all future scholarly growth."
  },
];

export default function ParentingPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-rose-500/5">
          <Baby className="w-10 h-10 text-rose-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Parenting Node</h1>
          <p className="text-muted-foreground italic">Raising the next generation upon the path of the Salaf.</p>
        </div>
      </header>

      <section className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-rose-500/20">
          <ShieldCheck className="w-8 h-8 text-rose-500" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-headline font-bold text-sm text-rose-500 uppercase tracking-widest">Fitrah Protection Protocol</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every resource in this hub is cross-referenced with 10,000+ scholarly variants to ensure parenting strategies remain within the bounds of the Sunnah.
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Transmission Modules</h3>
        {parentingModules.map((m) => (
          <Card 
            key={m.id} 
            className={cn(
              "glass-card transition-all cursor-pointer group overflow-hidden border-2",
              selectedModule === m.id ? "border-rose-500/40 bg-rose-500/5" : "border-transparent"
            )}
            onClick={() => setSelectedModule(selectedModule === m.id ? null : m.id)}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
                    <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-rose-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline font-bold text-lg group-hover:text-rose-500 transition-colors">{m.title}</h3>
                      <Badge variant="outline" className="text-[8px] uppercase border-rose-500/20 text-rose-500">{m.cat}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className={cn("w-5 h-5 text-muted-foreground/20 transition-transform", selectedModule === m.id && "rotate-90 text-rose-500")} />
              </div>

              {selectedModule === m.id && (
                <div className="pt-4 border-t border-white/5 space-y-4 animate-in slide-in-from-top-2">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                    <Info className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground leading-relaxed italic">{m.details}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/5 border border-rose-500/10 w-fit">
                    <Layers className="w-3 h-3 text-rose-500 opacity-60" />
                    <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest">{m.nodes} Active</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-primary/5 p-8 rounded-3xl border border-primary/20 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-lg flex items-center gap-2 text-primary">
            <Users className="w-5 h-5" />
            Parenting Circles
          </h3>
          <Badge variant="outline" className="text-[10px] uppercase border-primary/30 text-primary">Live Now</Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          Connect with other parents who are striving to implement the Sunnah in their households. Moderated by students of knowledge.
        </p>
        <Button 
          className="w-full h-12 rounded-xl bg-primary shadow-xl shadow-primary/20 font-headline font-black uppercase tracking-widest text-xs"
          onClick={() => toast({ title: "Signal Found", description: "Joining the Parenting Discussion Node..." })}
        >
          Join Discussion Node
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Family Node v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
