import Header from "@/components/header";
import React from "react";

function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
}

export default CustomerLayout;
