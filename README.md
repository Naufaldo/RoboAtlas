# RoboAtlas 🤖🗺️

> **Learn Robotics by Seeing It Work.**  
> An interactive, visual-first robotics learning platform and algorithm laboratory.

[![CI & GitHub Pages Deploy](https://github.com/username/RoboAtlas/actions/workflows/deploy.yml/badge.svg)](https://github.com/username/RoboAtlas/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript: Strict](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](tsconfig.json)

---

## 🎯 Overview

**RoboAtlas** is an independent, open-source educational platform designed to bridge the gap between theoretical robotics mathematics and physical algorithmic intuition.

Inspired by the educational breadth of Atsushi Sakai's renowned [PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics), RoboAtlas re-imagines robotics education as an original **TypeScript-native interactive textbook + algorithm laboratory** running entirely in your browser with zero backend requirements.

---

## 📚 7 Core Robotics Domains

1. **Fundamentals & Kinematics** — 2D SE(2) / 3D SE(3) coordinate frames, rigid body transforms, unicycle and bicycle kinematics.
2. **Localization & State Estimation** — Extended Kalman Filters (EKF), Unscented Kalman Filters (UKF), Monte Carlo Particle Filters (MCL).
3. **Mapping & Spatial Representations** — Probabilistic Occupancy Grids, Log-Odds updates, Euclidean Distance Transforms (EDT), Costmaps.
4. **SLAM (Simultaneous Localization & Mapping)** — Iterative Closest Point (ICP) scan matching, FastSLAM, Pose Graph Optimization.
5. **Path Planning & Trajectory Generation** — Dijkstra, A* Search, D* Lite, Artificial Potential Fields (APF), RRT & RRT*.
6. **Robot Control & Path Tracking** — Pure Pursuit, Stanley Cross-Track Controller, PID feedback, LQR.
7. **Multi-Agent Robotics & Swarms** — Algebraic Graph Laplacian Consensus, Leader-Follower formations, Flocking dynamics.

---

## 🏗️ 5-Layer System Architecture

```
Educational Content (KaTeX + Conceptual Breakdowns)
         ↓
Pure Algorithm Layer (Deterministic TypeScript, Zero UI dependencies)
         ↓
Simulation Engine (State, Timesteps, Raycasting, Kinematics)
         ↓
Visualization Components (High-DPI 2D Canvas & SVG)
         ↓
Interactive UI (Controls, Sliders, Telemetry HUD)
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ or v20+)
- `npm`

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/RoboAtlas.git
cd RoboAtlas

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

RoboAtlas includes rigorous unit tests for 2D kinematic transformations, vector geometry, and curriculum mappings.

```bash
# Run unit tests with Vitest
npm test

# Typecheck with strict TypeScript
npm run typecheck

# Build static production export for GitHub Pages
npm run build
```

---

## 🌐 Deploying to GitHub Pages

RoboAtlas is configured out-of-the-box for **GitHub Pages** static deployment via GitHub Actions:

1. Push your repository to GitHub.
2. In your repository settings on GitHub, navigate to **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` branch. The automated workflow in `.github/workflows/deploy.yml` will automatically lint, test, build, and deploy the site to `https://<your-username>.github.io/<repo-name>/`.

---

## 📖 Citation & Academic References

RoboAtlas draws theoretical and structural inspiration from classical literature and open-source benchmarks:

- **PythonRobotics Reference**: Atsushi Sakai ([PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics), [Online Textbook](https://atsushisakai.github.io/PythonRobotics/index.html)).
- **Probabilistic Robotics**: Thrun, S., Burgard, W., & Fox, D. (MIT Press, 2005).
- **Planning Algorithms**: LaValle, S. M. (Cambridge University Press, 2006).

See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) and individual algorithm documentation for comprehensive citations.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
