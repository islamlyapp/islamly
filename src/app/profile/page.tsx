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
  Bell,
  Database,
  Scale,
  Lock,
  Library,
  Clock,
  Heart,
  LayoutDashboard
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { calculateCurrentFeatures, formatFeatureCount } from "@/lib/feature-counter";
import Link from "next/link";

const PRAYER_METHODS = [
  { id: 1, name: "Karachi (UIS)" },
  { id: 2, name: "ISNA (North America)" },
  { id: 3, name: "MWL (Muslim World League)" },
  { id: 4, name: "Umm Al-Qura (Makkah)" },
  { id: 5, name: "Egyptian Survey" }
];

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();

  const profileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  const [availableLanguages, setAvailableLanguages] = useState<any[]>([]);
  const [langSearch, setLangSearch] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [creationDate, setCreationDate] = useState<string | null>(null);
  const [currentFeatures, setCurrentFeatures] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#settings') {
      setIsSettingsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!user && !isUserLoading) {
      router.push("/login");
    }
    if (user?.metadata.creationTime) {
      setCreationDate(new Date(user.metadata.creationTime).toLocaleDateString());
    }
    
    setCurrentFeatures(formatFeatureCount(calculateCurrentFeatures()));
  }, [user, isUserLoading, router]);

  // Auto-upgrade staff account to admin role if needed
  useEffect(() => {
    if (user?.email === 'islamlystaff@gmail.com' && profile && profile.role !== 'admin') {
      updateProfile({ role: 'admin' });
    }
  }, [user, profile]);

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

  const updateProfile = (data: any) => {
    if (!profileRef || !user) return;
    setDocumentNonBlocking(profileRef, {
      ...data,
      id: user.uid,
      updatedAt: serverTimestamp(),
      createdAt: profile?.createdAt || serverTimestamp(),
    }, { merge: true });
  };

  const handleLanguageSelect = (lang: any) => {
    updateProfile({
      preferredLanguage: lang.language_name,
      preferredLanguageId: lang.id,
    });
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

  const isAdmin = profile?.role === 'admin' || user?.email === 'islamlystaff@gmail.com';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-primary/5">
          <User className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-headline font-bold">{user.email || "Guest Student"}</h1>
          <div className="flex flex-col items-center justify-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              {isAdmin ? "Verified Admin" : user.isAnonymous ? "Guest Access" : "Verified Student"}
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
        {isAdmin && (
          <Link href="/admin">
            <Card className="border-primary/30 bg-primary/10 overflow-hidden hover:bg-primary/20 transition-all group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="font-headline font-bold text-sm block">Universal Admin Access</span>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Publish & Manage Content</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-primary" />
              </CardContent>
            </Card>
          </Link>
        )}

        <Card className="border-blue-500/20 bg-blue-500/5 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-headline flex items-center gap-2 text-blue-400">
                <Library className="w-4 h-4" />
                Digital Asset Buffer
              </CardTitle>
              <Badge variant="outline" className="text-[9px] border-blue-500/30 text-blue-400">High Density Active</Badge>
            </div>
            <CardDescription className="text-[11px]">Synchronizing high-resolution scholarly manuscripts and media.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
              <span>Infrastructure Capacity</span>
              <span className="text-blue-400">1024 GB Indexed</span>
            </div>
            <Progress value={15} className="h-1 bg-blue-500/10" />
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
          <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl border-none glass-card overflow-y-auto">
            <SheetHeader className="pb-4">
              <SheetTitle className="font-headline text-2xl">Universal Settings</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Manage your profile and global scholarly preferences.
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-8 pt-2">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Prayer Calculations
                </h3>
                <div className="grid gap-4 bg-secondary/10 p-4 rounded-xl border border-white/5">
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground uppercase font-bold">Calculation Method</Label>
                    <Select 
                      value={profile?.preferredCalculationMethod || "4"} 
                      onValueChange={(v) => updateProfile({ preferredCalculationMethod: v })}
                    >
                      <SelectTrigger className="h-10 bg-secondary/30 border-white/5">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        {PRAYER_METHODS.map(m => (
                          <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground uppercase font-bold">Asr Madhab</Label>
                    <Select 
                      value={profile?.madhab || "Standard"} 
                      onValueChange={(v) => updateProfile({ madhab: v })}
                    >
                      <SelectTrigger className="h-10 bg-secondary/30 border-white/5">
                        <SelectValue placeholder="Select Madhab" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="Standard">Standard (Shafi, Maliki, Hanbali)</SelectItem>
                        <SelectItem value="Hanafi">Hanafi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

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
                    {availableLanguages.filter(l => 
                      l.language_name.toLowerCase().includes(langSearch.toLowerCase()) || 
                      l.name.toLowerCase().includes(langSearch.toLowerCase())
                    ).map((lang) => (
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
                  Changes apply universally to the Islamly infrastructure.
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

        <Link href="/credits">
          <Card className="glass-card hover:bg-primary/5 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span className="font-headline font-semibold text-sm">Acknowledgments</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link href="/terms" className="block">
            <Card className="glass-card hover:bg-primary/5 transition-all text-center p-4">
              <Scale className="w-4 h-4 text-primary mx-auto mb-2 opacity-60" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Terms</span>
            </Card>
          </Link>
          <Link href="/privacy" className="block">
            <Card className="glass-card hover:bg-accent/5 transition-all text-center p-4">
              <Lock className="w-4 h-4 text-accent mx-auto mb-2 opacity-60" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Privacy</span>
            </Card>
          </Link>
        </div>
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
