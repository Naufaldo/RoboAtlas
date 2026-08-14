import React from 'react';
import { KinematicsSimulator } from '@/components/simulation/KinematicsSimulator';
import { MathBlock } from '@/components/mathematics/MathBlock';
import { Compass, Sparkles, CheckCircle2, Code2, BookOpen, Layers } from 'lucide-react';

export default function FundamentalsPage() {
  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Milestone 1 • Domain Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Robotics Fundamentals & Kinematics
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Master the foundational mathematical representations of mobile robotics: $SE(2)$ rigid body transformations, unicycle forward kinematics, and differential-drive wheel velocities.
        </p>
      </div>

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive SE(2) Kinematics Workstation</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            60 FPS Client-Side Engine
          </span>
        </div>
        <KinematicsSimulator />
      </div>

      {/* 2. Mathematical Rigor & KaTeX Formulations */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold border-b border-slate-800/80 pb-3">
          <BookOpen className="w-4 h-4" />
          <span>Mathematical Formulation</span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">1. Unicycle Differential-Drive Kinematics</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            The state of a planar robot in the Special Euclidean group $SE(2)$ is defined by position $(x, y)$ and heading angle $\theta$:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="\begin{bmatrix} \dot{x} \\ \dot{y} \\ \dot{\theta} \end{bmatrix} = \begin{bmatrix} \cos\theta & 0 \\ \sin\theta & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} v \\ \omega \end{bmatrix}"
              title="Continuous State Kinematic Derivative"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200">2. Wheel Speed Mapping</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Given left and right wheel linear velocities $v_L, v_R$ and axle wheelbase $L$:
          </p>
          <div className="mt-3">
            <MathBlock
              latex="v = \frac{v_R + v_L}{2}, \quad \omega = \frac{v_R - v_L}{L}, \quad R_{ICC} = \frac{L}{2} \left( \frac{v_R + v_L}{v_R - v_L} \right)"
              title="Instantaneous Center of Curvature (ICC)"
            />
          </div>
        </div>
      </div>

      {/* 3. Pure TypeScript Engine Implementation */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
            <Code2 className="w-4 h-4" />
            <span>Pure TypeScript Implementation</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Deterministic • Zero Dependencies</span>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
{`export interface Pose2D {
  x: number;
  y: number;
  theta: number;
}

export function integrateDifferentialDrive(
  pose: Pose2D,
  vL: number,
  vR: number,
  wheelbase: number,
  dt: number
): Pose2D {
  const v = (vR + vL) / 2;
  const omega = (vR - vL) / wheelbase;

  if (Math.abs(omega) < 1e-6) {
    return {
      x: pose.x + v * Math.cos(pose.theta) * dt,
      y: pose.y + v * Math.sin(pose.theta) * dt,
      theta: pose.theta,
    };
  }

  const dTheta = omega * dt;
  const iccR = v / omega;

  return {
    x: pose.x - iccR * Math.sin(pose.theta) + iccR * Math.sin(pose.theta + dTheta),
    y: pose.y + iccR * Math.cos(pose.theta) - iccR * Math.cos(pose.theta + dTheta),
    theta: (pose.theta + dTheta + Math.PI) % (2 * Math.PI) - Math.PI,
  };
}`}
        </pre>
      </div>
    </div>
  );
}
