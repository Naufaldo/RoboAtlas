<p align="center">
  <img src="public/images/logo.png" alt="RoboAtlas Logo" width="200" style="border-radius: 24px;" />
</p>

<h1 align="center">RoboAtlas</h1>

<p align="center">
  <strong>Interactive Robotics Learning Platform & Algorithm Laboratory</strong><br />
  <em>Understand • See • Experiment</em>
</p>

<p align="center">
  <a href="https://naufaldo.github.io/RoboAtlas/"><img src="https://img.shields.io/badge/Live_Demo-GitHub_Pages-06b6d4?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo" /></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Version-v0.3.0-10b981?style=for-the-badge" alt="Version 0.3.0" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License MIT" /></a>
  <img src="https://img.shields.io/badge/Bilingual-EN%20%7C%20ID-8b5cf6?style=for-the-badge" alt="Bilingual EN | ID" />
  <img src="https://img.shields.io/badge/Theme-Dark%20%2F%20Light-f59e0b?style=for-the-badge" alt="Dual Theme" />
</p>

---

## 🎯 Overview

**RoboAtlas** is an independent, open-source educational platform designed to bridge the gap between theoretical robotics mathematics and physical algorithmic intuition.

Inspired by the curriculum breadth of Atsushi Sakai's renowned [PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics), RoboAtlas re-imagines robotics education as an original **TypeScript-native interactive textbook + algorithm laboratory** running entirely in your browser with zero backend requirements.

---

## ✨ Key Platform Features

- 🌓 **Dual-Theme Engine (Dark & Light Mode)**: Seamlessly toggle between a futuristic deep-void robotics laboratory (`#040711`) and a clean clinical light mode (`#f8fafc`).
- 🌐 **Full Bilingual Parity (Bahasa Indonesia & English)**: Complete 1-click language switcher (`ID` / `EN`) across all navigation menus, hero sections, interactive simulators, KaTeX math breakdowns, and algorithm matrices.
- 🎮 **7 Dedicated 60 FPS Interactive Simulators**:
  1. **[Fundamentals & Kinematics](https://naufaldo.github.io/RoboAtlas/learn/fundamentals/)** — $SE(2)$ Homogeneous Transformation Matrix Inspector (`TransformSandbox`) and Differential-Drive Kinematics (`KinematicsSimulator`).
  2. **[Path Planning](https://naufaldo.github.io/RoboAtlas/learn/planning/)** — Interactive Grid Wall Drawing, A* Search (Octile, Euclidean, Manhattan heuristics), and Dijkstra.
  3. **[Localization](https://naufaldo.github.io/RoboAtlas/learn/localization/)** — Monte Carlo Particle Filter (MCL) with landmark beacon triangulation and dead-reckoning drift.
  4. **[Robot Control](https://naufaldo.github.io/RoboAtlas/learn/control/)** — Pure Pursuit geometric steering vs. Stanley cross-track non-linear feedback controller.
  5. **[Mapping](https://naufaldo.github.io/RoboAtlas/learn/mapping/)** — 360° LiDAR Raycaster with Log-Odds Bayesian Occupancy Grid probability updates.
  6. **[SLAM](https://naufaldo.github.io/RoboAtlas/learn/slam/)** — Step-by-step Iterative Closest Point (ICP) scan matching with closed-form SVD rigid alignment.
  7. **[Multi-Agent & Swarms](https://naufaldo.github.io/RoboAtlas/learn/multi-agent/)** — Graph Laplacian consensus, leader-follower formations (V-shape, Circle, Line), and Boids flocking.
- 📐 **Rigorous KaTeX Formulations**: Complete mathematical models with defined variables, derivations, and complexity analysis.
- ⚡ **100% Client-Side Architecture**: Pure TypeScript and HTML5 Canvas 2D engine. Zero server latency, zero database overhead, and instant load times.

---

## 📚 5-Chapter Robotics Foundations Course

The **[Robotics Fundamentals](https://naufaldo.github.io/RoboAtlas/learn/fundamentals/)** course serves as the foundational stepping stone:

1. **Chapter 1: What is Autonomous Robotics?** — Cyber-physical systems, the Sense $\to$ Plan $\to$ Act paradigm, State Space $\mathcal{X}$, and Action Space $\mathcal{U}$.
2. **Chapter 2: Essential Mathematics for Robotics** — Linear Algebra ($SO(2), SE(2)$), Homogeneous Transformation Matrices, Angle Normalization ($[-\pi, \pi)$), Calculus & RK4 Numerical Integration, and Bayesian Probability $\mathcal{N}(\mu, \Sigma)$.
3. **Chapter 3: Mobile Robot Kinematic & Dynamic Modeling** — Differential-drive unicycle equations, Instantaneous Center of Curvature (ICC), Ackermann bicycle kinematics, and non-holonomic no-slip Pfaffian constraints ($\dot{y}_R = 0$).
4. **Chapter 4: Core Robotics Algorithms Taxonomy** — Comparative matrix of State Estimation, Mapping, Planning, Control, SLAM, and Multi-Agent consensus.
5. **Chapter 5: Pure TypeScript Engine Implementation** — Typed source code for $SE(2)$ transforms and unicycle state integration.

---

## 📖 Comprehensive Documentation

- 📋 **[System Specification](docs/SPECIFICATION.md)** — Architectural design, 5-layer hierarchy, KaTeX standards, and static export rules.
- 🗺️ **[Feature Roadmap](docs/ROADMAP.md)** — Detailed breakdown of Milestones 1 through 8 and future Phase 2/3 capabilities.
- 🤖 **[Agentic Governance & Collaboration](docs/GOVERNANCE.md)** — 12 Core Agentic Rules, 8-Step Workflow Loop, and bilingual/changelog guidelines.
- 📜 **[Changelog](CHANGELOG.md)** — Version release history adhering to Keep a Changelog and SemVer.
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
- **Academic Inspiration**: Inspired by [PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics) by Atsushi Sakai. All educational text and TypeScript simulation engines are engineered independently from first principles.
