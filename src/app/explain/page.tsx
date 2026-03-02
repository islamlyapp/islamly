
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { explainScholarlyPassage } from "@/ai/flows/explain-scholarly-passage-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ExplainPage() {
  const [passage, setPassage] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    if (!passage.trim()) return;
    
    setIsLoading(true);
    setError("");
    setExplanation("");
    
    try {
      const result = await explainScholarlyPassage({ scholarlyPassage: passage });
      setExplanation(result.explanation);
    } catch (err) {
      setError("Failed to generate explanation. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-3xl font-headline font-bold">Passage Explanation Tool</h1>
        </div>
        <p className="text-muted-foreground">
          Paste a complex passage from a classical text to receive a simplified explanation or scholarly context.
        </p>
      </header>

      <div className="grid gap-6">
        <Card className="glass-card">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-headline font-semibold text-muted-foreground uppercase tracking-widest">
                Classical Passage
              </label>
              <Textarea 
                placeholder="Paste the scholarly text here... (e.g., a quote from Ibn Taymiyyah or Imam Ahmad)" 
                className="min-h-[200px] text-literata text-lg leading-relaxed bg-secondary/20"
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleExplain} 
              disabled={isLoading || !passage.trim()} 
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Text...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Simplify Explanation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {explanation && (
          <Card className="bg-primary/5 border-primary/20 animate-in slide-in-from-top-4 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary font-headline">
                <BookOpen className="w-5 h-5" />
                Simplified Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none text-literata text-lg leading-relaxed space-y-4">
                {explanation.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border">
        <h3 className="font-headline font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-accent" />
          Scholarly Note
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This tool uses advanced AI to assist in understanding. However, always refer back to authentic scholars and verified commentaries for definitive meanings of religious texts.
        </p>
      </section>
    </div>
  );
}
