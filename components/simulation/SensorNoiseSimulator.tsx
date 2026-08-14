'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Activity, RefreshCw, Sparkles, Compass } from 'lucide-react';

export function SensorNoiseSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [trueDistance, setTrueDistance] = useState(3.0); // True distance in meters
  const [noiseSigma, setNoiseSigma] = useState(0.25);    // Standard deviation in meters
  const [samples, setSamples] = useState<number[]>([]);

  // Generate 50 noisy sensor readings from Gaussian distribution
  const generateSamples = () => {
    const newSamples: number[] = [];
    for (let i = 0; i < 60; i++) {
      // Box-Muller transform for standard normal sample
      const u1 = Math.random() || 0.0001;
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const measured = trueDistance + z0 * noiseSigma;
      newSamples.push(Math.max(0.1, measured));
    }
    setSamples(newSamples);
  };

  useEffect(() => {
    generateSamples();
  }, [trueDistance, noiseSigma]);

  // Render 60 FPS Gaussian PDF and Histogram Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, width, height);

    // Coordinate ranges: Distance from 0 to 6 meters
    const minX = 0;
    const maxX = 6;
    const toCanvasX = (d: number) => ((d - minX) / (maxX - minX)) * (width - 60) + 30;
    const baseY = height - 40;

    // Axis line
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, baseY);
    ctx.lineTo(width - 30, baseY);
    ctx.stroke();

    // Axis tick marks
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono';
    for (let d = 0; d <= 6; d += 1) {
      const x = toCanvasX(d);
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.lineTo(x, baseY + 5);
      ctx.stroke();
      ctx.fillText(`${d}m`, x - 8, baseY + 18);
    }

    // Draw Histogram Bars
    const binCount = 30;
    const binWidth = (maxX - minX) / binCount;
    const bins = new Array(binCount).fill(0);

    samples.forEach((s) => {
      const binIdx = Math.floor((s - minX) / binWidth);
      if (binIdx >= 0 && binIdx < binCount) {
        bins[binIdx]++;
      }
    });

    const maxBin = Math.max(...bins, 1);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
    ctx.lineWidth = 1;

    bins.forEach((count, idx) => {
      const dStart = minX + idx * binWidth;
      const x1 = toCanvasX(dStart);
      const x2 = toCanvasX(dStart + binWidth);
      const barH = (count / maxBin) * (height - 90);
      ctx.fillRect(x1, baseY - barH, x2 - x1 - 1, barH);
      ctx.strokeRect(x1, baseY - barH, x2 - x1 - 1, barH);
    });

    // Draw Theoretical Gaussian PDF Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let px = 30; px <= width - 30; px += 2) {
      const d = minX + ((px - 30) / (width - 60)) * (maxX - minX);
      const exponent = -((d - trueDistance) ** 2) / (2 * noiseSigma * noiseSigma);
      const pdf = (1 / (noiseSigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);

      // Scale PDF for visualization
      const curveY = baseY - pdf * (height - 90) * (noiseSigma * 0.8);
      if (px === 30) ctx.moveTo(px, curveY);
      else ctx.lineTo(px, curveY);
    }
    ctx.stroke();

    // True Distance Landmark Marker
    const trueX = toCanvasX(trueDistance);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(trueX, 20);
    ctx.lineTo(trueX, baseY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText(`True: ${trueDistance.toFixed(1)}m`, trueX - 30, 16);
  }, [trueDistance, noiseSigma, samples]);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Simulator Derau Gaussian Sensor LiDAR / Sonar' : 'Gaussian Sensor Noise & Measurement Model Simulator'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Visualisasi kurva probabilitas Gaussian p(z|x) dan sebaran sampel acak pada sensor robot fisik.'
                : 'Interactive Gaussian probability distribution p(z|x) and noisy sensor sample histogram.'}
            </p>
          </div>
        </div>

        <button
          onClick={generateSamples}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isId ? 'Ambil Sampel Baru' : 'Sample Readings'}</span>
        </button>
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={280} className="w-full max-w-2xl h-auto" />
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">{isId ? 'Jarak Rintangan Nyata (True Distance):' : 'True Obstacle Distance:'}</span>
            <strong className="text-amber-500">{trueDistance.toFixed(2)} m</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="5.5"
            step="0.1"
            value={trueDistance}
            onChange={(e) => setTrueDistance(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">{isId ? 'Standar Deviasi Derau (Noise σ):' : 'Sensor Noise (Std Dev σ):'}</span>
            <strong className="text-cyan-400">±{noiseSigma.toFixed(2)} m</strong>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.80"
            step="0.02"
            value={noiseSigma}
            onChange={(e) => setNoiseSigma(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}
