'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt?: string;
}

export function ImageLightbox({ src, alt = '' }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Image thumbnail */}
      <div className="my-8 lg:my-12 flex justify-center">
        <img
          src={src}
          alt={alt}
          className="rounded-lg shadow-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
          style={{ maxWidth: '800px', maxHeight: '600px', objectFit: 'contain' }}
          loading="lazy"
          onClick={handleOpen}
        />
      </div>

      {/* Lightbox modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close image"
          >
            <X className="h-8 w-8" />
          </button>
          
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}