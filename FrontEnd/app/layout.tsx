import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatBotConnect } from "@/components/ChatBotConnect";
import { MacToast } from "@/components/MacToast";
import { ApiClientAuthBridge } from "@/components/ApiClientAuthBridge";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lexi Azteca - Supervivencia Financiera Gamificada",
  description: "Simulador de educación financiera e inclusión para jóvenes en México.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ApiClientAuthBridge />
        {children}
        <MacToast />
        <ChatBotConnect />
      </body>
    </html>
  );
}
