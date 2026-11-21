import type { Metadata, Viewport } from "next";
import { brand, description, siteUrl, title } from "@/lib/site";
import "./globals.css";

const socialImage = { url: "/images/paylasim.jpg", width: 1200, height: 630, alt: "Evde squat yapan sporcu" };

export const metadata: Metadata = {
  title,
  description,
  applicationName: brand,
  icons: { icon: { url: "/images/favicon.png", type: "image/png", sizes: "96x96" } },
  ...(siteUrl && { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }),
  openGraph: { title, description, type: "website", locale: "tr_TR", siteName: brand,
    ...(siteUrl && { url: "/", images: [socialImage] }) },
  twitter: { card: siteUrl ? "summary_large_image" : "summary", title, description,
    ...(siteUrl && { images: [socialImage] }) },
};

export const viewport: Viewport = { themeColor: "#f7f8f3", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      {/* Browser extensions can add attributes to the body before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
