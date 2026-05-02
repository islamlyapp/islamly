
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, User, Settings, BookOpen, Shield, LogOut, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart },
    { id: "account", label: "Account", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-headline font-black text-white">Shadcn</h1>
            <p className="text-muted-foreground italic">Joined December 2023</p>
          </div>
        </div>
        <Button variant="outline" size="lg" className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </header>
      
      <nav className="flex items-center gap-2">
        {tabs.map(tab => (
          <Button 
            key={tab.id}
            variant={activeTab === tab.id ? "secondary" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="gap-2"
          >
            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-primary" : "text-muted-foreground")} />
            {tab.label}
          </Button>
        ))}
      </nav>

      <main>
        {activeTab === "overview" && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Learning Stats</h3>
              <div className="space-y-2">
                <p className="flex justify-between"><span>Courses Completed</span><span className="font-bold">5</span></p>
                <p className="flex justify-between"><span>Total Hours</span><span className="font-bold">72</span></p>
                <p className="flex justify-between"><span>Current Streak</span><span className="font-bold">14 days</span></p>
              </div>
            </Card>
            <Card className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Completed "Introduction to Fiqh"</li>
                <li>Started "The Seerah of the Prophet"</li>
                <li>Achieved a 98% on the "Tawheed" quiz</li>
              </ul>
            </Card>
            <Card className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Badges</h3>
              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">SQL</div>
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary-foreground">Fiqh</div>
                <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">Seerah</div>
              </div>
            </Card>
          </section>
        )}
        {activeTab === "account" && (
            <Card className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Account Information</h3>
                <p>Manage your account details here.</p>
            </Card>
        )}
        {activeTab === "settings" && (
            <Card className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Settings</h3>
                <p>Adjust your application settings.</p>
            </Card>
        )}
      </main>
    </div>
  )
}
