'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Users, Sliders, Activity, Sparkles } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

interface SwarmAgent {
  id: number;
  isLeader: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

export function FormationControlSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [formationShape, setFormationShape] = useState<'triangle' | 'line' | 'wedge'>('triangle');
  const [formationScale, setFormationScale] = useState(65);
  const [formationGain, setFormationGain] = useState(1.8);
  const [targetPos, setTargetPos] = useState({ x: 320, y: 190 });

  // Initial Swarm agents: 1 Leader (id 0) + 4 Followers (id 1..4)
  const [agents, setAgents] = useState<SwarmAgent[]>([
    { id: 0, isLeader: true, x: 300, y: 150, vx: 0, vy: 0, color: '#f59e0b' },
    { id: 1, isLeader: false, x: 220, y: 220, vx: 0, vy: 0, color: '#06b6d4' },
    { id: 2, isLeader: false, x: 380, y: 220, vx: 0, vy: 0, color: '#06b6d4' },
    { id: 3, isLeader: false, x: 160, y: 290, vx: 0, vy: 0, color: '#3b82f6' },
    { id: 4, isLeader: false, x: 440, y: 290, vx: 0, vy: 0, color: '#3b82f6' },
  ]);

  // Relative offset vectors d_i relative to leader
  const getFormationOffsets = (shape: string, d: number) => {
    if (shape === 'triangle') {
      return [
        { dx: 0, dy: -d * 0.7 },      // Leader
        { dx: -d, dy: d * 0.4 },     // Left Wing 1
        { dx: d, dy: d * 0.4 },      // Right Wing 1
        { dx: -d * 2, dy: d * 1.3 }, // Left Wing 2
        { dx: d * 2, dy: d * 1.3 },  // Right Wing 2
      ];
    } else if (shape === 'line') {
      return [
        { dx: 0, dy: 0 },
        { dx: -d, dy: 0 },
        { dx: d, dy: 0 },
        { dx: -d * 2, dy: 0 },
        { dx: d * 2, dy: 0 },
      ];
    } else {
      // Wedge / V formation
      return [
        { dx: 0, dy: -d },
        { dx: -d * 0.8, dy: 0 },
        { dx: d * 0.8, dy: 0 },
        { dx: -d * 1.6, dy: d },
        { dx: d * 1.6, dy: d },
      ];
    }
  };

  const handleReset = () => {
    setTargetPos({ x: 320, y: 190 });
    setAgents([
      { id: 0, isLeader: true, x: 300, y: 150, vx: 0, vy: 0, color: '#f59e0b' },
      { id: 1, isLeader: false, x: 220, y: 220, vx: 0, vy: 0, color: '#06b6d4' },
      { id: 2, isLeader: false, x: 380, y: 220, vx: 0, vy: 0, color: '#06b6d4' },
      { id: 3, isLeader: false, x: 160, y: 290, vx: 0, vy: 0, color: '#3b82f6' },
      { id: 4, isLeader: false, x: 440, y: 290, vx: 0, vy: 0, color: '#3b82f6' },
    ]);
  };

  // Swarm Physics & Laplacian Formation Dynamics Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isRunning) {
        setAgents((prevAgents) => {
          const leader = prevAgents[0];
          const offsets = getFormationOffsets(formationShape, formationScale);

          // 1. Leader moves toward target waypoint
          const leaderKp = 2.0;
          const leaderKv = 1.2;
          const leaderFx = leaderKp * (targetPos.x - leader.x) - leaderKv * leader.vx;
          const leaderFy = leaderKp * (targetPos.y - leader.y) - leaderKv * leader.vy;

          const updatedLeader: SwarmAgent = {
            ...leader,
            vx: leader.vx + leaderFx * dt,
            vy: leader.vy + leaderFy * dt,
            x: leader.x + leader.vx * dt,
            y: leader.y + leader.vy * dt,
          };

          // 2. Followers update via Laplacian Consensus & Leader-Follower tracking
          const updatedFollowers = prevAgents.slice(1).map((agent, idx) => {
            const agentIdx = idx + 1;
            const desiredOffset = offsets[agentIdx];
            const desiredX = updatedLeader.x + desiredOffset.dx;
            const desiredY = updatedLeader.y + desiredOffset.dy;

            // Tracking error to desired formation position
            const ex = desiredX - agent.x;
            const ey = desiredY - agent.y;

            // Inter-agent collision repulsion
            let repX = 0;
            let repY = 0;
            for (let j = 0; j < prevAgents.length; j++) {
              if (j === agentIdx) continue;
              const other = prevAgents[j];
              const distSq = (agent.x - other.x) ** 2 + (agent.y - other.y) ** 2;
              if (distSq < 30 * 30 && distSq > 1e-4) {
                const dist = Math.sqrt(distSq);
                repX += ((agent.x - other.x) / dist) * (30 - dist) * 2.5;
                repY += ((agent.y - other.y) / dist) * (30 - dist) * 2.5;
              }
            }

            const ax = formationGain * ex - 1.5 * agent.vx + repX;
            const ay = formationGain * ey - 1.5 * agent.vy + repY;

            const nVx = agent.vx + ax * dt;
            const nVy = agent.vy + ay * dt;
            return {
              ...agent,
              vx: nVx,
              vy: nVy,
              x: agent.x + nVx * dt,
              y: agent.y + nVy * dt,
            };
          });

          return [updatedLeader, ...updatedFollowers];
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

          // Grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 1;
          for (let x = 0; x < width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 0; y < height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          // Target Waypoint crosshair
          ctx.strokeStyle = '#ec4899';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(targetPos.x, targetPos.y, 10, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(targetPos.x - 14, targetPos.y);
          ctx.lineTo(targetPos.x + 14, targetPos.y);
          ctx.moveTo(targetPos.x, targetPos.y - 14);
          ctx.lineTo(targetPos.x, targetPos.y + 14);
          ctx.stroke();
          ctx.fillStyle = '#ec4899';
          ctx.font = '9px monospace';
          ctx.fillText('Target Waypoint', targetPos.x + 12, targetPos.y + 3);

          // 1. Draw Swarm Communication Network Links (Graph Laplacian Edges)
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          for (let i = 0; i < agents.length; i++) {
            for (let j = i + 1; j < agents.length; j++) {
              const d = Math.hypot(agents[i].x - agents[j].x, agents[i].y - agents[j].y);
              if (d < formationScale * 2.2) {
                ctx.beginPath();
                ctx.moveTo(agents[i].x, agents[i].y);
                ctx.lineTo(agents[j].x, agents[j].y);
                ctx.stroke();
              }
            }
          }
          ctx.setLineDash([]);

          // 2. Draw Swarm Agents
          for (const ag of agents) {
            ctx.fillStyle = ag.color;
            ctx.strokeStyle = ag.isLeader ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = ag.isLeader ? 2.5 : 1.5;

            ctx.beginPath();
            ctx.arc(ag.x, ag.y, ag.isLeader ? 11 : 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Heading velocity vector
            ctx.strokeStyle = ag.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(ag.x, ag.y);
            ctx.lineTo(ag.x + ag.vx * 0.4, ag.y + ag.vy * 0.4);
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px monospace';
            ctx.fillText(ag.isLeader ? 'L' : `F${ag.id}`, ag.x - 4, ag.y + 3);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, formationShape, formationScale, formationGain, targetPos, agents]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    setTargetPos({ x: clickX, y: clickY });
  };

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Multi-Agent Formation Control & Leader-Follower Swarm Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click on canvas to redirect leader <InlineMath latex="\mathbf{p}_0" />. Followers track formation offsets via graph Laplacian consensus <InlineMath latex="\dot{\mathbf{p}}_i = \dot{\mathbf{p}}_0 - k_p(\mathbf{p}_i - \mathbf{p}_0 - \mathbf{d}_{i0})" />.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Shape Selector */}
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFormationShape('triangle')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                formationShape === 'triangle' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              Triangle
            </button>
            <button
              onClick={() => setFormationShape('wedge')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                formationShape === 'wedge' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              V-Wedge
            </button>
            <button
              onClick={() => setFormationShape('line')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                formationShape === 'line' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              Line
            </button>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Play'}</span>
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
      <div className="relative w-full aspect-[16/10] max-h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          onClick={handleCanvasClick}
          className="w-full h-full object-contain"
        />

        {/* Live HUD */}
        <div className="absolute top-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1.5 text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Swarm Size:</span>
            <span className="text-cyan-400 font-bold">5 Autonomous Agents</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Control Mode:</span>
            <span className="text-amber-400 font-bold">Leader-Follower Flocking</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Inter-Agent Comm:</span>
            <span className="text-emerald-400 font-bold">Graph Laplacian (L = D - A)</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Formation Spacing Distance (<InlineMath latex="d" />):</span>
            <span className="text-cyan-400 font-bold">{formationScale} px</span>
          </div>
          <input
            type="range"
            min="40"
            max="110"
            step="5"
            value={formationScale}
            onChange={(e) => setFormationScale(parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Consensus Formation Gain (<InlineMath latex="k_p" />):</span>
            <span className="text-cyan-400 font-bold">{formationGain.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="4.0"
            step="0.1"
            value={formationGain}
            onChange={(e) => setFormationGain(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}
