# Changelog

All notable changes to the **RoboAtlas** project are tracked in the root [`CHANGELOG.md`](../CHANGELOG.md).

## Current Version: [0.4.0] - 2026-08-14

### Added
- **21-Level Master Robotics Curriculum Hierarchy v1.0** (`docs/RoboAtlas_Master_Curriculum_v1.md`):
  - Progressive learning dependency graph organized across 4 primary tiers and 21 technical levels (Levels 0 through 20):
    - **Tier 1 (Foundations)**: Level 0 (Orientation), Level 1 (Math Foundations), Level 2 (Coordinate Frames), Level 3 (Kinematics), Level 4 (Differential Motion).
    - **Tier 2 (Core Autonomy)**: Level 5 (Sensors & Perception), Level 6 (Path Planning), Level 7 (Dynamics & Control), Level 8 (Localization & Estimation).
    - **Tier 3 (Spatial Intelligence & SLAM)**: Level 9 (Occupancy Mapping), Level 10 (SLAM), Level 11 (Integrated Navigation), Level 12 (Autonomous Systems).
    - **Tier 4 (Advanced Embodiments & Specializations)**: Level 13 (ROS 2), Level 14 (Manipulation), Level 15 (Aerial), Level 16 (Legged), Level 17 (Learning/RL), Level 18 (Multi-Agent Swarms), Level 19 (Lie Groups), Level 20 (Research Topics).
  - Interactive dual-view dashboard in `/learn` (21-Level Tiered Pathway vs. Domain Laboratories).
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
