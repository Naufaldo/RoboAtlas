'use client';

import React, { useMemo } from 'react';
import { MathBlock, InlineMath } from '@/components/mathematics/MathBlock';
import { CoordinateFrameExplorer } from '@/components/educational/CoordinateFrameExplorer';
import { VectorVisualizer } from '@/components/educational/VectorVisualizer';
import { DotProductExplorer } from '@/components/educational/DotProductExplorer';
import { TransformSandbox } from '@/components/simulation/TransformSandbox';
import { SpatialRotation3D } from '@/components/simulation/SpatialRotation3D';
import { SpatialRotation2D } from '@/components/simulation/SpatialRotation2D';
import { KinematicsSimulator } from '@/components/simulation/KinematicsSimulator';
import { PathPlanningSimulator } from '@/components/simulation/PathPlanningSimulator';
import { ControlSimulator } from '@/components/simulation/ControlSimulator';
import { LocalizationSimulator } from '@/components/simulation/LocalizationSimulator';
import { MappingSimulator } from '@/components/simulation/MappingSimulator';
import { SlamSimulator } from '@/components/simulation/SlamSimulator';
import { MultiAgentSimulator } from '@/components/simulation/MultiAgentSimulator';
import { SensePlanActExplorer } from '@/components/simulation/SensePlanActExplorer';
import { ArmKinematicsSimulator } from '@/components/simulation/ArmKinematicsSimulator';
import { RrtSimulator } from '@/components/simulation/RrtSimulator';
import { SensorNoiseSimulator } from '@/components/simulation/SensorNoiseSimulator';
import { PidTuningSimulator } from '@/components/simulation/PidTuningSimulator';
import { OdometryDriftSimulator } from '@/components/simulation/OdometryDriftSimulator';
import { CspaceInflationSimulator } from '@/components/simulation/CspaceInflationSimulator';
import { BayesianFilterSimulator } from '@/components/simulation/BayesianFilterSimulator';
import { TransformChainSimulator } from '@/components/simulation/TransformChainSimulator';
import { HolonomicConstraintSimulator } from '@/components/simulation/HolonomicConstraintSimulator';
import { BayesianRoomSimulator } from '@/components/simulation/BayesianRoomSimulator';
import { TrackingErrorGeometrySimulator } from '@/components/simulation/TrackingErrorGeometrySimulator';
import { ArmForwardKinematicsSimulator } from '@/components/simulation/ArmForwardKinematicsSimulator';
import { LidarRaycastSimulator } from '@/components/simulation/LidarRaycastSimulator';
import { PurePursuitSimulator } from '@/components/simulation/PurePursuitSimulator';
import { AStarVsDijkstraSimulator } from '@/components/simulation/AStarVsDijkstraSimulator';
import { RrtExplorationSimulator } from '@/components/simulation/RrtExplorationSimulator';
import { ArmInverseKinematicsSimulator } from '@/components/simulation/ArmInverseKinematicsSimulator';
import { JacobianSingularitySimulator } from '@/components/simulation/JacobianSingularitySimulator';
import { StateSpaceSimulator } from '@/components/simulation/StateSpaceSimulator';
import { NumericalDiscretizationSimulator } from '@/components/simulation/NumericalDiscretizationSimulator';
import { RobotClassificationExplorer } from '@/components/simulation/RobotClassificationExplorer';
import { GaussianGridMapSimulator } from '@/components/simulation/GaussianGridMapSimulator';
import { RayCastingGridMapSimulator } from '@/components/simulation/RayCastingGridMapSimulator';
import { LidarToGridMapSimulator } from '@/components/simulation/LidarToGridMapSimulator';
import { KMeansClusteringSimulator } from '@/components/simulation/KMeansClusteringSimulator';
import { RectangleFittingSimulator } from '@/components/simulation/RectangleFittingSimulator';
import { EkfLocalizationSimulator } from '@/components/simulation/EkfLocalizationSimulator';
import { HistogramFilterSimulator } from '@/components/simulation/HistogramFilterSimulator';
import { ConceptCheck, QuizOption } from '@/components/educational/ConceptCheck';
import { VideoEmbed } from '@/components/educational/VideoEmbed';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { getAssetPath } from '@/lib/utils/asset-path';

interface MdxArticleProps {
  content: string;
  className?: string;
}

function unescapeString(str: string): string {
  return str
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n');
}

function parseConceptCheck(block: string, keyIndex: number): React.ReactNode | null {
  const idMatch = block.match(/id\s*=\s*["']([^"']+)["']/);
  const id = idMatch ? idMatch[1] : `quiz-${keyIndex}`;

  let question = '';
  const questionMatch = block.match(
    /question\s*=\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|\{`((?:[^`\\]|\\.)*)`\}|\{"((?:[^"\\]|\\.)*)"\})/
  );
  if (questionMatch) {
    question = (questionMatch[1] ?? questionMatch[2] ?? questionMatch[3] ?? questionMatch[4] ?? '').trim();
    question = unescapeString(question);
  } else {
    const qIndex = block.indexOf('question="');
    if (qIndex !== -1) {
      const rest = block.slice(qIndex + 10);
      const endQ = rest.indexOf('"\n') !== -1 ? rest.indexOf('"\n') : rest.indexOf('"');
      if (endQ !== -1) {
        question = unescapeString(rest.slice(0, endQ).trim());
      }
    }
  }

  let hint: string | undefined = undefined;
  const hintMatch = block.match(
    /hint\s*=\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|\{`((?:[^`\\]|\\.)*)`\}|\{"((?:[^"\\]|\\.)*)"\})/
  );
  if (hintMatch) {
    const rawHint = (hintMatch[1] ?? hintMatch[2] ?? hintMatch[3] ?? hintMatch[4] ?? '').trim();
    if (rawHint) {
      hint = unescapeString(rawHint);
    }
  }

  const options: QuizOption[] = [];
  const optionsStartIdx = block.indexOf('options=');
  if (optionsStartIdx !== -1) {
    const optionsChunk = block.slice(optionsStartIdx);
    
    // Find array contents between options={[ and ]}
    const arrayMatch = optionsChunk.match(/options\s*=\s*\{\[\s*([\s\S]*?)\s*\]\}/);
    const targetBlock = arrayMatch ? arrayMatch[1] : optionsChunk;

    const itemRegex = /\{([\s\S]*?)\}/g;
    let itemMatch: RegExpExecArray | null;
    while ((itemMatch = itemRegex.exec(targetBlock)) !== null) {
      const itemBody = itemMatch[1];
      const itemIdMatch = itemBody.match(/id\s*:\s*["']([^"']+)["']/);
      const isCorrectMatch = itemBody.match(/isCorrect\s*:\s*(true|false)/i);
      
      const itemTextMatch = itemBody.match(
        /text\s*:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)/
      );
      
      const explMatch = itemBody.match(
        /explanation\s*:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)/
      );

      if (itemIdMatch) {
        const optId = itemIdMatch[1];
        let optText = '';
        if (itemTextMatch) {
          optText = (itemTextMatch[1] ?? itemTextMatch[2] ?? itemTextMatch[3] ?? '').trim();
        } else {
          const tIdx = itemBody.indexOf('text:');
          if (tIdx !== -1) {
            const rawT = itemBody.slice(tIdx + 5).trim();
            const firstChar = rawT[0];
            if (firstChar === '"' || firstChar === "'" || firstChar === '`') {
              const endQuote = rawT.indexOf(firstChar, 1);
              if (endQuote !== -1) optText = rawT.slice(1, endQuote).trim();
            }
          }
        }

        const isCorrect = isCorrectMatch ? isCorrectMatch[1].toLowerCase() === 'true' : false;

        let explanation = '';
        if (explMatch) {
          explanation = (explMatch[1] ?? explMatch[2] ?? explMatch[3] ?? '').trim();
        }

        options.push({
          id: optId,
          text: unescapeString(optText),
          isCorrect,
          explanation: unescapeString(explanation),
        });
      }
    }
  }

  if (!question || options.length === 0) {
    return null;
  }

  return (
    <ConceptCheck
      key={`comp-cc-${id}-${keyIndex}`}
      id={id}
      question={question}
      options={options}
      hint={hint}
    />
  );
}

function parseInlineFormatting(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(\$[^$]+\$|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(regex);

  parts.forEach((part, index) => {
    if (!part) return;

    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const latex = part.slice(1, -1);
      tokens.push(<InlineMath key={`math-${index}`} latex={latex} />);
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

      // Display KaTeX Math ($$ ... $$)
      if (line.startsWith('$$')) {
        let mathBlock = '';
        if (line.length > 2 && line.endsWith('$$') && line !== '$$') {
          mathBlock = line.slice(2, -2).trim();
          i++;
        } else {
          i++;
          const mathLines: string[] = [];
          while (i < rawLines.length && !rawLines[i].trim().endsWith('$$')) {
            mathLines.push(rawLines[i]);
            i++;
          }
          if (i < rawLines.length) {
            const endLine = rawLines[i].trim().replace(/\$\$$/, '');
            if (endLine) mathLines.push(endLine);
            i++;
          }
          mathBlock = mathLines.join('\n').trim();
        }

        nodes.push(
          <div key={`mathblock-${i}`} className="my-4">
            <MathBlock latex={mathBlock} displayMode={true} />
          </div>
        );
        continue;
      }

      // Fenced Code Blocks (```ts, ```python, ```text, etc.)
      if (line.startsWith('```')) {
        const language = line.slice(3).trim() || 'text';
        i++;
        const codeLines: string[] = [];
        while (i < rawLines.length && !rawLines[i].trim().startsWith('```')) {
          codeLines.push(rawLines[i]);
          i++;
        }
        if (i < rawLines.length) {
          i++; // Skip closing ```
        }
        nodes.push(
          <CodeBlock
            key={`codeblock-${i}`}
            code={codeLines.join('\n')}
            language={language}
          />
        );
        continue;
      }

      // Interactive Simulator Components Mounts
      if (line.startsWith('<CoordinateFrameExplorer')) {
        nodes.push(<CoordinateFrameExplorer key={`comp-cfe-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<VectorVisualizer')) {
        nodes.push(<VectorVisualizer key={`comp-vv-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<DotProductExplorer')) {
        nodes.push(<DotProductExplorer key={`comp-dpe-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<TransformSandbox')) {
        nodes.push(<TransformSandbox key={`comp-ts-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SpatialRotation3D')) {
        nodes.push(<SpatialRotation3D key={`comp-sr3d-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SpatialRotation2D')) {
        nodes.push(<SpatialRotation2D key={`comp-sr2d-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<KinematicsSimulator')) {
        nodes.push(<KinematicsSimulator key={`comp-ks-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<PathPlanningSimulator')) {
        nodes.push(<PathPlanningSimulator key={`comp-pps-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<ControlSimulator')) {
        nodes.push(<ControlSimulator key={`comp-cs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<LocalizationSimulator')) {
        nodes.push(<LocalizationSimulator key={`comp-ls-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<MappingSimulator')) {
        nodes.push(<MappingSimulator key={`comp-ms-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SlamSimulator')) {
        nodes.push(<SlamSimulator key={`comp-ss-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<MultiAgentSimulator')) {
        nodes.push(<MultiAgentSimulator key={`comp-mas-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SensePlanActExplorer')) {
        nodes.push(<SensePlanActExplorer key={`comp-spae-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<ArmKinematicsSimulator')) {
        nodes.push(<ArmKinematicsSimulator key={`comp-arm-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<RrtSimulator')) {
        nodes.push(<RrtSimulator key={`comp-rrt-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<SensorNoiseSimulator')) {
        nodes.push(<SensorNoiseSimulator key={`comp-sns-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<PidTuningSimulator')) {
        nodes.push(<PidTuningSimulator key={`comp-pid-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<OdometryDriftSimulator')) {
        nodes.push(<OdometryDriftSimulator key={`comp-ods-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<CspaceInflationSimulator')) {
        nodes.push(<CspaceInflationSimulator key={`comp-csis-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<BayesianFilterSimulator')) {
        nodes.push(<BayesianFilterSimulator key={`comp-bfs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<TransformChainSimulator')) {
        nodes.push(<TransformChainSimulator key={`comp-tcs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<HolonomicConstraintSimulator')) {
        nodes.push(<HolonomicConstraintSimulator key={`comp-hcs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<BayesianRoomSimulator')) {
        nodes.push(<BayesianRoomSimulator key={`comp-brs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<TrackingErrorGeometrySimulator')) {
        nodes.push(<TrackingErrorGeometrySimulator key={`comp-tegs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<ArmForwardKinematicsSimulator')) {
        nodes.push(<ArmForwardKinematicsSimulator key={`comp-afks-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<LidarRaycastSimulator')) {
        nodes.push(<LidarRaycastSimulator key={`comp-lrs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<PurePursuitSimulator')) {
        nodes.push(<PurePursuitSimulator key={`comp-pps-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<AStarVsDijkstraSimulator')) {
        nodes.push(<AStarVsDijkstraSimulator key={`comp-asvds-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<RrtExplorationSimulator')) {
        nodes.push(<RrtExplorationSimulator key={`comp-rrtes-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<ArmInverseKinematicsSimulator')) {
        nodes.push(<ArmInverseKinematicsSimulator key={`comp-aiks-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<JacobianSingularitySimulator')) {
        nodes.push(<JacobianSingularitySimulator key={`comp-jss-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<StateSpaceSimulator')) {
        nodes.push(<StateSpaceSimulator key={`comp-sss-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<NumericalDiscretizationSimulator')) {
        nodes.push(<NumericalDiscretizationSimulator key={`comp-nds-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<RobotClassificationExplorer')) {
        nodes.push(<RobotClassificationExplorer key={`comp-rce-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<GaussianGridMapSimulator')) {
        nodes.push(<GaussianGridMapSimulator key={`comp-ggms-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<RayCastingGridMapSimulator')) {
        nodes.push(<RayCastingGridMapSimulator key={`comp-rcgms-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<LidarToGridMapSimulator')) {
        nodes.push(<LidarToGridMapSimulator key={`comp-ltgms-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<KMeansClusteringSimulator')) {
        nodes.push(<KMeansClusteringSimulator key={`comp-kmcs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<RectangleFittingSimulator')) {
        nodes.push(<RectangleFittingSimulator key={`comp-rfs-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<EkfLocalizationSimulator')) {
        nodes.push(<EkfLocalizationSimulator key={`comp-ekfls-${i}`} />);
        i++;
        continue;
      }
      if (line.startsWith('<HistogramFilterSimulator')) {
        nodes.push(<HistogramFilterSimulator key={`comp-hfs-${i}`} />);
        i++;
        continue;
      }

      // Concept Check / Quiz Component
      if (line.startsWith('<ConceptCheck')) {
        let conceptBlock = line;
        while (
          i + 1 < rawLines.length &&
          !rawLines[i].includes('/>') &&
          !rawLines[i].includes('</ConceptCheck>')
        ) {
          i++;
          conceptBlock += '\n' + rawLines[i];
        }
        i++;

        const checkNode = parseConceptCheck(conceptBlock, i);
        if (checkNode) {
          nodes.push(checkNode);
        }
        continue;
      }

      // Video Embed Component
      if (line.startsWith('<VideoEmbed')) {
        let videoBlock = line;
        while (
          i + 1 < rawLines.length &&
          !rawLines[i].includes('/>') &&
          !rawLines[i].includes('</VideoEmbed>')
        ) {
          i++;
          videoBlock += ' ' + rawLines[i];
        }
        i++;
        const titleMatch = videoBlock.match(/title="([^"]+)"/);
        const videoIdMatch = videoBlock.match(/videoId="([^"]+)"/);
        const providerMatch = videoBlock.match(/provider="([^"]+)"/);
        nodes.push(
          <VideoEmbed
            key={`comp-video-${i}`}
            title={titleMatch ? titleMatch[1] : 'Video Demonstration'}
            videoId={videoIdMatch ? videoIdMatch[1] : '-nGlDsk1rS4'}
            provider={(providerMatch ? providerMatch[1] : 'youtube') as 'youtube' | 'vimeo'}
          />
        );
        continue;
      }

      // Markdown Images (![Alt](url))
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        const altText = imgMatch[1];
        const src = imgMatch[2];
        const resolvedSrc = getAssetPath(src);

        nodes.push(
          <figure key={`img-${i}`} className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/70 p-2 shadow-xl">
            <img
              src={resolvedSrc}
              alt={altText}
              className="w-full h-auto rounded-xl object-contain max-h-[520px] mx-auto"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  // If current src has /RoboAtlas/, try without it; otherwise try with /RoboAtlas/
                  if (target.src.includes('/RoboAtlas/')) {
                    target.src = target.src.replace('/RoboAtlas/', '/');
                  } else {
                    try {
                      const url = new URL(target.src);
                      target.src = `${url.origin}/RoboAtlas${url.pathname}`;
                    } catch {
                      target.src = `/RoboAtlas${src.startsWith('/') ? src : `/${src}`}`;
                    }
                  }
                }
              }}
            />
            {altText && (
              <figcaption className="text-center text-xs font-mono text-slate-500 dark:text-slate-400 mt-2.5 pb-1">
                📸 {altText}
              </figcaption>
            )}
          </figure>
        );
        i++;
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
        const headingText = line.slice(3).trim();
        const headingId = headingText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        nodes.push(
          <h2
            key={`h2-${i}`}
            id={headingId}
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight mt-8 mb-3 scroll-mt-24"
          >
            {parseInlineFormatting(headingText)}
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

      // Bullet lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems: React.ReactNode[] = [];
        while (
          i < rawLines.length &&
          (rawLines[i].trim().startsWith('- ') || rawLines[i].trim().startsWith('* '))
        ) {
          const itemText = rawLines[i].trim().slice(2);
          listItems.push(
            <li key={`li-${i}`} className="flex items-start gap-2">
              <span className="text-cyan-500 font-bold">•</span>
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

      // Default Paragraph with focused reading column width
      nodes.push(
        <p key={`p-${i}`} className="my-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans reading-prose">
          {parseInlineFormatting(line)}
        </p>
      );
      i++;
    }

    return nodes;
  }, [content]);

  return <div className={`mdx-prose space-y-2 ${className}`}>{elements}</div>;
}
