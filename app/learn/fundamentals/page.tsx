import React from 'react';
import { MathBlock, InlineMath } from '@/components/mathematics/MathBlock';
import { Compass, BookOpen, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function FundamentalsPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <Compass className="w-4 h-4" />
          <span>Domain 01 / Milestone 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Robotics Fundamentals & Kinematics
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          The rigorous mathematical foundations of mobile robotics: 2D coordinate transformations, SE(2) rigid body frames, forward/inverse unicycle kinematics, and sensor noise models.
        </p>
      </div>

      {/* 1. Problem Formulation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">1.</span> What Problem Does Kinematics Solve?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Before an autonomous robot can plan paths or avoid collisions, it must be able to describe its location in the physical world and predict how actuator inputs (e.g. wheel motor voltages or angular velocities) translate into physical displacement over time.
        </p>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
          <p><strong className="text-slate-200">Forward Kinematics:</strong> Given wheel velocities <InlineMath latex="(v_L, v_R)" />, calculate robot velocities <InlineMath latex="(\dot{x}, \dot{y}, \dot{\theta})" /> in the world frame.</p>
          <p><strong className="text-slate-200">Inverse Kinematics:</strong> Given desired trajectory <InlineMath latex="(\dot{x}, \dot{y}, \dot{\theta})" />, compute required actuator commands <InlineMath latex="(v_L, v_R)" />.</p>
        </div>
      </section>

      {/* 2. Mathematical Model */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">2.</span> Mathematical Models & Coordinate Frames
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          A mobile robot moving on a 2D plane possesses three degrees of freedom (DOF) represented by the state vector <InlineMath latex="\mathbf{x} = [x, y, \theta]^T \in SE(2)" />.
        </p>

        <MathBlock
          title="Differential Drive Kinematic Equation (Unicycle Model)"
          latex={`\\begin{bmatrix} \\dot{x} \\\\ \\dot{y} \\\\ \\dot{\\theta} \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & 0 \\\\ \\sin\\theta & 0 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} v \\\\ \\omega \\end{bmatrix}`}
          explanation="Where x, y are planar coordinates, θ is heading angle (orientation), v is linear forward velocity, and ω is angular velocity."
        />

        <MathBlock
          title="2D Rigid Body Frame Transformation"
          latex={`p^W = R(\\theta) p^R + t = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} x^R \\\\ y^R \\end{bmatrix} + \\begin{bmatrix} x_0 \\\\ y_0 \\end{bmatrix}`}
          explanation="Maps a local point p^R observed by on-board sensors into global world coordinates p^W using rotation matrix R(θ) and translation vector t."
        />
      </section>

      {/* 3. Pure TypeScript Engine Preview */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">3.</span> TypeScript Implementation (lib/math/transforms.ts)
        </h2>
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
          <pre>{`export function transformPointToWorld(point: Vector2D, pose: Pose2D): Vector2D {
  const cosT = Math.cos(pose.theta);
  const sinT = Math.sin(pose.theta);
  return {
    x: pose.x + (point.x * cosT - point.y * sinT),
    y: pose.y + (point.x * sinT + point.y * cosT),
  };
}`}</pre>
        </div>
      </section>

      {/* 4. Next Milestones & Next Step */}
      <section className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500">Foundation Ready</span>
        <Link
          href="/learn/planning"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium border border-cyan-500/30 transition-colors"
        >
          <span>Next: Path Planning (A*, Dijkstra, RRT)</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}
