import React, { Children, Suspense } from "react";
import Navbar from "../components/navbar";
import Loading from "./loading";


export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
