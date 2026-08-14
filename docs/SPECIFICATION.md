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
7. **Canonical MDX Content Layer**: All educational lessons authored in structured MDX (`content/en/` and `content/id/`) with Gray-Matter frontmatter parsing.
8. **Master Curriculum Hierarchy**: Structured 21-level progressive dependency graph (Levels 0–20) ensuring seamless learning from zero to multi-agent autonomy.

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

## 3. 21-Level Master Robotics Curriculum Hierarchy (v1.0)

Organized at [`/learn`](../app/learn/page.tsx) and specified in [`docs/RoboAtlas_Master_Curriculum_v1.md`](RoboAtlas_Master_Curriculum_v1.md):

```text
TIER 1: FOUNDATIONS (LEVELS 0 – 4)
Level 0: Robotics Orientation
Level 1: Mathematical & Geometric Foundations
Level 2: Coordinate Frames & Transformations
Level 3: Robot Modeling & Kinematics
Level 4: Robot Motion & Differential Geometry

TIER 2: CORE AUTONOMY (LEVELS 5 – 8)
Level 5: Sensors & Perception
Level 6: Path & Trajectory Planning
Level 7: Robot Dynamics & Control
Level 8: Localization & State Estimation

TIER 3: SPATIAL INTELLIGENCE & SLAM (LEVELS 9 – 12)
Level 9: Spatial Mapping & Costmaps
Level 10: Simultaneous Localization & Mapping (SLAM)
Level 11: Integrated Autonomous Navigation
Level 12: Autonomous Systems Architecture

TIER 4: ADVANCED EMBODIMENTS & SPECIALIZATIONS (LEVELS 13 – 20)
Level 13: Robotics Software Engineering & ROS 2
Level 14: Manipulation Robotics & Articulated Arms
Level 15: Aerial Robotics & Quadrotors
Level 16: Legged Robotics & Quadruped Locomotion
Level 17: Learning-Based Robotics & RL
Level 18: Multi-Agent Robotics & Swarm Intelligence
Level 19: Advanced Robotics Mathematics & Lie Groups
Level 20: Robotics Research & Emerging Topics
```

---

## 4. 5-Layer System Architecture

```text
Layer 1: Canonical MDX Content Layer (Frontmatter, KaTeX, Bilingual Lessons)
                     ↓
Layer 2: Pure Algorithm Layer (Framework-Agnostic Pure TypeScript)
                     ↓
Layer 3: Simulation Engine (Kinematics, Timesteps, Raycasting, Physics)
                     ↓
Layer 4: Visualization Layer (2D Canvas, Isometric 3D Projection, High-DPI)
                     ↓
Layer 5: Interactive UI Layer (FormulaExplainer, MathCodeBridge, LearnerGuide)
```

---

## 5. Canonical MDX Content Architecture

- **Directory Layout**: `content/en/{domain}/{slug}.mdx` and `content/id/{domain}/{slug}.mdx`.
- **Frontmatter Schema**: Every MDX file must contain stable cross-language `id`, `title`, `slug`, `category`, `difficulty`, `language`, `interactive`, `estimatedMinutes`, `prerequisites`, `references`, and `components`.
- **Loader Module**: `lib/mdx/content.ts` provides `getLesson`, `getAllLessons`, and `getLessonSlugs` for static build ingestion.
- **Automated Validation**: `tests/mdx/content.test.ts` validates frontmatter structure and EN/ID parity.

---

## 6. Learner-First UI/UX & Mathematical Explanation Framework

- **`LessonOrientation.tsx`**: Orienting card answering "Where am I? What am I learning? Why does it matter?" with estimated study duration.
- **`FormulaExplainer.tsx`**: 7-step pedagogical standard with intuitive meaning, physical reasoning ("Why?"), variable glossary tables with SI units, collapsible step-by-step derivations, and interactive live parameter calculators.
- **`MathCodeBridge.tsx`** (Section 38): Side-by-side mapping between KaTeX mathematical formulations and TypeScript code execution with symbol-to-identifier lookup tables.
- **`ConceptCheck.tsx`**: Checkpoint quiz with instant pedagogical reasoning feedback.
- **`AcademicReferences.tsx`** (Section 39): Standard academic literature reference cards with author citations, publisher, publication year, chapter coverage, and direct DOI links.
- **`LessonNavigation.tsx`**: Next-steps toolbar with previous/next lesson links and suggested interactive simulation experiments.
