import { useEffect, useRef, useState } from 'react';
import { checkIfBottom } from '@/utils/utils';
import { useStore } from '@/store/store';
interface Props {
  dataLen: number | undefined;
  children: any;
}
const ThumbnailsProvider = (props: Props) => {
  const { children, dataLen } = props;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [localShowThumbs, setLocalShowThumbs] = useState(false);
  const [localIndex, setLocalIndex] = useState<number>(-1);
  const { setGlobalStartThumbs, setGlobalThumbIndex } = useStore(
    (state) => state,
  );

  const clearTImer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if we are the bottom of the page
      if (checkIfBottom()) {
        timeoutRef.current = setTimeout(() => {
          setLocalShowThumbs(true);
        }, 1000);
      } else {
        clearTImer();
        setLocalShowThumbs(false);
      }
    };

    checkIfBottom();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setGlobalStartThumbs(localShowThumbs);
  }, [localShowThumbs]);

  useEffect(() => {
    const resetAnimation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setLocalIndex(-1);
      }
    };

    const startAnimation = () => {
      intervalRef.current = setInterval(() => {
        setLocalIndex((prev) => ++prev);
      }, 1000);
    };

    if (!localShowThumbs) {
      resetAnimation();
    } else {
      startAnimation();
    }

    return () => {
      resetAnimation();
    };
  }, [localShowThumbs]);

  useEffect(() => {
    if (!dataLen) return;
    const next = localIndex % dataLen;
    setGlobalThumbIndex(next);
  }, [localIndex, dataLen]);

  return <>{children}</>;
};

export default ThumbnailsProvider;
