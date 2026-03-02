"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Sparkles, Loader2, BookOpen, ArrowRight, MessageCircle, Database } from "lucide-react";
import { searchKnowledgeHub, SearchKnowledgeOutput } from "@/ai/flows/search-knowledge-flow";
import { Badge } from "@/components/ui/badge";

export default function AskPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchKnowledgeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await searchKnowledgeHub({ query });
      setResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Calculation Methods (AlAdhan)",
    "Manuscript Variants (Tanzil)",
    "Hadith Grading Principles",
    "Inheritance (Mirath)"
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <Database className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold">Universal Knowledge Hub</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Access 60+ curated API modules covering Prayer, Quran, and Seerah.
        </p>
      </header>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search our 60+ API modules..." 
            className="pl-10 glass-card h-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="h-12 px-6">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        </Button>
      </form>

      {result && (
        <Card className="glass-card animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-invert max-w-none text-literata text-lg leading-relaxed">
              <p>{result.answer}</p>
            </div>

            {result.sourceModule && (
              <div className="pt-4 border-t border-border/50">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Source Module</span>
                <p className="text-sm font-bold text-primary">{result.sourceModule}</p>
              </div>
            )}

            {result.relatedTopics.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Related Endpoints</span>
                <div className="flex flex-wrap gap-2">
                  {result.relatedTopics.map((topic) => (
                    <Badge 
                      key={topic} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      onClick={() => { setQuery(topic); handleSearch(); }}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!result && !isLoading && (
        <div className="grid grid-cols-2 gap-3">
          {suggestions.map((q) => (
            <Button 
              key={q} 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2 glass-card hover:border-primary/50 text-left items-start px-4"
              onClick={() => { setQuery(q); handleSearch(); }}
            >
              <span className="text-xs font-headline font-bold line-clamp-1">{q}</span>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
                Explore <ArrowRight className="w-2 h-2" />
              </div>
            </Button>
          ))}
        </div>
      )}

      <footer className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Connected to 60/60 Authorized Data Sources
        </p>
      </footer>
    </div>
  );
}
