'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Sparkles, Loader2, History, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { narrateSeerah, type SeerahNarratorOutput } from '@/ai/flows/seerah-narrator-flow';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const suggestedTopics = [
  "The Hijrah to Madinah",
  "The Battle of Badr",
  "The Conquest of Makkah",
  "The First Revelation",
  "The Treaty of Hudaybiyyah",
  "The Night Journey (Isra' wal-Mi'raj)"
];

export default function SeerahNarratorPage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<SeerahNarratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNarrate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const data = await narrateSeerah({ topic });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <History className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold">AI Seerah Narrator</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Explore compelling narratives of the Prophetic biography and Islamic history.
        </p>
      </header>

      <form onSubmit={handleNarrate} className="flex gap-2">
        <Input 
          placeholder="Enter a Seerah event or personality..." 
          className="glass-card h-12 flex-1"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit" disabled={isLoading} className="h-12 px-6">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        </Button>
      </form>

      {result ? (
        <Card className="glass-card animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">{result.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="prose prose-invert max-w-none text-literata text-lg leading-relaxed space-y-4">
              {result.narrative.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <section className="space-y-4 pt-6 border-t border-border/50">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Key Lessons
              </h3>
              <div className="grid gap-3">
                {result.lessons.map((lesson, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-secondary/20">
                    <span className="text-primary font-bold">0{i+1}</span>
                    <p className="text-sm text-muted-foreground">{lesson}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground">Historical References</h3>
              <div className="flex flex-wrap gap-2">
                {result.references.map((ref, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] border-primary/20">{ref}</Badge>
                ))}
              </div>
            </section>

            <Button variant="ghost" className="w-full mt-4" onClick={() => setResult(null)}>
              Narrate Another Event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Suggested Explorations</h3>
          <div className="grid gap-3">
            {suggestedTopics.map((t) => (
              <button 
                key={t}
                onClick={() => { setTopic(t); handleNarrate(); }}
                className="flex items-center justify-between p-4 rounded-xl glass-card hover:bg-secondary/30 transition-all text-left group"
              >
                <span className="text-sm font-medium">{t}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="bg-secondary/20 p-6 rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">A Note on Sources</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The AI Seerah Narrator synthesizes information from authentic classical works of Prophetic biography. While highly accurate, we recommend cross-referencing with teachers and scholars for deep theological study.
        </p>
      </section>
    </div>
  );
}
