'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Compass,
  Sparkles,
  Bot,
  Cpu,
  BookOpen,
  Github,
  CheckCircle2,
  Heart,
  Award,
  Layers,
  ArrowRight,
  Shield,
  Code2,
} from 'lucide-react';

export default function AboutPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const principles = [
    {
      icon: '📐',
      titleEn: 'First-Principles Mathematical Grounding',
      titleId: 'Fondasi Matematika Dari Prinsip Pertama',
      descEn:
        'No black boxes. Every algorithm is derived step-by-step with rigorous KaTeX equations, dimensional units, and clear physical intuition.',
      descId:
        'Tanpa kotak hitam (*black box*). Setiap persamaan diturunkan secara bertahap dengan KaTeX, satuan dimensi yang jelas, dan intuisi fisik nyata.',
    },
    {
      icon: '⚡',
      titleEn: '100% In-Browser 60 FPS Simulators',
      titleId: 'Simulator 60 FPS 100% di Browser',
      descEn:
        'Zero backend latency. All spatial transformations, raycasting, and numerical integrations run locally in deterministic client-side TypeScript.',
      descId:
        'Nol latensi server. Seluruh transformasi spasial, raycasting laser, dan integrasi numerik berjalan lokal dalam TypeScript deterministik.',
    },
    {
      icon: '🤖',
      titleEn: 'Universal Cross-Embodiment Robotics',
      titleId: 'Robotika Lintas-Platform Universal',
      descEn:
        'Robotics is not just self-driving cars. Universal kinematics and feedback principles apply across Arms, AMRs, UAVs, Subsea ROVs, and Quadrupeds.',
      descId:
        'Robotika bukan hanya mobil otonom. Prinsip kinematika dan kendali yang sama berlaku pada Lengan Robot, AMR, Drone UAV, ROV, hingga Quadruped.',
    },
    {
      icon: '🌐',
      titleEn: '100% Bilingual Parity (EN & ID)',
      titleId: '100% Paritas Dwibahasa (EN & ID)',
      descEn:
        'Equal quality, simultaneous translation across English and Bahasa Indonesia for all 21 levels and interactive laboratories.',
      descId:
        'Kualitas setara dan translasi simultan antara Bahasa Indonesia dan Bahasa Inggris untuk seluruh 21 level dan laboratorium interaktif.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isId ? 'Tentang Platform RoboAtlas' : 'About the RoboAtlas Project'}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
          {isId ? 'Mendemistifikasi Robotika dari Fondasi Hingga Nyata' : 'Demystifying Robotics from First Principles to Embodiment'}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          {isId
            ? 'RoboAtlas adalah buku teks robotika interaktif sumber terbuka (*open-source*) dan laboratorium simulasi 60 FPS yang menjembatani jurang antara rumus teoritis dan implementasi komputasi nyata.'
            : 'RoboAtlas is an open-access interactive robotics textbook and 60 FPS simulation laboratory bridging the gap between textbook equations and running physical robotic systems.'}
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">
          {isId ? 'Filosofi Robotika Umum RoboAtlas' : 'The RoboAtlas General Robotics Paradigm'}
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          {isId
            ? 'Banyak sumber belajar membatasi robotika hanya pada robot beroda dua atau satu kerangka kerja khusus. Di RoboAtlas, kami memandang robotika sebagai satu disiplin ilmu universal terpadu:'
            : 'Many learning resources narrow robotics down to wheeled rovers or single specialized frameworks. At RoboAtlas, we treat robotics as a unified universal discipline:'}
        </p>

        {/* Pipeline Chart */}
        <div className="p-4 rounded-2xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 flex justify-center py-6 text-center">
          <code>
            Robotics Fundamentals → Math → Geometry → Kinematics → Dynamics → Sensors → Logic & Algorithms → Control → Estimation → Planning → Robot Platforms → Advanced
          </code>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
            {isId ? 'Nilai Inti' : 'Core Principles'}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-1">
            {isId ? 'Standar Rekayasa & Pedagogi Kami' : 'Our Engineering & Pedagogical Standard'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((p) => (
            <div
              key={p.titleEn}
              className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3 shadow-md"
            >
              <span className="text-3xl p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 inline-block">
                {p.icon}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                {isId ? p.titleId : p.titleEn}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isId ? p.descId : p.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Source & Community */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-blue-600/10 border border-cyan-500/30 text-center space-y-5">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
          {isId ? 'Proyek Sumber Terbuka & Lisensi MIT' : 'Open Source & Academic Integrity'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
          {isId
            ? 'RoboAtlas didistribusikan secara bebas di bawah Lisensi MIT. Seluruh materi orisinal dan kode simulator terbuka untuk kontribusi komunitas di GitHub.'
            : 'RoboAtlas is distributed under the permissive MIT License. All original pedagogical lessons and simulator code are open for global community contribution.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/learn"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/20 hover:bg-cyan-400 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>{isId ? 'Mulai Belajar di Kurikulum' : 'Explore Curriculum'}</span>
          </Link>

          <Link
            href="/resources"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono transition-all shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isId ? 'Daftar Pustaka & Literatur' : 'Literature & References'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
