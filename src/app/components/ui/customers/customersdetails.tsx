"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import AddMeasurement from "../addmeasurement";
import Link from "next/link";
import { DeleteCustomerDialog } from "../delete";
import { useRouter } from "next/navigation";

type Measurement = {
  id: number;
  type: string;
  value: string;
  notes: string;
  createdAt: string;
};

type CustomerProps = {
  id: number;
  name: string;
  email: string;
  family: string;
  accountType: string;
  createdAt: string;
  measurements: Measurement[];
};

const CustomerDetailsPage = ({ customer }: { customer: CustomerProps }) => {
  const router = useRouter();
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-4">
        <Link href="/customers">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Customers
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Details: {customer.name}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm">{customer.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Family</dt>
              <dd className="mt-1 text-sm">{customer.family}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm">{customer.createdAt}</dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {/* <Button variant="outline" className="flex items-center gap-1">
            <Pencil className="h-4 w-4" />
            Edit Customer
          </Button> */}

          <DeleteCustomerDialog
            customerId={customer.id}
            customerName={customer.name}
            onDeleteSuccess={() => {
              // Refresh customer list or navigate away
              router.push("/customers");
            }}
          />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Measurements</CardTitle>
            <CardDescription>
              All recorded measurements for this customer
            </CardDescription>
          </div>
          <AddMeasurement variant="customer"/>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.measurements.map((measurement) => (
                <TableRow key={measurement.id}>
                  <TableCell className="font-medium">
                    {measurement.type}
                  </TableCell>
                  <TableCell>{measurement.value}</TableCell>
                  <TableCell>{measurement.notes}</TableCell>
                  <TableCell>{measurement.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Measurement</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete Measurement
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetailsPage;
