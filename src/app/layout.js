import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import "./globals.css";

// Validate environment variables (only in development)
if (process.env.NODE_ENV === 'development') {
  import('@/lib/env').then(({ validateEnv }) => validateEnv());
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "BizConsult AI - AI-Powered Business Idea Validation",
    template: "%s | BizConsult AI",
  },
  description: "Get instant AI-powered market research, competitor analysis, and feasibility reports for your business idea. Free first report, results in 5 minutes.",
  keywords: ["business idea validation", "market research", "AI analysis", "startup feasibility", "competitor analysis", "business consultant", "market demand", "business planning"],
  authors: [{ name: "BizConsult AI" }],
  creator: "BizConsult AI",
  publisher: "BizConsult AI",
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'BizConsult AI - Validate Your Business Idea with AI',
    description: 'AI-powered market research and competitor analysis in minutes. Get a comprehensive feasibility report for your startup idea.',
    siteName: 'BizConsult AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BizConsult AI - Business Idea Validation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizConsult AI - Validate Your Business Idea',
    description: 'Get instant AI-powered market research and feasibility reports',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Google Analytics - Add your GA4 ID in .env.local */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}