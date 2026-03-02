"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Navigation, Phone, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const masjids = [
  { id: 1, name: "Central Islamic Centre", address: "123 Faith St, London", distance: "0.8 miles", facilities: ["Parking", "Sisters Area", "Library"] },
  { id: 2, name: "Al-Noor Mosque", address: "45 Peace Ave, London", distance: "1.2 miles", facilities: ["Wudu Area", "Sisters Area"] },
  { id: 3, name: "The Sunnah Masjid", address: "78 Truth Rd, London", distance: "2.5 miles", facilities: ["Classes", "Youth Club"] },
];

export default function MasjidLocatorPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
          <MapPin className="text-primary w-8 h-8" />
          Masjid Locator
        </h1>
        <p className="text-muted-foreground italic">Find your nearest house of Allah.</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search by area or postcode..." 
          className="pl-10 glass-card h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {masjids.map((masjid) => (
          <Card key={masjid.id} className="glass-card hover:border-primary/50 transition-all overflow-hidden group">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{masjid.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {masjid.address}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">{masjid.distance}</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {masjid.facilities.map(f => (
                  <Badge key={f} variant="outline" className="text-[10px] uppercase border-white/10">{f}</Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 h-9 gap-2 text-xs">
                  <Phone className="w-3 h-3" /> Call
                </Button>
                <Button className="flex-1 h-9 gap-2 text-xs bg-primary">
                  <Navigation className="w-3 h-3" /> Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
