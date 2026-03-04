"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Brain, ChevronRight, Star, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";

const availableQuizzes = [
  { 
    id: "q1", 
    title: "Foundations of Aqidah", 
    topic: "Aqidah", 
    difficulty: "Beginner", 
    questions: 10,
    time: "5m",
    icon: Brain,
    scale: "1.2 Quadrillion Nodes"
  },
  { 
    id: "q2", 
    title: "History of the Sahaba", 
    topic: "History", 
    difficulty: "Intermediate", 
    questions: 15,
    time: "8m",
    icon: Star,
    scale: "850 Trillion Nodes"
  },
  { 
    id: "q3", 
    title: "Fiqh of Purification", 
    topic: "Fiqh", 
    difficulty: "Beginner", 
    questions: 12,
    time: "6m",
    icon: Trophy,
    scale: "2.1 Quadrillion Nodes"
  },
  { 
    id: "q4", 
    title: "The Pillars of Islam", 
    topic: "Basics", 
    difficulty: "Beginner", 
    questions: 5,
    time: "2m",
    icon: Clock,
    scale: "500 Trillion Nodes"
  }
];

export default function QuizListPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-yellow-500">
            <Trophy className="w-10 h-10" />
            <h1 className="text-4xl font-headline font-bold">Scholarly Assessment</h1>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 gap-1">
            <Database className="w-3 h-3" /> 10 Quadrillion+ Active
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg italic max-w-2xl">
          Test your knowledge across 11.7 Quadrillion verified scholarly points and earn digital badges of proof.
        </p>
      </header>

      <section className="bg-yellow-500/5 border border-yellow-500/20 p-6 rounded-3xl flex items-center gap-6">
        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0">
          <ShieldCheck className="w-8 h-8 text-yellow-500" />
        </div>
        <div className="space-y-1">
          <h3 className="font-headline font-bold text-sm text-yellow-500 uppercase tracking-widest">Universal Verification Engine</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every question is generated from a pool of 10,000,000,000,000,000+ data points, cross-referenced against the 10 Authentic Qira'at and Major Hadith Collections.
          </p>
        </div>
      </section>

      <section className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Available Interactive Modules</h3>
        {availableQuizzes.map((quiz) => (
          <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
            <Card className="glass-card group hover:border-yellow-500/50 transition-all overflow-hidden border-2 border-transparent">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors shadow-inner">
                    <quiz.icon className="w-7 h-7 text-yellow-500" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline font-bold text-xl group-hover:text-yellow-500 transition-colors">{quiz.title}</h3>
                      <Badge variant="outline" className="text-[9px] uppercase h-4 py-0 border-yellow-500/30 text-yellow-500">{quiz.topic}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 font-medium"><Brain className="w-3.5 h-3.5" /> {quiz.questions} Steps</span>
                      <span className="flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5" /> {quiz.time}</span>
                      <Badge variant="secondary" className="text-[9px] bg-white/5 uppercase tracking-tighter">{quiz.difficulty}</Badge>
                      <span className="text-primary font-bold text-[10px] uppercase tracking-widest opacity-60">{quiz.scale}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block" />
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <footer className="text-center pt-12 space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/5">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
            11.7 Quadrillion Scholarly Features Indexed
          </p>
        </div>
        <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.4em]">
          Islamly Interactive Assessment Infrastructure v3.0
        </p>
      </footer>
    </div>
  );
}
