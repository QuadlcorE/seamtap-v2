import React from "react";
import { Suspense } from "react";
import CustomersLoading from "./loading";
import Navbar from "../components/navbar";

export default function CustomersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Suspense fallback={<CustomersLoading />}>{children}</Suspense>
      </div>
    </div>
  );
}
