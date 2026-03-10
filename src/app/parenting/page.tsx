
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Baby, BookOpen, Star, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const articles = [
  { title: "Nurturing Love for Allah", cat: "Aqidah", icon: Star },
  { title: "Managing Screen Time", cat: "Practical", icon: Sparkles },
  { title: "The Power of Dua", cat: "Spiritual", icon: Heart },
];

export default function ParentingPage() {
  const handleComingSoon = () => {
    toast({ title: "Coming Soon", description: "Raising children upon the Sunnah is our top priority. This node is being indexed." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <Baby className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold">Islamic Parenting</h1>
        <p className="text-muted-foreground max-w-sm mx-auto italic">
          Raising the next generation upon the Sunnah.
        </p>
      </header>

      <div className="grid gap-6">
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Recent Guides</h3>
          <div className="grid gap-3">
            {articles.map((art) => (
              <Card key={art.title} className="glass-card hover:bg-primary/5 transition-all cursor-pointer group" onClick={handleComingSoon}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/20">
                    <art.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline font-semibold text-sm">{art.title}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 py-0 mt-1 uppercase opacity-60">{art.cat}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Parenting Community
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Join our circles to discuss challenges and share wisdom with other Muslim parents.
            </p>
            <Button className="w-full bg-primary font-headline" onClick={handleComingSoon}>Join Circle</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
