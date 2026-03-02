
"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories = ["All", "Aqidah", "Hadith", "Fiqh", "Tafsir", "Manhaj", "History"];

const books = [
  { id: 1, title: "Kitab At-Tawhid", author: "Sheikh Muhammad ibn Abdul Wahhab", category: "Aqidah", description: "The core text on Islamic monotheism." },
  { id: 2, title: "Al-Aqidah Al-Wasitiyyah", author: "Ibn Taymiyyah", category: "Aqidah", description: "A concise statement of the belief of Ahlus-Sunnah wal-Jama'ah." },
  { id: 3, title: "The Three Fundamental Principles", author: "Sheikh Muhammad ibn Abdul Wahhab", category: "Aqidah", description: "Essentials every Muslim must know." },
  { id: 4, title: "Bulugh Al-Maram", author: "Ibn Hajar al-Asqalani", category: "Hadith", description: "A collection of hadith for legal rulings." },
  { id: 5, title: "Umdat al-Ahkam", author: "Abdul-Ghani al-Maqdisi", category: "Hadith", description: "Authentic hadiths related to religious rulings." },
  { id: 6, title: "Tafsir Ibn Kathir", author: "Ibn Kathir", category: "Tafsir", description: "The most famous exegesis of the Quran." },
];

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(book => {
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="space-y-4">
        <h1 className="text-3xl font-headline font-bold">Text Library</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by title, author, or topic..." 
            className="pl-10 glass-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <Badge 
            key={cat} 
            variant={activeCategory === cat ? "default" : "secondary"}
            className="cursor-pointer transition-colors whitespace-nowrap"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/library/${book.id}`}>
            <Card className="glass-card hover:border-primary/50 transition-all group">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-12 h-16 bg-primary/20 rounded flex items-center justify-center shrink-0">
                  <BookOpen className="text-primary w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-semibold text-lg group-hover:text-primary transition-colors">{book.title}</h3>
                    <Badge variant="outline" className="text-[10px] uppercase py-0">{book.category}</Badge>
                  </div>
                  <p className="text-sm text-accent italic">{book.author}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{book.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No texts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
