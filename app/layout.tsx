import type { Metadata } from "next";
import {Inter} from 'next/font/google'
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({subsets:['latin']});
export const metadata: Metadata = {
  title: "Timelines",
  description: "A journaling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          <div className="bg-[url('/bg.jpg')] opacity-50 fixed -z-10 inset-0"/>
          {/* header */}
          <Header/>
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-orange-300 py-12 bg-opacity-10">
            <div className="mx-auto px-4 text-center text-green-900">
              Made by sanjay
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
