import { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
