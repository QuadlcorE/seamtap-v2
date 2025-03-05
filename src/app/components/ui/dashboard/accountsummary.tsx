import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CurrentServerUser, CurrentUser } from "@stackframe/stack";
import Link from "next/link";

type Props = { user: CurrentUser | CurrentServerUser };

export default function AccountSummary({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Name:</span>
            <span className="text-sm font-medium">{user.displayName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Email:</span>
            <span className="text-sm font-medium">{user.primaryEmail}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full" size="sm">
          <Link href="/settings">Account Settings</Link> 
        </Button>
      </CardFooter>
    </Card>
  );
}
