'use client';

import React from 'react';
import { LocalizationSimulator } from '@/components/simulation/LocalizationSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import { ConceptCheck } from '@/components/educational/ConceptCheck';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MapPin, Sparkles } from 'lucide-react';

export default function LocalizationPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <MapPin className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 5 • Laboratorium Domain' : 'Milestone 5 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Lokalisasi Robot & Filter Partikel Monte Carlo' : 'Robot Localization & Monte Carlo Particle Filter'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Estimasi pose sejati robot dari pengukuran sensor ber-noise dan odometri yang melayang (drift) menggunakan Filter Bayesian Rekursif dan Monte Carlo Particle Filter (MCL).'
            : 'Estimate true robot poses from noisy sensor measurements and drifting dead-reckoning odometry using recursive Bayesian filtering and Monte Carlo Particle Filters (MCL).'}
        </p>
      </div>

      {/* Lesson Orientation */}
      <LessonOrientation
        domain={isId ? 'Lokalisasi Robotika' : 'Robotics Localization'}
        lessonTitle={isId ? 'Estimasi Status dengan Filter Bayesian & MCL' : 'State Estimation with Bayesian & MCL Filters'}
        estimatedMinutes={25}
        learningObjectives={
          isId
            ? [
                'Memahami konsep distribusi probabilitas keyakinan (belief state) pada posisi robot',
                'Menghitung langkah prediksi gerak (Chapman-Kolmogorov) dan pembobotan sensor (Aturan Bayes)',
                'Menganalisis proses resampling partikel berdasarkan kecocokan jarak terhadap landmark',
              ]
            : [
                'Understand probabilistic belief state representations of robot poses',
                'Compute motion prediction (Chapman-Kolmogorov) and sensor weight updates (Bayes Rule)',
                'Analyze low-variance particle resampling based on landmark distance likelihoods',
              ]
        }
        whyItMatters={
          isId
            ? 'Tanpa lokalisasi yang andal, akumulasi kesalahan selip roda akan menyebabkan robot tersesat hanya dalam beberapa meter pergerakan.'
            : 'Without robust localization, dead-reckoning drift causes autonomous rovers to become lost after traveling only a few meters.'
        }
      />

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Filter Partikel Monte Carlo Interaktif' : 'Interactive Monte Carlo Particle Filter Sandbox'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
            Bayesian Sensor Fusion
          </span>
        </div>
        <LocalizationSimulator />
      </div>

      {/* 2. Formula Explainer with Live Calculator */}
      <FormulaExplainer
        id="formula-mcl-weight"
        title={isId ? 'Pembaruan Bobot Sensor Partikel Gaussian MCL' : 'MCL Gaussian Particle Measurement Weight Update'}
        latex="w_t^{[i]} = p(z_t \mid x_t^{[i]}) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{(z_t - \hat{z}_t^{[i]})^2}{2\sigma^2} \right)"
        meaning={
          isId
            ? 'Menghitung seberapa mungkin hipotesis partikel ke-i berada di posisi benar, berdasarkan kecocokan antara jarak sensor nyata (z_t) dengan prediksi jarak teoritis dari partikel tersebut ke landmark (\hat{z}_t).'
            : 'Calculates the likelihood weight of the i-th particle hypothesis based on the error between the actual sensor measurement (z_t) and the expected measurement (\hat{z}_t) from the candidate pose.'
        }
        whyExplanation={
          isId
            ? 'Sensor fisik selalu memiliki ketidakpastian derau Gaussian (noise). Dengan menerapkan kurva lonceng Gaussian, partikel yang memprediksi jarak sangat dekat dengan kenyataan akan diberi bobot tinggi, sedangkan partikel yang jauh dari kenyataan akan tereliminasi saat resampling.'
            : 'Physical range sensors possess Gaussian measurement noise. By evaluating the Gaussian probability density, hypotheses matching real sensor readings receive high importance weights, while distant hypotheses are eliminated during resampling.'
        }
        variables={[
          {
            symbol: 'w_t^[i]',
            name: isId ? 'Bobot Partikel i' : 'Particle Weight',
            unit: 'prob',
            meaning: isId ? 'Probabilitas tak ternormalisasi partikel ke-i mewakili pose robot sebenarnya' : 'Unnormalized likelihood of candidate state hypothesis',
          },
          {
            symbol: 'z_t',
            name: isId ? 'Sensor Aktual' : 'Actual Sensor Range',
            unit: 'm',
            meaning: isId ? 'Jarak nyata ke landmark yang dibaca oleh sensor jarak' : 'Range to landmark observed by rangefinder',
          },
          {
            symbol: 'z_hat',
            name: isId ? 'Prediksi Partikel' : 'Expected Range',
            unit: 'm',
            meaning: isId ? 'Jarak geometris teoritis dari partikel ke landmark' : 'Theoretical range expected from landmark to particle pose',
          },
          {
            symbol: 'sigma',
            name: isId ? 'Derau Sensor' : 'Sensor Noise',
            unit: 'm',
            meaning: isId ? 'Deviasi standar ketidakpastian derau alat ukur' : 'Standard deviation characterizing measurement noise',
          },
        ]}
        derivationSteps={[
          {
            step: isId ? 'Error Inovasi Sensor' : 'Sensor Innovation Measurement Error',
            latex: 'e_t^{[i]} = z_t - \\hat{z}_t^{[i]}',
            explanation: isId ? 'Selisih antara jarak sensor aktual dan jarak teoritis partikel.' : 'Difference between actual and predicted distance.',
          },
          {
            step: isId ? 'Distribusi Normal Gaussian 1D' : '1D Gaussian Density Evaluation',
            latex: 'p(e) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left(-\\frac{e^2}{2\\sigma^2}\\right)',
            explanation: isId ? 'Mengasumsikan derau berdistribusi Gaussian zero-mean.' : 'Zero-mean Gaussian noise evaluation.',
          },
        ]}
        numericalExample={{
          inputs: { 'z (sensor)': 3.0, 'z_hat (expected)': 3.1, 'sigma (noise)': 0.2 },
          calculationSteps: [
            'e = 3.0 - 3.1 = -0.1 m',
            'exponent = -(-0.1)^2 / (2 * 0.04) = -0.125',
            'exp(-0.125) = 0.8825',
            'coeff = 1 / sqrt(2 * pi * 0.04) = 1.9947',
            'w = 1.9947 * 0.8825 = 1.760',
          ],
          result: 'w = 1.760',
        }}
        roboticsApplication={
          isId
            ? 'Digunakan pada seluruh mobile robot modern (seperti TurtleBot, AGV Amazon, dan mobil otonom) untuk menggabungkan pembacaan laser scanner dengan peta yang sudah ada.'
            : 'Standard across all production mobile robots (such as Amazon Kiva AGVs and warehouse AMRs) to fuse 2D LiDAR range scans with pre-built occupancy maps.'
        }
        calculator={{
          params: [
            { key: 'z', label: 'Actual Range (z_t)', unit: 'm', default: 3.0, min: 0.5, max: 10, step: 0.1 },
            { key: 'z_hat', label: 'Expected Range (z_hat)', unit: 'm', default: 3.1, min: 0.5, max: 10, step: 0.1 },
            { key: 'sigma', label: 'Sensor Noise (sigma)', unit: 'm', default: 0.2, min: 0.05, max: 1.0, step: 0.05 },
          ],
          calculate: (inputs: Record<string, number>) => {
            const { z, z_hat, sigma } = inputs;
            const err = z - z_hat;
            const variance = sigma * sigma;
            const exponent = -(err * err) / (2 * variance);
            const coeff = 1 / Math.sqrt(2 * Math.PI * variance);
            const w = coeff * Math.exp(exponent);
            return {
              steps: [
                `Error e = ${z} - ${z_hat} = ${err.toFixed(2)} m`,
                `Exponent = -(${err.toFixed(2)}^2) / (2 * ${variance.toFixed(3)}) = ${exponent.toFixed(3)}`,
                `Likelihood Weight w = ${coeff.toFixed(3)} * exp(${exponent.toFixed(3)}) = ${w.toFixed(3)}`,
              ],
              result: `w = ${w.toFixed(3)}`,
            };
          },
        }}
      />

      {/* 3. Math to Code Bridge */}
      <MathCodeBridge
        title="Monte Carlo Localization Particle Weight & Resample"
        mathLatex="w^{[i]} = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(z - \hat{z}^{[i]})^2}{2\sigma^2}\right), \quad \tilde{w}^{[i]} = \frac{w^{[i]}}{\sum_j w^{[j]}}"
        explanation={
          isId
            ? 'Mengubah pembobotan Gaussian teoretis menjadi iterasi array partikel pada TypeScript.'
            : 'Converts theoretical Gaussian weighting into a high-performance particle array iteration in TypeScript.'
        }
        codeSnippet={`// TypeScript: Monte Carlo Particle Filter Weight Update
export function updateParticleWeights(
  particles: Particle[],
  actualRange: number,
  landmarkPos: { x: number; y: number },
  sensorNoiseSigma: number
): void {
  const variance = sensorNoiseSigma * sensorNoiseSigma;
  const coeff = 1.0 / Math.sqrt(2 * Math.PI * variance);
  let totalWeight = 0;

  for (const p of particles) {
    const dx = landmarkPos.x - p.x;
    const dy = landmarkPos.y - p.y;
    const expectedRange = Math.hypot(dx, dy);
    const error = actualRange - expectedRange;

    // Evaluate Gaussian likelihood
    p.weight = coeff * Math.exp(-(error * error) / (2 * variance));
    totalWeight += p.weight;
  }

  // Normalize weights
  if (totalWeight > 0) {
    for (const p of particles) {
      p.weight /= totalWeight;
    }
  }
}`}
        mappings={[
          {
            mathSymbol: 'w^{[i]}',
            codeIdentifier: 'p.weight',
            explanation: isId ? 'Bobot probabilitas kecocokan hipotesis partikel ke-i' : 'Likelihood weight of candidate particle hypothesis',
          },
          {
            mathSymbol: 'z',
            codeIdentifier: 'actualRange',
            explanation: isId ? 'Pengukuran jarak sensor aktual ke landmark' : 'Actual distance measured by physical range sensor',
          },
          {
            mathSymbol: '\\hat{z}^{[i]}',
            codeIdentifier: 'expectedRange',
            explanation: isId ? 'Jarak hipotesis partikel ke landmark (hypot(dx, dy))' : 'Hypothetical Euclidean distance from particle to landmark',
          },
          {
            mathSymbol: '\\sigma',
            codeIdentifier: 'sensorNoiseSigma',
            explanation: isId ? 'Deviasi standar model derau sensor Gaussian' : 'Standard deviation of Gaussian rangefinder noise model',
          },
        ]}
      />

      {/* 4. Concept Check Quiz */}
      <ConceptCheck
        id="quiz-localization"
        question={
          isId
            ? 'Mengapa odometri murni (dead-reckoning dari enkoder roda) tidak cukup untuk navigasi robot jangka panjang?'
            : 'Why is pure dead-reckoning odometry insufficient for long-term autonomous robot navigation?'
        }
        options={[
          {
            id: 'A',
            text: isId ? 'Enkoder roda mengonsumsi terlalu banyak daya baterai.' : 'Wheel encoders consume excessive battery power.',
            isCorrect: false,
            explanation: isId ? 'Enkoder optik sangat hemat daya.' : 'Optical encoders require negligible electrical power.',
          },
          {
            id: 'B',
            text: isId
              ? 'Kesalahan selip roda kecil terintegrasi terus-menerus seiring waktu (akumulasi drift tanpa batas).'
              : 'Small wheel slip errors integrate unboundedly over time, causing catastrophic position drift.',
            isCorrect: true,
            explanation: isId
              ? 'Tepat! Kesalahan sudut sekecil 1 derajat akan menghasilkan kesalahan posisi meteran setelah robot berjalan beberapa puluh meter.'
              : 'Correct! An orientation error of just 1 degree causes unbounded translational drift over distance.',
          },
          {
            id: 'C',
            text: isId ? 'Roda robot tidak bisa berputar di bidang datar.' : 'Wheels cannot rotate on flat surfaces.',
            isCorrect: false,
            explanation: isId ? 'Pilihan ini salah.' : 'Incorrect.',
          },
        ]}
        hint={isId ? 'Pikirkan tentang sifat integrasi galat matematis.' : 'Think about the mathematical nature of cumulative integration errors.'}
      />

      {/* 5. Academic References */}
      <AcademicReferences
        references={[
          {
            id: 1,
            authors: 'Marco Ben-Ari & Francesco Mondada',
            year: 2018,
            title: 'Elements of Robotics',
            publisher: 'Springer Open',
            chapterCoverage: 'Chapter 8: Odometry, Probabilistic Motion Models, and Sensor Fusion',
            doiOrUrl: 'https://doi.org/10.1007/978-3-319-62533-1',
          },
          {
            id: 2,
            authors: 'Sebastian Thrun, Wolfram Burgard, & Dieter Fox',
            year: 2005,
            title: 'Probabilistic Robotics',
            publisher: 'MIT Press',
            chapterCoverage: 'Chapter 8: Monte Carlo Localization & Particle Filters',
            doiOrUrl: 'https://mitpress.mit.edu/9780262201629/probabilistic-robotics/',
          },
        ]}
      />

      {/* 6. Lesson Navigation */}
      <LessonNavigation
        prevLesson={{
          domain: isId ? 'Kendali Robot' : 'Robot Control',
          title: isId ? 'Kendali Pelacakan Jalur (Pure Pursuit & Stanley)' : 'Path Tracking Control (Pure Pursuit & Stanley)',
          href: '/learn/control',
        }}
        nextLesson={{
          domain: isId ? 'Pemetaan Robot' : 'Occupancy Mapping',
          title: isId ? 'Pemetaan Grid Okupansi Bayesian' : 'Bayesian Occupancy Grid Mapping',
          href: '/learn/mapping',
        }}
        suggestedExperiments={[
          isId ? 'Tingkatkan derau sensor (sigma) di simulator dan amati persebaran partikel yang melebar.' : 'Increase sensor noise sigma and observe the particle distribution widening.',
          isId ? 'Pindahkan robot ke dekat 3 landmark sekaligus dan perhatikan konvergensi partikel yang sangat tajam.' : 'Move the rover near 3 simultaneous landmarks to observe tight particle clustering.',
          isId ? 'Gunakan tombol Reset Partikel untuk mensimulasikan kasus "Kidnapped Robot Problem".' : 'Trigger the Global Reset button to test Kidnapped Robot recovery.',
        ]}
      />
    </div>
  );
}
