"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardData } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    id: number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
}

const withAlpha = (inputColor: string, alpha: number) => {
    const match = inputColor.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!match) return inputColor;
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
};

const Card: React.FC<CardProps> = ({ title, description, index, totalCards, color }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const glassTintStrong = withAlpha(color, 0.18);
    const glassTintSoft = withAlpha(color, 0.1);

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        // Set initial state
        gsap.set(card, {
            scale: 1,
            transformOrigin: "center top"
        });

        // Create scroll trigger for stacking effect (similar to the reference component)
        ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);

                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center top"
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '70%',
                    height: '450px',
                    borderRadius: '24px',
                    isolation: 'isolate',
                    top: `calc(-5vh + ${index * 25}px)`,
                    transformOrigin: 'top'
                }}
                className="card-content"
            >
                {/* Electric Border Effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '27px',
                        padding: '3px',
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            ${withAlpha(color, 0.62)} 60deg,
                            ${withAlpha(color, 0.42)} 120deg,
                            transparent 180deg,
                            ${withAlpha(color, 0.28)} 240deg,
                            transparent 360deg
                        )`,
                        zIndex: -1
                    }}
                />

                {/* Main Card Content */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    background: `
                        linear-gradient(160deg,
                            rgba(4, 3, 8, 0.26),
                            ${glassTintStrong} 45%,
                            ${glassTintSoft}
                        )
                    `,
                    backdropFilter: 'blur(20px) saturate(145%)',
                    border: `1px solid ${withAlpha(color, 0.24)}`,
                    boxShadow: `
                        0 10px 30px rgba(0, 0, 0, 0.28),
                        0 2px 8px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -1px 0 ${withAlpha(color, 0.14)}
                    `,
                    overflow: 'hidden'
                }}>
                    {/* Enhanced Glass reflection overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: `linear-gradient(140deg, ${withAlpha(color, 0.2)} 0%, ${withAlpha(color, 0.08)} 52%, transparent 100%)`,
                        pointerEvents: 'none',
                        borderRadius: '24px 24px 0 0'
                    }} />

                    {/* Glass shine effect */}
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        right: '10px',
                        height: '2px',
                        background: `linear-gradient(90deg, transparent 0%, ${withAlpha(color, 0.5)} 50%, transparent 100%)`,
                        borderRadius: '1px',
                        pointerEvents: 'none'
                    }} />

                    {/* Side glass reflection */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '2px',
                        height: '100%',
                        background: `linear-gradient(180deg, ${withAlpha(color, 0.24)} 0%, transparent 50%)`,
                        borderRadius: '24px 0 0 24px',
                        pointerEvents: 'none'
                    }} />

                    {/* Frosted glass texture */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(219,194,255,0.09) 1px, transparent 2px),
                            radial-gradient(circle at 80% 70%, rgba(196,148,255,0.08) 1px, transparent 2px),
                            radial-gradient(circle at 40% 80%, rgba(175,116,255,0.06) 1px, transparent 2px)
                        `,
                        backgroundSize: '30px 30px, 25px 25px, 35px 35px',
                        pointerEvents: 'none',
                        borderRadius: '24px',
                        opacity: 0.42
                    }} />

                    <div style={{
                        position: 'relative',
                        zIndex: 2,
                        padding: '2.2rem',
                        display: 'grid',
                        gridTemplateRows: '1fr auto 1fr',
                        alignItems: 'center',
                        height: '100%',
                        justifyItems: 'center',
                        fontFamily: 'var(--font-sans)'
                    }}>
                        <h3 style={{
                            margin: 0,
                            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                            lineHeight: 1.05,
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: '#ffffff',
                            maxWidth: '18ch',
                            textAlign: 'center',
                            alignSelf: 'center'
                        }}>
                            {title}
                        </h3>

                        <div style={{
                            width: 'min(86%, 580px)',
                            height: '1px',
                            background: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(187,136,255,0.65), rgba(0,0,0,0))',
                            boxShadow: '0 0 20px rgba(152, 89, 255, 0.2)',
                            justifySelf: 'center'
                        }}>
                        </div>

                        <p style={{
                            margin: 0,
                            fontSize: 'clamp(1.02rem, 1.4vw, 1.2rem)',
                            lineHeight: 1.65,
                            fontWeight: 600,
                            color: 'rgba(229, 219, 246, 0.88)',
                            maxWidth: '60ch',
                            textAlign: 'center',
                            alignSelf: 'center'
                        }}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StackedCards: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }, []);

    return (
        <main ref={containerRef} style={{ background: 'transparent' }}>
            {/* Cards Section */}
            <section style={{
                color: '#ffffff',
                width: '100%'
            }}>
                {cardData.map((card, index) => {
                    const targetScale = 1 - (cardData.length - index) * 0.05;
                    return (
                        <Card
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            index={index}
                            totalCards={cardData.length}
                            color={card.color}
                        />
                    );
                })}
            </section>
        </main>
    );
};
