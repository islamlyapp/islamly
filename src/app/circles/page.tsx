"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ShieldCheck, MessageCircle, Lock, Globe, ArrowRight, UserCheck } from "lucide-react";

const circles = [
  { id: 1, name: "Aqidah Essentials", members: 1240, type: "Moderated", description: "Structured study of 'The Three Fundamental Principles'.", category: "Theology" },
  { id: 2, name: "Hifz Support", members: 850, type: "Public", description: "Daily check-ins for memorization goals.", category: "Quran" },
  { id: 3, name: "Family Fiqh", members: 420, type: "Private", description: "Discussions on marital and parenting rulings.", category: "Jurisprudence" },
  { id: 4, name: "Sunnah Guard", members: 2100, type: "Moderated", description: "Proactive defense against misconceptions and bid'ah.", category: "Defense" },
];

export default function CirclesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-primary">
          <Users className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Community Circles</h1>
        </div>
        <p className="text-muted-foreground italic">Moderated scholarly discussion groups for students of knowledge.</p>
      </header>

      <section className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl flex items-start gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-full">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h3 className="font-headline font-bold text-sm text-emerald-500 uppercase tracking-widest">Safe & Authenticated</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All circles are moderated by verified students of knowledge to ensure discussions remain respectful and strictly within the bounds of the Quran and Sunnah.
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        {circles.map((circle) => (
          <Card key={circle.id} className="glass-card hover:border-primary/50 transition-all group overflow-hidden">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{circle.name}</h3>
                    <Badge variant="outline" className="text-[8px] uppercase border-primary/20 text-primary">{circle.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{circle.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase mb-1">
                    <Users className="w-3 h-3" /> {circle.members}
                  </div>
                  <Badge variant="secondary" className="text-[9px] uppercase">{circle.type}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Button className="flex-1 h-9 gap-2 text-xs font-headline">
                  <MessageCircle className="w-3 h-3" /> Join Circle
                </Button>
                <Button variant="outline" className="h-9 w-9 p-0 rounded-lg">
                  {circle.type === 'Private' ? <Lock className="w-4 h-4 text-muted-foreground" /> : <Globe className="w-4 h-4 text-muted-foreground" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <UserCheck className="w-32 h-32" />
        </div>
        <CardHeader>
          <CardTitle className="font-headline">Moderator Program</CardTitle>
          <CardDescription>Are you a student of knowledge with recommendations from established teachers?</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5">
            Apply to Moderate <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
