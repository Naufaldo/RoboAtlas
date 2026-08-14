'use client';

import React from 'react';
import { ControlSimulator } from '@/components/simulation/ControlSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import { ConceptCheck } from '@/components/educational/ConceptCheck';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cpu, Sparkles } from 'lucide-react';

export default function ControlPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 6 • Laboratorium Domain' : 'Milestone 6 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Kendali Umpan Balik & Pelacakan Jalur Robot' : 'Robot Feedback Control & Path Tracking'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Eksekusi hukum kendali pelacakan trajektori geometris dan kinematik. Bandingkan geometri titik pandang depan Pure Pursuit dengan umpan balik kesalahan cross-track kemudi Stanley.'
            : 'Execute geometric and kinematic trajectory tracking control laws. Compare the lookahead geometry of Pure Pursuit against Stanley steering cross-track error feedback.'}
        </p>
      </div>

      {/* Lesson Orientation Card */}
      <LessonOrientation
        domain={isId ? 'Kendali Robot' : 'Robot Control'}
        lessonTitle={isId ? 'Pelacakan Jalur: Pure Pursuit vs Stanley' : 'Path Tracking: Pure Pursuit vs Stanley'}
        estimatedMinutes={20}
        learningObjectives={[
          isId ? 'Memahami konsep titik pandang depan (lookahead distance) pada Pure Pursuit' : 'Understand geometric lookahead point pursuit mechanics',
          isId ? 'Menganalisis kesalahan lateral (cross-track error) dan kesalahan sudut hadap' : 'Analyze lateral cross-track and heading error dynamics',
          isId ? 'Menghitung sudut kemudi optimal dengan pembagian kecepatan non-linear pada Stanley' : 'Calculate Stanley velocity-scaled nonlinear steering commands',
        ]}
        whyItMatters={
          isId
            ? 'Rencana jalur yang sempurna tidak ada gunanya jika aktuator kemudi robot tidak mampu menempel pada garis lintasan secara stabil pada kecepatan tinggi.'
            : 'A planned path is useless if the vehicle steering actuators cannot track reference trajectories stably at speed.'
        }
      />

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Kemudi Pelacak Jalur Interaktif' : 'Interactive Path Tracking Steering Sandbox'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
            Pure Pursuit & Stanley
          </span>
        </div>
        <ControlSimulator />
      </div>

      {/* 2. Pure Pursuit Formula Explainer */}
      <FormulaExplainer
        id="formula-pure-pursuit"
        title={isId ? 'Hukum Kemudi Geometris Pure Pursuit' : 'Pure Pursuit Geometric Steering Law'}
        latex="\delta = \arctan\left( \frac{2 L \sin\alpha}{L_f} \right)"
        meaning={
          isId
            ? 'Menghitung sudut kemudi roda depan delta yang mengarahkan robot menuju titik target pada jalur yang berjarak sejauh L_f di depan robot dengan sudut relatif alpha.'
            : 'Calculates the front steering angle delta required to follow a circular arc intersecting a lookahead point at distance L_f with relative heading angle alpha.'
        }
        whyExplanation={
          isId
            ? 'Pure Pursuit membentuk busur lingkaran antara pusat roda belakang robot dan titik lookahead target. Semakin besar sudut alpha (target melenceng jauh), kemudi berbelok semakin tajam. Semakin besar jarak lookahead L_f, lintasan menjadi lebih halus dan stabil namun memotong tikungan (corner cutting).'
            : 'Pure Pursuit fits a circular arc from rear axle to lookahead target. Larger alpha produces sharper turns. Increasing lookahead distance L_f stabilizes the steering response but introduces corner cutting.'
        }
        variables={[
          {
            symbol: 'delta (δ)',
            name: isId ? 'Sudut Kemudi Roda Depan' : 'Steering Angle',
            unit: 'rad',
            meaning: isId ? 'Sudut kemudi yang diberikan ke roda depan' : 'Commanded front wheel steering angle',
          },
          {
            symbol: 'L',
            name: isId ? 'Panjang Sumbu Roda' : 'Wheelbase',
            unit: 'm',
            meaning: isId ? 'Jarak antara sumbu roda depan dan belakang' : 'Distance between front and rear axle centers',
          },
          {
            symbol: 'L_f',
            name: isId ? 'Jarak Titik Pandang Depan' : 'Lookahead Distance',
            unit: 'm',
            meaning: isId ? 'Jarak pandang ke titik target pada jalur referensi' : 'Forward lookahead search distance along reference path',
          },
          {
            symbol: 'alpha (α)',
            name: isId ? 'Sudut Relatif Titik Target' : 'Relative Target Angle',
            unit: 'rad',
            meaning: isId ? 'Sudut antara orientasi hadap robot dan arah titik lookahead' : 'Angle between vehicle heading vector and lookahead point',
          },
        ]}
        derivationSteps={[
          {
            step: isId ? 'Geometri Busur Lingkaran (Hukum Sinus)' : 'Circular Arc Geometry',
            latex: '\\frac{L_f}{\\sin(2\\alpha)} = \\frac{R}{\\cos\\alpha} \\implies R = \\frac{L_f}{2\\sin\\alpha}',
            explanation: isId ? 'Menghitung jari-jari kelengkungan lingkaran R dari segitiga isosceles.' : 'Solving for turning radius R from the chord geometry.',
          },
          {
            step: isId ? 'Pemetaan Model Sepeda Ackermann' : 'Ackermann Bicycle Steering Kinematics',
            latex: '\\tan\\delta = \\frac{L}{R} = \\frac{2 L \\sin\\alpha}{L_f} \\implies \\delta = \\arctan\\left(\\frac{2 L \\sin\\alpha}{L_f}\\right)',
            explanation: isId ? 'Menghubungkan wheelbase L dan kurvatur 1/R dengan sudut kemudi delta.' : 'Relating curvature to front wheel angle delta.',
          },
        ]}
        numericalExample={{
          inputs: { 'L (wheelbase)': 1.5, 'L_f (lookahead)': 3.0, 'alpha (rad)': 0.35 },
          calculationSteps: [
            'sin(0.35) = 0.3429',
            'tan(delta) = (2 * 1.5 * 0.3429) / 3.0 = 0.3429',
            'delta = atan(0.3429) = 0.3303 rad (18.9°)',
          ],
          result: 'δ = 0.330 rad (18.9°)',
        }}
        roboticsApplication={
          isId
            ? 'Algoritma pelacakan trajektori klasik yang digunakan pada DARPA Grand Challenge dan kendaraan otonom kecepatan rendah hingga menengah.'
            : 'Widely used path tracker for autonomous mobile robots and low-to-medium speed self-driving vehicles.'
        }
        calculator={{
          params: [
            { key: 'L', label: 'Wheelbase (L)', unit: 'm', default: 1.5, min: 0.5, max: 3.0, step: 0.1 },
            { key: 'Lf', label: 'Lookahead (L_f)', unit: 'm', default: 3.0, min: 1.0, max: 6.0, step: 0.2 },
            { key: 'alpha_deg', label: 'Relative Angle (deg)', unit: 'deg', default: 20, min: -45, max: 45, step: 1 },
          ],
          calculate: (inputs: Record<string, number>) => {
            const { L, Lf, alpha_deg } = inputs;
            const alphaRad = (alpha_deg * Math.PI) / 180;
            const delta = Math.atan((2 * L * Math.sin(alphaRad)) / Lf);
            const deg = (delta * 180) / Math.PI;
            return {
              steps: [
                `tan(δ) = (2 * ${L} * sin(${alpha_deg}°)) / ${Lf} = ${Math.tan(delta).toFixed(3)}`,
                `δ = atan(${Math.tan(delta).toFixed(3)}) = ${delta.toFixed(3)} rad (${deg.toFixed(1)}°)`,
              ],
              result: `δ = ${delta.toFixed(3)} rad (${deg.toFixed(1)}°)`,
            };
          },
        }}
      />

      {/* 3. Math to Code Bridge */}
      <MathCodeBridge
        title="Pure Pursuit & Stanley Path Tracking Control"
        mathLatex="\delta_{PP} = \arctan\left(\frac{2L\sin\alpha}{L_f}\right), \quad \delta_{Stanley} = \theta_e + \arctan\left(\frac{k \cdot e}{v}\right)"
        explanation={
          isId
            ? 'Implementasi penentuan sudut kemudi Pure Pursuit dan koreksi Stanley pada TypeScript.'
            : 'Pure Pursuit and Stanley steering computation in TypeScript.'
        }
        codeSnippet={`// TypeScript: Pure Pursuit Steering Angle Computation
export function computePurePursuitSteering(
  robotPose: { x: number; y: number; yaw: number },
  lookaheadPoint: { x: number; y: number },
  wheelbase: number,
  lookaheadDist: number
): number {
  const dx = lookaheadPoint.x - robotPose.x;
  const dy = lookaheadPoint.y - robotPose.y;
  
  // Angle to lookahead point in global frame
  const targetAngle = Math.atan2(dy, dx);
  
  // Relative angle alpha in vehicle frame
  let alpha = targetAngle - robotPose.yaw;
  while (alpha > Math.PI) alpha -= 2 * Math.PI;
  while (alpha < -Math.PI) alpha += 2 * Math.PI;

  // Pure Pursuit curvature steering
  const delta = Math.atan2(2 * wheelbase * Math.sin(alpha), lookaheadDist);
  return delta;
}`}
        mappings={[
          {
            mathSymbol: '\\delta',
            codeIdentifier: 'delta',
            explanation: isId ? 'Sudut belok kemudi yang diperintahkan ke servo roda depan' : 'Commanded steering angle for front wheels',
          },
          {
            mathSymbol: 'L',
            codeIdentifier: 'wheelbase',
            explanation: isId ? 'Panjang jarak antara sumbu roda depan dan belakang' : 'Vehicle axle wheelbase',
          },
          {
            mathSymbol: 'L_f',
            codeIdentifier: 'lookaheadDist',
            explanation: isId ? 'Jarak pencarian titik pandang depan pada jalur' : 'Forward lookahead path distance',
          },
          {
            mathSymbol: '\\alpha',
            codeIdentifier: 'alpha',
            explanation: isId ? 'Sudut antara hadap bodi robot dan target' : 'Relative heading angle error',
          },
        ]}
      />

      {/* 4. Concept Check Quiz */}
      <ConceptCheck
        id="quiz-control"
        question={
          isId
            ? 'Apa dampak memperbesar nilai jarak lookahead (L_f) pada algoritma Pure Pursuit?'
            : 'What is the physical effect of increasing the lookahead distance (L_f) in Pure Pursuit?'
        }
        options={[
          {
            id: 'A',
            text: isId ? 'Pergerakan menjadi lebih halus dan stabil, namun memotong tikungan (corner-cutting).' : 'Tracking becomes smoother and stable, but cuts sharp corners.',
            isCorrect: true,
            explanation: isId
              ? 'Tepat! L_f yang panjang meredam osilasi kemudi namun memperpendek radius putar di tikungan.'
              : 'Correct! Longer lookahead dampens oscillations but causes the vehicle to cut corners.',
          },
          {
            id: 'B',
            text: isId ? 'Robot akan melaju mundur dengan kecepatan tinggi.' : 'The robot begins driving backwards.',
            isCorrect: false,
            explanation: isId ? 'Salah.' : 'Incorrect.',
          },
          {
            id: 'C',
            text: isId ? 'Motor robot akan berhenti secara permanen.' : 'Motors shut down permanently.',
            isCorrect: false,
            explanation: isId ? 'Salah.' : 'Incorrect.',
          },
        ]}
        hint={isId ? 'Pikirkan tentang kompromi antara kestabilan dan akurasi lintasan.' : 'Think about trade-offs between stability and tracking fidelity.'}
      />

      {/* 5. Academic References */}
      <AcademicReferences
        references={[
          {
            id: 1,
            authors: 'R. Craig Coulter',
            year: 1992,
            title: 'Implementation of the Pure Pursuit Path Tracking Algorithm',
            publisher: 'Carnegie Mellon University Robotics Institute (CMU-RI-TR-92-01)',
            chapterCoverage: 'Seminal technical report establishing geometric pure pursuit control.',
            doiOrUrl: 'https://www.ri.cmu.edu/pub_files/pub3/coulter_r_craig_1992_1/coulter_r_craig_1992_1.pdf',
          },
          {
            id: 2,
            authors: 'Sebastian Thrun et al.',
            year: 2006,
            title: 'Stanley: The Robot that Won the DARPA Grand Challenge',
            publisher: 'Journal of Field Robotics',
            chapterCoverage: 'Section 4: Trajectory Tracking with Nonlinear Cross-Track Steering Control',
            doiOrUrl: 'https://doi.org/10.1002/rob.20147',
          },
        ]}
      />

      {/* 6. Lesson Navigation */}
      <LessonNavigation
        prevLesson={{
          domain: isId ? 'Perencanaan Jalur' : 'Path Planning',
          title: isId ? 'Perencanaan Jalur (A* & Heuristik)' : 'Path Planning (A* & Heuristics)',
          href: '/learn/planning',
        }}
        nextLesson={{
          domain: isId ? 'Lokalisasi Robot' : 'Robot Localization',
          title: isId ? 'Lokalisasi & Filter Partikel MCL' : 'Localization & MCL Particle Filter',
          href: '/learn/localization',
        }}
        suggestedExperiments={[
          isId ? 'Tingkatkan kecepatan kendaraan di simulator kendali dan amati fenomena overshoot pada tikungan tajam.' : 'Increase vehicle target speed to observe tracking overshoot on sharp track curves.',
          isId ? 'Bandingkan kestabilan kemudi antara Pure Pursuit dan Stanley pada lintasan angka 8.' : 'Compare steering oscillation between Pure Pursuit and Stanley on figure-8 tracks.',
        ]}
      />
    </div>
  );
}
