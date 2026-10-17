import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion Lab",
  description: "تجربة GSAP وScrollTrigger وLenis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}