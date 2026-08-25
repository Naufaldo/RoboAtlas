# Changelog

All notable changes to the **RoboAtlas** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.6.0] - 2026-08-25

### Added
- **Full Roadmap Milestones 11 & 12 Completion** (`docs/ROADMAP.md`):
  - **Milestone 11 (Lie Groups & Factor Graph Optimization)**:
    - `LieGroupAlgebraSimulator.tsx`: Interactive $SO(3)$ manifold & $\mathfrak{so}(3)$ tangent space with Rodrigues exponential map $\exp([\boldsymbol{\omega}]_\times)$ and geodesic perturbation retraction.
    - `FactorGraphOptimizerSimulator.tsx`: Bipartite factor graph SLAM with live Gauss-Newton sparse normal equations solver $\mathbf{H}\Delta\Theta = -\mathbf{b}$.
    - Bilingual MDX Lessons: `content/{en,id}/geometry/lie-groups-and-lie-algebras.mdx` & `content/{en,id}/advanced/factor-graph-optimization.mdx`.
  - **Milestone 12 (Frontier Robotics Research)**:
    - `GaussianSplattingSlamSimulator.tsx`: 3D Gaussian Splatting SLAM (3DGS-SLAM) & volumetric radiance field differentiable rasterizer.
    - `DiffusionPolicyVlaSimulator.tsx`: Vision-Language-Action (VLA) foundation model & conditional Denoising Diffusion action trajectory synthesis.
    - Theoretical distillation & architecture guide for Sim-to-Real transfer, physical domain randomization, and privileged teacher-student reinforcement learning.
    - Bilingual MDX Lessons: `content/{en,id}/advanced/3d-gaussian-splatting-slam.mdx`, `content/{en,id}/advanced/sim-to-real-and-domain-randomization.mdx`, and `content/{en,id}/advanced/vla-and-diffusion-policies.mdx`.
- **Robot Platform Embodiments Foundations Suite**:
  - `QuadrotorDynamicsSimulator.tsx`: 6-DOF Multirotor Flight Dynamics, collective thrust and differential torque allocation matrix.
  - `MarineHydrodynamicsSimulator.tsx`: Subsea AUV Hydrodynamics, Archimedes buoyancy equilibrium, added mass $\mathbf{M}_A$, and Fossen 6-DOF equations.
  - `LeggedZmpSimulator.tsx`: Bipedal/quadruped Zero Moment Point (ZMP) & Linear Inverted Pendulum Model (LIPM) dynamic stability in foot support polygon.
  - Bilingual Lessons: `content/{en,id}/fundamentals/aerial-drone-principles.mdx`, `content/{en,id}/fundamentals/marine-robotics-fundamentals.mdx`, and `content/{en,id}/fundamentals/legged-robotics-fundamentals.mdx`.
- **Autonomous Exploration Suite (MDPI Sensors 2020 & 2023 Research)**:
  - `AutonomousExplorationSimulator.tsx`: Look-Ahead Guided Sampling (LAGS) frontier-based exploration algorithm.
  - `SafeCorridorExplorationSimulator.tsx`: 3D MAV Safe Flight Corridor (SFC) polyhedral obstacle-free path generation.
  - Bilingual Lessons: `content/{en,id}/planning/autonomous-exploration-lags.mdx` and `content/{en,id}/planning/3d-frontier-exploration-mav.mdx`.
- **Spatial Mapping & Object Perception Suite (PythonRobotics Curriculum Expansion)**:
  - `GaussianGridMapSimulator.tsx`: Gaussian kernel density estimation spatial mapping.
  - `RayCastingGridMapSimulator.tsx`: Bresenham raycasting grid occupancy.
  - `LidarToGridMapSimulator.tsx`: Sensor-to-world coordinate transform mapping.
  - `KMeansClusteringSimulator.tsx`: Unsupervised point cloud spatial object clustering.
  - `RectangleFittingSimulator.tsx`: Minimum Area Bounding Box fitting & L-shape search.
  - 10 Bilingual Lessons across `content/{en,id}/perception/`.
- **Localization, Estimation & Multi-Sensor Fusion Suite**:
  - `EkfLocalizationSimulator.tsx`: Extended Kalman Filter 2D non-linear state estimation with dynamic covariance ellipses.
  - `HistogramFilterSimulator.tsx`: Discrete grid Markov localization belief propagation.
  - `SensorFusionSimulator.tsx`: Multi-rate Kalman filter fusing high-rate Wheel Odometry, IMU gyro integration, and low-rate absolute GPS multipath fixes.
  - `NumericalIntegrationSimulator.tsx`: Numerical stability comparison between Explicit Euler, Symplectic Semi-Implicit Euler, and 4th-Order Runge-Kutta (RK4).
  - `FormationControlSimulator.tsx`: Decentralized multi-agent formation control (Triangle, V-Wedge, Line) via graph Laplacian consensus.
  - Bilingual Lessons across `content/{en,id}/estimation/`, `content/{en,id}/mathematics/`, and `content/{en,id}/advanced/`.

### Fixed & Audited
- **100% Dead-Link & 404 Route Audit**:
  - Audited all internal hyperlinks in `app/robots/page.tsx`, `app/algorithms/page.tsx`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, and `app/page.tsx`.
  - Replaced all non-canonical routes with direct, working lesson URLs.
- **Curriculum Registry & Vitest Unit Test Expansion**:
  - Updated `tests/curriculum/registry.test.ts` to validate all newly registered Level 0 to Level 18 modules.
  - All 31 unit tests passing with 100% success rate.
  - Next.js static export build generating 57+ static pages cleanly with zero errors.

---

## [0.5.0] - 2026-08-24

### Added
- **Guided Learning Paths Architecture** (`lib/navigation/learning-paths.ts` & `app/learn/page.tsx`):
  - Added dedicated step-by-step guided learning tracks bridging analytical formulas to interactive sandboxes:
    - 🧭 **SLAM & Autonomous Mobile Robot Navigation** (10-Stage Milestone Pipeline from Vectors to Pure Pursuit)
    - 🦾 **Articulated Robotic Arm Manipulation** (4-Stage Pipeline from Frame Chaining to Jacobian Singularities)
    - 🎛️ **Control Systems & State-Space Dynamics** (4-Stage Pipeline from State-Space to Swarm Consensus)
  - Integrated rich step-by-step milestone view in `/learn` featuring KaTeX formula badges, prerequisite tags, and dual action CTAs (*Read Theory* & *Launch Lab*).
- **Master SLAM Textbook Guide** (`book/SLAM_Learning Path.md`):
  - Authored comprehensive 8-chapter reference textbook following the RoboAtlas universal pedagogical pipeline: $\text{Problem} \to \text{Physical Intuition} \to \text{Mathematical Model} \to \text{Derivation} \to \text{Algorithm} \to \text{Interactive Lab} \to \text{Application}$.
  - Seamlessly mapped to existing master curriculum modules with **zero content duplication**.
- **LiDAR Sensor Working Principle Technical Illustrations**:
  - Generated and embedded high-detail technical schematic infographics explaining Time-of-Flight (ToF) laser pulses, 360° laser sweep on autonomous mobile robots, and 2D/3D Cartesian Point Cloud extraction (`public/images/sensors/lidar-working-principle.jpg`).
  - Integrated into bilingual LiDAR lessons (`content/id/sensors/lidar-raycasting.mdx` & `content/en/sensors/lidar-raycasting.mdx`).
- **Interactive Laboratory Workstation Expansion** (`app/labs/page.tsx`):
  - Expanded simulation workstation to house **28 in-browser 60 FPS simulators**.
  - Added instant Learning Path filters (`🧭 SLAM Path`, `🦾 Arm Path`, `🎛️ Control Path`) allowing users to navigate simulators according to algorithmic progression.
- **CodeBlock Component with Copy-to-Clipboard** (`components/mdx/CodeBlock.tsx`):
  - Interactive syntax-highlighted code block component with language badge and copy-to-clipboard state feedback.

### Fixed & Improved
- **ConceptCheck Quiz State Reset & Parsing Resiliency**:
  - Fixed state persistence bug in `components/educational/ConceptCheck.tsx` by adding `useEffect` state reset on quiz ID change, preventing previous submission states from bleeding into newly opened lessons.
  - Implemented strict boolean normalization (`isCorrect` handling both real booleans and strings) across parser and components.
  - Enhanced visual feedback with emerald green badges for correct answers, rose red badges for incorrect choices, and detailed pedagogical explanations.
- **MDX Markdown Image & Element Support** (`components/mdx/MdxArticle.tsx`):
  - Added native support for Markdown images `![alt](src)` with rounded borders, dark slate styling, and automated captions.
  - Upgraded `parseConceptCheck` into a resilient multiline parser supporting complex LaTeX math characters, quotes, and newlines.
- **Automated Test Suite Expansion** (`tests/mdx/concept-check.test.ts`):
  - Verified 100% successful parsing across all 74 lessons in Indonesian and English (**31 / 31 unit tests passing**).

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
