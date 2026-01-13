'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// List of all available favicons (excluding default)
const favicons = [
  '/favicons/project-adidas.png',
  '/favicons/project-alo-fw25.png',
  '/favicons/project-artikel-kbh-fall-23.png',
  '/favicons/project-artikel-kbh-spring-23.png',
  '/favicons/project-artikel-kbh-spring-25.png',
  '/favicons/project-doxa-ss24.png',
  '/favicons/project-doxa-ss25.png',
  '/favicons/project-inwear-fall-24.png',
  '/favicons/project-inwear-spring-26.png',
  '/favicons/project-lovechild-fall-24.png',
  '/favicons/project-lovechild-spring-25.png',
  '/favicons/project-new-york.png',
  '/favicons/project-norse-projects.png',
  '/favicons/project-odda-magazine.png',
  '/favicons/project-pas-normal-studios-fw24.png',
  '/favicons/project-pas-normal-studios-fw25.png',
  '/favicons/project-salomon-fall-24.png',
  '/favicons/project-salomon-outdoor.png',
  '/favicons/project-salomon-spring-24.png',
  '/favicons/project-sicily.png',
  '/favicons/project-the-cozy-void.png',
  '/favicons/project-the-greatest-magazine.png',
];

export default function Favicon() {
  const pathname = usePathname();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    // Function to safely update favicon
    const updateFavicon = (url: string) => {
      if (typeof document === 'undefined' || !document.head) {
        return;
      }

      try {
        // Find existing favicon links
        const existingIcon = document.querySelector("link[rel='icon']");
        const existingShortcut = document.querySelector(
          "link[rel='shortcut icon']",
        );

        // Update existing links or create new ones
        if (existingIcon) {
          (existingIcon as HTMLLinkElement).href = url;
        } else {
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/png';
          link.sizes = '32x32';
          link.href = url;
          document.head.appendChild(link);
        }

        if (existingShortcut) {
          (existingShortcut as HTMLLinkElement).href = url;
        } else {
          const shortcut = document.createElement('link');
          shortcut.rel = 'shortcut icon';
          shortcut.href = url;
          document.head.appendChild(shortcut);
        }
      } catch (error) {
        // Silently fail if DOM manipulation fails
        console.warn('Failed to update favicon:', error);
      }
    };

    const cycleFavicons = () => {
      if (typeof document === 'undefined' || !document.head) {
        return;
      }
      const faviconUrl = favicons[currentIndexRef.current];
      updateFavicon(faviconUrl);
      currentIndexRef.current = (currentIndexRef.current + 1) % favicons.length;
    };

    // Set initial favicon
    cycleFavicons();

    // Set up interval to cycle every 3 seconds
    intervalRef.current = setInterval(cycleFavicons, 3000);

    // Cleanup interval on unmount or pathname change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [pathname]);

  return null;
}
