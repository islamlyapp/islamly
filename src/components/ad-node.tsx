
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AdNodeProps {
  title: string;
  description: string;
  image?: string;
  cta: string;
  type?: "Promoted" | "Announcement" | "Support";
  className?: string;
}

export function AdNode({ title, description, image, cta, type = "Promoted", className }: AdNodeProps) {
  return (
    <Card className={cn("glass-card overflow-hidden border-primary/10 bg-primary/5", className)}>
      <div className="flex flex-col sm:flex-row">
        {image && (
          <div className="relative w-full sm:w-32 h-32 sm:h-auto overflow-hidden shrink-0">
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover opacity-60"
              data-ai-hint="islamic book"
            />
          </div>
        )}
        <CardContent className="p-4 space-y-3 flex-1">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Megaphone className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{type} Node</span>
            </div>
            <Badge variant="outline" className="text-[8px] uppercase border-primary/20 text-primary">Scholarly Ad</Badge>
          </div>
          <div className="space-y-1">
            <h4 className="font-headline font-bold text-sm text-foreground">{title}</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between pt-1">
            <button className="text-[10px] text-primary font-bold uppercase flex items-center gap-1 hover:underline">
              {cta} <ExternalLink className="w-2.5 h-2.5" />
            </button>
            <Info className="w-3 h-3 text-muted-foreground/30" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
