import './globals.css';

import { HeaderServer } from '@/components/globals/Header/HeaderServer';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { handleError } from './client-utils';
import { DisableDraftMode } from '@/components/globals/DisableDraftMode/DisableDraftMode';
import StoreInitializer from '@/components/globals/StoreInitializer/StoreInitializer';
import { Metadata } from 'next/types';
import { querySettings } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({ query: querySettings });

  const ogImage = settings?.seo?.seoImage
    ? urlFor(settings.seo.seoImage).width(1200).url()
    : undefined;
  return {
    title: settings?.seo?.seoTitle || 'Simon Birk',
    description: settings?.seo?.seoDescription,
    openGraph: ogImage ? { images: [{ url: ogImage }] } : {},
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <StoreInitializer />

      <HeaderServer />

      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}

      <SanityLive onError={handleError} />

      <main>{children}</main>
    </>
  );
}
