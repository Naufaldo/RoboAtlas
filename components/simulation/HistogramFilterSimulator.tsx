'use client';

import React, { useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Eye, Sparkles, Layers, Info } from 'lucide-react';
import { InlineMath } from '@/components/mathematics/MathBlock';

export function HistogramFilterSimulator() {
  const numCells = 10;
  const doorLocations = [2, 5, 8];

  // Ground Truth Robot Position in 1D Hallway
  const [truePos, setTruePos] = useState(2);

  // Discrete Probability Distribution: bel(x_i)
  const [belief, setBelief] = useState<number[]>(
    new Array(numCells).fill(1 / numCells) // Initial uniform prior 0.1
  );

  const [lastAction, setLastAction] = useState<string>('Initial Uniform State (Total Uncertainty)');
  const [sensorHitRate, setSensorHitRate] = useState(0.85); // P(Door | Door)
  const [motionAccuracy, setMotionAccuracy] = useState(0.8); // P(Move +1 | Command +1)

  // Reset to Uniform Prior
  const handleResetUniform = () => {
    setBelief(new Array(numCells).fill(1 / numCells));
    setTruePos(2);
    setLastAction('Reset to Uniform Prior (bel(x) = 0.10)');
  };

  // 1. Motion Step (Discrete Convolution)
  const moveRobot = useCallback(
    (direction: 1 | -1) => {
      // Update Ground truth
      const nextTrue = Math.max(0, Math.min(numCells - 1, truePos + direction));
      setTruePos(nextTrue);

      // Convolution: p_new[i] = p_move * p[i-dir] + p_stay * p[i] + p_overshoot * p[i-2*dir]
      const pMove = motionAccuracy;
      const pStay = (1 - motionAccuracy) / 2;
      const pOver = (1 - motionAccuracy) / 2;

      setBelief((prev) => {
        const nextBelief = new Array(numCells).fill(0);
        for (let i = 0; i < numCells; i++) {
          for (let j = 0; j < numCells; j++) {
            let transitionProb = 0;
            const diff = (i - j) * direction;
            if (diff === 1) transitionProb = pMove;
            else if (diff === 0) transitionProb = pStay;
            else if (diff === 2) transitionProb = pOver;

            // Handle hallway boundaries
            if (i === 0 && direction === -1 && j === 0) transitionProb += pMove;
            if (i === numCells - 1 && direction === 1 && j === numCells - 1) transitionProb += pMove;

            nextBelief[i] += prev[j] * transitionProb;
          }
        }
        return nextBelief;
      });

      setLastAction(`Moved ${direction > 0 ? 'Right (+1)' : 'Left (-1)'}: Motion model diffused uncertainty`);
    },
    [truePos, motionAccuracy, numCells]
  );

  // 2. Sensor Measurement Step (Bayes Rule Multiplication & Normalization)
  const senseEnvironment = useCallback(() => {
    const isAtDoor = doorLocations.includes(truePos);
    const measuredDoor = Math.random() < (isAtDoor ? sensorHitRate : 1 - sensorHitRate);

    const pHit = sensorHitRate;
    const pMiss = 1 - sensorHitRate;

    setBelief((prev) => {
      let rawBelief = prev.map((p, idx) => {
        const cellIsDoor = doorLocations.includes(idx);
        const likelihood = measuredDoor ? (cellIsDoor ? pHit : pMiss) : cellIsDoor ? pMiss : pHit;
        return p * likelihood;
      });

      // Normalization factor: eta = 1 / sum(raw)
      const sum = rawBelief.reduce((a, b) => a + b, 0);
      return sum > 0 ? rawBelief.map((p) => p / sum) : prev;
    });

    setLastAction(
      measuredDoor
        ? 'Sensor Reading: "DOOR DETECTED" -> Belief multiplied by likelihood and normalized'
        : 'Sensor Reading: "WALL DETECTED" -> Non-door cells reinforced'
    );
  }, [truePos, doorLocations, sensorHitRate]);

  return (
    <div className="my-6 rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
              Histogram Filter / Discrete Bayes 1D Localization
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Maintains a discrete probability mass vector <InlineMath latex="\text{bel}(x_i) = \eta P(z \mid x_i) \sum P(x_i \mid x_j, u) \text{bel}(x_j)" /> across topological hallway cells.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => moveRobot(-1)}
            disabled={truePos === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 transition-all disabled:opacity-30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Move Left</span>
          </button>
          <button
            onClick={() => moveRobot(1)}
            disabled={truePos === numCells - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 transition-all disabled:opacity-30"
          >
            <span>Move Right</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={senseEnvironment}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Sense Sensor</span>
          </button>
          <button
            onClick={handleResetUniform}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono flex items-center justify-between text-slate-300">
        <span className="text-cyan-400 font-semibold">Latest Step:</span>
        <span className="text-slate-200">{lastAction}</span>
      </div>

      {/* Probability Histogram & Hallway Visualization */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 shadow-inner">
        {/* Histogram Bars */}
        <div className="grid grid-cols-10 gap-1.5 h-36 items-end pb-2 border-b border-slate-800">
          {belief.map((p, idx) => {
            const heightPct = Math.min(100, Math.max(4, p * 100 * 1.5));
            const isHigh = p > 0.35;
            const isDoor = doorLocations.includes(idx);

            return (
              <div key={idx} className="flex flex-col items-center justify-end h-full group">
                <span className="text-[10px] font-mono text-slate-400 mb-1">
                  {(p * 100).toFixed(0)}%
                </span>
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isHigh
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                      : isDoor
                      ? 'bg-amber-500/80'
                      : 'bg-cyan-500/70'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* 1D Hallway Floor Plan */}
        <div className="grid grid-cols-10 gap-1.5 pt-1">
          {Array.from({ length: numCells }).map((_, idx) => {
            const isDoor = doorLocations.includes(idx);
            const isRobotHere = truePos === idx;

            return (
              <div
                key={idx}
                className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isDoor
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span className="absolute top-1 left-1.5 text-[9px] font-mono opacity-50">
                  #{idx}
                </span>

                {isDoor && (
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-tighter">
                    🚪 Door
                  </span>
                )}

                {isRobotHere && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-cyan-500/50 animate-pulse">
                      🤖
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Probability Model Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Sensor Accuracy <InlineMath latex="P(\text{Hit} \mid \text{Door})" />:</span>
            <span className="text-cyan-400 font-bold">{(sensorHitRate * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.55"
            max="0.99"
            step="0.02"
            value={sensorHitRate}
            onChange={(e) => setSensorHitRate(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Motion Execution Accuracy <InlineMath latex="P(x_{t+1} \mid u)" />:</span>
            <span className="text-cyan-400 font-bold">{(motionAccuracy * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="0.95"
            step="0.05"
            value={motionAccuracy}
            onChange={(e) => setMotionAccuracy(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}
