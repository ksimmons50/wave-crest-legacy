"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

interface GalleryImage {
  url: string;
  description: string;
}

interface CurvedGalleryProps {
  images: GalleryImage[];
}

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  x: MotionValue<number>;
  imageWidth: number;
  imageGap: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function GalleryItem({ 
  image, 
  index, 
  x, 
  imageWidth, 
  imageGap, 
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: GalleryItemProps) {
  // Calculate position for 3D effect
  const itemX = useTransform(x, (latest) => {
    const itemPosition = index * (imageWidth + imageGap) + latest;
    return itemPosition;
  });
  
  // Calculate rotation and scale based on position
  const rotateY = useTransform(itemX, [-500, 0, 500], [35, 0, -35]);
  const scale = useTransform(itemX, [-400, 0, 400], [0.9, 1, 0.9]);
  const zIndex = useTransform(itemX, [-200, 0, 200], [0, 10, 0]);

  return (
    <motion.div
      className="relative flex-shrink-0"
      style={{
        width: imageWidth,
        rotateY,
        scale,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <Image
          src={image.url}
          alt={image.description}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          draggable={false}
        />
        
        {/* Hover overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} 
        />
        
        {/* Caption */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <p className="text-foreground text-sm tracking-[0.1em] uppercase font-light">
            {image.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CurvedGallery({ images }: CurvedGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const imageWidth = 320;
  const imageGap = 24;
  const totalWidth = images.length * (imageWidth + imageGap) - imageGap;
  
  // Motion value for drag position
  const x = useMotionValue(0);
  
  // Calculate drag constraints
  const dragConstraints = {
    left: -(totalWidth - imageWidth),
    right: 0,
  };
  
  // Handle drag end with snap to nearest image
  const handleDragEnd = (_: unknown, info: { velocity: { x: number } }) => {
    const velocity = info.velocity.x;
    const currentX = x.get();
    
    // Calculate momentum-based destination
    let destination = currentX + velocity * 0.2;
    
    // Snap to nearest image
    const snapIndex = Math.round(-destination / (imageWidth + imageGap));
    const clampedIndex = Math.max(0, Math.min(snapIndex, images.length - 1));
    destination = -clampedIndex * (imageWidth + imageGap);
    
    // Animate to destination with spring
    animate(x, destination, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    });
    
    setActiveIndex(clampedIndex);
  };

  return (
    <div className="relative overflow-hidden py-12">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />
      
      {/* Gallery track */}
      <div className="flex justify-center" style={{ perspective: "1200px" }}>
        <motion.div
          className="flex cursor-grab active:cursor-grabbing pl-[calc(50vw-160px)]"
          style={{ 
            x,
            gap: `${imageGap}px`,
          }}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              image={image}
              index={index}
              x={x}
              imageWidth={imageWidth}
              imageGap={imageGap}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newX = -index * (imageWidth + imageGap);
              animate(x, newX, { type: "spring", stiffness: 400, damping: 40 });
              setActiveIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? "bg-primary w-6" 
                : "bg-background/30 hover:bg-background/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Drag hint */}
      <p className="text-center text-muted-foreground text-xs tracking-[0.2em] uppercase mt-4">
        Drag to explore
      </p>
    </div>
  );
}
