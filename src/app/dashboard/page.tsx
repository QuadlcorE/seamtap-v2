import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  ChevronRight,
  PieChart,
  BarChart3,
  Users,
  Home,
  Gauge,
  Calendar,
} from "lucide-react";
import { stackServerApp } from "@/stack";
import WelcomeSection from "../components/ui/dashboard/welcomesection";
import Quickstats from "../components/ui/dashboard/quickstatsection";
import QuickActions from "../components/ui/dashboard/quickactionssection";
import Charts from "../components/ui/dashboard/charts";

async function Dashboard() {
  // Mock data (would come from your API in a real app)
  const user = await stackServerApp.getUser({or: 'redirect'});
  // const user = {
  //   name: "Alex Johnson",
  //   email: "alex@example.com",
  //   accountType: "Family",
  // };

  const stats = {
    customers: 124,
    families: 42,
    measurements: 567,
  };

  const recentActivity = [
    { type: "customer", name: "Sarah Parker", date: "Feb 28, 2025" },
    { type: "measurement", name: "Michael Wong", date: "Feb 27, 2025" },
    { type: "family", name: "Rodriguez Family", date: "Feb 25, 2025" },
  ];

  const reminders = [
    { customer: "Emma Davis", lastUpdate: "Sep 2, 2024" },
    { customer: "James Wilson", lastUpdate: "Aug 15, 2024" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <WelcomeSection name={user.displayName!}/>

      {/* Quick Stats */}
      <Quickstats stats={stats} />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-2">
          {/* Recent Activity */}
          {/* <recentActivity recentActivity={recentActivity} /> */}

          {/* Charts */}
          <Charts/>
          
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions/>

          {/* Reminders */}
          

          {/* Account Summary */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Account Type:</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="text-sm font-medium">{user.primaryEmail}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                Account Settings
              </Button>
            </CardFooter>
          </Card> */}

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-between"
                size="sm"
              >
                View All Customers
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between"
                size="sm"
              >
                View All Families
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between"
                size="sm"
              >
                View All Measurements
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
