# Changelog

All notable changes to the **RoboAtlas** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2026-08-14

### Added
- **Canonical MDX Content Architecture** (`docs/RoboAtlas_MDX_Content_Architecture.md`):
  - Structured content directory layout (`content/en/` and `content/id/`) across learning domains (Fundamentals, Planning, Control, Localization, Mapping, SLAM, Multi-Agent).
  - Standardized YAML frontmatter schema with stable cross-language lesson IDs (`id`, `title`, `slug`, `category`, `difficulty`, `language`, `interactive`, `estimatedMinutes`, `prerequisites`, `references`, `components`).
  - Dynamic MDX loader library (`lib/mdx/content.ts`) with Gray-Matter parsing for fast client-side and static export builds.
  - Automated unit test suite (`tests/mdx/content.test.ts`) validating frontmatter integrity and English-Indonesian ID parity (**21 / 21 tests passing**).
- **Learner-First UI/UX Framework** (`docs/RoboAtlas_UI_UX_Learner_First_Spec.md`):
  - **`LessonOrientation.tsx`**: Orienting card answering "Where am I? What am I learning? Why does it matter?" with estimated study duration.
  - **`LessonNavigation.tsx`**: Progressive next-steps toolbar with previous/next lesson links and suggested interactive simulation experiments.
  - **`MathCodeBridge.tsx`** (Section 38): Visual and conceptual side-by-side mapping between KaTeX mathematical formulations and TypeScript code execution with symbol-to-identifier lookup tables.
  - **`AcademicReferences.tsx`** (Section 39): Standard academic literature reference cards with author citations, publisher, publication year, chapter coverage, and direct DOI links.
- **Mathematical Explanation Standard** (`docs/RoboAtlas_Mathematical_Explanation_Rules.md`):
  - **`FormulaExplainer.tsx`**: 7-step pedagogical standard with intuitive meaning, physical reasoning ("Why?"), variable tables with SI units, collapsible step-by-step derivations, and interactive live parameter calculators.

---

## [0.3.1] - 2026-08-14

### Added
- **Academic 9-Chapter Foundations Curriculum** (`/learn/fundamentals`):
  - Synthesized foundational content from *Elements of Robotics* (Ben-Ari & Mondada), *Foundations of Robotics* (Herath & St-Onge), and *Planning Algorithms* (LaValle).
  - Chapters 1–9 covering autonomy loops, 2D/3D geometry, path vs. trajectory splines, velocity kinematics, matrices, state-space modeling, and robot dynamics.
- **Interactive 3D Spatial Rotation Sandbox** (`SpatialRotation3D.tsx`): 3D isometric canvas for live Roll ($\phi$), Pitch ($\theta$), and Yaw ($\psi$) angle tuning and real-time $SO(3)$ matrix inspection.
- **Full Mobile Touch & Responsive Enhancements**: Touch drag support (`onTouchStart`, `onTouchMove`) across all 7 simulator canvases and touch-scrollable KaTeX equations.

---

## [0.3.0] - 2026-08-14

### Added
- **Official RoboAtlas Mascot Logo**: Integrated official mascot logo (`public/images/logo.png`) into navigation Header, Hero, and Footer.
- **Dark & Light Mode Theme Engine**: Full support for instant switching between deep void dark theme (`#040711`) and clinical light theme (`#f8fafc`) with `localStorage` persistence.
- **Bilingual Internationalization (i18n)**: 1-click language switcher (`ID` / `EN`) in Header covering all components, simulators, KaTeX math, and algorithm matrices.

---

## [0.2.0] - 2026-08-14

### Added
- **7 Dedicated 60 FPS Interactive Simulators**:
  - `KinematicsSimulator.tsx`: Forward/inverse differential-drive kinematics with ICC.
  - `PathPlanningSimulator.tsx`: Grid wall drawing with A* and Dijkstra.
  - `LocalizationSimulator.tsx`: Monte Carlo Particle Filter (MCL).
  - `ControlSimulator.tsx`: Pure Pursuit vs. Stanley steering.
  - `MappingSimulator.tsx`: Log-Odds Bayesian Occupancy Grid Mapping.
  - `SlamSimulator.tsx`: Iterative Closest Point (ICP) scan matching.
  - `MultiAgentSimulator.tsx`: Graph Laplacian consensus & swarm coordination.

---

## [0.1.0] - 2026-08-14

### Added
- Initial platform release with Next.js 14 static export architecture, KaTeX rendering, pure TypeScript 2D vector kinematics library, and automated GitHub Actions CI/CD.
