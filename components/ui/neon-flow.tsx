"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TUBES_MODULE_URL = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`);
};

type TubesInstance = {
  tubes?: {
    setColors?: (colors: string[]) => void;
    setLightsColors?: (colors: string[]) => void;
  };
  dispose?: () => void;
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<TubesInstance | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;
    let moduleUrl: string | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        const response = await fetch(TUBES_MODULE_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch tubes module: ${response.status}`);
        }

        const source = await response.text();
        const blob = new Blob([source], { type: "text/javascript" });
        moduleUrl = URL.createObjectURL(blob);

        const module = await import(/* webpackIgnore: true */ moduleUrl);
        const TubesCursor = module.default;

        if (!mounted || !canvasRef.current || typeof TubesCursor !== "function") return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#000000", "#360d4e", "#6958d5"],
            lights: {
              intensity: 100,
              colors: ["#000000", "#460357", "#ff008a", "#160342"],
            },
          },
        }) as TubesInstance;

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          // The library manages its own renderer sizing once attached to the canvas.
        };

        window.addEventListener("resize", handleResize);

        cleanup = () => {
          window.removeEventListener("resize", handleResize);
          app.dispose?.();
          tubesRef.current = null;
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      cleanup?.();
      if (moduleUrl) {
        URL.revokeObjectURL(moduleUrl);
      }
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current?.tubes) return;

    tubesRef.current.tubes.setColors?.(randomColors(3));
    tubesRef.current.tubes.setLightsColors?.(randomColors(4));
  };

  return (
    <div
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-transparent", className)}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 block h-full w-full transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ touchAction: "none" }}
      />

      <div className="relative z-10 h-full w-full pointer-events-none">{children}</div>
    </div>
  );
}

export default TubesBackground;
