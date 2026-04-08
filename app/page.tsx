import { Animate, StaggerContainer, StaggerItem } from "@/components/animate";
import { HeroGlow } from "@/components/hero-glow";
import { HeroAnimation } from "@/components/hero-animation";
import { LogoMarquee } from "@/components/logo-marquee";
import { StatCounter } from "@/components/stat-counter";
import Link from "next/link";

const services = [
  {
    title: "AI UX Audit",
    description:
      "A structured, expert review of your AI product's user experience. I identify where users lose trust, drop off, or get confused, then give you a prioritised roadmap to fix it.",
    price: "From £2,500",
    href: "/services#ai-ux-audit",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "AI Product Strategy",
    description:
      "I work alongside your team to define how AI features should behave, communicate, and earn user trust. From concept through to design system and handoff.",
    price: "From £4,000/mo",
    href: "/services#product-strategy",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "AI Design Sprint",
    description:
      "A focused 1-2 week sprint where we go from AI concept to validated, implementation-ready designs. User flows, interfaces, and component specs your engineers can build from.",
    price: "From £3,500",
    href: "/services#design-sprint",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: "Fractional Design Lead",
    description:
      "Embedded design leadership for your team, 1-2 days per week. I set design direction, mentor your designers, and ensure your AI product experience is cohesive.",
    price: "From £1,200/day",
    href: "/services#fractional",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const stats = [
  { value: 95, suffix: "%", label: "of AI pilots fail without design strategy" },
  { value: 100, suffix: ":1", label: "average ROI on UX investment (Forrester)" },
  { value: 56, suffix: "%", label: "higher earnings with AI design skills" },
];

const testimonials = [
  {
    quote: "She completely transformed how our users interact with our AI recommendations. Adoption went from 12% to 67% in three months.",
    name: "Product Lead",
    company: "Series A Fintech",
  },
  {
    quote: "Finally, someone who understands that designing AI products is fundamentally different. The trust frameworks she built changed everything.",
    name: "CTO",
    company: "AI-Native SaaS",
  },
  {
    quote: "The UX audit paid for itself within weeks. She identified exactly why users were dropping off our AI onboarding flow.",
    name: "Head of Product",
    company: "B2B Platform",
  },
];

const problems = [
  "Users don't trust your AI features",
  "AI onboarding has high drop-off",
  "Your AI outputs confuse rather than help",
  "Low adoption of AI-powered functionality",
  "Users prefer the manual workflow over AI",
  "Stakeholders can't align on AI product direction",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HeroGlow />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Copy */}
            <div>
              <Animate delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-border bg-accent-dim mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm text-accent font-medium">
                    Accepting new clients for Q2 2026
                  </span>
                </div>
              </Animate>

              <Animate delay={0.2}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-semibold tracking-tight leading-[1.08]">
                  I design AI products
                  <br />
                  <span className="text-muted">people actually trust</span>
                </h1>
              </Animate>

              <Animate delay={0.35}>
                <p className="mt-8 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
                  Product design strategy for AI-powered features. I help teams go
                  from &ldquo;we built AI&rdquo; to &ldquo;users love it&rdquo;, bridging the gap between
                  technical capability and human experience.
                </p>
              </Animate>

              <Animate delay={0.5}>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-foreground text-background px-7 py-3.5 rounded-full text-sm font-medium hover:opacity-80 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Book a free consultation
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center border border-border px-7 py-3.5 rounded-full text-sm font-medium text-muted hover:text-foreground hover:border-foreground/30 transition-all duration-300"
                  >
                    View services
                  </Link>
                </div>
              </Animate>
            </div>

            {/* Right: Remotion animation */}
            <Animate delay={0.4} variant="scale-in">
              <div className="hidden lg:flex justify-center">
                <HeroAnimation />
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Animate>
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              The problem
            </p>
          </Animate>
          <Animate delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-3xl">
              95% of AI pilots fail.{" "}
              <span className="text-muted">
                Not because the technology is wrong, but because the experience is.
              </span>
            </h2>
          </Animate>

          <StaggerContainer className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem) => (
              <StaggerItem key={problem}>
                <div className="group relative p-6 rounded-2xl border border-border bg-card hover:border-accent-border hover:bg-accent-dim transition-all duration-400 cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-red-300 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                    </div>
                    <p className="text-sm leading-relaxed">{problem}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat, i) => (
              <Animate key={stat.label} delay={i * 0.15}>
                <div className="text-center">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-3 text-sm text-muted max-w-[220px] mx-auto">
                    {stat.label}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Animate>
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              How I help
            </p>
          </Animate>
          <Animate delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
              Design strategy for every stage of your AI product
            </h2>
          </Animate>

          <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.12}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Link
                  href={service.href}
                  className="group block p-8 rounded-2xl border border-border bg-card hover:border-accent-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-400"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-dim text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-400">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <span className="text-sm font-medium text-accent">
                    {service.price}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <Animate>
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              Client feedback
            </p>
          </Animate>
          <Animate delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl mb-16">
              Trusted by product teams building the future
            </h2>
          </Animate>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="p-8 rounded-2xl bg-card border border-border h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted mt-0.5">{t.company}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trusted by */}
      <LogoMarquee />

      {/* Process */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Animate>
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              My process
            </p>
          </Animate>
          <Animate delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl mb-16">
              From AI confusion to user clarity
            </h2>
          </Animate>

          <div className="space-y-0">
            {[
              { step: "01", title: "Understand", desc: "I dive into your product, your users, and your AI capabilities. I map where the experience breaks down and where trust erodes." },
              { step: "02", title: "Design", desc: "Working with your team, I design the interaction patterns, information architecture, and trust signals your AI product needs." },
              { step: "03", title: "Validate", desc: "We test with real users. Every design decision is backed by evidence, not assumption. I refine until adoption metrics move." },
              { step: "04", title: "Deliver", desc: "Implementation-ready designs, component specs, and a design system your engineers can build from. No vague wireframes." },
            ].map((item, i) => (
              <Animate key={item.step} delay={i * 0.1}>
                <div className="group flex items-start gap-8 py-10 border-b border-border hover:border-accent-border transition-colors duration-400 cursor-default">
                  <span className="text-5xl md:text-6xl font-semibold text-border group-hover:text-accent transition-colors duration-400">
                    {item.step}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Animate>
            <div className="relative rounded-3xl bg-foreground text-background p-12 md:p-20 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-light blur-3xl" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  Ready to make your AI product something people actually want to use?
                </h2>
                <p className="mt-6 text-background/60 leading-relaxed">
                  Book a free 30-minute consultation. We&apos;ll discuss your AI
                  product, identify the biggest experience gaps, and I&apos;ll share
                  initial recommendations. No obligations, no sales pitch.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center mt-8 bg-background text-foreground px-7 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                >
                  Book a free consultation
                </Link>
              </div>
            </div>
          </Animate>
        </div>
      </section>
    </>
  );
}
