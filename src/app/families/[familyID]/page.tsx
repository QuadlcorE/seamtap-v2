'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ChevronLeft, MoreHorizontal, Plus, Pencil, Trash2 } from 'lucide-react'

// Mock data for demonstration
const mockFamilyDetails = {
  id: '1',
  name: 'Smith Family',
  createdBy: 'John Doe',
  createdAt: '2023-10-01',
  members: [
    { id: '1', name: 'John Smith', email: 'john@example.com', createdAt: '2023-10-02' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', createdAt: '2023-10-02' },
    { id: '3', name: 'James Smith', email: 'james@example.com', createdAt: '2023-10-05' },
    { id: '4', name: 'Julia Smith', email: 'julia@example.com', createdAt: '2023-10-07' },
    { id: '5', name: 'Jack Smith', email: 'jack@example.com', createdAt: '2023-10-10' },
  ]
}

export default function FamilyDetailsPage({ params }: { params: { id: string } }) {
  const [family] = useState(mockFamilyDetails)

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/families">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Families
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Family Details: {family.name}</CardTitle>
              <CardDescription className="mt-2">
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <div>
                    <span className="font-medium">Created by:</span> {family.createdBy}
                  </div>
                  <div>
                    <span className="font-medium">Created at:</span> {family.createdAt}
                  </div>
                </div>
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/families/${params.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit Family
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Family
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Family</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {family.name}? This action cannot be undone.
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Members</h3>
              <Button asChild>
                <Link href={`/families/${params.id}/add-member`}>
                  <Plus className="mr-2 h-4 w-4" /> Add Member
                </Link>
              </Button>
            </div>

            {family.members.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {family.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.createdAt}</TableCell>
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
                                <Link href={`/customers/${member.id}`}>View</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/customers/${member.id}/edit`}>Edit</Link>
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    Remove from Family
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Member</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove {member.name} from {family.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                      Remove
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
            ) : (
              <div className="flex h-36 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <h3 className="font-medium">No members found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Click 'Add Member' to add customers to this family.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}