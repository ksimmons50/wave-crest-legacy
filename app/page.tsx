import Link from "next/link";
import { Layers, TrendingUp, Anchor, FileCheck, Home, Handshake, ArrowRight } from "lucide-react";
import RealReviews from "./components/RealReviews";
import { PROFESSIONAL_TAGLINE, PROFESSIONAL_IMAGES } from "../professionalConstants";

const HERO_IMAGE = PROFESSIONAL_IMAGES[1]?.url || PROFESSIONAL_IMAGES[0]?.url;

const DIVISIONS = [
  {
    href: "/about",
    icon: Layers,
    title: "Wave Crest Legacy Group",
    label: "The Foundation",
    items: [
      "Business Clarity & Documentation",
      "Brand Identity & Messaging",
      "Mentorship & Strategic Guidance",
      "Investor-Ready Systems",
    ],
  },
  {
    href: "/acquisitions",
    icon: TrendingUp,
    title: "Wave Crest Legacy Acquisitions",
    label: "The Engine",
    items: [
      "Real Estate Due Diligence",
      "Market Studies & Analysis",
      "Deal Structuring",
      "Owner-Finance Pathways",
    ],
  },
  {
    href: "/holding",
    icon: Anchor,
    title: "Wave Crest Legacy Holding",
    label: "The Anchor",
    items: [
      "Portfolio Organization",
      "Clean Title Management",
      "Asset Stewardship",
      "Legacy Planning",
    ],
  },
];

const PATHWAYS = [
  {
    icon: FileCheck,
    title: "Lease-Option (L/O)",
    text: "Lease today, lock in your purchase terms, and buy within 12–24 months.",
  },
  {
    icon: Home,
    title: "Rent-to-Own (RTO)",
    text: "Rent while building toward ownership. Includes option fee and a clear purchase timeline.",
  },
  {
    icon: Handshake,
    title: "Support & Guidance",
    text: "We help residents understand their path, prepare for financing, and transition smoothly.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#2E5090]">
      {/* SECTION 1 — HERO */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-28">
        {/* Background image + overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1f3a6b]/90 via-[#2E5090]/85 to-[#254680]/95"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="body-text mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Real Estate · Acquisitions · Legacy
          </p>
          <h1 className="hero-title mb-6 text-balance text-5xl font-black tracking-tight text-[#f5f5f0] md:text-7xl">
            Wave Crest Legacy Group
          </h1>
          <p className="body-text mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-[#f5f5f0]/90 md:text-xl">
            {PROFESSIONAL_TAGLINE}.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/lets-connect"
              className="body-text inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-base font-bold text-[#1f3a6b] transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30"
            >
              Start Your Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="body-text inline-flex items-center gap-2 border-2 border-[#f5f5f0]/40 px-8 py-4 text-base font-semibold text-[#f5f5f0] transition-all duration-300 hover:border-amber-400 hover:text-amber-400"
            >
              Explore Our Divisions
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ECOSYSTEM */}
      <section className="relative bg-[#254680] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="hero-title mb-4 text-balance text-4xl font-black tracking-tight text-[#f5f5f0] md:text-5xl">
              One Group, Three Pillars
            </h2>
            <p className="body-text mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-[#f5f5f0]/80">
              A connected ecosystem built to take every project from clear strategy to lasting ownership.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {DIVISIONS.map(({ href, icon: Icon, title, label, items }) => (
              <Link
                key={title}
                href={href}
                className="group flex h-full flex-col border-2 border-amber-500/30 bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-500/20"
              >
                <div className="mb-6 flex justify-center">
                  <Icon
                    className="h-16 w-16 text-amber-400 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="hero-title mb-3 text-center text-2xl font-bold text-[#f5f5f0] transition-colors group-hover:text-amber-400">
                  {title}
                </h3>
                <p className="body-text mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
                  {label}
                </p>
                <div className="flex-grow space-y-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                      <span className="body-text text-sm leading-relaxed text-[#f5f5f0]/90">{item}</span>
                    </div>
                  ))}
                </div>
                <span className="body-text mt-6 inline-flex items-center justify-center gap-1 text-sm font-semibold text-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — ABOUT */}
      <section className="relative bg-[#f5f5f0] px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <h2 className="hero-title text-balance text-4xl font-black tracking-tight text-[#2E5090] md:text-5xl">
            About Our Company
          </h2>
          <p className="body-text text-pretty text-lg leading-relaxed text-[#2E5090]/90">
            Wave Crest Legacy Group is the umbrella organization that guides and connects our operating divisions:
            Acquisitions and Holding. We focus on clarity, structure, and long-term value creation across every project
            we touch. Our mission is simple — build strong foundations, make intentional decisions, and create momentum
            that lasts.
          </p>
        </div>
      </section>

      {/* SECTION 4 — FLEXIBLE OWNERSHIP PATHWAYS */}
      <section className="relative bg-gradient-to-b from-[#2E5090] to-[#3B6BB5] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="hero-title mb-4 text-balance text-4xl font-black tracking-tight text-[#f5f5f0] md:text-5xl">
              Flexible Ownership Pathways
            </h2>
            <p className="body-text text-pretty text-lg leading-relaxed text-[#f5f5f0]/90">
              Helping residents move from renting to owning with clarity and confidence.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {PATHWAYS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-lg border border-amber-500/20 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="mb-6 flex justify-center">
                  <Icon className="h-14 w-14 text-amber-400" strokeWidth={1.5} />
                </div>
                <h3 className="hero-title mb-4 text-center text-2xl font-bold text-[#f5f5f0]">{title}</h3>
                <p className="body-text text-center text-base leading-relaxed text-[#f5f5f0]/85">{text}</p>
              </div>
            ))}
          </div>

          <p className="body-text text-center text-sm italic text-[#f5f5f0]/75">
            Available on select Wave Crest homes. Program details vary by property.
          </p>
        </div>
      </section>

      {/* SECTION 5 — REVIEWS */}
      <section className="relative bg-[#f5f5f0] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="hero-title mb-4 text-balance text-4xl font-black tracking-tight text-[#2E5090] md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="body-text mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-[#2E5090]/80">
              Real stories from families, investors, and entrepreneurs we&apos;ve helped build their next chapter.
            </p>
          </div>
          <RealReviews minHeight="500px" />
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="relative bg-[#1f3a6b] px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h2 className="hero-title text-balance text-4xl font-black text-[#f5f5f0] md:text-5xl">
            Let&apos;s Build Your Next Chapter
          </h2>
          <p className="body-text mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-[#f5f5f0]/85">
            Whether you&apos;re buying, selling, or planning for the long term, our team is ready to help you move
            forward with confidence.
          </p>
          <div className="pt-2">
            <Link
              href="/lets-connect"
              className="body-text inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-5 text-lg font-bold text-[#1f3a6b] transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30"
            >
              Start Your Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
