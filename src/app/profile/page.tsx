"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Shield, Bookmark, BookOpen, Settings, ChevronRight } from "lucide-react";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isUserLoading) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
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
    { label: "App Settings", icon: Settings, count: null },
  ];

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
        </div>
      </header>

      <section className="grid gap-4">
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

      <footer className="text-center text-[10px] text-muted-foreground uppercase tracking-widest pt-8">
        Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
      </footer>
    </div>
  );
}
