import React from 'react';
import Link from 'next/link';
import { Bot, Heart, Sparkles, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500 text-slate-950">
                <Bot className="h-4 w-4 stroke-[2.5]" />
              </div>
              <span className="font-mono text-base font-bold text-slate-100">RoboAtlas</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              An interactive, visual-first robotics learning platform and algorithm laboratory.
              Simulate kinematic models, path planners, state estimators, and swarm consensus algorithms
              directly in your browser with zero backend requirements.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span>Client-Side Static Architecture</span>
              <span>•</span>
              <span>GitHub Pages Compatible</span>
            </div>
          </div>

          {/* Col 2: Core Learning Paths */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Learning Domains
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/learn/fundamentals" className="hover:text-cyan-400 transition-colors">
                  Fundamentals & Kinematics
                </Link>
              </li>
              <li>
                <Link href="/learn/planning" className="hover:text-cyan-400 transition-colors">
                  Path Planning (A*, RRT, D*)
                </Link>
              </li>
              <li>
                <Link href="/learn/localization" className="hover:text-cyan-400 transition-colors">
                  Localization (EKF, Particles)
                </Link>
              </li>
              <li>
                <Link href="/learn/control" className="hover:text-cyan-400 transition-colors">
                  Control (Pure Pursuit, Stanley)
                </Link>
              </li>
              <li>
                <Link href="/learn/multi-agent" className="hover:text-cyan-400 transition-colors">
                  Multi-Agent & Swarm
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Attribution & Academic Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
              References & Credits
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/AtsushiSakai/PythonRobotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  <span>PythonRobotics (A. Sakai)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://atsushisakai.github.io/PythonRobotics/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  <span>PythonRobotics Textbook</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link href="/algorithms" className="hover:text-cyan-400 transition-colors">
                  Algorithm Matrix
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Open Source Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} RoboAtlas. Original Educational Content & TypeScript Engine.</p>
          <p className="flex items-center gap-1.5">
            <span>Released under MIT License</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
