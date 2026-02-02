'use client';

import { SanityImageAsset } from '@/sanity/types/sanity.types';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { sanitizeVW } from '@/utils/utils';
import { useRef, useEffect } from 'react';

type Props = {
  asset: SanityImageAsset | null;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  blur?: boolean;
  loadDone?: () => void | null;
  vw?: number[];
};

function reportLoadOnce(
  loadDone: (() => void) | null,
  reportedRef: { current: boolean },
) {
  if (loadDone && !reportedRef.current) {
    reportedRef.current = true;
    loadDone();
  }
}

const CustomImage = (props: Props) => {
  const {
    asset,
    priority = false,
    loading,
    blur = false,
    loadDone = null,
    className = '',
    vw = [],
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const reportedRef = useRef(false);

  // Cached images in new tab often load before onLoad is attached; detect already-complete img
  useEffect(() => {
    if (!loadDone || !asset) return;
    const checkComplete = () => {
      const img = wrapperRef.current?.querySelector('img');
      if (img?.complete) reportLoadOnce(loadDone, reportedRef);
    };
    checkComplete();
    const t1 = requestAnimationFrame(checkComplete);
    const t2 = setTimeout(checkComplete, 50);
    const t3 = setTimeout(checkComplete, 200);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [loadDone, asset]);

  if (!asset) return null;

  const { width, height } = asset.metadata?.dimensions || {
    width: 1000,
    height: 1000,
  };

  const src = urlFor(asset)?.format('webp').url();
  const blurSrc = urlFor(asset)?.width(24).height(24).blur(10).url();

  const sizes = vw.length ? sanitizeVW(vw) : '50vw';

  if (asset?._id) {
    return (
      <div
        ref={wrapperRef}
        className="contents"
      >
        <Image
          src={src}
          alt={''}
          width={width}
          height={height}
          priority={priority}
          loading={loading}
          placeholder={blur ? 'blur' : 'empty'}
          blurDataURL={blurSrc}
          className={className}
          sizes={sizes}
          quality={75}
          onLoad={() => reportLoadOnce(loadDone, reportedRef)}
          onError={() => reportLoadOnce(loadDone, reportedRef)}
        />
      </div>
    );
  } else {
    return <div style={{ paddingBottom: '100%' }}> Image not found</div>;
  }
};

export default CustomImage;
