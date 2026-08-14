'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Users, Sliders, Crosshair, Sparkles } from 'lucide-react';
import { wrapToPi } from '@/lib/math/vector2d';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

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

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isId = locale === 'id';

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

  const updateTargetPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    state.current.target = {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    updateTargetPos(e.clientX, e.clientY);
  };

  const handleTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      updateTargetPos(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Formation offsets relative to leader (agent 0)
  const getFormationOffset = useCallback(
    (index: number, shape: 'v_shape' | 'circle' | 'line') => {
      if (index === 0) return { dx: 0, dy: 0 };

      if (shape === 'v_shape') {
        const side = index % 2 === 0 ? 1 : -1;
        const rank = Math.ceil(index / 2);
        return {
          dx: -rank * 32,
          dy: side * rank * 24,
        };
      } else if (shape === 'circle') {
        const angle = (index / (agentCount - 1)) * 2 * Math.PI;
        const R = 60;
        return {
          dx: Math.cos(angle) * R,
          dy: Math.sin(angle) * R,
        };
      } else {
        // Line
        return {
          dx: -index * 26,
          dy: 0,
        };
      }
    },
    [agentCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    const isLight = theme === 'light';

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const { agents, target } = state.current;

      if (isRunning && agents.length > 0) {
        // 1. Leader Agent (ID 0) tracks target
        const leader = agents[0];
        const ldx = target.x - leader.x;
        const ldy = target.y - leader.y;
        const lDist = Math.hypot(ldx, ldy);

        if (lDist > 6) {
          const lAngle = Math.atan2(ldy, ldx);
          leader.theta = lAngle;
          leader.x += Math.cos(lAngle) * Math.min(80, lDist * 2.2) * dt;
          leader.y += Math.sin(lAngle) * Math.min(80, lDist * 2.2) * dt;
        }

        // 2. Followers (Formation, Consensus, or Flocking)
        for (let i = 1; i < agents.length; i++) {
          const a = agents[i];

          if (mode === 'formation') {
            // Leader-Follower formation maintenance
            const off = getFormationOffset(i, formationShape);
            // Rotate offset by leader's heading
            const cosL = Math.cos(leader.theta);
            const sinL = Math.sin(leader.theta);
            const targetX = leader.x + (off.dx * cosL - off.dy * sinL);
            const targetY = leader.y + (off.dx * sinL + off.dy * cosL);

            const dx = targetX - a.x;
            const dy = targetY - a.y;
            const dist = Math.hypot(dx, dy);

            // Proportional feedback control to target slot
            const kP = 3.5;
            a.vx = dx * kP;
            a.vy = dy * kP;

            // Collision avoidance between neighbors
            for (let j = 0; j < agents.length; j++) {
              if (i === j) continue;
              const ox = a.x - agents[j].x;
              const oy = a.y - agents[j].y;
              const od = Math.hypot(ox, oy);
              if (od < 26 && od > 0.01) {
                a.vx += (ox / od) * (26 - od) * 6;
                a.vy += (oy / od) * (26 - od) * 6;
              }
            }

            a.x += a.vx * dt;
            a.y += a.vy * dt;
            a.theta = Math.atan2(a.vy, a.vx);
          } else if (mode === 'consensus') {
            // Graph Laplacian Consensus Rendezvous (Decentralized average)
            let avgX = 0;
            let avgY = 0;
            let neighbors = 0;
            const commR = 140;

            for (let j = 0; j < agents.length; j++) {
              if (i === j) continue;
              const d = Math.hypot(agents[j].x - a.x, agents[j].y - a.y);
              if (d < commR) {
                avgX += agents[j].x - a.x;
                avgY += agents[j].y - a.y;
                neighbors++;
              }
            }

            if (neighbors > 0) {
              const gamma = 1.8;
              a.x += (avgX / neighbors) * gamma * dt;
              a.y += (avgY / neighbors) * gamma * dt;
              a.theta = Math.atan2(avgY, avgX);
            }
          } else {
            // Reynolds Boids Flocking (Cohesion, Alignment, Separation)
            let cohX = 0, cohY = 0;
            let alignVx = 0, alignVy = 0;
            let sepX = 0, sepY = 0;
            let count = 0;

            for (let j = 0; j < agents.length; j++) {
              if (i === j) continue;
              const d = Math.hypot(agents[j].x - a.x, agents[j].y - a.y);
              if (d < 100) {
                cohX += agents[j].x;
                cohY += agents[j].y;
                alignVx += agents[j].vx;
                alignVy += agents[j].vy;
                count++;
                if (d < 30 && d > 0.01) {
                  sepX += (a.x - agents[j].x) / d;
                  sepY += (a.y - agents[j].y) / d;
                }
              }
            }

            if (count > 0) {
              cohX = (cohX / count - a.x) * 0.8;
              cohY = (cohY / count - a.y) * 0.8;
              alignVx = (alignVx / count - a.vx) * 0.5;
              alignVy = (alignVy / count - a.vy) * 0.5;
              sepX *= 15;
              sepY *= 15;

              a.vx += (cohX + alignVx + sepX) * dt * 8;
              a.vy += (cohY + alignVy + sepY) * dt * 8;
            }

            // Move towards leader
            const tdx = leader.x - a.x;
            const tdy = leader.y - a.y;
            a.vx += tdx * 0.4 * dt;
            a.vy += tdy * 0.4 * dt;

            // Clamp velocity
            const spd = Math.hypot(a.vx, a.vy);
            if (spd > 70) {
              a.vx = (a.vx / spd) * 70;
              a.vy = (a.vy / spd) * 70;
            }

            a.x += a.vx * dt;
            a.y += a.vy * dt;
            a.theta = Math.atan2(a.vy, a.vx);
          }
        }
      }

      // RENDER
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = isLight ? '#f1f5f9' : '#050811';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = isLight ? 'rgba(203, 213, 225, 0.6)' : 'rgba(51, 65, 85, 0.25)';
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

      // Inter-Agent Mesh Communication Links
      if (showNetwork) {
        const commRange = 90;
        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(6, 182, 212, 0.25)';
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

        ctx.fillStyle = a.id === 0 ? '#f59e0b' : (isLight ? '#0284c7' : '#00f2fe');
        ctx.fill();
        ctx.strokeStyle = isLight ? '#ffffff' : '#090d16';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, formationShape, mode, showNetwork, agentCount, getFormationOffset, theme]);

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Users className="w-4 h-4" />
          <span>{isId ? 'Koordinasi Kawanan & Konsensus Graph Laplacian' : 'Swarm Coordination & Graph Laplacian Consensus'}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>
            {isId ? 'Agent Aktif:' : 'Active Agents:'} <strong className="text-cyan-600 dark:text-cyan-400">{agentCount}</strong>
          </span>
          <span>
            {isId ? 'Leader Robot:' : 'Leader Agent:'} <strong className="text-amber-600 dark:text-amber-400">ID 0 (Gold)</strong>
          </span>
        </div>
      </div>

      {/* Canvas with Mobile Touch Support */}
      <div className="relative aspect-[16/9] w-full max-h-[340px] bg-[#f1f5f9] dark:bg-[#050811] cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={520}
          height={320}
          onClick={handleCanvasClick}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          className="w-full h-full block"
        />

        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60 pointer-events-none flex items-center gap-1.5 shadow-md">
          <Crosshair className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>{isId ? 'Klik/Sentuh layar untuk mengarahkan formasi' : 'Tap/Click anywhere to redirect swarm formation'}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Swarm Mode */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">{isId ? 'Protokol:' : 'Protocol:'}</span>
            <div className="flex bg-slate-200 dark:bg-slate-950 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
              <button
                onClick={() => setMode('formation')}
                className={`px-3 py-1 rounded transition-all ${
                  mode === 'formation'
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Leader Formation
              </button>
              <button
                onClick={() => setMode('consensus')}
                className={`px-3 py-1 rounded transition-all ${
                  mode === 'consensus'
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Laplacian Rendezvous
              </button>
              <button
                onClick={() => setMode('flocking')}
                className={`px-3 py-1 rounded transition-all ${
                  mode === 'flocking'
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Boids Flocking
              </button>
            </div>
          </div>

          {/* Formation Shape (if in formation mode) */}
          {mode === 'formation' && (
            <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-950 p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-[11px]">
              <span className="text-slate-500 px-1">{isId ? 'Bentuk:' : 'Shape:'}</span>
              {(['v_shape', 'circle', 'line'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFormationShape(s)}
                  className={`px-2 py-0.5 rounded capitalize transition-all ${
                    formationShape === s
                      ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
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
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/40'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? (isId ? 'Jeda' : 'Pause') : (isId ? 'Lanjutkan' : 'Resume')}
            </button>

            <button
              onClick={resetSwarm}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {isId ? 'Acak Kawanan' : 'Scramble Swarm'}
            </button>

            <button
              onClick={() => setShowNetwork(!showNetwork)}
              className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                showNetwork
                  ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
            >
              {isId ? 'Tampilkan Garis Mesh' : 'Toggle Mesh Graph'}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {isId ? 'Graf komunikasi terdesentralisasi memandu konsensus tanpa master kontrol pusat.' : 'Decentralized communication graph drives consensus without centralized master authority.'}
          </div>
        </div>
      </div>
    </div>
  );
}
