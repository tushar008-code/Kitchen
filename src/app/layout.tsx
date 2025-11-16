import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/assets/fonts";
import SWRegister from "./sw.register";

export const metadata = {
  title: "Kitchen",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <SWRegister />
      </body>
    </html>
  );
}
