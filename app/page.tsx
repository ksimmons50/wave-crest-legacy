"use client";

import Hero from "@/app/components/templates/luxury/Hero";
import Services from "@/app/components/templates/luxury/Services";
import ImageBreak from "@/app/components/templates/luxury/ImageBreak";
import PricingSection from "@/app/components/templates/luxury/PricingSection";
import SchedulingSection from "@/app/components/templates/luxury/SchedulingSection";
import ReviewsSection from "@/app/components/templates/luxury/ReviewsSection";
import DividerSection from "@/app/components/templates/luxury/DividerSection";
import Gallery from "@/app/components/templates/luxury/Gallery";
import Contact from "@/app/components/templates/luxury/Contact";

const sections = [
  { id: "hero", name: "Hero", Component: Hero },
  { id: "services", name: "Services", Component: Services },
  { id: "image-break", name: "Image Break", Component: ImageBreak },
  { id: "pricing", name: "Pricing", Component: PricingSection },
  { id: "scheduling", name: "Book a Consultation", Component: SchedulingSection },
  { id: "reviews", name: "Reviews", Component: ReviewsSection },
  { id: "divider", name: "Divider", Component: DividerSection },
  { id: "gallery", name: "Gallery", Component: Gallery },
  { id: "contact", name: "Contact", Component: Contact },
];

export default function LuxuryTemplate() {
  return (
    <div className="min-h-screen bg-background">
      {sections.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </div>
  );
}
