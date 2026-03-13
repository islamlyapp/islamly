
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Languages, 
  Globe, 
  BookOpen, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  Database,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const languageNodes = [
  { id: 1, name: "Classical Arabic (Fusha)", code: "AR", desc: "The language of revelation and scholarly legacy.", nodes: "5.4 Quadrillion" },
  { id: 2, name: "English (Global)", code: "EN", desc: "High-density translations for the Western Ummah.", nodes: "2.1 Quadrillion" },
  { id: 3, name: "Urdu (Scholarly)", code: "UR", desc: "Accessing the rich legacy of the Indian Subcontinent.", nodes: "1.2 Quadrillion" },
  { id: 4, name: "Malay / Indonesian", code: "MS", desc: "Connecting with the largest regional Ummah cluster.", nodes: "900 Trillion" },
];

export default function LanguagePage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-blue-500/5">
          <Languages className="w-10 h-10 text-blue-400" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Linguistic Node</h1>
          <p className="text-muted-foreground italic">Universal reach across 7,709+ verified language signals.</p>
        </div>
      </header>

      <section className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-blue-400" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Arabic Infrastructure</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          While the infrastructure supports thousands of languages, the **Arabic Node** remains the constant anchor. All translations are cross-referenced with the original Fusha text to ensure absolute semantic accuracy.
        </p>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Primary Translation Clusters</h3>
        {languageNodes.map((lang) => (
          <Card key={lang.id} className="glass-card group hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <span className="font-black text-blue-400 text-lg">{lang.code}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-blue-400 transition-colors">{lang.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{lang.desc}</p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/5 border border-blue-500/10 shrink-0">
                      <Layers className="w-2.5 h-2.5 text-blue-400 opacity-60" />
                      <span className="text-[7px] font-bold text-blue-400 uppercase tracking-tighter">{lang.nodes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-blue-400 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 space-y-6 text-center">
        <Sparkles className="w-10 h-10 text-blue-400 mx-auto animate-pulse" />
        <div className="space-y-2">
          <h3 className="text-xl font-headline font-bold text-white">Initialize Arabic Path</h3>
          <p className="text-sm text-muted-foreground italic max-w-sm mx-auto">
            Unlock the original scholarly signal by beginning your structured Arabic learning journey today.
          </p>
        </div>
        <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-md font-headline font-black uppercase tracking-widest shadow-xl shadow-blue-900/20">
          Begin Linguistic Protocol <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Linguistic Index v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
