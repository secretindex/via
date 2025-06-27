import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RoosebotProvider } from "@/components/ChatContext";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIA de Acesso",
  description: "VIA de Acesso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <RoosebotProvider>
            <SidebarTrigger className="m-2" />
            {children}
          </RoosebotProvider>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
