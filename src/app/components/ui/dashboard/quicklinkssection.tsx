import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-between"
          size="sm"
        >
          <Link href="/customers">
            {" "}
            View All Customers <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
        {/* <Button
          asChild
          variant="ghost"
          className="w-full justify-between"
          size="sm"
        >
          <Link href="/families">
            {" "}
            View All Families
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-between"
          size="sm"
        >
          <Link href="/measurement">
            {" "}
            View All Measurements
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button> */}
      </CardContent>
    </Card>
  );
}
