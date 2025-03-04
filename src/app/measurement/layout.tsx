import { ReactNode, Suspense } from "react";
import Navbar from "../components/navbar";
import MeasurementsLoading from "./loading";

interface MeasurementsLayoutProps {
  children: ReactNode;
}

export default function MeasurementsLayout({
  children,
}: MeasurementsLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Suspense fallback={<MeasurementsLoading/>}>{children}</Suspense>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Measurements | Measurement Management System",
  description:
    "View and manage all customer measurements in your Measurement Management System",
};
