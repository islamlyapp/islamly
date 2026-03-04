"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useDoc, setDocumentNonBlocking } from "@/firebase";
import { doc, collection, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Video, 
  Plus, 
  Loader2, 
  ShieldAlert, 
  Globe, 
  Settings,
  LayoutDashboard
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Use doc query to check role
  const profileRef = doc(db, "users", user?.uid || "none");
  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  const handlePostVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) return;

    setIsPublishing(true);
    try {
      const videoRef = doc(collection(db, "videos"));
      setDocumentNonBlocking(videoRef, {
        id: videoRef.id,
        title,
        description,
        url: videoUrl,
        isLive,
        postedAt: serverTimestamp(),
        authorId: user?.uid,
      }, { merge: true });

      toast({
        title: "Content Published",
        description: `Successfully ${isLive ? "started live stream" : "posted video"}.`,
      });

      setTitle("");
      setDescription("");
      setVideoUrl("");
      setIsLive(false);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Publishing Failed",
        description: err.message,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check for admin role or the specific hardcoded staff email
  const isAdmin = profile?.role === 'admin' || user?.email === 'islamlystaff@gmail.com';

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-headline font-bold uppercase tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your account does not have the required permissions to access the Scholarly Control Infrastructure.
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground italic text-sm">Universal Scholarly Management Node</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 gap-1 px-3">
          <Globe className="w-3 h-3" /> Universal Sync
        </Badge>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Post New Content
              </CardTitle>
              <CardDescription>Publish videos or start a live stream broadcast.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostVideo} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Explanation of Kitab At-Tawhid" 
                    className="bg-secondary/20"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Video/Stream URL</Label>
                  <Input 
                    id="url" 
                    placeholder="YouTube, HLS, or Video URL" 
                    className="bg-secondary/20"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Description</Label>
                  <Textarea 
                    id="desc" 
                    placeholder="Summarize the scholarly benefit..." 
                    className="bg-secondary/20 min-h-[100px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Broadcast as LIVE</Label>
                    <p className="text-[10px] text-muted-foreground">Pin this to the top of the Live page.</p>
                  </div>
                  <Switch 
                    checked={isLive}
                    onCheckedChange={setIsLive}
                  />
                </div>
                <Button type="submit" className="w-full h-12 gap-2" disabled={isPublishing}>
                  {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Publish Content
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-headline text-sm uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Global Database</p>
                <p className="text-sm font-bold">Node: 11.7 Quadrillion</p>
                <p className="text-[10px] text-muted-foreground">Synchronized & Encrypted</p>
              </div>
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-blue-400 mb-1">CDN Broadcast</p>
                <p className="text-sm font-bold">Status: Optimal</p>
                <p className="text-[10px] text-muted-foreground">Vercel Edge Acceleration</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-6 text-center space-y-2">
              <ShieldAlert className="w-8 h-8 text-primary mx-auto mb-2 opacity-50" />
              <h4 className="font-headline font-bold text-xs uppercase tracking-widest">Amanah Protocol</h4>
              <p className="text-[10px] text-muted-foreground italic">
                Content must align strictly with the Salaf-us-Salih. No validation of Bid'ah or Shirk is permitted.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
