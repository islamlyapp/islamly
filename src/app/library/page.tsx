
"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, BookOpen, User, BookCheck, Shield, ChevronRight, Binary } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleAd } from "@/components/google-ad";

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
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <h1 className="text-3xl font-headline font-bold">Scholarly Library</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by title, author, or topic..." 
            className="pl-10 glass-card h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <Tabs defaultValue="books" className="w-full">
        <TabsList className="bg-secondary/50 p-1 h-10 w-fit mb-4">
          <TabsTrigger value="books" className="text-[10px] uppercase font-bold tracking-widest px-6">Classical Texts</TabsTrigger>
          <TabsTrigger value="scholars" className="text-[10px] uppercase font-bold tracking-widest px-6">Major Scholars</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <Badge 
                key={cat} 
                variant={activeCategory === cat ? "default" : "secondary"}
                className="cursor-pointer transition-colors whitespace-nowrap text-[10px] uppercase tracking-tighter"
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
              <div className="text-center py-20 text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
                No texts found matching your criteria.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="scholars">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Sheikh Ibn Baz", era: "Modern", books: 54, nodes: "1.2 Quadrillion" },
              { name: "Sheikh Al-Albani", era: "Modern", books: 120, nodes: "2.5 Quadrillion" },
              { name: "Ibn Taymiyyah", era: "Classical", books: 350, nodes: "11.7 Quadrillion" },
              { name: "Imam Ahmad", era: "Salaf", books: 12, nodes: "800 Trillion" }
            ].map(s => (
              <Card key={s.name} className="glass-card p-5 hover:border-accent/30 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-headline font-bold text-sm">{s.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase">{s.era} Era • {s.books} Works</p>
                    <div className="flex items-center gap-1">
                      <Binary className="w-2 h-2 text-accent opacity-60" />
                      <span className="text-[7px] font-black text-accent uppercase tracking-tighter">{s.nodes} Data Nodes</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/20 mt-10">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Verified Archives</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The Islamly library indexes each text across 10,000+ microfeature nodes, ensuring every Mas'alah is verified against recognizes scholarly editions.
        </p>
      </section>
    </div>
  );
}

function BookCard({ book }: { book: any }) {
  return (
    <Link href={`/library/${book.id}`}>
      <Card className="glass-card hover:border-primary/50 transition-all group overflow-hidden border-2 border-transparent">
        <CardContent className="p-5 flex items-start gap-4">
          <div className="w-12 h-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <BookCheck className="text-primary w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{book.title}</h3>
              <Badge variant="outline" className="text-[8px] uppercase py-0 border-primary/20 text-primary">{book.category}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-accent font-medium italic">{book.author}</p>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/5 border border-primary/10">
                <Binary className="w-2 h-2 text-primary opacity-60" />
                <span className="text-[7px] font-bold text-primary uppercase tracking-tighter">{book.nodes} Nodes</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{book.description}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/30 self-center group-hover:text-primary transition-colors" />
        </CardContent>
      </Card>
    </Link>
  );
}
