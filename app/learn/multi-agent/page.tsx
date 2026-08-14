'use client';

import React from 'react';
import { MultiAgentSimulator } from '@/components/simulation/MultiAgentSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import { ConceptCheck } from '@/components/educational/ConceptCheck';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Users, Sparkles } from 'lucide-react';

export default function MultiAgentPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Users className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 8 • Laboratorium Domain' : 'Milestone 8 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Robotika Multi-Agent & Konsensus Kawanan' : 'Multi-Agent Robotics & Swarm Consensus'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Koordinasikan tim robot otonom terdistribusi. Simulasikan protokol konsensus Graph Laplacian, pemeliharaan formasi leader-follower, dan dinamika kawanan Reynolds Boids.'
            : 'Coordinate distributed teams of autonomous robots. Simulate Graph Laplacian consensus protocols, leader-follower formation maintenance, and Reynolds flocking dynamics.'}
        </p>
      </div>

      {/* Lesson Orientation */}
      <LessonOrientation
        domain={isId ? 'Multi-Agent Robotika' : 'Multi-Agent Robotics'}
        lessonTitle={isId ? 'Protokol Konsensus Graf Laplacian & Formasi Kawanan' : 'Graph Laplacian Consensus & Swarm Formations'}
        estimatedMinutes={20}
        learningObjectives={
          isId
            ? [
                'Memahami topologi jaringan komunikasi antar robot G = (V, E)',
                'Menghitung matriks Graph Laplacian L = D - A dan spektrum nilai eigennya',
                'Menganalisis konvergensi posisi rendezvous dan formasi geometris stabil (V-shape, Circle, Line)',
              ]
            : [
                'Understand inter-robot communication graph topologies G = (V, E)',
                'Construct Graph Laplacian matrix L = D - A and analyze its spectral properties',
                'Simulate decentralized rendezvous consensus and geometric formation control',
              ]
        }
        whyItMatters={
          isId
            ? 'Dalam armada ratusan drone atau AGV, server terpusat akan menjadi bottleneck. Sistem harus mampu berkoordinasi secara mandiri hanya dengan berkomunikasi ke tetangga terdekat.'
            : 'In fleets of hundreds of drones or warehouse rovers, central servers create single-point bottlenecks; decentralized consensus enables robust local coordination.'
        }
      />

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Koordinasi Kawanan Interaktif' : 'Interactive Swarm Coordination Workstation'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
            Decentralized Mesh Protocol
          </span>
        </div>
        <MultiAgentSimulator />
      </div>

      {/* 2. Formula Explainer with Live Calculator */}
      <FormulaExplainer
        id="formula-graph-laplacian"
        title={isId ? 'Dinamika Konsensus Graf Laplacian Terdistribusi' : 'Distributed Graph Laplacian Consensus Protocol'}
        latex="\dot{x}_i(t) = -\sum_{j \in \mathcal{N}_i} a_{ij} \big( x_i(t) - x_j(t) \big) \iff \dot{\mathbf{x}}(t) = -\mathcal{L}\, \mathbf{x}(t)"
        meaning={
          isId
            ? 'Setiap robot i menghitung selisih posisinya terhadap tetangga j yang terhubung komunikasi, lalu bergerak mendekati rata-rata tetangganya tanpa memerlukan server pusat.'
            : 'Each robot i computes the position error relative to its connected neighbors j, driving its velocity toward the local neighborhood average without any central controller.'
        }
        whyExplanation={
          isId
            ? 'Matriks Laplacian L = D - A bersifat simetris semidefinit positif. Nilai eigen terkecil non-nol lambda_2 (algebraic connectivity) menjamin bahwa seluruh robot akan mencapai konsensus posisi bersama secara eksponensial selama graf komunikasi terhubung (connected graph).'
            : 'The Graph Laplacian L = D - A is positive semi-definite. Its second-smallest eigenvalue lambda_2 (algebraic connectivity) mathematically guarantees exponential convergence to state agreement across connected graphs.'
        }
        variables={[
          {
            symbol: 'dot_x_i',
            name: isId ? 'Kecepatan Robot i' : 'Velocity of Robot i',
            unit: 'm/s',
            meaning: isId ? 'Laju perubahan posisi yang dihasilkan protokol konsensus lokal' : 'Time derivative of agent position',
          },
          {
            symbol: 'a_ij',
            name: isId ? 'Konektivitas Graf' : 'Adjacency Weight',
            unit: 'binary',
            meaning: isId ? 'Bernilai 1 jika berada dalam jangkauan komunikasi radio' : '1 if within communication range, 0 otherwise',
          },
          {
            symbol: 'L (Laplacian)',
            name: isId ? 'Matriks Graph Laplacian' : 'Graph Laplacian Matrix',
            unit: 'matrix',
            meaning: isId ? 'Matriks selisih derajat D dikurangi ketetanggaan A (L = D - A)' : 'Matrix L = D - A encoding network topology',
          },
        ]}
        derivationSteps={[
          {
            step: isId ? 'Definisi Matriks D dan A' : 'Degree Matrix D and Adjacency A',
            latex: 'D_{ii} = \\sum_j a_{ij}, \\quad \\mathcal{L} = D - A',
            explanation: isId ? 'Jumlah setiap baris pada matriks Laplacian bernilai tepat nol.' : 'Each row sum strictly equals zero.',
          },
          {
            step: isId ? 'Sistem Diferensial Vektor' : 'Vector Differential Formulation',
            latex: '\\dot{\\mathbf{x}} = -(D - A)\\mathbf{x} = -\\mathcal{L}\\mathbf{x}',
            explanation: isId ? 'Menyatukan persamaan skalar individual menjadi satu persamaan matriks global.' : 'Collects individual agent states into a single system.',
          },
          {
            step: isId ? 'Batas Konvergensi Rendezvous' : 'Rendezvous Limit',
            latex: '\\lim_{t \\to \\infty} x_i(t) = \\frac{1}{N}\\sum_{k=1}^N x_k(0)',
            explanation: isId ? 'Posisi seluruh robot berkumpul di rata-rata posisi awal.' : 'All agents asymptotically meet at initial geometric center.',
          },
        ]}
        numericalExample={{
          inputs: { 'x1': 0.0, 'x2': 6.0, 'x3': 9.0 },
          calculationSteps: [
            'L = [[1, -1, 0], [-1, 2, -1], [0, -1, 1]]',
            'dot_x1 = -(0 - 6) = +6 m/s',
            'dot_x2 = -((6 - 0) + (6 - 9)) = -3 m/s',
            'dot_x3 = -(9 - 6) = -3 m/s',
            'Average rendezvous point = (0 + 6 + 9) / 3 = 5.0 m',
          ],
          result: 'x_final = 5.0 m',
        }}
        roboticsApplication={
          isId
            ? 'Digunakan pada pertunjukan drone light show ribuan drone di langit malam, formasi armada kapal patroli laut, dan AGV gudang.'
            : 'Powers massive drone light shows (Intel/EHang), autonomous naval vessel fleet escorting, and swarm search operations.'
        }
        calculator={{
          params: [
            { key: 'x1', label: 'Robot 1 Position (x1)', unit: 'm', default: 0.0, min: -10, max: 10, step: 0.5 },
            { key: 'x2', label: 'Robot 2 Position (x2)', unit: 'm', default: 6.0, min: -10, max: 10, step: 0.5 },
            { key: 'x3', label: 'Robot 3 Position (x3)', unit: 'm', default: 9.0, min: -10, max: 10, step: 0.5 },
          ],
          calculate: (inputs: Record<string, number>) => {
            const { x1, x2, x3 } = inputs;
            const avg = (x1 + x2 + x3) / 3.0;
            return {
              steps: [
                `Agent Positions: x1 = ${x1.toFixed(1)}m, x2 = ${x2.toFixed(1)}m, x3 = ${x3.toFixed(1)}m`,
                `Consensus Average = (${x1.toFixed(1)} + ${x2.toFixed(1)} + ${x3.toFixed(1)}) / 3 = ${avg.toFixed(2)} m`,
              ],
              result: `Rendezvous Point = ${avg.toFixed(2)} m`,
            };
          },
        }}
      />

      {/* 3. Math to Code Bridge */}
      <MathCodeBridge
        title="Decentralized Graph Laplacian Consensus Velocity"
        mathLatex="\dot{\mathbf{p}}_i = -\sum_{j \in \mathcal{N}_i} (\mathbf{p}_i - \mathbf{p}_j - \mathbf{d}_{ij}^*)"
        explanation={
          isId
            ? 'Implementasi penyesuaian kecepatan berbasis selisih posisi terhadap tetangga lokal pada TypeScript.'
            : 'Distributed neighbor velocity alignment loop in TypeScript.'
        }
        codeSnippet={`// TypeScript: Decentralized Laplacian Formation Controller
export function computeConsensusVelocity(
  agentIndex: number,
  agents: Agent[],
  communicationRadius: number,
  desiredOffsets?: { dx: number; dy: number }[]
): { vx: number; vy: number } {
  const self = agents[agentIndex];
  let vx = 0;
  let vy = 0;

  for (let j = 0; j < agents.length; j++) {
    if (j === agentIndex) continue;
    const neighbor = agents[j];
    const dist = Math.hypot(self.x - neighbor.x, self.y - neighbor.y);

    // If within communication range (Adjacency a_ij = 1)
    if (dist < communicationRadius) {
      const targetDx = desiredOffsets ? desiredOffsets[j].dx - desiredOffsets[agentIndex].dx : 0;
      const targetDy = desiredOffsets ? desiredOffsets[j].dy - desiredOffsets[agentIndex].dy : 0;

      // Laplacian Consensus Error
      vx -= (self.x - neighbor.x - targetDx);
      vy -= (self.y - neighbor.y - targetDy);
    }
  }

  return { vx, vy };
}`}
        mappings={[
          {
            mathSymbol: '\\dot{\\mathbf{p}}_i',
            codeIdentifier: 'vx, vy',
            explanation: isId ? 'Vektor kecepatan perintah pergerakan agen' : 'Output commanded velocity vector',
          },
          {
            mathSymbol: 'a_{ij} = 1',
            codeIdentifier: 'dist < communicationRadius',
            explanation: isId ? 'Konektivitas graf ditentukan oleh jangkauan sinyal radio lokal' : 'Spatial neighbor connectivity within radio range',
          },
          {
            mathSymbol: '\\mathbf{d}_{ij}^*',
            codeIdentifier: 'targetDx, targetDy',
            explanation: isId ? 'Offset jarak relatif yang diinginkan untuk mempertahankan bentuk formasi' : 'Desired relative distance offset for geometric formation keeping',
          },
        ]}
      />

      {/* 4. Concept Check Quiz */}
      <ConceptCheck
        id="quiz-multi-agent"
        question={
          isId
            ? 'Apa yang menjamin konvergensi konsensus pada sistem multi-agent terdistribusi?'
            : 'What mathematical property guarantees convergence in decentralized multi-agent consensus?'
        }
        options={[
          {
            id: 'A',
            text: isId ? 'Graf komunikasi harus selalu terhubung (Connected Graph, lambda_2 > 0).' : 'The communication graph must remain connected (algebraic connectivity lambda_2 > 0).',
            isCorrect: true,
            explanation: isId
              ? 'Tepat! Selama graf komunikasi terhubung, nilai eigen terkecil non-nol lambda_2 > 0 menjamin konvergensi posisi bersama.'
              : 'Correct! A connected topology ensures lambda_2 > 0, mathematically guaranteeing asymptotic agreement.',
          },
          {
            id: 'B',
            text: isId ? 'Setiap robot harus memiliki sensor kamera 4K.' : 'Every robot must possess a 4K camera.',
            isCorrect: false,
            explanation: isId ? 'Konsensus graf bekerja dengan pesan posisi sederhana.' : 'Consensus only requires minimal position scalar messages.',
          },
          {
            id: 'C',
            text: isId ? 'Harus ada server utama yang mengendalikan seluruh robot.' : 'A master mainframe must command all robots.',
            isCorrect: false,
            explanation: isId ? 'Protokol konsensus Laplacian sepenuhnya terdesentralisasi tanpa server.' : 'Laplacian consensus is strictly peer-to-peer and decentralized.',
          },
        ]}
        hint={isId ? 'Pikirkan tentang konektivitas jaringan graf.' : 'Think about network graph connectivity.'}
      />

      {/* 5. Academic References */}
      <AcademicReferences
        references={[
          {
            id: 1,
            authors: 'Reza Olfati-Saber, J. Alex Fax, & Richard M. Murray',
            year: 2007,
            title: 'Consensus and Cooperation in Networked Multi-Agent Systems',
            publisher: 'Proceedings of the IEEE',
            chapterCoverage: 'Comprehensive survey on Graph Laplacian consensus dynamics and formations.',
            doiOrUrl: 'https://doi.org/10.1109/JPROC.2006.887293',
          },
          {
            id: 2,
            authors: 'Marco Ben-Ari & Francesco Mondada',
            year: 2018,
            title: 'Elements of Robotics',
            publisher: 'Springer Open',
            chapterCoverage: 'Chapter 14: Collective & Swarm Robotics',
            doiOrUrl: 'https://doi.org/10.1007/978-3-319-62533-1',
          },
        ]}
      />

      {/* 6. Lesson Navigation */}
      <LessonNavigation
        prevLesson={{
          domain: isId ? 'SLAM Robot' : 'Robotics SLAM',
          title: isId ? 'SLAM & Registrasi Scan ICP' : 'SLAM & ICP Scan Registration',
          href: '/learn/slam',
        }}
        nextLesson={{
          domain: isId ? 'Fondasi Robotika' : 'Robotics Foundations',
          title: isId ? 'Fondasi Robotika & Kinematika' : 'Robotics Foundations & Kinematics',
          href: '/learn/fundamentals',
        }}
        suggestedExperiments={[
          isId ? 'Pilih mode formasi "V-Shape" atau "Circle" dan amati bagaimana kawanan menyusun diri secara terdistribusi.' : 'Switch between V-Shape, Circle, and Line formations to observe distributed self-organization.',
          isId ? 'Klik dan seret Leader robot untuk melihat seluruh agen kawanan mengikuti formasi secara dinamis.' : 'Click and drag the Leader robot to steer the entire flocking swarm dynamically.',
        ]}
      />
    </div>
  );
}
