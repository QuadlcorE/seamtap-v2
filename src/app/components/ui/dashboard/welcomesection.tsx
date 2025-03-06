import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Props = { name: string };

export default function WelcomeSection({ name }: Props) {
  const str1 = "Here's what's happening with your account today.";
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {name}!</h1>
        <p className="text-gray-500">{str1}</p>
      </div>
      <Avatar className="h-12 w-12">
        <AvatarImage src="/api/placeholder/100/100" alt={name!} />
        <AvatarFallback>
          {name!
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
