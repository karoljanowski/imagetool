import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import { Toaster } from "@/components/ui/sonner"
import { FileProvider } from "@/lib/context/FileContext";
import Drop from "@/components/Drop";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Image Tools",
  description: "All what you need to work with your images",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/bg.png" as="image" />
      </head>
      <body
        className={`${poppins.variable} antialiased relative`}
      >
        <Background />
        <FileProvider>
          <Drop />
          {children}
        </FileProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
