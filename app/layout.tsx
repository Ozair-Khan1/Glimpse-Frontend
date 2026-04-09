import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./css/signup.css";
import { AuthProvider } from "./utils/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glimpse",
  description: "Full-stack Instagram Clone",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col items-center w-full justify-center" suppressHydrationWarning>
        <AuthProvider>
          <main className="flex flex-col items-center">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
} 