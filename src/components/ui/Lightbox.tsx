"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIndex(i)}
            className="relative aspect-square overflow-hidden rounded-xl group"
            aria-label={`Open image ${i + 1} of ${alt}`}
          >
            <Image
              src={src}
              alt={`${alt} — image ${i + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 text-white/80 hover:text-white"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 text-white/80 hover:text-white"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <div className="relative h-[70vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[index]} alt={`${alt} — image ${index + 1}`} fill className="object-contain" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 text-white/80 hover:text-white"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </div>
      )}
    </>
  );
}
