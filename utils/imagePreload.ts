import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import { urlFor } from '@/sanity/lib/image';

/**
 * Preloads a single image by injecting a link rel="preload" tag into the document head
 */
const preloadImage = (url: string) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Check if already preloaded to avoid duplicates
  const existingLink = document.querySelector(
    `link[rel="preload"][href="${url}"]`,
  );
  if (existingLink) return;

  // Create and append link element
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  // Add type for better browser optimization (webp)
  link.setAttribute('type', 'image/webp');
  document.head.appendChild(link);
};

/**
 * Generates the image URL and preloads it
 */
const generatePreloadedImages = (asset: any) => {
  if (!asset) return;

  try {
    const src = urlFor(asset)?.format('webp').url();
    if (src) {
      preloadImage(src);
    }
  } catch (error) {
    console.error('Error preloading image:', error);
  }
};

/**
 * Preloads the first two images from a project's media array
 */
export const preloadProjectImages = (data: QueryProjectsResult[number]) => {
  if (!data || !data.media || !Array.isArray(data.media)) return;

  // Only preload the first 2 images
  const firstTwoImages = data.media;

  firstTwoImages.forEach((image) => {
    if (image?.asset) {
      generatePreloadedImages(image.asset);
    }
  });
};

/**
 * Safari-specific image preloading using both link preload and Image object
 * This dual approach ensures better compatibility with Safari's lazy loading behavior
 */
export const preloadImageForSafari = (asset: any) => {
  if (!asset || typeof window === 'undefined') return;

  const src = urlFor(asset)?.format('webp').url();
  if (!src) return;

  // Method 1: Link preload (works well in Safari)
  // Check if already preloaded to avoid duplicates
  const existingLink = document.querySelector(
    `link[rel="preload"][href="${src}"]`,
  );
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.setAttribute('type', 'image/webp');
    document.head.appendChild(link);
  }

  // Method 2: Image object (fallback for older Safari)
  const img = new Image();
  img.src = src;
};
