
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  LogOut, 
  Shield, 
  Bookmark, 
  BookOpen, 
  Settings, 
  ChevronRight, 
  Languages, 
  Search, 
  Globe, 
  Loader2, 
  Rocket, 
  CheckCircle2, 
  AlertCircle,
  Bell
} from "lucide-react";
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc, serverTimestamp } from "firebase/firestore";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAvailableTranslations } from "@/services/islamic-data-service";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();

  // Firestore User Profile
  const profileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  // Settings State
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([]);
  const [langSearch, setLangSearch] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [creationDate, setCreationDate] = useState<string | null>(null);

  useEffect(() => {
    if (!user && !isUserLoading) {
      router.push("/login");
    }
    if (user?.metadata.creationTime) {
      setCreationDate(new Date(user.metadata.creationTime).toLocaleDateString());
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    async function loadLangs() {
      const langs = await fetchAvailableTranslations();
      setAvailableLanguages(langs);
    }
    loadLangs();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleLanguageSelect = (lang: any) => {
    if (!profileRef) return;

    setDocumentNonBlocking(profileRef, {
      preferredLanguage: lang.language_name,
      preferredLanguageId: lang.id,
      id: user?.uid,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    setIsSettingsOpen(false);
  };

  if (isUserLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const profileItems = [
    { label: "My Bookmarks", icon: Bookmark, count: "12" },
    { label: "Personal Notes", icon: BookOpen, count: "5" },
  ];

  const filteredLangs = availableLanguages.filter(l => 
    l.language_name.toLowerCase().includes(langSearch.toLowerCase()) || 
    l.name.toLowerCase().includes(langSearch.toLowerCase())
  );

  const launchSteps = [
    { label: "Core Infrastructure", status: "complete" },
    { label: "PWA Universal Support", status: "complete" },
    { label: "Scholarly Content Hub", status: "complete" },
    { label: "Global Translation API", status: "complete" },
    { label: "Final Notification Sync", status: "complete" },
  ];

  const completionPercentage = (launchSteps.filter(s => s.status === 'complete').length / launchSteps.length) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-primary/5">
          <User className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-headline font-bold">{user.email || "Guest Student"}</h1>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              {user.isAnonymous ? "Guest Access" : "Verified Student"}
            </Badge>
          </div>
          {profile?.preferredLanguage && (
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2 flex items-center justify-center gap-1">
              <Languages className="w-2 h-2" />
              {profile.preferredLanguage} Translation
            </p>
          )}
        </div>
      </header>

      <section className="grid gap-4">
        <Card className="border-accent/30 bg-accent/5 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-headline flex items-center gap-2">
                <Rocket className="w-4 h-4 text-accent" />
                Launch Readiness Center
              </CardTitle>
              <Badge variant="outline" className="text-[9px] border-accent/30 text-accent">{Math.round(completionPercentage)}%</Badge>
            </div>
            <CardDescription className="text-[11px]">Track your progress towards global Ummah deployment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={completionPercentage} className="h-1.5 bg-accent/10" />
            <div className="grid gap-2">
              {launchSteps.map((step, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{step.label}</span>
                  {step.status === 'complete' ? (
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-accent animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetTrigger asChild>
            <Card className="glass-card hover:bg-secondary/30 transition-all cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                    <Settings className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-headline font-semibold text-sm block">App Settings</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Universal Preferences</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl border-none glass-card overflow-y-auto">
            <SheetHeader className="pb-4">
              <SheetTitle className="font-headline text-2xl">Universal Settings</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Manage your 11.7 Quadrillion feature interaction and global notifications.
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-8 pt-2">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Bell className="w-3 h-3" />
                  Notifications
                </h3>
                <div className="grid gap-4 bg-secondary/10 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="prayer-alerts" className="text-sm font-medium">Prayer Time Alerts</Label>
                    <Switch id="prayer-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="scholarly-alerts" className="text-sm font-medium">Scholarly Index Updates</Label>
                    <Switch id="scholarly-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="community-alerts" className="text-sm font-medium">Circle Activity</Label>
                    <Switch id="community-alerts" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Languages className="w-3 h-3" />
                    Quran Translation
                  </h3>
                  <Badge variant="outline" className="text-[9px]">7709+ Spoken Languages</Badge>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search world languages..." 
                    className="pl-10 h-12 bg-secondary/30 border-white/5"
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                  />
                </div>

                <ScrollArea className="h-[30vh] rounded-xl bg-secondary/10 border border-white/5 p-2">
                  <div className="grid gap-1">
                    {filteredLangs.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`flex items-center justify-between p-4 rounded-lg text-left transition-all ${
                          profile?.preferredLanguageId === lang.id 
                            ? "bg-primary/20 border border-primary/30" 
                            : "hover:bg-white/5"
                        }`}
                      >
                        <div>
                          <p className="font-headline font-bold text-sm uppercase tracking-tight">{lang.language_name}</p>
                          <p className="text-[10px] text-muted-foreground">{lang.name}</p>
                        </div>
                        {profile?.preferredLanguageId === lang.id && (
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5 pb-10">
                <p className="text-[10px] text-center text-muted-foreground italic">
                  Changes made here will apply universally across all scholarly modules.
                </p>
                <Button variant="outline" className="w-full h-12 font-headline" onClick={() => setIsSettingsOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {profileItems.map((item) => (
          <Card key={item.label} className="glass-card hover:bg-secondary/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-headline font-semibold text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && <Badge variant="outline" className="text-[10px]">{item.count}</Badge>}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="pt-4">
        <Button 
          variant="destructive" 
          className="w-full h-12 font-headline bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </section>

      <footer className="text-center text-[10px] text-muted-foreground uppercase tracking-widest pt-8 flex flex-col items-center gap-2">
        <span className="opacity-50 tracking-[0.3em]">Islamly Scholarly Guard</span>
        <span>Member since {creationDate || 'N/A'}</span>
      </footer>
    </div>
  );
}
