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

## ✨ Key Platform Features

- 📑 **Canonical MDX Content Layer (`content/`)**: All lessons are authored in structured bilingual MDX (`content/en/` and `content/id/`) with Gray-Matter frontmatter schemas and cross-language stable ID tracking.
- 🎓 **Learner-First UI/UX Framework**:
  - `LessonOrientation.tsx`: Answers "Where am I? What am I learning? Why does it matter?" with estimated study time.
  - `MathCodeBridge.tsx`: Direct 1-to-1 visual and conceptual mapping from mathematical formulas to TypeScript code.
  - `AcademicReferences.tsx`: Structured literature cards citing authoritative papers with DOIs and chapter coverage.
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
- ⚡ **100% Client-Side Architecture**: Pure TypeScript and HTML5 Canvas 2D engine. Zero server latency, zero database overhead, and instant load times.

---

## 📚 9-Chapter Robotics Foundations Master Curriculum

Located at **[`/learn/fundamentals`](https://naufaldo.github.io/RoboAtlas/learn/fundamentals/)**:

| No | Chapter | Core Topics | Interactive Simulator |
|---|---|---|---|
| **1** | **Introduction to Robotics** | Sense-Plan-Act loops, Robot classification (Fixed, Mobile, Aerial), Reactive Braitenberg vehicles. | Sense-Plan-Act Explorer |
| **2** | **2D Geometry** | Cartesian $(x, y)$ vs. Polar $(r, \phi)$, $SO(2)$ vector rotation, Triangulation distance sensors. | `TransformSandbox.tsx` |
| **3** | **3D Spatial Geometry** | Right-hand rule, principal rotations $R_x, R_y, R_z$, Euler angles Roll-Pitch-Yaw, Unit Quaternions. | `SpatialRotation3D.tsx` |
| **4** | **Path & Trajectory** | Geometric path $s(\sigma)$ vs. time-parameterized trajectory $\mathbf{x}(t)$, $C^2$-continuous quintic splines. | Trajectory Profiler |
| **5** | **Velocity Kinematics 2D** | Differential-drive unicycle kinematics, ICC radius, no-slip Pfaffian non-holonomic constraint $-\dot{x}\sin\theta + \dot{y}\cos\theta = 0$. | `KinematicsSimulator.tsx` |
| **6** | **Velocity Kinematics 3D** | Spatial twist $\mathbf{V}_e \in se(3)$, skew-symmetric matrix $[\boldsymbol{\omega}]_\times$, Geometric Jacobian $J(\mathbf{q})\dot{\mathbf{q}}$. | Jacobian Inspector |
| **7** | **Matrix Foundations** | $4\times 4$ $SE(3)$ homogeneous transforms, matrix inverse, sensor covariance matrix $\boldsymbol{\Sigma}$, SVD. | Matrix Inspector |
| **8** | **Mathematical Modeling** | Discrete state-space models $\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{u}_k) + \mathbf{w}_k$, observation models, and Finite State Machines (FSM). | Automata Simulator |
| **9** | **Robot Dynamics** | Newton-Euler translative/rotative equations, Euler-Lagrange manipulator dynamics $M(\mathbf{q})\ddot{\mathbf{q}} + C(\mathbf{q}, \dot{\mathbf{q}})\dot{\mathbf{q}} + \mathbf{g}(\mathbf{q}) = \boldsymbol{\tau}$. | Dynamic Engine |

---

## 📖 Comprehensive Documentation

- 📋 **[System Specification](docs/SPECIFICATION.md)** — Architectural design, 5-layer hierarchy, KaTeX standards, and static export rules.
- 🗺️ **[Feature Roadmap](docs/ROADMAP.md)** — Detailed breakdown of Milestones 1 through 8 and future Phase 2/3 capabilities.
- 🤖 **[Agentic Governance & Collaboration](docs/GOVERNANCE.md)** — 15 Core Agentic Rules, 8-Step Workflow Loop, and bilingual/changelog guidelines.
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
