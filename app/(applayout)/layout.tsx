import type { Metadata } from 'next';
import './globals.css';

import PageTransition from '@components/globals/PageTransition/PageTransition';
import { HeaderServer } from '@/components/globals/Header/HeaderServer';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { SanityLive } from '@/sanity/lib/live';
import { handleError } from './client-utils';
import { DisableDraftMode } from '@/components/globals/DisableDraftMode/DisableDraftMode';

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

  console.log('isDraftMode', isDraftMode);
  return (
    <html lang="en">
      <body>
        <HeaderServer />
        {isDraftMode && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}

        <SanityLive onError={handleError} />

        <main>
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
