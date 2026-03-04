"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

/**
 * Google Ad Node for the Islamly Scholarly Infrastructure.
 * Uses standard AdSense logic wrapped in our high-fidelity aesthetic.
 */
export function GoogleAd({ slot, format = "auto", className }: GoogleAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ad Node failed to synchronize:", e);
    }
  }, []);

  return (
    <div className={cn("my-6 w-full flex flex-col items-center gap-2", className)}>
      <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40 font-bold">
        Scholarly Sponsored Content
      </span>
      <div className="w-full bg-card/40 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden min-h-[100px] flex items-center justify-center relative">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-0000000000000000" // Placeholder Client ID
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        {/* Fallback visual for the prototype environment */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="text-center">
            <p className="text-[10px] font-headline font-bold uppercase tracking-widest">Google Ad Node</p>
            <p className="text-[8px] uppercase">{slot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
