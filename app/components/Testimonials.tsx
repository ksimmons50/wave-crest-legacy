'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, MapPin, ChevronLeft, ChevronRight, Hammer, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  photo?: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  placeholder?: boolean;
  showHeader?: boolean;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Downtown",
    rating: 5,
    text: "Outstanding professional service! They responded quickly and solved our problem efficiently. Highly recommend!",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    location: "Westside",
    rating: 5,
    text: "Excellent service! Professional, knowledgeable, and cleaned up everything perfectly. Will definitely use again.",
    photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    id: "3",
    name: "Jennifer Chen",
    location: "Eastside",
    rating: 5,
    text: "We've used them for several projects now. Always reliable, professional, and high-quality work. Highly recommend!",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: "4",
    name: "David Thompson",
    location: "Northside",
    rating: 5,
    text: "Fixed our issue quickly and efficiently. The technician was courteous and explained everything clearly.",
    photo: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg"
  },
  {
    id: "5",
    name: "Lisa Park",
    location: "Southside",
    rating: 5,
    text: "Great experience from start to finish. Fair pricing, quality work, and excellent customer service.",
    photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg"
  },
  {
    id: "6",
    name: "Robert Wilson",
    location: "Midtown",
    rating: 5,
    text: "Professional and efficient service. Quick diagnosis and clean work. The warranty gives us peace of mind.",
    photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
  }
];

export default function Testimonials({
  title = "What Our Customers Say",
  subtitle = "Trusted by homeowners and businesses across the area",
  testimonials = DEFAULT_TESTIMONIALS,
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  placeholder = false,
  showHeader = true
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play effect - must be called before any early returns
  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 300);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, testimonials.length]);

  // Placeholder Mode
  if (placeholder) {
    return (
      <div className={className}>
        <div className="relative p-2">
          {/* Placeholder content */}
          <div className="animate-pulse">
            {/* Header section skeleton */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <div className="h-10 w-40 bg-blue-100 rounded-full" />
              </div>
              <div className="h-12 w-96 max-w-full bg-gray-300 rounded-lg mb-4 mx-auto" />
              <div className="h-6 w-2/3 max-w-2xl bg-gray-200 rounded mx-auto" />
            </div>

            {/* Carousel card skeleton */}
            <div className="relative max-w-5xl mx-auto px-4 sm:px-12">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-blue-100">
                {/* Photo skeleton */}
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 ring-4 ring-blue-100 shadow-lg" />
                </div>

                {/* Stars skeleton */}
                <div className="mb-6 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 bg-yellow-200 rounded-full" />
                  ))}
                </div>

                {/* Quote skeleton */}
                <div className="mb-8 max-w-3xl mx-auto space-y-3">
                  <div className="h-6 w-full bg-gray-200 rounded" />
                  <div className="h-6 w-5/6 bg-gray-200 rounded mx-auto" />
                  <div className="h-6 w-4/6 bg-gray-200 rounded mx-auto" />
                </div>

                {/* Name and location skeleton */}
                <div>
                  <div className="h-6 w-32 bg-gray-300 rounded mb-2 mx-auto" />
                  <div className="h-5 w-24 bg-gray-200 rounded mx-auto" />
                </div>
              </div>

              {/* Navigation arrows skeleton */}
              <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-gray-300 rounded-lg p-3 w-12 h-12" />
              <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-gray-300 rounded-lg p-3 w-12 h-12" />

              {/* Dots skeleton */}
              <div className="flex justify-center mt-8 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className={`h-3 rounded-full bg-gray-300 ${i === 1 ? 'w-8' : 'w-3'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Stats skeleton */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-10 w-20 bg-blue-200 rounded-lg mb-2 mx-auto" />
                  <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Working indicator overlay */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600"
                style={{
                  animation: 'spin 1s linear infinite'
                }}
              />
              <div className="bg-white/90 p-3 rounded-full shadow-lg">
                <Hammer className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex justify-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'} drop-shadow-sm`}
          />
        ))}
      </div>
    );
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Guard against empty testimonials array
  if (!currentTestimonial) {
    return null;
  }

  return (
    <div className={className}>
      {showHeader && (
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Client Reviews</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      )}

      {/* Carousel */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-12">
        <div
          className={`bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-blue-100 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 text-blue-200 opacity-50">
            <Quote className="w-12 h-12" />
          </div>

          {/* Customer Photo */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 ring-4 ring-blue-100 shadow-lg">
              {currentTestimonial.photo ? (
                <Image
                  src={currentTestimonial.photo}
                  alt={currentTestimonial.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  {currentTestimonial.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            {renderStars(currentTestimonial.rating)}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-xl md:text-2xl text-gray-800 mb-8 italic max-w-3xl mx-auto leading-relaxed font-medium">
            &ldquo;{currentTestimonial.text}&rdquo;
          </blockquote>

          {/* Customer Info */}
          <div>
            <div className="font-bold text-gray-900 text-xl mb-1">{currentTestimonial.name}</div>
            <div className="text-blue-600 font-medium flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" />
              {currentTestimonial.location}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-3 shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all duration-200 hover:-translate-x-1"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <button
              onClick={goToNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-3 shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all duration-200 hover:translate-x-1"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8 shadow-md'
                    : 'bg-gray-300 w-3 hover:bg-blue-300 hover:w-5'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">4.9</div>
          <div className="text-sm text-gray-600 font-medium">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
          <div className="text-sm text-gray-600 font-medium">Satisfaction</div>
        </div>
      </div>
    </div>
  );
}
