'use client';

import { useEffect, useState } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isTouchDevice: boolean;
  browserName: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

// SSR-safe fallback values (matches server render)
const SSR_FALLBACK: DeviceInfo = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isIOS: false,
  isAndroid: false,
  isSafari: false,
  isChrome: false,
  isFirefox: false,
  isEdge: false,
  isTouchDevice: false,
  browserName: 'unknown',
  deviceType: 'desktop',
};

const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return SSR_FALLBACK;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  // Device detection
  const isMobile =
    /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(
      userAgent,
    );
  const isTablet =
    /ipad|android(?!.*mobile)|tablet|playbook|kindle|silk|windows phone|windows mobile/i.test(
      userAgent,
    ) ||
    (isMobile && window.innerWidth >= 768);
  const isDesktop = !isMobile && !isTablet;

  // OS detection
  const isIOS = /iphone|ipad|ipod/.test(userAgent) || /MacIntel/.test(platform);
  const isAndroid = /android/.test(userAgent);

  // Browser detection
  const isSafari =
    /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
  const isChrome =
    /chrome|crios/.test(userAgent) && !/edge|opr|safari/.test(userAgent);
  const isFirefox = /firefox|fxios/.test(userAgent);
  const isEdge = /edge|edg/.test(userAgent);

  // Browser name
  let browserName = 'unknown';
  if (isChrome) browserName = 'chrome';
  else if (isSafari) browserName = 'safari';
  else if (isFirefox) browserName = 'firefox';
  else if (isEdge) browserName = 'edge';

  // Touch detection
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);

  // Device type
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (isMobile && !isTablet) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isFirefox,
    isEdge,
    isTouchDevice,
    browserName,
    deviceType,
  };
};

/**
 * Hook to detect device and browser information
 * Prevents hydration mismatch by using SSR-safe defaults initially
 * @returns DeviceInfo object with device and browser properties
 */
export const useDeviceDetection = (): DeviceInfo => {
  // Always start with SSR fallback to match server render
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(SSR_FALLBACK);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // After hydration, update with actual device info
    setMounted(true);
    setDeviceInfo(getDeviceInfo());

    // Update on resize (handles device rotation, window resize, etc.)
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
};
