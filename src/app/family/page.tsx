"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Users, Calendar, Heart, Gift, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FamilyPage() {
  const features = [
    { title: "Family Planner", icon: Calendar, desc: "Coordinate prayer and activities." },
    { title: "Joint Learning", icon: BookOpen, desc: "Study Quran together as a family." },
    { title: "Community Events", icon: Users, desc: "Find events for the whole household." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
          <Home className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-4xl font-headline font-bold">The Muslim Household</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Strengthening the foundational unit of our Ummah.
        </p>
      </header>

      <div className="grid gap-4">
        {features.map((f) => (
          <Card key={f.title} className="glass-card hover:border-accent/50 transition-all group">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-accent/20">
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-headline font-bold text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-lg font-headline flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            Family Advice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "The best among you are those who are best to their families."
          </p>
          <Button variant="outline" className="w-full border-accent/20 text-accent hover:bg-accent/10">Read Marriage & Family Fiqh</Button>
        </CardContent>
      </Card>
    </div>
  );
}
