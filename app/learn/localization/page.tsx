import React from 'react';
import { MathBlock, InlineMath } from '@/components/mathematics/MathBlock';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function LocalizationPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <MapPin className="w-4 h-4" />
          <span>Domain 02 / Milestone 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Robot Localization & State Estimation
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Recursive Bayesian state estimation under noisy sensors and uncertain wheel odometry using Extended Kalman Filters (EKF) and Monte Carlo Particle Filters (MCL).
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">1.</span> What Problem Does Localization Solve?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Wheel encoders accumulate slippage drift over time (dead reckoning failure). Localization fuses motion commands <InlineMath latex="u_t" /> with landmark/sensor observations <InlineMath latex="z_t" /> to maintain an accurate probability distribution <InlineMath latex="p(x_t)" /> over the robot&apos;s true pose.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-base">2.</span> Mathematical Foundations
        </h2>

        <MathBlock
          title="Bayes Filter Recursive State Update"
          latex={`p(x_t \\mid z_{1:t}, u_{1:t}) = \\eta \\, p(z_t \\mid x_t) \\int p(x_t \\mid x_{t-1}, u_t) p(x_{t-1} \\mid z_{1:t-1}, u_{1:t-1}) \\, dx_{t-1}`}
          explanation="Predict step integrates previous belief through motion model; update step multiplies by observation likelihood."
        />

        <MathBlock
          title="EKF Measurement Update & Kalman Gain"
          latex={`K_t = \\bar{\\Sigma}_t H_t^T (H_t \\bar{\\Sigma}_t H_t^T + R_t)^{-1}, \\quad \\mu_t = \\bar{\\mu}_t + K_t (z_t - h(\\bar{\\mu}_t))`}
          explanation="H_t is the Jacobian matrix of nonlinear observation model h(x); R_t is measurement sensor noise covariance."
        />
      </section>

      <section className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <Link href="/learn/planning" className="text-xs font-mono text-slate-400 hover:text-slate-200">
          ← Path Planning
        </Link>
        <Link
          href="/learn/control"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium border border-cyan-500/30 transition-colors"
        >
          <span>Next: Robot Control</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}
