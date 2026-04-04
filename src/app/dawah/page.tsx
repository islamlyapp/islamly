"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone, 
  Globe, 
  MessageCircle, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Sparkles, 
  Share2, 
  Download,
  ChevronRight,
  Database,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const dawahModules = [
  { id: 1, title: "The Concept of God", cat: "Theology", desc: "Explaining Tawhid to a secular audience using sound reason and text.", link: "https://www.islamreligion.com/category/1/the-concept-of-god/" },
  { id: 2, title: "Women in Islam", cat: "Societal", desc: "Refuting misconceptions about status, rights, and the Hijab.", link: "https://www.islamreligion.com/category/3/women-in-islam/" },
  { id: 3, title: "Purpose of Life", cat: "Philosophical", desc: "Using the Quran to address existential questions about our origin and end.", link: "https://www.islamreligion.com/category/4/purpose-of-life/" },
  { id: 4, title: "Prophethood Proofs", cat: "Evidence", desc: "Scientific, historical, and linguistic evidence for Muhammad (PBUH).", link: "https://www.islamreligion.com/category/5/prophethood-of-muhammad/" },
];

export default function DawahPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleAction = (msg: string) => {
    toast({ title: "Dawah Node", description: msg });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-rose-500/5">
          <Megaphone className="w-10 h-10 text-rose-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Dawah Infrastructure</h1>
          <p className="text-muted-foreground italic">Empowering students to share the light of the Sunnah.</p>
        </div>
      </header>

      <section className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-rose-500/20">
          <Globe className="w-8 h-8 text-rose-500" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-headline font-bold text-sm text-rose-500 uppercase tracking-widest">Global Outreach Node</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All resources here are strictly aligned with the methodology of the Salaf, avoiding emotionalist tactics or theological compromise.
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Transmission Modules</h3>
        {dawahModules.map((m) => (
          <Card key={m.id} className="glass-card group hover:border-rose-500/50 transition-all cursor-pointer overflow-hidden" onClick={() => window.open(m.link, '_blank')}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
                  <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-rose-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-lg group-hover:text-rose-500 transition-colors">{m.title}</h3>
                    <Badge variant="outline" className="text-[8px] uppercase border-rose-500/20 text-rose-500">{m.cat}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground/20 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="grid grid-cols-2 gap-4">
        <Card className="glass-card p-6 text-center border-white/5 space-y-3">
          <Download className="w-6 h-6 text-muted-foreground mx-auto" />
          <h4 className="font-headline font-bold text-xs uppercase text-white">Leaflet Node</h4>
          <Button variant="outline" size="sm" className="w-full text-[9px] font-black uppercase h-8" onClick={() => handleAction("Dawah PDF dispatched to drive.")}>Get PDF</Button>
        </Card>
        <Card className="glass-card p-6 text-center border-white/5 space-y-3">
          <Share2 className="w-6 h-6 text-muted-foreground mx-auto" />
          <h4 className="font-headline font-bold text-xs uppercase text-white">Dispatch Hub</h4>
          <Button variant="outline" size="sm" className="w-full text-[9px] font-black uppercase h-8" onClick={() => handleAction("Outreach URL copied to clipboard.")}>Share Node</Button>
        </Card>
      </section>

      <footer className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 text-center space-y-4">
        <ShieldAlert className="w-8 h-8 text-rose-500 mx-auto opacity-20" />
        <div className="space-y-1">
          <h4 className="font-headline font-bold text-sm text-foreground">Verified Proofs</h4>
          <p className="text-xs text-muted-foreground italic max-w-xs mx-auto">
            "Invite to the way of your Lord with wisdom and good instruction..." [16:125]
          </p>
        </div>
      </footer>
    </div>
  );
}
