"use client"

import Link from "next/link"
import { useEffect, useState, type MouseEvent } from "react"

import { AetherHero } from "@/components/ui/lightning-hero"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { TextMarquee } from "@/components/ui/text-marquee"
import { Timeline } from "@/components/ui/timeline"
import { TubesBackground } from "@/components/ui/neon-flow"
import { StackedCards } from "@/components/ui/glass-cards"
import { CTASection } from "@/components/hero-dithering-card"
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer"

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (window.location.hash !== "#hero") {
      window.history.replaceState(null, "", "#hero")
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header id="header" className={isScrolled ? "scrolled" : ""}>
        <Link href="#hero" className="logo" aria-label="Go to top" onClick={handleLogoClick}>
          <img
            src="/logo_no_BG.png"
            alt="KshetriControl"
            style={{ height: "36px", width: "auto" }}
          />
        </Link>
      </header>

      <main className="flex flex-col min-h-screen">
        <section id="hero" className="relative">
          <AetherHero
            title="Kshetri Control"
            subtitle="Complete Manufacturing <br /><span>Execution & Traceability System"
            align="left"
            overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0))"
            height="100vh"
          />
          <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        </section>

        <section
          id="container-scroll"
          className="w-full max-w-[1600px] mx-auto px-2 md:px-4 pt-10"
        >
          <ContainerScroll
            titleComponent={
              <div
                className="section-header"
                style={{ marginBottom: "1rem", paddingBottom: "0" }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-medium font-heading">
                  Real-time Manufacturing Control
                </h2>
                <p className="max-w-[600px] mx-auto text-lg text-[var(--text-muted)] mt-6">
                  Command your entire facility through a single pane of glass,
                  featuring uncompromising clarity and depth.
                </p>
              </div>
            }
          >
            <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 rounded-[2rem] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.04),0_40px_100px_rgba(0,0,0,0.8)]">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-zinc-700/80" />
              <div className="absolute -right-[10px] top-1/2 -translate-y-1/2 w-[5px] h-14 rounded-r-full bg-zinc-600/60" />
              <div className="absolute -left-[10px] top-[40%] w-[5px] h-10 rounded-l-full bg-zinc-600/60" />
              <div className="absolute -left-[10px] top-[55%] w-[5px] h-10 rounded-l-full bg-zinc-600/60" />
              <img
                src="/Dashboard Desktop.png"
                alt="Dashboard UI"
                className="w-full h-full object-cover rounded-[1.4rem]"
              />
            </div>
          </ContainerScroll>
        </section>

        <section
          id="text-marquee"
          className="w-full flex justify-center items-center py-16 md:py-24 overflow-hidden px-4"
        >
          <TextMarquee
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] font-medium font-heading whitespace-normal sm:whitespace-nowrap"
            height={72}
            prefix={
              <>
                <span className="text-[#b490f5]">Four Roles.</span> One System.
              </>
            }
          >
            <div className="text-purple-400 pl-2">Operators</div>
            <div className="text-blue-400 pl-2">Quality Control</div>
            <div className="text-indigo-400 pl-2">Supervisors</div>
            <div className="text-rose-400 pl-2">Admins</div>
          </TextMarquee>
        </section>

        <section id="timeline">
          <Timeline
            data={[
              {
                title: "Statistics",
                content: (
                  <div className="feature-card !pr-0 overflow-hidden">
                    <img
                      src="/Statistics Desktop.png"
                      alt="Statistics View"
                      className="w-full h-auto rounded-l-xl shadow-2xl object-cover"
                    />
                  </div>
                ),
              },
              {
                title: "Traceability",
                content: (
                  <div className="feature-card !pr-0 overflow-hidden">
                    <img
                      src="/Trace Desktop.png"
                      alt="Traceability View"
                      className="w-full h-auto rounded-l-xl shadow-2xl object-cover"
                    />
                  </div>
                ),
              },
              {
                title: "Batch Ledger",
                content: (
                  <div className="feature-card !pr-0 overflow-hidden">
                    <img
                      src="/Batch Ledger.png"
                      alt="Batch Ledger View"
                      className="w-full h-auto rounded-l-xl shadow-2xl object-cover"
                    />
                  </div>
                ),
              },
              {
                title: "Protocols",
                content: (
                  <div className="feature-card !pr-0 overflow-hidden">
                    <img
                      src="/Protocols Desktop.png"
                      alt="Protocols View"
                      className="w-full h-auto rounded-l-xl shadow-2xl object-cover"
                    />
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="container py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-gradient text-4xl md:text-5xl lg:text-6xl font-heading mb-6">
                Flawless Control. Anywhere.
              </h2>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-4">
                Full MES power on your phone. Scan, inspect, and approve from anywhere on the floor.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[240px] md:w-[280px] lg:w-[320px] aspect-[9/19.5] rounded-[3rem] border-[6px] border-white/30 bg-zinc-900 p-1.5 shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm">
                <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-10" />
                <div className="absolute -right-[10px] top-24 w-[5px] h-12 rounded-r-full bg-white/20" />
                <div className="absolute -left-[10px] top-20 w-[5px] h-8 rounded-l-full bg-white/20" />
                <div className="absolute -left-[10px] top-32 w-[5px] h-8 rounded-l-full bg-white/20" />
                <img
                  src="/Ledger Phone.png"
                  alt="Ledger mobile preview"
                  className="w-full h-full rounded-[2.4rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full h-[600px] flex items-center justify-center bg-transparent overflow-hidden">
          <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
            <TubesBackground className="h-full w-full" />
          </div>
          <div className="relative z-10 text-center max-w-3xl px-4 pointer-events-none">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Streamlined Workflow
            </h2>
            <p className="text-2xl text-zinc-400">
              Designed for absolute minimal friction on the assembly line.
            </p>
          </div>
        </section>

        <section id="glass-cards">
          <StackedCards />
        </section>

        <section id="cta-dithering" className="bg-transparent">
          <CTASection />
        </section>

        <section id="flicker-footer" className="pb-0 mb-0 mt-auto">
          <FlickeringFooter />
        </section>
      </main>
    </>
  )
}