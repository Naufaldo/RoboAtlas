# RoboAtlas — System & Technical Specification

> **Specification Version:** 2.0  
> **Architecture:** General Robotics Knowledge Platform & Interactive Algorithm Laboratory  
> **Canonical Master Spec:** [`docs/RoboAtlas_Master_Web_Curriculum_Spec_v2.md`](RoboAtlas_Master_Web_Curriculum_Spec_v2.md)  
> **Master Curriculum:** [`docs/RoboAtlas_Master_Curriculum_v1.md`](RoboAtlas_Master_Curriculum_v1.md)

---

## 1. Product Vision & Architectural Identity

**RoboAtlas** is a general robotics educational platform and interactive algorithm laboratory. It is not limited to a single robot category (e.g. mobile robots, ROS, or multi-agent swarms).

Instead, RoboAtlas is built to teach:
> **How robots work, how robotics problems are modeled mathematically, how algorithms solve those problems, and how the same fundamental concepts are embodied across different physical robot platforms.**

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

1. **Fundamentals First**: Always introduce general robotics principles (e.g., rotation representations, velocity kinematics, Bayes filters) before robot-specific implementations.
2. **One Concept, Multiple Applications**: Never duplicate fundamental theory for different robots. Introduce the universal mathematics once, then illustrate how it is applied to Robotic Arms, Mobile AMRs, UAVs, ROVs, and Legged Quadrupeds.
3. **7-Step Mathematical Explanation Standard**:
   $$\text{Formula} \to \text{Variables \& SI Units} \to \text{Intuition} \to \text{Derivation} \to \text{Physical Meaning} \to \text{Robot Application} \to \text{Limitations}$$
4. **Pure TypeScript Algorithm Engine**: Algorithm logic must remain decoupled from React and DOM rendering, verified with pure unit tests before simulation wiring.
5. **Static-First Client Architecture**: 100% in-browser 60 FPS HTML5 Canvas execution with zero server/database dependencies for frictionless GitHub Pages hosting.

---

## 3. Academic Literature Hierarchy

RoboAtlas synthesizes peer-reviewed textbooks and academic literature:
1. **Tier 1 (Authoritative Textbooks)**:
   - *Elements of Robotics* — Marco Ben-Ari & Francesco Mondada (Springer Open)
   - *Foundations of Robotics: A Multidisciplinary Approach with Python and ROS* — Deepak Herath & David St-Onge (Springer)
   - *Planning Algorithms* — Steven M. LaValle (Cambridge University Press)
2. **Tier 2 (Open Reference Implementations & Robotics Standards)**:
   - *PythonRobotics* — Atsushi Sakai (treated as an algorithm implementation reference)
   - ROS 2 standard design patterns & IEEE Robotics & Automation Society benchmark datasets.
3. **Tier 3 (Technical Tutorials & Articles)**: Supplementary explanations.

---

## 4. 21-Level Master Curriculum Hierarchy

Organized at [`/learn`](../app/learn/page.tsx) across 4 progressive learning tiers:

```text
TIER 1: FOUNDATIONS (LEVELS 0 – 4)
Level 0: Robotics Orientation (Sense-Plan-Act & Taxonomy)
Level 1: Mathematical & Geometric Foundations (Scalars, Vectors, Matrices, Probability)
Level 2: Coordinate Frames & Transformations (SE(2)/SE(3) Homogeneous Transforms)
Level 3: Robot Modeling & Kinematics (Differential Unicycle, ICC, Pfaffian Constraints)
Level 4: Robot Motion & Differential Geometry (Spatial Twists, Geometric Jacobians)

TIER 2: CORE AUTONOMY (LEVELS 5 – 8)
Level 5: Sensors & Perception (Encoders, IMU, LiDAR Raycasting, Noise Models)
Level 6: Path & Trajectory Planning (Dijkstra, A*, C-Space, RRT, Splines)
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

## 5. Supported Robot Platforms

Accessible via [`/robots`](../app/robots/page.tsx):
- 🦾 **Robotic Arm (Manipulator)**: 6-DOF / 7-DOF Articulated Arms, Denavit-Hartenberg (DH) parameters, Forward & Inverse Kinematics, Jacobian, Operational Space Control.
- 🚗 **Mobile Robot (AMR / AGV)**: Differential Drive, Ackermann, Mecanum, Wheel Odometry Drift, 2D LiDAR Occupancy Mapping, Path Planning, Trajectory Tracking.
- 🚁 **Aerial Drone (UAV / Multirotor)**: 6-DOF Quadrotor Dynamics, Euler Roll-Pitch-Yaw / Quaternions, SE(3) Geometric Attitude Control, Differential Flatness.
- 🌊 **Marine Robot (ROV / AUV / USV)**: Buoyancy & Hydrodynamic Drag, 6-DOF Thruster Allocation, Depth & Heading Control, Acoustic DVL Navigation.
- 🦿 **Legged Robot (Quadruped & Humanoid)**: Zero Moment Point (ZMP), Linear Inverted Pendulum Model (LIPM), Gait Sequencing, Whole-Body Balance Control.

---

## 6. Learner-First UI/UX & Interactive Tooling

- **`LessonOrientation.tsx`**: Orienting card with estimated duration and prerequisites.
- **`FormulaExplainer.tsx`**: KaTeX rendering, variable units, derivations, and interactive parameter sliders.
- **`MathCodeBridge.tsx`**: 1-to-1 visual bridge connecting mathematical formulas to TypeScript code execution.
- **`ConceptCheck.tsx`**: Checkpoint quiz with instant pedagogical reasoning feedback.
- **`AcademicReferences.tsx`**: Structured reference cards with DOIs and chapter citations.
