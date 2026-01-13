import { Metadata } from 'next';
import Favicon from '@/components/globals/Favicon/Favicon';

export const metadata: Metadata = {
  icons: {
    icon: [{ url: '/favicon-32x32.png' }],
    shortcut: ['/favicon-32x32.png'],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <body>{children}</body>
    </html>
  );
}
