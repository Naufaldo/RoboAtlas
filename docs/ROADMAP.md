# RoboAtlas Feature Roadmap & Milestones

This roadmap defines the implementation schedule for RoboAtlas, organized by incremental milestones to maintain high code quality and test coverage.

---

## 📍 Phase 1: Core Educational Curriculum & Simulators

### ✅ Milestone 0 — Platform Foundation (Completed)
- [x] Next.js 14 App Router + TypeScript + Tailwind CSS setup.
- [x] Static export architecture with GitHub Pages subpath support.
- [x] KaTeX client-side mathematical equation rendering.
- [x] 2D vector geometry and $SE(2)$ kinematics transform engine.
- [x] Interactive Hero simulator with active LiDAR and real-time telemetry HUD.
- [x] Curriculum explorer and algorithm matrix with search & filtering.
- [x] Unit test suite with Vitest (17 passing tests).
- [x] GitHub Actions CI/CD pipeline for automated testing, build, and deployment.
- [x] Full initial documentation suite (`README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `LICENSE`, `THIRD_PARTY_NOTICES.md`).

---

### ✅ Milestone 1 — Robotics Fundamentals & Kinematics (Completed)
- **Topic Coverage**:
  - **9 Foundational Chapters**:
    1. Introduction to Robotics & Sense-Plan-Act Loops
    2. 2D Planar Geometry & Vector Rotation in $SO(2)$
    3. 3D Spatial Geometry, Euler Angles & Quaternions
    4. Path vs. Trajectory & Quintic Polynomial Splines
    5. Velocity Kinematics in 2D (Unicycle & Non-Holonomic Constraints)
    6. Velocity Kinematics in 3D (Twists & Geometric Jacobians)
    7. Matrix Foundations ($4\times 4$ $SE(3)$, Covariance & SVD)
    8. Mathematical Modeling (State-Space & FSM)
    9. Robot Dynamics (Newton-Euler & Euler-Lagrange)
- **Interactive Simulators**:
  - `TransformSandbox.tsx`: $SE(2)$ Homogeneous Transformation Matrix Inspector.
  - `SpatialRotation3D.tsx`: 3D $SO(3)$ Euler Angle Roll-Pitch-Yaw Simulator.
  - `KinematicsSimulator.tsx`: 60 FPS Differential-Drive Velocity Integrator.
- **Mobile & Bilingual**: Full touch interaction (`onTouchStart`/`onTouchMove`) and English/Indonesian support.

---

### ✅ Milestone 2 — Path Planning: Dijkstra & A* Heuristic Search (Completed)
- **Topic Coverage**:
  - Graph representation of planar grid worlds (4-connectivity vs. 8-connectivity).
  - Priority Queue (Min-Heap) frontier expansion.
  - Guaranteed shortest path optimality proof and admissibility ($h(n) \le h^*(n)$).
  - Heuristic function design: Euclidean, Manhattan, and Octile distances.
- **Simulations & Components**:
  - `PathPlanningSimulator.tsx`: Interactive grid canvas with custom obstacle wall drawing, A* (Octile, Euclidean, Manhattan), and Dijkstra.
  - `FormulaExplainer.tsx`: Interactive cost evaluation $f(n) = g(n) + h(n)$ calculator.
  - `MathCodeBridge.tsx`: Direct math-to-code mapping between evaluation formulas and TypeScript priority queues.
  - `LessonOrientation.tsx` & `AcademicReferences.tsx`: Citations for Hart, Nilsson, & Raphael (1968) and LaValle (2006).
- **MDX Content**: `content/en/planning/a-star.mdx` & `content/id/planning/a-star.mdx`.
  - Heuristic weight multiplier slider ($f(n) = g(n) + \epsilon \cdot h(n)$ for Weighted A*).

---

### 🚀 Milestone 4 — Advanced Path Planning
- **Algorithms**:
  - **Artificial Potential Field (APF)**: Attractive goal well, repulsive obstacle barriers, local minima handling.
  - **Rapidly-exploring Random Tree (RRT)**: Random sampling in continuous $C$-space, nearest neighbor search, collision stepping.
  - **RRT\***: Asymptotic optimality via near-neighbor rewiring with shrinking ball radius.
  - **D\* Lite**: Incremental heuristic replanning for dynamic environments with moving obstacles.
- **Simulations**:
  - Continuous 2D vector field visualization for Potential Fields.
  - Live tree growth animation with branch rewiring for RRT and RRT*.

---

### 🚀 Milestone 5 — Localization & State Estimation
- **Algorithms**:
  - **Monte Carlo Localization (Particle Filter)**: Importance sampling, motion update, sensor weight update, resampling (low-variance sampler).
  - **Extended Kalman Filter (EKF)**: Nonlinear state transition and observation models, Jacobian linearization, covariance ellipses.
- **Simulation**:
  - Robot navigating in a landmark map with noisy odometry and range-bearing sensor readings.
  - Visualizing true robot pose vs. estimated pose vs. particle cloud / 95% confidence covariance ellipse.

---

### 🚀 Milestone 6 — Robot Control & Path Tracking
- **Algorithms**:
  - **Pure Pursuit Controller**: Lookahead distance tuning, curvature command generation.
  - **Stanley Cross-Track Controller**: Front-axle steering error feedback, velocity-scaled error compensation.
  - **PID Feedback**: Proportional, Integral, Derivative gains with anti-windup.
- **Simulation**:
  - High-speed path tracking along arbitrary curves (splines, racetracks, Dubins paths) showing cross-track error graphs in real time.

---

### 🚀 Milestone 7 — Mapping & SLAM
- **Algorithms**:
  - **Occupancy Grid Mapping**: Log-odds inverse sensor model, raycasting updates.
  - **Iterative Closest Point (ICP)**: 2D LiDAR scan matching using Singular Value Decomposition (SVD).
  - **FastSLAM 1.0**: Rao-Blackwellized particle filter maintaining landmark Kalman filters per particle.
- **Simulation**:
  - Robot driving in an unknown maze, mapping walls with simulated LiDAR rays, resolving drift via scan matching.

---

### 🚀 Milestone 8 — Multi-Agent Robotics & Swarms
- **Algorithms**:
  - **Graph Laplacian Consensus**: Decentralized average consensus over dynamic communication graphs.
  - **Leader-Follower Virtual Structure**: Relative formation geometry preservation during obstacle negotiation.
  - **Flocking & Swarm Dynamics**: Reynolds rules (Separation, Alignment, Cohesion).
- **Simulation**:
  - 10–50 autonomous mobile agents navigating towards a common goal while avoiding mutual collisions and maintaining geometric formations (V-shape, circle, line).

---

## 🔮 Phase 2: Algorithm Laboratory & Deep Interactivity

- **Dedicated Algorithm Lab**: Full-screen interactive playground allowing learners to select any algorithm, configure custom environment maps, customize noise distributions, and run comparative benchmarks.
- **Multi-Algorithm Benchmark Mode**: Direct head-to-head comparison (e.g. A* vs. RRT* vs. Potential Field) measuring node expansion count, computation latency, path smoothness, and path length.
- **URL-Based Experiment Sharing**: Encode full simulation state into shareable URL hashes (e.g. `/lab?algo=a-star&grid=30x30&heuristic=octile&seed=42`) with zero server database requirement.

---

## 🔮 Phase 3: 3D Visualization & Advanced Dynamics

- **Three.js Visualizations**:
  - 3D Robotic Manipulator (Forward & Inverse Kinematics for 6-DOF arms).
  - 3D Quadrotor Drone Trajectory Tracking (SE(3) geometric control).
  - 3D Point Cloud LiDAR visualization.
