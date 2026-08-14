import React from 'react';
import Link from 'next/link';
import { DOMAINS } from '@/lib/navigation/curriculum';
import {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
  ArrowRight,
  BookOpen,
  CheckCircle,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
};

export default function LearnPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Overview</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
          Robotics Engineering Curriculum
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Master the mathematical, algorithmic, and practical foundations of autonomous robotics.
          Select any domain below to explore the theoretical formulation, KaTeX equations, pseudocode, and interactive browser simulations.
        </p>
      </div>

      {/* Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOMAINS.map((domain) => {
          const Icon = iconMap[domain.iconName] || Navigation;
          return (
            <div
              key={domain.slug}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {domain.milestone}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-100">{domain.title}</h2>
                <p className="text-xs font-mono text-cyan-400/80 mb-2">{domain.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{domain.description}</p>

                {/* Topics list */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono font-medium text-slate-300">
                    Key Topics:
                  </span>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {domain.topics.map((t) => (
                      <li key={t.title} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{t.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {domain.status}
                </span>
                <Link
                  href={`/learn/${domain.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 font-mono text-xs font-medium transition-colors"
                >
                  <span>Open Domain</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
