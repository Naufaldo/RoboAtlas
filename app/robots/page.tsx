'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Bot,
  Compass,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  Anchor,
  Wind,
  Zap,
} from 'lucide-react';

interface RobotPlatform {
  id: string;
  nameEn: string;
  nameId: string;
  category: string;
  icon: string;
  dof: string;
  descriptionEn: string;
  descriptionId: string;
  typicalSensors: string[];
  actuators: string[];
  fundamentalsUsed: { name: string; href: string }[];
  specializedTopicsEn: string[];
  specializedTopicsId: string[];
  applicationsEn: string[];
  applicationsId: string[];
}

const ROBOT_PLATFORMS: RobotPlatform[] = [
  {
    id: 'manipulator',
    nameEn: 'Robotic Arm (Manipulator)',
    nameId: 'Lengan Robotik (Manipulator)',
    category: 'Industrial & Collaborative',
    icon: '🦾',
    dof: '6-DOF / 7-DOF Redundant',
    descriptionEn:
      'Articulated kinematic chains designed for high-precision end-effector positioning, pick-and-place, and contact-rich industrial assembly.',
    descriptionId:
      'Rantai kinematika bersendi yang dirancang untuk penentuan posisi end-effector presisi tinggi, pick-and-place, dan perakitan industri.',
    typicalSensors: ['Joint Optical Encoders', '6-Axis Wrist Force/Torque Sensor', 'Eye-in-Hand RGB-D Camera'],
    actuators: ['Harmonic Drive Brushless Servos', 'Pneumatic / Electric Gripper', 'Direct-Drive Motors'],
    fundamentalsUsed: [
      { name: '3D Spatial Geometry & SO(3)', href: '/learn/geometry/3d-geometry' },
      { name: 'Matrix Foundations SE(3)', href: '/learn/mathematics/mathematical-foundations' },
      { name: '2-DOF Forward Kinematics', href: '/learn/manipulation/2dof-forward-kinematics' },
      { name: 'Jacobian & Singularity', href: '/learn/manipulation/jacobian-and-singularity' },
    ],
    specializedTopicsEn: ['Denavit-Hartenberg (DH) Convention', 'Analytical & Numerical IK', 'Operational Space Control', 'MoveIt Motion Planning'],
    specializedTopicsId: ['Konvensi Denavit-Hartenberg (DH)', 'IK Analitik & Numerik', 'Operational Space Control', 'Perencanaan Gerak MoveIt'],
    applicationsEn: ['Automotive Welding', 'Semiconductor Assembly', 'Surgical Robotics', 'Warehouse Palletizing'],
    applicationsId: ['Pengelasan Otomotif', 'Perakitan Semikonduktor', 'Robotika Bedah', 'Palletizing Gudang'],
  },
  {
    id: 'mobile',
    nameEn: 'Mobile Robot (AMR / AGV)',
    nameId: 'Robot Bergerak (AMR / AGV)',
    category: 'Planar & Terrestrial',
    icon: '🚗',
    dof: '3-DOF (x, y, yaw in SE(2))',
    descriptionEn:
      'Wheeled autonomous rovers navigating dynamic indoor and outdoor environments using probabilistic state estimation, SLAM, and trajectory tracking.',
    descriptionId:
      'Rover beroda otonom yang bernavigasi di lingkungan dinamis menggunakan estimasi status probabilistik, SLAM, dan pelacakan trajektori.',
    typicalSensors: ['2D/3D Safety LiDAR', 'Wheel Optical Encoders', 'Inertial Measurement Unit (IMU)', 'Stereo Vision'],
    actuators: ['Differential Drive Motors', 'Steered Ackermann Servo', 'Mecanum Planetary Hubs'],
    fundamentalsUsed: [
      { name: '2D Geometry & Planar Transforms', href: '/learn/geometry/2d-geometry' },
      { name: 'Differential Drive Kinematics', href: '/learn/kinematics/differential-drive-kinematics' },
      { name: 'A* Path Planning', href: '/learn/planning/a-star' },
      { name: 'Pure Pursuit & Stanley Control', href: '/learn/control/pure-pursuit-and-stanley' },
      { name: 'Extended Kalman Filter (EKF)', href: '/learn/estimation/ekf-localization' },
      { name: 'Occupancy Grid Mapping', href: '/learn/perception/occupancy-grid-mapping' },
    ],
    specializedTopicsEn: ['Pfaffian Non-Holonomic Constraints', 'Dynamic Window Approach (DWA)', 'Loop Closure ICP', 'Nav2 Costmap Layers'],
    specializedTopicsId: ['Kendala Non-Holonomik Pfaffian', 'Dynamic Window Approach (DWA)', 'Loop Closure ICP', 'Lapisan Nav2 Costmap'],
    applicationsEn: ['Amazon Warehouse Kiva AGVs', 'Autonomous Vacuum Cleaners', 'Hospital Delivery AMRs', 'Planetary Mars Rovers'],
    applicationsId: ['AGV Gudang Amazon Kiva', 'Robot Pembersih Lantai Otonom', 'AMR Pengantar Rumah Sakit', 'Rover Mars Planet'],
  },
  {
    id: 'aerial',
    nameEn: 'Aerial Drone (UAV / Multirotor)',
    nameId: 'Drone Udara (UAV / Multirotor)',
    category: 'Aerospace & 3D Flight',
    icon: '🚁',
    dof: '6-DOF (Underactuated 4-input)',
    descriptionEn:
      'High-speed aerial multirotors achieving agile 3D spatial flight through aerodynamic rotor thrust differential dynamics.',
    descriptionId:
      'Multirotor udara berkecepatan tinggi yang mencapai penerbangan 3D lincah melalui dinamika diferensial dorongan rotor aerodinamis.',
    typicalSensors: ['High-Rate 6-Axis IMU (1 kHz)', 'Downfacing Optical Flow', 'Barometer / LiDAR Altimeter', 'GNSS / RTK GPS'],
    actuators: ['4x/8x High-KV BLDC Motors', 'Electronic Speed Controllers (ESC)', 'Carbon Fiber Propellers'],
    fundamentalsUsed: [
      { name: 'Aerial Drone Principles & 6-DOF Dynamics', href: '/learn/fundamentals/aerial-drone-principles' },
      { name: '3D Spatial Geometry & Euler ZYX', href: '/learn/geometry/3d-geometry' },
      { name: 'PID Feedback Control', href: '/learn/control/pid-and-lqr-control' },
      { name: '3D Frontier Exploration MAV', href: '/learn/planning/3d-frontier-exploration-mav' },
    ],
    specializedTopicsEn: ['SE(3) Geometric Attitude Control', 'Differential Flatness Property', 'Minimum-Snap Trajectory', 'Visual-Inertial Odometry (VIO)'],
    specializedTopicsId: ['Kendali Sikap Geometris SE(3)', 'Properti Differential Flatness', 'Trajektori Minimum-Snap', 'Visual-Inertial Odometry (VIO)'],
    applicationsEn: ['Aerial Surveying & Photogrammetry', 'Agricultural Crop Spraying', 'Search & Rescue', 'Drone Light Show Swarms'],
    applicationsId: ['Pemetaan Udara & Fotogrametri', 'Penyemprotan Tanaman Pertanian', 'Pencarian & Penyelamatan (SAR)', 'Pertunjukan Cahaya Drone'],
  },
  {
    id: 'marine',
    nameEn: 'Marine & Underwater Robot (ROV / AUV)',
    nameId: 'Robot Laut & Bawah Air (ROV / AUV)',
    category: 'Marine & Subsea',
    icon: '🌊',
    dof: '6-DOF (Surge, Sway, Heave, Roll, Pitch, Yaw)',
    descriptionEn:
      'Subsea vehicles navigating extreme underwater pressure environments governed by hydrodynamic drag, added mass, and buoyancy equilibrium.',
    descriptionId:
      'Kendaraan bawah laut yang beroperasi di lingkungan bertekanan ekstrem dengan prinsip hidrodinamika, massa tambahan, dan gaya apung.',
    typicalSensors: ['Doppler Velocity Log (DVL)', 'Ultra-Short Baseline (USBL) Acoustics', 'Depth Pressure Transducer', 'Forward-Looking Imaging Sonar'],
    actuators: ['Magnetically Coupled Subsea Thrusters', 'Buoyancy Engine Bladders', 'Robotic Manipulator Arm'],
    fundamentalsUsed: [
      { name: 'Marine Robotics & Fossen 6-DOF Equations', href: '/learn/fundamentals/marine-robotics-fundamentals' },
      { name: '3D Spatial Transforms & Quaternions', href: '/learn/geometry/3d-geometry' },
      { name: 'State-Space Feedback Control', href: '/learn/control/state-space-and-feedback' },
      { name: 'Sensor Noise & Covariance', href: '/learn/sensors/sensor-noise-and-uncertainty' },
    ],
    specializedTopicsEn: ['Fossen 6-DOF Marine Equation of Motion', 'Thruster Allocation Matrix (TAM)', 'Acoustic Positioning SLAM', 'Hydrodynamic Added Mass'],
    specializedTopicsId: ['Persamaan Gerak Laut Fossen 6-DOF', 'Matriks Alokasi Pendorong (TAM)', 'SLAM Posisi Akustik', 'Massa Tambahan Hidrodinamika'],
    applicationsEn: ['Subsea Pipeline Inspection', 'Deep-Ocean Oceanographic Research', 'Underwater Mine Countermeasures', 'Offshore Wind Farm Maintenance'],
    applicationsId: ['Inspeksi Pipa Minyak Bawah Laut', 'Riset Oseanografi Laut Dalam', 'Penjinak Ranjau Bawah Air', 'Pemeliharaan PLTB Lepas Pantai'],
  },
  {
    id: 'legged',
    nameEn: 'Legged Quadruped & Bipedal Robot',
    nameId: 'Robot Berkaki Quadruped & Bipedal',
    category: 'Dynamic Locomotion',
    icon: '🦿',
    dof: '12-DOF (Quadruped) to 30+ DOF (Humanoid)',
    descriptionEn:
      'Legged bio-inspired robots traversing rough non-flat terrains, stairs, and obstacles through intermittent ground contact dynamics.',
    descriptionId:
      'Robot berkaki yang melintasi medan kasar, tangga, dan rintangan melalui dinamika kontak tanah intermiten dan stabilitas gaya berjalan.',
    typicalSensors: ['Foot Contact Force/Torque Sensors', 'High-Frequency Body IMU', 'Joint Torque Encoders', 'Terrain Perception Stereo Cameras'],
    actuators: ['Quasi-Direct Drive (QDD) High-Torque Motors', 'Planetary Low-Gearbox Actuators', 'Series Elastic Actuators (SEA)'],
    fundamentalsUsed: [
      { name: 'Zero Moment Point (ZMP) & LIPM Locomotion', href: '/learn/fundamentals/legged-robotics-fundamentals' },
      { name: 'Multi-body Kinematic Chains', href: '/learn/geometry/transform-composition-and-chains' },
      { name: 'Jacobian Velocity Kinematics', href: '/learn/manipulation/jacobian-and-singularity' },
      { name: 'State-Space Optimal Regulation', href: '/learn/control/pid-and-lqr-control' },
    ],
    specializedTopicsEn: ['Zero Moment Point (ZMP)', 'Linear Inverted Pendulum Model (LIPM)', 'Whole-Body Model Predictive Control (WB-MPC)', 'Gait Sequencing (Trot, Bound)'],
    specializedTopicsId: ['Zero Moment Point (ZMP)', 'Model Pendulum Terbalik Linier (LIPM)', 'Whole-Body MPC', 'Sekuens Gaya Berjalan (Trot, Bound)'],
    applicationsEn: ['Industrial Disaster Inspection (Boston Dynamics Spot)', 'Rough Terrain Payload Transport', 'Human-Environment Workspace Assistance', 'Exploration'],
    applicationsId: ['Inspeksi Bencana Industri', 'Transportasi Beban Medan Berat', 'Bantuan Ruang Kerja Manusia', 'Eksplorasi Medan Ekstrem'],
  },
];

export default function RobotsPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [selectedId, setSelectedId] = useState<string>('manipulator');
  const platform = ROBOT_PLATFORMS.find((p) => p.id === selectedId) || ROBOT_PLATFORMS[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Bot className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Pusat Platform Robotika' : 'Robot Platforms Hub'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Eksplorasi Platform Robotika & Implementasi Fisik' : 'Robot Platforms & Embodied Implementations'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Prinsip Satu Konsep, Banyak Penerapan: Pelajari bagaimana fondasi matematika, kinematika, dan kendali yang sama diimplementasikan ke berbagai platform fisik seperti Lengan Robotik, Mobile AMR, Drone Udara, Kapal Selam ROV, hingga Robot Berkaki.'
            : 'One Concept, Multiple Applications: Explore how fundamental mathematics, kinematics, and control laws are embodied across distinct robot platforms—from Manipulator Arms to Wheeled AMRs, UAV Drones, Marine ROVs, and Legged Quadrupeds.'}
        </p>
      </div>

      {/* Platform Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {ROBOT_PLATFORMS.map((p) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-500 text-slate-900 dark:text-slate-100 shadow-lg shadow-cyan-500/10'
                  : 'glass-panel border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div>
                <span className="text-3xl block mb-2">{p.icon}</span>
                <span className="text-xs font-bold font-mono block leading-tight">
                  {isId ? p.nameId : p.nameEn}
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mt-2 block">
                {p.dof}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Platform Detail Workstation */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
        {/* Title Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{platform.icon}</span>
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                  {platform.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                  {isId ? platform.nameId : platform.nameEn}
                </h2>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl pt-2">
              {isId ? platform.descriptionId : platform.descriptionEn}
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 block text-[10px]">Degrees of Freedom:</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{platform.dof}</span>
          </div>
        </div>

        {/* 3-Column Specifications Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Hardware Sensors & Actuators */}
          <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase">
              <Activity className="w-4 h-4" />
              <span>{isId ? 'Perangkat Keras & Sensor' : 'Hardware & Sensors'}</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-500 block font-semibold">
                {isId ? 'Sensor Utama:' : 'Primary Sensors:'}
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-sans">
                {platform.typicalSensors.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-500 block font-semibold">
                {isId ? 'Aktuator & Penggerak:' : 'Actuators & Powertrain:'}
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-sans">
                {platform.actuators.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Fundamentals Applied */}
          <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase">
              <Compass className="w-4 h-4" />
              <span>{isId ? 'Fondasi Yang Digunakan' : 'Core Fundamentals Used'}</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {isId
                ? 'Konsep dasar yang mendasari matematika platform ini:'
                : 'Core theoretical modules that govern this platform:'}
            </p>

            <div className="space-y-2">
              {platform.fundamentalsUsed.map((f) => (
                <Link
                  key={f.name}
                  href={f.href}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group flex items-center justify-between text-xs font-mono font-medium text-slate-800 dark:text-slate-200"
                >
                  <span>{f.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Specialized Topics & Real-world Applications */}
          <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase">
              <Zap className="w-4 h-4" />
              <span>{isId ? 'Topik Spesialisasi & Aplikasi' : 'Specialized Topics & Uses'}</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-500 block font-semibold">
                {isId ? 'Topik Lanjutan:' : 'Specialized Topics:'}
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-sans">
                {(isId ? platform.specializedTopicsId : platform.specializedTopicsEn).map((st) => (
                  <li key={st} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-500 block font-semibold">
                {isId ? 'Aplikasi Industri Nyata:' : 'Real-World Applications:'}
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-sans">
                {(isId ? platform.applicationsId : platform.applicationsEn).map((app) => (
                  <li key={app} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
