"use client";

import { ShieldCheck, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SplashScreen() {
  const [show, setShow] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    const skipTimer = setTimeout(() => setShowSkip(true), 1500);
    
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
      {/* Exact Logo Aesthetic Background */}
      <div className="absolute inset-0 opacity-40">
        <Image 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Library Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0304] via-transparent to-[#0a0304]" />
      </div>

      {/* Crimson Swoosh Accents */}
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none opacity-20">
        <div className="absolute top-10 left-0 w-full h-1 bg-primary blur-2xl -rotate-2" />
        <div className="absolute top-20 left-0 w-full h-1 bg-primary blur-3xl rotate-1" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 pointer-events-none opacity-20">
        <div className="absolute bottom-10 left-0 w-full h-1 bg-primary blur-2xl rotate-2" />
        <div className="absolute bottom-20 left-0 w-full h-1 bg-primary blur-3xl -rotate-1" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(173,31,55,0.15),_transparent_70%)]" />
      
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-out ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
        
        {/* New Logo Branding */}
        <div className="relative mb-10 flex flex-col items-center gap-6">
          <div className="relative h-32 w-32 rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
            <Image
              src="/logo.png"
              alt="Islamly logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-3 text-center max-w-xs">
            <h1 className="text-3xl font-black uppercase tracking-[0.35em] text-white">Islamly</h1>
            <p className="text-sm leading-6 text-white/70">A natural bridge between classical scholarship and modern lifestyle.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase tracking-[0.35em] text-white/80">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Ahlus-Sunnah wal-Jama'ah
        </div>
      </div>

      <div className="absolute bottom-24 flex flex-col items-center gap-6 w-full px-10 max-sm:max-w-sm">
        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-progress-shimmer shadow-[0_0_15px_rgba(173,31,55,0.8)]" />
        </div>
        
        <div className="h-12 flex items-center justify-center">
          {!showSkip ? (
            <div className="flex items-center gap-3 text-white/40">
              <Loader2 className="w-3 h-3 animate-spin" />
              <p className="text-[9px] uppercase tracking-[0.4em]">Initializing Scholarly Resources</p>
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

      <div className="absolute bottom-10 opacity-30 text-center">
        <p className="text-[9px] uppercase tracking-[0.6em] text-white font-bold">Ahlus-Sunnah wal-Jama'ah • Scholarly Infrastructure</p>
      </div>
    </div>
  );
}
