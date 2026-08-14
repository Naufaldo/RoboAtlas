'use client';

import React from 'react';
import { MappingSimulator } from '@/components/simulation/MappingSimulator';
import { FormulaExplainer } from '@/components/mathematics/FormulaExplainer';
import { LessonOrientation } from '@/components/layout/LessonOrientation';
import { LessonNavigation } from '@/components/layout/LessonNavigation';
import { MathCodeBridge } from '@/components/educational/MathCodeBridge';
import { AcademicReferences } from '@/components/educational/AcademicReferences';
import { ConceptCheck } from '@/components/educational/ConceptCheck';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Layers, Sparkles } from 'lucide-react';

export default function MappingPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isId ? 'Milestone 7 • Laboratorium Domain' : 'Milestone 7 • Domain Laboratory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isId ? 'Pemetaan Grid Okupansi Log-Odds Bayesian' : 'Bayesian Log-Odds Occupancy Grid Mapping'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Bangun peta spasial metrik dari aliran pengukuran sensor jarak kontinu. Perbarui probabilitas okupansi setiap sel grid menggunakan representasi Log-Odds.'
            : 'Construct metric spatial maps from continuous range sensor measurements. Update individual cell occupancy probabilities using Log-Odds representations.'}
        </p>
      </div>

      {/* Lesson Orientation */}
      <LessonOrientation
        domain={isId ? 'Pemetaan Robotika' : 'Robotics Mapping'}
        lessonTitle={isId ? 'Pembaruan Grid Okupansi Log-Odds' : 'Log-Odds Occupancy Grid Update'}
        estimatedMinutes={20}
        learningObjectives={
          isId
            ? [
                'Memahami representasi peta grid okupansi diskrit 2D',
                'Mengetahui keunggulan numerik representasi log-odds dibanding probabilitas murni',
                'Mengonversi kembali nilai log-odds ke probabilitas okupansi p in [0, 1]',
              ]
            : [
                'Understand discrete 2D occupancy grid spatial representations',
                'Explain numerical benefits of additive log-odds vs. multiplicative probabilities',
                'Convert log-odds values back to bounded occupancy probabilities p in [0, 1]',
              ]
        }
        whyItMatters={
          isId
            ? 'Robot harus mengetahui area mana yang kosong dan mana yang terhalang rintangan sebelum dapat merencanakan jalur yang aman.'
            : 'Autonomous rovers must map free vs. occupied space before path planners can safely generate collision-free trajectories.'
        }
      />

      {/* 1. Interactive Simulator Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{isId ? 'Simulator Grid Okupansi Log-Odds Interaktif' : 'Interactive Log-Odds Occupancy Grid Sandbox'}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
            360° LiDAR Raycaster
          </span>
        </div>
        <MappingSimulator />
      </div>

      {/* 2. Formula Explainer with Live Calculator */}
      <FormulaExplainer
        id="formula-log-odds"
        title={isId ? 'Pembaruan Aditif Log-Odds & Konversi Probabilitas' : 'Additive Log-Odds Update & Probability Recovery'}
        latex="l_t(m_i) = l_{t-1}(m_i) + \log\left(\frac{p(m_i \mid z_t)}{1 - p(m_i \mid z_t)}\right) - l_0, \quad p(m_i) = 1 - \frac{1}{1 + \exp(l_t(m_i))}"
        meaning={
          isId
            ? 'Memperbarui status kepastian setiap sel grid m_i. Ruang bebas yang dilewati sinar laser mengurangi nilai log-odds (menuju nilai negatif), sedangkan titik benturan laser menambah nilai log-odds (menuju nilai positif).'
            : 'Updates the occupancy belief of grid cell m_i. Free space penetrated by laser rays decreases the log-odds (toward negative values), while reflection endpoints increase log-odds (toward positive values).'
        }
        whyExplanation={
          isId
            ? 'Perkalian probabilitas berulang kali (p1 * p2 * ...) pada floating point komputer dapat menyebabkan numerical underflow (menjadi 0 mutlak). Dengan log-odds, perkalian probabilitas berubah menjadi PENJUMLAHAN sederhana yang sangat cepat dan stabil secara numerik.'
            : 'Repeatedly multiplying raw probabilities causes catastrophic numerical underflow. Converting to the log-odds ratio transforms Bayesian multiplication into fast, numerically stable addition.'
        }
        variables={[
          {
            symbol: 'l_t(m_i)',
            name: isId ? 'Nilai Log-Odds Sel' : 'Cell Log-Odds Value',
            unit: 'log-ratio',
            meaning: isId ? 'Nilai akumulasi log-odds sel grid (-inf = kosong, 0 = 50%, +inf = rintangan)' : 'Accumulated log-odds value of cell',
          },
          {
            symbol: 'p(m_i|z_t)',
            name: isId ? 'Model Sensor Invers' : 'Inverse Sensor Probability',
            unit: 'prob',
            meaning: isId ? 'Probabilitas sel terisi berdasarkan satu pembacaan sensor' : 'Occupancy probability given single sensor beam',
          },
          {
            symbol: 'l_0',
            name: isId ? 'Prior Log-Odds Awal' : 'Prior Log-Odds',
            unit: 'log-ratio',
            meaning: isId ? 'Log-odds awal sebelum ada pengukuran (0 untuk prior p=0.5)' : 'Prior initial belief log-odds',
          },
        ]}
        derivationSteps={[
          {
            step: isId ? 'Definisi Rasio Peluang (Odds)' : 'Definition of Probability Odds',
            latex: '\\text{Odds}(p) = \\frac{p}{1 - p}',
            explanation: isId ? 'Memetakan probabilitas [0, 1] ke rentang [0, tak hingga).' : 'Maps bounded probability [0, 1] to unbounded non-negative range.',
          },
          {
            step: isId ? 'Transformasi Logaritma Natural' : 'Natural Logarithm Transformation',
            latex: 'l = \\ln\\left(\\frac{p}{1 - p}\\right)',
            explanation: isId ? 'Memetakan odds ke seluruh garis bilangan riil.' : 'Maps odds to the entire real line (-inf, +inf).',
          },
          {
            step: isId ? 'Inversi Sigmoid Logistik' : 'Logistic Sigmoid Inverse Function',
            latex: 'p = 1 - \\frac{1}{1 + \\exp(l)}',
            explanation: isId ? 'Mengembalikan nilai log-odds menjadi nilai probabilitas [0, 1].' : 'Recovers normalized probability value from log-odds.',
          },
        ]}
        numericalExample={{
          inputs: { 'l_prev': 0.0, 'p_sensor': 0.8 },
          calculationSteps: [
            'Odds = 0.8 / (1 - 0.8) = 4.0',
            'Delta l = ln(4.0) = 1.386',
            'l_new = 0 + 1.386 = 1.386',
            'p_new = 1 - 1 / (1 + exp(1.386)) = 0.80 (80%)',
          ],
          result: 'l = 1.386, p = 80.0%',
        }}
        roboticsApplication={
          isId
            ? 'Digunakan oleh seluruh paket navigasi ROS (seperti nav2_costmap_2d dan Cartographer) untuk membangun peta lingkungan 2D/3D secara real-time.'
            : 'Standard in all ROS navigation stacks (such as nav2_costmap_2d and Google Cartographer) to maintain real-time dynamic obstacle costmaps.'
        }
        calculator={{
          params: [
            { key: 'l_prev', label: 'Previous Log-Odds (l_{t-1})', unit: 'ratio', default: 0.0, min: -5.0, max: 5.0, step: 0.2 },
            { key: 'p_sensor', label: 'Sensor Prob p(m|z)', unit: 'prob', default: 0.8, min: 0.05, max: 0.95, step: 0.05 },
          ],
          calculate: (inputs: Record<string, number>) => {
            const { l_prev, p_sensor } = inputs;
            const deltaL = Math.log(p_sensor / (1.0 - p_sensor));
            const newL = l_prev + deltaL;
            const prob = 1.0 - (1.0 / (1.0 + Math.exp(newL)));
            return {
              steps: [
                `Delta Log-Odds = ln(${p_sensor} / (1 - ${p_sensor})) = ${deltaL.toFixed(3)}`,
                `Updated Log-Odds l_t = ${l_prev.toFixed(2)} + ${deltaL.toFixed(3)} = ${newL.toFixed(3)}`,
                `Posterior Probability p(m) = 1 / (1 + exp(-${newL.toFixed(3)})) = ${(prob * 100).toFixed(1)}%`,
              ],
              result: `p(m) = ${(prob * 100).toFixed(1)}% (l = ${newL.toFixed(2)})`,
            };
          },
        }}
      />

      {/* 3. Math to Code Bridge */}
      <MathCodeBridge
        title="Log-Odds Occupancy Grid Update"
        mathLatex="l_t(m_i) = l_{t-1}(m_i) + \Delta l_{sensor}, \quad p(m_i) = \frac{1}{1 + \exp(-l_t(m_i))}"
        explanation={
          isId
            ? 'Implementasi penambahan delta log-odds saat raycast laser melintasi grid 2D.'
            : 'Additive raycasting log-odds updates in TypeScript 2D grid matrix.'
        }
        codeSnippet={`// TypeScript: Additive Log-Odds Raycast Update
const L_OCCUPIED = Math.log(0.85 / (1 - 0.85)); // +1.73 (Hit)
const L_FREE = Math.log(0.30 / (1 - 0.30));     // -0.84 (Pass-through)

export function updateGridCell(
  grid: number[][],
  x: number,
  y: number,
  isHit: boolean
): void {
  const delta = isHit ? L_OCCUPIED : L_FREE;
  
  // Additive Log-Odds Update
  grid[y][x] = Math.max(-5.0, Math.min(5.0, grid[y][x] + delta));
}

export function getCellProbability(logOdds: number): number {
  return 1.0 / (1.0 + Math.exp(-logOdds));
}`}
        mappings={[
          {
            mathSymbol: 'l_t(m_i)',
            codeIdentifier: 'grid[y][x]',
            explanation: isId ? 'Nilai log-odds sel grid pada koordinat (x, y)' : 'Log-odds value stored at grid coordinates (x, y)',
          },
          {
            mathSymbol: '\\Delta l_{sensor}',
            codeIdentifier: 'delta (L_OCCUPIED / L_FREE)',
            explanation: isId ? 'Delta log-odds berdasarkan apakah laser menabrak rintangan atau menembus ruang kosong' : 'Additive log-odds delta determined by laser hit or free pass-through',
          },
          {
            mathSymbol: 'p(m_i)',
            codeIdentifier: 'getCellProbability()',
            explanation: isId ? 'Fungsi pemulihan nilai probabilitas sigmoid' : 'Logistic sigmoid recovery of posterior probability',
          },
        ]}
      />

      {/* 4. Concept Check Quiz */}
      <ConceptCheck
        id="quiz-mapping"
        question={
          isId
            ? 'Mengapa representasi Log-Odds digunakan dalam pemetaan grid okupansi daripada menyimpan probabilitas p langsung?'
            : 'Why is the Log-Odds representation used in occupancy grid mapping instead of directly multiplying probabilities?'
        }
        options={[
          {
            id: 'A',
            text: isId ? 'Karena log-odds menggunakan lebih sedikit memori RAM.' : 'Because log-odds uses less RAM memory.',
            isCorrect: false,
            explanation: isId ? 'Keduanya menggunakan tipe data float yang sama.' : 'Both require standard floating-point representation.',
          },
          {
            id: 'B',
            text: isId
              ? 'Karena log-odds mengubah perkalian probabilitas Bayesian menjadi penjumlahan aditif sederhana dan mencegah numerical underflow.'
              : 'Because log-odds turns Bayesian probability multiplication into fast additive updates and avoids numerical underflow.',
            isCorrect: true,
            explanation: isId
              ? 'Benar! Penjumlahan sangat cepat bagi CPU dan nilai tidak akan terjebak di 0 mutlak.'
              : 'Correct! Additive log-odds are fast to compute and completely immune to floating-point zero underflow.',
          },
          {
            id: 'C',
            text: isId ? 'Karena sensor laser hanya bisa membaca angka negatif.' : 'Because lasers only read negative numbers.',
            isCorrect: false,
            explanation: isId ? 'Salah.' : 'Incorrect.',
          },
        ]}
        hint={isId ? 'Pikirkan tentang efisiensi operasi matematika penjumlahan vs perkalian berulang.' : 'Think about mathematical efficiency of addition vs repeated multiplication.'}
      />

      {/* 5. Academic References */}
      <AcademicReferences
        references={[
          {
            id: 1,
            authors: 'Hans Moravec & Alberto Elfes',
            year: 1985,
            title: 'High Resolution Maps from Wide Angle Sonar',
            publisher: 'IEEE International Conference on Robotics and Automation (ICRA)',
            chapterCoverage: 'Foundational paper introducing spatial occupancy grid mapping.',
            doiOrUrl: 'https://doi.org/10.1109/ROBOT.1985.1087316',
          },
          {
            id: 2,
            authors: 'Sebastian Thrun, Wolfram Burgard, & Dieter Fox',
            year: 2005,
            title: 'Probabilistic Robotics',
            publisher: 'MIT Press',
            chapterCoverage: 'Chapter 9: Occupancy Grid Mapping & Inverse Sensor Models',
            doiOrUrl: 'https://mitpress.mit.edu/9780262201629/probabilistic-robotics/',
          },
        ]}
      />

      {/* 6. Lesson Navigation */}
      <LessonNavigation
        prevLesson={{
          domain: isId ? 'Lokalisasi Robot' : 'Robot Localization',
          title: isId ? 'Lokalisasi & Filter Partikel MCL' : 'Localization & MCL Particle Filter',
          href: '/learn/localization',
        }}
        nextLesson={{
          domain: isId ? 'SLAM Robot' : 'Robotics SLAM',
          title: isId ? 'SLAM & Registrasi Scan ICP' : 'SLAM & ICP Scan Registration',
          href: '/learn/slam',
        }}
        suggestedExperiments={[
          isId ? 'Gerakkan robot berkeliling ruangan untuk menyisir seluruh sudut dan mengamati pembentukan dinding hitam pekat.' : 'Drive the robot around the perimeter to observe dense black obstacle walls forming.',
          isId ? 'Perhatikan bagaimana sinar laser yang melewati ruang kosong mengubah warna sel dari abu-abu netral menjadi putih bersih.' : 'Observe how laser pass-through rays clear neutral gray cells to pure white free space.',
        ]}
      />
    </div>
  );
}
