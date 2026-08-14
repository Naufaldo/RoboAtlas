'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  Compass,
  Navigation,
  Cpu,
  BookOpen,
  Github,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, toggleLocale, t } = useLanguage();

  const navLinks = [
    { name: t.nav.curriculum, href: '/learn', icon: BookOpen },
    { name: t.nav.algorithms, href: '/algorithms', icon: Cpu },
    { name: t.nav.pathPlanning, href: '/learn/planning', icon: Navigation },
    { name: t.nav.kinematics, href: '/learn/fundamentals', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 dark:border-slate-800/80 border-slate-200/80 bg-slate-950/80 dark:bg-slate-950/80 bg-white/85 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20 text-slate-950 group-hover:scale-105 transition-all">
            <Bot className="h-5 w-5 text-slate-950 stroke-[2.4]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              RoboAtlas
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/30 font-mono font-normal">
                v0.1.0
              </span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline -mt-0.5">
              Interactive Robotics Laboratory
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher, Dark/Light Mode Toggle, GitHub */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            title={`Switch to ${locale === 'en' ? 'Bahasa Indonesia' : 'English'}`}
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center h-9 w-9 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
            title={theme === 'dark' ? t.theme.light : t.theme.dark}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/Naufaldo/RoboAtlas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-9 w-9 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:text-cyan-500 dark:hover:text-cyan-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-mono ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
