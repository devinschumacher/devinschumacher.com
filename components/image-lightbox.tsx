'use client';

import { useState } from 'react';
import Image from 'next/image';
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
        <div className="relative max-w-full max-h-[600px] cursor-pointer hover:opacity-90 transition-opacity" onClick={handleOpen}>
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            className="rounded-lg shadow-lg object-contain"
            style={{ maxWidth: '800px', maxHeight: '600px' }}
            loading="lazy"
          />
        </div>
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
          
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}