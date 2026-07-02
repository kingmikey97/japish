'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/shared/components/layout/Navbar';
import { Footer } from '@/shared/components/layout/Footer';
import { WhatsAppButton } from '@/shared/components/ui/WhatsAppButton';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isProfileCard = /^\/japish\/[^\/]+$/.test(pathname) && !pathname.endsWith('/buscar');

  return (
    <>
      {!isProfileCard && <Navbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!isProfileCard && <Footer />}
      {!isProfileCard && <WhatsAppButton />}
    </>
  );
}
