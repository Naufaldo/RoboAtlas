'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  Compass,
  Cpu,
  BookOpen,
  Menu,
  X,
  Sparkles,
  Layers,
  Sun,
  Moon,
  Globe,
  Users,
  Terminal,
  Activity,
} from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLanguage();

  const navLinks = [
    { name: t.nav.learn, href: '/learn', icon: BookOpen },
    { name: t.nav.algorithms, href: '/algorithms', icon: Cpu },
    { name: t.nav.robots, href: '/robots', icon: Bot },
    { name: t.nav.labs, href: '/labs', icon: Compass },
    { name: t.nav.projects, href: '/projects', icon: Sparkles },
    { name: t.nav.resources, href: '/resources', icon: Layers },
    { name: t.nav.about, href: '/about', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-slate-950/85 backdrop-blur-2xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand with Futuristic Tech Glow */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all bg-slate-900 border border-cyan-500/40">
            <img
              src="/RoboAtlas/images/logo.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo.png';
              }}
              alt="RoboAtlas Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold tracking-tight text-slate-100 flex items-center gap-2">
              RoboAtlas
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-semibold">
                v0.6.0
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline -mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Interactive Robotics Laboratory</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/15 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border border-transparent font-medium'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher, Dark/Light Mode Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Futuristic Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-cyan-500/30 text-[11px] font-mono text-cyan-400 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="tracking-wide">60 FPS SIM</span>
          </div>

          {/* Language Switcher Button */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono font-bold text-slate-200 transition-all shadow-sm"
            title={`Switch to ${locale === 'en' ? 'Bahasa Indonesia' : 'English'}`}
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center h-9 w-9 rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm"
            title={theme === 'dark' ? t.theme.light : t.theme.dark}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-xl text-slate-300 bg-slate-900 border border-slate-700 hover:border-cyan-500/50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyan-500/20 bg-slate-950 px-4 py-3 space-y-2 shadow-2xl animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-mono ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
