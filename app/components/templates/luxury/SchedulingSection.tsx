"use client";

import RealScheduling from "@/app/components/RealScheduling";

export default function SchedulingSection() {
  return (
    <section id="scheduling" className="py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.4em] uppercase text-primary/60">
            Appointments
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight text-foreground tracking-[0.1em] uppercase mt-4">
            Book a Consultation
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-8" />
        </div>
        <RealScheduling />
      </div>
    </section>
  );
}
