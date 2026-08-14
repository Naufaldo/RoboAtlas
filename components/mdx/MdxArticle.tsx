'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import { CoordinateFrameExplorer } from '@/components/educational/CoordinateFrameExplorer';
import { VectorVisualizer } from '@/components/educational/VectorVisualizer';
import { DotProductExplorer } from '@/components/educational/DotProductExplorer';
import { TransformSandbox } from '@/components/simulation/TransformSandbox';
import { SpatialRotation3D } from '@/components/simulation/SpatialRotation3D';
import { KinematicsSimulator } from '@/components/simulation/KinematicsSimulator';
import { PathPlanningSimulator } from '@/components/simulation/PathPlanningSimulator';
import { ControlSimulator } from '@/components/simulation/ControlSimulator';
import { LocalizationSimulator } from '@/components/simulation/LocalizationSimulator';
import { MappingSimulator } from '@/components/simulation/MappingSimulator';
import { SlamSimulator } from '@/components/simulation/SlamSimulator';
import { MultiAgentSimulator } from '@/components/simulation/MultiAgentSimulator';
import { SensePlanActExplorer } from '@/components/simulation/SensePlanActExplorer';
import { RobotClassificationExplorer } from '@/components/simulation/RobotClassificationExplorer';
import { ConceptCheck } from '@/components/educational/ConceptCheck';
import { VideoEmbed } from '@/components/educational/VideoEmbed';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';

interface MdxArticleProps {
  content: string;
  className?: string;
}

function renderKaTeX(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
    });
  } catch (err) {
    return latex;
  }
}

function parseInlineFormatting(text: string): React.ReactNode[] {
  // Regex to split on math $...$, bold **...**, inline code `...`, italic *...*
  const tokens: React.ReactNode[] = [];
  const regex = /(\$[^$]+\$|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(regex);

  parts.forEach((part, index) => {
    if (!part) return;

    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const latex = part.slice(1, -1);
      const html = renderKaTeX(latex, false);
      tokens.push(
        <span
          key={`math-${index}`}
          className="inline-math px-0.5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } else if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      tokens.push(
        <strong key={`b-${index}`} className="font-bold text-slate-900 dark:text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    } else if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      tokens.push(
        <code
          key={`code-${index}`}
          className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 font-mono text-[13px] border border-slate-300 dark:border-slate-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      tokens.push(
        <em key={`em-${index}`} className="italic text-slate-700 dark:text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    } else {
      tokens.push(<span key={`txt-${index}`}>{part}</span>);
    }
  });

  return tokens;
}

export function MdxArticle({ content, className = '' }: MdxArticleProps) {
  const elements = useMemo(() => {
    const rawLines = content.split('\n');
    const nodes: React.ReactNode[] = [];
    let i = 0;

    while (i < rawLines.length) {
      const line = rawLines[i].trim();

      // Skip empty lines
      if (!line) {
        i++;
        continue;
      }

      // Block LaTeX: $$ ... $$
      if (line.startsWith('$$')) {
        let latex = line.slice(2);
        if (latex.endsWith('$$') && latex.length >= 2) {
          latex = latex.slice(0, -2);
          i++;
        } else {
          i++;
          while (i < rawLines.length && !rawLines[i].trim().endsWith('$$')) {
            latex += '\n' + rawLines[i];
            i++;
          }
          if (i < rawLines.length) {
            latex += '\n' + rawLines[i].trim().replace(/\$\$$/, '');
            i++;
          }
        }
        const html = renderKaTeX(latex, true);
        nodes.push(
          <div
            key={`display-math-${i}`}
            className="my-6 p-4 rounded-2xl bg-slate-900/90 text-cyan-300 border border-slate-800 overflow-x-auto scrollbar-thin shadow-lg flex justify-center text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
        continue;
      }

      // Custom Interactive Components
      if (line.startsWith('<CoordinateFrameExplorer')) {
        nodes.push(<CoordinateFrameExplorer key={`comp-coord-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<VectorVisualizer')) {
        nodes.push(<VectorVisualizer key={`comp-vector-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<DotProductExplorer')) {
        nodes.push(<DotProductExplorer key={`comp-dot-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<TransformSandbox')) {
        nodes.push(<TransformSandbox key={`comp-transform-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SpatialRotation3D')) {
        nodes.push(<SpatialRotation3D key={`comp-rotation3d-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<KinematicsSimulator')) {
        nodes.push(<KinematicsSimulator key={`comp-kinematics-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<PathPlanningSimulator')) {
        nodes.push(<PathPlanningSimulator key={`comp-pathplanning-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<ControlSimulator')) {
        nodes.push(<ControlSimulator key={`comp-control-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<LocalizationSimulator')) {
        nodes.push(<LocalizationSimulator key={`comp-localization-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<MappingSimulator')) {
        nodes.push(<MappingSimulator key={`comp-mapping-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SlamSimulator')) {
        nodes.push(<SlamSimulator key={`comp-slam-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<MultiAgentSimulator')) {
        nodes.push(<MultiAgentSimulator key={`comp-multiagent-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SensePlanActExplorer')) {
        nodes.push(<SensePlanActExplorer key={`comp-spa-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<RobotClassificationExplorer')) {
        nodes.push(<RobotClassificationExplorer key={`comp-rce-${i}`} />);
        i++;
        continue;
      }

      // Video Embed Component
      if (line.startsWith('<VideoEmbed')) {
        let videoBlock = line;
        while (i < rawLines.length && !rawLines[i].includes('/>')) {
          i++;
          videoBlock += ' ' + rawLines[i];
        }
        i++;
        const titleMatch = videoBlock.match(/title="([^"]+)"/);
        const videoIdMatch = videoBlock.match(/videoId="([^"]+)"/);
        nodes.push(
          <VideoEmbed
            key={`comp-video-${i}`}
            title={titleMatch ? titleMatch[1] : 'Video Demonstration'}
            videoId={videoIdMatch ? videoIdMatch[1] : '-nGlDsk1rS4'}
            provider="youtube"
          />
        );
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        nodes.push(
          <h1
            key={`h1-${i}`}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight mt-8 mb-4 border-b border-slate-200 dark:border-slate-800 pb-3"
          >
            {parseInlineFormatting(line.slice(2))}
          </h1>
        );
        i++;
        continue;
      }
      if (line.startsWith('## ')) {
        nodes.push(
          <h2
            key={`h2-${i}`}
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight mt-8 mb-3"
          >
            {parseInlineFormatting(line.slice(3))}
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith('### ')) {
        nodes.push(
          <h3
            key={`h3-${i}`}
            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 font-mono mt-6 mb-2 text-cyan-600 dark:text-cyan-400"
          >
            {parseInlineFormatting(line.slice(4))}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal Rule
      if (line === '---' || line === '***') {
        nodes.push(
          <hr key={`hr-${i}`} className="my-8 border-slate-200 dark:border-slate-800/80" />
        );
        i++;
        continue;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        nodes.push(
          <blockquote
            key={`quote-${i}`}
            className="my-4 pl-4 py-2 border-l-4 border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-r-xl text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed"
          >
            {parseInlineFormatting(line.slice(2))}
          </blockquote>
        );
        i++;
        continue;
      }

      // Unordered lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems: React.ReactNode[] = [];
        while (i < rawLines.length && (rawLines[i].trim().startsWith('- ') || rawLines[i].trim().startsWith('* '))) {
          const itemText = rawLines[i].trim().slice(2);
          listItems.push(
            <li key={`li-${i}`} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
              <span>{parseInlineFormatting(itemText)}</span>
            </li>
          );
          i++;
        }
        nodes.push(
          <ul key={`ul-${i}`} className="my-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            {listItems}
          </ul>
        );
        continue;
      }

      // Ordered lists
      if (/^\d+\.\s/.test(line)) {
        const listItems: React.ReactNode[] = [];
        while (i < rawLines.length && /^\d+\.\s/.test(rawLines[i].trim())) {
          const itemText = rawLines[i].trim().replace(/^\d+\.\s/, '');
          listItems.push(
            <li key={`oli-${i}`} className="text-sm text-slate-700 dark:text-slate-300">
              {parseInlineFormatting(itemText)}
            </li>
          );
          i++;
        }
        nodes.push(
          <ol key={`ol-${i}`} className="my-3 list-decimal list-inside space-y-1.5 text-sm">
            {listItems}
          </ol>
        );
        continue;
      }

      // Default Paragraph
      nodes.push(
        <p key={`p-${i}`} className="my-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {parseInlineFormatting(line)}
        </p>
      );
      i++;
    }

    return nodes;
  }, [content]);

  return <div className={`mdx-prose space-y-2 ${className}`}>{elements}</div>;
}
