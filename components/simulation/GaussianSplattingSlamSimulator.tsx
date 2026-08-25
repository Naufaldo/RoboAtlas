'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Layers, Eye, Sliders } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface GaussianSplat {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  rot: number; // 2D rotation angle
  r: number;
  g: number;
  b: number;
  alpha: number;
}

export function GaussianSplattingSlamSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [cameraAngle, setCameraAngle] = useState(0.4); // orbit angle
  const [renderMode, setRenderMode] = useState<'splats' | 'ellipsoids'>('splats');
  const [gaussianCount, setGaussianCount] = useState(60);

  // Initialize random 3D Gaussian clusters representing a room geometry
  const initGaussians = (count: number): GaussianSplat[] => {
    const list: GaussianSplat[] = [];
    // Floor Gaussians
    for (let i = 0; i < count / 3; i++) {
      list.push({
        x: (Math.random() - 0.5) * 4.0,
        y: -1.2,
        z: (Math.random() - 0.5) * 4.0,
        sx: 0.35 + Math.random() * 0.2,
        sy: 0.06,
        sz: 0.35 + Math.random() * 0.2,
        rot: Math.random() * Math.PI,
        r: 50 + Math.floor(Math.random() * 30),
        g: 80 + Math.floor(Math.random() * 40),
        b: 130 + Math.floor(Math.random() * 50),
        alpha: 0.75,
      });
    }
    // Wall and Object Gaussians
    for (let i = count / 3; i < count; i++) {
      const isChair = i % 2 === 0;
      list.push({
        x: isChair ? 0.8 + (Math.random() - 0.5) * 0.6 : -1.2 + (Math.random() - 0.5) * 1.5,
        y: isChair ? -0.4 + (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 1.6,
        z: isChair ? 0.2 + (Math.random() - 0.5) * 0.6 : 1.2 + (Math.random() - 0.5) * 1.2,
        sx: 0.15 + Math.random() * 0.2,
        sy: 0.2 + Math.random() * 0.25,
        sz: 0.15 + Math.random() * 0.2,
        rot: Math.random() * Math.PI,
        r: isChair ? 230 + Math.floor(Math.random() * 25) : 30 + Math.floor(Math.random() * 30),
        g: isChair ? 140 + Math.floor(Math.random() * 30) : 180 + Math.floor(Math.random() * 40),
        b: isChair ? 40 : 200 + Math.floor(Math.random() * 55),
        alpha: 0.85,
      });
    }
    return list;
  };

  const [gaussians, setGaussians] = useState<GaussianSplat[]>(() => initGaussians(60));

  const handleReset = () => {
    setCameraAngle(0.4);
    setGaussians(initGaussians(gaussianCount));
  };

  const handleDensify = () => {
    // Add 20 refined Gaussians in high-detail areas
    setGaussians((prev) => [
      ...prev,
      ...initGaussians(20).map((g) => ({ ...g, sx: g.sx * 0.6, sy: g.sy * 0.6, sz: g.sz * 0.6 })),
    ]);
  };

  useEffect(() => {
    let animId: number;

    const render = () => {
      if (isRunning) {
        setCameraAngle((a) => a + 0.005);
      }

      // Draw onto Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;

          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, width, height);

          // Pinhole camera projection parameters
          const fov = 350;
          const cx = width / 2;
          const cy = height / 2;

          const cosCam = Math.cos(cameraAngle);
          const sinCam = Math.sin(cameraAngle);

          // Project each 3D Gaussian to 2D Screen
          const projected = gaussians.map((g) => {
            // Camera orbit transform
            const camX = g.x * cosCam - g.z * sinCam;
            const camZ = g.x * sinCam + g.z * cosCam + 3.8; // camera depth offset
            const camY = g.y + 0.3;

            const scaleProj = fov / Math.max(0.2, camZ);
            const pxX = cx + camX * scaleProj;
            const pxY = cy - camY * scaleProj;

            const radius2DX = g.sx * scaleProj;
            const radius2DY = g.sy * scaleProj;

            return {
              ...g,
              pxX,
              pxY,
              camZ,
              radius2DX,
              radius2DY,
            };
          });

          // Sort back-to-front (alpha blending ordering)
          projected.sort((a, b) => b.camZ - a.camZ);

          for (const splat of projected) {
            if (splat.camZ <= 0.2) continue;

            if (renderMode === 'splats') {
              // Volumetric Alpha Gaussian Splat (Radial Gradient)
              const grad = ctx.createRadialGradient(
                splat.pxX,
                splat.pxY,
                0,
                splat.pxX,
                splat.pxY,
                Math.max(4, splat.radius2DX)
              );
              grad.addColorStop(0, `rgba(${splat.r}, ${splat.g}, ${splat.b}, ${splat.alpha})`);
              grad.addColorStop(0.6, `rgba(${splat.r}, ${splat.g}, ${splat.b}, ${splat.alpha * 0.4})`);
              grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(splat.pxX, splat.pxY, Math.max(4, splat.radius2DX), 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Wireframe 3D Covariance Ellipsoid Boundary
              ctx.strokeStyle = `rgba(${splat.r}, ${splat.g}, ${splat.b}, 0.8)`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.ellipse(
                splat.pxX,
                splat.pxY,
                Math.max(3, splat.radius2DX),
                Math.max(2, splat.radius2DY),
                splat.rot,
                0,
                Math.PI * 2
              );
              ctx.stroke();

              ctx.fillStyle = `rgb(${splat.r}, ${splat.g}, ${splat.b})`;
              ctx.beginPath();
              ctx.arc(splat.pxX, splat.pxY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, cameraAngle, renderMode, gaussians]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Eye className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              3D Gaussian Splatting SLAM (3DGS-SLAM) & Radiance Field Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time differentiable rasterization of 3D anisotropic Gaussians <InlineMath latex="\mathbf{\Sigma} = \mathbf{R}\mathbf{S}\mathbf{S}^T\mathbf{R}^T" /> projected via <InlineMath latex="\mathbf{\Sigma}' = \mathbf{J}\mathbf{W}\mathbf{\Sigma}\mathbf{W}^T\mathbf{J}^T" />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Render Mode Toggle */}
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setRenderMode('splats')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                renderMode === 'splats' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              Photometric Splats
            </button>
            <button
              onClick={() => setRenderMode('ellipsoids')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                renderMode === 'ellipsoids' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              Covariance Ellipsoids
            </button>
          </div>

          <button
            onClick={handleDensify}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 font-mono text-xs font-bold hover:bg-purple-500/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Densify Splats</span>
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Orbit'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[400px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className="w-full h-full object-contain"
        />

        {/* Live HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Active 3D Gaussians:</span>
            <span className="text-cyan-400 font-bold">{gaussians.length}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Rendering FPS:</span>
            <span className="text-emerald-400 font-bold">60.0 FPS</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Rasterizer:</span>
            <span className="text-amber-400 font-bold">EWA 2D Tile Splatter</span>
          </div>
        </div>
      </div>

      {/* Camera Orbit Slider */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span>Camera Orbit Viewpoint Angle:</span>
          <span className="text-cyan-400 font-bold">{((cameraAngle * 180) / Math.PI % 360).toFixed(1)}°</span>
        </div>
        <input
          type="range"
          min="0"
          max={Math.PI * 2}
          step="0.05"
          value={cameraAngle % (Math.PI * 2)}
          onChange={(e) => {
            setIsRunning(false);
            setCameraAngle(parseFloat(e.target.value));
          }}
          className="w-48 accent-cyan-500"
        />
      </div>
    </div>
  );
}
