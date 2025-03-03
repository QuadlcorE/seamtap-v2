import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, MoreHorizontal, Plus, Pencil, Trash2 } from 'lucide-react';

const CustomerDetailsPage = () => {
  // Mock customer data
  const customer = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    family: 'Smith Family',
    accountType: 'Family',
    createdAt: '2023-10-01',
    measurements: [
      { id: 1, type: 'Chest', value: '40.5', notes: '-', createdAt: '2023-10-02' },
      { id: 2, type: 'Waist', value: '32.0', notes: '-', createdAt: '2023-10-02' },
      { id: 3, type: 'Hips', value: '38.5', notes: 'Measured twice for accuracy', createdAt: '2023-10-02' },
      { id: 4, type: 'Inseam', value: '30.0', notes: '-', createdAt: '2023-10-02' },
      { id: 5, type: 'Shoulder Width', value: '18.5', notes: 'Client preferred a looser fit', createdAt: '2023-10-05' }
    ]
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Customers
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Details: {customer.name}</h1>
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
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm">{customer.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Family</dt>
              <dd className="mt-1 text-sm">{customer.family}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Type</dt>
              <dd className="mt-1 text-sm">
                <Badge variant={customer.accountType === 'Family' ? 'default' : 'secondary'}>
                  {customer.accountType}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm">{customer.createdAt}</dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Pencil className="h-4 w-4" />
            Edit Customer
          </Button>
          <Button variant="destructive" className="flex items-center gap-1">
            <Trash2 className="h-4 w-4" />
            Delete Customer
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Measurements</CardTitle>
            <CardDescription>All recorded measurements for this customer</CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Measurement
          </Button>
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
                  <TableCell className="font-medium">{measurement.type}</TableCell>
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
                        <DropdownMenuItem className="text-red-600">Delete Measurement</DropdownMenuItem>
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