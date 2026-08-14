'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, Move, RotateCcw, AlertOctagon, CheckCircle2 } from 'lucide-react';

export function HolonomicConstraintSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mode, setMode] = useState<'non-holonomic' | 'holonomic'>('non-holonomic');
  const [robotPose, setRobotPose] = useState({ x: 280, y: 160, theta: 0.4 });
  const [joystickDir, setJoystickDir] = useState<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const [isDriving, setIsDriving] = useState(false);

  // Command updates
  const handleDrive = useCallback(
    (cmdVx: number, cmdVy: number) => {
      setRobotPose((prev) => {
        const dt = 0.08;
        if (mode === 'holonomic') {
          // Holonomic: can move instantaneously in any 2D vector direction
          return {
            x: Math.max(30, Math.min(570, prev.x + cmdVx * 30 * dt)),
            y: Math.max(30, Math.min(290, prev.y + cmdVy * 30 * dt)),
            theta: prev.theta,
          };
        } else {
          // Non-holonomic: Velocity is constrained to robot heading direction [cos(theta), sin(theta)]^T
          // Lateral velocity is STRICTLY ZERO: -x_dot * sin(theta) + y_dot * cos(theta) = 0
          const headingX = Math.cos(prev.theta);
          const headingY = Math.sin(prev.theta);

          // Project commanded joystick onto allowed heading
          const v_forward = cmdVx * headingX + cmdVy * headingY;

          // Angular steering velocity
          const v_steer = -cmdVx * headingY + cmdVy * headingX;
          const omega = v_steer * 0.8;

          const newTheta = prev.theta + omega * dt;
          const newX = prev.x + v_forward * Math.cos(newTheta) * 30 * dt;
          const newY = prev.y + v_forward * Math.sin(newTheta) * 30 * dt;

          return {
            x: Math.max(30, Math.min(570, newX)),
            y: Math.max(30, Math.min(290, newY)),
            theta: newTheta,
          };
        }
      });
    },
    [mode]
  );

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

    // Grid
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

    const { x, y, theta } = robotPose;

    // Draw Velocity Admissibility Cone / Arrows
    ctx.save();
    ctx.translate(x, y);

    if (mode === 'holonomic') {
      // 360-degree velocity allowance circle
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(0, 0, 55, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      // 4 Omni arrows
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * 45, Math.sin(a) * 45);
        ctx.stroke();
      }
    } else {
      // Non-holonomic: strictly 1D tangent line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);

      // Forbidden sideways motion line
      ctx.beginPath();
      ctx.moveTo(-Math.sin(theta) * 55, Math.cos(theta) * 55);
      ctx.lineTo(Math.sin(theta) * 55, -Math.cos(theta) * 55);
      ctx.stroke();
      ctx.setLineDash([]);

      // Allowed forward/reverse tangent line
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-Math.cos(theta) * 45, -Math.sin(theta) * 45);
      ctx.lineTo(Math.cos(theta) * 45, Math.sin(theta) * 45);
      ctx.stroke();
    }

    // Draw Robot Body
    ctx.rotate(theta);

    // Chassis Box
    ctx.fillStyle = mode === 'holonomic' ? '#065f46' : '#1e293b';
    ctx.strokeStyle = mode === 'holonomic' ? '#10b981' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.fillRect(-22, -16, 44, 32);
    ctx.strokeRect(-22, -16, 44, 32);

    // Wheels
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(-12, -20, 24, 4); // Left wheel
    ctx.strokeRect(-12, -20, 24, 4);
    ctx.fillRect(-12, 16, 24, 4);  // Right wheel
    ctx.strokeRect(-12, 16, 24, 4);

    // Heading nose
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(16, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [robotPose, mode]);

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
              {mode === 'non-holonomic'
                ? (isId ? 'Kendala Non-Holonomik (Roda Diferensial / Mobil)' : 'Non-Holonomic Motion Constraint Simulator')
                : (isId ? 'Sistem Holonomik Penuh (Roda Mecanum / Omni)' : 'Holonomic Omnidirectional Simulator')}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Bandingkan bagaimana robot diferensial terkunci pada satu garis singgung dan tidak dapat meluncur ke samping secara instan.'
                : 'Experience why differential drive robots cannot slide sideways instantaneously due to Pfaffian no-slip constraints.'}
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === 'non-holonomic' ? 'holonomic' : 'non-holonomic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              mode === 'non-holonomic'
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}
          >
            {mode === 'non-holonomic' ? 'Mode: Non-Holonomic (Unicycle)' : 'Mode: Holonomic (Omni / Mecanum)'}
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={320} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Interactive Direction Pad */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
        <div className="space-y-1">
          <span className="text-[11px] text-slate-400 font-mono block">{isId ? 'Kontrol Kemudi Gerak Robot:' : 'Interactive Directional Pad:'}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDrive(0, -1)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200"
            >
              ▲ {isId ? 'Maju' : 'Forward'}
            </button>
            <button
              onClick={() => handleDrive(0, 1)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200"
            >
              ▼ {isId ? 'Mundur' : 'Reverse'}
            </button>
            <button
              onClick={() => handleDrive(-1, 0)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200"
            >
              ◄ {isId ? 'Kiri' : 'Left'}
            </button>
            <button
              onClick={() => handleDrive(1, 0)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200"
            >
              ► {isId ? 'Kanan' : 'Right'}
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <span className="text-[10px] text-slate-500 block">{isId ? 'Persamaan Kendala Pfaffian:' : 'Pfaffian Constraint Equation:'}</span>
          <strong className="text-cyan-400">
            {mode === 'non-holonomic' ? '-ẋ·sin(θ) + ẏ·cos(θ) = 0' : 'Rank(A) = 0 (Unconstrained)'}
          </strong>
        </div>
      </div>
    </div>
  );
}
