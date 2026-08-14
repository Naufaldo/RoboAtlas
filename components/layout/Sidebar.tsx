'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOMAINS } from '@/lib/navigation/curriculum';
import {
  Compass,
  MapPin,
  Layers,
  RotateCcw,
  Navigation,
  Cpu,
  Users,
  ChevronRight,
  Sparkles,
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-20 rounded-2xl glass-panel p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800/80">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Curriculum
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
            7 Domains
          </span>
        </div>

        <nav className="space-y-1.5">
          {DOMAINS.map((domain) => {
            const Icon = iconMap[domain.iconName] || Navigation;
            const href = `/learn/${domain.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={domain.slug}
                href={href}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span className="truncate">{domain.title}</span>
                </div>

                <ChevronRight
                  className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                    isActive
                      ? 'text-cyan-400 translate-x-0.5'
                      : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Milestone Indicator */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span>Foundation Active</span>
        </div>
      </div>
    </aside>
  );
}
