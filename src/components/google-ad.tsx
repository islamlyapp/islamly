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
 * Branded as "Sponsors" with an Islamic content focus.
 */
export function GoogleAd({ slot, format = "auto", className }: GoogleAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Sponsor Node failed to synchronize:", e);
    }
  }, []);

  return (
    <div className={cn("my-6 w-full flex flex-col items-center gap-2", className)}>
      <div className="flex items-center gap-2">
        <span className="text-[8px] uppercase tracking-[0.3em] text-primary/60 font-bold">
          Scholarly Sponsor
        </span>
        <div className="h-px w-8 bg-primary/20" />
        <span className="text-[7px] uppercase tracking-widest text-muted-foreground/40 font-medium">
          Islamic Filter Active
        </span>
      </div>
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
            <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary">Scholarly Sponsor Node</p>
            <p className="text-[8px] uppercase">{slot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
