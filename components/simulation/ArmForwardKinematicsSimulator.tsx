'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Layers, RotateCcw, Sparkles } from 'lucide-react';

export function ArmForwardKinematicsSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Link Lengths (pixels)
  const [L1, setL1] = useState(130);
  const [L2, setL2] = useState(100);

  // Joint Angles (degrees)
  const [q1_deg, setQ1_deg] = useState(35);
  const [q2_deg, setQ2_deg] = useState(45);

  const [showWorkspace, setShowWorkspace] = useState(true);

  // Math Forward Kinematics
  const q1_rad = (q1_deg * Math.PI) / 180;
  const q2_rad = (q2_deg * Math.PI) / 180;

  // Joint 1: Base Origin (0, 0)
  // Joint 2: Elbow
  const elbowX = L1 * Math.cos(q1_rad);
  const elbowY = L1 * Math.sin(q1_rad);

  // Joint 3: End Effector
  const endX = elbowX + L2 * Math.cos(q1_rad + q2_rad);
  const endY = elbowY + L2 * Math.sin(q1_rad + q2_rad);

  // Reachable Workspace Bounds
  const rMax = L1 + L2;
  const rMin = Math.abs(L1 - L2);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2 - 30;
    const originY = height / 2 + 50;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Technical Grid
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

    // Reachable Workspace Annulus (Donut area)
    if (showWorkspace) {
      ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);

      // Outer boundary circle R_max
      ctx.beginPath();
      ctx.arc(originX, originY, rMax, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Inner boundary circle R_min
      if (rMin > 0) {
        ctx.beginPath();
        ctx.arc(originX, originY, rMin, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Base Frame Axes
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 45, originY);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - 45);
    ctx.stroke();

    // Link 1 (Cyan Solid Bar)
    const j1_canvas = { x: originX, y: originY };
    const j2_canvas = { x: originX + elbowX, y: originY - elbowY };
    const j3_canvas = { x: originX + endX, y: originY - endY };

    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(j1_canvas.x, j1_canvas.y);
    ctx.lineTo(j2_canvas.x, j2_canvas.y);
    ctx.stroke();

    // Link 2 (Amber Solid Bar)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(j2_canvas.x, j2_canvas.y);
    ctx.lineTo(j3_canvas.x, j3_canvas.y);
    ctx.stroke();

    // Joint 1: Base Joint
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(j1_canvas.x, j1_canvas.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Joint 2: Elbow Joint
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(j2_canvas.x, j2_canvas.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Joint 3: End Effector
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(j3_canvas.x, j3_canvas.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#f8fafc';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('Base (0,0)', j1_canvas.x - 30, j1_canvas.y + 22);
    ctx.fillText(`Elbow (${elbowX.toFixed(0)}, ${elbowY.toFixed(0)})`, j2_canvas.x + 10, j2_canvas.y - 10);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText(`End-Effector (${endX.toFixed(1)}, ${endY.toFixed(1)})`, j3_canvas.x + 10, j3_canvas.y - 10);
  }, [L1, L2, q1_rad, q2_rad, elbowX, elbowY, endX, endY, rMax, rMin, showWorkspace]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Kinematika Maju Lengan Robot 2-DOF' : '2-DOF Planar Arm Forward Kinematics Lab'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Ubah sudut sendi (q₁, q₂) dan panjang segmen (L₁, L₂) untuk menghitung posisi ujung lengan (x_EE, y_EE).'
                : 'Adjust joint angles (q1, q2) and link lengths (L1, L2) to compute the analytical end-effector coordinates.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setL1(130);
            setL2(100);
            setQ1_deg(35);
            setQ2_deg(45);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={320} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Telemetry Display Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">
            {isId ? 'Posisi Ujung Lengan (End-Effector x, y)' : 'End-Effector Pose (x_EE, y_EE)'}
          </span>
          <div className="flex items-baseline gap-3 pt-1">
            <div>
              <span className="text-[10px] text-slate-500 block">x_EE</span>
              <strong className="text-xl font-bold text-emerald-400">{endX.toFixed(1)} px</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">y_EE</span>
              <strong className="text-xl font-bold text-emerald-400">{endY.toFixed(1)} px</strong>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">
            {isId ? 'Batas Ruang Kerja (Workspace Reach)' : 'Reachable Workspace Limits'}
          </span>
          <div className="flex items-baseline gap-4 pt-1">
            <div>
              <span className="text-[10px] text-slate-500 block">R_max (L1+L2)</span>
              <strong className="text-base font-bold text-cyan-400">{rMax} px</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">R_min (|L1-L2|)</span>
              <strong className="text-base font-bold text-slate-300">{rMin} px</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Sudut Sendi 1 (q₁):' : 'Joint 1 Angle (q1):'}</span>
            <strong className="text-cyan-400">{q1_deg}°</strong>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={q1_deg}
            onChange={(e) => setQ1_deg(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Sudut Sendi 2 (q₂):' : 'Joint 2 Angle (q2):'}</span>
            <strong className="text-amber-400">{q2_deg}°</strong>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={q2_deg}
            onChange={(e) => setQ2_deg(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}
