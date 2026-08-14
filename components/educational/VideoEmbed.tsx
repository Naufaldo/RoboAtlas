'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, Video, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface VideoEmbedProps {
  title: string;
  provider?: 'youtube' | 'vimeo';
  videoId: string;
  sourceUrl?: string;
  duration?: string;
  author?: string;
}

export function VideoEmbed({
  title,
  provider = 'youtube',
  videoId,
  sourceUrl,
  duration,
  author,
}: VideoEmbedProps) {
  const { locale } = useLanguage();
  const isId = locale === 'id';
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className="rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl my-6">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
          <Video className="w-4 h-4" />
          <span className="truncate">{title}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          {author && <span>{author}</span>}
          {duration && (
            <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              ⏱️ {duration}
            </span>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-cyan-500 transition-colors"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video w-full bg-slate-950">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group bg-gradient-to-br from-slate-900 via-slate-950 to-[#060913] hover:opacity-95 transition-all"
          >
            {/* Thumbnail backdrop */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
            />

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/90 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/50 transition-transform group-hover:scale-110">
                <Play className="w-7 h-7 fill-slate-950 translate-x-0.5" />
              </div>
              <span className="font-mono text-xs text-white bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
                {isId ? 'Klik untuk memutar video referensi' : 'Click to play reference video'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
