'use client';

import React, { useState } from 'react';
import { Box, Compass, Navigation, Cpu, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function RobotClassificationExplorer() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [activeCategory, setActiveCategory] = useState<string>('fixed');

  const categories = [
    {
      id: 'fixed',
      name: isId ? 'Manipulator Terfiksasi' : 'Fixed Manipulators',
      icon: Box,
      dof: '6 to 7 DOF',
      sensors: isId ? 'Enkoder Optik Absolut, Sensor Torsi/Gaya Sendi 6-Sumbu' : 'Absolute Optical Encoders, 6-Axis Force/Torque Sensors',
      actuators: isId ? 'Harmonic Drive Servomotors, Motor Torsi Brushless' : 'Harmonic Drive Servomotors, Brushless Torque Motors',
      workspace: isId ? 'Terbatas dalam jangkauan lengan di lantai pabrik' : 'Bounded reach envelope around mounting pedestal',
      applications: isId ? 'Pengelasan bodi mobil, perakitan elektronik presisi, bedah robotik' : 'Automotive welding, semiconductor pick-and-place, robotic surgery',
      characteristics: isId
        ? 'Basis tertanam permanen di lantai. Kecepatan dan akurasi pengulangan sub-milimeter sangat tinggi. Dinamika didominasi oleh inersia lengan dan torsi gravitasi.'
        : 'Fixed base pedestal. Sub-millimeter repeatability. Dynamics dominated by link inertia and gravitational joint torque loads.',
    },
    {
      id: 'wheeled',
      name: isId ? 'Robot Beroda (AMR & AGV)' : 'Wheeled Mobile Robots (AMR)',
      icon: Compass,
      dof: '3 DOF (Planar x, y, θ)',
      sensors: isId ? '2D/3D LiDAR, Enkoder Roda, IMU, Kamera Kedalaman RGB-D' : '2D/3D LiDAR, Wheel Encoders, IMU, RGB-D Depth Cameras',
      actuators: isId ? 'Motor Roda Diferensial, Roda Mecanum / Omnidirectional' : 'Differential-Drive DC Hub Motors, Steered Ackermann, Mecanum Wheels',
      workspace: isId ? 'Lantai 2D terbuka, koridor gedung, gudang logistik' : 'Unbounded 2D planar ground, warehouse aisles, hospital corridors',
      applications: isId ? 'Robot pembersih vacuum, logistik gudang otomatis, delivery robot' : 'Warehouse AMR logistics, autonomous floor scrubbers, sidewalk delivery',
      characteristics: isId
        ? 'Dibatasi kendala non-holonomik bebas selip (tidak bisa meluncur menyamping langsung). Sangat efisien energi pada permukaan datar.'
        : 'Constrained by no-slip non-holonomic kinematics. High energy efficiency on flat terrain.',
    },
    {
      id: 'legged',
      name: isId ? 'Robot Berkaki (Quadruped & Humanoid)' : 'Legged Robots (Quadruped / Humanoid)',
      icon: Activity,
      dof: '12 (Quadruped) to 28+ DOF (Humanoid)',
      sensors: isId ? 'Sensor Gaya Telapak Kaki, IMU Frekuensi Tinggi, Stereo Vision' : 'Ground Reaction Contact Sensors, High-Rate IMU, Stereo Vision',
      actuators: isId ? 'Aktuator Quasi-Direct Drive (QDD), Motor Torsi Tinggi' : 'Quasi-Direct Drive (QDD) High-Torque Actuators, Series Elastic Actuators',
      workspace: isId ? 'Medan berat tak beraturan, tangga, lereng berbatu' : 'Discontinuous terrain, stairs, rubble, disaster relief environments',
      applications: isId ? 'Inspeksi fasilitas industri berbahaya, SAR bencana alam, eksplorasi' : 'Hazardous industrial plant inspection, disaster search-and-rescue',
      characteristics: isId
        ? 'Dapat melintasi rintangan diskontinu yang tidak bisa dilalui roda. Memerlukan kendala keseimbangan dinamis Zero Moment Point (ZMP) atau Model Predictive Control (MPC).'
        : 'Capable of negotiating discontinuous footholds. Requires dynamic ZMP balance control or whole-body MPC.',
    },
    {
      id: 'aerial',
      name: isId ? 'Robot Udara (Drone Multirotor)' : 'Aerial Robots (Multirotor Drones)',
      icon: Navigation,
      dof: '6 DOF Spasial (Underactuated 4-input)',
      sensors: isId ? 'IMU 6-Axis, Barometer Altimeter, Optical Flow, GPS RTK' : '6-Axis IMU, Barometric Altimeter, Downward Optical Flow, RTK-GPS',
      actuators: isId ? '4–8 Motor Brushless DC + Baling-Baling Propeller' : '4–8 High-RPM Brushless DC Motors with Fixed-Pitch Propellers',
      workspace: isId ? 'Ruang udara 3D bebas, pemetaan ketinggian' : 'Unbounded 3D airspace, volumetric inspection tunnels',
      applications: isId ? 'Pemetaan fotogrametri udara, inspeksi jembatan, agrikultur cerdas' : 'Aerial photogrammetry mapping, infrastructure inspection, precision agriculture',
      characteristics: isId
        ? 'Sistem underactuated (6-DOF hanya dikendalikan 4 kecepatan rotor). Memerlukan kemiringan Roll/Pitch untuk menghasilkan gaya dorong lateral.'
        : 'Underactuated 6-DOF system controlled via 4 rotor thrust inputs. Translational motion requires pitch/roll tilting.',
    },
  ];

  const activeData = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 my-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Box className="w-4 h-4" />
          <span>{isId ? 'Eksplorasi Taksonomi & Klasifikasi Robot' : 'Robot Taxonomy & Classification Explorer'}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
          Morphology Comparison
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = activeCategory === c.id;

          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Details Grid */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <h4 className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <activeData.icon className="w-4 h-4 text-cyan-500" />
            <span>{activeData.name}</span>
          </h4>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
            {activeData.dof}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
          {activeData.characteristics}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
              {isId ? 'Paket Sensor Khas:' : 'Typical Sensor Suite:'}
            </span>
            <strong className="text-cyan-600 dark:text-cyan-400 block">{activeData.sensors}</strong>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
              {isId ? 'Tipe Aktuator:' : 'Actuator Technology:'}
            </span>
            <strong className="text-amber-600 dark:text-amber-400 block">{activeData.actuators}</strong>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
              {isId ? 'Ruang Kerja (Workspace):' : 'Operational Workspace:'}
            </span>
            <strong className="text-slate-800 dark:text-slate-200 block">{activeData.workspace}</strong>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
              {isId ? 'Aplikasi Industri:' : 'Primary Applications:'}
            </span>
            <strong className="text-emerald-600 dark:text-emerald-400 block">{activeData.applications}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
