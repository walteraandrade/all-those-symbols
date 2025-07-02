import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Walter Andrade A. Sobrinho | Project Lead & Mentor",
  description: "I transform complex problems into elegant digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}