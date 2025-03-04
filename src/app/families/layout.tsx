import { ReactNode, Suspense } from "react";
import Navbar from "../components/navbar";
import FamiliesLoading from "./loading";

interface FamiliesLayoutProps {
  children: ReactNode;
}

export default function FamiliesLayout({ children }: FamiliesLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Suspense fallback={<FamiliesLoading />}>{children}</Suspense>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Families | Measurement Management System",
  description:
    "Manage all your customer families in your Measurement Management System",
};
