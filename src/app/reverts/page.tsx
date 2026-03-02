"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Heart, BookOpen, MessageSquare, Compass } from "lucide-react";
import Link from "next/link";

export default function RevertsPage() {
  const guides = [
    { title: "First Steps", icon: Compass, desc: "What to do after saying Shahadah." },
    { title: "Learning Prayer", icon: BookOpen, desc: "A step-by-step visual guide to Salah." },
    { title: "Common Questions", icon: MessageSquare, desc: "Addressing concerns of new Muslims." },
    { title: "Community Support", icon: Heart, desc: "Finding local circles and mentors." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold">Welcome Home</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          A dedicated space for our brothers and sisters who have recently embraced Islam.
        </p>
      </header>

      <section className="grid gap-4">
        {guides.map((guide) => (
          <Card key={guide.title} className="glass-card group hover:border-primary/50 transition-all">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <guide.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-headline font-bold">{guide.title}</h3>
                <p className="text-xs text-muted-foreground">{guide.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="bg-primary border-none text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Heart className="w-32 h-32" />
        </div>
        <CardHeader>
          <CardTitle className="font-headline">Need to talk?</CardTitle>
          <p className="text-primary-foreground/80 text-sm">
            Our team is here to support you in your journey. Connect with an experienced mentor today.
          </p>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full font-headline font-bold">Contact Support</Button>
        </CardContent>
      </Card>

      <footer className="text-center py-4">
        <p className="text-xs text-muted-foreground italic">"Indeed, with hardship comes ease." [94:5]</p>
      </footer>
    </div>
  );
}
