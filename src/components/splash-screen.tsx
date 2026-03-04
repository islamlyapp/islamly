
"use client";

import { ShieldCheck, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

/**
 * High-fidelity Splash Screen for Islamly.
 * Features white calligraphy, crimson accents, and smooth animations.
 */
export function SplashScreen() {
  const [show, setShow] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const brandHero = PlaceHolderImages.find(img => img.id === 'brand-hero')!;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    // Show manual override after 3 seconds if auth is taking too long
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(skipTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0304] overflow-hidden">
      {/* Background Image Matching Logo Vibe */}
      <div className="absolute inset-0 opacity-40">
        <Image 
          src={brandHero.imageUrl}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0304]/80 via-transparent to-[#0a0304]" />
      </div>

      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(173,31,55,0.25),_transparent_70%)] animate-pulse duration-3000" />
      
      {/* Content Container */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-out ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
        
        {/* Brand Calligraphy Display */}
        <div className="relative mb-12 flex flex-col items-center">
          <span 
            className="text-8xl md:text-9xl font-serif text-white drop-shadow-[0_10px_40px_rgba(173,31,55,0.9)] select-none" 
            dir="rtl"
          >
            إسلامي
          </span>
          <div className="absolute -inset-10 bg-primary/10 blur-3xl rounded-full" />
        </div>

        {/* Brand Title & Guard Status */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-primary/40" />
            <h1 className="text-xl font-headline font-bold tracking-[0.4em] text-white">ISLAMLY</h1>
            <div className="h-px w-8 bg-primary/40" />
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <ShieldCheck className="w-3 h-3 text-primary" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
              Scholarly Guard Active
            </p>
          </div>
        </div>
      </div>

      {/* Artificial Loading Indicator at Bottom */}
      <div className="absolute bottom-20 flex flex-col items-center gap-4 w-full px-10 max-w-sm">
        <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-progress-shimmer shadow-[0_0_10px_rgba(173,31,55,0.5)]" />
        </div>
        <div className="h-10 flex items-center justify-center">
          {!showSkip ? (
            <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 animate-pulse">
              Initialising Scholarly Infrastructure
            </p>
          ) : (
            <Button 
              variant="ghost" 
              className="text-[10px] uppercase tracking-widest text-primary hover:text-white transition-all gap-2 animate-in fade-in zoom-in duration-500"
              onClick={() => window.location.reload()}
            >
              Skip to App <ChevronRight className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 opacity-20">
        <p className="text-[10px] uppercase tracking-[0.5em] text-white">Ahlus-Sunnah wal-Jama'ah</p>
      </div>
    </div>
  );
}
