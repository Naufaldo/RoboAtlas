'use client';

import React, { useState } from 'react';
import { KinematicsSimulator } from '@/components/simulation/KinematicsSimulator';
import { TransformSandbox } from '@/components/simulation/TransformSandbox';
import { SpatialRotation3D } from '@/components/simulation/SpatialRotation3D';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Compass,
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  Code2,
  Box,
  Navigation,
  Activity,
  Zap,
  TrendingUp,
  Sliders,
  Grid,
} from 'lucide-react';

export default function FundamentalsPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [activeChapter, setActiveChapter] = useState<number>(1);

  const chapters = [
    { id: 1, title: isId ? '1. Pengantar Robotika' : '1. Introduction to Robotics', icon: BookOpen },
    { id: 2, title: isId ? '2. Geometri 2D' : '2. 2D Geometry', icon: Compass },
    { id: 3, title: isId ? '3. Geometri 3D' : '3. 3D Geometry', icon: Box },
    { id: 4, title: isId ? '4. Jalur & Trajektori' : '4. Path & Trajectory', icon: Navigation },
    { id: 5, title: isId ? '5. Kinematika Kecepatan 2D' : '5. Velocity Kinematics 2D', icon: Cpu },
    { id: 6, title: isId ? '6. Kinematika Kecepatan 3D' : '6. Velocity Kinematics 3D', icon: Activity },
    { id: 7, title: isId ? '7. Aljabar Matriks' : '7. Matrix Foundations', icon: Grid },
    { id: 8, title: isId ? '8. Pemodelan Matematika' : '8. Math Modeling', icon: Layers },
    { id: 9, title: isId ? '9. Dinamika Robot' : '9. Robot Dynamics', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Course Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Compass className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Fondasi Robotika • 9 Bab Komprehensif' : 'Robotics Foundations • 9 Comprehensive Chapters'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Dasar-Dasar Robotika, Matematika & Pemodelan' : 'Robotics Fundamentals, Mathematics & Modeling'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          {isId
            ? 'Kurikulum fundamental berstandar akademik (disadur dari buku Elements of Robotics & literatur klasik) yang mencakup 9 pilar penting: Pengantar, Geometri 2D/3D, Trajektori, Kinematika Kecepatan, Matriks, Pemodelan Status, hingga Dinamika Robot.'
            : 'Academic foundation curriculum (synthesizing Elements of Robotics & classical literature) covering 9 core pillars: Introduction, 2D/3D Geometry, Trajectories, Velocity Kinematics, Matrices, Mathematical Modeling, and Robot Dynamics.'}
        </p>

        {/* 9 Chapters Pill Bar */}
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs font-mono">
          {chapters.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CHAPTER 1: INTRODUCTION TO ROBOTICS */}
      {activeChapter === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>{isId ? 'Bab 1: Apa itu Robotika Otonom & Klasifikasinya' : 'Chapter 1: What is Autonomous Robotics?'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {isId
                ? 'Robot otonom adalah mesin siber-fisik yang mampu mengambil keputusan mandiri melalui interaksi lingkungan fisik menggunakan sensor dan aktuator. Berbeda dari otomasi biasa (seperti mesin cuci), robot beroperasi dalam lingkungan tak pasti dan terus beradaptasi.'
                : 'An autonomous robot is a cyber-physical system capable of independent decision-making in physical environments via sensors and actuators. Unlike simple automata (e.g. dishwashers), robots operate in uncertain, dynamic environments.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-cyan-600 dark:text-cyan-400 block text-sm">1. SENSE (Sensor)</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {isId ? 'Sensor Proprioseptif (status internal: enkoder roda, IMU) & Eksteroseptif (lingkungan luar: LiDAR, Kamera, Sonar).' : 'Proprioceptive sensors (internal: encoders, IMU) & Exteroceptive sensors (environment: LiDAR, Camera, Sonar).'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-emerald-600 dark:text-emerald-400 block text-sm">2. PLAN (Otak/Komputasi)</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {isId ? 'Memperbarui estimasi status (State Estimation), membangun peta (Mapping), dan merencanakan jalur bebas tabrakan (Path Planning).' : 'Compute state estimation, construct spatial maps, and generate collision-free paths.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-amber-600 dark:text-amber-400 block text-sm">3. ACT (Aktuator)</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {isId ? 'Motor DC, servo kemudi, aktuator roda diferensial untuk menggerakkan robot mengikuti rencana.' : 'DC motors, steering servos, and differential-drive actuators executing control commands.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-2">
              <strong className="text-slate-900 dark:text-slate-100 block font-bold">
                {isId ? 'Klasifikasi Robot:' : 'Classification of Robots:'}
              </strong>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                <li><strong>Fixed Manipulators:</strong> {isId ? 'Lengan robot industri terfiksasi di lantai dengan posisi presisi tinggi.' : 'Industrial robotic arms fixed to stable bases with high repeatable accuracy.'}</li>
                <li><strong>Mobile Terrestrial:</strong> {isId ? 'Robot beroda (differential, omnidirectional) dan berkaki (quadruped, humanoid).' : 'Wheeled robots (differential, omnidirectional) and legged robots.'}</li>
                <li><strong>Aerial & Aquatic:</strong> {isId ? 'Drone quadrotor, AUV bawah laut dengan 6 derajat kebebasan (6-DOF).' : 'Aerial drones and underwater autonomous vehicles with 6 degrees of freedom (6-DOF).'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 2: 2D GEOMETRY */}
      {activeChapter === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{isId ? 'Laboratorium Geometri 2D & Transformasi Koordinat' : '2D Geometry & Coordinate Transform Laboratory'}</span>
              </h2>
            </div>
            <TransformSandbox />
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono text-cyan-600 dark:text-cyan-400">
              {isId ? 'Fondasi Matematis Geometri Planar 2D' : 'Mathematical 2D Planar Geometry'}
            </h3>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Koordinat Kartesian vs Polar' : 'Cartesian vs Polar Coordinates'}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId ? 'Sebuah titik p dalam bidang 2D dapat dinyatakan dalam Kartesian (x, y) atau Polar (r, φ):' : 'A point p in 2D space can be expressed in Cartesian (x, y) or Polar (r, φ) coordinates:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="x = r \cos\phi, \quad y = r \sin\phi \iff r = \sqrt{x^2 + y^2}, \quad \phi = \text{atan2}(y, x)"
                  title={isId ? 'Konversi Kartesian & Polar' : 'Cartesian-Polar Conversion'}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. {isId ? 'Rotasi Vektor dalam SO(2)' : 'Vector Rotation in SO(2)'}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId ? 'Rotasi vektor sebesar sudut θ menghasilkan matriks rotasi ortogonal 2x2 R(θ):' : 'Rotating a vector by angle θ produces the 2x2 special orthogonal rotation matrix R(θ):'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="\begin{bmatrix} x' \\ y' \end{bmatrix} = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix}, \quad R^T R = I_2, \quad \det(R) = +1"
                  title={isId ? 'Matriks Rotasi 2D SO(2)' : '2D Rotation Matrix in SO(2)'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 3: 3D GEOMETRY */}
      {activeChapter === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{isId ? 'Simulator Rotasi 3D SO(3) & Sudut Euler' : '3D Spatial Rotation & Euler Angles Sandbox'}</span>
              </h2>
            </div>
            <SpatialRotation3D />
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono text-cyan-600 dark:text-cyan-400">
              {isId ? 'Rotasi Spasial 3D & Sudut Euler (Roll, Pitch, Yaw)' : '3D Spatial Rotations & Euler Angles'}
            </h3>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Aturan Tangan Kanan & Rotasi Tiga Sumbu' : 'Right-Hand Rule & Principal Axis Rotations'}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId ? 'Rotasi elementer pada sumbu X (Roll φ), Y (Pitch θ), dan Z (Yaw ψ):' : 'Elementary rotation matrices around principal X, Y, and Z axes:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="R_z(\psi) = \begin{bmatrix} \cos\psi & -\sin\psi & 0 \\ \sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad R_y(\theta) = \begin{bmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{bmatrix}, \quad R_x(\phi) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & -\sin\phi \\ 0 & \sin\phi & \cos\phi \end{bmatrix}"
                  title={isId ? 'Matriks Rotasi Sumbu Utama 3D' : '3D Principal Rotation Matrices'}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. {isId ? 'Representasi Kuaternion (Bebas Gimbal Lock)' : 'Quaternion Representation (Gimbal Lock Free)'}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId ? 'Kuaternion unit q = (w, x, y, z) mengeliminasi singularitas Gimbal Lock pada sudut Euler:' : 'Unit quaternions q = (w, x, y, z) avoid Euler angle Gimbal Lock singularities:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="\mathbf{q} = \cos\frac{\theta}{2} + \mathbf{u} \sin\frac{\theta}{2} = [w, x, y, z]^T, \quad \|\mathbf{q}\| = 1"
                  title={isId ? 'Kuaternion Rotasi Spasial' : 'Unit Rotation Quaternion'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 4: PATH & TRAJECTORY */}
      {activeChapter === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <Navigation className="w-4 h-4" />
              <span>{isId ? 'Bab 4: Perbedaan Jalur (Path) vs Trajektori (Trajectory)' : 'Chapter 4: Path vs Trajectory Generation'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <strong className="text-cyan-600 dark:text-cyan-400 block text-sm">Path / Jalur Geometris s(sigma)</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {isId ? 'Sekuens titik geometris dalam ruang konfigurasi tanpa parameter waktu t. Hanya memuat informasi posisi (x, y).' : 'Pure geometric sequence of points in configuration space without time parameterization.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <strong className="text-emerald-600 dark:text-emerald-400 block text-sm">Trajectory / Trajektori x(t)</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  {isId ? 'Jalur geometris yang telah diberi profil waktu, kecepatan v(t), percepatan a(t), dan jerk.' : 'Time-parameterized path specifying velocity v(t), acceleration a(t), and heading at each instant.'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Interpolasi Spline Polinomial Orde 5 (Quintic Spline)' : 'Quintic Polynomial Trajectory Interpolation'}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId ? 'Menghasilkan transisi percepatan dan kecepatan yang mulus (C2-continuous):' : 'Guarantees smooth, continuous velocity and acceleration profiles (C2-continuous):'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="s(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 + a_4 t^4 + a_5 t^5"
                  title={isId ? 'Persamaan Polinomial Kuintik Trajektori' : 'Quintic Polynomial Equation'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 5: VELOCITY KINEMATICS 2D */}
      {activeChapter === 5 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{isId ? 'Simulator Kinematika Kecepatan 2D Roda Diferensial' : '2D Differential-Drive Velocity Kinematics Simulator'}</span>
              </h2>
            </div>
            <KinematicsSimulator />
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono text-cyan-600 dark:text-cyan-400">
              {isId ? 'Kinematika Maju & Invers Robot Roda Diferensial' : 'Differential-Drive Forward & Inverse Kinematics'}
            </h3>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Model Kecepatan Ruang Status Planar' : 'Planar State-Space Velocity Model'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="\begin{bmatrix} \dot{x} \\ \dot{y} \\ \dot{\theta} \end{bmatrix} = \begin{bmatrix} \cos\theta & 0 \\ \sin\theta & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} v \\ \omega \end{bmatrix} = \begin{bmatrix} \frac{R}{2}\cos\theta & \frac{R}{2}\cos\theta \\ \frac{R}{2}\sin\theta & \frac{R}{2}\sin\theta \\ \frac{R}{L} & -\frac{R}{L} \end{bmatrix} \begin{bmatrix} \omega_R \\ \omega_L \end{bmatrix}"
                  title={isId ? 'Matriks Jacobian Kinematika Diferensial' : 'Differential-Drive Kinematic Jacobian'}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. {isId ? 'Kendala Non-Holonomik (No-Slip Pfaffian)' : 'Pfaffian Non-Holonomic Constraint'}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId ? 'Robot tidak dapat bergerak menyamping secara instan:' : 'Robot cannot move laterally without turning:'}
              </p>
              <div className="mt-3">
                <MathBlock
                  latex="-\dot{x}\sin\theta + \dot{y}\cos\theta = 0"
                  title={isId ? 'Kendala Pfaffian Lateral' : 'Lateral Pfaffian Constraint'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 6: VELOCITY KINEMATICS 3D */}
      {activeChapter === 6 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <Activity className="w-4 h-4" />
              <span>{isId ? 'Bab 6: Kinematika Kecepatan Spasial 3D & Matriks Jacobian' : 'Chapter 6: 3D Velocity Kinematics & Geometric Jacobian'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isId
                ? 'Dalam ruang 3D, kecepatan ujung manipulator (end-effector) atau badan robot tersusun atas kecepatan linier v in R^3 dan kecepatan sudut omega in R^3 (Twist V = [v, omega]^T in se(3)).'
                : 'In 3D space, spatial velocity (Twist V = [v, omega]^T in se(3)) relates joint velocities to end-effector spatial motion via the Geometric Jacobian Matrix J(q).'}
            </p>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Persamaan Kecepatan Jacobian Manipulator' : 'Manipulator Jacobian Velocity Equation'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="\mathbf{V}_e = \begin{bmatrix} \mathbf{v}_e \\ \boldsymbol{\omega}_e \end{bmatrix} = J(\mathbf{q})\, \dot{\mathbf{q}} = \begin{bmatrix} J_v(\mathbf{q}) \\ J_\omega(\mathbf{q}) \end{bmatrix} \dot{\mathbf{q}}"
                  title={isId ? 'Transformasi Kecepatan Joint ke Kecepatan Ujung' : 'Geometric Jacobian Mapping'}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. {isId ? 'Matriks Skew-Symmetric Rotasi Kecepatan Sudut' : 'Skew-Symmetric Cross Product Matrix'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="[\boldsymbol{\omega}]_\times = \begin{bmatrix} 0 & -\omega_z & \omega_y \\ \omega_z & 0 & -\omega_x \\ -\omega_y & \omega_x & 0 \end{bmatrix}, \quad \dot{R} = [\boldsymbol{\omega}]_\times R"
                  title={isId ? 'Turunan Matriks Rotasi terhadap Waktu' : 'Time Derivative of Rotation Matrix'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 7: MATRIX FOUNDATIONS */}
      {activeChapter === 7 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <Grid className="w-4 h-4" />
              <span>{isId ? 'Bab 7: Aljabar Matriks & Transformasi Homogen' : 'Chapter 7: Matrix Foundations for Robotics'}</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Matriks Transformasi Homogen 4x4 SE(3)' : '4x4 Homogeneous Transformation Matrix in SE(3)'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="T = \begin{bmatrix} R & \mathbf{p} \\ \mathbf{0}_{1\times 3} & 1 \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} & x \\ r_{21} & r_{22} & r_{23} & y \\ r_{31} & r_{32} & r_{33} & z \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad T^{-1} = \begin{bmatrix} R^T & -R^T \mathbf{p} \\ \mathbf{0} & 1 \end{bmatrix}"
                  title={isId ? 'Matriks SE(3) & Invers Kaku' : 'SE(3) Transformation & Rigid Inverse'}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. {isId ? 'Matriks Kovarians Sensor & Fusi Ketidakpastian' : 'Covariance Matrix in Sensor Estimation'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="\boldsymbol{\Sigma} = \begin{bmatrix} \sigma_x^2 & \sigma_{xy} \\ \sigma_{yx} & \sigma_y^2 \end{bmatrix}, \quad \text{cov}(x, y) = \frac{1}{N-1}\sum_{i=1}^N (x_i - \bar{x})(y_i - \bar{y})"
                  title={isId ? 'Matriks Kovarians 2D' : '2D Covariance Matrix'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 8: MATH MODELING */}
      {activeChapter === 8 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <Layers className="w-4 h-4" />
              <span>{isId ? 'Bab 8: Pemodelan Status (State-Space) & Model Pengukuran' : 'Chapter 8: State-Space & Sensor Measurement Modeling'}</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Model Sistem Dinamik Non-Linear Diskrit' : 'Discrete Non-Linear System Modeling'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="\mathbf{x}_{k} = f(\mathbf{x}_{k-1}, \mathbf{u}_{k}) + \mathbf{w}_k, \quad \mathbf{z}_k = h(\mathbf{x}_k) + \mathbf{v}_k"
                  title={isId ? 'Persamaan Status & Pengukuran Sensor' : 'State Transition & Observation Model'}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. {isId ? 'Finite State Machine (FSM) Robotika Reaktif' : 'Finite State Machine (FSM) in Reactive Robotics'}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isId ? 'Model otomata berhingga yang mengatur transisi status robot (Search -> Avoid -> Follow) berdasarkan masukan event sensor.' : 'Finite automaton governing robot mode transitions (Search -> Avoid -> Follow) triggered by sensor events.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 9: DYNAMICS */}
      {activeChapter === 9 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <TrendingUp className="w-4 h-4" />
              <span>{isId ? 'Bab 9: Dinamika Robot, Gaya & Torsi' : 'Chapter 9: Robot Dynamics, Forces & Torques'}</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. {isId ? 'Persamaan Gerak Newton-Euler & Inersia' : 'Newton-Euler Equations of Motion'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="\mathbf{F} = m \mathbf{a} = m \ddot{\mathbf{p}}, \quad \boldsymbol{\tau} = I \boldsymbol{\alpha} + \boldsymbol{\omega} \times (I \boldsymbol{\omega})"
                  title={isId ? 'Persamaan Translasi & Rotasi Newton-Euler' : 'Newton-Euler Force & Torque Equations'}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. {isId ? 'Formulasi Dinamika Euler-Lagrange Manipulator' : 'Euler-Lagrange Manipulator Dynamics'}</h4>
              <div className="mt-3">
                <MathBlock
                  latex="M(\mathbf{q})\ddot{\mathbf{q}} + C(\mathbf{q}, \dot{\mathbf{q}})\dot{\mathbf{q}} + \mathbf{g}(\mathbf{q}) = \boldsymbol{\tau} - \mathbf{f}_{friction}"
                  title={isId ? 'Persamaan Dinamika Standar Manipulator' : 'Standard Manipulator Dynamic Equation'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
