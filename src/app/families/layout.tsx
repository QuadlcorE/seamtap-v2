import { ReactNode } from 'react'
import Navbar from '../components/navbar'

interface FamiliesLayoutProps {
  children: ReactNode
}

export default function FamiliesLayout({ children }: FamiliesLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar/>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export const metadata = {
  title: 'Families | Measurement Management System',
  description: 'Manage all your customer families in your Measurement Management System',
}