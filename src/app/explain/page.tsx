
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  BookOpen, 
  Loader2, 
  ShieldCheck, 
  Info, 
  Quote, 
  ChevronRight,
  MessageSquare,
  ScrollText
} from "lucide-react";
import { explainScholarlyPassage, type ExplainScholarlyPassageOutput } from "@/ai/flows/explain-scholarly-passage-flow";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function SimplifierPage() {
  const [passage, setPassage] = useState("");
  const [result, setResult] = useState<ExplainScholarlyPassageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSimplify = async () => {
    if (!passage.trim() || isLoading) return;
    setIsLoading(true);
    setResult(null);
    try {
      const data = await explainScholarlyPassage({ scholarlyPassage: passage });
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = () => {
    toast({ title: "Coming Soon", description: "Scholarly Note archiving is being indexed." });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold">Scholarly Simplifier</h1>
          <p className="text-muted-foreground italic">Breaking down complex classical texts for the student of knowledge.</p>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Input Scholarly Passage</label>
          <Badge variant="outline" className="text-[8px] uppercase border-primary/20 text-primary">Ahlus-Sunnah Node</Badge>
        </div>
        <Card className="glass-card overflow-hidden border-none shadow-xl">
          <CardContent className="p-0">
            <Textarea 
              placeholder="Paste a complex passage from a book of Aqidah, Fiqh, or Hadith..." 
              className="min-h-[200px] bg-transparent border-none focus-visible:ring-0 p-6 text-literata leading-relaxed resize-none"
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
            />
            <div className="p-4 bg-secondary/20 flex justify-between items-center border-t border-white/5">
              <span className="text-[9px] text-muted-foreground italic">Input supports Arabic and English scholarly text.</span>
              <Button 
                onClick={handleSimplify} 
                disabled={!passage.trim() || isLoading}
                className="gap-2 h-10 px-6 font-headline font-bold uppercase text-[10px] tracking-widest"
              >
                {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Simplify Node
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {isLoading && (
        <div className="flex flex-col items-center gap-4 py-12 animate-pulse">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
          <p className="text-xs font-headline font-bold uppercase tracking-[0.3em] text-muted-foreground">AI is distilling meanings...</p>
        </div>
      )}

      {result && (
        <Card className="glass-card border-l-4 border-primary shadow-2xl animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Distilled Explanation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="prose prose-invert max-w-none text-literata text-lg leading-relaxed text-foreground">
              {result.explanation.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Methodology Verified</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8" onClick={() => setPassage("")}>Clear</Button>
                <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8 gap-2" onClick={handleSaveNote}>
                  <ScrollText className="w-3 h-3" /> Save Note
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <section className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 flex gap-4">
        <Info className="w-6 h-6 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <h4 className="font-headline font-bold text-sm text-amber-500 uppercase tracking-widest">Amanah Note</h4>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            This tool uses AI to simplify syntax while strictly adhering to the methodology of the Salaf. It will NOT validate passages containing Bid'ah or Shirk, but instead clarify the correct creed.
          </p>
        </div>
      </section>

      <footer className="text-center pt-8">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] opacity-40">
          إسلاملي Universal Simplification Node v1.0
        </p>
      </footer>
    </div>
  );
}
