# RoboAtlas Feature Roadmap & Milestones

This roadmap defines the implementation schedule for RoboAtlas, organized by incremental milestones mapped directly to the **10-Level Master Robotics Curriculum** (`docs/RoboAtlas_Master_Curriculum.md`).

---

## 📍 Phase 1: 10-Level Master Curriculum & Domain Laboratories

### ✅ Milestone 0 — Platform Foundation (Completed)
- [x] Next.js 14 App Router + TypeScript + Tailwind CSS setup.
- [x] Static export architecture with GitHub Pages subpath support.
- [x] KaTeX client-side mathematical equation rendering.
- [x] 2D vector geometry and $SE(2)$ kinematics transform engine.
- [x] Interactive Hero simulator with active LiDAR and real-time telemetry HUD.
- [x] Curriculum explorer and algorithm matrix with search & filtering.
- [x] Unit test suite with Vitest (21 passing tests).
- [x] GitHub Actions CI/CD pipeline for automated testing, build, and deployment.
- [x] Full initial documentation suite (`README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `LICENSE`, `THIRD_PARTY_NOTICES.md`).

---

### ✅ Milestone 1 — Level 0, 1 & 3: Robotics Fundamentals & Kinematics (Completed)
- **Topic Coverage**:
  - **Level 0 (Orientation)**: Introduction to Robotics, Sense-Plan-Act Loops, Robot Classifications (Fixed, Mobile, Legged, Aerial).
  - **Level 1 (Mathematics)**: 2D/3D Geometry, $SE(2)$ Homogeneous Transforms, $SO(3)$ Euler Angles, Matrix Decompositions.
  - **Level 3 (Kinematics)**: Differential-drive unicycle kinematics, ICC radius, no-slip Pfaffian constraint $-\dot{x}\sin\theta + \dot{y}\cos\theta = 0$.
- **Interactive Simulators**:
  - `SensePlanActExplorer.tsx`: Step-by-step pipeline inspector.
  - `RobotClassificationExplorer.tsx`: Morphology taxonomy matrix.
  - `TransformSandbox.tsx`: $SE(2)$ Homogeneous Matrix Gizmo.
  - `SpatialRotation3D.tsx`: 3D $SO(3)$ Euler Angle Roll-Pitch-Yaw Simulator.
  - `KinematicsSimulator.tsx`: 60 FPS Differential-Drive Velocity Integrator.
- **Academic Video Integration**: Prof. Kagan Tumer (*Oregon State University*).

---

### ✅ Milestone 2 — Level 2 & 6: Path Planning (A* & Dijkstra) (Completed)
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

---

### ✅ Milestone 3 — Level 5: Probabilistic Localization (Completed)
- **Topic Coverage**:
  - Recursive Bayesian Filtering and Chapman-Kolmogorov prediction.
  - Monte Carlo Localization (MCL) Particle Filters with landmark beacon triangulation.
  - Gaussian measurement likelihood weighting and low-variance resampling.
- **Simulations & Components**:
  - `LocalizationSimulator.tsx`: Interactive particle cloud sandbox with dead-reckoning odometry drift and beacon sensing.
  - `FormulaExplainer.tsx`: Live Gaussian likelihood weight calculator $w_t^{[i]} = p(z_t \mid x_t^{[i]})$.
  - `MathCodeBridge.tsx`: TypeScript particle array iteration and weight normalization.

---

### ✅ Milestone 4 — Level 5: Occupancy Grid Mapping (Completed)
- **Topic Coverage**:
  - 2D continuous space discretization into probabilistic grid cells.
  - Log-Odds representation $l_t(m_i) = l_{t-1}(m_i) + \Delta l_{\text{sensor}} - l_0$ for numerical stability and zero-underflow immunity.
  - Inverse sensor models for free pass-through rays vs. obstacle reflections.
- **Simulations & Components**:
  - `MappingSimulator.tsx`: 360° LiDAR raycasting grid mapper with real-time log-odds updates.
  - `FormulaExplainer.tsx`: Additive log-odds update & logistic sigmoid probability recovery calculator.
  - `MathCodeBridge.tsx`: TypeScript 2D grid matrix raycasting updates.

---

### ✅ Milestone 5 — Level 7: Feedback Control & Path Tracking (Completed)
- **Topic Coverage**:
  - Pure Pursuit geometric lookahead curvature steering $\delta = \arctan(2L\sin\alpha / L_f)$.
  - Stanley cross-track non-linear feedback controller $\delta(t) = \theta_e(t) + \arctan(ke(t)/v(t))$.
- **Simulations & Components**:
  - `ControlSimulator.tsx`: Pure Pursuit vs. Stanley on racetrack and figure-8 tracks.
  - `FormulaExplainer.tsx`: Live steering angle calculator with vehicle wheelbase and speed parameters.
  - `MathCodeBridge.tsx`: TypeScript steering angle command execution.

---

### ✅ Milestone 6 — Level 8: SLAM & ICP Scan Registration (Completed)
- **Topic Coverage**:
  - Solving the chicken-and-egg spatial dilemma.
  - Point-to-point Iterative Closest Point (ICP) scan matching.
  - Singular Value Decomposition (SVD) closed-form optimal 2D rotation $R^* = VU^T$.
- **Simulations & Components**:
  - `SlamSimulator.tsx`: Step-by-step ICP point cloud registration workstation.
  - `FormulaExplainer.tsx`: Least-squares residual cost $E(R, \mathbf{t})$ and RMS calculator.
  - `MathCodeBridge.tsx`: TypeScript 2D cross-covariance matrix accumulator.

---

### ✅ Milestone 7 — Level 9: Multi-Agent & Swarm Intelligence (Completed)
- **Topic Coverage**:
  - Decentralized communication graph topologies $G=(V, E)$.
  - Graph Laplacian consensus protocol $\dot{\mathbf{x}}(t) = -\mathcal{L}\mathbf{x}(t)$.
  - Geometric formation keeping (V-shape, Circle, Line) and Reynolds flocking dynamics.
- **Simulations & Components**:
  - `MultiAgentSimulator.tsx`: Interactive swarm coordination workstation.
  - `FormulaExplainer.tsx`: Distributed consensus and rendezvous point calculator.
  - `MathCodeBridge.tsx`: TypeScript peer-to-peer velocity consensus loop.

---

## 🔮 Phase 2: Algorithm Laboratory & Deep Interactivity

- **Dedicated Algorithm Lab**: Full-screen interactive playground allowing learners to select any algorithm, configure custom environment maps, customize noise distributions, and run comparative benchmarks.
- **Multi-Algorithm Benchmark Mode**: Direct head-to-head comparison (e.g. A* vs. RRT* vs. Potential Field) measuring node expansion count, computation latency, path smoothness, and path length.
- **URL-Based Experiment Sharing**: Encode full simulation state into shareable URL hashes (e.g. `/lab?algo=a-star&grid=30x30&heuristic=octile&seed=42`) with zero server database requirement.

---

## 🔮 Phase 3: 3D Visualization & Advanced Dynamics

- **Three.js Visualizations**:
  - 3D Robotic Manipulator (Forward & Inverse Kinematics for 6-DOF arms).
  - 3D Quadrotor Drone Trajectory Tracking ($SE(3)$ geometric control).
  - 3D Point Cloud LiDAR visualization.
