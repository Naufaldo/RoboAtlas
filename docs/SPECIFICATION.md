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
8. **Master Curriculum Hierarchy**: Structured 10-level progressive dependency graph (Levels 0–9) ensuring seamless learning from zero to multi-agent autonomy.

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

## 3. 10-Level Master Robotics Curriculum Hierarchy

Organized at [`/learn`](../app/learn/page.tsx) and [`docs/RoboAtlas_Master_Curriculum.md`](RoboAtlas_Master_Curriculum.md):

```text
LEVEL 0: Robotics Orientation (Sense-Plan-Act & Robot Anatomy)
   ↓
LEVEL 1: Mathematical Foundations (Vectors, SE(2)/SE(3), Quaternions, Probability)
   ↓
LEVEL 2: Computational Foundations (Numerical Errors, Graph Search, Priority Queues)
   ↓
LEVEL 3: Robot Kinematics & Modeling (Unicycle, Non-Holonomic Constraints, Jacobians)
   ↓
LEVEL 4: Sensing & Perception (Encoders, IMU, LiDAR Raycasting, Noise Distributions)
   ↓
LEVEL 5: Localization & Mapping (Monte Carlo MCL, Log-Odds Occupancy Grids)
   ↓
LEVEL 6: Path Planning & Navigation (Dijkstra, A*, Admissible Heuristics, Splines)
   ↓
LEVEL 7: Control & Dynamic Robotics (Pure Pursuit, Stanley Feedback, Newton-Euler)
   ↓
LEVEL 8: SLAM & Spatial Autonomy (ICP Scan Matching, Closed-Form SVD)
   ↓
LEVEL 9: Multi-Agent & Swarm Intelligence (Graph Laplacian Consensus, Formations)
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
