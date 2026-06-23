import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "S.N. Visuals | Premium Visual Packaging Studio",
  description:
    "S.N. Visuals is a boutique creative studio for high-performance thumbnails, cinematic composites, food visuals, and premium creator packaging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
