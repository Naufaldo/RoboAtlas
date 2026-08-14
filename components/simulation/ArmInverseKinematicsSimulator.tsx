'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Layers, RotateCcw, Crosshair, Sparkles } from 'lucide-react';

export function ArmInverseKinematicsSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Link Lengths (pixels)
  const L1 = 130;
  const L2 = 100;

  // Target end-effector coordinates (relative to origin)
  const [target, setTarget] = useState({ x: 150, y: 90 });
  const [isElbowUp, setIsElbowUp] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Inverse Kinematics via Law of Cosines
  // Distance squared from base to target
  const rSq = target.x * target.x + target.y * target.y;
  const r = Math.sqrt(rSq);
  const rMax = L1 + L2;
  const rMin = Math.abs(L1 - L2);

  const isReachable = r <= rMax && r >= rMin;

  // Law of Cosines for q2:
  // r^2 = L1^2 + L2^2 - 2*L1*L2*cos(180 - q2) = L1^2 + L2^2 + 2*L1*L2*cos(q2)
  // cos(q2) = (r^2 - L1^2 - L2^2) / (2 * L1 * L2)
  const cosQ2 = Math.max(-1, Math.min(1, (rSq - L1 * L1 - L2 * L2) / (2 * L1 * L2)));
  const sinQ2 = Math.sqrt(Math.max(0, 1 - cosQ2 * cosQ2)) * (isElbowUp ? 1 : -1);
  const q2_rad = Math.atan2(sinQ2, cosQ2);

  // Angle to target beta = atan2(y, x)
  const beta = Math.atan2(target.y, target.x);
  // Angle inside triangle psi = atan2(L2*sin(q2), L1 + L2*cos(q2))
  const psi = Math.atan2(L2 * sinQ2, L1 + L2 * cosQ2);
  const q1_rad = beta - psi;

  const q1_deg = (q1_rad * 180) / Math.PI;
  const q2_deg = (q2_rad * 180) / Math.PI;

  // Actual End-Effector position from FK (for verification)
  const elbowX = L1 * Math.cos(q1_rad);
  const elbowY = L1 * Math.sin(q1_rad);
  const fkEndX = elbowX + L2 * Math.cos(q1_rad + q2_rad);
  const fkEndY = elbowY + L2 * Math.sin(q1_rad + q2_rad);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2 - 20;
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

    // Reachable Workspace Donut
    ctx.fillStyle = 'rgba(6, 182, 212, 0.04)';
    ctx.strokeStyle = isReachable ? 'rgba(6, 182, 212, 0.3)' : 'rgba(239, 68, 68, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);

    ctx.beginPath();
    ctx.arc(originX, originY, rMax, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    if (rMin > 0) {
      ctx.beginPath();
      ctx.arc(originX, originY, rMin, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Base Axes
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

    const j1_canvas = { x: originX, y: originY };
    const j2_canvas = { x: originX + elbowX, y: originY - elbowY };
    const j3_canvas = { x: originX + fkEndX, y: originY - fkEndY };
    const target_canvas = { x: originX + target.x, y: originY - target.y };

    if (isReachable) {
      // Link 1 (Cyan)
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(j1_canvas.x, j1_canvas.y);
      ctx.lineTo(j2_canvas.x, j2_canvas.y);
      ctx.stroke();

      // Link 2 (Amber)
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
      ctx.arc(j3_canvas.x, j3_canvas.y, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Target Reticle (Glowing Emerald Crosshair if reachable, Red if out of workspace)
    ctx.strokeStyle = isReachable ? '#10b981' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(target_canvas.x, target_canvas.y, 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(target_canvas.x - 14, target_canvas.y);
    ctx.lineTo(target_canvas.x + 14, target_canvas.y);
    ctx.moveTo(target_canvas.x, target_canvas.y - 14);
    ctx.lineTo(target_canvas.x, target_canvas.y + 14);
    ctx.stroke();

    // Labels
    ctx.fillStyle = isReachable ? '#10b981' : '#ef4444';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText(
      isReachable
        ? `Target (${target.x.toFixed(0)}, ${target.y.toFixed(0)})`
        : `Unreachable Target (${target.x.toFixed(0)}, ${target.y.toFixed(0)})`,
      target_canvas.x + 14,
      target_canvas.y - 10
    );
  }, [target, isElbowUp, isReachable, elbowX, elbowY, fkEndX, fkEndY, rMax, rMin]);

  const handleInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2 - 20;
    const originY = height / 2 + 50;

    const x = ((clientX - rect.left) / rect.width) * width - originX;
    const y = originY - ((clientY - rect.top) / rect.height) * height; // math coords (Y up)
    setTarget({ x, y });
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Crosshair className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Kinematika Invers (IK) Lengan 2-DOF' : '2-DOF Planar Arm Inverse Kinematics Lab'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Geser target crosshair di dalam kanvas untuk menghitung sudut motor (q₁, q₂) menggunakan Hukum Kosinus.'
                : 'Drag the target reticle around the canvas to solve joint motor angles (q1, q2) using the Law of Cosines.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsElbowUp(!isElbowUp)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              isElbowUp
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
            }`}
          >
            {isElbowUp ? (isId ? 'Cabang: Siku-Atas (Elbow-Up)' : 'Branch: Elbow-Up') : (isId ? 'Cabang: Siku-Bawah (Elbow-Down)' : 'Branch: Elbow-Down')}
          </button>

          <button
            onClick={() => {
              setTarget({ x: 150, y: 90 });
              setIsElbowUp(true);
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
        <canvas
          ref={canvasRef}
          width={600}
          height={320}
          className="w-full max-w-2xl h-auto cursor-crosshair touch-none"
          onMouseDown={(e) => {
            setIsDragging(true);
            handleInteraction(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => {
            if (isDragging) handleInteraction(e.clientX, e.clientY);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (isDragging) handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={() => setIsDragging(false)}
        />
      </div>

      {/* Telemetry Display Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">
            {isId ? 'Sudut Sendi 1 (q₁ Base)' : 'Joint 1 Angle (q1 Base)'}
          </span>
          <strong className="text-xl font-bold text-cyan-400">
            {isReachable ? `${q1_deg.toFixed(1)}°` : 'NaN'}
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {isReachable ? `(${q1_rad.toFixed(3)} rad)` : (isId ? 'Di luar jangkauan' : 'Outside reach')}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">
            {isId ? 'Sudut Sendi 2 (q₂ Elbow)' : 'Joint 2 Angle (q2 Elbow)'}
          </span>
          <strong className="text-xl font-bold text-amber-400">
            {isReachable ? `${q2_deg.toFixed(1)}°` : 'NaN'}
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {isReachable ? `(${q2_rad.toFixed(3)} rad)` : (isId ? 'Di luar jangkauan' : 'Outside reach')}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">
            {isId ? 'Status Solusi IK' : 'IK Solution Status'}
          </span>
          <strong className={`text-base font-bold ${isReachable ? 'text-emerald-400' : 'text-red-400'}`}>
            {isReachable ? (isId ? '✓ Solusi Valid' : '✓ Solvable Reach') : (isId ? '✗ Singularitas / Di Luar' : '✗ Out of Workspace')}
          </strong>
          <span className="text-[10px] text-slate-500 block">
            Jarak: {r.toFixed(1)} px (Max {rMax} px)
          </span>
        </div>
      </div>
    </div>
  );
}
