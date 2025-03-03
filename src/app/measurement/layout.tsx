import { ReactNode } from 'react'

interface MeasurementsLayoutProps {
  children: ReactNode
}

export default function MeasurementsLayout({ children }: MeasurementsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}

export const metadata = {
  title: 'Measurements | Measurement Management System',
  description: 'View and manage all customer measurements in your Measurement Management System',
}