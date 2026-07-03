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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden">
      {/* Background image with softer tone */}
      <div className="absolute inset-0 opacity-40">
        <Image 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Library Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/85" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(173,31,55,0.08),_transparent_70%)]" />
      
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-out ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
        
        {/* New Logo Branding */}
        <div className="relative mb-10 flex flex-col items-center gap-6">
          <div className="relative h-32 w-32 rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
            <Image
              src="/logo.png"
              alt="Islamly logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-3 text-center max-w-xs">
            <h1 className="text-3xl font-semibold text-white">Islamly</h1>
            <p className="text-sm leading-6 text-slate-200">A natural bridge between classical insight and everyday life.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs text-slate-200">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Salafi/Athari
        </div>
      </div>

      <div className="absolute bottom-24 flex flex-col items-center gap-6 w-full px-10 max-sm:max-w-sm">
        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-progress-shimmer shadow-[0_0_15px_rgba(173,31,55,0.25)]" />
        </div>
        
        <div className="h-12 flex items-center justify-center">
          {!showSkip ? (
            <div className="flex items-center gap-3 text-slate-300">
              <Loader2 className="w-3 h-3 animate-spin" />
              <p className="text-xs">Opening your guide…</p>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="rounded-full border border-primary/25 text-primary hover:bg-primary/10 hover:text-white transition-all gap-2 px-8 font-medium text-sm"
              onClick={handleManualEnter}
            >
              Continue to Islamly <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 text-center">
        <p className="text-xs text-slate-400">Salafi/Athari methodology • A thoughtful modern companion</p>
      </div>
    </div>
  );
}
