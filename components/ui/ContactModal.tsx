'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 pointer-events-auto backdrop-blur-md' : 'opacity-0 pointer-events-none backdrop-blur-none'
                }`}
        >
            {/* Dark overlay backdrop */}
            <div
                className="absolute inset-0 bg-black/60 transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Glass Modal Container */}
            <div
                className={`relative w-full max-w-lg mx-4 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.15)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'
                    }`}
                style={{
                    backgroundColor: 'rgba(10, 10, 15, 0.4)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                }}
            >
                {/* Header glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-600/30 rounded-full blur-[60px] pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-20"
                >
                    <X size={20} />
                </button>

                <div className="relative z-10 p-8 sm:p-10 flex flex-col items-start">
                    <h3 className="text-3xl font-medium font-heading text-white tracking-tight">
                        Connect with us.
                    </h3>

                    <div className="flex flex-col gap-6 items-start justify-center mt-12 pb-4">
                        <FlipLink href="https://www.linkedin.com/company/kshetri-industries/">LinkedIn</FlipLink>
                        <FlipLink href="https://mail.google.com/mail/?view=cm&fs=1&to=Kshetriindustriespvtltd@gmail.com">
                            Email Us
                        </FlipLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FlipLink = ({ children, href, onClick }: { children: string; href?: string; onClick?: (e: React.MouseEvent) => void }) => {
    return (
        <a
            href={href || "#"}
            onClick={onClick}
            target={href && href.startsWith('http') ? "_blank" : "_self"}
            rel="noreferrer"
            className="group relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase tracking-tight text-white hover:text-purple-400 sm:text-5xl md:text-6xl transition-colors"
            style={{ lineHeight: 0.85 }}
        >
            <div className="flex">
                {children.split("").map((letter, i) => (
                    <span
                        key={i}
                        className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
                        style={{ transitionDelay: `${i * 20}ms` }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                ))}
            </div>
            <div className="absolute inset-0 flex">
                {children.split("").map((letter, i) => (
                    <span
                        key={i}
                        className="inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-purple-400"
                        style={{ transitionDelay: `${i * 20}ms` }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                ))}
            </div>
        </a>
    );
};
