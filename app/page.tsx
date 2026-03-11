"use client"

import { useEffect } from "react"
import Link from "next/link"

import { ContainerScroll } from "./components/container-scroll-animation"
import { AetherHero } from "@/components/ui/lightning-hero"
import { CTASection } from "@/components/ui/cta-section"
import { Timeline } from "@/components/ui/timeline"
import { StackedCards } from "@/components/ui/stacked-cards"
import { AnimatedFooter } from "@/components/ui/animated-footer"
import { TextMarquee } from "@/components/ui/text-marquee"
import { TubesBackground } from "@/components/ui/TubesBackground"

export default function Page() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))

    const header = document.getElementById("header")

    const handleScroll = () => {
      if (window.scrollY > 50) header?.classList.add("scrolled")
      else header?.classList.remove("scrolled")
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>


      <header id="header">
        <Link href="#" className="logo">
          <img src="/logo_no_BG.png" alt="KshetriControl" style={{ height: '36px', width: 'auto' }} />
        </Link>
      </header>

      <main>
        <AetherHero
          title="Kshetri Control"
          subtitle="Complete Manufacturing <br /><span>Execution & Traceability System"
          align="left"
          overlayGradient="linear-gradient(0deg, #000000ff, transparent)"
          height="100vh"
        />

        <section id="product" className="w-full max-w-[1600px] mx-auto px-2 md:px-4 pt-32 lg:pt-0" style={{ paddingBottom: '0' }}>
          <ContainerScroll
            titleComponent={
              <div className="section-header reveal active" style={{ marginBottom: '1rem', paddingBottom: '0' }}>
                <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-medium font-heading">
                  Real-time Manufacturing Control
                </h2>
                <p className="max-w-[600px] mx-auto text-lg text-[var(--text-muted)] mt-6">
                  Command your entire facility through a single pane of glass, featuring uncompromising clarity and depth.
                </p>
              </div>
            }
          >
            <div style={{ marginTop: '0', height: '100%', overflow: 'hidden', borderRadius: '24px' }}>
              <img src="/Dashboard Desktop.png" alt="Dashboard UI" className="w-full h-full object-cover" />
            </div>
          </ContainerScroll>
        </section>

        <section id="roles" className="w-full flex justify-center items-center py-16 md:py-24 overflow-hidden">
          <TextMarquee className="text-4xl md:text-5xl lg:text-[4rem] font-medium font-heading whitespace-nowrap" height={72} prefix={<><span className="text-[#b490f5]">Four Roles.</span> One System. </>}>
            <div className="text-purple-400 pl-2">Operators</div>
            <div className="text-blue-400 pl-2">Quality Control</div>
            <div className="text-indigo-400 pl-2">Supervisors</div>
            <div className="text-rose-400 pl-2">Admins</div>
          </TextMarquee>
        </section>

        <section id="features">
          <Timeline data={[
            {
              title: "Statistics",
              content: (
                <div className="feature-card !pr-0 overflow-hidden">
                  <img src="/Statistics Desktop.png" alt="Statistics View" className="w-full h-auto rounded-l-xl shadow-2xl object-cover" />
                </div>
              ),
            },
            {
              title: "Traceability",
              content: (
                <div className="feature-card !pr-0 overflow-hidden">
                  <img src="/Trace Desktop.png" alt="Traceability View" className="w-full h-auto rounded-l-xl shadow-2xl object-cover" />
                </div>
              ),
            },
            {
              title: "Batch Ledger",
              content: (
                <div className="feature-card !pr-0 overflow-hidden">
                  <img src="/Batch Ledger.png" alt="Batch Ledger View" className="w-full h-auto rounded-l-xl shadow-2xl object-cover" />
                </div>
              ),
            },
            {
              title: "QR Scanner",
              content: (
                <div className="feature-card !pr-0 overflow-hidden">
                  <img src="/scanner Desktop.png" alt="QR Scanner View" className="w-full h-auto rounded-l-xl shadow-2xl object-cover" />
                </div>
              ),
            },
            {
              title: "Protocols",
              content: (
                <div className="feature-card !pr-0 overflow-hidden">
                  <img src="/Protocols Desktop.png" alt="Protocols View" className="w-full h-auto rounded-l-xl shadow-2xl object-cover" />
                </div>
              ),
            },
            {
              title: "Surveillance",
              content: (
                <div className="feature-card !pr-0 overflow-hidden">
                  <img src="/Surveillance Desktop final.png" alt="Surveillance View" className="w-full h-auto rounded-l-xl shadow-2xl object-cover" />
                </div>
              ),
            },
            {
              title: "Approvals",
              content: (
                <div className="feature-card !pr-0 overflow-hidden">
                  <img src="/Approvals Desktop.png" alt="Approvals View" className="w-full h-auto rounded-l-xl shadow-2xl object-cover" />
                </div>
              ),
            },
          ]} />
        </section>

        <section className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className="multi-device reveal">
            <div className="multi-device-text">
              <h2 className="text-gradient">Flawless everywhere.</h2>
              <p>Built for the rugged low-light environment of the factory floor on mobility devices, yet uncompromising for robust control from the administration desktop.</p>
            </div>
            <div className="mockups-container relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-[100px] w-[80%] max-w-[380px] h-full mx-auto rounded-full z-0"></div>
              <div className="mockup-mobile relative bg-[#111111] overflow-hidden flex items-center justify-center border-4 border-zinc-800 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(139,92,246,0.15)] rounded-[40px]">
                {/* Phone Notch/Speaker */}
                <div className="absolute top-0 inset-x-0 w-32 h-6 bg-zinc-800 rounded-b-xl mx-auto z-10"></div>

                <div className="w-full h-full bg-black rounded-[32px] overflow-hidden">
                  <img
                    src="/Ledger Phone.png"
                    alt="Mobile App Ledger"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Streamlined Workflow / Tubes Section */}
        <section className="relative w-full h-[600px] flex items-center justify-center bg-transparent overflow-hidden">
          {/* Tubes Background */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
            <TubesBackground />
          </div>

          {/* Foreground Text */}
          <div className="relative z-10 text-center max-w-3xl px-4 pointer-events-none">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Streamlined Workflow
            </h2>
            <p className="text-2xl text-zinc-400">
              Designed for absolute minimal friction on the assembly line.
            </p>
          </div>
        </section>

        <section id="how">
          <StackedCards />
        </section>

        <section id="contact">
          <CTASection />
        </section>
      </main>

      <AnimatedFooter />
    </>
  )
}
