# Changelog

All notable changes to the **RoboAtlas** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2026-08-14

### Added
- **Master Web & Curriculum Specification v2.0** (`docs/RoboAtlas_Master_Web_Curriculum_Spec_v2.md`):
  - Upgraded RoboAtlas architectural identity into a **General Robotics Knowledge Platform** bridging fundamentals to multiple physical embodiments.
  - Universal pipeline: $\text{Fundamentals} \to \text{Math / Physics / Logic} \to \text{Algorithms} \to \text{Kinematics / Control / Perception} \to \text{Robot Systems} \to \text{Advanced Robotics}$.
- **Robot Platforms Hub** (`app/robots/page.tsx`):
  - Interactive platform workstation mapping universal robotics concepts across 5 embodiments:
    - 🦾 **Robotic Arm (Manipulator)**: 6-DOF / 7-DOF Articulated Arms, DH Parameters, Analytical & Numerical IK.
    - 🚗 **Mobile Robot (AMR / AGV)**: Differential Drive, Ackermann, Mecanum, Wheel Odometry Drift, 2D LiDAR Mapping.
    - 🚁 **Aerial Drone (UAV / Multirotor)**: 6-DOF Quadrotor, Attitude SE(3), Differential Flatness.
    - 🌊 **Marine Robot (ROV / AUV)**: Buoyancy, Added Mass, 6-DOF Thruster Allocation, Acoustic DVL Navigation.
    - 🦿 **Legged Robot (Quadruped & Humanoid)**: ZMP, LIPM, Gait sequencing, Whole-Body Balance.
- **4 Persona "Start Learning" Pathways** on Homepage (`app/page.tsx`):
  - Beginner (Level 0: Orientation), Fundamentals (Math & Kinematics), Algorithms (Planning & Estimation), Build (Labs & Projects).
- **12-Milestone System** (`docs/ROADMAP.md`):
  - Restructured roadmap from M1 (Robotics Foundations) through M12 (Frontier Research).
- **21-Level Master Robotics Curriculum Hierarchy v1.0** (`docs/RoboAtlas_Master_Curriculum_v1.md`):
  - Progressive learning dependency graph organized across 4 primary tiers and 21 technical levels (Levels 0 through 20).
  - Interactive dual-view dashboard in `/learn` (21-Level Tiered Pathway vs. Domain Laboratories).
- **Canonical MDX Content Architecture** (`docs/RoboAtlas_MDX_Content_Architecture.md`):
  - Structured content directory layout (`content/en/` and `content/id/`) across learning domains.
  - Standardized YAML frontmatter schema with stable cross-language lesson IDs.
  - Dynamic MDX loader library (`lib/mdx/content.ts`) with Gray-Matter parsing.
  - Automated unit test suite (`tests/mdx/content.test.ts`) validating frontmatter integrity (**21 / 21 tests passing**).
- **Learner-First UI/UX Framework** (`docs/RoboAtlas_UI_UX_Learner_First_Spec.md`):
  - **`LessonOrientation.tsx`**: "Where am I? What am I learning? Why does it matter?".
  - **`ConceptCheck.tsx`**: Checkpoint quiz with instant pedagogical feedback.
  - **`MathCodeBridge.tsx`**: KaTeX math formula to TypeScript code execution mapping.
  - **`AcademicReferences.tsx`**: Structured academic literature citations with DOIs.
  - **`LessonNavigation.tsx`**: Progression toolbar with previous/next lesson links and interactive simulation challenges.
- **Mathematical Explanation Standard** (`docs/RoboAtlas_Mathematical_Explanation_Rules.md`):
  - **`FormulaExplainer.tsx`**: 7-step pedagogical standard with intuitive meaning, physical reasoning ("Why?"), variable unit tables, collapsible derivations, and live calculators.

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
