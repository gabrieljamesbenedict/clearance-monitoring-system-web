import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";

import NavigationBar from "./components/NavigationBar";


export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap'
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Clearance Monitoring System",
  description: "A Clearance Monitoring System for the Mapua Library",
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background-main antialiased`}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
