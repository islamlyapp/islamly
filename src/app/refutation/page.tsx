
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ScrollText,
  ShieldCheck,
  ChevronRight,
  Database,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const refutations = [
  {
    id: "mawlid",
    title: "The Ruling on Mawlid",
    category: "Bid'ah",
    summary: "Clarifying why the celebration of the Prophet's birthday is an innovation not practiced by the Salaf.",
    details: "The Prophet (PBUH), his companions (RA), and the four Imams never celebrated the Mawlid. Every innovation in religion is misguidance.",
    evidence: "Hadith: 'Whoever innovates in this matter of ours what is not part of it, it will be rejected.' [Bukhari/Muslim]"
  },
  {
    id: "shaban",
    title: "15th of Sha'ban Rituals",
    category: "Bid'ah",
    summary: "Addressing innovated congregational prayers and rituals specific to the middle of Sha'ban.",
    details: "There is no Sahih (authentic) evidence for specific congregational prayers or rituals on this night. Fasting should be part of the general Sunnah of fasting in Sha'ban.",
    evidence: "Statement of the Salaf: 'Follow and do not innovate, for you have been sufficed.'"
  },
  {
    id: "shrines",
    title: "Building over Graves",
    category: "Shirk/Bid'ah",
    summary: "Refuting the practice of building domes and places of worship over the graves of the righteous.",
    details: "The Sunnah strictly prohibits taking graves as Masjids or elevating them beyond what is legislated to prevent the door to Shirk.",
    evidence: "Hadith: 'Allah cursed the Jews and Christians; they took the graves of their Prophets as places of worship.' [Bukhari]"
  },
  {
    id: "intercession",
    title: "Seeking Help from the Dead",
    category: "Major Shirk",
    summary: "Refuting the claim that one can call upon deceased 'saints' for help or intercession.",
    details: "Dua is worship, and worship belongs to Allah alone. Seeking needs from the dead is Major Shirk that nullifies one's Islam.",
    evidence: "Quran: 'And do not invoke besides Allah that which neither benefits you nor harms you...' [10:106]"
  }
];

export default function RefutationPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-red-500/5">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Scholarly Defense</h1>
          <p className="text-muted-foreground italic text-lg">Protecting the pure creed from innovations and doubts.</p>
        </div>
      </header>

      <section className="bg-destructive/10 border border-destructive/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-red-500" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Methodology Guard</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          This platform strictly follows the methodology of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah). We provide clear evidence against Shirk, Bid'ah (e.g., Mawlid, innovated nights), and deviant ideologies.
        </p>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Clarification Nodes</h3>
        {refutations.map((item) => (
          <Card 
            key={item.id} 
            className={cn(
              "glass-card border-l-4 transition-all cursor-pointer group",
              selected === item.id ? "border-red-500 bg-red-500/5" : "border-white/5 hover:border-red-500/30"
            )}
            onClick={() => setSelected(selected === item.id ? null : item.id)}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-[8px] uppercase border-red-500/20 text-red-500 mb-2">{item.category}</Badge>
                  <h3 className="text-xl font-headline font-bold text-white group-hover:text-red-400 transition-colors">{item.title}</h3>
                </div>
                <ChevronRight className={cn("w-5 h-5 text-muted-foreground/20 transition-transform", selected === item.id && "rotate-90 text-red-500")} />
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>

              {selected === item.id && (
                <div className="pt-4 border-t border-white/5 space-y-4 animate-in slide-in-from-top-2">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-foreground leading-relaxed">{item.details}</p>
                  </div>
                  <div className="flex gap-3 items-start bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                    <ScrollText className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-serif italic text-red-200">{item.evidence}</p>
                  </div>
                  <Button className="w-full h-10 bg-red-600 hover:bg-red-700 text-[10px] font-black uppercase tracking-widest">
                    View Full Scholarly Radd
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-8 rounded-[2rem] border border-white/5 text-center space-y-4">
        <Database className="w-8 h-8 text-red-500 mx-auto opacity-20" />
        <div className="space-y-1">
          <h4 className="font-headline font-bold text-sm text-foreground uppercase tracking-widest">Universal Refutation Node</h4>
          <p className="text-xs text-muted-foreground italic max-w-xs mx-auto">
            "Follow the Sunnah and do not innovate, for you have been sufficed with what was before you."
          </p>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black italic">
          إسلاملي Defensive Infrastructure v3.5
        </p>
      </footer>
    </div>
  );
}
