'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Compass, RotateCw, Sliders, Box, Eye } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

export function SpatialRotation3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rollDeg, setRollDeg] = useState(25); // Roll (around X)
  const [pitchDeg, setPitchDeg] = useState(30); // Pitch (around Y)
  const [yawDeg, setYawDeg] = useState(45); // Yaw (around Z)
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const roll = (rollDeg * Math.PI) / 180;
  const pitch = (pitchDeg * Math.PI) / 180;
  const yaw = (yawDeg * Math.PI) / 180;

  // 3D rotation matrix (ZYX Euler angles convention)
  // R = Rz(yaw) * Ry(pitch) * Rx(roll)
  const cr = Math.cos(roll), sr = Math.sin(roll);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const cy = Math.cos(yaw), sy = Math.sin(yaw);

  const r11 = cy * cp;
  const r12 = cy * sp * sr - sy * cr;
  const r13 = cy * sp * cr + sy * sr;

  const r21 = sy * cp;
  const r22 = sy * sp * sr + cy * cr;
  const r23 = sy * sp * cr - cy * sr;

  const r31 = -sp;
  const r32 = cp * sr;
  const r33 = cp * cr;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isLight = theme === 'light';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = isLight ? '#f1f5f9' : '#050811';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy_pos = canvas.height / 2;
    const axisLen = 95;

    // Isometric projection mapping: (x, y, z) -> (screenX, screenY)
    const project = (x: number, y: number, z: number) => {
      const isoX = (x - y) * Math.cos(Math.PI / 6);
      const isoY = (x + y) * Math.sin(Math.PI / 6) - z;
      return {
        sx: cx + isoX,
        sy: cy_pos + isoY,
      };
    };

    // 1. Draw World Reference Frame {W} (Faint dashed lines)
    const wOrigin = project(0, 0, 0);
    const wx = project(axisLen * 0.7, 0, 0);
    const wy = project(0, axisLen * 0.7, 0);
    const wz = project(0, 0, axisLen * 0.7);

    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);

    // W_X
    ctx.beginPath();
    ctx.moveTo(wOrigin.sx, wOrigin.sy);
    ctx.lineTo(wx.sx, wx.sy);
    ctx.strokeStyle = isLight ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.35)';
    ctx.stroke();

    // W_Y
    ctx.beginPath();
    ctx.moveTo(wOrigin.sx, wOrigin.sy);
    ctx.lineTo(wy.sx, wy.sy);
    ctx.stroke();

    // W_Z
    ctx.beginPath();
    ctx.moveTo(wOrigin.sx, wOrigin.sy);
    ctx.lineTo(wz.sx, wz.sy);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Transformed Robot / Body Frame {B} Axes
    // X_body unit vector = (r11, r21, r31)
    const bx = project(r11 * axisLen, r21 * axisLen, r31 * axisLen);
    // Y_body unit vector = (r12, r22, r32)
    const by = project(r12 * axisLen, r22 * axisLen, r32 * axisLen);
    // Z_body unit vector = (r13, r23, r33)
    const bz = project(r13 * axisLen, r23 * axisLen, r33 * axisLen);

    // X Axis (Red)
    ctx.beginPath();
    ctx.moveTo(wOrigin.sx, wOrigin.sy);
    ctx.lineTo(bx.sx, bx.sy);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.fillText('X_b (Roll)', bx.sx + 4, bx.sy + 4);

    // Y Axis (Green)
    ctx.beginPath();
    ctx.moveTo(wOrigin.sx, wOrigin.sy);
    ctx.lineTo(by.sx, by.sy);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.fillText('Y_b (Pitch)', by.sx + 4, by.sy + 4);

    // Z Axis (Cyan/Blue)
    ctx.beginPath();
    ctx.moveTo(wOrigin.sx, wOrigin.sy);
    ctx.lineTo(bz.sx, bz.sy);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('Z_b (Yaw)', bz.sx + 4, bz.sy - 4);

    // Origin point
    ctx.beginPath();
    ctx.arc(wOrigin.sx, wOrigin.sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
  }, [rollDeg, pitchDeg, yawDeg, r11, r12, r13, r21, r22, r23, r31, r32, r33, theme]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Box className="w-4 h-4" />
          <span>{isId ? 'Simulator Rotasi 3D SO(3) & Sudut Euler (Roll, Pitch, Yaw)' : '3D SO(3) Rotation & Euler Angle Simulator'}</span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          R = R_z(ψ) · R_y(θ) · R_x(φ)
        </span>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[300px] bg-[#f1f5f9] dark:bg-[#050811]">
        <canvas ref={canvasRef} width={520} height={300} className="w-full h-full block" />

        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-mono space-y-1 text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#f43f5e]" />
            <span>X_body (Roll φ)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#10b981]" />
            <span>Y_body (Pitch θ)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#06b6d4]" />
            <span>Z_body (Yaw ψ)</span>
          </div>
        </div>
      </div>

      {/* 3x3 SO(3) Matrix & Sliders */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs font-mono">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Live Matrix */}
          <div className="md:col-span-6 bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 block mb-1.5">
              {isId ? 'Matriks Rotasi 3D R ∈ SO(3):' : '3D Rotation Matrix R in SO(3):'}
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold py-1 bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
              <span className="text-rose-600 dark:text-rose-400">{r11.toFixed(2)}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{r12.toFixed(2)}</span>
              <span className="text-cyan-600 dark:text-cyan-400">{r13.toFixed(2)}</span>
              <span className="text-rose-600 dark:text-rose-400">{r21.toFixed(2)}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{r22.toFixed(2)}</span>
              <span className="text-cyan-600 dark:text-cyan-400">{r23.toFixed(2)}</span>
              <span className="text-rose-600 dark:text-rose-400">{r31.toFixed(2)}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{r32.toFixed(2)}</span>
              <span className="text-cyan-600 dark:text-cyan-400">{r33.toFixed(2)}</span>
            </div>
          </div>

          <div className="md:col-span-6 bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner space-y-1.5 text-[11px]">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">
              {isId ? 'Sifat Aljabar SO(3):' : 'SO(3) Algebraic Properties:'}
            </span>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>{isId ? 'Ortogonalitas' : 'Orthogonality'}:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">R^T · R = I_3</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>{isId ? 'Determinan' : 'Determinant'}:</span>
              <strong className="text-cyan-600 dark:text-cyan-400">det(R) = +1.00</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>{isId ? 'Invers Rotasi' : 'Rotation Inverse'}:</span>
              <strong className="text-amber-600 dark:text-amber-400">R^(-1) = R^T</strong>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span>Roll φ (Around X):</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">{rollDeg}°</span>
            </div>
            <input
              type="range"
              min={-180}
              max={180}
              value={rollDeg}
              onChange={(e) => setRollDeg(parseInt(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span>Pitch θ (Around Y):</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{pitchDeg}°</span>
            </div>
            <input
              type="range"
              min={-90}
              max={90}
              value={pitchDeg}
              onChange={(e) => setPitchDeg(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span>Yaw ψ (Around Z):</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">{yawDeg}°</span>
            </div>
            <input
              type="range"
              min={-180}
              max={180}
              value={yawDeg}
              onChange={(e) => setYawDeg(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
