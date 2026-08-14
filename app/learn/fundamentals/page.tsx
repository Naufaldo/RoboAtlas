'use client';

import React, { useState } from 'react';
import { KinematicsSimulator } from '@/components/simulation/KinematicsSimulator';
import { TransformSandbox } from '@/components/simulation/TransformSandbox';
import { SpatialRotation3D } from '@/components/simulation/SpatialRotation3D';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
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
          <span>{isId ? 'Fondasi Robotika • Standar Penjelasan Matematis' : 'Robotics Foundations • Pedagogical Math Standard'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Dasar-Dasar Robotika, Matematika & Pemodelan' : 'Robotics Fundamentals, Mathematics & Modeling'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          {isId
            ? 'Setiap persamaan dilengkapi dengan arti intuitif, alasan fisik (Why?), penurunan rumus bertahap, satuan dimensional, contoh angka, dan kalkulator interaktif.'
            : 'Every core formula is structured with intuitive meaning, physical reasoning (Why?), step-by-step derivation, dimensional units, worked numerical examples, and live calculators.'}
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

      {/* Learner-First Lesson Orientation Card */}
      <LessonOrientation
        domain={isId ? 'Fondasi Robotika' : 'Robotics Foundations'}
        lessonTitle={chapters[activeChapter - 1].title}
        estimatedMinutes={15}
        learningObjectives={
          activeChapter === 1
            ? [
                isId ? 'Memahami paradigma Sense-Plan-Act pada robot otonom' : 'Understand Sense-Plan-Act autonomous loops',
                isId ? 'Membedakan sensor proprioseptif vs eksteroseptif' : 'Distinguish proprioceptive vs exteroceptive sensors',
                isId ? 'Mengenal taksonomi robot industri, bergerak, dan drone' : 'Classify fixed arms, mobile robots, and aerial drones',
              ]
            : activeChapter === 2
            ? [
                isId ? 'Mengubah koordinat kartesian ke polar dan sebaliknya' : 'Convert Cartesian to Polar coordinate representations',
                isId ? 'Mengoperasikan rotasi matriks SO(2) dan translasi' : 'Apply SO(2) planar rotations and translations',
                isId ? 'Menyusun matriks transformasi homogen 3x3 SE(2)' : 'Assemble 3x3 SE(2) homogeneous transformation matrices',
              ]
            : activeChapter === 3
            ? [
                isId ? 'Memahami aturan tangan kanan dalam ruang 3 dimensi' : 'Understand right-hand rule spatial coordinate systems',
                isId ? 'Menghitung matriks rotasi ZYX Euler (Roll, Pitch, Yaw)' : 'Calculate 3D ZYX Euler angle rotation matrices',
                isId ? 'Mengenal keunggulan representasi kuaternion unit' : 'Recognize unit quaternion representation benefits',
              ]
            : activeChapter === 5
            ? [
                isId ? 'Menurunkan rumus kecepatan linier v dan kecepatan sudut omega' : 'Derive forward unicycle linear and angular velocities',
                isId ? 'Mencari pusat putar seketika (Instantaneous Center of Curvature)' : 'Determine Instantaneous Center of Curvature (ICC)',
                isId ? 'Memahami kendala non-holonomik roda tidak selip' : 'Explain no-slip non-holonomic kinematic constraints',
              ]
            : [
                isId ? 'Memahami formulasi matematis dan arti fisik setiap variabel' : 'Understand mathematical formulation and physical variable meaning',
                isId ? 'Mengeksplorasi kalkulator interaktif parameter langsung' : 'Explore live parameter calculation and intermediate steps',
                isId ? 'Mengetahui aplikasi praktis pada robot nyata di industri' : 'Learn practical robotics industry engineering applications',
              ]
        }
        whyItMatters={
          activeChapter === 1
            ? isId
              ? 'Fondasi memahami bagaimana robot berinteraksi dengan dunia fisik secara cerdas dan aman.'
              : 'The core conceptual foundation of how autonomous agents sense and react to the physical world.'
            : activeChapter === 2 || activeChapter === 3
            ? isId
              ? 'Tanpa transformasi koordinat, robot tidak bisa mengetahui posisi rintangan yang dilihat sensornya di dunia nyata.'
              : 'Without spatial coordinate transformations, a robot cannot map sensor readings to real-world positions.'
            : activeChapter === 5
            ? isId
              ? 'Kinematika roda diferensial adalah algoritma dasar yang menggerakkan hampir seluruh mobile robot beroda.'
              : 'Differential-drive kinematics is the foundational model powering TurtleBots, AGVs, and vacuum rovers.'
            : isId
            ? 'Menjembatani teori matematika dengan algoritma komputasi nyata pada robot otonom.'
            : 'Bridges theoretical mathematics with robust physical robot software implementations.'
        }
      />

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
                ? 'Robot otonom adalah sistem siber-fisik yang mampu mengambil keputusan mandiri melalui interaksi lingkungan fisik menggunakan sensor dan aktuator. Berbeda dari otomasi biasa (seperti mesin cuci), robot beroperasi dalam lingkungan tak pasti dan terus beradaptasi.'
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
                {isId ? 'Klasifikasi Robot (Berdasarkan Elements of Robotics):' : 'Classification of Robots (from Elements of Robotics):'}
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

          <FormulaExplainer
            id="formula-se2-transform"
            title={isId ? 'Transformasi Matriks Homogen 2D SE(2)' : '2D SE(2) Homogeneous Transformation Matrix'}
            latex="\mathbf{p}^W = T_R^W \mathbf{p}^R = \begin{bmatrix} \cos\theta & -\sin\theta & t_x \\ \sin\theta & \cos\theta & t_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x^R \\ y^R \\ 1 \end{bmatrix}"
            meaning={
              isId
                ? 'Mentransformasikan koordinat sebuah titik (misal hasil sensor LiDAR) dari kerangka lokal robot {R} ke kerangka koordinat global dunia {W}.'
                : 'Transforms the coordinates of a point (e.g. LiDAR obstacle detection) from the local robot frame {R} into the global world reference frame {W}.'
            }
            whyExplanation={
              isId
                ? 'Dalam koordinat Kartesian biasa, rotasi dan translasi adalah operasi terpisah (p_W = R*p_R + t). Dengan menambahkan koordinat homogen 1 di baris ketiga, rotasi dan translasi dapat digabungkan menjadi SATU operasi perkalian matriks 3x3 yang sangat efisien dan mudah dikomposisikan secara berantai.'
                : 'In standard Cartesian coordinates, rotation and translation are separate operations (p_W = R*p_R + t). By appending a homogeneous 1, rotation and translation combine into a SINGLE 3x3 matrix multiplication, enabling clean geometric composition.'
            }
            variables={[
              { symbol: 'p^W', name: 'World Point', unit: 'm', meaning: isId ? 'Posisi titik dalam sistem koordinat global dunia' : 'Point coordinates in global world reference frame' },
              { symbol: 'p^R', name: 'Robot Local Point', unit: 'm', meaning: isId ? 'Posisi titik relatif terhadap sensor di badan robot' : 'Point coordinates relative to sensor on robot body' },
              { symbol: 'theta', name: 'Robot Heading (θ)', unit: 'rad', meaning: isId ? 'Sudut orientasi hadap robot terhadap sumbu X dunia' : 'Robot angular heading orientation relative to world X-axis' },
              { symbol: 't_x, t_y', name: 'Translation Vector', unit: 'm', meaning: isId ? 'Posisi pusat robot (x, y) dalam koordinat dunia' : 'Robot center position (x, y) in world coordinates' },
            ]}
            derivationSteps={[
              {
                step: isId ? 'Rotasi Vektor dalam Sumbu Robot' : 'Rotate vector into aligned frame',
                latex: 'x\' = x^R \cos\\theta - y^R \sin\\theta, \\quad y\' = x^R \sin\\theta + y^R \cos\\theta',
                explanation: isId ? 'Menerapkan proyeksi trigonometri dari sudut hadap theta.' : 'Applying trigonometric projections for heading angle theta.',
              },
              {
                step: isId ? 'Translasi ke Posisi Asal Robot di Dunia' : 'Translate by robot origin',
                latex: 'x^W = x\' + t_x, \\quad y^W = y\' + t_y',
                explanation: isId ? 'Menambahkan offset posisi pusat robot (t_x, t_y).' : 'Adding robot origin position offsets (t_x, t_y).',
              },
              {
                step: isId ? 'Penyusunan Matriks Blok Homogen 3x3' : 'Assembly of 3x3 Homogeneous Matrix',
                latex: 'T_R^W = \\begin{bmatrix} R(\\theta) & \\mathbf{t} \\\\ \\mathbf{0}^T & 1 \\end{bmatrix}',
                explanation: isId ? 'Menggabungkan sub-matriks rotasi 2x2 dan vektor translasi 2x1.' : 'Combining 2x2 rotation sub-matrix and 2x1 translation vector.',
              },
            ]}
            numericalExample={{
              inputs: { 'x^R': 2.0, 'y^R': 1.0, 't_x': 5.0, 't_y': 3.0, 'theta (rad)': 0.5 },
              calculationSteps: [
                'cos(0.5) = 0.8776, sin(0.5) = 0.4794',
                'x\' = 2.0 * 0.8776 - 1.0 * 0.4794 = 1.2758',
                'y\' = 2.0 * 0.4794 + 1.0 * 0.8776 = 1.8364',
                'x^W = 1.2758 + 5.0 = 6.2758 m',
                'y^W = 1.8364 + 3.0 = 4.8364 m',
              ],
              result: 'p^W = [6.28, 4.84, 1]^T m',
            }}
            roboticsApplication={
              isId
                ? 'Digunakan pada sensor LiDAR dan Kamera untuk memproyeksikan rintangan yang terdeteksi di depan robot ke peta okupansi global secara instan.'
                : 'Applied in LiDAR and Camera sensor pipelines to project obstacles detected in robot frame onto the global occupancy map.'
            }
            calculator={{
              params: [
                { key: 'xR', label: 'Local X (x^R)', unit: 'm', default: 2.0, min: -5.0, max: 5.0, step: 0.1 },
                { key: 'yR', label: 'Local Y (y^R)', unit: 'm', default: 1.0, min: -5.0, max: 5.0, step: 0.1 },
                { key: 'tx', label: 'Robot Pose X (t_x)', unit: 'm', default: 4.0, min: 0.0, max: 10.0, step: 0.5 },
                { key: 'ty', label: 'Robot Pose Y (t_y)', unit: 'm', default: 2.0, min: 0.0, max: 10.0, step: 0.5 },
                { key: 'theta', label: 'Robot Heading (θ)', unit: 'rad', default: 0.78, min: -3.14, max: 3.14, step: 0.1 },
              ],
              calculate: (inputs) => {
                const { xR, yR, tx, ty, theta } = inputs;
                const cosT = Math.cos(theta);
                const sinT = Math.sin(theta);
                const xw = tx + xR * cosT - yR * sinT;
                const yw = ty + xR * sinT + yR * cosT;
                return {
                  steps: [
                    `R(θ) = [[${cosT.toFixed(3)}, ${(-sinT).toFixed(3)}], [${sinT.toFixed(3)}, ${cosT.toFixed(3)}]]`,
                    `x^W = ${tx} + (${xR}*${cosT.toFixed(3)} - ${yR}*${sinT.toFixed(3)}) = ${xw.toFixed(2)} m`,
                    `y^W = ${ty} + (${xR}*${sinT.toFixed(3)} + ${yR}*${cosT.toFixed(3)}) = ${yw.toFixed(2)} m`,
                  ],
                  result: `p^W = [${xw.toFixed(2)}, ${yw.toFixed(2)}]^T m`,
                };
              },
            }}
          />
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

          <FormulaExplainer
            id="formula-euler-3d"
            title={isId ? 'Komposisi Matriks Rotasi 3D Sudut Euler ZYX' : '3D ZYX Euler Angle Rotation Matrix'}
            latex="R_{ZYX}(\psi, \theta, \phi) = R_z(\psi) R_y(\theta) R_x(\phi) = \begin{bmatrix} c_\psi c_\theta & c_\psi s_\theta s_\phi - s_\psi c_\phi & c_\psi s_\theta c_\phi + s_\psi s_\phi \\ s_\psi c_\theta & s_\psi s_\theta s_\phi + c_\psi c_\phi & s_\psi s_\theta c_\phi - c_\psi s_\phi \\ -s_\theta & c_\theta s_\phi & c_\theta c_\phi \end{bmatrix}"
            meaning={
              isId
                ? 'Merepresentasikan orientasi orientasi benda kaku 3D melalui urutan 3 rotasi berurutan: Yaw (ψ) sumbu Z, Pitch (θ) sumbu Y, dan Roll (φ) sumbu X.'
                : 'Encodes 3D rigid body spatial orientation through sequential rotations: Yaw (ψ) around Z, Pitch (θ) around Y, and Roll (φ) around X.'
            }
            whyExplanation={
              isId
                ? 'Rotasi dalam ruang 3D bersifat NON-KOMUTATIF (urutan rotasi menentukan orientasi akhir: R_x*R_y != R_y*R_x). Perkalian matriks berurutan dari kanan ke kiri menjamin transformasi sumbu bodi lokal yang akurat.'
                : '3D rotations are fundamentally NON-COMMUTATIVE (order matters: R_x*R_y != R_y*R_x). Successive matrix multiplication from right to left maps local body rotations correctly.'
            }
            variables={[
              { symbol: 'psi (ψ)', name: 'Yaw Angle (Heading)', unit: 'rad', meaning: isId ? 'Sudut putar robot mengelilingi sumbu vertikal Z' : 'Rotation angle around vertical Z-axis' },
              { symbol: 'theta (θ)', name: 'Pitch Angle (Elevation)', unit: 'rad', meaning: isId ? 'Sudut kemiringan hidung robot mengelilingi sumbu lateral Y' : 'Tilt angle around lateral Y-axis' },
              { symbol: 'phi (φ)', name: 'Roll Angle (Bank)', unit: 'rad', meaning: isId ? 'Sudut guling robot mengelilingi sumbu longitudinal X' : 'Bank angle around longitudinal X-axis' },
            ]}
            roboticsApplication={
              isId
                ? 'Digunakan pada sistem navigasi inersial drone (UAV), robot humanoid, dan sensor IMU 6-DOF untuk melacak sikap orientasi (attitude).'
                : 'Essential for UAV drone flight controllers, humanoid balancing, and 6-DOF IMU sensor attitude tracking.'
            }
          />
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

            <FormulaExplainer
              id="formula-quintic-spline"
              title={isId ? 'Spline Polinomial Kuintik Orde 5 (Trajectory Smoothing)' : 'Quintic Polynomial Trajectory Spline'}
              latex="s(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 + a_4 t^4 + a_5 t^5, \quad \dot{s}(0)=v_0, \, \ddot{s}(0)=a_0, \, \dot{s}(T)=v_f, \, \ddot{s}(T)=a_f"
              meaning={
                isId
                  ? 'Menghubungkan dua waypoint dengan kurva kontinu orde-2 (C2) sehingga percepatan dan kecepatan berawal dan berakhir mulus tanpa sentakan (jerk).'
                  : 'Connects two boundary waypoints with C2 continuity ensuring zero initial/final jerk and smooth acceleration.'
              }
              whyExplanation={
                isId
                  ? 'Polinomial orde 3 (kubik) hanya bisa memenuhi batas posisi dan kecepatan. Agar robot tidak mengalami hentakan torsi motor tiba-tiba, dibutuhkan batas percepatan awal/akhir (6 kondisi batas) yang mewajibkan polinomial berderajat 5 (kuintik).'
                  : 'Cubic splines only constrain position and velocity. To eliminate sudden motor torque spikes, acceleration boundary conditions require 6 degrees of freedom, mandating a 5th-order (quintic) polynomial.'
              }
              variables={[
                { symbol: 's(t)', name: 'Position Profile', unit: 'm', meaning: isId ? 'Posisi lintasan pada waktu t' : 'Displacement along trajectory at time t' },
                { symbol: 'v_0, v_f', name: 'Boundary Velocities', unit: 'm/s', meaning: isId ? 'Kecepatan awal dan akhir segmen' : 'Initial and terminal velocities' },
                { symbol: 'a_0, a_f', name: 'Boundary Accelerations', unit: 'm/s²', meaning: isId ? 'Percepatan awal dan akhir segmen' : 'Initial and terminal accelerations' },
                { symbol: 'T', name: 'Segment Duration', unit: 's', meaning: isId ? 'Total waktu perjalanan antar waypoint' : 'Total duration between waypoints' },
              ]}
              roboticsApplication={
                isId
                  ? 'Digunakan pada perencana gerak lengan robot industri dan mobil otonom agar penumpang atau beban tidak terguncang.'
                  : 'Applied in industrial robotic arm trajectory generators and autonomous vehicle passenger comfort motion planners.'
              }
            />
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

          <FormulaExplainer
            id="formula-diff-drive"
            title={isId ? 'Kinematika Maju Robot Roda Diferensial (Unicycle)' : 'Differential-Drive Forward Kinematics'}
            latex="v = \frac{v_R + v_L}{2}, \quad \omega = \frac{v_R - v_L}{L}, \quad R_{ICC} = \frac{L}{2} \left(\frac{v_R + v_L}{v_R - v_L}\right)"
            meaning={
              isId
                ? 'Menghitung kecepatan linier maju v dan kecepatan sudut putar omega dari kecepatan putar roda kanan (v_R) dan roda kiri (v_L).'
                : 'Computes forward linear velocity v and rotational angular velocity omega from right and left wheel speeds (v_R, v_L).'
            }
            whyExplanation={
              isId
                ? 'Ketika kedua roda berputar dengan kecepatan sama (v_R = v_L), robot bergerak lurus sempurna (v = v_R, omega = 0). Ketika kedua roda berputar berlawanan arah (v_R = -v_L), robot berputar di tempat (v = 0, omega = 2*v_R/L). Perbedaan kecepatan kedua roda menghasilkan momen rotasi mengelilingi pusat putar ICC.'
                : 'When both wheels spin equally (v_R = v_L), motion is purely forward (v = v_R, omega = 0). When wheels spin in opposite directions (v_R = -v_L), the robot spins in place (v = 0, omega = 2*v_R/L). Wheel speed differences create rotation around the ICC.'
            }
            variables={[
              { symbol: 'v', name: 'Linear Velocity', unit: 'm/s', meaning: isId ? 'Kecepatan maju titik tengah sumbu robot' : 'Forward speed of robot centerpoint' },
              { symbol: 'omega (ω)', name: 'Angular Velocity', unit: 'rad/s', meaning: isId ? 'Laju rotasi sudut hadap robot' : 'Yaw rotation rate of robot chassis' },
              { symbol: 'v_R', name: 'Right Wheel Velocity', unit: 'm/s', meaning: isId ? 'Kecepatan linier kontak roda kanan' : 'Tangential linear speed of right wheel' },
              { symbol: 'v_L', name: 'Left Wheel Velocity', unit: 'm/s', meaning: isId ? 'Kecepatan linier kontak roda kiri' : 'Tangential linear speed of left wheel' },
              { symbol: 'L', name: 'Wheelbase', unit: 'm', meaning: isId ? 'Jarak pemisah antara roda kiri dan kanan' : 'Lateral distance between wheel contact points' },
              { symbol: 'R_ICC', name: 'Turning Radius', unit: 'm', meaning: isId ? 'Jari-jari lintasan lingkaran ke pusat putar' : 'Radius from robot center to Instantaneous Center of Curvature' },
            ]}
            derivationSteps={[
              {
                step: isId ? 'Kecepatan Roda sebagai Fungsi Rotasi Bersama' : 'Wheel tangential speeds',
                latex: 'v_R = \\omega (R_{ICC} + L/2), \\quad v_L = \\omega (R_{ICC} - L/2)',
                explanation: isId ? 'Setiap roda menempuh radius lingkaran yang berbeda relatif ke titik pusat putar ICC.' : 'Each wheel traverses a circular arc with distinct radius from the ICC.',
              },
              {
                step: isId ? 'Penjumlahan Kecepatan untuk Mendapatkan v' : 'Summing equations for linear velocity',
                latex: 'v_R + v_L = \\omega (2 R_{ICC}) = 2 v \\implies v = \\frac{v_R + v_L}{2}',
                explanation: isId ? 'Rata-rata kecepatan menghasilkan laju translasi titik tengah robot.' : 'Averaging wheel speeds yields centerpoint linear velocity.',
              },
              {
                step: isId ? 'Pengurangan Kecepatan untuk Mendapatkan omega' : 'Subtracting equations for angular velocity',
                latex: 'v_R - v_L = \\omega L \\implies \\omega = \\frac{v_R - v_L}{L}',
                explanation: isId ? 'Selisih kecepatan dibagi lebar sumbu roda menghasilkan kecepatan sudut.' : 'Speed differential divided by baseline wheelbase yields angular rate.',
              },
            ]}
            numericalExample={{
              inputs: { 'v_R': 1.5, 'v_L': 0.5, 'L': 0.4 },
              calculationSteps: [
                'v = (1.5 + 0.5) / 2 = 1.0 m/s',
                'omega = (1.5 - 0.5) / 0.4 = 2.5 rad/s',
                'R_ICC = 1.0 / 2.5 = 0.40 m',
              ],
              result: 'v = 1.0 m/s, ω = 2.5 rad/s, R_ICC = 0.40 m',
            }}
            roboticsApplication={
              isId
                ? 'Digunakan pada seluruh mobile robot roda dua (seperti Thymio, TurtleBot, robot vacuum cleaner, dan AGV gudang).'
                : 'Standard kinematic model for dual-wheel mobile robots (TurtleBot, warehouse AGVs, delivery rovers).'
            }
            calculator={{
              params: [
                { key: 'vR', label: 'Right Wheel Speed (v_R)', unit: 'm/s', default: 1.2, min: -2.0, max: 2.0, step: 0.1 },
                { key: 'vL', label: 'Left Wheel Speed (v_L)', unit: 'm/s', default: 0.8, min: -2.0, max: 2.0, step: 0.1 },
                { key: 'L', label: 'Wheelbase (L)', unit: 'm', default: 0.35, min: 0.1, max: 1.0, step: 0.05 },
              ],
              calculate: (inputs) => {
                const { vR, vL, L } = inputs;
                const v = (vR + vL) / 2;
                const w = (vR - vL) / L;
                const rIcc = Math.abs(w) > 1e-4 ? v / w : Infinity;
                return {
                  steps: [
                    `v = (${vR} + ${vL}) / 2 = ${v.toFixed(2)} m/s`,
                    `ω = (${vR} - ${vL}) / ${L} = ${w.toFixed(2)} rad/s`,
                    `R_ICC = ${v.toFixed(2)} / ${w.toFixed(2)} = ${isFinite(rIcc) ? rIcc.toFixed(2) + ' m' : '∞ (Straight)'}`,
                  ],
                  result: `v = ${v.toFixed(2)} m/s, ω = ${w.toFixed(2)} rad/s`,
                };
              },
            }}
          />
          {/* Section 38 Math <-> Code Bridge for Differential Drive */}
          <MathCodeBridge
            title={isId ? 'Jembatan Kinematika Roda Diferensial ke Kode TypeScript' : 'Differential-Drive Kinematics Math-to-Code Bridge'}
            mathLatex="v = \frac{v_R + v_L}{2}, \quad \omega = \frac{v_R - v_L}{L}"
            codeSnippet={`// Pure TypeScript Differential Drive Kinematics
export function diffDriveForwardKinematics(
  vR: number,
  vL: number,
  wheelbase: number
): { v: number; omega: number } {
  const v = (vR + vL) / 2.0;
  const omega = (vR - vL) / wheelbase;
  return { v, omega };
}`}
            explanation={
              isId
                ? 'Fungsi TypeScript di atas mengeksekusi integrasi kecepatan linier v dan rotasi sudut omega secara deterministik tanpa distorsi frame-rate.'
                : 'The TypeScript function executes the continuous differential velocity mapping with exact 1-to-1 fidelity for 60 FPS physics engines.'
            }
            mappings={[
              { mathSymbol: 'v', codeIdentifier: 'v', explanation: isId ? 'Kecepatan linier pusat robot (m/s)' : 'Robot center forward linear velocity' },
              { mathSymbol: 'omega (ω)', codeIdentifier: 'omega', explanation: isId ? 'Laju rotasi sudut bodi robot (rad/s)' : 'Robot chassis angular yaw velocity' },
              { mathSymbol: 'v_R', codeIdentifier: 'vR', explanation: isId ? 'Kecepatan kontak putar roda kanan (m/s)' : 'Right wheel linear velocity' },
              { mathSymbol: 'v_L', codeIdentifier: 'vL', explanation: isId ? 'Kecepatan kontak putar roda kiri (m/s)' : 'Left wheel linear velocity' },
              { mathSymbol: 'L', codeIdentifier: 'wheelbase', explanation: isId ? 'Jarak pemisah antar roda (m)' : 'Wheelbase axle separation distance' },
            ]}
          />
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

            <FormulaExplainer
              id="formula-jacobian-3d"
              title={isId ? 'Pemetaan Jacobian Manipulator Robot 3D' : 'Manipulator Geometric Jacobian Mapping'}
              latex="\mathbf{V}_e = \begin{bmatrix} \mathbf{v}_e \\ \boldsymbol{\omega}_e \end{bmatrix} = J(\mathbf{q})\, \dot{\mathbf{q}} = \begin{bmatrix} J_v(\mathbf{q}) \\ J_\omega(\mathbf{q}) \end{bmatrix} \dot{\mathbf{q}}"
              meaning={
                isId
                  ? 'Menghubungkan kecepatan sudut setiap sendi motor (q_dot) dengan kecepatan linier (v_e) dan kecepatan sudut spasial (omega_e) pada ujung robot (end-effector).'
                  : 'Relates joint motor angular velocities (q_dot) directly to end-effector linear and angular spatial velocity (twist).'
              }
              whyExplanation={
                isId
                  ? 'Pergerakan satu sendi mempengaruhi posisi seluruh link berikutnya. Matriks Jacobian adalah turunan parsial posisi ujung terhadap setiap variabel sendi (J = d(FK)/dq).'
                  : 'Each joint motion propagates along the kinematic chain. The Jacobian represents the partial derivatives of end-effector pose with respect to joint coordinates.'
              }
              variables={[
                { symbol: 'V_e', name: 'Spatial Twist', unit: 'm/s, rad/s', meaning: isId ? 'Vektor 6x1 kecepatan linier dan sudut ujung robot' : '6x1 linear and angular end-effector velocity vector' },
                { symbol: 'J(q)', name: 'Geometric Jacobian', unit: 'm/rad', meaning: isId ? 'Matriks transformasi kecepatan dimensi 6 x n' : '6 x n velocity sensitivity matrix' },
                { symbol: 'q_dot', name: 'Joint Velocities', unit: 'rad/s', meaning: isId ? 'Vektor kecepatan putar motor di setiap sendi' : 'Vector of joint motor rotation rates' },
              ]}
              roboticsApplication={
                isId
                  ? 'Digunakan pada kontrol kecepatan lengan robot (seperti manipulator pembedahan dan pengelasan mobil) serta analisis singularitas konfigurasi.'
                  : 'Critical for industrial robot arm trajectory tracking, force control, and kinematic singularity avoidance.'
              }
            />
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

            <FormulaExplainer
              id="formula-se3-matrix"
              title={isId ? 'Matriks Transformasi Homogen 4x4 SE(3)' : '4x4 SE(3) Homogeneous Transformation Matrix'}
              latex="T = \begin{bmatrix} R & \mathbf{p} \\ \mathbf{0}_{1\times 3} & 1 \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} & x \\ r_{21} & r_{22} & r_{23} & y \\ r_{31} & r_{32} & r_{33} & z \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad T^{-1} = \begin{bmatrix} R^T & -R^T \mathbf{p} \\ \mathbf{0} & 1 \end{bmatrix}"
              meaning={
                isId
                  ? 'Representasi matematis lengkap untuk translasi 3D dan rotasi spasial sebuah objek kaku dalam ruang 3 dimensi.'
                  : 'Complete mathematical representation for 3D rigid body translation and spatial rotation in 3-dimensional space.'
              }
              whyExplanation={
                isId
                  ? 'Invers matriks homogen dapat dihitung secara instan tanpa inversi numerik yang berat karena sifat ortogonalitas rotasi (R^-1 = R^T).'
                  : 'The rigid inverse is computed in closed-form without numerical matrix inversion by exploiting the orthogonality of rotation submatrices (R^-1 = R^T).'
              }
              variables={[
                { symbol: 'R', name: '3D Rotation Submatrix', unit: 'unitless', meaning: isId ? 'Submatriks 3x3 yang mengatur orientasi spasial' : '3x3 orthogonal spatial orientation matrix' },
                { symbol: 'p', name: 'Translation Vector', unit: 'm', meaning: isId ? 'Vektor 3x1 posisi translasi [x, y, z]^T' : '3x1 spatial translation vector' },
                { symbol: 'T^-1', name: 'Rigid Inverse', unit: 'unitless', meaning: isId ? 'Matriks transformasi arah sebaliknya' : 'Inverse coordinate transformation matrix' },
              ]}
              roboticsApplication={
                isId
                  ? 'Fondasi komputasi format TF di ROS / ROS2 dan kalibrasi kamera ke badan robot (Eye-to-Hand).'
                  : 'Universal backbone of ROS/ROS2 TF transforms and hand-eye camera-to-robot coordinate calibration.'
              }
            />
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

            <FormulaExplainer
              id="formula-bayes-model"
              title={isId ? 'Model Status Diskrit & Pembaruan Teorema Bayes' : 'Discrete State-Space & Recursive Bayes Filter'}
              latex="\mathbf{x}_{k} = f(\mathbf{x}_{k-1}, \mathbf{u}_{k}) + \mathbf{w}_k, \quad \text{bel}(\mathbf{x}_k) = \eta \cdot p(\mathbf{z}_k \mid \mathbf{x}_k) \int p(\mathbf{x}_k \mid \mathbf{u}_k, \mathbf{x}_{k-1}) \text{bel}(\mathbf{x}_{k-1}) d\mathbf{x}_{k-1}"
              meaning={
                isId
                  ? 'Memperbarui probabilitas posisi robot dengan menggabungkan perintah gerak aktuator dan pembacaan sensor ber-noise secara rekursif.'
                  : 'Recursively estimates robot pose probability by fusing actuator motion commands with noisy sensor measurements.'
              }
              whyExplanation={
                isId
                  ? 'Sensor dan aktuator dunia nyata tidak pernah 100% sempurna. Model probabilitas Bayes secara matematis memperhitungkan noise Gaussian untuk menghasilkan estimasi posisi yang paling mendekati kenyataan.'
                  : 'Real sensors and actuators carry stochastic noise. Bayesian estimation mathematically filters uncertainty to extract maximum-likelihood true robot pose.'
              }
              variables={[
                { symbol: 'x_k', name: 'State Vector', unit: 'm, rad', meaning: isId ? 'Status sejati robot pada langkah waktu k' : 'True robot state at timestep k' },
                { symbol: 'u_k', name: 'Control Input', unit: 'm/s, rad/s', meaning: isId ? 'Perintah kendali yang dikirim ke motor' : 'Control command issued to actuators' },
                { symbol: 'z_k', name: 'Sensor Measurement', unit: 'm', meaning: isId ? 'Data pengukuran yang terbaca oleh sensor' : 'Observation reading returned by sensors' },
                { symbol: 'w_k, v_k', name: 'Process & Sensor Noise', unit: 'variance', meaning: isId ? 'Ketidakpastian acak Gaussian' : 'Stochastic Gaussian noise perturbations' },
              ]}
              roboticsApplication={
                isId
                  ? 'Jantung algoritma Extended Kalman Filter (EKF), Unscented Kalman Filter (UKF), dan Particle Filter (MCL) pada mobil otonom dan robot penjelajah Mars.'
                  : 'The foundation of Extended Kalman Filters (EKF), UKF, and Monte Carlo localization on self-driving cars and planetary rovers.'
              }
            />
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

            <FormulaExplainer
              id="formula-euler-lagrange"
              title={isId ? 'Persamaan Dinamika Manipulator Euler-Lagrange' : 'Euler-Lagrange Manipulator Dynamic Equations'}
              latex="M(\mathbf{q})\ddot{\mathbf{q}} + C(\mathbf{q}, \dot{\mathbf{q}})\dot{\mathbf{q}} + \mathbf{g}(\mathbf{q}) = \boldsymbol{\tau} - \mathbf{f}_{friction}"
              meaning={
                isId
                  ? 'Menghitung torsi motor (tau) yang diperlukan untuk menghasilkan percepatan sendi robot (q_ddot) dengan memperhitungkan massa inersia, gaya sentrifugal/Coriolis, dan gravitasi.'
                  : 'Calculates the actuator joint torques (tau) required to produce acceleration (q_ddot) considering inertia, Coriolis forces, and gravity.'
              }
              whyExplanation={
                isId
                  ? 'Kinematika hanya melihat posisi dan kecepatan tanpa peduli massa. Dalam realitas fisik, robot yang membawa beban berat membutuhkan torsi motor yang jauh lebih besar untuk berakselerasi dan melawan gravitasi.'
                  : 'Kinematics ignores mass and inertia. In physical systems, moving heavy payloads requires dynamic feedforward torque compensation against inertia and gravity.'
              }
              variables={[
                { symbol: 'M(q)', name: 'Inertia Matrix', unit: 'kg·m²', meaning: isId ? 'Matriks massa dan inersia simetris positif definit' : 'Symmetric positive-definite mass/inertia matrix' },
                { symbol: 'C(q, q_dot)', name: 'Coriolis & Centrifugal Matrix', unit: 'N·m·s/rad', meaning: isId ? 'Efek gaya sentrifugal akibat rotasi sendi bersamaan' : 'Velocity-dependent Coriolis and centrifugal effects' },
                { symbol: 'g(q)', name: 'Gravity Vector', unit: 'N·m', meaning: isId ? 'Torsi yang dibutuhkan untuk menahan beban gravitasi bumi' : 'Joint torques required to balance gravitational loads' },
                { symbol: 'tau (τ)', name: 'Actuator Torque', unit: 'N·m', meaning: isId ? 'Torsi yang diberikan oleh motor listrik ke sendi' : 'Torque delivered by electric motor actuators' },
              ]}
              roboticsApplication={
                isId
                  ? 'Digunakan pada kontroler torsi berbasis kompensasi gravitasi (Computed Torque Control) pada robot industri KUKA, ABB, dan robot humanoid.'
                  : 'Implemented in computed torque controllers and model predictive controllers (MPC) on industrial arms and humanoid robots.'
              }
            />
          </div>
        </div>
      )}

      {/* Section 39 Academic References */}
      <AcademicReferences />

      {/* Suggested Experiments & Next Steps Navigation */}
      <LessonNavigation
        nextLesson={{
          domain: isId ? 'Perencanaan Jalur' : 'Path Planning',
          title: isId ? 'Pencarian Grid Optimal: Dijkstra & A*' : 'Optimal Grid Search: Dijkstra & A*',
          href: '/learn/planning',
        }}
        suggestedExperiments={[
          isId ? 'Coba ubah kecepatan roda kanan (v_R) lebih besar dari roda kiri (v_L) di simulator Bab 5' : 'Set v_R > v_L in Chapter 5 simulator to observe circular counter-clockwise turning',
          isId ? 'Uji sudut Yaw, Pitch, dan Roll di simulator 3D Bab 3 dan amati ortogonalitas matriks SO(3)' : 'Adjust Yaw, Pitch, and Roll in Chapter 3 3D visualizer to verify SO(3) matrix properties',
          isId ? 'Gunakan kalkulator interaktif transformasi SE(2) di Bab 2 untuk menghitung proyeksi koordinat' : 'Use the interactive SE(2) transform calculator in Chapter 2 to project local points',
        ]}
      />
    </div>
  );
}
