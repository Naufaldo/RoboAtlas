# Changelog

All notable changes to the **RoboAtlas** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.1] - 2026-08-14

### Added
- **Academic 9-Chapter Foundations Curriculum** (`/learn/fundamentals`):
  - Synthesized foundational content from *Elements of Robotics* (Ben-Ari & Mondada), *Foundations of Robotics* (Herath & St-Onge), and *Planning Algorithms* (LaValle).
  - **Chapter 1**: Introduction to Robotics (Sense-Plan-Act loops, robot classifications, reactive Braitenberg vehicles).
  - **Chapter 2**: 2D Geometry (Cartesian vs. Polar, vector rotation in $SO(2)$, triangulation distance sensors).
  - **Chapter 3**: 3D Spatial Geometry (Right-hand rule, principal axis rotations, Euler angles Roll-Pitch-Yaw, unit quaternions $\mathbf{q} \in \mathbb{H}$).
  - **Chapter 4**: Path vs. Trajectory (Geometric path $s(\sigma)$ vs. time-parameterized trajectory $\mathbf{x}(t)$, $C^2$-continuous quintic polynomial splines).
  - **Chapter 5**: Velocity Kinematics in 2D (Differential-drive unicycle kinematics, instantaneous center of curvature $R_{ICC}$, no-slip Pfaffian non-holonomic constraint $-\dot{x}\sin\theta + \dot{y}\cos\theta = 0$).
  - **Chapter 6**: Velocity Kinematics in 3D (Spatial twist $\mathbf{V}_e \in se(3)$, skew-symmetric cross-product matrix $[\boldsymbol{\omega}]_\times$, and Geometric Jacobian $J(\mathbf{q})\dot{\mathbf{q}}$).
  - **Chapter 7**: Matrix Foundations for Robotics ($4\times 4$ $SE(3)$ homogeneous transforms, matrix inverse, covariance matrix $\boldsymbol{\Sigma}$, SVD decomposition).
  - **Chapter 8**: Mathematical Modeling & Automata (Discrete state-space models $\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{u}_k) + \mathbf{w}_k$, observation models, and Finite State Machines).
  - **Chapter 9**: Robot Dynamics, Forces & Torques (Newton-Euler translative/rotative motion, Euler-Lagrange manipulator dynamics $M(\mathbf{q})\ddot{\mathbf{q}} + C(\mathbf{q}, \dot{\mathbf{q}})\dot{\mathbf{q}} + \mathbf{g}(\mathbf{q}) = \boldsymbol{\tau}$).
- **Interactive 3D Spatial Rotation Sandbox** (`SpatialRotation3D.tsx`): 3D isometric canvas allowing live adjustment of Roll ($\phi$), Pitch ($\theta$), and Yaw ($\psi$) with real-time $3\times 3$ $SO(3)$ matrix updates and orthogonal properties verification ($R^T R = I_3, \det(R) = +1$).
- **Full Mobile Touch & Responsive Enhancements**:
  - Touch event listeners (`onTouchStart`, `onTouchMove`) added across all 7 interactive simulator canvases for mobile phone and tablet interaction.
  - Horizontal touch-scroll containers (`overflow-x-auto scrollbar-thin`) for all KaTeX mathematical equations, preventing layout overflow on narrow mobile screens (320px–414px).
  - Responsive control grids (`grid-cols-1 sm:grid-cols-2`) and touch-friendly button targets ($\ge 44\text{px}$).

---

## [0.3.0] - 2026-08-14

### Added
- **Official RoboAtlas Mascot Logo**: Integrated official logo emblem (`public/images/logo.png`) into navigation Header, landing hero, and Footer.
- **Dark & Light Mode Theme Engine**: Full support for instant switching between deep void dark theme (`#040711`) and clinical engineering light theme (`#f8fafc`) with automatic preference persistence in `localStorage`.
- **Bilingual Internationalization (i18n)**: Seamless English (`en`) and Bahasa Indonesia (`id`) language toggle (`ID` / `EN`) in Header covering all navigation, hero text, domain curriculum, algorithm matrix, simulator controls, and mathematical breakdowns.
- **Interactive Transform Sandbox** (`TransformSandbox.tsx`): Interactive coordinate frame gizmo showing live $3\times 3$ homogeneous transformation matrix $T_R^W$ and world point projections $\mathbf{p}^W = T_R^W \mathbf{p}^R$.
- **Bilingual Parity Across All 7 Domains**: Upgraded all learning domain pages (`/learn/planning`, `/learn/localization`, `/learn/control`, `/learn/mapping`, `/learn/slam`, `/learn/multi-agent`) with dynamic bilingual rendering.

---

## [0.2.0] - 2026-08-14

### Added
- **7 Bespoke Interactive Simulators**:
  - `KinematicsSimulator.tsx`: Forward/inverse kinematics sandbox with wheel velocity sliders $(v_L, v_R)$ and ICC center.
  - `PathPlanningSimulator.tsx`: Interactive grid search sandbox with custom obstacle wall drawing, A* (Octile/Euclidean/Manhattan) and Dijkstra engines.
  - `LocalizationSimulator.tsx`: Monte Carlo Particle Filter (MCL) with landmark beacon triangulation and dead-reckoning drift.
  - `ControlSimulator.tsx`: Pure Pursuit lookahead geometry vs. Stanley cross-track steering controller with real-time error telemetry.
  - `MappingSimulator.tsx`: Log-Odds Occupancy Grid Mapping with 360° LiDAR raycaster.
  - `SlamSimulator.tsx`: Iterative Closest Point (ICP) scan matching with SVD rigid transformation alignment.
  - `MultiAgentSimulator.tsx`: Swarm coordination with Graph Laplacian consensus, leader-follower formations, and Boids flocking.
- **Bespoke Laboratory UI Aesthetic**: Elevated typography with *Plus Jakarta Sans* and *JetBrains Mono*, glassmorphic instrument panels, and live telemetry HUD gauges.
- **Hero Simulation Map Presets**: Added 1-click map scenario switcher (*Arena*, *Corridor*, *Slalom*) and variable speed controls ($1\times, 1.5\times, 2\times$).

---

## [0.1.0] - 2026-08-14

### Added
- **Core Architecture Foundation**: Next.js 14 App Router configured for static export (`output: 'export'`).
- **KaTeX Mathematical Engine**: Dark-mode compatible LaTeX equation rendering with variable tooltips.
- **Pure TypeScript Kinematics Math Library**: Vector math (`vector2d.ts`) and rigid 2D coordinate transforms (`transforms.ts`).
- **Initial 7 Robotics Curriculum Modules**: Fundamentals, Path Planning, Localization, Control, Mapping, SLAM, and Multi-Agent.
- **Automated CI/CD Workflow**: GitHub Actions pipeline for linting, testing with Vitest (`17 / 17` passing), and deploying to GitHub Pages via Node.js 24.
