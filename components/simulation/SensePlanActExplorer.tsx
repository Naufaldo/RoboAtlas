'use client';

import React, { useState } from 'react';
import { Eye, Cpu, Zap, ArrowRight, RotateCcw, CheckCircle2, Layers } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function SensePlanActExplorer() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      id: 'sense',
      title: isId ? '1. SENSE (Sensor Mengamati Dunia)' : '1. SENSE (Observe the Physical World)',
      icon: Eye,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      description: isId
        ? 'Sensor LiDAR memancarkan laser dan mendeteksi rintangan pada jarak 1.8 meter di depan robot. Sensor roda (enkoder) melaporkan robot telah menempuh 0.5 meter.'
        : 'LiDAR rangefinder fires laser beams and detects an obstacle at 1.8 meters ahead. Wheel encoders report the vehicle has traveled 0.5 meters.',
      statePayload: {
        sensorReadings: '{ frontDistance: 1.8m, leftDistance: 3.2m, wheelTicks: 1240 }',
        certainty: '98.5%',
      },
    },
    {
      id: 'estimate',
      title: isId ? '2. ESTIMATE & MAP (Estimasi Posisi & Peta)' : '2. ESTIMATE & MAP (State Estimation & Localization)',
      icon: Layers,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      description: isId
        ? 'Filter Kalman menggabungkan data sensor untuk memperbarui estimasi koordinat robot (x: 2.4m, y: 1.1m, θ: 15°). Peta grid okupansi ditandai terisi pada sel rintangan.'
        : 'Kalman filter fuses encoder and sensor data to update robot state estimate (x: 2.4m, y: 1.1m, θ: 15°). Log-odds occupancy grid updates obstacle cell.',
      statePayload: {
        estimatedPose: '{ x: 2.40m, y: 1.10m, theta: 0.26rad }',
        mapSize: '52 x 32 grid cells',
      },
    },
    {
      id: 'plan',
      title: isId ? '3. PLAN (Perencanaan Jalur Bebas Tabrakan)' : '3. PLAN (Collision-Free Motion Planning)',
      icon: Cpu,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      description: isId
        ? 'Algoritma A* menghitung rute alternatif memutari rintangan menuju titik tujuan goal, menghasilkan sekuens 8 waypoint baru.'
        : 'A* search algorithm calculates an alternative trajectory curving around the detected obstacle toward the goal, generating 8 new waypoints.',
      statePayload: {
        pathLength: '6.4 meters',
        exploredNodes: '42 nodes',
        heuristicScore: 'f(n) = 8.12',
      },
    },
    {
      id: 'act',
      title: isId ? '4. ACT (Aktuasi Motor & Umpan Balik)' : '4. ACT (Motor Actuation & Steering Execution)',
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      description: isId
        ? 'Kontroler Pure Pursuit menghitung sudut belok kemudi δ = 12° dan mengirimkan perintah tegangan PWM ke motor roda diferensial.'
        : 'Pure Pursuit controller calculates front steering angle δ = 12° and delivers PWM motor voltage commands to differential wheel drives.',
      statePayload: {
        commandedVelocities: '{ v_L: 0.85 m/s, v_R: 1.20 m/s }',
        wheelbase: '0.35 m',
      },
    },
  ];

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 my-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Eye className="w-4 h-4" />
          <span>{isId ? 'Simulator Alur Siklus Sense-Plan-Act Interaktif' : 'Interactive Sense-Plan-Act Loop Explorer'}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
          Step-by-Step Cycle
        </span>
      </div>

      {/* Stepper Pipeline Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = currentStep === idx;
          const isDone = currentStep > idx;

          return (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? `${s.bgColor} shadow-md`
                  : isDone
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                  : 'border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40 text-slate-400 dark:text-slate-600 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? s.color : 'text-slate-400'}`} />
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
              <span className="font-mono text-[11px] font-bold truncate block">
                {s.title.split('(')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <h4 className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
            {steps[currentStep].title}
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {steps[currentStep].description}
        </p>

        {/* State payload inspect box */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs space-y-1.5">
          <strong className="text-[10px] uppercase text-cyan-400 block">
            {isId ? 'Data & Status Internal Robot (State Payload):' : 'Robot Internal State Payload:'}
          </strong>
          {Object.entries(steps[currentStep].statePayload).map(([k, v]) => (
            <div key={k} className="flex justify-between text-[11px]">
              <span className="text-slate-400">{k}:</span>
              <strong className="text-emerald-400">{v}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-2 text-xs font-mono">
        <button
          onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all"
        >
          <span>{currentStep === steps.length - 1 ? (isId ? 'Ulangi Siklus' : 'Restart Cycle') : (isId ? 'Langkah Selanjutnya' : 'Next Stage')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <span className="text-[11px] text-slate-500">
          {isId ? 'Siklus Sense-Plan-Act dieksekusi berulang kali (10-100 Hz)' : 'Sense-Plan-Act loops execute continuously at 10–100 Hz.'}
        </span>
      </div>
    </div>
  );
}
