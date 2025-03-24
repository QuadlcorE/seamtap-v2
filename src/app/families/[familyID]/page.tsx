'use client'

import { useState } from 'react'
import { use } from 'react' // Add this import
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
} from '@/components/ui/alert-dialog'
import { ChevronLeft, MoreHorizontal, Plus, Pencil, Trash2 } from 'lucide-react'

// Mock data
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
  ],
};

type FamilyParams = Promise<{ familyID: string }>;
interface FamilyDetailsPageProps {
  params: FamilyParams;
}
export default function FamilyDetailsPage({ params }: FamilyDetailsPageProps) {
  const { familyID }: { familyID: string } = use(params);
  const [family] = useState(mockFamilyDetails);

  return (
    <div className='p-6'>
      <Link href='/families' className='flex items-center mb-4'>
        <ChevronLeft className='mr-2' /> Back to Families
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{family.name}</CardTitle>
          <CardDescription>ID: {familyID}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between mb-4'>
            <p>Created by: {family.createdBy}</p>
            <Button asChild>
              <Link href={`/families/${familyID}/add-member`}>
                <Plus className='mr-2' /> Add Member
              </Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {family.members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Pencil className='mr-2' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant='ghost'
                                className='w-full text-left'
                              >
                                <Trash2 className='mr-2' /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete {member.name}{" "}
                                  from the family.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
}