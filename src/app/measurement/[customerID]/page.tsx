"use client";

import { useState } from "react";
import { use } from "react"; // Import the use hook
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";

// Mock data for demonstration - in a real app you would fetch this data
const getMeasurementById = (id: string) => {
  const mockMeasurements = [
    {
      id: "1",
      customerName: "John Smith",
      customerId: "101",
      type: "Chest",
      value: 40.5,
      notes: "",
      createdAt: "2023-10-02",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      customerId: "102",
      type: "Waist",
      value: 32.0,
      notes: "",
      createdAt: "2023-10-02",
    },
    {
      id: "3",
      customerName: "James Johnson",
      customerId: "103",
      type: "Inseam",
      value: 34.0,
      notes: "Slightly longer than previous measurement",
      createdAt: "2023-10-05",
    },
  ];
  return mockMeasurements.find((m) => m.id === id);
};

// Define the params type as a Promise
type MeasurementParams = Promise<{ customerID: string }>;

// Use interface for props
interface MeasurementDetailsPageProps {
  params: MeasurementParams;
}

export default function MeasurementDetailsPage({
  params,
}: MeasurementDetailsPageProps) {
  const { customerID } = use(params); // Unwrap the Promise
  const [measurement] = useState(getMeasurementById(customerID)); // Use customerID instead of params.id

  if (!measurement) {
    return (
      <div className='container mx-auto py-6'>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex flex-col items-center justify-center space-y-2 py-12 text-center'>
              <h2 className='text-2xl font-semibold'>Measurement not found</h2>
              <p className='text-muted-foreground'>
                The measurement you are looking for does not exist or has been
                removed.
              </p>
              <Button asChild className='mt-4'>
                <Link href='/measurements'>Back to Measurements</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6'>
        <Button variant='outline' asChild>
          <Link href='/measurements'>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back to Measurements
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Measurement Details</CardTitle>
          <CardDescription>
            Detailed information about this measurement record
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-1'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Customer Name
              </dt>
              <dd className='text-base'>
                <Link
                  href={`/customers/${measurement.customerId}`}
                  className='font-medium hover:underline'
                >
                  {measurement.customerName}
                </Link>
              </dd>
            </div>
            <div className='space-y-1'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Measurement Type
              </dt>
              <dd className='text-base font-medium'>{measurement.type}</dd>
            </div>
            <div className='space-y-1'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Value
              </dt>
              <dd className='text-base font-medium'>{measurement.value}</dd>
            </div>
            <div className='space-y-1'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Created At
              </dt>
              <dd className='text-base'>{measurement.createdAt}</dd>
            </div>
            <div className='space-y-1 sm:col-span-2'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Notes
              </dt>
              <dd className='text-base'>{measurement.notes || "-"}</dd>
            </div>
          </dl>

          <div className='mt-8 flex space-x-4'>
            <Button asChild>
              <Link href={`/measurements/${measurement.id}/edit`}>
                <Pencil className='mr-2 h-4 w-4' /> Edit Measurement
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                  <Trash2 className='mr-2 h-4 w-4' /> Delete Measurement
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Measurement</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this {measurement.type}{" "}
                    measurement for {measurement.customerName}? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className='bg-destructive text-destructive-foreground'>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
