import React, { Suspense } from "react";
import Navbar from "../components/navbar";
import Loading from "./loading";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div>
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Dashboard | Dashboard Management System",
  description:
    "View and manage all dashboard in your Dashboard Management System",
};
