'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

const randomColors = (count: number) => {
    return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
    children?: React.ReactNode;
    className?: string;
    enableClickInteraction?: boolean;
}

export function TubesBackground({
    children,
    className,
    enableClickInteraction = true
}: TubesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const tubesRef = useRef<any>(null);

    useEffect(() => {
        let mounted = true;
        let cleanupScript: (() => void) | undefined;

        const initTubes = () => {
            if (!canvasRef.current || !mounted) return;

            try {
                // @ts-ignore
                if (window.TubesCursor) {
                    // @ts-ignore
                    initializeCursor(window.TubesCursor);
                    return;
                }

                const scriptId = 'tubes-cursor-script';
                let script = document.getElementById(scriptId) as HTMLScriptElement;

                if (!script) {
                    script = document.createElement('script');
                    script.id = scriptId;
                    script.type = 'module';
                    // We use an inline tag so it acts globally without being dynamically imported by Turbopack
                    script.innerHTML = `
                    import TubesCursor from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';
                    window.TubesCursor = TubesCursor;
                    window.dispatchEvent(new Event('tubes-loaded'));
                `;
                    document.body.appendChild(script);
                }

                const handleLoad = () => {
                    // @ts-ignore
                    if (window.TubesCursor && mounted) {
                        // @ts-ignore
                        initializeCursor(window.TubesCursor);
                    }
                };

                window.addEventListener('tubes-loaded', handleLoad);

                cleanupScript = () => window.removeEventListener('tubes-loaded', handleLoad);

            } catch (error) {
                console.error("Failed to load TubesCursor:", error);
            }
        };

        const initializeCursor = (TubesCursor: any) => {
            if (!canvasRef.current || !mounted) return;

            const app = TubesCursor(canvasRef.current, {
                tubes: {
                    colors: ["#1e011f", "#5006b1", "#6958d5"],
                    lights: {
                        intensity: 200,
                        colors: ["#481161", "#4c084e", "#701747", "#0f4e6d"]
                    }
                }
            });

            tubesRef.current = app;
            setIsLoaded(true);
        };

        initTubes();

        return () => {
            mounted = false;
            if (cleanupScript) cleanupScript();
            if (tubesRef.current?.destroy) {
                tubesRef.current.destroy();
            }
        };
    }, []);

    const handleClick = () => {
        if (!enableClickInteraction || !tubesRef.current?.tubes) return;

        // Safety check just in case the library API changed
        if (typeof tubesRef.current.tubes.setColors === 'function') {
            const colors = randomColors(3);
            tubesRef.current.tubes.setColors(colors);
        }

        if (typeof tubesRef.current.tubes.setLightsColors === 'function') {
            const lightsColors = randomColors(4);
            tubesRef.current.tubes.setLightsColors(lightsColors);
        }
    };

    return (
        <div
            className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-transparent", className)}
            onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
                style={{ touchAction: 'none' }}
            />

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full pointer-events-none">
                {children}
            </div>
        </div>
    );
}

export default TubesBackground;
