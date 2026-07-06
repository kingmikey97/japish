// ============================================
// LANDING PAGE COMERCIAL - JAPISH
// ============================================
// Esta es la página principal que VENDE el servicio
import Hero from '@/src/features/landing/components/Hero';
import Features from '@/src/features/landing/components/Features';
import HowItWorks from '@/src/features/landing/components/HowItWorks';
//import Hero from '@/components/Landing/Hero';
//import Features from '@/components/Landing/Features';
//import HowItWorks from '@/components/Landing/HowItWorks';
import Showcase from '@/components/Landing/Showcase';
import Pricing from '@/components/Landing/Pricing';
import CTA from '@/components/Landing/CTA';

export default function Home() {
  return (
    <main className="bg-slate-900">      
      <Hero />
       <HowItWorks/>
      <Features/>
     
      <Showcase/>
      <Pricing/>
      <CTA/>
    </main>
  );
}