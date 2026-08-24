<p align="center">
  <img src="public/images/logo.png" alt="RoboAtlas Logo" width="220" style="border-radius: 28px; box-shadow: 0 10px 30px rgba(6, 182, 212, 0.25);" />
</p>

<h1 align="center">RoboAtlas</h1>

<p align="center">
  <strong>Interactive Robotics Learning Platform & Algorithm Laboratory</strong><br />
  <em>Understand • See • Experiment • Build</em>
</p>

<p align="center">
  <a href="https://naufaldo.github.io/RoboAtlas/"><img src="https://img.shields.io/badge/Live_Demo-GitHub_Pages-06b6d4?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo" /></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Version-v0.5.0-10b981?style=for-the-badge" alt="Version 0.5.0" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License MIT" /></a>
  <img src="https://img.shields.io/badge/Bilingual-EN%20%7C%20ID-8b5cf6?style=for-the-badge" alt="Bilingual EN | ID" />
  <img src="https://img.shields.io/badge/Theme-Dark%20%2F%20Light-f59e0b?style=for-the-badge" alt="Dual Theme" />
  <img src="https://img.shields.io/badge/Curriculum-21_Levels_(0--20)-cyan?style=for-the-badge" alt="21-Level Master Curriculum" />
  <img src="https://img.shields.io/badge/Learning_Paths-SLAM_%7C_Arms_%7C_Control-06b6d4?style=for-the-badge" alt="Guided Learning Paths" />
  <img src="https://img.shields.io/badge/Simulators-28_Interactive_Labs-3b82f6?style=for-the-badge" alt="28 Interactive Simulators" />
  <img src="https://img.shields.io/badge/Mobile-Touch_Optimized-ec4899?style=for-the-badge" alt="Mobile Touch Optimized" />
</p>

---

## 🎯 Overview

**RoboAtlas** is an independent, open-source educational platform and interactive algorithm laboratory engineered from first principles.

Rather than being limited to a single robot category (e.g. only mobile rovers or ROS tutorials), RoboAtlas is a **general robotics knowledge platform** designed to teach:
> **How robots work, how robotics problems are modeled mathematically, how algorithms solve those problems, and how the same fundamental concepts are embodied across different physical robot platforms.**

### The Universal Robotics Pipeline

```text
             ROBOTICS FUNDAMENTALS
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   MATHEMATICS    PHYSICS       LOGIC
       │             │             │
       └─────────────┼─────────────┘
                     ↓
                 ALGORITHMS
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   KINEMATICS     CONTROL      PERCEPTION
       │             │             │
       └─────────────┼─────────────┘
                     ↓
               ROBOT SYSTEMS
                     │
       ┌───────┬─────┼─────┬───────┐
       ↓       ↓     ↓     ↓       ↓
      ARM    MOBILE  UAV   ROV   LEGGED
       │       │     │     │       │
       └───────┴─────┴─────┴───────┘
                     ↓
              ADVANCED ROBOTICS
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Robot AI      Multi-Agent    Research
```

Synthesizing foundational literature from three classical textbooks:
1. 📖 **Elements of Robotics** — Marco Ben-Ari & Francesco Mondada (*Springer Open*)
2. 📖 **Foundations of Robotics: A Multidisciplinary Approach with Python and ROS** — Deepak Herath & David St-Onge (*Springer*)
3. 📖 **Planning Algorithms** — Steven M. LaValle (*Cambridge University Press*)

---

## 🧭 Guided Learning Paths & Master SLAM Guide

Explore structured progressive tracks bridging analytical mathematics to 60 FPS simulators at **[`/learn`](https://naufaldo.github.io/RoboAtlas/learn/)**:

1. 🧭 **SLAM & Autonomous Mobile Robot Navigation (10 Milestones)**:
   - *Vectors & Euclidean Geometry $\to$ Coordinate Frames & $SE(2)$ Transforms $\to$ Differential Drive Kinematics $\to$ LiDAR Time-of-Flight Raycasting $\to$ Wheel Odometry Drift $\to$ Monte Carlo Particle Filter Localization (MCL) $\to$ Log-Odds Occupancy Grid Mapping $\to$ ICP Scan Matching SLAM $\to$ $A^*$ Path Planning $\to$ Pure Pursuit Motion Control*.
   - Reference Book: **[`book/SLAM_Learning Path.md`](book/SLAM_Learning%20Path.md)**.
2. 🦾 **Articulated Robotic Arm Manipulation (4 Milestones)**:
   - *Homogeneous Transform Chaining $\to$ 2-DOF Planar Forward Kinematics (FK) $\to$ Analytical Inverse Kinematics (IK) $\to$ Jacobian Matrix & Velocity Ellipse Singularities*.
3. 🎛️ **Control Systems & State-Space Dynamics (4 Milestones)**:
   - *State-Space Dynamics & Phase Planes $\to$ Discrete Numerical Integration (Euler vs RK4) $\to$ PID Feedback Tuning $\to$ Multi-Agent Graph Laplacian Consensus*.

---

## 🎓 21-Level Master Robotics Curriculum Hierarchy

Organized at **[`/learn`](https://naufaldo.github.io/RoboAtlas/learn/)** across 4 Primary Tiers:

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

## 🎮 28 In-Browser 60 FPS Interactive Simulators

Explore the full laboratory workstation at **[`/labs`](https://naufaldo.github.io/RoboAtlas/labs/)**:

- **Math & Spatial Geometry**:
  - `TransformSandbox.tsx`: $SE(2)$ Homogeneous Matrix & Coordinate Frame Gizmo.
  - `SpatialRotation3D.tsx`: 3D $SO(3)$ Euler Angle Roll-Pitch-Yaw Simulator.
  - `TransformChainSimulator.tsx`: Transform Composition & Matrix Non-Commutativity ($T_1 T_2 \neq T_2 T_1$).
  - `VectorVisualizer.tsx`, `DotProductExplorer.tsx`, `CoordinateFrameExplorer.tsx`: Geometric vector operations and projection.
  - `CspaceInflationSimulator.tsx`: Minkowski obstacle expansion ($C_{\text{obs}} = \mathcal{O} \oplus \mathcal{B}_r$).
  - `BayesianRoomSimulator.tsx`: Discrete room localization and Bayes rule updates.
- **Kinematics & Dynamics**:
  - `KinematicsSimulator.tsx`: Differential-drive velocity integrator with Instantaneous Center of Curvature (ICC).
  - `HolonomicConstraintSimulator.tsx`: Pfaffian non-holonomic no-slip constraints.
  - `ArmForwardKinematicsSimulator.tsx`: 2-DOF planar arm forward kinematics & workspace annulus limits.
  - `ArmInverseKinematicsSimulator.tsx`: Analytical inverse kinematics solver (Elbow-Up vs. Elbow-Down).
  - `JacobianSingularitySimulator.tsx`: Velocity manipulability ellipse and singularity detection ($\det(J) \to 0$).
- **Perception & Sensors**:
  - `LidarRaycastSimulator.tsx`: 360° LiDAR Raycaster with parametric segment intersections and point cloud generation.
  - `SensorNoiseSimulator.tsx`: Gaussian sensor noise modeling and histogram density functions.
  - `OdometryDriftSimulator.tsx`: Wheel radius bias and dead reckoning divergence.
  - `MappingSimulator.tsx`: Log-Odds recursive Bayesian Occupancy Grid Mapping.
- **Planning & Trajectory Generation**:
  - `PathPlanningSimulator.tsx`: Custom obstacle drawing with $A^*$ and Dijkstra graph search.
  - `AStarVsDijkstraSimulator.tsx`: Uniform wavefront vs. heuristic search comparison.
  - `RrtSimulator.tsx` & `RrtExplorationSimulator.tsx`: Randomized rapidly-exploring tree growth and $RRT^*$ neighborhood rewiring.
- **State Estimation & SLAM**:
  - `BayesianFilterSimulator.tsx`: 1D Recursive Bayes & Kalman filter prediction-correction.
  - `LocalizationSimulator.tsx`: Monte Carlo Localization (MCL) particle filter with sensor updates.
  - `SlamSimulator.tsx`: Iterative Closest Point (ICP) point cloud alignment via Singular Value Decomposition (SVD).
- **Motion Control & Swarms**:
  - `ControlSimulator.tsx`: Pure Pursuit lookahead geometry vs. Stanley non-linear feedback.
  - `PurePursuitSimulator.tsx`: Pure Pursuit lookahead distance tuning ($L_d$).
  - `TrackingErrorGeometrySimulator.tsx`: Frenet-Serret cross-track lateral error ($e_{\text{lat}}$) and heading error ($e_\theta$).
  - `PidTuningSimulator.tsx`: PID loop tuning with transient step response analysis.
  - `StateSpaceSimulator.tsx`: Continuous state-space dynamics ($\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u}$) and phase portraits.
  - `NumericalDiscretizationSimulator.tsx`: Numerical solver comparison (Euler vs. Midpoint vs. Runge-Kutta 4).
  - `MultiAgentSimulator.tsx`: Graph Laplacian swarm consensus and decentralized formation control.

---

## 🤖 Supported Robot Platforms (Embodiments Hub)

Explore platform-specific implementations at **[`/robots`](https://naufaldo.github.io/RoboAtlas/robots/)**:

- 🦾 **Robotic Arm (Manipulator)**: 6-DOF / 7-DOF Articulated Arms, Denavit-Hartenberg (DH) convention, Analytical & Numerical IK, Operational Space Control, Grasping.
- 🚗 **Mobile Robot (AMR / AGV)**: Wheeled Planar Autonomy, Differential & Ackermann steering, Wheel Odometry Drift, 2D LiDAR Occupancy Mapping, Path Planning, Trajectory Tracking.
- 🚁 **Aerial Drone (UAV / Multirotor)**: 6-DOF Quadrotor Flight Dynamics, Euler ZYX / Quaternions, SE(3) Geometric Attitude Control, Differential Flatness, Minimum-Snap.
- 🌊 **Marine Robot (ROV / AUV / USV)**: Buoyancy & Hydrodynamic Drag, Added Mass, 6-DOF Thruster Allocation Matrix, Acoustic DVL Navigation, Bathymetric Mapping.
- 🦿 **Legged Robot (Quadruped & Humanoid)**: Zero Moment Point (ZMP), Linear Inverted Pendulum Model (LIPM), Contact Mechanics, Whole-Body Balance Control.

---

## ✨ Key Platform Features

- 📑 **Canonical MDX Content Layer (`content/`)**: Authored in structured bilingual MDX (`content/en/` and `content/id/`) with Gray-Matter frontmatter schemas and cross-language stable ID tracking.
- 🎓 **Learner-First UI/UX Framework**:
  - `LessonOrientation.tsx`: Answers "Where am I? What am I learning? Why does it matter?" with estimated study time.
  - `MathCodeBridge.tsx`: Direct 1-to-1 visual and conceptual mapping from mathematical formulas to TypeScript code.
  - `AcademicReferences.tsx`: Structured literature cards citing authoritative papers with DOIs and chapter coverage.
  - `ConceptCheck.tsx`: Interactive checkpoint quizzes with automatic state reset, boolean normalization, and instant pedagogical feedback.
  - `CodeBlock.tsx`: Syntax-highlighted code blocks with language badges and copy-to-clipboard functionality.
- 📐 **7-Step Mathematical Explanation Standard (`FormulaExplainer.tsx`)**:
  - KaTeX rendering $\to$ Intuitive Meaning $\to$ Physical Reasoning ("Why?") $\to$ Dimensional Unit Tables $\to$ Collapsible Step-by-Step Derivations $\to$ Interactive Live Parameter Calculators.
- 🌓 **Dual-Theme Engine (Dark & Light Mode)**: Futuristic deep-void robotics laboratory (`#040711`) vs. clean clinical light mode (`#f8fafc`).
- 🌐 **Full Bilingual Parity (Bahasa Indonesia & English)**: 1-click language switcher (`ID` / `EN`) in Header covering all navigation, hero sections, interactive simulators, and KaTeX math breakdowns.
- 📱 **Mobile-Adaptive & Touch-First**:
  - Full touch interactions (`onTouchStart`, `onTouchMove`) across all 60 FPS Canvas simulators.
  - Horizontal touch-scroll containers (`overflow-x-auto scrollbar-thin`) for all complex KaTeX equations and matrices.
- ⚡ **100% Client-Side Architecture**: Pure TypeScript and HTML5 Canvas 2D engine. Zero server latency, zero database overhead, and instant load times.

---

## 📖 Comprehensive Documentation

- 📋 **[System & Technical Specification v2.0](docs/SPECIFICATION.md)** — Architectural design, 21-Level Master Curriculum, MDX schemas, 7-Step Math standard, and Learner-First UI/UX framework.
- 🧭 **[SLAM Learning Path Master Guide](book/SLAM_Learning%20Path.md)** — 8-Chapter autonomous mobile robotics & SLAM pipeline reference.
- 🤖 **[Agentic Governance & Collaboration](docs/GOVERNANCE.md)** — 16 Core Agentic Rules and 8-Step Workflow Loop.
- 🗺️ **[Feature Roadmap](docs/ROADMAP.md)** — 12-Milestone delivery hierarchy (M1 through M12).
- 📜 **[Changelog](CHANGELOG.md)** — Detailed version release history adhering to Keep a Changelog and SemVer.
- 🏗️ **[Architecture Overview](ARCHITECTURE.md)** — Modular 5-layer client-side system overview.
- 🤝 **[Contributing Guide](CONTRIBUTING.md)** — Development standards and pull request workflows.
- 📜 **[Third-Party Notices](THIRD_PARTY_NOTICES.md)** — Attribution to PythonRobotics and academic citations.

---

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/Naufaldo/RoboAtlas.git
cd RoboAtlas

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser: http://localhost:3000
```

---

## 📜 License & Attribution

- **License**: Released under the [MIT License](LICENSE).
- **Academic Citations**: Inspired by foundational literature by Ben-Ari, Mondada, Herath, St-Onge, LaValle, and algorithmic inspiration from Atsushi Sakai's PythonRobotics. All educational text and TypeScript engines are engineered independently from first principles.
