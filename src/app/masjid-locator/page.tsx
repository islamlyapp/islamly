"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Navigation, Phone, Loader2, Globe, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fetchMasjids } from "@/services/islamic-data-service";

export default function MasjidLocatorPage() {
  const [search, setSearch] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationActive, setLocationActive] = useState(false);
  const [masjids, setMasjids] = useState<any[]>([]);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    handleAutoDetect();
  }, []);

  const handleAutoDetect = () => {
    if ("geolocation" in navigator) {
      setIsDetecting(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          setLocationActive(true);
          const results = await fetchMasjids(latitude, longitude);
          setMasjids(results);
          setIsDetecting(false);
        },
        () => {
          setIsDetecting(false);
        }
      );
    }
  };

  const filteredMasjids = masjids.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
            <MapPin className="text-primary w-8 h-8" />
            Live Masjid Finder
          </h1>
          {locationActive && (
            <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
              <Navigation className="w-3 h-3" /> GPS Active
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground italic">Discover real Masjids worldwide using OpenStreetMap data.</p>
      </header>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Filter nearby masjids..." 
            className="pl-10 glass-card h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className={cn("h-12 w-12 p-0 rounded-xl glass-card", isDetecting && "animate-pulse")}
          onClick={handleAutoDetect}
          disabled={isDetecting}
        >
          {isDetecting ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Navigation className="w-5 h-5" />}
        </Button>
      </div>

      <div className="grid gap-4">
        {isDetecting && masjids.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 opacity-50" />
            Scanning global database...
          </div>
        )}

        {filteredMasjids.map((masjid) => (
          <Card key={masjid.id} className="glass-card hover:border-primary/50 transition-all overflow-hidden group">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{masjid.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {masjid.address}
                  </p>
                </div>
                {masjid.tags.website && (
                  <Badge variant="outline" className="text-[9px] uppercase border-primary/20 text-primary">Official Site</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {masjid.tags.capacity && (
                  <Badge variant="outline" className="text-[10px] uppercase border-white/10">Capacity: {masjid.tags.capacity}</Badge>
                )}
                {masjid.tags.wheelchair && (
                  <Badge variant="outline" className="text-[10px] uppercase border-white/10">Accessible</Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 h-9 gap-2 text-xs"
                  onClick={() => window.open(`https://www.openstreetmap.org/node/${masjid.id}`, '_blank')}
                >
                  <Globe className="w-3 h-3" /> View Data
                </Button>
                <Button 
                  className="flex-1 h-9 gap-2 text-xs bg-primary"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lon}`, '_blank')}
                >
                  <Navigation className="w-3 h-3" /> Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {!isDetecting && filteredMasjids.length === 0 && locationActive && (
          <div className="text-center py-20 text-muted-foreground">
            <MapPin className="w-10 h-10 mx-auto mb-4 opacity-20" />
            No Masjids found in this radius. Try moving your location.
          </div>
        )}
      </div>
      
      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Globe className="w-3 h-3" />
          <p className="text-[10px] uppercase tracking-[0.3em]">
            Global OpenStreetMap Infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
}
