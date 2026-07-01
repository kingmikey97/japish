"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const C = canvasRef.current;
    if (!C) return;
    const ctx = C.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0, H = 0, cx = 0, cy = 0;
    let nodes: any[] = [];
    let mouse = { x: -9999, y: -9999 };
    let frame = 0;
    let dpr = 1;
    let animationFrameId: number;

    const CFG = {
      nodeCount: 75,
      layers: 4,
      nodeSpeed: 0.0002, // Velocidad para el movimiento autonomo
    };

    // Tonos slate/gris para "Tecnologia para Todos"
    const LAYER_COLOR = [
      { r: 148, g: 163, b: 184 },  // layer 0 (frente) — slate-400
      { r: 100, g: 116, b: 139 },  // layer 1 — slate-500
      { r: 71, g: 85, b: 105 },    // layer 2 — slate-600
      { r: 51, g: 65, b: 85 },     // layer 3 (fondo) — slate-700
    ];

    function lc(layer: number, alpha: number) {
      const c = LAYER_COLOR[layer % LAYER_COLOR.length];
      return `rgba(${c.r},${c.g},${c.b},${alpha.toFixed(3)})`;
    }

    class Node {
      bx: number; by: number;
      ox: number; oy: number;
      orR: number; spd: number;
      layer: number; r: number;
      x: number; y: number;
      rx: number; ry: number; // desplazamientos de repulsion
      g: { alpha: number };

      constructor(index: number, total: number) {
        // Distribucion basada en curvas de Lissajous para movimiento organico
        const t = index / total;
        const a = t * Math.PI * 2;
        
        // Posicion base
        this.bx = Math.sin(a * 3 + 0.5) * 0.8;
        this.by = Math.sin(a * 2 + 1.2) * 0.8;
        
        // Movemos la malla a la derecha para equilibrar el texto a la izquierda
        this.bx += 0.3;

        const d = Math.sqrt(this.bx * this.bx + this.by * this.by);
        this.layer = Math.min(3, Math.floor(d * 2.5));

        this.x = 0; this.y = 0;
        this.rx = 0; this.ry = 0;

        this.ox = a;
        this.oy = a * 1.618; // proporcion aurea
        
        this.orR = 0.04 + (1 - d) * 0.1;
        this.spd = CFG.nodeSpeed + index * 0.000001;
        
        this.r = 1.5 + (1 - d) * 2.5;
        this.g = { alpha: 0 };

        gsap.to(this.g, {
          alpha: 1,
          duration: 1.0 + Math.random() * 1.0,
          delay: 0.2 + index * 0.015,
          ease: "power2.out",
        });
      }

      update(ts: number) {
        // MOVIMIENTO AUTONOMO CONTINUO
        const time = ts * this.spd;
        const ox = Math.sin(this.ox + time * 2.1) * this.orR;
        const oy = Math.cos(this.oy + time * 1.7) * this.orR;

        const nx = this.bx + ox;
        const ny = this.by + oy;

        const targetX = cx + nx * W * 0.45;
        const targetY = cy + ny * H * 0.45;

        // EFECTO MOUSE: Repulsion magnetica en lugar de mover todo el fondo
        let repelTargetX = 0;
        let repelTargetY = 0;
        
        if (mouse.x !== -9999) {
          const dx = targetX - mouse.x;
          const dy = targetY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180; // Radio de repulsion
          
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            // Empujamos el nodo alejandolo del mouse
            repelTargetX = (dx / dist) * force * 40; 
            repelTargetY = (dy / dist) * force * 40;
          }
        }

        // Suavizamos la repulsion con un "spring"
        this.rx += (repelTargetX - this.rx) * 0.1;
        this.ry += (repelTargetY - this.ry) * 0.1;

        this.x = targetX + this.rx;
        this.y = targetY + this.ry;
      }

      draw() {
        if (!ctx) return;
        const a = this.g.alpha;
        if (a < 0.01) return;

        // Halo suave
        const gr = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6);
        gr.addColorStop(0, lc(this.layer, a * 0.2));
        gr.addColorStop(1, lc(this.layer, 0));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();

        // Punto central
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = lc(this.layer, a * 0.95);
        ctx.fill();
      }
    }

    function drawEdges() {
      if (!ctx) return;
      const DIST = W * 0.18;
      const DIST2 = DIST * DIST;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.g.alpha < 0.01) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.g.alpha < 0.01) continue;
          
          // Solo conectar capas adyacentes o de la misma capa
          if (Math.abs(a.layer - b.layer) > 1) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          
          if (d2 > DIST2) continue;

          const prox = 1 - Math.sqrt(d2) / DIST;
          const depth = (a.r + b.r) * 0.15;
          const alpha = prox * prox * depth * Math.min(a.g.alpha, b.g.alpha) * 0.6;

          const gr = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          gr.addColorStop(0, lc(a.layer, alpha));
          gr.addColorStop(1, lc(b.layer, alpha));

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = gr;
          ctx.lineWidth = 0.4 + prox * 0.8;
          ctx.stroke();
        }
      }
    }

    // Dibujar un brillo suave en el centro de la red
    function drawGlow() {
      if (!ctx) return;
      const r = W * 0.3;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(148,163,184,0.04)');
      g.addColorStop(0.5, 'rgba(100,116,139,0.015)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    function init() {
      if (!C) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth * dpr;
      H = window.innerHeight * dpr;
      C.width = W;
      C.height = H;
      C.style.width = window.innerWidth + "px";
      C.style.height = window.innerHeight + "px";
      ctx?.scale(dpr, dpr);
      W /= dpr;
      H /= dpr;
      
      cx = W / 2;
      cy = H / 2;

      nodes = Array.from({ length: CFG.nodeCount }, (_, i) => new Node(i, CFG.nodeCount));
    }

    function loop(ts: number) {
      if (!ctx || !C) return;
      animationFrameId = requestAnimationFrame(loop);
      frame++;
      
      ctx.clearRect(0, 0, W, H);
      drawGlow();
      
      nodes.forEach(n => n.update(ts));
      drawEdges();
      nodes.forEach(n => n.draw());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    init();
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      nodes.forEach(n => gsap.killTweensOf(n.g));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
