"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Globe, Calendar, ArrowRight, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "Global Moon Sighting Update",
    category: "Announcements",
    summary: "Scholarly committees across the globe begin preparations for the upcoming lunar month observations.",
    date: "2 hours ago",
    image: "https://picsum.photos/seed/moon/600/400"
  },
  {
    id: 2,
    title: "New Classical Text Digitized",
    category: "Library",
    summary: "A rare manuscript from the 4th century Hijri has been successfully digitized and added to the universal archives.",
    date: "5 hours ago",
    image: "https://picsum.photos/seed/manuscript/600/400"
  },
  {
    id: 3,
    title: "Ummah Relief Efforts Expanded",
    category: "Community",
    summary: "New humanitarian corridors opened to provide essential aid to displaced families in various regions.",
    date: "1 day ago",
    image: "https://picsum.photos/seed/relief/600/400"
  }
];

export default function NewsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-primary">
          <Newspaper className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Islamic News</h1>
        </div>
        <p className="text-muted-foreground italic">Curated updates and reports for the global Ummah.</p>
      </header>

      <section className="grid gap-6">
        {/* Featured News */}
        <Card className="glass-card overflow-hidden border-primary/20 bg-primary/5">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/featured/800/450" 
              alt="Featured News" 
              fill 
              className="object-cover transition-transform hover:scale-105 duration-700"
              data-ai-hint="mosque sunset"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-white">Featured</Badge>
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold">Universal Reach Support Expanded to 7709+ Languages</h2>
              <p className="text-muted-foreground leading-relaxed">
                Islamly's initiative to provide authentic knowledge translations has reached a historic milestone, now supporting every major spoken language on Earth.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 10 mins ago</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Global Outreach</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">Read More <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>

        {/* News Grid */}
        <div className="grid gap-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Recent Updates</h3>
          {newsItems.map((news) => (
            <Card key={news.id} className="glass-card hover:bg-secondary/30 transition-all group cursor-pointer overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5 space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary">{news.category}</Badge>
                    <span className="text-[10px] text-muted-foreground uppercase">{news.date}</span>
                  </div>
                  <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{news.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {news.summary}
                  </p>
                  <div className="pt-2 flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Share2 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-accent">Upcoming Events</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed italic">
          Scholarly webinars and community gatherings are updated weekly. Ensure your notifications are active in profile settings.
        </p>
      </section>
    </div>
  );
}
