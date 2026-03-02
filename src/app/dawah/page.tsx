"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, HelpCircle, CheckCircle, Search, HelpCircleIcon } from "lucide-react";

export default function DawahPage() {
  const questions = [
    "What is the purpose of life?",
    "Who is Allah?",
    "What is the Quran?",
    "How does Islam view other prophets?",
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="relative h-[200px] rounded-2xl overflow-hidden bg-accent/20 flex items-center justify-center text-center p-6">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/dawah/800/400')] bg-cover bg-center" />
        <div className="relative z-10 space-y-2">
          <Globe className="w-10 h-10 mx-auto text-accent mb-2" />
          <h1 className="text-3xl font-headline font-bold">Discover Islam</h1>
          <p className="text-muted-foreground text-sm max-w-xs">Exploring the beauty and logic of the final revelation.</p>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-headline font-bold flex items-center gap-2">
          <HelpCircleIcon className="w-5 h-5 text-accent" />
          Common Questions
        </h2>
        <div className="grid gap-3">
          {questions.map((q) => (
            <Card key={q} className="glass-card hover:bg-secondary/30 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium">{q}</span>
                <Search className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              Core Message
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert text-sm text-muted-foreground leading-relaxed">
            <p>Islam is a religion of pure monotheism. It teaches that there is only one Creator who deserves worship and that all messengers throughout history brought the same core message: to submit to the Will of the Almighty.</p>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button className="flex-1 font-headline bg-accent text-accent-foreground hover:bg-accent/80">Get Free Quran</Button>
          <Button variant="outline" className="flex-1 font-headline">Visit a Mosque</Button>
        </div>
      </section>
    </div>
  );
}
