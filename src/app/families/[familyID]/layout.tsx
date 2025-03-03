import Navbar from '@/app/components/navbar'
import { ReactNode } from 'react'

interface FamilyDetailsLayoutProps {
  children: ReactNode
  params: { id: string }
}

export default function FamilyDetailsLayout({ 
  children,
  params 
}: FamilyDetailsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar/>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the family name here
  // For demo purposes, we're using a placeholder
  const familyName = "Family Details" // Replace with API call to get family name
  
  return {
    title: `${familyName} | Measurement Management System`,
    description: 'View and manage family details and members',
  }
}