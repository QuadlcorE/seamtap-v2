import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart3 } from "lucide-react";

export default function Charts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Customers by Family</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="relative h-40 w-40 flex items-center justify-center">
            <PieChart className="h-full w-full text-gray-300" />
            <div className="absolute text-xs text-gray-500">
              Chart Visualization
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Measurements by Customer</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="relative h-40 w-40 flex items-center justify-center">
            <BarChart3 className="h-full w-full text-gray-300" />
            <div className="absolute text-xs text-gray-500">
              Chart Visualization
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
