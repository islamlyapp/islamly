
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ShieldCheck, 
  Database,
  Sparkles,
  Search,
  Quote,
  ChevronRight
} from "lucide-react";
import { searchKnowledgeHub, type SearchKnowledgeOutput } from "@/ai/flows/search-knowledge-flow";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  meta?: SearchKnowledgeOutput;
};

export default function AskAiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await searchKnowledgeHub({ query: input });
      const assistantMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: result.answer,
        meta: result
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-2xl mx-auto animate-in fade-in duration-500">
      <header className="space-y-2 mb-6 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold flex items-center gap-3">
            <Bot className="text-primary w-8 h-8" />
            Ask Al-Mualim
          </h1>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Database className="w-3 h-3 mr-1" /> Verified Knowledge Node
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm italic">Get evidence-based answers strictly aligned with the Sunnah.</p>
      </header>

      <Card className="flex-1 glass-card border-none flex flex-col overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 py-20">
              <Sparkles className="w-12 h-12 text-primary" />
              <div className="space-y-2">
                <p className="font-headline font-bold uppercase tracking-widest text-xs">Ahlus-Sunnah Search Node</p>
                <p className="text-sm italic max-w-xs">Ask about Aqidah, Fiqh, Seerah, or any scholarly topic.</p>
              </div>
              <div className="grid gap-2 w-full max-w-xs">
                {["What is Tawhid?", "Pillars of Prayer", "History of Badr"].map(q => (
                  <button key={q} onClick={() => setInput(q)} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs hover:bg-white/10 transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={cn(
              "flex gap-4 animate-in slide-in-from-bottom-2",
              m.role === 'assistant' ? "justify-start" : "justify-end"
            )}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={cn(
                "p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed",
                m.role === 'assistant' 
                  ? "bg-secondary/30 text-foreground border border-white/5" 
                  : "bg-primary text-white font-medium ml-12"
              )}>
                {m.content}
                
                {m.meta && m.meta.relatedTopics.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-1">
                      <Search className="w-2.5 h-2.5" /> Related Research
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.meta.relatedTopics.map(t => (
                        <Badge key={t} variant="outline" className="text-[9px] bg-white/5 border-white/10">{t}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-white/10">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
              <div className="p-4 rounded-2xl bg-secondary/20 w-32 border border-white/5 h-10" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-background/50 backdrop-blur-xl shrink-0">
          <div className="relative flex gap-2">
            <Input 
              placeholder="Ask for scholarly evidence..." 
              className="glass-card h-12 pr-12 focus-visible:ring-primary/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1.5 top-1.5 h-9 w-9"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </form>
      </Card>

      <section className="mt-6 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-[10px] text-muted-foreground leading-tight italic">
          Disclaimer: AI responses are generated from verified data clusters but do not constitute a formal Fatwa. Consult living scholars for critical jurisprudence.
        </p>
      </section>
    </div>
  );
}
