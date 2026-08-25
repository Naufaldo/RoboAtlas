'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Terminal, Cpu, Sliders } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface Point2D {
  x: number;
  y: number;
}

export function DiffusionPolicyVlaSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [taskPrompt, setTaskPrompt] = useState<'pick_place' | 'pour' | 'wipe'>('pick_place');
  const [diffusionStep, setDiffusionStep] = useState(16); // 16 (noisy) to 0 (clean trajectory)
  const maxDiffusionSteps = 16;

  // Ground truth optimal trajectory waypoints for tasks
  const getCleanTrajectory = (task: string): Point2D[] => {
    if (task === 'pick_place') {
      return [
        { x: 120, y: 280 },
        { x: 140, y: 200 },
        { x: 200, y: 140 },
        { x: 280, y: 120 },
        { x: 380, y: 150 },
        { x: 460, y: 230 },
        { x: 500, y: 290 },
      ];
    } else if (task === 'pour') {
      return [
        { x: 140, y: 270 },
        { x: 220, y: 180 },
        { x: 300, y: 110 },
        { x: 370, y: 130 },
        { x: 420, y: 180 },
        { x: 450, y: 260 },
      ];
    } else {
      // S-curve wipe
      return [
        { x: 120, y: 180 },
        { x: 200, y: 120 },
        { x: 280, y: 240 },
        { x: 360, y: 130 },
        { x: 440, y: 240 },
        { x: 520, y: 180 },
      ];
    }
  };

  // Trajectory with noise level proportional to diffusionStep
  const [noisyTrajectory, setNoisyTrajectory] = useState<Point2D[]>([]);

  useEffect(() => {
    const clean = getCleanTrajectory(taskPrompt);
    const noiseScale = (diffusionStep / maxDiffusionSteps) * 90;
    const noisy = clean.map((pt, idx) => ({
      x: pt.x + (Math.sin(idx * 4.7 + diffusionStep) * noiseScale),
      y: pt.y + (Math.cos(idx * 3.2 + diffusionStep) * noiseScale),
    }));
    setNoisyTrajectory(noisy);
  }, [taskPrompt, diffusionStep]);

  const handleReset = () => {
    setIsRunning(false);
    setDiffusionStep(maxDiffusionSteps);
  };

  const handleDenoiseStep = () => {
    setDiffusionStep((k) => Math.max(0, k - 1));
  };

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (isRunning && time - lastTime > 160) {
        lastTime = time;
        setDiffusionStep((k) => {
          if (k <= 0) {
            setIsRunning(false);
            return 0;
          }
          return k - 1;
        });
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

          // Workstation table
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(60, 310, width - 120, 20);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.strokeRect(60, 310, width - 120, 20);

          // Target Object & Destination Bin
          if (taskPrompt === 'pick_place') {
            // Source Cube (Cyan)
            ctx.fillStyle = '#06b6d4';
            ctx.fillRect(105, 280, 30, 30);
            ctx.fillStyle = '#ffffff';
            ctx.font = '9px monospace';
            ctx.fillText('OBJ', 110, 298);

            // Goal Bin (Emerald)
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.strokeRect(485, 275, 45, 35);
            ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
            ctx.fillRect(485, 275, 45, 35);
            ctx.fillStyle = '#10b981';
            ctx.fillText('BIN', 498, 296);
          }

          // Draw Denoising Action Trajectory
          if (noisyTrajectory.length > 1) {
            const isClean = diffusionStep === 0;
            ctx.strokeStyle = isClean ? '#10b981' : 'rgba(245, 158, 11, 0.8)';
            ctx.lineWidth = isClean ? 3.5 : 2;
            ctx.beginPath();
            ctx.moveTo(noisyTrajectory[0].x, noisyTrajectory[0].y);
            for (let i = 1; i < noisyTrajectory.length; i++) {
              ctx.lineTo(noisyTrajectory[i].x, noisyTrajectory[i].y);
            }
            ctx.stroke();

            // Draw Trajectory Action Waypoints
            for (let i = 0; i < noisyTrajectory.length; i++) {
              const pt = noisyTrajectory[i];
              ctx.fillStyle = isClean ? '#10b981' : '#f59e0b';
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, isClean ? 5 : 3.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // Draw Robot Manipulator Arm
          const base = { x: 300, y: 310 };
          const targetPt = noisyTrajectory[Math.min(noisyTrajectory.length - 1, 2)] || { x: 200, y: 200 };

          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(base.x, base.y);
          ctx.lineTo(base.x - 40, base.y - 120);
          ctx.lineTo(targetPt.x, targetPt.y);
          ctx.stroke();

          // Arm Joints
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(base.x, base.y, 8, 0, Math.PI * 2);
          ctx.arc(base.x - 40, base.y - 120, 6, 0, Math.PI * 2);
          ctx.arc(targetPt.x, targetPt.y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, taskPrompt, noisyTrajectory, diffusionStep]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Vision-Language-Action (VLA) & Diffusion Policy Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Denoises random Gaussian action noise <InlineMath latex="\mathbf{a}_K \sim \mathcal{N}(\mathbf{0}, \mathbf{I})" /> into smooth continuous multi-modal trajectories conditioned on text prompt <InlineMath latex="\mathbf{c}_{\text{lang}}" />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Prompt Selector */}
          <select
            value={taskPrompt}
            onChange={(e) => {
              setTaskPrompt(e.target.value as any);
              setDiffusionStep(maxDiffusionSteps);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-700"
          >
            <option value="pick_place">Pick cube and place in bin</option>
            <option value="pour">Pour liquid avoiding obstacle</option>
            <option value="wipe">Wipe table in S-curve</option>
          </select>

          <button
            onClick={handleDenoiseStep}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 font-mono text-xs font-bold hover:bg-purple-500/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step Denoise</span>
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
            <span>{isRunning ? 'Pause' : 'Auto Denoise'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Noise</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          className="w-full h-full object-contain"
        />

        {/* Live HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Diffusion Step (k):</span>
            <span className="text-cyan-400 font-bold">{diffusionStep} / {maxDiffusionSteps}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Trajectory State:</span>
            <span className={`font-bold ${diffusionStep === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {diffusionStep === 0 ? 'CLEAN ACTION POLICY' : 'DENOISING NOISE...'}
            </span>
          </div>
        </div>

        {/* Prompt banner */}
        <div className="absolute bottom-3 left-3 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Prompt:</span>
          <span className="text-slate-100 font-bold">
            &quot;{taskPrompt === 'pick_place' ? 'Pick cube and place in bin' : taskPrompt === 'pour' ? 'Pour liquid avoiding obstacle' : 'Wipe table in S-curve'}&quot;
          </span>
        </div>
      </div>
    </div>
  );
}
