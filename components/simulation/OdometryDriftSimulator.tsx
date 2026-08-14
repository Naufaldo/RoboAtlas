'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Play, RotateCcw, Activity, AlertTriangle, Compass, Sparkles } from 'lucide-react';

interface Pose {
  x: number;
  y: number;
  theta: number;
}

export function OdometryDriftSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Systematic and stochastic error parameters
  const [leftWheelRadiusRatio, setLeftWheelRadiusRatio] = useState(1.02); // 2% radius mismatch
  const [rightWheelRadiusRatio, setRightWheelRadiusRatio] = useState(0.98); // -2% mismatch
  const [slipNoise, setSlipNoise] = useState(0.015); // Random slip noise std dev

  const [motionType, setMotionType] = useState<'square' | 'circle' | 'straight'>('square');
  const [isSimulating, setIsSimulating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const [truthHistory, setTruthHistory] = useState<Pose[]>([{ x: 200, y: 250, theta: 0 }]);
  const [odomHistory, setOdomHistory] = useState<Pose[]>([{ x: 200, y: 250, theta: 0 }]);

  const nominalRadius = 25; // mm
  const nominalBaseline = 120; // mm

  const resetSim = useCallback(() => {
    setIsSimulating(false);
    setStepIndex(0);
    setTruthHistory([{ x: 180, y: 220, theta: 0 }]);
    setOdomHistory([{ x: 180, y: 220, theta: 0 }]);
  }, []);

  // Step simulation forward
  const stepSimulation = useCallback(() => {
    setTruthHistory((prevTruth) => {
      const prevT = prevTruth[prevTruth.length - 1];
      const prevO = odomHistory[odomHistory.length - 1];

      // Nominal commanded wheel velocities (rad/s)
      let wL_cmd = 3.0;
      let wR_cmd = 3.0;

      if (motionType === 'square') {
        const sideSteps = 40;
        const turnSteps = 15;
        const phase = stepIndex % (sideSteps + turnSteps);
        if (phase < sideSteps) {
          wL_cmd = 3.0;
          wR_cmd = 3.0;
        } else {
          wL_cmd = -1.5;
          wR_cmd = 1.5;
        }
      } else if (motionType === 'circle') {
        wL_cmd = 2.0;
        wR_cmd = 3.5;
      } else {
        wL_cmd = 3.2;
        wR_cmd = 3.2;
      }

      const dt = 0.1;

      // 1. Ground Truth Physics (actual wheels with physical imperfections and slip)
      const actualRadiusL = nominalRadius * leftWheelRadiusRatio;
      const actualRadiusR = nominalRadius * rightWheelRadiusRatio;
      const randSlipL = 1.0 + (Math.random() - 0.5) * slipNoise * 2;
      const randSlipR = 1.0 + (Math.random() - 0.5) * slipNoise * 2;

      const vL_actual = wL_cmd * actualRadiusL * randSlipL;
      const vR_actual = wR_cmd * actualRadiusR * randSlipR;

      const v_true = (vR_actual + vL_actual) / 2;
      const omega_true = (vR_actual - vL_actual) / nominalBaseline;

      const newTheta_true = prevT.theta + omega_true * dt;
      const newX_true = prevT.x + v_true * Math.cos(prevT.theta + (omega_true * dt) / 2) * dt;
      const newY_true = prevT.y + v_true * Math.sin(prevT.theta + (omega_true * dt) / 2) * dt;

      const newTruthPose = { x: newX_true, y: newY_true, theta: newTheta_true };

      // 2. Robot's Internal Odometry (blindly assumes nominal wheel radius and no slip!)
      const vL_odom = wL_cmd * nominalRadius;
      const vR_odom = wR_cmd * nominalRadius;

      const v_odom = (vR_odom + vL_odom) / 2;
      const omega_odom = (vR_odom - vL_odom) / nominalBaseline;

      const newTheta_odom = prevO.theta + omega_odom * dt;
      const newX_odom = prevO.x + v_odom * Math.cos(prevO.theta + (omega_odom * dt) / 2) * dt;
      const newY_odom = prevO.y + v_odom * Math.sin(prevO.theta + (omega_odom * dt) / 2) * dt;

      const newOdomPose = { x: newX_odom, y: newY_odom, theta: newTheta_odom };

      setOdomHistory((prevOdom) => [...prevOdom, newOdomPose]);
      return [...prevTruth, newTruthPose];
    });

    setStepIndex((s) => s + 1);
  }, [
    stepIndex,
    motionType,
    leftWheelRadiusRatio,
    rightWheelRadiusRatio,
    slipNoise,
    odomHistory,
  ]);

  // Simulation run timer loop
  useEffect(() => {
    if (!isSimulating) return;
    const maxSteps = motionType === 'square' ? 220 : 180;
    if (stepIndex >= maxSteps) {
      setIsSimulating(false);
      return;
    }
    const timer = setInterval(() => {
      stepSimulation();
    }, 45);
    return () => clearInterval(timer);
  }, [isSimulating, stepIndex, stepSimulation, motionType]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Technical grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Ground Truth Path (Emerald Solid Line)
    if (truthHistory.length > 1) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      truthHistory.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }

    // Draw Odometry Dead Reckoning Path (Cyan Dashed Line)
    if (odomHistory.length > 1) {
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      odomHistory.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Ground Truth Robot Marker
    const currTruth = truthHistory[truthHistory.length - 1];
    if (currTruth) {
      ctx.save();
      ctx.translate(currTruth.x, currTruth.y);
      ctx.rotate(currTruth.theta);

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();

      // Heading arrow
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(14, 0);
      ctx.stroke();
      ctx.restore();
    }

    // Estimated Odometry Robot Ghost Marker
    const currOdom = odomHistory[odomHistory.length - 1];
    if (currOdom) {
      ctx.save();
      ctx.translate(currOdom.x, currOdom.y);
      ctx.rotate(currOdom.theta);

      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(14, 0);
      ctx.stroke();
      ctx.restore();
    }
  }, [truthHistory, odomHistory]);

  const currTruth = truthHistory[truthHistory.length - 1] || { x: 0, y: 0, theta: 0 };
  const currOdom = odomHistory[odomHistory.length - 1] || { x: 0, y: 0, theta: 0 };
  const posError = Math.hypot(currTruth.x - currOdom.x, currTruth.y - currOdom.y);
  const headingErrorDeg = Math.abs(((currTruth.theta - currOdom.theta) * 180) / Math.PI) % 360;

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Akumulasi Drift & Odometri Roda' : 'Wheel Odometry Drift & Dead Reckoning Laboratory'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Amati bagaimana ketidakcocokan radius roda kecil (1-2%) mengakibatkan akumulasi galat trajektori yang masif.'
                : 'Observe how subtle wheel radius mismatches (1-2%) cause massive accumulated trajectory divergence over time.'}
            </p>
          </div>
        </div>

        {/* Trajectory Pattern Selector */}
        <div className="flex items-center gap-1.5">
          {(['square', 'circle', 'straight'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMotionType(m);
                resetSim();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                motionType === m
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border border-transparent'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={340} className="w-full max-w-2xl h-auto" />

        {/* Legend Overlay */}
        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-emerald-500 rounded-full inline-block" />
            <span className="text-emerald-400 font-bold">{isId ? 'Posisi Nyata Fisik (Ground Truth)' : 'Physical Ground Truth'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-cyan-400 border-b border-dashed border-cyan-400 rounded-full inline-block" />
            <span className="text-cyan-400 font-bold">{isId ? 'Estimasi Odometri (Dead Reckoning)' : 'Odometry Estimate'}</span>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Galat Posisi (Drift)' : 'Position Drift'}</span>
          <strong className="text-rose-400 font-bold">{posError.toFixed(1)} px</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Galat Orientasi' : 'Heading Error'}</span>
          <strong className="text-amber-400 font-bold">{headingErrorDeg.toFixed(1)}°</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Radius Roda Kiri' : 'Left Wheel Ratio'}</span>
          <strong className="text-cyan-400">{(leftWheelRadiusRatio * 100).toFixed(1)}%</strong>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Radius Roda Kanan' : 'Right Wheel Ratio'}</span>
          <strong className="text-cyan-400">{(rightWheelRadiusRatio * 100).toFixed(1)}%</strong>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-1">
        <div className="space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">{isId ? 'Perbedaan Radius Roda Kiri / Kanan:' : 'Left/Right Wheel Radius Error:'}</span>
            <strong className="text-cyan-400">{((leftWheelRadiusRatio - 1) * 100).toFixed(1)}% / {((rightWheelRadiusRatio - 1) * 100).toFixed(1)}%</strong>
          </div>
          <input
            type="range"
            min="0.95"
            max="1.05"
            step="0.01"
            value={leftWheelRadiusRatio}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setLeftWheelRadiusRatio(val);
              setRightWheelRadiusRatio(2.0 - val);
            }}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">{isId ? 'Derau Selip Roda Acak (Slip Noise):' : 'Random Wheel Slip Stochastic Noise:'}</span>
            <strong className="text-amber-400">{(slipNoise * 100).toFixed(1)}%</strong>
          </div>
          <input
            type="range"
            min="0.0"
            max="0.05"
            step="0.005"
            value={slipNoise}
            onChange={(e) => setSlipNoise(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            isSimulating
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isSimulating ? (isId ? 'Jeda' : 'Pause') : (isId ? 'Mulai Simulasi' : 'Run Drive')}</span>
        </button>

        <button
          onClick={resetSim}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
