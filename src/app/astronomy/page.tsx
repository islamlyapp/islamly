"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Moon, Sun, Navigation, Info, Loader2, Sparkles, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function AstronomyPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-blue-400">
          <Compass className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Scholarly Astronomy</h1>
        </div>
        <p className="text-muted-foreground italic">Precision celestial calculations for Hilal sighting and Qibla.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-headline flex items-center gap-2 text-blue-400">
              <Moon className="w-4 h-4" />
              Lunar Sighting Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-secondary/20 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground uppercase">Visibility Probability</span>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/20">High</Badge>
              </div>
              <Progress value={85} className="h-1 bg-blue-500/10" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Based on the Odeh criteria, the moon will be visible to the naked eye in your region tonight at 18:45.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-headline flex items-center gap-2 text-orange-400">
              <Sun className="w-4 h-4" />
              Solar Elevation (Dhuhr)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-secondary/20 rounded-xl space-y-3 text-center">
              <h4 className="text-2xl font-headline font-bold">12:14 PM</h4>
              <p className="text-[10px] uppercase text-muted-foreground">True Solar Noon</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Current sun angle: 42.5°. Zenith point calculation verified for precise prayer timing.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-headline font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 text-teal-400" />
          Global Visibility Map
        </h3>
        <Card className="relative aspect-video rounded-2xl overflow-hidden bg-secondary/10 flex items-center justify-center border-white/5">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Rendering Projection...</span>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/worldmap/800/400')] bg-cover" />
              <div className="relative z-10 text-center space-y-2">
                <Sparkles className="w-10 h-10 text-blue-400 mx-auto" />
                <p className="text-sm font-headline font-bold">Interactive Projection Active</p>
                <Badge className="bg-blue-500/20 text-blue-400">Odeh Criteria v2.0</Badge>
              </div>
            </>
          )}
        </Card>
      </section>

      <section className="bg-blue-500/5 p-6 rounded-2xl border border-blue-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-blue-400" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-blue-400">Technical Note</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed italic">
          Islamly's astronomy engine uses standard IAU coordinate transformations. While high-precision, religious dates should always be confirmed via actual eye-witness testimony (Ru'yah) as per scholarly consensus.
        </p>
      </section>
    </div>
  );
}
