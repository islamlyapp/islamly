"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, EyeOff, Globe, MapPin, ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground">
          <Link href="/profile"><ChevronLeft className="w-4 h-4" /> Back to Profile</Link>
        </Button>
        <div className="flex items-center gap-3 text-accent">
          <Lock className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground italic">Your data is an Amanah (Trust).</p>
      </header>

      <section className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <Card className="glass-card border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-accent">
              <Shield className="w-5 h-5" />
              Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              In accordance with Islamic principles of privacy and trust, Islamly is committed to protecting your personal information. We do not sell, trade, or share your data with third-party advertisers.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 px-2">
          <div className="space-y-2">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-accent" />
              1. Information We Collect
            </h3>
            <p>
              We collect minimal data necessary to provide a personalized scholarly experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Authentication data (Email/Social IDs) managed via Firebase.</li>
              <li>Preferences (Language, Reciter, Calculation Method).</li>
              <li>Learning progress (Bookmarks, Notes, Quiz Scores).</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              2. Location Data
            </h3>
            <p>
              Geolocation is used solely to calculate accurate prayer times and locate nearby Masjids. This data is processed through the AlAdhan and Nominatim APIs and is never used for tracking your long-term movement.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              3. AI Data Processing
            </h3>
            <p>
              Recitation audio processed by Al-Mualim is transcribed to text for feedback. We do not store original audio recordings on our servers; they are processed in real-time to ensure your privacy.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 text-destructive">
              4. Data Deletion
            </h3>
            <p>
              You have the right to delete your account and all associated scholarly records (notes, bookmarks) at any time through the profile settings.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Islamly Universal Privacy Infrastructure
        </p>
      </footer>
    </div>
  );
}
