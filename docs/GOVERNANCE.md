# RoboAtlas Governance & Agentic Collaboration Protocols

> **Version:** 2.0  
> **Status:** Active & Mandatory  
> **Canonical Reference:** [`docs/SPECIFICATION.md`](SPECIFICATION.md)

---

## 1. The 16 Core Agentic Rules

### Rule 1: TypeScript-First & Zero Runtime Overhead
- All algorithm implementations, kinematics equations, filters, and planning solvers must be written in strict, pure TypeScript (`strict: true`, `noImplicitAny: true`).
- Algorithm modules must remain framework-agnostic and free from React hooks/DOM dependencies.

### Rule 2: Client-Side Static Export Compatibility
- The application must compile to a static production bundle (`output: 'export'`) without server-side Node.js dependencies at runtime.
- Use relative or `basePath`-aware URLs for asset resolution to guarantee seamless GitHub Pages compatibility.

### Rule 3: 7-Step Mathematical Explanation Standard
- Never introduce a robotics formula in isolation without completing the 7-step pedagogical standard:
  $$\text{Formula} \to \text{Variables \& Units} \to \text{Intuition} \to \text{Derivation} \to \text{Physical Meaning} \to \text{Robot Application} \to \text{Limitations}$$
- Always utilize `FormulaExplainer` with variable tables and interactive live parameter calculators.

### Rule 4: Fundamentals First
- When analyzing a robotics problem or reference source, always identify and teach the general robotics principles (e.g. rotation geometry, kinematics, state estimation) before presenting robot-specific implementations.

### Rule 5: One Concept, Multiple Applications
- Never duplicate fundamental lessons for each individual robot platform.
- Author one robust, canonical lesson for the foundational theory, then illustrate its application across Robotic Arms, Mobile AMRs, UAV Drones, Marine ROVs, and Legged Quadrupeds.

### Rule 6: No Forced Multi-Agent Content
- Multi-Agent Robotics and Swarm Intelligence are advanced specializations (Level 18), not the default destination of every lesson.
- Do not inject swarm or consensus concepts into unrelated foundational lessons.

### Rule 7: Academic Literature & Source Hierarchy
- Respect the three-tier literature hierarchy:
  - **Tier 1 (Authoritative Primary Sources)**: Textbooks (*Elements of Robotics*, *Foundations of Robotics*, *Planning Algorithms*), peer-reviewed papers, and university lectures.
  - **Tier 2 (Open Engineering Standards)**: Established open-source algorithms (e.g. *PythonRobotics* by Atsushi Sakai, ROS 2 Nav2/MoveIt standards).
  - **Tier 3 (Supplementary)**: Technical blogs and tutorials (never the sole authority for mathematical proofs).

### Rule 8: PythonRobotics as Reference, Not Curriculum Dictator
- Use *PythonRobotics* as an algorithmic and visualization reference.
- Do not mechanically translate Python code into TypeScript. Understand the algorithm, re-derive the mathematical steps independently, and engineer a pure TypeScript implementation.

### Rule 9: Full Bilingual Parity (EN & ID)
- Every new MDX lesson, translation key, and user-facing interface element must maintain 100% parity across English (`en`) and Indonesian (`id`).
- Validate parity through automated tests (`tests/mdx/content.test.ts`).

### Rule 10: Dual-Theme Consistency (Dark & Light Mode)
- All UI panels, typography, KaTeX blocks, and Canvas simulation graphics must adapt automatically to the selected theme (`dark` and `light`).

### Rule 11: 60 FPS Deterministic Simulation Engine
- Canvas simulators must render at 60 FPS using `requestAnimationFrame`.
- Simulations must support play/pause, step-forward, parameter adjustments, and seedable/reproducible behavior.

### Rule 12: Mobile-Adaptive & Touch-First Design
- Every interactive simulation canvas must implement touch handlers (`onTouchStart`, `onTouchMove`).
- Wrap KaTeX mathematical matrices and equations in responsive horizontal touch-scroll containers (`overflow-x-auto`).

### Rule 13: Learner-First UI/UX Integration
- Every lesson must feature:
  - `LessonOrientation`: "Where am I? What am I learning? Why does it matter?"
  - `MathCodeBridge`: Direct 1-to-1 visual mapping between mathematical formulas and TypeScript code.
  - `ConceptCheck`: Interactive checkpoint quizzes with instant pedagogical feedback.
  - `AcademicReferences`: Literature citation cards with DOIs and chapter references.

### Rule 14: Canonical Gray-Matter MDX Layer
- All educational content must reside in `content/en/{domain}/{slug}.mdx` and `content/id/{domain}/{slug}.mdx` with strict YAML frontmatter validation.

### Rule 15: Rigorous Verification Before Delivery
- Before completing any feature or lesson, verify the build pipeline:
  ```bash
  npm test && npm run typecheck && npm run build
  ```

### Rule 16: Master Curriculum Alignment
- All educational modules, algorithm matrices, MDX lessons, and simulators must align with the **21-Level Master Robotics Curriculum** defined in [`docs/SPECIFICATION.md`](SPECIFICATION.md).

---

## 2. The 8-Step Agentic Execution Workflow

```text
Step 1: Read & Understand Source / Requirement
                 ↓
Step 2: Map to Universal Robotics Hierarchy (Level, Domain, Robot Platform)
                 ↓
Step 3: Check Existing Lessons & Prevent Duplications
                 ↓
Step 4: Author / Update Canonical Bilingual MDX (EN + ID)
                 ↓
Step 5: Implement Pure TypeScript Algorithms & Unit Tests
                 ↓
Step 6: Integrate Interactive Canvas Visualizer / FormulaExplainer
                 ↓
Step 7: Verify (npm test && npm run typecheck && npm run build)
                 ↓
Step 8: Update Documentation, CHANGELOG.md, and Commit Cleanly
```
