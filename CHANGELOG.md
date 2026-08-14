# Changelog

All notable changes to the **RoboAtlas** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - 2026-08-14

### Added
- **Official RoboAtlas Mascot Logo**: Integrated official logo emblem (`public/images/logo.png`) into the navigation Header, landing hero, and Footer with subtle glassmorphic glow.
- **Dark & Light Mode Theme Engine**: Full support for instant switching between deep void dark theme (`#040711`) and clinical engineering light theme (`#f8fafc`) with automatic preference persistence in `localStorage`.
- **Bilingual Internationalization (i18n)**: Seamless English (`en`) and Bahasa Indonesia (`id`) language toggle (`ID` / `EN`) in Header covering all navigation, hero text, domain curriculum, algorithm matrix, simulator controls, and mathematical breakdowns.
- **Comprehensive 5-Chapter Robotics Foundations Course** (`/learn/fundamentals`):
  - **Chapter 1**: What is Autonomous Robotics? (Sense-Plan-Act paradigm, State Space $\mathcal{X}$, Action Space $\mathcal{U}$).
  - **Chapter 2**: Essential Mathematics for Robotics ($SE(2)$ homogeneous transformations, angle wrapping, calculus & RK4 numerical integration, multivariate Gaussian distributions).
  - **Chapter 3**: Kinematic & Dynamic Modeling (Unicycle differential-drive, Ackermann bicycle model, Pfaffian non-holonomic constraint $\dot{y}_R = 0$).
  - **Chapter 4**: Autonomous Robotics Algorithm Taxonomy (Planning, Localization, Control, Mapping, SLAM, Multi-Agent comparative matrix).
  - **Chapter 5**: Pure TypeScript Engine source code for $SE(2)$ transformations and unicycle kinematics.
- **Interactive Transform Sandbox** (`TransformSandbox.tsx`): Interactive coordinate frame gizmo showing live $3\times 3$ homogeneous transformation matrix $T_R^W$ and world point projections $\mathbf{p}^W = T_R^W \mathbf{p}^R$.
- **Bilingual Parity Across All 7 Domains**: Upgraded all learning domain pages (`/learn/planning`, `/learn/localization`, `/learn/control`, `/learn/mapping`, `/learn/slam`, `/learn/multi-agent`) with dynamic bilingual rendering.

### Changed
- Refactored `app/globals.css` with CSS custom properties for dual-theme typography, scrollbars, and KaTeX contrast.
- Updated `package.json` to version `0.3.0`.

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
- **Comprehensive Documentation**: `SPECIFICATION.md`, `ROADMAP.md`, `GOVERNANCE.md`, and academic attribution for *PythonRobotics* by Atsushi Sakai.
