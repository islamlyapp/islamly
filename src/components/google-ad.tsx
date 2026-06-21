"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

/**
 * Google Sponsor infrastructure for the Islamly platform.
 * Optimized with a strict initialization guard to prevent Runtime TagErrors.
 */
export function GoogleAd({ slot, format = "auto", className }: GoogleAdProps) {
  const hasPushed = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only attempt to push if we haven't already for this specific mount
    if (hasPushed.current) return;

    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // Verify if the ins tag exists and is not already processed by AdSense
        const ins = containerRef.current?.querySelector('ins');
        if (ins && !ins.hasAttribute('data-adsbygoogle-status')) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          hasPushed.current = true;
        }
      }
    } catch (e) {
      // Catch and log silently to prevent prototype crashing
      console.warn("Sponsor Sync Interrupted:", e);
    }
  }, [slot]);

  return (
    <div ref={containerRef} className={cn("my-8 w-full flex flex-col items-center gap-3", className)}>
      {/* Header Branding */}
      <div className="flex items-center gap-3 opacity-80">
        <div className="h-px w-6 bg-primary/40" />
        <span className="text-[11px] font-semibold text-primary">
          Sponsored content
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
            <p className="text-[12px] font-semibold text-primary">Sponsor info</p>
            <p className="text-[9px] mt-1 text-muted-foreground">Global support partner</p>
          </div>
        </div>
      </div>
      
      {/* Governance Note */}
      <p className="text-[10px] text-muted-foreground/70 italic">
        Governance note: sponsored responsibly and protected by our privacy standards
      </p>
    </div>
  );
}
