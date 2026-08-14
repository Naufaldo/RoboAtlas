'use client';

import React, { useState } from 'react';
import { KinematicsSimulator } from '@/components/simulation/KinematicsSimulator';
import { TransformSandbox } from '@/components/simulation/TransformSandbox';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Compass,
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  ArrowRight,
  Activity,
  Zap,
  Globe,
  Radio,
  Sliders,
} from 'lucide-react';

export default function FundamentalsPage() {
  const { locale, t } = useLanguage();
  const isId = locale === 'id';

  const [activeTab, setActiveTab] = useState<'overview' | 'math' | 'modeling' | 'algorithms' | 'code'>('overview');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Compass className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Fondasi Robotika • Kursus Utama' : 'Robotics Foundations • Core Course'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Dasar-Dasar Robotika, Matematika & Pemodelan' : 'Robotics Fundamentals, Mathematics & Modeling'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          {isId
            ? 'Panduan komprehensif mulai dari definisi robotika otonom, matematika dasar (aljabar linear, kalkulus, probabilitas), pemodelan kinematika diferensial, hingga taksonomi algoritma modern.'
            : 'Comprehensive guide covering what autonomous robotics is, essential mathematics (linear algebra, calculus, probability), unicycle/bicycle kinematic modeling, and modern algorithm taxonomy.'}
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs font-mono">
          {[
            { id: 'overview', label: isId ? '1. Apa itu Robotika?' : '1. What is Robotics?', icon: BookOpen },
            { id: 'math', label: isId ? '2. Matematika Robotika' : '2. Essential Math', icon: Compass },
            { id: 'modeling', label: isId ? '3. Pemodelan Kinematika' : '3. Kinematic Modeling', icon: Cpu },
            { id: 'algorithms', label: isId ? '4. Taksonomi Algoritma' : '4. Core Algorithms', icon: Layers },
            { id: 'code', label: isId ? '5. Engine TypeScript' : '5. TypeScript Code', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: WHAT IS ROBOTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Sense-Plan-Act Paradigm Card */}
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <Sparkles className="w-4 h-4" />
              <span>{isId ? 'Definisi & Paradigma Robotika Otonom' : 'Autonomous Robotics & The Sense-Plan-Act Paradigm'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {isId
                ? 'Robot otonom adalah sistem siber-fisik (cyber-physical system) yang mampu merasakan lingkungan fisiknya, memproses informasi untuk mengambil keputusan mandiri, dan menggerakkan aktuator untuk mencapai tujuan tanpa intervensi manusia terus-menerus.'
                : 'An autonomous robot is a cyber-physical system capable of sensing its physical environment, processing information to make independent decisions, and actuating motors to achieve objectives without continuous human intervention.'}
            </p>

            {/* 3 Pillars: Sense -> Plan -> Act */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                  <Radio className="w-4 h-4" />
                  <span>1. SENSE (Persepsi)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isId
                    ? 'Membaca dunia melalui sensor: Enkoder roda, LiDAR 2D/3D, Kamera, IMU, Sonar, dan GPS.'
                    : 'Observe the environment via sensors: Wheel encoders, LiDAR, RGB-D Cameras, IMUs, Sonar, and GPS.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>2. PLAN (Perencanaan)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isId
                    ? 'Mengolah status robot, membangun peta (Mapping), memperkirakan posisi (Localization), dan mencari jalur optimal bebas tabrakan (Path Planning).'
                    : 'Process state estimation, construct spatial maps, estimate pose (EKF/MCL), and compute collision-free optimal paths (A*/RRT).'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>3. ACT (Aksi & Kontrol)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isId
                    ? 'Mengirim sinyal kendali kecepatan/torsi motor (Pure Pursuit, Stanley, PID) untuk menggerakkan roda mengikuti trajektori terencana.'
                    : 'Execute motor speed/torque commands (Pure Pursuit, Stanley, PID) to steer wheels along the planned trajectory.'}
                </p>
              </div>
            </div>
          </div>

          {/* State Space vs Action Space */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {isId ? 'Ruang Status (State Space) & Ruang Aksi (Action Space)' : 'State Space & Action Space Formulations'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <strong className="text-cyan-600 dark:text-cyan-400 block mb-1">
                  {isId ? 'Ruang Status Robot Planar (x in X):' : 'Planar Robot State (x in X):'}
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  x = [x, y, θ, v, ω]^T in SE(2) x R^2
                </p>
                <span className="text-[11px] text-slate-500 block mt-2">
                  {isId ? 'Posisi (x, y), orientasi heading (θ), kecepatan linier (v), dan kecepatan sudut (ω).' : 'Position (x, y), heading orientation (θ), linear velocity (v), and angular velocity (ω).'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">
                  {isId ? 'Ruang Aksi / Kontrol (u in U):' : 'Control Action Space (u in U):'}
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  u = [v_L, v_R]^T {isId ? 'atau' : 'or'} [v, δ]^T
                </p>
                <span className="text-[11px] text-slate-500 block mt-2">
                  {isId ? 'Perintah kecepatan roda kiri/kanan atau kombinasi kecepatan maju dan sudut kemudi.' : 'Left/right wheel velocities or forward velocity and steering angle command.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ESSENTIAL MATHEMATICS */}
      {activeTab === 'math' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Transform Sandbox */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{isId ? 'Eksperimen Interaktif: Transformasi Matriks Homogen SE(2)' : 'Interactive Experiment: SE(2) Homogeneous Transforms'}</span>
              </h2>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                Live Frame Matrix Inspector
              </span>
            </div>
            <TransformSandbox />
          </div>

          {/* Mathematical Formulations Deep-Dive */}
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>{isId ? 'Fondasi Matematika Inti dalam Robotika' : 'Core Mathematical Formulations for Robotics'}</span>
            </div>

            {/* 1. SE(2) Homogeneous Transform */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                1. {isId ? 'Grup Euclidean Khusus SE(2) & Matriks Transformasi Homogen' : 'Special Euclidean Group SE(2) & Homogeneous Matrices'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId
                  ? 'Dalam ruang 2D, posisi dan orientasi frame robot {R} terhadap frame dunia {W} direpresentasikan oleh matriks homogen 3x3 $T_R^W$:'
                  : 'In 2D space, the pose of robot frame {R} relative to world frame {W} is encoded by the 3x3 homogeneous transformation matrix $T_R^W$:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="T_R^W = \begin{bmatrix} \cos\theta & -\sin\theta & t_x \\ \sin\theta & \cos\theta & t_y \\ 0 & 0 & 1 \end{bmatrix}, \quad \mathbf{p}^W = T_R^W \mathbf{p}^R"
                  title={isId ? 'Matriks Transformasi Homogen 2D' : '2D Homogeneous Transformation Matrix'}
                />
              </div>
            </div>

            {/* 2. Angle Wrapping */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                2. {isId ? 'Trigonometri & Pembungkus Sudut (Angle Wrapping)' : 'Trigonometry & Angle Wrapping'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId
                  ? 'Karena sudut heading bersifat periodik kelipatan $2\pi$, selisih sudut harus selalu dibungkus ke rentang $[-\pi, \pi)$ untuk menghindari lompatan diskontinu saat kendali putar:'
                  : 'Since angular orientations are periodic modulo $2\pi$, angle differences must be wrapped to $[-\pi, \pi)$ to prevent discontinuous jumps in steering controllers:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="\text{wrapToPi}(\theta) = (\theta + \pi \pmod{2\pi}) - \pi"
                  title={isId ? 'Fungsi Pembungkus Sudut Modulo 2π' : 'Angle Normalization Function'}
                />
              </div>
            </div>

            {/* 3. Numerical Integration */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                3. {isId ? 'Kalkulus & Integrasi Numerik Trajektori' : 'Calculus & Numerical Trajectory Integration'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId
                  ? 'Untuk menghitung posisi robot berikutnya dari turunan kecepatan $\dot{\mathbf{x}} = f(\mathbf{x}, \mathbf{u})$, digunakan metode integrasi numerik seperti Euler atau Runge-Kutta Orde 4 (RK4):'
                  : 'To compute the next robot pose from velocity derivatives $\dot{\mathbf{x}} = f(\mathbf{x}, \mathbf{u})$, numerical integrators such as Forward Euler or 4th-Order Runge-Kutta (RK4) are applied:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="\mathbf{x}_{t+\Delta t} = \mathbf{x}_t + \int_t^{t+\Delta t} f(\mathbf{x}(\tau), \mathbf{u}(\tau))\, d\tau \approx \mathbf{x}_t + \begin{bmatrix} v \cos\theta \\ v \sin\theta \\ \omega \end{bmatrix} \Delta t"
                  title={isId ? 'Integrasi Kontinu State Kinematika' : 'Continuous Kinematic State Integration'}
                />
              </div>
            </div>

            {/* 4. Probability & Gaussian */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                4. {isId ? 'Probabilitas & Teorema Bayes dalam Robotika' : 'Probability & Bayes Theorem in Robotics'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId
                  ? 'Sensor selalu memiliki noise acak yang dimodelkan dengan Distribusi Gaussian Multivariat $\mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})$. Fusi sensor memperbarui keyakinan menggunakan Teorema Bayes:'
                  : 'Sensors exhibit stochastic noise modeled by Multivariate Gaussian Distributions $\mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})$. Sensor fusion updates belief states via Bayes Theorem:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="p(x \mid z) = \frac{p(z \mid x)\, p(x)}{p(z)} \propto \mathcal{N}(z \mid h(x), Q) \cdot \mathcal{N}(x \mid \bar{x}, \Sigma)"
                  title={isId ? 'Pembaruan Teorema Bayes untuk Fusi Sensor' : 'Bayes Filter Recursive State Update'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KINEMATIC MODELING */}
      {activeTab === 'modeling' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Simulator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{isId ? 'Simulator Kinematika Diferensial (Unicycle Model)' : 'Differential-Drive Unicycle Simulator'}</span>
              </h2>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                60 FPS Live Kinematics
              </span>
            </div>
            <KinematicsSimulator />
          </div>

          {/* Theory on Models */}
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <Cpu className="w-4 h-4" />
              <span>{isId ? 'Pemodelan Kinematika Robot Bergerak' : 'Mobile Robot Kinematic Formulations'}</span>
            </div>

            {/* Differential Drive */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                1. {isId ? 'Model Roda Diferensial (Differential-Drive)' : 'Differential-Drive Wheel Model'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId
                  ? 'Robot roda diferensial memiliki dua roda independen pada sumbu yang sama dengan jarak $L$. Kecepatan linier $v$ dan sudut $\omega$ diturunkan langsung dari kecepatan roda kiri $v_L$ dan kanan $v_R$:'
                  : 'A differential-drive robot has two independently driven wheels on a common axle separated by distance $L$. Linear speed $v$ and angular speed $\omega$ map directly to left wheel velocity $v_L$ and right wheel velocity $v_R$:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="v = \frac{v_R + v_L}{2}, \quad \omega = \frac{v_R - v_L}{L}, \quad R_{ICC} = \frac{L}{2}\left(\frac{v_R + v_L}{v_R - v_L}\right)"
                  title={isId ? 'Pemetaan Kecepatan Roda & Titik Pusat Putar ICC' : 'Wheel Velocity Mapping & ICC Radius'}
                />
              </div>
            </div>

            {/* Ackermann Bicycle */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                2. {isId ? 'Model Kemudi Ackermann (Bicycle Model)' : 'Ackermann Steering (Bicycle Model)'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId
                  ? 'Untuk kendaraan mobil otonom dengan sudut kemudi depan $\delta$ dan jarak sumbu roda $L$:'
                  : 'For autonomous cars with front steering angle $\delta$ and wheelbase $L$:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="\dot{x} = v \cos\theta, \quad \dot{y} = v \sin\theta, \quad \dot{\theta} = \frac{v}{L} \tan\delta"
                  title={isId ? 'Kinematika Model Sepeda Ackermann' : 'Ackermann Bicycle Kinematics'}
                />
              </div>
            </div>

            {/* Non-Holonomic Constraint */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                3. {isId ? 'Kendala Non-Holonomik (Non-Holonomic Constraint)' : 'Non-Holonomic Constraints'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId
                  ? 'Roda standar tidak dapat meluncur ke samping secara instan tanpa berputar (kondisi tanpa selip). Ini menghasilkan kendala Pfaffian:'
                  : 'Standard wheels cannot slide sideways instantaneously without rotating (no-slip condition). This imposes the Pfaffian kinematic constraint:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="\dot{x} \sin\theta - \dot{y} \cos\theta = 0 \iff v_{lateral} = 0"
                  title={isId ? 'Persamaan Kendala Tanpa Selip Samping' : 'Lateral No-Slip Non-Holonomic Constraint'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ALGORITHM TAXONOMY */}
      {activeTab === 'algorithms' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <Layers className="w-4 h-4" />
              <span>{isId ? 'Taksonomi Algoritma Robotika Otonom' : 'Autonomous Robotics Algorithm Taxonomy'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isId
                ? 'Seluruh algoritma dalam RoboAtlas dikelompokkan ke dalam 6 domain fungsional yang saling terhubung:'
                : 'All algorithms in RoboAtlas are categorized into 6 interconnected functional robotics domains:'}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                    <th className="py-2.5 px-3">{isId ? 'Kategori Domain' : 'Domain Category'}</th>
                    <th className="py-2.5 px-3">{isId ? 'Algoritma Utama' : 'Core Algorithms'}</th>
                    <th className="py-2.5 px-3">{isId ? 'Input Data' : 'Input Data'}</th>
                    <th className="py-2.5 px-3">{isId ? 'Output Hasil' : 'Output Result'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="py-3 px-3 font-bold text-cyan-600 dark:text-cyan-400">Path Planning</td>
                    <td className="py-3 px-3">A* Search, Dijkstra, RRT, RRT*, APF</td>
                    <td className="py-3 px-3">Peta Grid, Start, Goal</td>
                    <td className="py-3 px-3">Trajektori Bebas Tabrakan</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-cyan-600 dark:text-cyan-400">Localization</td>
                    <td className="py-3 px-3">Particle Filter (MCL), EKF, UKF</td>
                    <td className="py-3 px-3">Odometri, Sensor LiDAR/Beacon</td>
                    <td className="py-3 px-3">Estimasi Pose p(x_t | z_1:t)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-cyan-600 dark:text-cyan-400">Motion Control</td>
                    <td className="py-3 px-3">Pure Pursuit, Stanley Controller, MPC</td>
                    <td className="py-3 px-3">Jalur Referensi, Pose Saat Ini</td>
                    <td className="py-3 px-3">Perintah Kemudi $\delta, v$</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-cyan-600 dark:text-cyan-400">Mapping</td>
                    <td className="py-3 px-3">Log-Odds Occupancy Grid, OctoMap, SDF</td>
                    <td className="py-3 px-3">LiDAR Point Cloud, Pose Robot</td>
                    <td className="py-3 px-3">Peta Probabilitas Spasial</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-cyan-600 dark:text-cyan-400">SLAM</td>
                    <td className="py-3 px-3">Iterative Closest Point (ICP), Graph-SLAM</td>
                    <td className="py-3 px-3">Laser Scans Berurutan</td>
                    <td className="py-3 px-3">Peta Global + Estimasi Lintasan</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-cyan-600 dark:text-cyan-400">Multi-Agent</td>
                    <td className="py-3 px-3">Laplacian Consensus, Boids Flocking</td>
                    <td className="py-3 px-3">Status Tetangga Komunikasi</td>
                    <td className="py-3 px-3">Kecepatan Koordinasi Kawanan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TYPESCRIPT CODE */}
      {activeTab === 'code' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold">
                <Code2 className="w-4 h-4" />
                <span>lib/math/transforms.ts & kinematics.ts</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Pure TypeScript • 100% Typed</span>
            </div>

            <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed">
{`/**
 * SE(2) Homogeneous Transformation and Kinematics Library
 */

export interface Pose2D {
  x: number;
  y: number;
  theta: number; // in radians [-pi, pi)
}

export interface Transform2D {
  r11: number; r12: number; tx: number;
  r21: number; r22: number; ty: number;
}

/** Wraps an angle to [-PI, PI) */
export function wrapToPi(angle: number): number {
  return ((angle + Math.PI) % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI) - Math.PI;
}

/** Construct 3x3 Homogeneous Transformation Matrix for SE(2) pose */
export function createSE2Transform(pose: Pose2D): Transform2D {
  const cosT = Math.cos(pose.theta);
  const sinT = Math.sin(pose.theta);
  return {
    r11: cosT,  r12: -sinT, tx: pose.x,
    r21: sinT,  r22: cosT,  ty: pose.y,
  };
}

/** Transform local robot point p_R to global world frame p_W */
export function transformPoint(t: Transform2D, pLocal: { x: number; y: number }): { x: number; y: number } {
  return {
    x: t.r11 * pLocal.x + t.r12 * pLocal.y + t.tx,
    y: t.r21 * pLocal.x + t.r22 * pLocal.y + t.ty,
  };
}

/** Forward Kinematics Integration for Differential-Drive Unicycle */
export function stepDifferentialDrive(
  pose: Pose2D,
  vL: number,
  vR: number,
  wheelbase: number,
  dt: number
): Pose2D {
  const v = (vR + vL) / 2;
  const omega = (vR - vL) / wheelbase;

  if (Math.abs(omega) < 1e-6) {
    return {
      x: pose.x + v * Math.cos(pose.theta) * dt,
      y: pose.y + v * Math.sin(pose.theta) * dt,
      theta: pose.theta,
    };
  }

  const dTheta = omega * dt;
  const iccR = v / omega;

  return {
    x: pose.x - iccR * Math.sin(pose.theta) + iccR * Math.sin(pose.theta + dTheta),
    y: pose.y + iccR * Math.cos(pose.theta) - iccR * Math.cos(pose.theta + dTheta),
    theta: wrapToPi(pose.theta + dTheta),
  };
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
