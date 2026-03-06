
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Waves, Sparkles, Loader2, CheckCircle2, AlertCircle, RotateCcw, Volume2, BookOpen, ScrollText, Library, ChevronRight } from "lucide-react";
import { provideRecitationFeedback, type MualimFeedbackOutput } from "@/ai/flows/mualim-feedback-flow";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MOCK_LIBRARY = {
  Quran: [
    { id: "1:1", title: "Surah Al-Fatiha (1:1)" },
    { id: "2:255", title: "Ayat al-Kursi (2:255)" },
    { id: "112:1", title: "Surah Al-Ikhlas" },
  ],
  Hadith: [
    { id: "Arb1", title: "Actions are by Intentions (Hadith 1)" },
    { id: "Arb2", title: "Islam, Iman, Ihsan (Hadith 2)" },
    { id: "Arb3", title: "Pillars of Islam (Hadith 3)" },
  ],
  Mutoon: [
    { id: "Thalatha", title: "Thalathat al-Usul (The 3 Principles)" },
    { id: "Wasitiyya", title: "Al-Aqidah Al-Wasitiyyah" },
    { id: "Qawaid", title: "Al-Qawa'id al-Arba' (The 4 Rules)" },
  ]
};

type Category = 'Quran' | 'Hadith' | 'Mutoon';

export default function MualimPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Quran');
  const [selectedText, setSelectedText] = useState(MOCK_LIBRARY.Quran[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MualimFeedbackOutput | null>(null);
  const [transcription, setTranscription] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const startReciting = () => {
    setIsRecording(true);
    setResult(null);
    setTranscription("Bismillah...");
    // Simulated transcription growth
    const timer = setInterval(() => {
      setTranscription(prev => prev + " .");
    }, 1000);
    setTimeout(() => clearInterval(timer), 5000);
  };

  const stopReciting = async () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    try {
      const data = await provideRecitationFeedback({ 
        category: activeCategory,
        textReference: selectedText.title, 
        transcription: transcription || "Bismillahirahman nirahim" 
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-2">
        <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <Mic className={cn("w-10 h-10 text-primary", isRecording && "animate-pulse")} />
        </div>
        <h1 className="text-4xl font-headline font-bold">Al-Mualim AI Teacher</h1>
        <p className="text-muted-foreground italic">Recite Quran, Hadith, or Mutoon for scholarly AI feedback.</p>
      </header>

      <section className="space-y-6">
        <Tabs defaultValue="Quran" onValueChange={(v) => {
          const cat = v as Category;
          setActiveCategory(cat);
          setSelectedText(MOCK_LIBRARY[cat][0]);
          setResult(null);
        }}>
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 p-1">
            <TabsTrigger value="Quran" className="gap-2">
              <BookOpen className="w-4 h-4" /> Quran
            </TabsTrigger>
            <TabsTrigger value="Hadith" className="gap-2">
              <ScrollText className="w-4 h-4" /> Hadith
            </TabsTrigger>
            <TabsTrigger value="Mutoon" className="gap-2">
              <Library className="w-4 h-4" /> Mutoon
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 grid gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Select Text to Recite</label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {MOCK_LIBRARY[activeCategory].map((item) => (
                <Button 
                  key={item.id} 
                  variant={selectedText.id === item.id ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap h-10 px-4 rounded-xl text-xs"
                  onClick={() => {
                    setSelectedText(item);
                    setResult(null);
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        </Tabs>

        <Card className="w-full glass-card border-none shadow-2xl overflow-hidden">
          <CardContent className="p-8 flex flex-col items-center gap-6">
            <div className="h-24 w-full flex items-center justify-center gap-1">
              {isRecording && hasMounted ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1.5 bg-primary rounded-full animate-bounce"
                    style={{ 
                      height: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.6s'
                    }}
                  />
                ))
              ) : (
                <Waves className="w-12 h-12 text-muted-foreground opacity-20" />
              )}
            </div>

            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary">Target: {selectedText.title}</Badge>
              {isRecording && (
                <p className="text-lg font-serif text-literata italic animate-pulse">
                  "{transcription}"
                </p>
              )}
            </div>

            <div className="flex gap-4">
              {!isRecording ? (
                <Button 
                  size="lg" 
                  className="rounded-full h-16 px-10 gap-3 text-lg font-headline shadow-lg shadow-primary/20"
                  onClick={startReciting}
                >
                  <Mic className="w-6 h-6" /> Start Reciting
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="destructive"
                  className="rounded-full h-16 px-10 gap-3 text-lg font-headline"
                  onClick={stopReciting}
                >
                  <MicOff className="w-6 h-6" /> Stop & Analyze
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isAnalyzing && (
          <div className="flex flex-col items-center gap-3 py-10">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm font-headline text-muted-foreground uppercase tracking-widest">Al-Mualim is analyzing accuracy...</p>
          </div>
        )}

        {result && (
          <Card className={cn(
            "w-full animate-in slide-in-from-bottom-4 duration-500",
            result.isCorrect ? "border-green-500/20 bg-green-500/5" : "border-amber-500/20 bg-amber-500/5"
          )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-headline flex items-center gap-2">
                {result.isCorrect ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-amber-500" />}
                Assessment Result
              </CardTitle>
              <Badge variant={result.isCorrect ? "default" : "secondary"} className={cn(result.isCorrect && "bg-green-600")}>
                {result.isCorrect ? "Mumtaz!" : "Needs Review"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6 p-6 pt-0">
              <div className="prose prose-invert max-w-none text-literata text-lg leading-relaxed">
                <p>{result.feedback}</p>
              </div>

              {result.corrections.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Focus Points</span>
                  <div className="flex flex-wrap gap-2">
                    {result.corrections.map((c, i) => (
                      <Badge key={i} variant="outline" className="border-primary/20 text-primary">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border/50">
                <p className="text-sm italic text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {result.encouragement}
                </p>
              </div>

              <Button variant="ghost" className="w-full gap-2 text-xs uppercase font-bold tracking-widest" onClick={() => setResult(null)}>
                <RotateCcw className="w-3 h-3" /> Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <footer className="bg-secondary/20 p-6 rounded-2xl border border-border flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <Volume2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-headline font-bold text-sm">Memorization Mode</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Toggle between listening feedback and verbatim memorization checks.</p>
        </div>
      </footer>
    </div>
  );
}
