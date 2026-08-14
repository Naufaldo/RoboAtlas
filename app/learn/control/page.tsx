'use client';

import React from 'react';
import { ControlSimulator } from '@/components/simulation/ControlSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cpu, Sparkles, BookOpen } from 'lucide-react';

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
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
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
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
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
          { symbol: 'delta (δ)', name: 'Steering Angle', unit: 'rad', meaning: isId ? 'Sudut kemudi yang diberikan ke roda depan' : 'Commanded front wheel steering angle' },
          { symbol: 'L', name: 'Wheelbase', unit: 'm', meaning: isId ? 'Jarak antara sumbu roda depan dan belakang' : 'Distance between front and rear axle centers' },
          { symbol: 'L_f', name: 'Lookahead Distance', unit: 'm', meaning: isId ? 'Jarak pandang ke titik target pada jalur referensi' : 'Forward lookahead search distance along reference path' },
          { symbol: 'alpha (α)', name: 'Relative Target Angle', unit: 'rad', meaning: isId ? 'Sudut antara orientasi hadap robot dan arah titik lookahead' : 'Angle between vehicle heading vector and lookahead point' },
        ]}
        derivationSteps={[
          {
            step: isId ? 'Geometri Busur Lingkaran (Hukum Sinus)' : 'Circular Arc Geometry',
            latex: '\\frac{L_f}{\\sin(2\\alpha)} = \\frac{R}{\\sin(90^\\circ - \\alpha)} = \\frac{R}{\\cos\\alpha} \\implies R = \\frac{L_f}{2\\sin\\alpha}',
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
            'tan(delta) = (2 * 1.5 * 0.3429) / 3.0 = 1.0287 / 3.0 = 0.3429',
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
            { key: 'L', label: 'Wheelbase (L)', unit: 'm', default: 1.2, min: 0.5, max: 3.0, step: 0.1 },
            { key: 'Lf', label: 'Lookahead (L_f)', unit: 'm', default: 2.5, min: 1.0, max: 6.0, step: 0.2 },
            { key: 'alpha', label: 'Relative Angle (α)', unit: 'rad', default: 0.4, min: -1.2, max: 1.2, step: 0.05 },
          ],
          calculate: (inputs) => {
            const { L, Lf, alpha } = inputs;
            const delta = Math.atan((2 * L * Math.sin(alpha)) / Lf);
            const deg = (delta * 180) / Math.PI;
            return {
              steps: [
                `tan(δ) = (2 * ${L} * sin(${alpha})) / ${Lf} = ${Math.tan(delta).toFixed(3)}`,
                `δ = atan(${Math.tan(delta).toFixed(3)}) = ${delta.toFixed(3)} rad (${deg.toFixed(1)}°)`,
              ],
              result: `δ = ${delta.toFixed(3)} rad (${deg.toFixed(1)}°)`,
            };
          },
        }}
      />

      {/* 3. Stanley Controller Formula Explainer */}
      <FormulaExplainer
        id="formula-stanley-controller"
        title={isId ? 'Kendali Sumbu Roda Depan Stanley' : 'Stanley Cross-Track Steering Controller'}
        latex="\delta(t) = \theta_e(t) + \arctan\left( \frac{k \cdot e(t)}{v(t)} \right)"
        meaning={
          isId
            ? 'Hukum kendali umpan balik non-linear yang mengoreksi kesalahan arah hadap (theta_e) dan kesalahan posisi melenceng samping (cross-track error e) secara proporsional terhadap kecepatan kendaraan.'
            : 'Non-linear feedback control law eliminating heading error (theta_e) and lateral cross-track error (e) scaled inversely with vehicle velocity.'
        }
        whyExplanation={
          isId
            ? 'Ketika robot melaju kencang, koreksi kemudi harus lebih kecil/halus agar tidak tergelincir (oleh karena itu dibagi v(t)). Ketika robot melaju lambat, kemudi boleh berbelok tajam untuk segera kembali ke jalur.'
            : 'At higher speeds, aggressive steering causes spinout; dividing by v(t) dampens lateral feedback. At low speeds, sharper steering angles rapidly eliminate tracking errors.'
        }
        variables={[
          { symbol: 'theta_e (θ_e)', name: 'Heading Error', unit: 'rad', meaning: isId ? 'Selisih antara sudut hadap robot dan arah tangensial jalur' : 'Difference between vehicle heading and path tangent angle' },
          { symbol: 'e(t)', name: 'Cross-Track Error', unit: 'm', meaning: isId ? 'Jarak tegak lurus dari sumbu roda depan ke titik terdekat di jalur' : 'Lateral distance from front axle center to nearest path point' },
          { symbol: 'k', name: 'Gain Parameter', unit: 's^-1', meaning: isId ? 'Konstanta proporsional sensitivitas kesalahan samping' : 'Proportional cross-track correction gain' },
          { symbol: 'v(t)', name: 'Forward Velocity', unit: 'm/s', meaning: isId ? 'Kecepatan maju kendaraan saat ini' : 'Instantaneous forward vehicle velocity' },
        ]}
        roboticsApplication={
          isId
            ? 'Juara kompetisi DARPA Grand Challenge (Stanford Racing Team - Robot "Stanley"). Standar emas kendali kemudi mobil otonom di jalan raya.'
            : 'Winner of the DARPA Grand Challenge (Stanford "Stanley" vehicle); industry standard for road autonomous vehicle lane tracking.'
        }
      />

      {/* Next Steps Navigation */}
      <LessonNavigation
        prevLesson={{
          domain: isId ? 'Lokalisasi Robot' : 'Robot Localization',
          title: isId ? 'Filter Partikel Monte Carlo' : 'Monte Carlo Particle Filter',
          href: '/learn/localization',
        }}
        nextLesson={{
          domain: isId ? 'Pemetaan Robot' : 'Occupancy Mapping',
          title: isId ? 'Pemetaan Grid Okupansi Log-Odds' : 'Log-Odds Occupancy Grid Mapping',
          href: '/learn/mapping',
        }}
        suggestedExperiments={[
          isId ? 'Tingkatkan kecepatan kendaraan di simulator kendali dan amati fenomena overshoot pada tikungan tajam' : 'Increase vehicle target speed to observe tracking overshoot on sharp track curves',
          isId ? 'Bandingkan kestabilan kemudi antara Pure Pursuit dan Stanley pada lintasan angka 8' : 'Compare steering oscillation between Pure Pursuit and Stanley on figure-8 tracks',
          isId ? 'Ubah parameter lookahead distance L_f di kalkulator Pure Pursuit untuk melihat efek pemotongan tikungan' : 'Adjust lookahead parameter L_f in the calculator to evaluate corner-cutting vs stability',
        ]}
      />
    </div>
  );
}
