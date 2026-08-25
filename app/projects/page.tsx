'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Sparkles,
  Bot,
  Compass,
  Cpu,
  Layers,
  ArrowRight,
  Github,
  CheckCircle2,
  Hammer,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

interface ProjectItem {
  id: string;
  titleEn: string;
  titleId: string;
  subtitleEn: string;
  subtitleId: string;
  category: 'Mobile' | 'Manipulator' | 'Aerial' | 'Marine' | 'Swarm' | 'SLAM';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  icon: string;
  stack: string[];
  descriptionEn: string;
  descriptionId: string;
  architectureSteps: string[];
  theoryHref: string;
  labHref: string;
}

export default function ProjectsPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const projects: ProjectItem[] = [
    {
      id: 'amr-autonomous-rover',
      titleEn: 'Autonomous Mobile Robot (AMR) Differential Rover',
      titleId: 'Robot Bergerak Otonom (AMR) Rover Diferensial',
      subtitleEn: 'Full Sense-Plan-Act navigation stack on 2D differential-drive hardware',
      subtitleId: 'Pipeline navigasi lengkap Sense-Plan-Act pada hardware roda diferensial 2D',
      category: 'Mobile',
      difficulty: 'Intermediate',
      estimatedHours: 12,
      icon: '🚗',
      stack: ['Differential Kinematics', 'A* Search', 'Pure Pursuit', 'LiDAR Avoidance'],
      descriptionEn:
        'Design and deploy an end-to-end autonomous navigation stack for a differential-drive robot. The system ingests 360° LiDAR obstacle scans, plans global paths around obstacles with A*, and executes continuous path tracking with Pure Pursuit steering.',
      descriptionId:
        'Rancang dan bangun pipeline navigasi otonom lengkap untuk robot beroda diferensial. Sistem membaca pindaian laser LiDAR 360°, merencanakan jalur optimal dengan A*, dan mengeksekusi kendali kemudi dengan Pure Pursuit.',
      architectureSteps: [
        '1. Hardware unicycle kinematics model & motor PWM speed curves',
        '2. LiDAR raycasting & Log-odds costmap inflation layer',
        '3. Discrete A* grid shortest path planning',
        '4. Pure Pursuit lookahead steering controller execution loop (50 Hz)',
      ],
      theoryHref: '/learn/kinematics/velocity-kinematics-2d',
      labHref: '/labs',
    },
    {
      id: 'arm-inverse-kinematics',
      titleEn: '3-DOF Robotic Arm Inverse Kinematics Pick-and-Place',
      titleId: 'Lengan Robotik 3-DOF Kendali Kinematika Invers Pick-and-Place',
      subtitleEn: 'Analytical & numerical inverse kinematics for planar manipulator trajectory control',
      subtitleId: 'Kinematika invers analitik & numerik untuk pelacakan trajektori manipulator planar',
      category: 'Manipulator',
      difficulty: 'Intermediate',
      estimatedHours: 10,
      icon: '🦾',
      stack: ['DH Parameters', 'Forward/Inverse Kinematics', 'Jacobian Matrix', 'Trajectory Splines'],
      descriptionEn:
        'Build a closed-loop trajectory tracking controller for an articulated robot arm. Calculate analytical inverse kinematics for target end-effector coordinates $(x, y, \\theta)$ and smooth quintic polynomial joint trajectory profiles.',
      descriptionId:
        'Bangun kontroler pelacakan trajektori untuk lengan robotik bersendi. Hitung kinematika invers analitik untuk posisi end-effector target $(x, y, \\theta)$ dan trajektori sambungan polinomial kuintik yang mulus.',
      architectureSteps: [
        '1. Denavit-Hartenberg (DH) parameter table & frame transformations',
        '2. Law of Cosines geometric Inverse Kinematics solver',
        '3. Manipulator Jacobian singular velocity avoidance',
        '4. Cubic / Quintic joint trajectory interpolator',
      ],
      theoryHref: '/learn/geometry/2d-geometry',
      labHref: '/robots',
    },
    {
      id: 'uav-quadrotor-flight',
      titleEn: 'Autonomous UAV Quadrotor Flight Controller',
      titleId: 'Kontroler Penerbangan Otonom Drone UAV Quadrotor',
      subtitleEn: '6-DOF rigid body flight dynamics & SE(3) attitude stabilization',
      subtitleId: 'Dinamika penerbangan benda kaku 6-DOF & stabilisasi sikap terbang SE(3)',
      category: 'Aerial',
      difficulty: 'Advanced',
      estimatedHours: 16,
      icon: '🚁',
      stack: ['Euler Angles & Quaternions', 'SE(3) Attitude Control', 'PID Loops', 'Thrust Mixing'],
      descriptionEn:
        'Implement an inner-outer loop cascaded flight controller for an autonomous quadcopter drone. Outer loop controls XYZ position and outputs target tilt angles; inner high-frequency loop executes Roll-Pitch-Yaw torque mixing.',
      descriptionId:
        'Implementasikan kontroler berjenjang inner-outer loop untuk drone quadcopter otonom. Outer loop mengatur posisi 3D XYZ, sedangkan inner loop berkecepatan tinggi mengeksekusi kontrol torsi Roll-Pitch-Yaw.',
      architectureSteps: [
        '1. Quadrotor Newton-Euler 6-DOF equations of motion',
        '2. Motor thrust curve & cross-torque aerodynamic allocation matrix',
        '3. Cascaded PID altitude and attitude stabilization loops',
        '4. Minimum-snap polynomial 3D waypoint generator',
      ],
      theoryHref: '/learn/geometry/3d-geometry',
      labHref: '/robots',
    },
    {
      id: 'subsea-rov-depth',
      titleEn: 'Marine ROV Subsea Depth & Heading Stabilizer',
      titleId: 'Stabilisator Kedalaman & Arah Hadap Kapal Selam ROV Bawah Air',
      subtitleEn: 'Hydrodynamic buoyancy modeling & 6-thruster allocation matrix',
      subtitleId: 'Pemodelan hidrodinamika daya apung & matriks alokasi 6-pendorong',
      category: 'Marine',
      difficulty: 'Intermediate',
      estimatedHours: 12,
      icon: '🌊',
      stack: ['Hydrodynamics', 'Buoyancy Centers', 'Thruster Allocation Matrix', 'IMU Fusion'],
      descriptionEn:
        'Design a stabilization system for an underwater Remotely Operated Vehicle (ROV). Balance gravity and buoyant forces ($B > W$), fuse pressure sensor depth telemetry, and map wrench commands to 6 brushless thrusters.',
      descriptionId:
        'Rancang sistem stabilisasi untuk robot kapal selam ROV bawah air. Seimbangkan gaya gravitasi dan daya apung ($B > W$), fusi sensor tekanan kedalaman, dan petakan perintah torsi ke 6 motor pendorong.',
      architectureSteps: [
        '1. Added-mass and quadratic hydrodynamic drag matrices',
        '2. Metacentric center-of-gravity vs center-of-buoyancy stability',
        '3. Moore-Penrose pseudo-inverse thruster allocation solver',
        '4. Depth-hold PID pressure sensor feedback loop',
      ],
      theoryHref: '/learn/fundamentals/marine-robotics-fundamentals',
      labHref: '/robots',
    },
    {
      id: 'slam-pointcloud-builder',
      titleEn: 'Full 2D LiDAR ICP SLAM Engine from Scratch',
      titleId: 'Mesin SLAM Pindaian Laser LiDAR 2D Berbasis ICP',
      subtitleEn: 'Real-time scan registration, pose graph construction, and map generation',
      subtitleId: 'Registrasi pindaian waktu-nyata, pembuatan pose graph, dan pembentukan peta',
      category: 'SLAM',
      difficulty: 'Advanced',
      estimatedHours: 15,
      icon: '🧩',
      stack: ['SVD Point Cloud Matching', 'Pose Graph Optimization', 'Occupancy Grids', 'Loop Closure'],
      descriptionEn:
        'Build a standalone simultaneous localization and mapping (SLAM) engine in TypeScript. Estimate odometry increments between consecutive laser scans with SVD ICP and fuse point clouds into a global occupancy map.',
      descriptionId:
        'Bangun mesin SLAM mandiri dalam TypeScript. Estimasi perpindahan odometri antar pindaian laser berturut-turut dengan ICP SVD dan gabungkan awan titik ke dalam peta grid okupansi global.',
      architectureSteps: [
        '1. Nearest-neighbor point correspondence with spatial KD-Tree',
        '2. Closed-form SVD rotation and translation solver',
        '3. Keyframe insertion and pose-graph edge constraint generation',
        '4. Log-odds occupancy grid integration',
      ],
      theoryHref: '/learn/advanced/icp-scan-matching',
      labHref: '/labs',
    },
    {
      id: 'swarm-multiagent-formation',
      titleEn: 'Decentralized Multi-Agent Swarm Coordinator',
      titleId: 'Koordinator Kawanan Robot Multi-Agent Terdesentralisasi',
      subtitleEn: 'Graph Laplacian consensus, obstacle-avoiding flocking, and dynamic formations',
      subtitleId: 'Konsensus Graf Laplacian, kawanan penghindar rintangan, dan formasi dinamis',
      category: 'Swarm',
      difficulty: 'Advanced',
      estimatedHours: 14,
      icon: '👥',
      stack: ['Graph Laplacian', 'Algebraic Connectivity', 'Reynolds Boids', 'Virtual Leaders'],
      descriptionEn:
        'Deploy a decentralized swarm coordination system for 20+ robots. Use Graph Laplacian consensus dynamics to achieve flocking, maintain polygonal geometric formations, and avoid obstacles in real time.',
      descriptionId:
        'Bangun sistem koordinasi kawanan terdesentralisasi untuk 20+ robot. Manfaatkan dinamika konsensus Graf Laplacian untuk mencapai keselarasan arah, mempertahankan formasi geometris, dan menghindari rintangan.',
      architectureSteps: [
        '1. Adjacency and Degree matrix generation from spatial communication range',
        '2. Algebraic connectivity Fiedler eigenvalue computation',
        '3. Distributed linear consensus control law execution',
        '4. Reynolds flocking rules (Separation, Alignment, Cohesion)',
      ],
      theoryHref: '/learn/advanced/formation-control-and-swarms',
      labHref: '/labs',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isId ? 'Proyek Praktik Robotika Terpadu' : 'End-to-End Robotics Capstone Projects'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
          {isId ? 'Proyek Rekayasa Sistem Robotika Otonom' : 'Robotics Engineering Projects'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Terapkan teori matematika, pemodelan kinematika, dan algoritma otonom ke dalam proyek implementasi end-to-end untuk berbagai platform robot nyata.'
            : 'Apply mathematical theory, kinematic modeling, and autonomous algorithms into structured end-to-end engineering projects across multi-domain physical robot platforms.'}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 group hover:border-cyan-500/40 transition-all shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    {proj.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                      {proj.category} Robotics
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                      {isId ? proj.titleId : proj.titleEn}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {proj.difficulty}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ~{proj.estimatedHours} {isId ? 'jam' : 'hours'}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isId ? proj.descriptionId : proj.descriptionEn}
              </p>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Architecture Blueprint Steps */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono font-bold text-cyan-400 block">
                  {isId ? 'Arsitektur Pipeline Proyek:' : 'Project Pipeline Blueprint:'}
                </span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {proj.architectureSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <Link
                href={proj.theoryHref}
                className="flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isId ? 'Pelajari Teori' : 'Study Theory'}</span>
              </Link>

              <Link
                href={proj.labHref}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-bold text-xs shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <Hammer className="w-3.5 h-3.5" />
                <span>{isId ? 'Buka Simulator Lab' : 'Launch Lab'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
