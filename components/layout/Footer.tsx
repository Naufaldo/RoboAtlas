'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Cpu, Compass, Sparkles, BookOpen, Layers, Users, Activity } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Footer() {
  const { t, locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <footer className="w-full border-t border-cyan-500/20 bg-slate-950 text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 shadow-md shadow-cyan-500/10">
                <img
                  src="/RoboAtlas/images/logo.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logo.png';
                  }}
                  alt="RoboAtlas Emblem"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-mono text-base font-bold text-slate-100 flex items-center gap-2">
                RoboAtlas
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Universal Robotics
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {isId
                ? 'Platform laboratorium pembelajaran robotika otonom dari prinsip dasar matematika, simulasi interaktif 60 FPS di peramban, hingga penerapan perangkat keras nyata.'
                : 'Interactive robotics learning laboratory grounded in mathematical rigor, 60 FPS in-browser simulation, and multi-embodiment hardware modeling.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-cyan-500/80">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{isId ? 'Enjin Simulasi Waktu-Nyata Aktif' : 'Autonomous Simulation Engine Online'}</span>
              <span>•</span>
              <span>v0.4.0</span>
            </div>
          </div>

          {/* Col 2: Navigation Hubs */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-3.5 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isId ? 'Navigasi Kurikulum' : 'Curriculum Hubs'}</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/learn" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-slate-500" />
                  <span>{isId ? '21-Level Kurikulum' : '21-Level Curriculum'}</span>
                </Link>
              </li>
              <li>
                <Link href="/algorithms" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-slate-500" />
                  <span>{isId ? 'Algoritma Otonom' : 'Autonomous Algorithms'}</span>
                </Link>
              </li>
              <li>
                <Link href="/robots" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Bot className="w-3 h-3 text-slate-500" />
                  <span>{isId ? 'Platform Robotik' : 'Robot Platforms'}</span>
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-slate-500" />
                  <span>{isId ? 'Laboratorium Interaktif' : 'Interactive Labs'}</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-slate-500" />
                  <span>{isId ? 'Proyek Rekayasa' : 'Engineering Projects'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Standards & Resources */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-3.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isId ? 'Literatur & Standar' : 'Literature & Standards'}</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/resources" className="hover:text-cyan-400 transition-colors">
                  {isId ? 'Perpustakaan Buku Teks' : 'Textbook Bibliography'}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-cyan-400 transition-colors">
                  {isId ? 'Daftar Rumus KaTeX' : 'KaTeX Formula Reference'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  {isId ? 'Standar Pedagogi RoboAtlas' : 'Pedagogical Standards'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  {isId ? 'Lisensi Sumber Terbuka MIT' : 'MIT Open Source License'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} RoboAtlas.</span>
            <span>{isId ? 'Semua Hak Cipta Dilindungi.' : 'All rights reserved.'}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-cyan-500/70">Mathematics • Simulation • Autonomous Systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
