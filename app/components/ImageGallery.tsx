'use client';

import React from 'react';
import Image from 'next/image';
import { PROFESSIONAL_IMAGES } from '../../professionalConstants';

const GALLERY_FILE_PATH = 'app/components/ImageGallery.tsx';

/**
 * Image Gallery Component
 *
 * Each image is rendered explicitly (not mapped) so they can be
 * individually edited via click-to-edit.
 */
export default function ImageGallery() {
  const isDev = process.env.NODE_ENV === 'development';

  const handleAddImage = async () => {
    try {
      const response = await fetch('/api/gallery-add-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: GALLERY_FILE_PATH,
          imageIndex: 0
        })
      });

      if (!response.ok) {
        console.error('Failed to add image');
      }
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* GALLERY_IMAGES_START */}
      {PROFESSIONAL_IMAGES[0] && (
        <div className="group relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={PROFESSIONAL_IMAGES[0].url}
            alt={PROFESSIONAL_IMAGES[0].description}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {PROFESSIONAL_IMAGES[1] && (
        <div className="group relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={PROFESSIONAL_IMAGES[1].url}
            alt={PROFESSIONAL_IMAGES[1].description}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {PROFESSIONAL_IMAGES[2] && (
        <div className="group relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={PROFESSIONAL_IMAGES[2].url}
            alt={PROFESSIONAL_IMAGES[2].description}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {PROFESSIONAL_IMAGES[3] && (
        <div className="group relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={PROFESSIONAL_IMAGES[3].url}
            alt={PROFESSIONAL_IMAGES[3].description}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      {/* GALLERY_IMAGES_END */}

      {isDev && (
        <button
          onClick={handleAddImage}
          data-non-editable="true"
          className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center cursor-pointer"
        >
          <span className="text-4xl text-gray-400 hover:text-primary">+</span>
        </button>
      )}
    </div>
  );
}
