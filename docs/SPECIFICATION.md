# RoboAtlas — System & Technical Specification

> **Specification Version:** 2.0  
> **Status:** Authoritative & Canonical  
> **Architecture:** General Robotics Knowledge Platform & Interactive Algorithm Laboratory  
> **Repository:** `https://github.com/Naufaldo/RoboAtlas`

---

## 1. Product Vision & Architectural Identity

**RoboAtlas** is an interactive educational platform and algorithm laboratory for learning robotics from first principles to physical implementation.

RoboAtlas is a **general robotics knowledge system** spanning multiple robot embodiments—including Manipulator Arms, Wheeled AMRs, Aerial Drones, Marine ROVs, and Legged Quadrupeds.

### The Universal Robotics Pipeline

$$\text{Problem} \longrightarrow \text{Physical Intuition} \longrightarrow \text{Mathematical Model} \longrightarrow \text{Formula \& Derivation} \longrightarrow \text{Visualization} \longrightarrow \text{Algorithm} \longrightarrow \text{Interactive Lab} \longrightarrow \text{Embodied Robot Application}$$

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

---

## 2. Core Pedagogical Rules

1. **Fundamentals First**: Always introduce universal robotics principles (e.g., rotation geometry, velocity kinematics, recursive state estimation) before presenting robot-specific implementations.
2. **One Concept, Multiple Applications**: Never duplicate fundamental theory for each individual robot platform. Author the universal mathematical theory once, then demonstrate its cross-platform application across Arms, AMRs, UAVs, ROVs, and Quadrupeds.
3. **7-Step Mathematical Explanation Standard**:
   Every important equation must follow the 7-step pedagogical standard:
   $$\text{Formula} \longrightarrow \text{Variables \& Units} \longrightarrow \text{Intuitive Meaning} \longrightarrow \text{Derivation} \longrightarrow \text{Physical Interpretation} \longrightarrow \text{Robot Application} \longrightarrow \text{Limitations}$$
4. **Pure TypeScript Algorithm Engine**: Algorithm logic must remain completely decoupled from React and DOM rendering, verified with pure unit tests before simulation wiring.
5. **Static-First Client Architecture**: 100% in-browser 60 FPS HTML5 Canvas execution with zero server or database requirements for seamless GitHub Pages hosting.

---

## 3. Academic Literature Hierarchy

RoboAtlas synthesizes authoritative literature across three defined tiers:

### Tier 1: Authoritative Primary Textbooks
- 📖 **Elements of Robotics** — Marco Ben-Ari & Francesco Mondada (*Springer Open, 2018*)
  - *Coverage*: Sense-Plan-Act loops, Braitenberg vehicles, wheel odometry, finite state machines, obstacle avoidance, and swarm behavior.
- 📖 **Foundations of Robotics: A Multidisciplinary Approach with Python and ROS** — Deepak Herath & David St-Onge (*Springer, 2022*)
  - *Coverage*: 2D/3D coordinate transformations, Euler angles, unit quaternions, Geometric Jacobians, and manipulator dynamics.
- 📖 **Planning Algorithms** — Steven M. LaValle (*Cambridge University Press, 2006*)
  - *Coverage*: Discrete graph search ($A^*$, Dijkstra), configuration spaces $\mathcal{C}_{\text{space}}$, continuous sampling (RRT, RRT*, PRM), and kinodynamic planning.

### Tier 2: Open Engineering Standards & Implementations
- 📖 **PythonRobotics** — Atsushi Sakai
  - *Role*: Algorithmic reference and visualization inspiration. Algorithms are re-derived mathematically and implemented in pure TypeScript.
- 📖 **ROS 2 Standard Architecture & IEEE Robotics Benchmarks**

### Tier 3: Supplementary Technical Resources
- University lecture notes and open educational resources.

---

## 4. 21-Level Master Curriculum Hierarchy (Levels 0–20)

Organized into 4 progressive learning tiers:

### Tier 1: Foundations (Levels 0 – 4)
- **Level 0 — Robotics Orientation**: Sense-Plan-Act loops, cyber-physical autonomy, hardware/software anatomy, and robot morphology classifications.
- **Level 1 — Mathematical & Geometric Foundations**: Scalars, vectors, dot/cross products, matrix operations in $SE(2)/SO(3)$, probability distributions, and least-squares optimization.
- **Level 2 — Coordinate Frames & Transformations**: World, robot, and sensor frames, homogeneous transformation matrices ($SE(2), SE(3)$), rotation composition, and frame chains.
- **Level 3 — Robot Modeling & Kinematics**: Differential-drive unicycle models, Instantaneous Center of Curvature (ICC), Pfaffian non-holonomic constraints, and Forward/Inverse Kinematics.
- **Level 4 — Robot Motion & Differential Geometry**: Spatial twists on $\mathfrak{se}(3)$, Geometric Manipulator Jacobians, velocity ellipsoids, and kinematic singularities.

### Tier 2: Core Autonomy (Levels 5 – 8)
- **Level 5 — Sensors & Perception**: Encoders, IMUs, 2D/3D LiDAR raycasting, RGB-D cameras, and Gaussian measurement noise models.
- **Level 6 — Path & Trajectory Planning**: Dijkstra, $A^*$ Heuristic Search (Euclidean, Manhattan, Octile), $\mathcal{C}$-space expansion, RRT, RRT*, and Quintic Polynomial Splines.
- **Level 7 — Robot Dynamics & Control**: Pure Pursuit lookahead geometry, Stanley cross-track non-linear feedback, PID controllers, and Newton-Euler dynamics.
- **Level 8 — Localization & State Estimation**: Recursive Bayesian Filtering, Chapman-Kolmogorov prediction, Monte Carlo Localization (MCL) Particle Filters, and EKF.

### Tier 3: Spatial Intelligence & SLAM (Levels 9 – 12)
- **Level 9 — Spatial Mapping & Costmaps**: Log-Odds Bayesian Occupancy Grid Mapping, Euclidean Distance Transforms (EDT), costmap inflation layers, and topological roadmaps.
- **Level 10 — Simultaneous Localization & Mapping (SLAM)**: Iterative Closest Point (ICP) scan registration, closed-form SVD rotation alignment, and pose-graph optimization.
- **Level 11 — Integrated Autonomous Navigation**: Global/local planner integration, Dynamic Window Approach (DWA), Timed Elastic Bands (TEB), and recovery behaviors.
- **Level 12 — Autonomous Systems Architecture**: Behavior Trees (BT), hierarchical state machines, mission executive planning, and safety watchdogs.

### Tier 4: Advanced Embodiments & Specializations (Levels 13 – 20)
- **Level 13 — Robotics Software Engineering & ROS 2**: DDS middleware, computation graphs, nodes, topics, services, actions, and URDF models.
- **Level 14 — Manipulation Robotics & Articulated Arms**: 6-DOF Manipulator Forward/Inverse Kinematics, Denavit-Hartenberg (DH) parameters, and grasp planning.
- **Level 15 — Aerial Robotics & Quadrotors**: 6-DOF quadrotor flight dynamics, $SE(3)$ geometric attitude control, differential flatness, and minimum-snap trajectory generation.
- **Level 16 — Legged Robotics & Quadruped Locomotion**: Zero Moment Point (ZMP), Linear Inverted Pendulum Model (LIPM), gait sequencing, and whole-body balance control.
- **Level 17 — Learning-Based Robotics & RL**: Reinforcement learning for locomotion, sim-to-real transfer, domain randomization, and Vision-Language-Action (VLA) models.
- **Level 18 — Multi-Agent Robotics & Swarm Intelligence**: Decentralized communication graphs, Graph Laplacian consensus dynamics, and Reynolds flocking.
- **Level 19 — Advanced Robotics Mathematics & Lie Groups**: Matrix Lie groups $SO(3)/SE(3)$, Lie algebras $\mathfrak{so}(3)/\mathfrak{se}(3)$, exponential mapping, and factor graph optimization.
- **Level 20 — Robotics Research & Emerging Topics**: Neural Radiance Fields (NeRF-SLAM / 3DGS), soft robotics continuum mechanics, and open benchmark problems.

---

## 5. Supported Robot Platforms Hub

Accessible via [`/robots`](../app/robots/page.tsx):
- 🦾 **Robotic Arm (Manipulator)**: 6-DOF / 7-DOF Articulated Arms, DH parameters, Analytical & Numerical IK, Operational Space Control, Grasping.
- 🚗 **Mobile Robot (AMR / AGV)**: Wheeled Planar Autonomy, Differential & Ackermann steering, Wheel Odometry Drift, 2D LiDAR Occupancy Mapping, Path Planning, Trajectory Tracking.
- 🚁 **Aerial Drone (UAV / Multirotor)**: 6-DOF Quadrotor Flight Dynamics, Euler ZYX / Quaternions, $SE(3)$ Geometric Attitude Control, Differential Flatness, Minimum-Snap.
- 🌊 **Marine Robot (ROV / AUV / USV)**: Buoyancy & Hydrodynamic Drag, Added Mass, 6-DOF Thruster Allocation Matrix, Acoustic DVL Navigation, Bathymetric Mapping.
- 🦿 **Legged Robot (Quadruped & Humanoid)**: Zero Moment Point (ZMP), Linear Inverted Pendulum Model (LIPM), Contact Mechanics, Whole-Body Balance Control.

---

## 6. MDX Content Architecture

- **Directory Structure**:
  ```text
  content/
  ├── en/
  │   ├── fundamentals/
  │   ├── planning/
  │   ├── control/
  │   ├── localization/
  │   ├── mapping/
  │   ├── slam/
  │   └── multi-agent/
  └── id/
      └── (matching exact directory and slug structure)
  ```
- **Frontmatter Schema**:
  ```yaml
  ---
  id: string (stable cross-language ID)
  title: string
  slug: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  language: 'en' | 'id'
  interactive: boolean
  estimatedMinutes: number
  prerequisites: string[]
  references: string[]
  components: string[]
  ---
  ```
- **Loader Module**: `lib/mdx/content.ts` provides `getLesson`, `getAllLessons`, and `getLessonSlugs` for static compilation.
- **Automated Validation**: `tests/mdx/content.test.ts` validates frontmatter structure and 100% English-Indonesian parity.

---

## 7. Learner-First UI/UX & Interactive Tooling

- **`LessonOrientation.tsx`**: Orienting card answering "Where am I? What am I learning? Why does it matter?" with estimated study duration.
- **`FormulaExplainer.tsx`**: 7-step pedagogical standard with KaTeX rendering, variable units, derivations, and interactive live parameter sliders.
- **`MathCodeBridge.tsx`**: Direct 1-to-1 visual and conceptual mapping connecting mathematical formulas to TypeScript code execution.
- **`ConceptCheck.tsx`**: Interactive checkpoint quiz with instant pedagogical reasoning feedback.
- **`AcademicReferences.tsx`**: Literature citation cards with author citations, publisher, publication year, chapter coverage, and direct DOI links.
- **`LessonNavigation.tsx`**: Next-steps toolbar with previous/next lesson links and suggested simulation experiments.
