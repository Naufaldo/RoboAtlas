'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Sparkles, RotateCcw, HelpCircle, CheckCircle2, TrendingUp, Compass } from 'lucide-react';

export function BayesianRoomSimulator() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  // Prior Probability P(Room A)
  const [priorA, setPriorA] = useState(0.5); // 50%
  const priorB = 1 - priorA;

  // Sensor Accuracy: P(Sensor says A | Robot in A)
  const [sensorAccA, setSensorAccA] = useState(0.85); // 85%
  // False Positive: P(Sensor says A | Robot in B)
  const [sensorFalseA, setSensorFalseA] = useState(0.15); // 15%

  // Observation state: null | 'A' | 'B'
  const [lastObservation, setLastObservation] = useState<'A' | 'B' | null>(null);

  // Bayes Rule calculation:
  // P(Obs A) = P(Obs A | A) * P(A) + P(Obs A | B) * P(B)
  const pObsA = sensorAccA * priorA + sensorFalseA * priorB;
  const posteriorA_givenObsA = pObsA > 0 ? (sensorAccA * priorA) / pObsA : 0.5;

  // P(Obs B | A) = 1 - sensorAccA, P(Obs B | B) = 1 - sensorFalseA
  const pObsB_givenA = 1 - sensorAccA;
  const pObsB_givenB = 1 - sensorFalseA;
  const pObsB = pObsB_givenA * priorA + pObsB_givenB * priorB;
  const posteriorA_givenObsB = pObsB > 0 ? (pObsB_givenA * priorA) / pObsB : 0.5;

  const currentPosteriorA =
    lastObservation === 'A'
      ? posteriorA_givenObsA
      : lastObservation === 'B'
      ? posteriorA_givenObsB
      : priorA;

  const currentPosteriorB = 1 - currentPosteriorA;

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              {isId ? 'Laboratorium Teorema Bayes: Robot di Ruangan A vs B' : 'Bayes Theorem Lab: Robot in Room A vs B'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {isId
                ? 'Amati bagaimana data sensor berderau memperbarui keyakinan probabilitas posterior lokasi robot.'
                : 'Observe how noisy sensor readings update the posterior probability belief of the robot location.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setPriorA(0.5);
            setSensorAccA(0.85);
            setSensorFalseA(0.15);
            setLastObservation(null);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Visual Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Room A */}
        <div
          className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
            currentPosteriorA > 0.5
              ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold font-mono text-cyan-400">🚪 {isId ? 'RUANGAN A' : 'ROOM A'}</span>
            <span className="text-xs font-mono text-slate-400">
              Prior: <strong>{(priorA * 100).toFixed(0)}%</strong>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-400">{isId ? 'Probabilitas Posterior P(A|Z):' : 'Posterior Belief P(A|Z):'}</span>
              <strong className="text-cyan-400 text-sm">{(currentPosteriorA * 100).toFixed(1)}%</strong>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
                style={{ width: `${currentPosteriorA * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Room B */}
        <div
          className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
            currentPosteriorB > 0.5
              ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold font-mono text-amber-400">🚪 {isId ? 'RUANGAN B' : 'ROOM B'}</span>
            <span className="text-xs font-mono text-slate-400">
              Prior: <strong>{(priorB * 100).toFixed(0)}%</strong>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-400">{isId ? 'Probabilitas Posterior P(B|Z):' : 'Posterior Belief P(B|Z):'}</span>
              <strong className="text-amber-400 text-sm">{(currentPosteriorB * 100).toFixed(1)}%</strong>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                style={{ width: `${currentPosteriorB * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Observation Actions */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>{isId ? 'Ambil Pengukuran Sensor (Observation):' : 'Take Sensor Measurement (Observation):'}</span>
          {lastObservation && (
            <span className="text-cyan-400 font-bold">
              {isId ? `Sensor Mendeteksi Tanda: Ruang ${lastObservation}` : `Sensor Triggered Landmark: Room ${lastObservation}`}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setLastObservation('A')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold border transition-all ${
              lastObservation === 'A'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-cyan-500'
            }`}
          >
            📡 {isId ? 'Sensor Baca: "Ruangan A"' : 'Sensor Reads: "Room A"'}
          </button>

          <button
            onClick={() => setLastObservation('B')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold border transition-all ${
              lastObservation === 'B'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-500'
            }`}
          >
            📡 {isId ? 'Sensor Baca: "Ruangan B"' : 'Sensor Reads: "Room B"'}
          </button>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Prior P(Room A):' : 'Prior P(Room A):'}</span>
            <strong className="text-cyan-400">{(priorA * 100).toFixed(0)}%</strong>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.05"
            value={priorA}
            onChange={(e) => setPriorA(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-400">{isId ? 'Akurasi Sensor P(Obs A | in A):' : 'Sensor Accuracy P(Obs A | in A):'}</span>
            <strong className="text-emerald-400">{(sensorAccA * 100).toFixed(0)}%</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="0.99"
            step="0.01"
            value={sensorAccA}
            onChange={(e) => {
              const acc = parseFloat(e.target.value);
              setSensorAccA(acc);
              setSensorFalseA(parseFloat((1 - acc).toFixed(2)));
            }}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
