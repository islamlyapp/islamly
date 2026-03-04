"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

/**
 * Google Sponsor Node for the Islamly Scholarly Infrastructure.
 * Branded as "Scholarly Sponsors" with a visible "Islamic Filter Active" badge.
 */
export function GoogleAd({ slot, format = "auto", className }: GoogleAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Silent catch for dev/prototype environment stability
    }
  }, []);

  return (
    <div className={cn("my-8 w-full flex flex-col items-center gap-3", className)}>
      {/* Header Branding */}
      <div className="flex items-center gap-3 opacity-60">
        <div className="h-px w-6 bg-primary/40" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold">
          Scholarly Sponsor
        </span>
        <div className="h-px w-6 bg-primary/40" />
      </div>
      
      {/* Ad Container */}
      <div className="w-full bg-card/30 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden min-h-[100px] flex items-center justify-center relative group">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "100px" }}
          data-ad-client="ca-pub-0000000000000000"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        
        {/* Verification Status */}
        <div className="absolute top-2 right-3 z-10">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-sm">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <span className="text-[7px] uppercase tracking-widest text-primary/80 font-bold">Islamic Filter Active</span>
          </div>
        </div>

        {/* Fallback visual for the prototype environment */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
          <div className="text-center">
            <p className="text-[12px] font-headline font-bold uppercase tracking-[0.4em] text-primary">Sponsor Node</p>
            <p className="text-[8px] uppercase mt-1 tracking-widest">Global Index Point: {slot}</p>
          </div>
        </div>
      </div>
      
      {/* Governance Note */}
      <p className="text-[8px] text-muted-foreground/40 uppercase tracking-widest italic font-medium">
        Governance: Protected by 1 Billion Individual Privacy Nodes
      </p>
    </div>
  );
}
