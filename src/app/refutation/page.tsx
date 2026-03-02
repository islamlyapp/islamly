"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, BookOpen, AlertTriangle, CheckCircle, Info } from "lucide-react";

const refutations = [
  {
    id: "misconception-1",
    title: "Understanding Jihad",
    desc: "Clarifying the correct scholarly definition versus extremist interpretations.",
    category: "Misconceptions",
    severity: "High"
  },
  {
    id: "misconception-2",
    title: "Innovations in Worship",
    desc: "A guide to identifying and avoiding Bid'ah (innovation) in religious practices.",
    category: "Manhaj",
    severity: "Medium"
  },
  {
    id: "misconception-3",
    title: "The Status of Sahaba",
    desc: "Defending the honor and integrity of the Companions against historical revisionism.",
    category: "Aqidah",
    severity: "High"
  }
];

export default function RefutationPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-primary">
          <ShieldAlert className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Scholarly Defense</h1>
        </div>
        <p className="text-muted-foreground italic">Clarifying doubts and refuting misconceptions with evidence from the Salaf.</p>
      </header>

      <section className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          The purpose of this section is to protect the sound creed (Aqidah) and provide students with the tools to distinguish between truth and falsehood based on the Quran and Sunnah.
        </p>
      </section>

      <div className="grid gap-4">
        {refutations.map((item) => (
          <Card key={item.id} className="glass-card border-l-4 border-destructive/50 overflow-hidden">
            <CardHeader className="p-5 pb-2">
              <div className="flex justify-between items-start mb-1">
                <Badge variant="outline" className="text-[10px] uppercase border-destructive/30 text-destructive">{item.category}</Badge>
                <Badge variant="secondary" className="text-[9px] bg-secondary/80">Priority: {item.severity}</Badge>
              </div>
              <CardTitle className="text-lg font-headline font-bold group-hover:text-primary transition-colors">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-[10px] text-accent uppercase font-bold tracking-wider">
                  <BookOpen className="w-3 h-3" />
                  Read Proofs
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-primary uppercase font-bold tracking-wider">
                  <CheckCircle className="w-3 h-3" />
                  Conclusion
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Etiquettes of Radd</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Refutation in Islam is not based on desire or personal attacks, but on knowledge, justice, and the sincere desire to guide people back to the Straight Path.
        </p>
      </section>
    </div>
  );
}
