import { SanityImageAsset } from '@/sanity/types/sanity.types';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { sanitizeVW } from '@/utils/utils';

type Props = {
  asset: SanityImageAsset | null;
  priority?: boolean;
  className?: string;
  blur?: boolean;
  loadDone?: () => void | null;
  vw?: number[];
};

const CustomImage = (props: Props) => {
  const {
    asset,
    priority = false,
    blur = false,
    loadDone = null,
    className = '',
    vw = [],
  } = props;

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
      <Image
        src={src}
        alt={''}
        width={width}
        height={height}
        priority={priority}
        placeholder={blur ? 'blur' : 'empty'}
        blurDataURL={blurSrc}
        className={className}
        sizes={sizes}
        quality={75}
        onLoad={() => (loadDone ? loadDone() : null)}
      />
    );
  } else {
    return <div style={{ paddingBottom: '100%' }}> Image not found</div>;
  }
};

export default CustomImage;
