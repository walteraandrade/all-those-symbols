import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Walter Andrade | Developer Portfolio",
  description: "Minimal dark portfolio built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
