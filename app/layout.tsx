import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const metadata: Metadata = {
  title: 'RoboAtlas — Interactive Robotics Learning Platform & Algorithm Laboratory',
  description:
    'Visual, mathematical, and interactive explanations of mobile robotics algorithms, kinematics, path planning, localization, SLAM, and multi-agent systems.',
  keywords: [
    'Robotics',
    'Robotics Algorithms',
    'Path Planning',
    'A* Search',
    'Dijkstra',
    'Particle Filter',
    'EKF',
    'SLAM',
    'Pure Pursuit',
    'Multi-Agent Robotics',
    'TypeScript Simulator',
  ],
  authors: [{ name: 'RoboAtlas Team' }],
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
