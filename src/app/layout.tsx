import type { Metadata } from "next";
import "./globals.css";
import Header from "@components/globals/Header/Header";
import Text from "@components/shared/ui/Text/Text";
import Box from "@components/shared/ui/Box/Box";
export const metadata: Metadata = {
  title: "Photographer - Simon Birk",
  description: "Website for photographer Simon Birk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>
      </body>
    </html>
  );
}
