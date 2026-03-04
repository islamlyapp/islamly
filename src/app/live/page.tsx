
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Radio, Users, Calendar, Play, Loader2, Database } from "lucide-react";
import Image from "next/image";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy, limit } from "firebase/firestore";

export default function LivePage() {
  const db = useFirestore();

  const liveVideosQuery = useMemoFirebase(() => {
    return query(
      collection(db, "videos"),
      where("isLive", "==", true),
      orderBy("postedAt", "desc"),
      limit(1)
    );
  }, [db]);

  const recentVideosQuery = useMemoFirebase(() => {
    return query(
      collection(db, "videos"),
      where("isLive", "==", false),
      orderBy("postedAt", "desc"),
      limit(5)
    );
  }, [db]);

  const { data: liveData, isLoading: isLiveLoading } = useCollection(liveVideosQuery);
  const { data: recentData, isLoading: isRecentLoading } = useCollection(recentVideosQuery);

  const activeStream = liveData?.[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-primary">
          <Video className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Islamly Live</h1>
        </div>
        {activeStream && <Badge variant="destructive" className="animate-pulse">Live Now</Badge>}
      </header>

      {isLiveLoading ? (
        <div className="h-[200px] flex items-center justify-center bg-secondary/10 rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin text-primary opacity-20" />
        </div>
      ) : activeStream ? (
        <section className="relative aspect-video rounded-2xl overflow-hidden bg-black group cursor-pointer shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/lecture/800/450')] bg-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary/80 transition-all">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 p-6 space-y-1 w-full bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-red-600 text-[10px]">LIVE BROADCAST</Badge>
              <span className="text-white/80 text-xs flex items-center gap-1 font-bold">
                <Users className="w-3 h-3" /> Global Node Active
              </span>
            </div>
            <h2 className="text-xl font-headline font-bold text-white">{activeStream.title}</h2>
            <p className="text-white/60 text-sm">{activeStream.description}</p>
          </div>
        </section>
      ) : (
        <Card className="glass-card p-10 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center opacity-40">
            <Video className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-headline font-bold text-lg">No Live Broadcast</h3>
            <p className="text-muted-foreground text-sm italic">Check upcoming events below or browse recent uploads.</p>
          </div>
        </Card>
      )}

      <section className="space-y-4">
        <h3 className="text-lg font-headline font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Scholarly Recordings
        </h3>
        <div className="grid gap-3">
          {recentData?.map((stream) => (
            <Card key={stream.id} className="glass-card hover:bg-secondary/30 transition-colors group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1 flex-1 pr-4">
                  <h4 className="font-headline font-bold text-sm group-hover:text-primary transition-colors">{stream.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{stream.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <Button variant="ghost" size="sm" className="h-8 gap-2 text-[10px] font-bold uppercase tracking-widest">
                    Watch Now <Play className="w-2.5 h-2.5 fill-current" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {(!recentData || recentData.length === 0) && !isRecentLoading && (
            <p className="text-xs text-muted-foreground italic pl-1">Accessing archives... No recent recordings found.</p>
          )}
        </div>
      </section>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <Radio className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-headline font-bold text-sm">24/7 Quran Radio</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Continuous recitation by world-renowned Qaris via universal node.</p>
          <Button variant="link" className="p-0 h-auto text-primary text-xs mt-2 font-bold uppercase tracking-widest">Listen Now</Button>
        </div>
        <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Sync Active</Badge>
      </section>
    </div>
  );
}
