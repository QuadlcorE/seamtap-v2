import { ReactNode } from "react";

// Define the params type as a Promise
type MeasurementParams = Promise<{ customerID: string }>;

// Use interface for props
interface MeasurementDetailsLayoutProps {
  children: ReactNode;
  params: MeasurementParams;
}

export default async function MeasurementDetailsLayout({
  children,
  // params,
}: MeasurementDetailsLayoutProps) {
  // const resolvedParams = await params; // Resolve the Promise
  // const customerID = resolvedParams.customerID; // Extract customerID

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{children}</main>
    </div>
  );
}

export async function generateMetadata({
  // params,
}: {
  params: MeasurementParams;
}) {
  // const resolvedParams = await params;
  // const customerID = resolvedParams.customerID; // Use this for dynamic metadata if needed

  // In a real app, fetch measurement details here using customerID
  return {
    title: `Measurement Details | Measurement Management System`,
    description:
      "View and manage measurement details in your Measurement Management System",
  };
}
