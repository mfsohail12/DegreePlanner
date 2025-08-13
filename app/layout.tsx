import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./ContextProvider";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DegreePlanner",
  description:
    "A course planning tool designed to help McGill University students visualize and organize their academic journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased flex flex-col h-screen pt-14`}
      >
        <Suspense>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
