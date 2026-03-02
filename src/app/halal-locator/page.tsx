"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Utensils, Search, Star, MapPin, ExternalLink, Navigation, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const restaurants = [
  { id: 1, name: "Olive & Fig", type: "Mediterranean", rating: 4.8, distance: "0.5 miles", status: "Certified Halal" },
  { id: 2, name: "The Curry House", type: "Indian", rating: 4.5, distance: "1.1 miles", status: "HMC Approved" },
  { id: 3, name: "Grill & Co", type: "Steakhouse", rating: 4.2, distance: "2.3 miles", status: "Certified Halal" },
];

export default function HalalLocatorPage() {
  const [search, setSearch] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationActive, setLocationActive] = useState(false);

  useEffect(() => {
    handleAutoDetect();
  }, []);

  const handleAutoDetect = () => {
    if ("geolocation" in navigator) {
      setIsDetecting(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationActive(true);
          setIsDetecting(false);
        },
        () => {
          setIsDetecting(false);
        }
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
            <Utensils className="text-accent w-8 h-8" />
            Halal Finder
          </h1>
          {locationActive && (
            <Badge className="bg-accent text-accent-foreground gap-1">
              <Navigation className="w-3 h-3" /> Localized
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground italic">Discover verified Halal dining experiences near your current coordinates.</p>
      </header>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search cuisine or restaurant..." 
            className="pl-10 glass-card h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className={cn("h-12 w-12 p-0 rounded-xl glass-card border-accent/20", isDetecting && "animate-pulse")}
          onClick={handleAutoDetect}
          disabled={isDetecting}
        >
          {isDetecting ? <Loader2 className="w-5 h-5 animate-spin text-accent" /> : <Navigation className="w-5 h-5 text-accent" />}
        </Button>
      </div>

      <div className="grid gap-4">
        {restaurants.map((res) => (
          <Card key={res.id} className="glass-card hover:border-accent/50 transition-all overflow-hidden group">
            <CardContent className="p-5 flex gap-4">
              <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                <Utensils className="text-accent w-8 h-8" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline font-bold text-lg group-hover:text-accent transition-colors">{res.name}</h3>
                    <p className="text-xs text-muted-foreground">{res.type} • {res.distance}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                    <Star className="w-3 h-3 fill-yellow-500" /> {res.rating}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-[9px] uppercase tracking-tighter">
                    {res.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1 px-2">
                    View Menu <ExternalLink className="w-2.5 h-2.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
