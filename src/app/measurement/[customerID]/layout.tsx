import { ReactNode } from 'react'

interface MeasurementDetailsLayoutProps {
  children: ReactNode
  params: { id: string }
}

export default function MeasurementDetailsLayout({ 
  children,
  params 
}: MeasurementDetailsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the measurement details here
  // For demo purposes, we're using a placeholder
  
  return {
    title: `Measurement Details | Measurement Management System`,
    description: 'View and manage measurement details in your Measurement Management System',
  }
}