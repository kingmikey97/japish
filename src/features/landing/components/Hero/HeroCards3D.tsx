'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function HeroCards3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const blackSlot = useRef<HTMLDivElement>(null);
  const blueSlot = useRef<HTMLDivElement>(null);
  const blackShadow = useRef<HTMLDivElement>(null);
  const blueShadow = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current) return;

    const ctx = gsap.context(() => {
      // ---------- Entrance ----------
      gsap.set([blackSlot.current, blueSlot.current], { opacity: 0 });
      gsap.set(blackSlot.current, { y: -70, rotate: -6, scale: 0.94 });
      gsap.set(blueSlot.current, { y: -90, rotate: 4, scale: 0.94 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(blackSlot.current, { opacity: 1, y: 0, rotate: -4, scale: 1, duration: 1.1 }, 0.1)
        .to(blueSlot.current, { opacity: 1, y: 0, rotate: 3, scale: 1, duration: 1.1 }, 0.3)
        .add(startFloating, 1.1);

      // ---------- Continuous floating loop ----------
      function startFloating() {
        // Black card: slower, wider arc
        gsap.to(blackSlot.current, {
          y: '-=22',
          rotate: '-=2.2',
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        // Blue card: slightly faster, out of phase for organic feel
        gsap.to(blueSlot.current, {
          y: '-=26',
          rotate: '+=2.6',
          duration: 2.7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.4,
        });

        // Contact shadows breathe inversely to height (grounded physics feel)
        gsap.to(blackShadow.current, {
          scaleX: 0.82,
          opacity: 0.35,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to(blueShadow.current, {
          scaleX: 0.78,
          opacity: 0.3,
          duration: 2.7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.4,
        });
      }

      // ---------- Subtle mouse parallax (premium product feel) ----------
      const xTo1 = gsap.quickTo(blackSlot.current, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const yTo1 = gsap.quickTo(blackSlot.current, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const xTo2 = gsap.quickTo(blueSlot.current, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const yTo2 = gsap.quickTo(blueSlot.current, 'rotationX', { duration: 0.8, ease: 'power3.out' });

      const handleMove = (e: MouseEvent) => {
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect) return;
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        xTo1(relX * 10);
        yTo1(relY * -8);
        xTo2(relX * 14);
        yTo2(relY * -10);
      };

      const stageEl = stageRef.current;
      if (stageEl) {
        stageEl.addEventListener('mousemove', handleMove);
      }

      return () => {
        if (stageEl) {
          stageEl.removeEventListener('mousemove', handleMove);
        }
      };
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative flex items-center justify-center w-full aspect-square max-w-[600px] overflow-hidden rounded-3xl bg-transparent"
    >
      <div
        className="relative w-full aspect-square"
        style={{ perspective: '1400px' }}
      >
        <Image
          src="/images/landing/bg-pedestal.png"
          alt="fondo pedestal"
          fill
          className="absolute inset-0 object-contain saturate-[1.05]"
          priority
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(60% 45% at 50% 100%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%),
              linear-gradient(180deg, rgba(2,4,12,0.05) 0%, rgba(2,4,12,0) 35%, rgba(2,4,12,0.2) 100%)
            `,
          }}
        ></div>

        <div
          ref={fieldRef}
          className="absolute left-1/2 top-[55%] sm:top-[53%] w-[100%] sm:w-[100%] h-[46%] sm:h-[50%] -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Black Card */}
          <div
            ref={blackSlot}
            className="absolute left-[4%] top-[30%] w-[46%] will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Image
              src="/images/landing/card-black.png"
              alt="Tarjeta JAPISH negra"
              width={400}
              height={600}
              className="w-full h-auto block drop-shadow-[0_30px_45px_rgba(0,0,0,0.55)] select-none pointer-events-none"
              priority
            />
            <div
              ref={blackShadow}
              className="absolute left-1/2 -bottom-[6%] w-[78%] h-[22px] -translate-x-1/2 blur-[2px] will-change-transform"
              style={{
                background: 'radial-gradient(closest-side, rgba(0,0,0,0.65), rgba(0,0,0,0) 72%)',
              }}
            ></div>
          </div>

          {/* Blue Card */}
          <div
            ref={blueSlot}
            className="absolute left-[40%] top-[14%] w-[50%] z-10 will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Image
              src="/images/landing/card-blue.png"
              alt="Tarjeta JAPISH azul"
              width={400}
              height={600}
              className="w-full h-auto block drop-shadow-[0_30px_45px_rgba(0,0,0,0.55)] select-none pointer-events-none"
              priority
            />
            <div
              ref={blueShadow}
              className="absolute left-1/2 -bottom-[6%] w-[78%] h-[22px] -translate-x-1/2 blur-[2px] will-change-transform"
              style={{
                background: 'radial-gradient(closest-side, rgba(0,0,0,0.65), rgba(0,0,0,0) 72%)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
