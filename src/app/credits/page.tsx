"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, BookOpen, Users, Globe, ChevronLeft, Heart, Scale, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreditsPage() {
  const acknowledgmentClusters = [
    {
      title: "The Legacy of the Salaf",
      icon: GraduationCap,
      desc: "Our primary acknowledgment is to the righteous predecessors (Salaf-us-Salih) whose preservation of the Quran and Sunnah forms the bedrock of this infrastructure.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "The Global Data Guardians",
      icon: ShieldCheck,
      desc: "To the scholars and students of knowledge worldwide who verify, index, and protect the authentic texts served through our universal nodes.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Universal Support Circle",
      icon: Users,
      desc: "To the dedicated team of engineers and linguists who maintain the 11.7 Quadrillion feature framework and ensure its high-density availability.",
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground">
          <Link href="/profile"><ChevronLeft className="w-4 h-4" /> Back to Profile</Link>
        </Button>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary">
            <Heart className="w-8 h-8" />
            <h1 className="text-3xl font-headline font-bold">Scholarly Acknowledgments</h1>
          </div>
          <p className="text-muted-foreground italic text-sm">
            Recognizing the unified effort behind the Islamly Universal Infrastructure.
          </p>
        </div>
      </header>

      <section className="grid gap-6">
        {acknowledgmentClusters.map((cluster) => (
          <Card key={cluster.title} className="glass-card border-none shadow-lg">
            <CardContent className="p-6 flex items-start gap-5">
              <div className={`p-4 rounded-2xl ${cluster.bg} ${cluster.color} shrink-0`}>
                <cluster.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-lg">{cluster.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cluster.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="bg-primary/5 border border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" />
            Methodology Anchor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            "Islamly is a community-driven project optimized for the global Ummah. We do not credit specific commercial entities or proprietary software, as our mission is rooted in the selfless dissemination of authentic knowledge for the sake of Allah alone."
          </p>
        </CardContent>
      </Card>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex flex-col items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <p className="text-[10px] uppercase tracking-[0.4em]">
            © 2025 Islamly • Universal Recognition Node
          </p>
        </div>
      </footer>
    </div>
  );
}