"use client";

import { ShieldCheck, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { calculateCurrentFeatures, formatFeatureCount } from "@/lib/feature-counter";

export function SplashScreen() {
  const [show, setShow] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [featureCount, setFeatureCount] = useState<string>("2.5 Billion");
  
  const brandHero = PlaceHolderImages?.find(img => img.id === 'brand-hero');

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    const skipTimer = setTimeout(() => setShowSkip(true), 1500);
    
    try {
      const count = calculateCurrentFeatures();
      setFeatureCount(formatFeatureCount(count));
    } catch (e) {
      console.warn("Feature count calculation failed");
    }
    
    return () => {
      clearTimeout(timer);
      clearTimeout(skipTimer);
    };
  }, []);

  const handleManualEnter = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0304] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {brandHero && (
          <Image 
            src={brandHero.imageUrl}
            alt="Library Background"
            fill
            className="object-cover"
            priority
            data-ai-hint="dark library"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0304] via-transparent to-[#0a0304]" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(173,31,55,0.2),_transparent_70%)] animate-pulse duration-3000" />
      
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-out ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
        
        <div className="relative mb-12 flex flex-col items-center group">
          <span 
            className="text-8xl md:text-9xl font-serif text-white drop-shadow-[0_0_30px_rgba(173,31,55,0.8)] select-none transition-transform duration-700 group-hover:scale-105" 
            dir="rtl"
          >
            إسلاملي
          </span>
          <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-50" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <h1 className="text-2xl font-headline font-bold tracking-[0.5em] text-white">ISLAMLY</h1>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </div>
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold">
              {featureCount} Features Indexed
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 flex flex-col items-center gap-6 w-full px-10 max-w-sm">
        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-progress-shimmer shadow-[0_0_15px_rgba(173,31,55,0.8)]" />
        </div>
        
        <div className="h-12 flex items-center justify-center">
          {!showSkip ? (
            <div className="flex items-center gap-3 text-white/40">
              <Loader2 className="w-3 h-3 animate-spin" />
              <p className="text-[9px] uppercase tracking-[0.4em]">Booting Global Scholarly Network</p>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="rounded-full border-primary/40 text-primary hover:bg-primary hover:text-white transition-all gap-2 px-8 font-headline font-bold text-xs uppercase tracking-widest animate-in fade-in zoom-in duration-500"
              onClick={handleManualEnter}
            >
              Enter Infrastructure <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 opacity-30">
        <p className="text-[9px] uppercase tracking-[0.6em] text-white font-bold">Ahlus-Sunnah wal-Jama'ah • Dynamic Infrastructure</p>
      </div>
    </div>
  );
}
