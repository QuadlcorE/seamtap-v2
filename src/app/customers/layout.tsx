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

export const metadata = {
  title: "Customers | Customer Management System",
  description:
    "View and manage all customers in your Customer Management System",
};
