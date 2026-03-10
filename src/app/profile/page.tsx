
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
  LayoutDashboard,
  Trophy,
  Flame,
  Target
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

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([]);
  const [langSearch, setLangSearch] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [creationDate, setCreationDate] = useState<string | null>(null);
  const [currentFeatures, setCurrentFeatures] = useState("");

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== 'undefined' && window.location.hash === '#settings') {
      setIsSettingsOpen(true);
    }
  }, []);

  const profileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    if (!user && !isUserLoading && hasMounted) {
      router.push("/login");
    }
    if (user?.metadata.creationTime) {
      setCreationDate(new Date(user.metadata.creationTime).toLocaleDateString());
    }
    setCurrentFeatures(formatFeatureCount(calculateCurrentFeatures()));
  }, [user, isUserLoading, router, hasMounted]);

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

  if (isUserLoading || !user || !hasMounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-primary/5 relative">
          <User className="w-12 h-12 text-primary" />
          <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-background">
            <Trophy className="w-3 h-3 text-black" />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-headline font-bold">{user.email || "Guest Student"}</h1>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              {isAdmin ? "Verified Admin" : user.isAnonymous ? "Guest Access" : "Scholarly Student"}
            </Badge>
          </div>
        </div>
      </header>

      {/* Achievement Nodes Cluster */}
      <section className="grid grid-cols-3 gap-3 px-2">
        <Card className="glass-card p-3 text-center border-orange-500/20 bg-orange-500/5">
          <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
          <p className="text-[10px] uppercase font-bold text-orange-500">7 Day</p>
          <p className="text-[8px] text-muted-foreground uppercase">Streak</p>
        </Card>
        <Card className="glass-card p-3 text-center border-blue-500/20 bg-blue-500/5">
          <Target className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <p className="text-[10px] uppercase font-bold text-blue-400">12/20</p>
          <p className="text-[8px] text-muted-foreground uppercase">Goals</p>
        </Card>
        <Card className="glass-card p-3 text-center border-purple-500/20 bg-purple-500/5">
          <Star className="w-4 h-4 text-purple-400 mx-auto mb-1" />
          <p className="text-[10px] uppercase font-bold text-purple-400">Master</p>
          <p className="text-[8px] text-muted-foreground uppercase">Level</p>
        </Card>
      </section>

      <section className="grid gap-4">
        {isAdmin && (
          <Link href="/admin">
            <Card className="border-primary/30 bg-primary/10 hover:bg-primary/20 transition-all group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="font-headline font-bold text-sm block">Universal Admin Access</span>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Publish Infrastructure</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-primary" />
              </CardContent>
            </Card>
          </Link>
        )}

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
                    <span className="text-[10px] text-muted-foreground uppercase">Universal Node Config</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl border-none glass-card overflow-y-auto">
            <SheetHeader className="pb-4">
              <SheetTitle className="font-headline text-2xl">Universal Settings</SheetTitle>
              <SheetDescription className="text-muted-foreground italic">Managing 11.7 Quadrillion global configuration points.</SheetDescription>
            </SheetHeader>
            <div className="space-y-8 pt-2">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Clock className="w-3 h-3" /> Prayer Node Precision
                </h3>
                <div className="grid gap-4 bg-secondary/10 p-4 rounded-xl border border-white/5">
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground uppercase font-bold">Calculation Method</Label>
                    <Select value={profile?.preferredCalculationMethod || "4"} onValueChange={(v) => updateProfile({ preferredCalculationMethod: v })}>
                      <SelectTrigger className="h-10 bg-secondary/30 border-white/5">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="1">Karachi (UIS)</SelectItem>
                        <SelectItem value="2">ISNA (North America)</SelectItem>
                        <SelectItem value="3">MWL (World League)</SelectItem>
                        <SelectItem value="4">Umm Al-Qura (Makkah)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5 pb-10">
                <Button variant="outline" className="w-full h-12 font-headline" onClick={() => setIsSettingsOpen(false)}>
                  Synchronize Changes
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/library">
          <Card className="glass-card hover:bg-secondary/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Library className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-left">
                  <span className="font-headline font-semibold text-sm block">Saved Archives</span>
                  <span className="text-[10px] text-muted-foreground uppercase">12 Bookmarks Node</span>
                </div>
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
          Eject Scholarly Node
        </Button>
      </section>

      <footer className="text-center text-[10px] text-muted-foreground uppercase tracking-widest pt-8">
        <p className="opacity-40">© 2025 Islamly • Universal Infrastructure Node</p>
        <p className="mt-1">Member since {creationDate || 'N/A'}</p>
      </footer>
    </div>
  );
}
