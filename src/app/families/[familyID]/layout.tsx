import Navbar from "@/app/components/navbar";
import { ReactNode } from "react";

interface FamilyDetailsLayoutProps {
  children: ReactNode;
  params: Promise<{ familyID: string }>; // Match route segment name
}

export default async function FamilyDetailsLayout({
  children,
  // params,
}: FamilyDetailsLayoutProps) {
  // const resolvedParams = await params; // Await the Promise
  // You can use resolvedParams.familyID here if needed

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1'>{children}</main>
    </div>
  );
}

export async function generateMetadata() {
  // const resolvedParams = await params;
  const familyName = "Family Details"; // Replace with API call using resolvedParams.familyID

  return {
    title: `${familyName} | Measurement Management System`,
    description: "View and manage family details and members",
  };
}
