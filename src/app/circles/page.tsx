"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  Lock, 
  Globe, 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Database,
  ArrowUpRight,
  CircleDot,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const activeCircles = [
  { id: 1, name: "Aqidah Essentials", members: 1240, region: "Global", status: "Active" },
  { id: 2, name: "Hifdh revision - Juz 30", members: 850, region: "UK/Europe", status: "Live Now" },
  { id: 3, name: "Fiqh of Transactions", members: 420, region: "Global", status: "Closed" },
  { id: 4, name: "Beginner Arabic", members: 2100, region: "Global", status: "Active" },
];

export default function CirclesPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [joiningId, setJoiningId] = useState<number | null>(null);
  const [joinedCircles, setJoinedCircles] = useState<number[]>([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleJoin = (circleId: number, name: string) => {
    setJoiningId(circleId);
    setTimeout(() => {
      setJoinedCircles(prev => [...prev, circleId]);
      setJoiningId(null);
      toast({ title: "Joined Circle", description: `You are now a member of ${name}.` });
    }, 1500);
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <Users className="text-primary w-10 h-10" />
              Study Circles
            </h1>
            <p className="text-muted-foreground italic">Interactive Halaqat moderated by students of knowledge.</p>
          </div>
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 gap-1 border-blue-500/20">
            <CircleDot className="w-3 h-3 animate-pulse" /> 42 Nodes Live
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search for a topic or circle..." 
            className="pl-10 glass-card h-14"
          />
        </div>
      </header>

      <section className="bg-primary/5 border border-primary/20 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-widest">Moderation Infrastructure</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every Islamly circle is governed by a strict scholarly framework. Any discussions deviating from the methodology of the Salaf are automatically flagged by our 1 billion node moderation layer.
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Join a Scholarly Network</h3>
        {activeCircles.map((circle) => {
          const isJoined = joinedCircles.includes(circle.id);
          const isJoining = joiningId === circle.id;

          return (
            <Card key={circle.id} className={cn(
              "glass-card group transition-all border-2",
              isJoined ? "border-emerald-500/30 bg-emerald-500/5" : "border-transparent"
            )}>
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-5 w-full">
                  <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <MessageSquare className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{circle.name}</h3>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {circle.members} Students</span>
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {circle.region}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Badge variant={circle.status === 'Live Now' ? 'default' : 'outline'} className={cn(
                    "text-[8px] uppercase font-black",
                    circle.status === 'Live Now' && "bg-emerald-600 animate-pulse"
                  )}>
                    {circle.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant={isJoined ? "ghost" : "default"}
                    className={cn("flex-1 sm:flex-none uppercase font-black text-[10px] tracking-widest", isJoined && "text-emerald-500")}
                    disabled={isJoined || isJoining || circle.status === 'Closed'}
                    onClick={() => handleJoin(circle.id, circle.name)}
                  >
                    {isJoining ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : isJoined ? <CheckCircle2 className="w-3 h-3 mr-2" /> : null}
                    {isJoined ? "Joined" : isJoining ? "Joining..." : "Join Circle"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <footer className="bg-secondary/20 p-8 rounded-3xl border border-white/5 text-center space-y-4">
        <Lock className="w-8 h-8 text-muted-foreground mx-auto opacity-20" />
        <div className="space-y-1">
          <h4 className="font-headline font-bold text-sm text-foreground">Private Circle Node</h4>
          <p className="text-xs text-muted-foreground italic">Authenticated students can initialize private study groups for focused research.</p>
        </div>
        <Button 
          variant="outline" 
          className="text-[10px] uppercase font-black tracking-widest border-white/10 hover:bg-white/5 px-8"
          onClick={() => toast({ title: "Request Received", description: "Your private node request is in the scholarly queue." })}
        >
          Request Private Node
        </Button>
      </footer>
    </div>
  );
}
