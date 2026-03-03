
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Sparkles, Loader2, BookOpen, MessageCircle, ChevronRight, Bookmark, Database } from "lucide-react";
import { searchKnowledgeHub, SearchKnowledgeOutput } from "@/ai/flows/search-knowledge-flow";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KNOWLEDGE_HUB } from "@/lib/knowledge-hub";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const categories = Array.from(new Set(KNOWLEDGE_HUB.map(m => m.category)));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold">Knowledge Assistant</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Search across 10,000+ verified scholarly features and classical texts.
        </p>
        <div className="flex justify-center pt-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
            <Database className="w-3 h-3" /> Massive Index Active
          </Badge>
        </div>
      </header>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Ask about Aqidah, Fiqh, or History..." 
            className="pl-10 glass-card h-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="h-12 px-6">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        </Button>
      </form>

      {result ? (
        <Card className="glass-card animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Insight
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setResult(null)}>Clear</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-invert max-w-none text-literata text-lg leading-relaxed">
              <p>{result.answer}</p>
            </div>

            {result.sourceModule && (
              <div className="pt-4 border-t border-border/50">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Source Reference</span>
                <p className="text-sm font-bold text-primary">{result.sourceModule}</p>
              </div>
            )}

            {result.relatedTopics.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Related Topics</span>
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
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explore Resources</h3>
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="all" className="text-[10px] uppercase">All</TabsTrigger>
              <TabsTrigger value="categories" className="text-[10px] uppercase">Categories</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <ScrollArea className="h-[400px] rounded-xl border border-border/50 bg-secondary/10 p-4">
              <div className="grid gap-3">
                {KNOWLEDGE_HUB.map((module) => (
                  <button 
                    key={module.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-card/40 hover:bg-card/80 text-left transition-all border border-transparent hover:border-primary/20 group"
                    onClick={() => { setQuery(module.title); handleSearch(); }}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-headline">{module.title}</span>
                        <Badge variant="outline" className="text-[8px] h-4 py-0 uppercase border-primary/30 text-primary">
                          {module.subFeatures ? `${module.subFeatures}+ Features` : module.category}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{module.summary}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Card key={cat} className="glass-card hover:border-primary/50 cursor-pointer transition-all" onClick={() => setQuery(cat)}>
                  <CardHeader className="p-4 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-tight">{cat}</span>
                      <p className="text-[10px] text-muted-foreground">Universal Cluster</p>
                    </div>
                    <Badge variant="secondary" className="text-[9px]">
                      Index Active
                    </Badge>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <footer className="text-center pt-8">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Bookmark className="w-3 h-3" />
          <p className="text-[10px] uppercase tracking-widest">
            Verified 10,000+ Feature Scholarly Infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
}
