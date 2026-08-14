'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Play, RotateCcw, Crosshair, Sparkles, Layers } from 'lucide-react';

export function ArmKinematicsSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const L1 = 120; // Length of link 1
  const L2 = 95;  // Length of link 2

  const [targetPos, setTargetPos] = useState({ x: 130, y: 90 });
  const [elbowUp, setElbowUp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Compute 2-link analytical inverse kinematics
  const solveIK = useCallback(
    (x: number, y: number, isElbowUp: boolean) => {
      const distSq = x * x + y * y;
      const dist = Math.sqrt(distSq);
      const maxReach = L1 + L2;
      const minReach = Math.abs(L1 - L2);

      let reachable = true;
      let clampedX = x;
      let clampedY = y;

      if (dist > maxReach) {
        reachable = false;
        clampedX = (x / dist) * (maxReach - 0.5);
        clampedY = (y / dist) * (maxReach - 0.5);
      } else if (dist < minReach && minReach > 0) {
        reachable = false;
        clampedX = (x / dist) * (minReach + 0.5);
        clampedY = (y / dist) * (minReach + 0.5);
      }

      const d = (clampedX * clampedX + clampedY * clampedY - L1 * L1 - L2 * L2) / (2 * L1 * L2);
      const clampedD = Math.max(-1, Math.min(1, d));

      const sinTheta2 = Math.sqrt(Math.max(0, 1 - clampedD * clampedD)) * (isElbowUp ? -1 : 1);
      const theta2 = Math.atan2(sinTheta2, clampedD);

      const theta1 =
        Math.atan2(clampedY, clampedX) -
        Math.atan2(L2 * Math.sin(theta2), L1 + L2 * Math.cos(theta2));

      // Forward kinematics verification
      const j1x = L1 * Math.cos(theta1);
      const j1y = L1 * Math.sin(theta1);
      const eeX = j1x + L2 * Math.cos(theta1 + theta2);
      const eeY = j1y + L2 * Math.sin(theta1 + theta2);

      return {
        theta1,
        theta2,
        j1x,
        j1y,
        eeX,
        eeY,
        reachable,
      };
    },
    [L1, L2]
  );

  const ikResult = solveIK(targetPos.x, targetPos.y, elbowUp);

  // Render 60 FPS Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2 + 40;

    // Background
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
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

    // Reachable workspace boundary circle
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(originX, originY, L1 + L2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Transform IK coordinates to Canvas coordinates (Y inverted)
    const baseCanvasX = originX;
    const baseCanvasY = originY;
    const j1CanvasX = originX + ikResult.j1x;
    const j1CanvasY = originY - ikResult.j1y;
    const eeCanvasX = originX + ikResult.eeX;
    const eeCanvasY = originY - ikResult.eeY;
    const targetCanvasX = originX + targetPos.x;
    const targetCanvasY = originY - targetPos.y;

    // Link 1
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(baseCanvasX, baseCanvasY);
    ctx.lineTo(j1CanvasX, j1CanvasY);
    ctx.stroke();

    // Link 2
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(j1CanvasX, j1CanvasY);
    ctx.lineTo(eeCanvasX, eeCanvasY);
    ctx.stroke();

    // Base Joint (Motor 1)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(baseCanvasX, baseCanvasY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Elbow Joint (Motor 2)
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(j1CanvasX, j1CanvasY, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // End-Effector Gripper
    ctx.fillStyle = ikResult.reachable ? '#10b981' : '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(eeCanvasX, eeCanvasY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Target crosshair
    ctx.strokeStyle = ikResult.reachable ? '#f59e0b' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(targetCanvasX, targetCanvasY, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(targetCanvasX - 14, targetCanvasY);
    ctx.lineTo(targetCanvasX + 14, targetCanvasY);
    ctx.moveTo(targetCanvasX, targetCanvasY - 14);
    ctx.lineTo(targetCanvasX, targetCanvasY + 14);
    ctx.stroke();
  }, [ikResult, targetPos, L1, L2]);

  // Mouse / Touch drag handler
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const canvasX = ((clientX - rect.left) / rect.width) * canvas.width;
    const canvasY = ((clientY - rect.top) / rect.height) * canvas.height;

    const originX = canvas.width / 2;
    const originY = canvas.height / 2 + 40;

    const x = canvasX - originX;
    const y = -(canvasY - originY);

    setTargetPos({ x: Math.round(x), y: Math.round(y) });
  };

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
              {isId ? 'Laboratorium Kinematika Lengan Robot 2-DOF' : '2-DOF Robotic Arm Analytical IK Simulator'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Tarik titik target kuning di ruang kerja untuk mengamati solusi analitik sudut sendi (θ₁, θ₂).'
                : 'Drag the yellow target in the workspace to solve analytical joint angles (θ₁, θ₂) in real-time.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setElbowUp(!elbowUp)}
          className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-sm"
        >
          {elbowUp ? (isId ? 'Mode: Siku Atas (Elbow-Up)' : 'Config: Elbow-Up') : (isId ? 'Mode: Siku Bawah (Elbow-Down)' : 'Config: Elbow-Down')}
        </button>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          className="w-full max-w-2xl h-auto cursor-crosshair touch-none"
          onMouseDown={(e) => {
            setIsDragging(true);
            handleCanvasInteraction(e);
          }}
          onMouseMove={(e) => {
            if (isDragging) handleCanvasInteraction(e);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleCanvasInteraction(e);
          }}
          onTouchMove={(e) => {
            if (isDragging) handleCanvasInteraction(e);
          }}
          onTouchEnd={() => setIsDragging(false)}
        />
      </div>

      {/* State Telemetry Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Target (x, y)</span>
          <span className="font-bold text-amber-500">
            ({targetPos.x}, {targetPos.y}) mm
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Joint 1 Angle (θ₁)</span>
          <span className="font-bold text-cyan-400">
            {((ikResult.theta1 * 180) / Math.PI).toFixed(1)}°
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Joint 2 Angle (θ₂)</span>
          <span className="font-bold text-cyan-400">
            {((ikResult.theta2 * 180) / Math.PI).toFixed(1)}°
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 block">Reachability Status</span>
          <span className={`font-bold ${ikResult.reachable ? 'text-emerald-400' : 'text-rose-400'}`}>
            {ikResult.reachable ? (isId ? 'Tercapai (Valid)' : 'In Workspace') : (isId ? 'Di Luar Batas' : 'Out of Reach')}
          </span>
        </div>
      </div>
    </div>
  );
}
