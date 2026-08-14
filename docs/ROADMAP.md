# RoboAtlas Development Roadmap

> **Roadmap Version:** 2.0  
> **Status:** Active & Progressive  
> **Canonical Reference:** [`docs/SPECIFICATION.md`](SPECIFICATION.md)

---

## 🗺️ The 12-Milestone Delivery Hierarchy

```text
M1: Robotics Foundations ───► M2: Mathematics ───► M3: Geometry ───► M4: Kinematics
                                                                          │
M8: Planning & Mapping ◄─── M7: Sensing & State ◄─── M6: Control ◄────────┘
         │
         ▼
M9: SLAM & Autonomy ───► M10: Robot Platforms ───► M11: Advanced Math ───► M12: Frontier Research
```

---

### 🟢 Milestone 1: Robotics Foundations (Completed — v0.1.0)
- [x] Sense–Plan–Act Cyber-Physical architecture.
- [x] Hardware / software taxonomy of modern autonomous robots.
- [x] Introduction to autonomous mobile robotics lesson (`content/{en,id}/fundamentals/intro-to-robotics.mdx`).
- [x] Dual-theme engine (Dark & Light Mode) with persistent `localStorage`.
- [x] Bilingual system (English & Indonesian).

### 🟢 Milestone 2: Mathematical & Geometric Foundations (Completed — v0.4.0)
- [x] 2D Cartesian plane & polar representation explorer (`CoordinateFrameExplorer.tsx`).
- [x] Pythagorean vector decomposition & normalization visualizer (`VectorVisualizer.tsx`).
- [x] Vector dot product & angular direction alignment explorer (`DotProductExplorer.tsx`).
- [x] Mathematical Foundations canonical MDX lesson (`content/{en,id}/fundamentals/mathematical-foundations.mdx`).
- [x] 7-Step Mathematical Explanation Standard (`FormulaExplainer.tsx`).

### 🟢 Milestone 3: Geometry & Coordinate Transformations (Completed — v0.2.0)
- [x] $SE(2)$ Homogeneous Transformation Matrices & 2D frame manipulation sandbox (`TransformSandbox.tsx`).
- [x] 3D $SO(3)$ Euler Angle Roll-Pitch-Yaw Simulator with real-time matrix inspection (`SpatialRotation3D.tsx`).
- [x] Coordinate frame composition chain and inverse transformations.

### 🟢 Milestone 4: Robot Modeling & Velocity Kinematics (Completed — v0.2.0)
- [x] Differential-drive unicycle kinematics simulator (`KinematicsSimulator.tsx`).
- [x] Instantaneous Center of Curvature (ICC) trajectory projection.
- [x] Pure TypeScript kinematics library (`lib/math/transforms.ts`, `lib/math/vector2d.ts`).

### 🟢 Milestone 5: Graph Search & Planning Algorithms (Completed — v0.2.0)
- [x] Grid search algorithm lab with A* (Euclidean, Manhattan, Octile heuristics) and Dijkstra (`PathPlanningSimulator.tsx`).
- [x] Interactive wall drawing and start/target waypoint manipulation.
- [x] Step-by-step path planning visualization with open/closed set inspection.

### 🟢 Milestone 6: Dynamics & Feedback Control (Completed — v0.3.0)
- [x] Geometric Pure Pursuit controller with lookahead radius adjustment (`ControlSimulator.tsx`).
- [x] Stanley non-linear lateral tracking controller with cross-track error feedback.
- [x] Dual track geometries: Oval and Figure-8 with real-time velocity & cross-track error HUD.

### 🟢 Milestone 7: Sensing, Perception & State Estimation (Completed — v0.3.0)
- [x] 360° LiDAR raycasting simulator with distance noise models (`MappingSimulator.tsx`).
- [x] Monte Carlo Localization (MCL) particle filter simulator (`LocalizationSimulator.tsx`).
- [x] Landmark beacon triangulation, particle resampling, and dead-reckoning drift visualizer.

### 🟢 Milestone 8: Spatial Mapping & Costmaps (Completed — v0.3.0)
- [x] Log-Odds Bayesian Occupancy Grid Mapping with inverse sensor model (`MappingSimulator.tsx`).
- [x] Euclidean distance transforms and obstacle inflation layer concepts.

### 🟢 Milestone 9: SLAM & Autonomous Systems (Completed — v0.3.0)
- [x] Iterative Closest Point (ICP) scan registration with closed-form SVD rotation alignment (`SlamSimulator.tsx`).
- [x] Behavior Trees and mission executive architecture foundations.

### 🟢 Milestone 10: Robot Platforms Hub & Cross-Platform Embodiments (Completed — v0.4.0)
- [x] Interactive Robot Platforms Showcase ([`/robots`](../app/robots/page.tsx)) mapping universal principles across 5 embodiments:
  - 🦾 **Robotic Arm (Manipulator)** (6-DOF, DH params, IK, Grasping)
  - 🚗 **Mobile Robot (AMR / AGV)** (Differential, Ackermann, Odometry, SLAM)
  - 🚁 **Aerial Drone (UAV / Multirotor)** (6-DOF Quadrotor, Attitude SE(3), Minimum-Snap)
  - 🌊 **Marine Robot (ROV / AUV)** (Buoyancy, Thruster Allocation, Underwater Nav)
  - 🦿 **Legged Robot (Quadruped & Humanoid)** (ZMP, LIPM, Gait sequencing, Balance)
- [x] Cross-platform learning panel showing universal mathematical foundations applied per embodiment.

### 🟡 Milestone 11: Advanced Robotics & Lie Groups (In Progress — v0.5.0)
- [ ] Matrix Lie groups $SO(3)$ / $SE(3)$ and Lie algebras $\mathfrak{so}(3)$ / $\mathfrak{se}(3)$.
- [ ] Exponential map, matrix logarithm, and adjoint representations.
- [ ] Factor Graph optimization for landmark SLAM and pose graph optimization.

### ⚪ Milestone 12: Frontier Robotics Research (Future Phase)
- [ ] Neural Radiance Fields (NeRF-SLAM & 3D Gaussian Splatting) for spatial robotics.
- [ ] Sim-to-real transfer and domain randomization with reinforcement learning.
- [ ] Vision-Language-Action (VLA) foundation models for embodied robotic autonomy.
