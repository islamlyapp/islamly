
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Utensils, 
  Search, 
  Navigation, 
  MapPin, 
  Loader2, 
  Globe, 
  ShieldCheck,
  Star,
  ChevronRight,
  Database,
  Layers,
  Store,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fetchHalalPlaces } from "@/services/islamic-data-service";

export default function HalalLocatorPage() {
  const [search, setSearch] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [places, setPlaces] = useState<any[]>([]);
  const [locationActive, setLocationActive] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    handleAutoDetect();
  }, []);

  const handleAutoDetect = () => {
    if ("geolocation" in navigator) {
      setIsDetecting(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocationActive(true);
          const results = await fetchHalalPlaces(latitude, longitude);
          setPlaces(results);
          setIsDetecting(false);
        },
        () => {
          setIsDetecting(false);
        }
      );
    }
  };

  const filteredPlaces = places.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.address.toLowerCase().includes(search.toLowerCase())
  );

  if (!hasMounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold flex items-center gap-3 text-emerald-500">
            <Utensils className="w-8 h-8" />
            Halal Infrastructure
          </h1>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <Database className="w-3 h-3 mr-1" /> Live Overpass Node
          </Badge>
        </div>
        <p className="text-muted-foreground italic">Discovering verified Tayyib provisions across global coordinates.</p>
      </header>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Filter establishments..." 
            className="pl-10 glass-card h-14 focus-visible:ring-emerald-500/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className={cn("h-14 w-14 p-0 rounded-xl glass-card", isDetecting && "animate-pulse")}
          onClick={handleAutoDetect}
          disabled={isDetecting}
        >
          {isDetecting ? <Loader2 className="w-5 h-5 animate-spin text-emerald-500" /> : <Navigation className="w-5 h-5" />}
        </Button>
      </div>

      <section className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-tight">Geo-Spatial Audit Node</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Syncing with OpenStreetMap diet:halal clusters.</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-400 shrink-0">11.7Q Features</Badge>
      </section>

      <div className="grid gap-4">
        {isDetecting && places.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 opacity-50" />
            Scanning global Tayyib clusters...
          </div>
        )}

        {filteredPlaces.map((node) => (
          <Card key={node.id} className="glass-card hover:border-emerald-500/50 transition-all overflow-hidden group">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-lg group-hover:text-emerald-500 transition-colors">{node.name}</h3>
                    <Badge variant="outline" className="text-[8px] uppercase border-emerald-500/20 text-emerald-500">{node.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {node.address}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/10">
                    <Layers className="w-2.5 h-2.5 text-emerald-500 opacity-60" />
                    <span className="text-[7px] font-bold text-emerald-500 uppercase tracking-tighter">Verified Node</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-500/5 text-emerald-500 border-none text-[9px] font-black uppercase tracking-widest">
                    OSM Authenticated
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 text-[10px] font-black uppercase"
                    onClick={() => window.open(`https://www.openstreetmap.org/node/${node.id}`, '_blank')}
                  >
                    <Globe className="w-3 h-3 mr-1" /> Data Node
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-8 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-black uppercase"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${node.lat},${node.lon}`, '_blank')}
                  >
                    <Navigation className="w-3 h-3 mr-1" /> Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!isDetecting && filteredPlaces.length === 0 && locationActive && (
          <div className="text-center py-20 text-muted-foreground">
            <Utensils className="w-10 h-10 mx-auto mb-4 opacity-20" />
            No Halal nodes detected in this radius.
          </div>
        )}
      </div>
      
      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Globe className="w-3 h-3" />
          <p className="text-[10px] uppercase tracking-[0.3em]">
            Global Tayyib Infrastructure • Real-time API v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
