'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Box, Sliders, Sparkles } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Point2D {
  x: number;
  y: number;
}

export function RectangleFittingSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [trueAngleDeg, setTrueAngleDeg] = useState(35); // Ground truth heading
  const [searchStepDeg, setSearchStepDeg] = useState(2); // Search resolution
  const [criterion, setCriterion] = useState<'area' | 'variance'>('area');
  const [noiseLevel, setNoiseLevel] = useState(0.08); // Point scatter noise

  // Vehicle ground truth dimensions
  const trueLength = 4.2; // meters
  const trueWidth = 1.8; // meters

  // Generate Synthetic L-Shape Laser Point Cloud
  const generateLPoints = useCallback(() => {
    const points: Point2D[] = [];
    const rad = (trueAngleDeg * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);

    // Front edge points
    const numFront = 25;
    for (let i = 0; i < numFront; i++) {
      const u = (i / numFront - 0.5) * trueWidth;
      const lx = trueLength / 2 + (Math.random() - 0.5) * noiseLevel;
      const ly = u + (Math.random() - 0.5) * noiseLevel;
      points.push({
        x: lx * cosA - ly * sinA,
        y: lx * sinA + ly * cosA,
      });
    }

    // Side edge points
    const numSide = 35;
    for (let i = 0; i < numSide; i++) {
      const v = (i / numSide - 0.5) * trueLength;
      const lx = v + (Math.random() - 0.5) * noiseLevel;
      const ly = -trueWidth / 2 + (Math.random() - 0.5) * noiseLevel;
      points.push({
        x: lx * cosA - ly * sinA,
        y: lx * sinA + ly * cosA,
      });
    }

    return points;
  }, [trueAngleDeg, noiseLevel]);

  const [points, setPoints] = useState<Point2D[]>([]);

  useEffect(() => {
    setPoints(generateLPoints());
  }, [generateLPoints]);

  // Compute Optimal Rectangle Fitting
  const computeBestFit = useCallback(() => {
    if (points.length === 0) return null;

    let bestAngle = 0;
    let bestScore = Infinity;
    let bestBox = { minX: 0, maxX: 0, minY: 0, maxY: 0, length: 0, width: 0, cx: 0, cy: 0 };

    const searchAngles: { angle: number; score: number }[] = [];

    for (let a = 0; a < 90; a += searchStepDeg) {
      const rad = (a * Math.PI) / 180;
      const cosR = Math.cos(-rad);
      const sinR = Math.sin(-rad);

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let sumX = 0, sumY = 0;

      const rotatedPts = points.map((p) => {
        const rx = p.x * cosR - p.y * sinR;
        const ry = p.x * sinR + p.y * cosR;
        if (rx < minX) minX = rx;
        if (rx > maxX) maxX = rx;
        if (ry < minY) minY = ry;
        if (ry > maxY) maxY = ry;
        sumX += rx;
        sumY += ry;
        return { rx, ry };
      });

      const len = maxX - minX;
      const wid = maxY - minY;

      let score = 0;
      if (criterion === 'area') {
        score = len * wid;
      } else {
        // Variance criterion along boundary edges
        const meanX = sumX / points.length;
        const meanY = sumY / points.length;
        const varX = rotatedPts.reduce((acc, p) => acc + (p.rx - meanX) ** 2, 0) / points.length;
        const varY = rotatedPts.reduce((acc, p) => acc + (p.ry - meanY) ** 2, 0) / points.length;
        score = -Math.max(varX, varY); // Min negative variance => max compactness
      }

      searchAngles.push({ angle: a, score });

      if (score < bestScore) {
        bestScore = score;
        bestAngle = a;
        const localCx = (minX + maxX) / 2;
        const localCy = (minY + maxY) / 2;
        // Transform center back to world coordinates
        const cosW = Math.cos(rad);
        const sinW = Math.sin(rad);
        bestBox = {
          minX, maxX, minY, maxY,
          length: len,
          width: wid,
          cx: localCx * cosW - localCy * sinW,
          cy: localCx * sinW + localCy * cosW,
        };
      }
    }

    return { bestAngle, bestBox, searchAngles };
  }, [points, searchStepDeg, criterion]);

  const fitResult = computeBestFit();

  // Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    const worldExtent = 12; // -6m to +6m
    const toCanvasX = (wx: number) => width / 2 + (wx / worldExtent) * width;
    const toCanvasY = (wy: number) => height / 2 - (wy / worldExtent) * height;

    // Grid wireframe
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let g = -6; g <= 6; g += 2) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(g), 0);
      ctx.lineTo(toCanvasX(g), height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(g));
      ctx.lineTo(width, toCanvasY(g));
      ctx.stroke();
    }

    // Draw Laser Points
    ctx.fillStyle = '#06b6d4'; // Cyan points
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(toCanvasX(p.x), toCanvasY(p.y), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Fitted Oriented Bounding Box
    if (fitResult) {
      const { bestAngle, bestBox } = fitResult;
      const rad = (bestAngle * Math.PI) / 180;
      const cosA = Math.cos(rad);
      const sinA = Math.sin(rad);

      // Local 4 corners
      const hL = bestBox.length / 2;
      const hW = bestBox.width / 2;
      const corners = [
        { lx: hL, ly: hW },
        { lx: -hL, ly: hW },
        { lx: -hL, ly: -hW },
        { lx: hL, ly: -hW },
      ];

      // Transform corners to world
      const worldCorners = corners.map((c) => ({
        x: bestBox.cx + c.lx * cosA - c.ly * sinA,
        y: bestBox.cy + c.lx * sinA + c.ly * cosA,
      }));

      // Draw bounding rectangle
      ctx.strokeStyle = '#10b981'; // Emerald
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(worldCorners[0].x), toCanvasY(worldCorners[0].y));
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(toCanvasX(worldCorners[i].x), toCanvasY(worldCorners[i].y));
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center marker
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(toCanvasX(bestBox.cx), toCanvasY(bestBox.cy), 4, 0, Math.PI * 2);
      ctx.fill();

      // Heading axis arrow
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(bestBox.cx), toCanvasY(bestBox.cy));
      ctx.lineTo(
        toCanvasX(bestBox.cx + Math.cos(rad) * 1.5),
        toCanvasY(bestBox.cy + Math.sin(rad) * 1.5)
      );
      ctx.stroke();
    }
  }, [points, fitResult]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Box className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Oriented Rectangle (OBB) & L-Shape Bounding Box Fitting
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sweeps orientation angle <InlineMath latex="\psi \in [0^\circ, 90^\circ]" /> to find minimum enclosing bounding box parameters <InlineMath latex="(L, W, \psi, x_c, y_c)" />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-mono">
            <button
              onClick={() => setCriterion('area')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                criterion === 'area' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Min Area
            </button>
            <button
              onClick={() => setCriterion('variance')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                criterion === 'variance' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Min Variance
            </button>
          </div>
          <button
            onClick={() => setPoints(generateLPoints())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rescatter</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className="w-full h-full object-contain"
        />

        {/* Live Metrics */}
        {fitResult && (
          <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
            <div className="text-emerald-400 font-bold pb-1 border-b border-slate-800">Fitted OBB Parameters:</div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Estimated Heading (<InlineMath latex="\hat{\psi}" />):</span>
              <span className="text-emerald-400 font-bold">{fitResult.bestAngle}°</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Fitted Length (<InlineMath latex="\hat{L}" />):</span>
              <span className="text-cyan-400 font-bold">{fitResult.bestBox.length.toFixed(2)} m</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Fitted Width (<InlineMath latex="\hat{W}" />):</span>
              <span className="text-cyan-400 font-bold">{fitResult.bestBox.width.toFixed(2)} m</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Center (<InlineMath latex="x_c, y_c" />):</span>
              <span className="text-amber-400 font-bold">({fitResult.bestBox.cx.toFixed(2)}, {fitResult.bestBox.cy.toFixed(2)})</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Ground Truth Angle:</span>
            <span className="text-cyan-400 font-bold">{trueAngleDeg}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="89"
            step="1"
            value={trueAngleDeg}
            onChange={(e) => setTrueAngleDeg(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Search Resolution (<InlineMath latex="\Delta\psi" />):</span>
            <span className="text-cyan-400 font-bold">{searchStepDeg}°</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={searchStepDeg}
            onChange={(e) => setSearchStepDeg(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Laser Point Scatter Noise:</span>
            <span className="text-cyan-400 font-bold">{(noiseLevel * 100).toFixed(0)} cm</span>
          </div>
          <input
            type="range"
            min="0.02"
            max="0.25"
            step="0.02"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}
