'use client';

import React from 'react';
import { SlamSimulator } from '@/components/simulation/SlamSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import { ConceptCheck } from '@/components/educational/ConceptCheck';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function SlamPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <RotateCcw className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 7 • Laboratorium Domain' : 'Milestone 7 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'SLAM & Registrasi Scan ICP' : 'Simultaneous Localization & Mapping (SLAM) with ICP'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Pecahkan dilema ayam-dan-telur dalam robotika: lakukan registrasi pemindaian laser berurutan untuk membangun peta global sekaligus melacak drift pose menggunakan Iterative Closest Point (ICP).'
            : 'Solve the fundamental chicken-or-egg problem of robotics: register successive laser scans to construct global maps while tracking pose drift using Iterative Closest Point (ICP).'}
        </p>
      </div>

      {/* Lesson Orientation */}
      <LessonOrientation
        domain={isId ? 'SLAM Robotika' : 'Robotics SLAM'}
        lessonTitle={isId ? 'Registrasi Pindaian Laser ICP (Iterative Closest Point)' : 'ICP Point Cloud Scan Registration'}
        estimatedMinutes={25}
        learningObjectives={
          isId
            ? [
                'Memahami dilema ayam-dan-telur pada SLAM (memetakan butuh lokasi, melokalisasi butuh peta)',
                'Menghitung perataan awan titik (point cloud) dengan fungsi objektif kuadrat terkecil ICP',
                'Mengetahui penyelesaian rotasi optimal R menggunakan dekomposisi nilai singular SVD',
              ]
            : [
                'Understand the classic chicken-or-egg SLAM dilemma',
                'Compute rigid 2D point cloud alignment using least-squares ICP objective',
                'Derive optimal rotation matrix R via Singular Value Decomposition (SVD)',
              ]
        }
        whyItMatters={
          isId
            ? 'Tanpa SLAM, robot tidak akan bisa bernavigasi di lingkungan asing atau luar ruangan yang belum memiliki peta sebelumnya.'
            : 'Without SLAM, robots cannot explore unknown environments or operate without pre-surveyed architectural floor plans.'
        }
      />

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Pencocokan Pindaian ICP Interaktif' : 'Interactive ICP Scan Matching Workstation'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
            SVD Rigid Alignment
          </span>
        </div>
        <SlamSimulator />
      </div>

      {/* 2. Formula Explainer with Live Calculator */}
      <FormulaExplainer
        id="formula-icp-objective"
        title={isId ? 'Fungsi Biaya Registrasi Kuadrat Terkecil ICP' : 'ICP Least-Squares Rigid Registration Objective'}
        latex="E(R, \mathbf{t}) = \sum_{i=1}^{N} \left\| \mathbf{q}_i - (R\, \mathbf{p}_i + \mathbf{t}) \right\|^2, \quad R = V U^T"
        meaning={
          isId
            ? 'Mencari matriks rotasi kaku R dan vektor translasi t yang paling presisi menempelkan awan titik pindaian saat ini {p_i} ke awan titik referensi peta {q_i}.'
            : 'Finds the rigid rotation matrix R and translation vector t that optimally align the current sensor point cloud {p_i} onto the target reference point cloud {q_i}.'
        }
        whyExplanation={
          isId
            ? 'Saat robot bergerak, pemindaian LiDAR berikutnya mengalami pergeseran posisi dan sudut akibat gerakan robot. Dengan meminimalkan jarak kuadrat Euclidean antar titik terdekat, robot dapat mengetahui pergeseran gerak pastinya secara independen tanpa tergantung odometri roda.'
            : 'As the robot moves, consecutive LiDAR scans are displaced by robot motion. Minimizing the Euclidean sum of squared point distances computes the exact relative displacement independent of wheel slip.'
        }
        variables={[
          {
            symbol: 'E(R, t)',
            name: isId ? 'Error Residu Kuadrat' : 'Squared Residual Error',
            unit: 'm^2',
            meaning: isId ? 'Jumlah akumulasi kuadrat jarak antara pasangan titik yang berkorespondensi' : 'Sum of squared Euclidean distances between corresponding points',
          },
          {
            symbol: 'q_i',
            name: isId ? 'Titik Target Peta' : 'Target Map Point',
            unit: 'm',
            meaning: isId ? 'Koordinat titik target pada peta referensi' : 'Target point in reference coordinate frame',
          },
          {
            symbol: 'p_i',
            name: isId ? 'Titik Sumber Sensor' : 'Source Sensor Point',
            unit: 'm',
            meaning: isId ? 'Koordinat titik yang diukur oleh pemindaian laser saat ini' : 'Current sensor point measurement',
          },
          {
            symbol: 'R, t',
            name: isId ? 'Rotasi SO(2) & Translasi' : 'Rotation & Translation',
            unit: 'rad & m',
            meaning: isId ? 'Transformasi kaku rigid yang sedang dioptimasi' : 'Rigid body spatial transform being estimated',
          },
        ]}
        derivationSteps={[
          {
            step: isId ? 'Hitung Centroid Awan Titik' : 'Compute Point Cloud Centroids',
            latex: '\\bar{\\mathbf{p}} = \\frac{1}{N}\\sum_{i=1}^N \\mathbf{p}_i, \\quad \\bar{\\mathbf{q}} = \\frac{1}{N}\\sum_{i=1}^N \\mathbf{q}_i',
            explanation: isId ? 'Pusatkan kedua awan titik dengan mengurangkan centroid masing-masing.' : 'Subtracted from coordinates to decouple translation from rotation.',
          },
          {
            step: isId ? 'Matriks Kovarians Silang H & SVD' : 'Cross-Covariance Matrix H & SVD Factorization',
            latex: 'H = \\sum (\\mathbf{p}_i - \\bar{\\mathbf{p}})(\\mathbf{q}_i - \\bar{\\mathbf{q}})^T = U \\Sigma V^T',
            explanation: isId ? 'Dekomposisi SVD menghasilkan matriks ortogonal U dan V.' : 'SVD decomposition yields rotation components.',
          },
          {
            step: isId ? 'Rotasi & Translasi Optimal' : 'Optimal Closed-Form Solution',
            latex: 'R^* = V U^T, \\quad \\mathbf{t}^* = \\bar{\\mathbf{q}} - R^* \\bar{\\mathbf{p}}',
            explanation: isId ? 'Solusi bentuk tertutup yang meminimalkan residual error.' : 'Guaranteed closed-form optimal transformation.',
          },
        ]}
        numericalExample={{
          inputs: { 'dx': 0.5, 'dy': 0.3, 'dtheta_deg': 15 },
          calculationSteps: [
            'Initial translational error = sqrt(0.5^2 + 0.3^2) = 0.583 m',
            'SVD(H) closed-form rotation recovery R = Rot(15 deg)',
            't = q_bar - R * p_bar = [0.5, 0.3] m',
            'Iterative scan convergence in 3 steps: Residual error E -> 0.000',
          ],
          result: 'R = Rot(15°), t = [0.5, 0.3] m',
        }}
        roboticsApplication={
          isId
            ? 'Digunakan pada seluruh algoritma 2D/3D LiDAR SLAM (seperti Cartographer, Hector SLAM, LOAM, dan Fast-LIO) untuk scan matching berkala tinggi.'
            : 'Core component of 2D/3D LiDAR SLAM systems (including Cartographer, Hector SLAM, and LOAM) for real-time laser scan registration.'
        }
        calculator={{
          params: [
            { key: 'dx', label: 'Translation dx', unit: 'm', default: 0.5, min: 0, max: 2.0, step: 0.1 },
            { key: 'dy', label: 'Translation dy', unit: 'm', default: 0.3, min: 0, max: 2.0, step: 0.1 },
            { key: 'dtheta_deg', label: 'Angle Offset (dtheta)', unit: 'deg', default: 15, min: 0, max: 45, step: 1 },
          ],
          calculate: (inputs: Record<string, number>) => {
            const { dx, dy, dtheta_deg } = inputs;
            const rad = (dtheta_deg * Math.PI) / 180;
            const r = 2.0;
            const rotErr = 2 * r * Math.sin(rad / 2);
            const rms = Math.sqrt(dx * dx + dy * dy + rotErr * rotErr);
            return {
              steps: [
                `Translational Offset = sqrt(${dx}^2 + ${dy}^2) = ${Math.hypot(dx, dy).toFixed(3)} m`,
                `Rotational Arc Displacement at radius 2.0m = ${rotErr.toFixed(3)} m`,
                `Initial RMS Residual Error = ${rms.toFixed(3)} m`,
              ],
              result: `RMS Error = ${rms.toFixed(3)} m`,
            };
          },
        }}
      />

      {/* 3. Math to Code Bridge */}
      <MathCodeBridge
        title="Iterative Closest Point 2D Scan Matching Loop"
        mathLatex="H = \sum \mathbf{p}_i' (\mathbf{q}_i')^T, \quad R = V U^T, \quad \mathbf{t} = \bar{\mathbf{q}} - R\bar{\mathbf{p}}"
        explanation={
          isId
            ? 'Implementasi pencocokan scan matching ICP 2D berbasis kovarians silang SVD pada TypeScript.'
            : 'Closed-form SVD 2D rigid alignment implementation in TypeScript.'
        }
        codeSnippet={`// TypeScript: ICP 2D Scan Matching Closed-Form Step
export function computeICPStep(
  sourcePoints: { x: number; y: number }[],
  targetPoints: { x: number; y: number }[]
): { R: number[][]; t: { x: number; y: number } } {
  // 1. Find nearest neighbors (Correspondences)
  const matched = sourcePoints.map(p => findClosestPoint(p, targetPoints));

  // 2. Compute Centroids
  const pBar = computeCentroid(sourcePoints);
  const qBar = computeCentroid(matched);

  // 3. Compute 2x2 Cross-Covariance Matrix H
  let sxx = 0, sxy = 0, syx = 0, syy = 0;
  for (let i = 0; i < sourcePoints.length; i++) {
    const px = sourcePoints[i].x - pBar.x;
    const py = sourcePoints[i].y - pBar.y;
    const qx = matched[i].x - qBar.x;
    const qy = matched[i].y - qBar.y;
    sxx += px * qx; sxy += px * qy;
    syx += py * qx; syy += py * qy;
  }

  // 4. Closed-form 2D rotation angle
  const theta = Math.atan2(sxy - syx, sxx + syy);
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);

  // 5. Optimal translation
  const tx = qBar.x - (cosT * pBar.x - sinT * pBar.y);
  const ty = qBar.y - (sinT * pBar.x + cosT * pBar.y);

  return { R: [[cosT, -sinT], [sinT, cosT]], t: { x: tx, y: ty } };
}`}
        mappings={[
          {
            mathSymbol: 'H',
            codeIdentifier: 'sxx, sxy, syx, syy',
            explanation: isId ? 'Matriks kovarians silang antara titik sumber dan target terpusat' : '2x2 cross-covariance accumulator matrix',
          },
          {
            mathSymbol: 'R = VU^T',
            codeIdentifier: 'theta = atan2(sxy - syx, sxx + syy)',
            explanation: isId ? 'Solusi analitik bentuk tertutup untuk rotasi optimal 2D' : 'Closed-form analytical solution for optimal 2D planar rotation',
          },
          {
            mathSymbol: '\\mathbf{t} = \\bar{\\mathbf{q}} - R\\bar{\\mathbf{p}}',
            codeIdentifier: 'tx, ty',
            explanation: isId ? 'Translasi yang menyelaraskan kedua centroid titik' : 'Translation aligning point cloud centroids',
          },
        ]}
      />

      {/* 4. Concept Check Quiz */}
      <ConceptCheck
        id="quiz-slam"
        question={
          isId
            ? 'Mengapa masalah SLAM disebut sebagai masalah "ayam-dan-telur" (chicken-and-egg problem)?'
            : 'Why is SLAM referred to as a "chicken-and-egg" problem in robotics?'
        }
        options={[
          {
            id: 'A',
            text: isId ? 'Karena robot dirancang berbentuk oval seperti telur.' : 'Because robots are shaped like eggs.',
            isCorrect: false,
            explanation: isId ? 'Pilihan ini salah.' : 'Incorrect.',
          },
          {
            id: 'B',
            text: isId
              ? 'Untuk membangun peta yang akurat, robot harus tahu posisinya; namun untuk tahu posisinya dengan tepat, robot membutuhkan peta yang akurat.'
              : 'To build an accurate map, the robot needs its exact pose; but to estimate its pose accurately, it needs a reliable map.',
            isCorrect: true,
            explanation: isId
              ? 'Tepat sekali! SLAM menyelesaikan kedua hal tersebut secara simultan menggunakan estimasi rekursif bersama.'
              : 'Correct! SLAM simultaneously estimates both the robot trajectory and map landmarks concurrently.',
          },
          {
            id: 'C',
            text: isId ? 'Karena sensor laser hanya bekerja di peternakan.' : 'Because laser rangefinders only work in agricultural settings.',
            isCorrect: false,
            explanation: isId ? 'Salah.' : 'Incorrect.',
          },
        ]}
        hint={isId ? 'Pikirkan tentang ketergantungan timbal balik antara peta dan posisi.' : 'Think about the circular dependency between mapping and localization.'}
      />

      {/* 5. Academic References */}
      <AcademicReferences
        references={[
          {
            id: 1,
            authors: 'Paul J. Besl & Neil D. McKay',
            year: 1992,
            title: 'A Method for Registration of 3-D Shapes',
            publisher: 'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)',
            chapterCoverage: 'Seminal paper introducing the Iterative Closest Point (ICP) algorithm.',
            doiOrUrl: 'https://doi.org/10.1109/34.121791',
          },
          {
            id: 2,
            authors: 'Sebastian Thrun, Wolfram Burgard, & Dieter Fox',
            year: 2005,
            title: 'Probabilistic Robotics',
            publisher: 'MIT Press',
            chapterCoverage: 'Chapter 10: Simultaneous Localization and Mapping (SLAM)',
            doiOrUrl: 'https://mitpress.mit.edu/9780262201629/probabilistic-robotics/',
          },
        ]}
      />

      {/* 6. Lesson Navigation */}
      <LessonNavigation
        prevLesson={{
          domain: isId ? 'Pemetaan Robot' : 'Occupancy Mapping',
          title: isId ? 'Pemetaan Grid Okupansi Log-Odds' : 'Log-Odds Occupancy Grid Mapping',
          href: '/learn/mapping',
        }}
        nextLesson={{
          domain: isId ? 'Multi-Agent Robot' : 'Multi-Agent Robotics',
          title: isId ? 'Koordinasi Multi-Agent & Konsensus Laplacian' : 'Multi-Agent Coordination & Laplacian Consensus',
          href: '/learn/multi-agent',
        }}
        suggestedExperiments={[
          isId ? 'Geser slider offset posisi awal pada simulator untuk melihat bagaimana ICP secara bertahap merapatkan awan titik merah ke awan titik biru.' : 'Adjust initial displacement sliders and click Step to observe the red point cloud iterative alignment.',
          isId ? 'Amati penurunan drastis pada grafik Residual Error E(R, t) setelah 3-5 iterasi konvergen.' : 'Observe the steep drop in residual error E(R, t) over 3–5 iterations.',
        ]}
      />
    </div>
  );
}
