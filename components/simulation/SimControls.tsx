'use client';

import React from 'react';
import { Play, Pause, StepForward, RotateCcw, FastForward, Sliders } from 'lucide-react';

interface SimControlsProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  onStep?: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange?: (newSpeed: number) => void;
  title?: string;
  disabled?: boolean;
}

export function SimControls({
  isRunning,
  onTogglePlay,
  onStep,
  onReset,
  speed,
  onSpeedChange,
  title,
  disabled = false,
}: SimControlsProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex-wrap gap-2 text-xs font-mono">
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          disabled={disabled}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
            isRunning
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
          }`}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isRunning ? 'Pause' : 'Run'}
        </button>

        {onStep && (
          <button
            onClick={onStep}
            disabled={isRunning || disabled}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition-colors"
            title="Step One Iteration"
          >
            <StepForward className="w-3.5 h-3.5" />
            Step
          </button>
        )}

        <button
          onClick={onReset}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="Reset Simulation State"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {onSpeedChange && (
        <div className="flex items-center gap-2 text-slate-400">
          <FastForward className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px]">Speed: {speed}x</span>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.5}
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-20 accent-cyan-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg appearance-none"
          />
        </div>
      )}
    </div>
  );
}
