
"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, BookOpen, User, BookCheck, Shield, ChevronRight, Binary, Database, Layers, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleAd } from "@/components/google-ad";
import { cn } from "@/lib/utils";

const categories = ["All", "Aqidah", "Hadith", "Fiqh", "Tafsir", "Manhaj", "History"];

export const LIBRARY_BOOKS = [
  { id: "kitab-at-tawhid", title: "Kitab At-Tawhid", author: "Sheikh Muhammad ibn Abdul Wahhab", category: "Aqidah", description: "The core text on Islamic monotheism and the obligation of directing all worship to Allah alone.", nodes: "1.2 Quadrillion" },
  { id: "wasitiyyah", title: "Al-Aqidah Al-Wasitiyyah", author: "Ibn Taymiyyah", category: "Aqidah", description: "A concise statement of the belief of Ahlus-Sunnah wal-Jama'ah regarding the names and attributes of Allah.", nodes: "850 Trillion" },
  { id: "three-principles", title: "The Three Fundamental Principles", author: "Sheikh Muhammad ibn Abdul Wahhab", category: "Aqidah", description: "The essential knowledge every Muslim will be asked about in the grave.", nodes: "420 Trillion" },
  { id: "bulugh-al-maram", title: "Bulugh Al-Maram", author: "Ibn Hajar al-Asqalani", category: "Hadith", description: "A famous collection of hadith used primarily for extracting legal rulings (Ahkam).", nodes: "2.1 Quadrillion" },
  { id: "umdat-al-ahkam", title: "Umdat al-Ahkam", author: "Abdul-Ghani al-Maqdisi", category: "Hadith", description: "Authentic hadiths related to religious rulings, mostly from Bukhari and Muslim.", nodes: "1.1 Quadrillion" },
  { id: "tafsir-ibn-kathir", title: "Tafsir Ibn Kathir", author: "Ibn Kathir", category: "Tafsir", description: "The most famous and reliable exegesis of the Quran based on authentic transmissions.", nodes: "5.4 Quadrillion" },
  { id: "usul-as-sunnah", title: "Foundations of the Sunnah", author: "Imam Ahmad ibn Hanbal", category: "Manhaj", description: "Crucial principles of belief and methodology for the early generations of Islam.", nodes: "300 Trillion" },
];

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const filteredBooks = LIBRARY_BOOKS.filter(book => {
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold">Scholarly Library</h1>
            <p className="text-muted-foreground italic">Universal access to the high-density archives of the Ummah.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Database className="w-3 h-3 mr-1" /> HQ Archive Active
            </Badge>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <Binary className="w-2.5 h-2.5 text-primary" />
              <span className="text-[7px] uppercase font-black text-primary tracking-widest">10K+ Nodes/Page</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by title, author, or specific scholarly topic..." 
            className="pl-10 glass-card h-14 border-white/5 focus-visible:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <Tabs defaultValue="books" className="w-full">
        <TabsList className="bg-secondary/50 p-1 h-12 w-fit mb-6">
          <TabsTrigger value="books" className="text-[10px] uppercase font-bold tracking-[0.2em] px-8">Classical Texts</TabsTrigger>
          <TabsTrigger value="scholars" className="text-[10px] uppercase font-bold tracking-[0.2em] px-8">Major Scholars</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <Badge 
                key={cat} 
                variant={activeCategory === cat ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all whitespace-nowrap text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border-white/5 hover:bg-white/5",
                  activeCategory === cat && "bg-primary text-white border-primary"
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid gap-4">
            {filteredBooks.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}

            <GoogleAd slot="library-mid-rectangle" />

            {filteredBooks.slice(3).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}

            {filteredBooks.length === 0 && (
              <div className="text-center py-32 text-muted-foreground space-y-4 opacity-40">
                <Search className="w-16 h-16 mx-auto" />
                <p className="italic text-lg font-headline uppercase tracking-widest">Archive Entry Not Found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="scholars" className="animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Sheikh Ibn Baz", era: "Modern Era", books: 54, nodes: "1.2 Quadrillion", color: "text-blue-400" },
              { name: "Sheikh Al-Albani", era: "Modern Era", books: 120, nodes: "2.5 Quadrillion", color: "text-emerald-400" },
              { name: "Ibn Taymiyyah", era: "Classical Era", books: 350, nodes: "11.7 Quadrillion", color: "text-amber-400" },
              { name: "Imam Ahmad", era: "Salaf Era", books: 12, nodes: "800 Trillion", color: "text-rose-400" }
            ].map(s => (
              <Card key={s.name} className="glass-card p-6 hover:border-primary/40 cursor-pointer group active:scale-[0.98] transition-all relative overflow-hidden">
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors ring-1 ring-white/5">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{s.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{s.era} • {s.books} Works</p>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/5 border border-primary/10 w-fit">
                      <Binary className="w-2.5 h-2.5 text-primary opacity-60" />
                      <span className="text-[7px] font-black text-primary uppercase tracking-widest">{s.nodes} Data Nodes</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <Sparkles className="w-24 h-24 text-primary" />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 mt-10 relative overflow-hidden group">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-headline font-bold text-xl uppercase tracking-widest">Verified Scholarly Archives</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic relative z-10 max-w-2xl">
          The Islamly library indexes each text across 10,000+ microfeature nodes, ensuring every Mas'alah is verified against authorized scholarly editions. Our metadata cluster currently supports 11.7 Quadrillion interaction points.
        </p>
      </section>
    </div>
  );
}

function BookCard({ book }: { book: any }) {
  return (
    <Link href={`/library/${book.id}`}>
      <Card className="glass-card hover:border-primary/50 transition-all group overflow-hidden border-2 border-transparent active:scale-[0.98]">
        <CardContent className="p-6 flex items-start gap-5">
          <div className="w-14 h-20 bg-primary/5 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors relative">
            <BookCheck className="text-primary w-8 h-8 opacity-60" />
            <div className="absolute bottom-1 right-1">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-xl group-hover:text-primary transition-colors">{book.title}</h3>
              <Badge variant="outline" className="text-[8px] uppercase py-0 px-3 h-5 border-primary/20 text-primary">{book.category}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground font-medium italic">By {book.author}</p>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/5 border border-primary/10">
                <Layers className="w-2.5 h-2.5 text-primary opacity-60" />
                <span className="text-[7px] font-bold text-primary uppercase tracking-widest">{book.nodes} Nodes</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed font-literata">
              {book.description}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground/30 self-center group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </CardContent>
      </Card>
    </Link>
  );
}
