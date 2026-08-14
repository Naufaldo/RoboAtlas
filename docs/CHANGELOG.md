# Changelog

All notable changes to the **RoboAtlas** project are tracked in the root [`CHANGELOG.md`](../CHANGELOG.md).

## Current Version:## [0.4.0] - 2026-08-14

### Added
- **10-Level Master Robotics Curriculum Hierarchy** (`docs/RoboAtlas_Master_Curriculum.md`):
  - Progressive learning dependency graph organized into 10 structured levels:
    - **Level 0**: Robotics Orientation (Sense-Plan-Act & Taxonomy)
    - **Level 1**: Mathematical Foundations ($SE(2)$, $SO(3)$, Quaternions, Probability)
    - **Level 2**: Computational Foundations & Graph Theory
    - **Level 3**: Robot Kinematics & Velocity Modeling (Unicycle, Jacobians)
    - **Level 4**: Sensing, Perception & LiDAR Raycasting
    - **Level 5**: Probabilistic Localization & Occupancy Grid Mapping
    - **Level 6**: Path Planning & Trajectory Generation ($A^*$, Dijkstra, Splines)
    - **Level 7**: Feedback Control & Dynamic Robotics (Pure Pursuit, Stanley)
    - **Level 8**: SLAM & Spatial Autonomy (ICP Scan Registration, SVD)
    - **Level 9**: Multi-Agent & Swarm Intelligence (Laplacian Consensus)
  - Interactive dual-view dashboard in `/learn` (Progressive 10-Level Pathway vs. Domain Laboratories).
- **Canonical MDX Content Architecture** (`docs/RoboAtlas_MDX_Content_Architecture.md`):
  - Structured content directory layout (`content/en/` and `content/id/`) across learning domains.
  - Standardized YAML frontmatter schema with stable cross-language lesson IDs.
  - Dynamic MDX loader library (`lib/mdx/content.ts`) with Gray-Matter parsing.
  - Automated unit test suite (`tests/mdx/content.test.ts`) validating frontmatter integrity (**21 / 21 tests passing**).
- **Learner-First UI/UX Framework** (`docs/RoboAtlas_UI_UX_Learner_First_Spec.md`):
  - **`LessonOrientation.tsx`**: "Where am I? What am I learning? Why does it matter?".
  - **`ConceptCheck.tsx`**: Checkpoint quiz with instant pedagogical feedback.
  - **`MathCodeBridge.tsx`**: KaTeX math formula to TypeScript code execution mapping.
  - **`AcademicReferences.tsx`**: Structured academic literature citations with DOIs.
  - **`LessonNavigation.tsx`**: Progression toolbar with previous/next lesson links and interactive simulation challenges.
- **Mathematical Explanation Standard** (`docs/RoboAtlas_Mathematical_Explanation_Rules.md`):
  - **`FormulaExplainer.tsx`**: 7-step pedagogical standard with intuitive meaning, physical reasoning ("Why?"), variable unit tables, collapsible derivations, and live calculators.
- **9-Chapter Robotics Foundations Curriculum**: Complete syllabus covering 2D/3D geometry, kinematics, matrices, state-space modeling, and dynamics.
- **7 Bespoke 60 FPS Simulators with Mobile Touch Support**: Touch-friendly canvas simulations across all robotics domains.
- **Bilingual & Dual Theme**: English/Indonesian toggle and Dark/Light mode.
