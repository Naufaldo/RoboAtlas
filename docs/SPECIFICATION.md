# RoboAtlas System & Technical Specification

## 1. Product Vision & Philosophy

**RoboAtlas** is an interactive robotics educational platform and algorithm laboratory. It operates under the core learning loop:

$$\text{Concept} \longrightarrow \text{Mathematics} \longrightarrow \text{Algorithm} \longrightarrow \text{Visualization} \longrightarrow \text{Simulation} \longrightarrow \text{Code} \longrightarrow \text{Experiment}$$

The platform is designed to be:
1. **Visual-First**: 2D/3D animated kinematic models, sensor raycasting, and state space graphs communicate concepts dynamically.
2. **Mathematically Rigorous**: Equations are rendered clearly via KaTeX with progressive variable disclosure.
3. **Interactive & Deterministic**: Browser simulations run at 60 FPS with step-by-step iteration controls, replayability, and seedable randomness.
4. **Mobile-Adaptive & Touch-First**: Full touch interaction (`onTouchStart`, `onTouchMove`), responsive slider grids, and touch-scrollable KaTeX formulas.
5. **Bilingual & Dual-Theme**: 1-click toggling between English/Indonesian and Dark/Light mode.
6. **100% Client-Side**: Static export architecture (`output: 'export'`) without server-side runtimes or database overhead for Phase 1.

---

## 2. Academic Reference Hierarchy

RoboAtlas is an **original educational platform** structured around three foundational textbooks:

1. **Elements of Robotics** — Marco Ben-Ari & Francesco Mondada (Springer Open, 2018)
   - *Primary usage*: Introduction to robotics, reactive Braitenberg vehicles, sensors, wheel odometry, finite state machines, obstacle avoidance, and collective swarm behavior.
2. **Foundations of Robotics: A Multidisciplinary Approach with Python and ROS** — Deepak Herath & David St-Onge (Springer, 2022)
   - *Primary usage*: Mathematical foundations, 2D/3D coordinate transformations, Euler angles, unit quaternions, Geometric Jacobians, and manipulator dynamics.
3. **Planning Algorithms** — Steven M. LaValle (Cambridge University Press, 2006)
   - *Primary usage*: Discrete graph search (Dijkstra, A*), configuration spaces $\mathcal{C}$-space, continuous sampling (RRT, RRT*, PRM), and kinodynamic trajectory generation.

---

## 3. 5-Layer System Architecture

```
Layer 1: Educational Content Layer (KaTeX, Markdown, Conceptual Explanations)
                     ↓
Layer 2: Pure Algorithm Layer (Framework-Agnostic Pure TypeScript)
                     ↓
Layer 3: Simulation Engine (Kinematics, Timesteps, Raycasting, Physics)
                     ↓
Layer 4: Visualization Layer (2D Canvas, Isometric 3D Projection, High-DPI)
                     ↓
Layer 5: Interactive UI Layer (Controls, Sliders, HUD Telemetry, Mobile Touch)
```

---

## 4. 9-Chapter Robotics Foundations Master Curriculum

Located at [`/learn/fundamentals`](../app/learn/fundamentals/page.tsx):

1. **Chapter 1: Introduction to Robotics** — Sense-Plan-Act paradigm, State Space $\mathcal{X}$, Action Space $\mathcal{U}$, and robot classifications.
2. **Chapter 2: 2D Geometry & Planar Transforms** — Cartesian vs. Polar coordinates, $SO(2)$ vector rotations, triangulation sensors, and the interactive `TransformSandbox`.
3. **Chapter 3: 3D Spatial Geometry & Euler Angles** — Right-hand rule, principal axis rotations, Roll-Pitch-Yaw $SO(3)$ matrix, unit quaternions, and the interactive `SpatialRotation3D` gizmo.
4. **Chapter 4: Path & Trajectory Generation** — Geometric path $s(\sigma)$ vs. time-parameterized trajectory $\mathbf{x}(t)$, $C^2$-continuous quintic polynomial splines.
5. **Chapter 5: Velocity Kinematics in 2D** — Differential-drive unicycle velocity mappings, ICC radius, no-slip Pfaffian constraint $-\dot{x}\sin\theta + \dot{y}\cos\theta = 0$, and `KinematicsSimulator`.
6. **Chapter 6: Velocity Kinematics in 3D** — Spatial twist $\mathbf{V}_e \in se(3)$, skew-symmetric cross-product matrix $[\boldsymbol{\omega}]_\times$, and Geometric Jacobian $J(\mathbf{q})\dot{\mathbf{q}}$.
7. **Chapter 7: Matrix Foundations for Robotics** — $4\times 4$ $SE(3)$ homogeneous transforms, matrix inverse, covariance matrix $\boldsymbol{\Sigma}$, and SVD decomposition.
8. **Chapter 8: Mathematical Modeling & Automata** — Discrete state-space models $\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{u}_k) + \mathbf{w}_k$, observation models, and Finite State Machines.
9. **Chapter 9: Robot Dynamics, Forces & Torques** — Newton-Euler translative/rotative motion, Euler-Lagrange manipulator dynamics $M(\mathbf{q})\ddot{\mathbf{q}} + C(\mathbf{q}, \dot{\mathbf{q}})\dot{\mathbf{q}} + \mathbf{g}(\mathbf{q}) = \boldsymbol{\tau}$.

---

## 5. Mobile & Touch Interaction Guidelines

- **Simulator Canvases**: All interactive canvases must bind both mouse and touch event listeners (`onTouchStart`, `onTouchMove`) with coordinate normalization relative to canvas bounding box.
- **KaTeX Formulas**: Every equation block must be wrapped in `overflow-x-auto scrollbar-thin` with touch momentum scrolling.
- **Controls & Buttons**: All buttons must maintain a minimum touch target of $44\times 44\text{px}$ on viewports $< 640\text{px}$.
