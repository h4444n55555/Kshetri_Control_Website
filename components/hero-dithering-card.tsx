"use client"

import { useState, Suspense, lazy } from "react"
import { FlipLink } from "@/components/flip-links"

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const linkedInHref = "https://www.linkedin.com/company/kshetri-industries"
  const emailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=Kshetriindustriespvtltd@gmail.com"

  return (
    <section className="py-12 w-full flex justify-center items-center px-4 md:px-6">
      <div 
        className="w-full max-w-7xl relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[48px] border border-primary/20 bg-transparent shadow-sm min-h-[420px] md:min-h-[460px] flex flex-col items-center justify-center duration-500">
             <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
              <Dithering
                colorBack="#00000000" // Transparent
                colorFront="#8b5cf6"  // Accent
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.6 : 0.2}
                className="size-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-10 leading-[1.05]">
              TAKE CONTROL
            </h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-transparent bg-transparent px-12 text-base font-semibold text-primary transition-all duration-300 hover:border-primary/45 hover:bg-primary/10 hover:scale-105 hover:shadow-[0_0_28px_rgba(139,92,246,0.35)] focus-visible:border-primary/45 focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-95"
            >
              <span className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_25%_25%,rgba(196,156,255,0.35),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(139,92,246,0.3),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-0 -z-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />
              <span className="relative z-10">Get</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-black/20 p-8 md:p-10 shadow-[0_28px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 22% 28%, rgba(255,255,255,0.14) 1px, transparent 2px), radial-gradient(circle at 78% 72%, rgba(255,255,255,0.09) 1px, transparent 2px), linear-gradient(150deg, rgba(155,100,255,0.18), rgba(0,0,0,0.15) 52%, rgba(126,58,242,0.12))",
                backgroundSize: "26px 26px, 30px 30px, auto",
              }}
            />

            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close contact popup"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/35 hover:text-white"
            >
              x
            </button>

            <div className="relative z-10">
              <h3 className="mb-2 text-left text-3xl md:text-4xl font-heading font-semibold tracking-tight text-white">
                Connect with us
              </h3>

              <p className="mb-8 max-w-xl text-left text-sm md:text-base text-zinc-300">
                Reach out for demos, partnerships, or deployment support.
              </p>

              <div className="grid place-items-start gap-2 text-left">
                <FlipLink
                  href={linkedInHref}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                >
                  LinkedIn
                </FlipLink>
                <FlipLink
                  href={emailHref}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                >
                  Email
                </FlipLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}