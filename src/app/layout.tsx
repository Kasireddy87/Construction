import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { companyInfo } from "@/lib/sample-data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sri Balaji Constructions — Projects, Plans & Locations",
    template: "%s | Sri Balaji Constructions",
  },
  description:
    "Explore Sri Balaji Constructions' residential and commercial projects — floor plans, elevations, amenities, connectivity and pricing.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Sri Balaji Constructions",
    url: "/",
  },
  verification: {
    google: "Zl9SzJ5V1_uiLtjal2V-KFiMbrRM8FX9VU1ZSC5J2ps",
  },
};

// LocalBusiness structured data — tells Google this is a real local
// construction company (name, address, phone, service area), not just a
// generic website. Helps both organic search and ties together with a
// future Google Business Profile listing.
function organizationJsonLd() {
  const office = companyInfo.offices[0];
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: companyInfo.name,
    description: companyInfo.aboutBody,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    address: office
      ? {
          "@type": "PostalAddress",
          streetAddress: office.address,
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        }
      : undefined,
    areaServed: ["Hyderabad", "Telangana", "Andhra Pradesh", "Karnataka"],
    sameAs: companyInfo.socials.map((s) => s.url),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
