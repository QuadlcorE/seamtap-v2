import React from "react";
import { stackServerApp } from "@/stack";
import WelcomeSection from "../components/ui/dashboard/welcomesection";
import Quickstats from "../components/ui/dashboard/quickstatsection";
import QuickActions from "../components/ui/dashboard/quickactionssection";
import Charts from "../components/ui/dashboard/charts";
import QuickLinks from "../components/ui/dashboard/quicklinkssection";
import AccountSummary from "../components/ui/dashboard/accountsummary";

async function Dashboard() {
  // Mock data (would come from your API in a real app)
  const user = await stackServerApp.getUser({or: 'redirect'});
  // const user = {
  //   name: "Alex Johnson",
  //   email: "alex@example.com",
  //   accountType: "Family",
  // };

  // const stats = {
  //   customers: 124,
  //   families: 42,
  //   measurements: 567,
  // };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <WelcomeSection name={user.displayName!}/>

      {/* Quick Stats */}
      <Quickstats user={user} />

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
          
          {/* Quick Links */}
          <QuickLinks/>

          {/* Account Summary */}
          <AccountSummary user={user}/>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
