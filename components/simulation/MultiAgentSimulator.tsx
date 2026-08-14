'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Users, Sliders, Crosshair, Sparkles } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';

interface Agent {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  theta: number;
}

export function MultiAgentSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<'consensus' | 'formation' | 'flocking'>('formation');
  const [formationShape, setFormationShape] = useState<'v_shape' | 'circle' | 'line'>('v_shape');
  const [agentCount, setAgentCount] = useState(14);
  const [showNetwork, setShowNetwork] = useState(true);

  const state = useRef({
    agents: [] as Agent[],
    target: { x: 260, y: 160 },
  });

  const resetSwarm = useCallback(() => {
    const agents: Agent[] = [];
    for (let i = 0; i < agentCount; i++) {
      agents.push({
        id: i,
        x: Math.random() * 400 + 60,
        y: Math.random() * 200 + 60,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        theta: (Math.random() - 0.5) * Math.PI,
      });
    }
    state.current.agents = agents;
    state.current.target = { x: 260, y: 160 };
  }, [agentCount]);

  useEffect(() => {
    resetSwarm();
  }, [agentCount, resetSwarm]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    state.current.target = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastFrame = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastFrame) / 1000, 0.1);
      lastFrame = time;

      const { agents, target } = state.current;

      if (isRunning) {
        if (mode === 'consensus') {
          // Graph Laplacian Rendezvous Consensus: dot(x_i) = -sum_{j in N_i} (x_i - x_j) + k * (target - x_i)
          const kGain = 1.2;
          const commRange = 130;

          for (let i = 0; i < agents.length; i++) {
            const ai = agents[i];
            let fx = (target.x - ai.x) * 0.4;
            let fy = (target.y - ai.y) * 0.4;

            for (let j = 0; j < agents.length; j++) {
              if (i === j) continue;
              const aj = agents[j];
              const dist = Math.hypot(aj.x - ai.x, aj.y - ai.y);

              if (dist < commRange) {
                // Laplacian consensus pull
                fx += (aj.x - ai.x) * 0.6;
                fy += (aj.y - ai.y) * 0.6;

                // Collision repulsion
                if (dist < 28) {
                  fx -= (aj.x - ai.x) * (28 - dist) * 1.5;
                  fy -= (aj.y - ai.y) * (28 - dist) * 1.5;
                }
              }
            }

            ai.vx = ai.vx * 0.85 + fx * dt * 4;
            ai.vy = ai.vy * 0.85 + fy * dt * 4;
            ai.x += ai.vx * dt * 30;
            ai.y += ai.vy * dt * 30;
            ai.theta = Math.atan2(ai.vy, ai.vx);
          }
        } else if (mode === 'formation') {
          // Leader-Follower Geometric Offsets
          for (let i = 0; i < agents.length; i++) {
            const ai = agents[i];
            let desiredX = target.x;
            let desiredY = target.y;

            if (formationShape === 'v_shape') {
              const row = Math.floor((i + 1) / 2);
              const side = i % 2 === 0 ? 1 : -1;
              desiredX = target.x - row * 26;
              desiredY = target.y + side * row * 24;
            } else if (formationShape === 'circle') {
              const angle = (i / agents.length) * 2 * Math.PI;
              const r = 70;
              desiredX = target.x + Math.cos(angle) * r;
              desiredY = target.y + Math.sin(angle) * r;
            } else {
              // Line
              const offset = (i - agents.length / 2) * 26;
              desiredX = target.x;
              desiredY = target.y + offset;
            }

            const fx = (desiredX - ai.x) * 3.5;
            const fy = (desiredY - ai.y) * 3.5;

            ai.vx = ai.vx * 0.85 + fx * dt * 5;
            ai.vy = ai.vy * 0.85 + fy * dt * 5;
            ai.x += ai.vx * dt * 25;
            ai.y += ai.vy * dt * 25;
            ai.theta = Math.atan2(ai.vy, ai.vx);
          }
        } else {
          // Boids Flocking (Separation, Alignment, Cohesion)
          const neighborDist = 90;
          const separationDist = 25;

          for (let i = 0; i < agents.length; i++) {
            const ai = agents[i];
            let sepX = 0, sepY = 0;
            let alignX = 0, alignY = 0;
            let cohX = 0, cohY = 0;
            let neighbors = 0;

            for (let j = 0; j < agents.length; j++) {
              if (i === j) continue;
              const aj = agents[j];
              const d = Math.hypot(aj.x - ai.x, aj.y - ai.y);

              if (d < neighborDist) {
                neighbors++;
                alignX += aj.vx;
                alignY += aj.vy;
                cohX += aj.x;
                cohY += aj.y;

                if (d < separationDist) {
                  sepX -= (aj.x - ai.x) / (d + 0.001);
                  sepY -= (aj.y - ai.y) / (d + 0.001);
                }
              }
            }

            let fx = (target.x - ai.x) * 0.35 + sepX * 18;
            let fy = (target.y - ai.y) * 0.35 + sepY * 18;

            if (neighbors > 0) {
              alignX /= neighbors;
              alignY /= neighbors;
              cohX /= neighbors;
              cohY /= neighbors;

              fx += (alignX - ai.vx) * 0.5 + (cohX - ai.x) * 0.3;
              fy += (alignY - ai.vy) * 0.5 + (cohY - ai.y) * 0.3;
            }

            ai.vx = ai.vx * 0.9 + fx * dt * 6;
            ai.vy = ai.vy * 0.9 + fy * dt * 6;
            ai.x += ai.vx * dt * 30;
            ai.y += ai.vy * dt * 30;
            ai.theta = Math.atan2(ai.vy, ai.vx);
          }
        }
      }

      // Drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Communication Network Mesh Graph (Graph Laplacian Edges)
      if (showNetwork) {
        const commRange = 110;
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i < agents.length; i++) {
          for (let j = i + 1; j < agents.length; j++) {
            const d = Math.hypot(agents[i].x - agents[j].x, agents[i].y - agents[j].y);
            if (d < commRange) {
              ctx.beginPath();
              ctx.moveTo(agents[i].x, agents[i].y);
              ctx.lineTo(agents[j].x, agents[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Target Pin
      ctx.beginPath();
      ctx.arc(target.x, target.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(target.x, target.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // Swarm Agents
      for (const a of agents) {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.theta);

        // Arrow shape
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-7, -6);
        ctx.lineTo(-4, 0);
        ctx.lineTo(-7, 6);
        ctx.closePath();

        ctx.fillStyle = a.id === 0 ? '#f59e0b' : '#00f2fe';
        ctx.fill();
        ctx.strokeStyle = '#090d16';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, formationShape, mode, showNetwork]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Users className="w-4 h-4" />
          <span>Swarm Coordination & Graph Laplacian Consensus</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span>
            Active Agents: <strong className="text-cyan-400">{agentCount}</strong>
          </span>
          <span>
            Leader Agent: <strong className="text-amber-400">ID 0 (Gold)</strong>
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#050811] cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={520}
          height={320}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-700/60 pointer-events-none flex items-center gap-1.5 shadow-md">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click anywhere to redirect swarm formation</span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Swarm Mode */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Protocol:</span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setMode('formation')}
                className={`px-3 py-1 rounded transition-all ${
                  mode === 'formation'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Leader Formation
              </button>
              <button
                onClick={() => setMode('consensus')}
                className={`px-3 py-1 rounded transition-all ${
                  mode === 'consensus'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Laplacian Rendezvous
              </button>
              <button
                onClick={() => setMode('flocking')}
                className={`px-3 py-1 rounded transition-all ${
                  mode === 'flocking'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Boids Flocking
              </button>
            </div>
          </div>

          {/* Formation Shape (if in formation mode) */}
          {mode === 'formation' && (
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <span className="text-slate-500 px-1">Shape:</span>
              {(['v_shape', 'circle', 'line'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFormationShape(s)}
                  className={`px-2 py-0.5 rounded capitalize transition-all ${
                    formationShape === s
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                isRunning
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Pause' : 'Resume'}
            </button>

            <button
              onClick={resetSwarm}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Scramble Swarm
            </button>

            <button
              onClick={() => setShowNetwork(!showNetwork)}
              className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                showNetwork
                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
            >
              Toggle Mesh Graph
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Decentralized communication graph drives consensus without centralized master authority.
          </div>
        </div>
      </div>
    </div>
  );
}
