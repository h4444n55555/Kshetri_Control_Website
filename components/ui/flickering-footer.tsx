"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FlickeringGridProps = React.HTMLAttributes<HTMLDivElement> & {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
};

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.12,
  color = "#8b5cf6",
  maxOpacity = 0.35,
  className,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const rgba = useMemo(() => {
    const hex = color.replace("#", "");
    const safe = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    const r = parseInt(safe.slice(0, 2), 16) || 139;
    const g = parseInt(safe.slice(2, 4), 16) || 92;
    const b = parseInt(safe.slice(4, 6), 16) || 246;
    return { r, g, b };
  }, [color]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let alphas = new Float32Array();

    const setup = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${Math.max(1, rect.width)}px`;
      canvas.style.height = `${Math.max(1, rect.height)}px`;

      const step = (squareSize + gridGap) * dpr;
      cols = Math.max(1, Math.ceil(canvas.width / step));
      rows = Math.max(1, Math.ceil(canvas.height / step));

      alphas = new Float32Array(cols * rows);
      for (let i = 0; i < alphas.length; i++) {
        alphas[i] = Math.random() * maxOpacity;
      }
    };

    const draw = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const cell = squareSize * dpr;
      const step = (squareSize + gridGap) * dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const idx = x * rows + y;
          if (Math.random() < flickerChance) {
            alphas[idx] = Math.random() * maxOpacity;
          }
          ctx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alphas[idx]})`;
          ctx.fillRect(x * step, y * step, cell, cell);
        }
      }
      rafRef.current = window.requestAnimationFrame(draw);
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(host);
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [flickerChance, gridGap, maxOpacity, rgba, squareSize]);

  return (
    <div ref={hostRef} className={cn("h-full w-full", className)} {...props}>
      <canvas ref={canvasRef} className="h-full w-full pointer-events-none" />
    </div>
  );
};

export const Component = () => {
  const sectionLinks = [
    { label: "Home", href: "#hero" },
    { label: "Control", href: "#container-scroll" },
    { label: "Features", href: "#timeline" },
    { label: "Process", href: "#glass-cards" },
    { label: "Contact", href: "#cta-dithering" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/kshetri-industries" },
  ];

  return (
    <footer className="w-full overflow-hidden mb-0 pb-0">
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="space-y-4">
            <Link href="#hero" className="inline-flex items-center gap-3">
              <img src="/logo_no_BG.png" alt="Kshetri Control" className="h-10 w-auto" />
              <span className="text-2xl md:text-3xl font-heading text-white">Kshetri Control</span>
            </Link>
            <p className="text-[var(--text-muted)] max-w-sm text-sm md:text-base">
              Manufacturing execution and traceability, built for modern production teams.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.12em] uppercase text-zinc-200 mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-3">
              {sectionLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.12em] uppercase text-zinc-200 mb-4">Company</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-xs md:text-sm text-zinc-500">
          © {new Date().getFullYear()} Kshetri Industries. All rights reserved.
        </div>
      </div>
      <div className="relative h-56 md:h-72 overflow-hidden">
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={3}
          gridGap={3}
          color="#8f20d8"
          maxOpacity={0.7}
          flickerChance={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/55 to-transparent pointer-events-none" />
      </div>
    </footer>
  );
};