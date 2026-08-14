'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Activity, RotateCcw, Sliders, AlertTriangle } from 'lucide-react';

export function JacobianSingularitySimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Link Lengths (px)
  const L1 = 120;
  const L2 = 90;

  // Joint Angles (degrees)
  const [q1Deg, setQ1Deg] = useState(30);
  const [q2Deg, setQ2Deg] = useState(45);

  const q1 = (q1Deg * Math.PI) / 180;
  const q2 = (q2Deg * Math.PI) / 180;

  // Jacobian Matrix J = [ J11 J12 ; J21 J22 ]
  // x = L1*cos(q1) + L2*cos(q1+q2)
  // y = L1*sin(q1) + L2*sin(q1+q2)
  const s1 = Math.sin(q1);
  const c1 = Math.cos(q1);
  const s12 = Math.sin(q1 + q2);
  const c12 = Math.cos(q1 + q2);

  const J11 = -L1 * s1 - L2 * s12;
  const J12 = -L2 * s12;
  const J21 = L1 * c1 + L2 * c12;
  const J22 = L2 * c12;

  // Determinant: det(J) = L1 * L2 * sin(q2)
  const detJ = L1 * L2 * Math.sin(q2);
  const absDet = Math.abs(detJ);
  const isSingular = Math.abs(Math.sin(q2)) < 0.08; // close to 0 or 180 deg

  // Manipulability measure w = sqrt(det(J * J^T)) = |det(J)|
  const manipulability = absDet;

  // Positions
  const elbowX = L1 * c1;
  const elbowY = L1 * s1;
  const endX = elbowX + L2 * c12;
  const endY = elbowY + L2 * s12;

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2 - 40;
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

    const j1_c = { x: originX, y: originY };
    const j2_c = { x: originX + elbowX, y: originY - elbowY };
    const j3_c = { x: originX + endX, y: originY - endY };

    // Draw Manipulability / Velocity Ellipsoid at End Effector
    // Generate unit circle in joint velocity space and transform: v = J * q_dot
    ctx.strokeStyle = isSingular ? '#ef4444' : '#22d3ee';
    ctx.fillStyle = isSingular ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 211, 238, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const phi = (i / steps) * 2 * Math.PI;
      const qd1 = Math.cos(phi);
      const qd2 = Math.sin(phi);

      const vx = (J11 * qd1 + J12 * qd2) * 0.35;
      const vy = (J21 * qd1 + J22 * qd2) * 0.35;

      const px = j3_c.x + vx;
      const py = j3_c.y - vy; // math to canvas coords

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Link 1 (Cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(j1_c.x, j1_c.y);
    ctx.lineTo(j2_c.x, j2_c.y);
    ctx.stroke();

    // Link 2 (Amber)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(j2_c.x, j2_c.y);
    ctx.lineTo(j3_c.x, j3_c.y);
    ctx.stroke();

    // Base Joint
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(j1_c.x, j1_c.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Elbow Joint
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(j2_c.x, j2_c.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // End-Effector Tip
    ctx.fillStyle = isSingular ? '#ef4444' : '#10b981';
    ctx.beginPath();
    ctx.arc(j3_c.x, j3_c.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }, [elbowX, elbowY, endX, endY, isSingular, J11, J12, J21, J22]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Matriks Jacobian & Elips Manipulabilitas' : 'Jacobian Matrix & Velocity Ellipse Laboratory'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Putar sudut q₂ mendekati 0° atau 180° untuk mengamati kolapsnya elips kecepatan saat det(J) mendekati nol (singularitas).'
                : 'Sweep angle q2 towards 0° or 180° to watch the velocity ellipse flatten as det(J) vanishes into a kinematic singularity.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setQ1Deg(30);
              setQ2Deg(0); // Snap directly to boundary singularity
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-red-500/15 border border-red-500/40 text-red-400 font-bold hover:bg-red-500/25"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isId ? 'Uji Singularitas (q₂=0°)' : 'Snap Singularity (q2=0°)'}</span>
          </button>

          <button
            onClick={() => {
              setQ1Deg(30);
              setQ2Deg(45);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={280} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Jacobian & Determinant HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 block uppercase font-bold">
            {isId ? 'Matriks Jacobian J(q)' : 'Jacobian Matrix J(q)'}
          </span>
          <div className="text-[11px] text-slate-300 font-mono leading-relaxed">
            [{J11.toFixed(1)}, {J12.toFixed(1)}] <br />
            [{J21.toFixed(1)}, {J22.toFixed(1)}]
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 block uppercase font-bold">
            {isId ? 'Determinan det(J)' : 'Jacobian Determinant det(J)'}
          </span>
          <strong className={`text-xl font-bold ${isSingular ? 'text-red-400' : 'text-amber-400'}`}>
            {detJ.toFixed(0)}
          </strong>
          <span className="text-[10px] text-slate-500 block">det(J) = L₁·L₂·sin(q₂)</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-emerald-400 block uppercase font-bold">
            {isId ? 'Status Singularitas' : 'Singularity Status'}
          </span>
          <strong className={`text-base font-bold ${isSingular ? 'text-red-400' : 'text-emerald-400'}`}>
            {isSingular ? (isId ? '⚠️ Singularitas Kinematik' : '⚠️ Singular Config') : (isId ? '✓ Skalar Manipulabel' : '✓ Full Mobility')}
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {isSingular ? (isId ? 'Kecepatan radial hilang' : 'Radial velocity lost') : (isId ? '2-DOF kecepatan penuh' : 'Full 2-DOF velocity')}
          </span>
        </div>
      </div>

      {/* Angle Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Sudut Pangkal (q₁):' : 'Shoulder Angle (q1):'}</span>
            <strong className="text-cyan-400">{q1Deg}°</strong>
          </div>
          <input
            type="range"
            min="-90"
            max="90"
            step="1"
            value={q1Deg}
            onChange={(e) => setQ1Deg(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Sudut Siku (q₂):' : 'Elbow Angle (q2):'}</span>
            <strong className={isSingular ? 'text-red-400 font-bold' : 'text-amber-400'}>{q2Deg}°</strong>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={q2Deg}
            onChange={(e) => setQ2Deg(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}
