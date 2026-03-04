import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { CartProvider } from "./providers/CartProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prodajen Uje",
  description: "Marketplace for autenthic olive oils",
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
        <CartProvider>
          <Navbar />
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "15px",
              },
              success: {
                style: {
                  background: "#16a34a",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#dc2626",
                  color: "#fff",
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
