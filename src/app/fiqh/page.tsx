"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Book, Info, Gavel } from "lucide-react";

const fiqhTopics = [
  { 
    id: "taharah", 
    title: "Taharah (Purification)", 
    description: "Rulings on Wudu, Ghusl, and cleanliness.",
    content: "Purity is half of faith. Understanding the physical and spiritual aspects of purification is essential before any act of worship."
  },
  { 
    id: "salah", 
    title: "Salah (Prayer)", 
    description: "Pillars, requirements, and conditions of prayer.",
    content: "The most important pillar after the Shahadah. Learn the correct way to pray as taught by the Prophet (peace be upon him)."
  },
  { 
    id: "zakat", 
    title: "Zakat (Alms)", 
    description: "Calculating and distributing obligatory charity.",
    content: "A means of purifying wealth and supporting the community. Learn the thresholds and categories of recipients."
  }
];

export default function FiqhPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-primary">
          <Scale className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Fiqh Navigator</h1>
        </div>
        <p className="text-muted-foreground">Understanding Islamic Jurisprudence and Legal Rulings.</p>
      </header>

      <div className="grid gap-4">
        {fiqhTopics.map((topic) => (
          <Card key={topic.id} className="glass-card border-l-4 border-primary">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-headline font-bold">{topic.title}</CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary">Introductory</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-literata italic">
                {topic.content}
              </p>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline" className="text-[10px]"><Book className="w-3 h-3 mr-1" /> Read Texts</Badge>
                <Badge variant="outline" className="text-[10px]"><Info className="w-3 h-3 mr-1" /> Key Rulings</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Gavel className="w-5 h-5 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Methodology</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The content here is based on the proofs from the Quran and Sunnah, following the understanding of the righteous predecessors (Salaf-us-Salih) across the four established schools of thought where evidence is clear.
        </p>
      </section>
    </div>
  );
}
