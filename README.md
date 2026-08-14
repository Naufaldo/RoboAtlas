<p align="center">
  <img src="public/images/logo.png" alt="RoboAtlas Logo" width="220" style="border-radius: 28px; box-shadow: 0 10px 30px rgba(6, 182, 212, 0.25);" />
</p>

<h1 align="center">RoboAtlas</h1>

<p align="center">
  <strong>Interactive Robotics Learning Platform & Algorithm Laboratory</strong><br />
  <em>Understand • See • Experiment</em>
</p>

<p align="center">
  <a href="https://naufaldo.github.io/RoboAtlas/"><img src="https://img.shields.io/badge/Live_Demo-GitHub_Pages-06b6d4?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo" /></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Version-v0.4.0-10b981?style=for-the-badge" alt="Version 0.4.0" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License MIT" /></a>
  <img src="https://img.shields.io/badge/Bilingual-EN%20%7C%20ID-8b5cf6?style=for-the-badge" alt="Bilingual EN | ID" />
  <img src="https://img.shields.io/badge/Theme-Dark%20%2F%20Light-f59e0b?style=for-the-badge" alt="Dual Theme" />
  <img src="https://img.shields.io/badge/Curriculum-21_Levels_(0--20)-cyan?style=for-the-badge" alt="21-Level Master Curriculum" />
  <img src="https://img.shields.io/badge/Content-MDX_Canonical-3b82f6?style=for-the-badge" alt="MDX Canonical" />
  <img src="https://img.shields.io/badge/Mobile-Touch_Optimized-ec4899?style=for-the-badge" alt="Mobile Touch Optimized" />
</p>

---

## 🎯 Overview

**RoboAtlas** is an independent, open-source educational platform and algorithm laboratory designed to bridge the gap between theoretical robotics mathematics and physical algorithmic intuition.

Synthesizing foundational literature from three classical textbooks:
1. 📖 **Elements of Robotics** — Marco Ben-Ari & Francesco Mondada (*Springer Open*)
2. 📖 **Foundations of Robotics: A Multidisciplinary Approach with Python and ROS** — Deepak Herath & David St-Onge (*Springer*)
3. 📖 **Planning Algorithms** — Steven M. LaValle (*Cambridge University Press*)

RoboAtlas re-imagines robotics education as an original **TypeScript-native interactive textbook + algorithm laboratory** running entirely in your browser with zero backend requirements.

---

## 🎓 21-Level Master Robotics Curriculum Hierarchy (v1.0)

Organized at **[`/learn`](https://naufaldo.github.io/RoboAtlas/learn/)** and specified in **[`docs/RoboAtlas_Master_Curriculum_v1.md`](docs/RoboAtlas_Master_Curriculum_v1.md)** across 4 progressive learning tiers:

```text
TIER 1: FOUNDATIONS (LEVELS 0 – 4)
Level 0: Robotics Orientation (Sense-Plan-Act & Robot Anatomy)
Level 1: Mathematical & Geometric Foundations (Scalars, Vectors, Matrices, Probability)
Level 2: Coordinate Frames & Transformations (SE(2)/SE(3) Homogeneous Transforms)
Level 3: Robot Modeling & Kinematics (Differential Unicycle, ICC, Forward/Inverse Kinematics)
Level 4: Robot Motion & Differential Geometry (Spatial Twists, Geometric Jacobians)

TIER 2: CORE AUTONOMY (LEVELS 5 – 8)
Level 5: Sensors & Perception (Encoders, IMU, LiDAR Raycasting, Noise Models)
Level 6: Path & Trajectory Planning (Dijkstra, A*, C-Space, RRT, Quintic Splines)
Level 7: Robot Dynamics & Control (Pure Pursuit, Stanley Feedback, Newton-Euler)
Level 8: Localization & State Estimation (Recursive Bayes, Monte Carlo MCL, EKF)

TIER 3: SPATIAL INTELLIGENCE & SLAM (LEVELS 9 – 12)
Level 9: Spatial Mapping & Costmaps (Log-Odds Grid, Distance Transforms, Inflation)
Level 10: Simultaneous Localization & Mapping (SLAM, ICP Scan Matching, SVD)
Level 11: Integrated Autonomous Navigation (Global/Local Planners, DWA, TEB)
Level 12: Autonomous Systems Architecture (Behavior Trees, Mission Executives)

TIER 4: ADVANCED EMBODIMENTS & SPECIALIZATIONS (LEVELS 13 – 20)
Level 13: Robotics Software Engineering & ROS 2 (DDS, URDF, Computation Graphs)
Level 14: Manipulation Robotics & Articulated Arms (6-DOF IK, DH Parameters)
Level 15: Aerial Robotics & Quadrotors (Flight Dynamics, Differential Flatness)
Level 16: Legged Robotics & Quadruped Locomotion (ZMP, Inverted Pendulum, Gaits)
Level 17: Learning-Based Robotics & RL (Sim-to-Real, Policy Gradients, VLA)
Level 18: Multi-Agent Robotics & Swarms (Graph Laplacian Consensus, Formations)
Level 19: Advanced Robotics Mathematics & Lie Groups (SO(3)/SE(3) Manifolds)
Level 20: Robotics Research & Emerging Topics (NeRF SLAM, Soft Continuum)
```

---

## ✨ Key Platform Features

- 📑 **Canonical MDX Content Layer (`content/`)**: All lessons are authored in structured bilingual MDX (`content/en/` and `content/id/`) with Gray-Matter frontmatter schemas and cross-language stable ID tracking.
- 🎓 **Learner-First UI/UX Framework**:
  - `LessonOrientation.tsx`: Answers "Where am I? What am I learning? Why does it matter?" with estimated study time.
  - `MathCodeBridge.tsx`: Direct 1-to-1 visual and conceptual mapping from mathematical formulas to TypeScript code.
  - `AcademicReferences.tsx`: Structured literature cards citing authoritative papers with DOIs and chapter coverage.
  - `ConceptCheck.tsx`: Interactive checkpoint quizzes with instantaneous feedback and pedagogical reasoning.
  - `LessonNavigation.tsx`: Lesson progression links with suggested interactive simulation challenges.
- 📐 **7-Step Mathematical Explanation Standard (`FormulaExplainer.tsx`)**:
  - KaTeX rendering $\to$ Intuitive Meaning $\to$ Physical Reasoning ("Why?") $\to$ Dimensional Unit Tables $\to$ Collapsible Step-by-Step Derivations $\to$ Interactive Live Parameter Calculators.
- 🌓 **Dual-Theme Engine (Dark & Light Mode)**: Seamlessly toggle between a futuristic deep-void robotics laboratory (`#040711`) and a clean clinical light mode (`#f8fafc`) with persistent `localStorage`.
- 🌐 **Full Bilingual Parity (Bahasa Indonesia & English)**: 1-click language switcher (`ID` / `EN`) in Header covering all navigation, hero sections, interactive simulators, KaTeX math breakdowns, and algorithm matrices.
- 📱 **Mobile-Adaptive & Touch-First**:
  - Full touch interactions (`onTouchStart`, `onTouchMove`) across all 60 FPS Canvas simulators (e.g. draw obstacle walls, redirect swarm formations with finger).
  - Horizontal touch-scroll containers (`overflow-x-auto scrollbar-thin`) for all complex KaTeX equations and matrices, preventing layout overflow on mobile screens.
- 🎮 **Bespoke In-Browser 60 FPS Simulators**:
  - **`TransformSandbox.tsx`**: $SE(2)$ Homogeneous Matrix & Coordinate Frame Gizmo.
  - **`SpatialRotation3D.tsx`**: 3D $SO(3)$ Euler Angle Roll-Pitch-Yaw Simulator with real-time matrix inspection.
  - **`KinematicsSimulator.tsx`**: Differential-drive unicycle velocity integrator with Instantaneous Center of Curvature (ICC).
  - **`PathPlanningSimulator.tsx`**: Interactive grid search sandbox with custom obstacle wall drawing, A* (Octile, Euclidean, Manhattan heuristics), and Dijkstra.
  - **`LocalizationSimulator.tsx`**: Monte Carlo Particle Filter (MCL) with landmark beacon triangulation and dead-reckoning drift.
  - **`ControlSimulator.tsx`**: Pure Pursuit lookahead geometry vs. Stanley cross-track non-linear feedback controller on figure-8 / oval tracks.
  - **`MappingSimulator.tsx`**: 360° LiDAR Raycaster with Log-Odds Bayesian Occupancy Grid probability updates.
  - **`SlamSimulator.tsx`**: Step-by-step Iterative Closest Point (ICP) scan matching with closed-form SVD rigid alignment.
  - **`MultiAgentSimulator.tsx`**: Swarm coordination with Graph Laplacian consensus, leader-follower formations (V-shape, Circle, Line), and Boids flocking.
  - **`CoordinateFrameExplorer.tsx`**, **`VectorVisualizer.tsx`**, **`DotProductExplorer.tsx`**: Interactive geometric and mathematical foundations labs.
- ⚡ **100% Client-Side Architecture**: Pure TypeScript and HTML5 Canvas 2D engine. Zero server latency, zero database overhead, and instant load times.

---

## 📖 Comprehensive Documentation

- 📚 **[Master Curriculum Specification v1.0](docs/RoboAtlas_Master_Curriculum_v1.md)** — The single source of truth for the 21-level robotics curriculum hierarchy.
- 📋 **[System Specification](docs/SPECIFICATION.md)** — Architectural design, 5-layer hierarchy, KaTeX standards, and static export rules.
- 🗺️ **[Feature Roadmap](docs/ROADMAP.md)** — Detailed breakdown of Milestones 1 through 8 and future Phase 2/3 capabilities.
- 🤖 **[Agentic Governance & Collaboration](docs/GOVERNANCE.md)** — 16 Core Agentic Rules, 8-Step Workflow Loop, and bilingual/changelog guidelines.
- 📜 **[Changelog](CHANGELOG.md)** — Detailed version release history adhering to Keep a Changelog and SemVer.
- 📑 **[MDX Content Architecture](docs/RoboAtlas_MDX_Content_Architecture.md)** — MDX directory layout, frontmatter schemas, and authoring specifications.
- 🎨 **[Learner-First UI/UX Specification](docs/RoboAtlas_UI_UX_Learner_First_Spec.md)** — Cognitive load reduction, design personality, Math-Code bridge, and reference guidelines.
- 📐 **[Mathematical Explanation Rules](docs/RoboAtlas_Mathematical_Explanation_Rules.md)** — 7-step pedagogical standard for robotics equations.
- 📚 **[Content Specification](book/RoboAtlas_Agentic_Content_Spec.md)** — Pedagogical framework, textbook reference mapping, and agent instructions.
- 🏗️ **[Architecture Overview](ARCHITECTURE.md)** — Modular 5-layer system overview.
- 🤝 **[Contributing Guide](CONTRIBUTING.md)** — Development standards and pull request workflows.
- 📜 **[Third-Party Notices](THIRD_PARTY_NOTICES.md)** — Attribution to PythonRobotics and academic citations.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v24 LTS or v20+)
- `npm`

### Installation & Local Development

```bash
# 1. Clone repository
git clone https://github.com/Naufaldo/RoboAtlas.git
cd RoboAtlas

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in your browser
# http://localhost:3000
```

### Verification & Testing

```bash
# Run unit tests (Vitest)
npm test

# Run TypeScript typecheck
npm run typecheck

# Build static production export
npm run build
```

---

## 📜 License & Attribution

- **License**: Released under the [MIT License](LICENSE).
- **Academic Inspiration**: Inspired by [PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics) by Atsushi Sakai and foundational literature by Ben-Ari, Mondada, Herath, St-Onge, and LaValle. All educational text and TypeScript simulation engines are engineered independently from first principles.
