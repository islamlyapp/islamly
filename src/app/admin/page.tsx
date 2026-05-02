
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, BookOpen, MessageSquare, Settings } from "lucide-react";

const adminNavItems = [
  { name: "Dashboard", icon: BarChart, href: "/admin" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Courses", icon: BookOpen, href: "/admin/courses" },
  { name: "Feedback", icon: MessageSquare, href: "/admin/feedback" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminDashboard() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-background/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <span className="">Islamly Admin</span>
            </a>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {adminNavItems.map(item => (
                <a key={item.name} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background/40 px-6">
           {/* Mobile Nav can be added here */}
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,257</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
             {/* ... Other stats cards ... */}
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No recent activity to display.</p>
                </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

