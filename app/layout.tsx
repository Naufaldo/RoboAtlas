import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const metadata: Metadata = {
  title: 'RoboAtlas — Interactive General Robotics Platform & Algorithm Laboratory',
  description:
    'Mathematically grounded, visual, and interactive platform for learning robotics fundamentals, kinematics, dynamics, control, perception, and multi-embodiment implementations (Robotic Arms, AMRs, UAVs, ROVs, Quadrupeds).',
  keywords: [
    'Robotics',
    'Robotics Mathematics',
    'Kinematics',
    'Dynamics',
    'Control Theory',
    'Robotic Arms',
    'Mobile Robots',
    'UAV Drones',
    'Marine ROV',
    'Legged Robotics',
    'Path Planning',
    'A* Search',
    'State Estimation',
    'Particle Filter',
    'SLAM',
    'Pure Pursuit',
    'TypeScript Robotics Engine',
  ],
  authors: [{ name: 'RoboAtlas Team' }],
  metadataBase: new URL('https://naufaldo.github.io/RoboAtlas/'),
  openGraph: {
    title: 'RoboAtlas — Interactive General Robotics Platform',
    description: 'Learn robotics from first principles to real robot implementations.',
    url: 'https://naufaldo.github.io/RoboAtlas/',
    siteName: 'RoboAtlas',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
