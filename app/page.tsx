'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Navigation,
  Cpu,
  MapPin,
  Layers,
  RotateCcw,
  Users,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Bot,
  GraduationCap,
  Hammer,
  Target,
  Zap,
  Activity,
  Box,
  Sliders,
  Flame,
} from 'lucide-react';
import { HeroCanvasPreview } from '@/components/simulation/HeroCanvasPreview';
import { DOMAINS, ALGORITHMS } from '@/lib/navigation/curriculum';
import { LESSON_REGISTRY } from '@/lib/curriculum/registry';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
};

export default function HomePage() {
  const { locale, t } = useLanguage();
  const isId = locale === 'id';

  const interactiveSimulators = [
    {
      titleEn: '2D & 3D Coordinate Frames',
      titleId: 'Kerangka Koordinat 2D & 3D',
      descEn: 'Homogeneous transforms SE(2) & SO(3) Euler rotations',
      descId: 'Transformasi homogen SE(2) & rotasi Euler SO(3)',
      href: '/learn/fundamentals',
      icon: '📐',
      tag: 'Level 1–2',
    },
    {
      titleEn: 'Differential Unicycle Kinematics',
      titleId: 'Kinematika Unicycle Roda Diferensial',
      descEn: 'Instantaneous Center of Curvature (ICC) & non-holonomic motion',
      descId: 'Pusat kurvatur seketika (ICC) & gerak non-holonomik',
      href: '/learn/fundamentals',
      icon: '🚗',
      tag: 'Level 3',
    },
    {
      titleEn: 'A* & Dijkstra Grid Planning',
      titleId: 'Perencanaan Grid A* & Dijkstra',
      descEn: 'Heuristic search with custom obstacle wall drawing',
      descId: 'Pencarian heuristik dengan menggambar dinding rintangan',
      href: '/learn/planning',
      icon: '🗺️',
      tag: 'Level 6',
    },
    {
      titleEn: 'Pure Pursuit & Stanley Control',
      titleId: 'Kendali Pure Pursuit & Stanley',
      descEn: 'Geometric lookahead vs non-linear cross-track steering',
      descId: 'Kemudi geometris lookahead vs umpan balik lateral non-linier',
      href: '/learn/control',
      icon: '🎯',
      tag: 'Level 7',
    },
    {
      titleEn: 'Monte Carlo Localization (MCL)',
      titleId: 'Lokalisasi Monte Carlo (MCL)',
      descEn: 'Particle filter state estimation & beacon triangulation',
      descId: 'Estimasi status filter partikel & triangulasi suar',
      href: '/learn/localization',
      icon: '📍',
      tag: 'Level 8',
    },
    {
      titleEn: '360° LiDAR Occupancy Mapping',
      titleId: 'Pemetaan Okupansi LiDAR 360°',
      descEn: 'Raycasting with Log-Odds Bayesian probability updates',
      descId: 'Raycasting dengan pembaruan probabilitas log-odds',
      href: '/learn/mapping',
      icon: '📡',
      tag: 'Level 9',
    },
    {
      titleEn: 'Iterative Closest Point (ICP) SLAM',
      titleId: 'SLAM Iterative Closest Point (ICP)',
      descEn: 'Step-by-step point cloud scan registration with SVD',
      descId: 'Registrasi pindaian awan titik dengan rotasi SVD',
      href: '/learn/slam',
      icon: '🧩',
      tag: 'Level 10',
    },
    {
      titleEn: 'Swarm Graph Laplacian Consensus',
      titleId: 'Konsensus Graf Laplacian Kawanan',
      descEn: 'Decentralized multi-agent formations & Reynolds flocking',
      descId: 'Formasi multi-agent terdesentralisasi & kawanan Boids',
      href: '/learn/multi-agent',
      icon: '👥',
      tag: 'Level 18',
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 dark:border-slate-800/80">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>{isId ? 'RoboAtlas • Kurikulum Master Robotika v2.0' : 'RoboAtlas • Master Robotics Platform v2.0'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.12]">
                {isId ? 'Belajar Robotika Dari' : 'Learn Robotics From'}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-500">
                  {isId ? 'Fondasi Hingga Aplikasi.' : 'Principles to Robots.'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal font-sans">
                {isId
                  ? 'Buku teks robotika interaktif berbasis MDX & laboratorium algoritma 60 FPS di browser. Pahami matematika, logika, dan kinematika, lalu terapkan pada Lengan Robotik, AMR Beroda, Drone UAV, Kapal Selam ROV, hingga Robot Berkaki.'
                  : 'An interactive MDX-native robotics textbook and in-browser 60 FPS algorithm laboratory. Understand the foundational mathematics, logic, and kinematics, then apply universal concepts across Robotic Arms, Mobile AMRs, UAV Drones, Marine ROVs, and Legged Robots.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
                <Link
                  href="/learn"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  {isId ? 'Jelajahi Kurikulum 21 Level' : 'Explore 21-Level Curriculum'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/robots"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-mono text-sm transition-all hover:border-cyan-500/40 shadow-sm"
                >
                  <Bot className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  {isId ? 'Pusat Platform Robot' : 'Robot Platforms'}
                </Link>
              </div>

              {/* Feature Highlights */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> 21 Technical Levels
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> 100% Client-Side Engine
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Cross-Platform Embodiments
                </span>
              </div>
            </div>

            {/* Right Hero Simulator Canvas */}
            <div className="lg:col-span-6 w-full">
              <HeroCanvasPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Start Learning" Persona Pathways */}
      <section className="w-full py-16 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
              {isId ? 'Pilih Titik Awal Belajar' : 'Choose Your Starting Path'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-1.5 font-mono">
              {isId ? 'Di Mana Sebaiknya Anda Memulai?' : 'Where Should You Start?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
              {isId
                ? 'RoboAtlas dirancang untuk pemula dari nol, mahasiswa rekayasa, hingga praktisi algoritma otonom.'
                : 'RoboAtlas accommodates complete beginners, engineering students, and practicing autonomous systems engineers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Beginner */}
            <div className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border border-slate-200 dark:border-slate-800">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {isId ? 'Pemula (Level 0)' : 'Beginner (Level 0)'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {isId
                    ? 'Mulai dari nol: pemahaman siklus Sense-Plan-Act, anatomi perangkat keras/lunak, dan klasifikasi robot.'
                    : 'Start from zero: Sense-Plan-Act loops, hardware/software anatomy, and robot morphology classifications.'}
                </p>
              </div>
              <Link
                href="/learn/fundamentals/intro-to-robotics"
                className="mt-5 inline-flex items-center justify-between text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 pt-3 border-t border-slate-200 dark:border-slate-800"
              >
                <span>{isId ? 'Mulai Pelajaran' : 'Start Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Fundamentals */}
            <div className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border border-slate-200 dark:border-slate-800">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {isId ? 'Fondasi Matematika' : 'Math & Kinematics'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {isId
                    ? 'Pelajari vektor, transformasi SE(2)/SE(3), sudut Euler, matriks rotasi, dan kinematika kecepatan.'
                    : 'Master vectors, homogeneous transforms SE(2)/SE(3), Euler angles, rotation matrices, and velocity kinematics.'}
                </p>
              </div>
              <Link
                href="/learn/mathematics/mathematical-foundations"
                className="mt-5 inline-flex items-center justify-between text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 pt-3 border-t border-slate-200 dark:border-slate-800"
              >
                <span>{isId ? 'Buka Fondasi' : 'Explore Math'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Algorithms */}
            <div className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border border-slate-200 dark:border-slate-800">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {isId ? 'Algoritma Otonom' : 'Algorithms Lab'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {isId
                    ? 'Eksplorasi A* path planning, filter partikel MCL, pemetaan okupansi log-odds, dan scan matching ICP.'
                    : 'Explore A* path planning, Monte Carlo particle filters, log-odds occupancy mapping, and ICP scan matching.'}
                </p>
              </div>
              <Link
                href="/algorithms"
                className="mt-5 inline-flex items-center justify-between text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 pt-3 border-t border-slate-200 dark:border-slate-800"
              >
                <span>{isId ? 'Laboratorium' : 'Explore Algorithms'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4: Robot Platforms */}
            <div className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border border-slate-200 dark:border-slate-800">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {isId ? 'Platform Robotik' : 'Robot Platforms'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {isId
                    ? 'Lihat implementasi langsung pada Lengan Robot, AMR Beroda, Drone Udara, ROV Bawah Air, dan Quadruped.'
                    : 'See how theory is embodied across Robotic Arms, Wheeled AMRs, Aerial Drones, Marine ROVs, and Quadrupeds.'}
                </p>
              </div>
              <Link
                href="/robots"
                className="mt-5 inline-flex items-center justify-between text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 pt-3 border-t border-slate-200 dark:border-slate-800"
              >
                <span>{isId ? 'Lihat Platform' : 'View Platforms'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Canonical MDX Lessons Grid */}
      <section className="w-full py-16 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isId ? 'Modul Pembelajaran Kanonikal' : 'Canonical MDX Lessons'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-1 font-mono">
                {isId ? 'Pelajaran Inti Robotika & Matematika' : 'Featured Core Robotics Lessons'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-sans">
                {isId
                  ? 'Setiap materi dirancang dengan formulasi KaTeX, simulasi interaktif 60 FPS, dan uji pemahaman konsep.'
                  : 'Every lesson features rigorous KaTeX mathematics, interactive simulations, and instant concept checks.'}
              </p>
            </div>

            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-semibold"
            >
              <span>{isId ? 'Buka Semua 21 Level' : 'View All 21 Levels'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LESSON_REGISTRY.slice(0, 6).map((lesson) => (
              <Link
                key={lesson.id}
                href={`/learn/${lesson.domain}/${lesson.slug}`}
                className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border border-slate-200 dark:border-slate-800 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
                      Level {lesson.level}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      ~{lesson.estimatedMinutes} {isId ? 'menit' : 'mins'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {isId ? lesson.titleId : lesson.titleEn}
                  </h3>

                  <div className="flex items-center gap-1 flex-wrap pt-1">
                    {lesson.platforms.map((p) => (
                      <span
                        key={p}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 uppercase"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  <span>{isId ? 'Buka Pelajaran' : 'Launch Lesson'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Simulation Sandbox Strip */}
      <section className="w-full py-16 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
              {isId ? 'Laboratorium Interaktif 60 FPS' : 'In-Browser Interactive Labs'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-1.5 font-mono">
              {isId ? 'Eksplorasi Simulator & Algoritma Langsung' : 'Direct Simulator & Sandbox Exploration'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
              {isId
                ? 'Semua simulator berjalan 100% di browser tanpa ketergantungan server. Atur parameter secara interaktif.'
                : 'All simulators run 100% client-side with zero server latency. Adjust parameters and inspect state telemetry in real-time.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {interactiveSimulators.map((sim) => (
              <Link
                key={sim.titleEn}
                href={sim.href}
                className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border border-slate-200 dark:border-slate-800 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{sim.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                      {sim.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {isId ? sim.titleId : sim.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    {isId ? sim.descId : sim.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                  <span>{isId ? 'Buka Simulator' : 'Launch Sandbox'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Explore Robot Platforms Showcase */}
      <section className="w-full py-16 border-b border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
                {isId ? 'Prinsip Satu Konsep, Banyak Penerapan' : 'Cross-Platform Embodiments'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-1 font-mono">
                {isId ? 'Eksplorasi Berbagai Platform Robot' : 'Explore Across Robot Platforms'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-sans">
                {isId
                  ? 'Fondasi matematika dan kontrol yang sama diterapkan ke berbagai bentuk fisik robot.'
                  : 'Universal mathematics and control principles applied across distinct robot morphologies.'}
              </p>
            </div>

            <Link
              href="/robots"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-semibold"
            >
              <span>{isId ? 'Buka Semua Platform' : 'View All Platforms'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <Link
              href="/robots"
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col items-center text-center space-y-2 border border-slate-200 dark:border-slate-800 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">🦾</span>
              <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                {isId ? 'Lengan Robotik' : 'Robotic Arm'}
              </span>
              <span className="text-[10px] text-slate-500">6-DOF Manipulator</span>
            </Link>

            <Link
              href="/robots"
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col items-center text-center space-y-2 border border-slate-200 dark:border-slate-800 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">🚗</span>
              <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                {isId ? 'Robot Mobile AMR' : 'Mobile AMR / AGV'}
              </span>
              <span className="text-[10px] text-slate-500">Wheeled Autonomy</span>
            </Link>

            <Link
              href="/robots"
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col items-center text-center space-y-2 border border-slate-200 dark:border-slate-800 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">🚁</span>
              <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                {isId ? 'Drone Udara UAV' : 'Aerial Drone UAV'}
              </span>
              <span className="text-[10px] text-slate-500">Flight Dynamics</span>
            </Link>

            <Link
              href="/robots"
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col items-center text-center space-y-2 border border-slate-200 dark:border-slate-800 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">🌊</span>
              <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                {isId ? 'Robot Bawah Air ROV' : 'Marine ROV / AUV'}
              </span>
              <span className="text-[10px] text-slate-500">Subsea Control</span>
            </Link>

            <Link
              href="/robots"
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col items-center text-center space-y-2 border border-slate-200 dark:border-slate-800 group col-span-2 sm:col-span-1"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">🦿</span>
              <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                {isId ? 'Robot Berkaki' : 'Legged Quadruped'}
              </span>
              <span className="text-[10px] text-slate-500">Dynamic Balance</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Master Curriculum 21-Level Roadmap Banner */}
      <section className="w-full py-16 bg-gradient-to-b from-transparent to-cyan-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
              Master Robotics Curriculum v2.0
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Jalur Belajar Lengkap 21 Level' : 'Complete 21-Level Robotics Journey'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {isId
                ? 'Dari orientasi dasar siber-fisik, vektor, geometri, kinematika, kendali, sensor, hingga otonomi spasial SLAM dan swarm multi-agent.'
                : 'From cyber-physical orientation, vectors, transforms, kinematics, and control to spatial SLAM and swarm intelligence.'}
            </p>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-bold text-sm shadow-xl shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isId ? 'Buka Peta Kurikulum 21 Level' : 'Launch 21-Level Curriculum Map'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
