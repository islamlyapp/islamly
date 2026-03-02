"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Brain, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const availableQuizzes = [
  { 
    id: "q1", 
    title: "Foundations of Aqidah", 
    topic: "Aqidah", 
    difficulty: "Beginner", 
    questions: 10,
    time: "5m",
    icon: Brain 
  },
  { 
    id: "q2", 
    title: "History of the Sahaba", 
    topic: "History", 
    difficulty: "Intermediate", 
    questions: 15,
    time: "8m",
    icon: Star 
  },
  { 
    id: "q3", 
    title: "Fiqh of Purification", 
    topic: "Fiqh", 
    difficulty: "Beginner", 
    questions: 12,
    time: "6m",
    icon: Trophy 
  },
  { 
    id: "q4", 
    title: "The Pillars of Islam", 
    topic: "Basics", 
    difficulty: "Beginner", 
    questions: 5,
    time: "2m",
    icon: Clock 
  }
];

export default function QuizListPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-yellow-500">
          <Trophy className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Islamic Quizzes</h1>
        </div>
        <p className="text-muted-foreground">Test your knowledge and earn digital scholarly badges.</p>
      </header>

      <section className="grid gap-4">
        {availableQuizzes.map((quiz) => (
          <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
            <Card className="glass-card group hover:border-yellow-500/50 transition-all">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                    <quiz.icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline font-bold text-lg group-hover:text-yellow-500 transition-colors">{quiz.title}</h3>
                      <Badge variant="outline" className="text-[9px] uppercase h-4 py-0 border-yellow-500/30 text-yellow-500">{quiz.topic}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> {quiz.questions} Questions</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quiz.time}</span>
                      <Badge variant="secondary" className="text-[9px]">{quiz.difficulty}</Badge>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-yellow-500 transition-all" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <Card className="bg-yellow-500/5 border-yellow-500/20">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm">Scholarly Achievement System</h4>
            <p className="text-xs text-muted-foreground">Complete 10 quizzes with a score over 80% to earn the "Student of Knowledge" badge on your profile.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
