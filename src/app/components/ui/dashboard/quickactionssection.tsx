"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddCustomer from "../addcustomer";
import AddFamily from "../addfamily";
import { Toaster } from "@/components/ui/sonner";
import AddMeasurement from "../addmeasurement";

type Props = {};

export default function QuickActions({}: Props) {
  

  // Mock customer data for the select input
  const customers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Jane Johnson" },
    { id: "3", name: "Robert Williams" },
  ];

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks you can perform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Add New Customer Drawer */}
        <AddCustomer />
        
        {/* Add New Family Drawer */}
        <AddFamily />
        {/* Record Measurement Drawer */}
        <AddMeasurement/>
      </CardContent>
      <Toaster />
    </Card>
  );
}
