import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { WhatsAppButton } from "@/shared/components/ui/WhatsAppButton";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ValhallaTechnology | Tecnología Para Todos",
  description: "Empresa de tecnología boliviana. Soporte técnico, desarrollo de software, infraestructura y consultoría.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakartaSans.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--near-black)] font-sans overflow-x-hidden selection:bg-[var(--blue)]/30">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Providers>
            {children}
          </Providers>
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
