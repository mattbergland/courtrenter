import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CourtRenter — Rent Basketball Courts in the Bay Area",
  description: "Find and rent basketball courts in SF and the Bay Area. Connect directly with gyms and rec centers for your team, league, or event.",
  keywords: ["rent basketball court", "bay area", "san francisco", "basketball court rental", "court rental SF", "gym rental", "courtrenter", "basketball sf"],
  metadataBase: new URL("https://courtrenter.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "CourtRenter — Rent Basketball Courts in the Bay Area",
    description: "Find and rent basketball courts in SF and the Bay Area. Connect directly with gyms and rec centers.",
    type: "website",
    siteName: "CourtRenter",
  },
  twitter: {
    card: "summary_large_image",
    title: "CourtRenter — Rent Basketball Courts in the Bay Area",
    description: "Find and rent basketball courts in SF and the Bay Area. Connect directly with gyms and rec centers.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white min-h-screen flex flex-col`}>
        <header className="border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
              CourtRenter
            </Link>
            <Link
              href="/request"
              className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="hidden sm:inline">Request a Basketball Court</span>
              <span className="sm:hidden">Request Court</span>
            </Link>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-gray-100 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">
              CourtRenter &middot; Helping you find basketball courts in the Bay Area
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
