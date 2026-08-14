import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const viewport: Viewport = {
  themeColor: '#070a13',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'RoboAtlas — Interactive General Robotics Platform & 60 FPS Algorithm Laboratory',
    template: '%s | RoboAtlas',
  },
  description:
    'A mathematically grounded, visual, and interactive platform for learning general robotics from first principles: 2D/3D geometry, kinematics, dynamics, PID control, A* & RRT* path planning, Monte Carlo localization, LiDAR occupancy mapping, and ICP SLAM across Robotic Arms, AMRs, UAVs, Subsea ROVs, and Quadrupeds.',
  applicationName: 'RoboAtlas',
  authors: [{ name: 'Naufaldo & RoboAtlas Contributors' }],
  generator: 'Next.js',
  keywords: [
    'Robotics',
    'Robotics Mathematics',
    'Kinematics',
    'Inverse Kinematics',
    'Path Planning',
    'A* Algorithm',
    'RRT*',
    'PID Controller',
    'State Estimation',
    'Particle Filter',
    'Monte Carlo Localization',
    'Occupancy Grid Mapping',
    'LiDAR Simulation',
    'ICP SLAM',
    'Autonomous Robotics',
    'Robotic Arm',
    'Differential Drive',
    'UAV Quadrotor',
    'Marine ROV',
    'Legged Robotics',
    'Interactive Robotics Textbook',
    'TypeScript Robotics Engine',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Naufaldo',
  publisher: 'RoboAtlas',
  category: 'Education & Technology',
  metadataBase: new URL('https://naufaldo.github.io/RoboAtlas/'),
  alternates: {
    canonical: 'https://naufaldo.github.io/RoboAtlas/',
    languages: {
      'en-US': 'https://naufaldo.github.io/RoboAtlas/',
      'id-ID': 'https://naufaldo.github.io/RoboAtlas/',
    },
  },
  icons: {
    icon: [
      { url: '/RoboAtlas/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/RoboAtlas/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/RoboAtlas/images/logo.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'RoboAtlas — Interactive General Robotics Platform & Algorithm Lab',
    description:
      'Learn robotics by seeing it work: 60 FPS in-browser simulations, KaTeX mathematical derivations, and multi-embodiment engineering.',
    url: 'https://naufaldo.github.io/RoboAtlas/',
    siteName: 'RoboAtlas',
    images: [
      {
        url: '/RoboAtlas/images/logo.png',
        width: 800,
        height: 800,
        alt: 'RoboAtlas Interactive Robotics Platform Emblem',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoboAtlas — Interactive General Robotics Platform',
    description:
      'Understand robotics mathematics, visual algorithms, and 60 FPS in-browser simulators from first principles.',
    images: ['/RoboAtlas/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalApplication',
    name: 'RoboAtlas',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any (Web Browser)',
    description:
      'An interactive robotics learning platform combining mathematical rigor, 60 FPS in-browser simulations, and multi-embodiment hardware modeling.',
    url: 'https://naufaldo.github.io/RoboAtlas/',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    educationalUse: 'Interactive Learning & Engineering Simulation',
    inLanguage: ['en', 'id'],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#070a13] text-slate-100 dark:bg-[#070a13] dark:text-slate-100 flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
