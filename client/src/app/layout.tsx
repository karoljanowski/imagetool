import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Background from "@/components/Background";
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
        className={`${poppins.variable} antialiased`}
      >
        <Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
