import React from "react";

function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div> {children}</div>;
}

export default CustomerLayout;
