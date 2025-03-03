'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, MoreHorizontal, Search, Calendar } from 'lucide-react'

// Mock data for demonstration
const mockMeasurements = [
  { id: '1', customerName: 'John Smith', type: 'Chest', value: 40.5, notes: '', createdAt: '2023-10-02' },
  { id: '2', customerName: 'Jane Smith', type: 'Waist', value: 32.0, notes: '', createdAt: '2023-10-02' },
  { id: '3', customerName: 'James Johnson', type: 'Inseam', value: 34.0, notes: 'Slightly longer than previous measurement', createdAt: '2023-10-05' },
  { id: '4', customerName: 'Linda Williams', type: 'Hips', value: 38.5, notes: '', createdAt: '2023-10-07' },
  { id: '5', customerName: 'Robert Brown', type: 'Shoulder Width', value: 18.5, notes: 'Customer prefers looser fit', createdAt: '2023-10-10' },
]

// For filter dropdowns
const customers = ['All', 'John Smith', 'Jane Smith', 'James Johnson', 'Linda Williams', 'Robert Brown']
const measurementTypes = ['All', 'Chest', 'Waist', 'Hips', 'Inseam', 'Shoulder Width', 'Sleeve Length', 'Neck']
const dateRanges = ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Range']

export default function MeasurementsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [customerFilter, setCustomerFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All Time')

  // Filter measurements based on search query and filters
  const filteredMeasurements = mockMeasurements.filter(measurement => {
    const matchesSearch = 
      measurement.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (measurement.notes && measurement.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // Apply customer filter
    const matchesCustomerFilter = 
      customerFilter === 'All' ? true : measurement.customerName === customerFilter
    
    // Apply type filter
    const matchesTypeFilter = 
      typeFilter === 'All' ? true : measurement.type === typeFilter
    
    // Apply date filter (simplified for demo)
    const matchesDateFilter = true // In a real app, you would implement date filtering logic
    
    return matchesSearch && matchesCustomerFilter && matchesTypeFilter && matchesDateFilter
  })

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Measurements</CardTitle>
              <CardDescription>
                View and manage all measurements here. Add new measurements, filter by customer or type, and analyze trends.
              </CardDescription>
            </div>
            <Button className="ml-auto" asChild>
              <Link href="/measurements/new">
                <Plus className="mr-2 h-4 w-4" /> Add New Measurement
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search measurements..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={customerFilter} onValueChange={setCustomerFilter}>
                  <SelectTrigger className="w-32 sm:w-40">
                    <SelectValue placeholder="Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32 sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {measurementTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-32 sm:w-40">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredMeasurements.length > 0 ? (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMeasurements.map((measurement) => (
                        <TableRow key={measurement.id}>
                          <TableCell className="font-medium">
                            <Link href={`/customers/${measurement.id.split('-')[0]}`} className="hover:underline">
                              {measurement.customerName}
                            </Link>
                          </TableCell>
                          <TableCell>{measurement.type}</TableCell>
                          <TableCell>{measurement.value}</TableCell>
                          <TableCell>{measurement.notes || '-'}</TableCell>
                          <TableCell>{measurement.createdAt}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/measurements/${measurement.id}`}>View</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/measurements/${measurement.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Measurement</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this measurement for {measurement.customerName}? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredMeasurements.length} of {mockMeasurements.length} measurements
                </div>
              </>
            ) : (
              <div className="flex h-36 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <h3 className="font-medium">No measurements found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Click 'Add New Measurement' to get started.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}