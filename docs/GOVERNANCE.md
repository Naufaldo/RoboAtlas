# Agentic Governance & Collaboration Guidelines

This document outlines the operational rules, quality standards, and development protocols for **AI Coding Agents** and **Human Contributors** developing RoboAtlas.

---

## 🤖 15 Core Agentic Rules

### Rule 1: Inspect Before Modifying
Before modifying or creating files:
1. Inspect the existing repository directory structure.
2. Review `package.json`, configuration files, and related dependencies.
3. Understand existing architectural conventions and component patterns.
4. **Never blindly overwrite existing working code.**

### Rule 2: Work Incrementally
- Never implement an entire multi-algorithm system in a single massive unverified change.
- Break work into distinct milestones and small, testable increments.

### Rule 3: One Feature at a Time
Every feature or algorithm pull request / commit must contain:
1. Pure algorithm implementation (`lib/` or `algorithms/`).
2. Mathematical model documentation with KaTeX equations (`app/learn/` or `content/`).
3. Unit tests verifying mathematical and edge-case correctness (`tests/`).
4. Interactive simulation canvas with step execution (`components/simulation/`).

### Rule 4: Preserve Working Features
Do not refactor unrelated modules or change public interfaces while implementing a new feature.

### Rule 5: Prefer Simple, Maintainable Architecture
- Avoid introducing heavy third-party dependencies unless strictly necessary.
- Ask: *Can this be implemented reliably with our standard TypeScript and Canvas stack?*

### Rule 6: Zero Backend Creep in Phase 1
- Do not introduce server APIs, Express, databases, Redis, or external backend services.
- RoboAtlas Phase 1 is strictly an in-browser static export platform deployed to GitHub Pages.

### Rule 7: Pure Algorithms Must Remain Framework-Independent
- Algorithm logic must not import React, JSX, or Canvas drawing contexts.
- Algorithms accept parameters and return serializable state objects (e.g. `{ path, exploredNodes, cost, success }`).

### Rule 8: Explainability is a First-Class Feature
Do not optimize away intermediate algorithmic states (such as open/closed sets, particle distributions, or candidate branches) if they are needed for educational visualization.

### Rule 9: Test Mathematical Correctness
Visual plausibility is not enough. All algorithms and mathematical functions must be verified with automated unit tests for:
- Standard scenarios
- Boundary conditions (e.g. angle wrapping at $\pi$, zero vectors, collinear points)
- Blocked / unreachable goal conditions
- Deterministic seed reproducibility

### Rule 10: Original Content & Strict Attribution
- All educational explanations and TypeScript implementations must be written from first principles.
- Maintain [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md) and cite classical academic papers whenever referencing an algorithm.

### Rule 11: Continuous Semantic Versioning & CHANGELOG Maintenance
- Every release, milestone completion, or major feature addition MUST update `package.json` version and document changes in [`CHANGELOG.md`](../CHANGELOG.md) using the Keep a Changelog standard.
- Avoid unversioned commits for public releases.

### Rule 12: Bilingual Parity Requirement (English & Indonesian)
- All user-facing UI, documentation, educational explanations, mathematical breakdowns, and simulator tooltips MUST support both **Bahasa Indonesia (`id`)** and **English (`en`)**.
- Maintain dictionary synchronization in [`lib/i18n/translations.ts`](../lib/i18n/translations.ts).

### Rule 13: Canonical MDX Content Architecture & Frontmatter Parity
- Follow [`docs/RoboAtlas_MDX_Content_Architecture.md`](RoboAtlas_MDX_Content_Architecture.md).
- Lessons written in MDX must reside in `content/en/` and `content/id/` with matching stable `id` fields.
- Frontmatter must include `title`, `slug`, `category`, `difficulty`, `language`, `interactive`, `estimatedMinutes`, `prerequisites`, `references`, and `components`.

### Rule 14: Learner-First Cognitive Load & Math-to-Code Bridges
- Follow [`docs/RoboAtlas_UI_UX_Learner_First_Spec.md`](RoboAtlas_UI_UX_Learner_First_Spec.md) and [`docs/RoboAtlas_Mathematical_Explanation_Rules.md`](RoboAtlas_Mathematical_Explanation_Rules.md).
- Include `LessonOrientation` ("Where am I? What am I learning? Why does it matter?"), `MathCodeBridge` (Section 38), `AcademicReferences` (Section 39), and `LessonNavigation` on all core learning modules.
- Ensure every equation explains its intuitive meaning, physical reasoning ("Why?"), variable units, derivations, and numerical examples.

### Rule 15: Content Quality Over Content Volume
- Never generate large amounts of shallow, low-quality material merely to fill folders.
- Prioritize deeply explained, rigorously verified, interactive lessons over surface-level content volume.

### Rule 16: Master Curriculum Alignment
- All educational modules, algorithm matrices, MDX lessons, and simulators must align with the **10-Level Master Robotics Curriculum** defined in [`docs/RoboAtlas_Master_Curriculum.md`](RoboAtlas_Master_Curriculum.md).
- Ensure explicit level mappings (Level 0 through Level 9), prerequisite tracking, and smooth cognitive progression across all learning domains.

---

## 🔄 8-Step Agent Workflow Loop

Every agentic programming task must execute the following cycle:

```
[1] Understand Requirement
       ↓
[2] Inspect Related Files & Architecture
       ↓
[3] Formulate Incremental Implementation Plan
       ↓
[4] Implement Smallest Correct Change
       ↓
[5] Run Verification: Typecheck + Lint + Test + Build
       ↓
[6] Diagnose & Fix Any Failures
       ↓
[7] Audit: Mobile Layout + A11y + GitHub Pages Compatibility
       ↓
[8] Report Results & Update Documentation
```

---

## ✅ Definition of Done (DoD)

A milestone or feature is complete only when:
- [ ] **TypeScript Safety**: `npm run typecheck` passes with zero type errors (`strict: true`).
- [ ] **Linter**: `npm run lint` passes with zero warnings or errors.
- [ ] **Unit Tests**: `npm test` passes all test suites.
- [ ] **Static Build**: `npm run build` generates the `out/` static directory with no errors.
- [ ] **GitHub Pages Path**: Relative paths and asset URLs function under both root `/` and subpath `/RoboAtlas/`.
- [ ] **Algorithm Separation**: Algorithm logic is separated from UI/Canvas rendering.
- [ ] **Educational Documentation**: The topic page explains problem motivation, mathematical equations (KaTeX), and complexity.
- [ ] **Academic Citations**: Classical paper citations are included.
- [ ] **Bilingual Parity**: English and Indonesian representations are in sync.
- [ ] **Changelog & Versioning**: Version is bumped and recorded in `CHANGELOG.md`.
