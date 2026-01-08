import type { Metadata } from 'next';
import './globals.css';

import PageTransition from '@components/globals/PageTransition/PageTransition';
import { HeaderServer } from '@/components/globals/Header/HeaderServer';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { SanityLive } from '@/sanity/lib/live';
import { handleError } from './client-utils';
import { DisableDraftMode } from '@/components/globals/DisableDraftMode/DisableDraftMode';
import Intro from '@/components/globals/Intro/Intro';

export const metadata: Metadata = {
  title: 'Photographer - Simon Birk',
  description: 'Website for photographer Simon Birk',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
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
