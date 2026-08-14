# RoboAtlas — MDX Content Architecture & Agentic Authoring Specification

## 1. Purpose

This document defines how the RoboAtlas agent should create, modify, expand, validate, and maintain educational content written in MDX.

The intended workflow is:

```text
Source Material
   ↓
Research / Understanding
   ↓
Original Educational Content
   ↓
MDX
   ↓
Interactive Components
   ↓
Validation
   ↓
Git Commit / PR
   ↓
GitHub Actions
   ↓
GitHub Pages
```

MDX is the canonical format for RoboAtlas educational lessons.

The agent is expected to **create and continuously develop existing MDX**, not merely generate MDX files once.

---

# 2. Source Materials

RoboAtlas lessons may be developed using:

- user-provided PDF books
- user-provided lecture notes
- user-provided papers
- academic books
- research papers
- official documentation
- PythonRobotics
- original research
- existing RoboAtlas lessons

The source material is used to understand and validate concepts.

It is not automatically treated as content that may be reproduced verbatim.

---

# 3. PDF-as-Source Workflow

When the user provides a PDF book and asks the agent to create RoboAtlas material from it, use this workflow:

```text
PDF
 ↓
Identify relevant chapters/sections
 ↓
Extract concepts
 ↓
Identify definitions
 ↓
Identify formulas
 ↓
Identify derivations
 ↓
Identify examples
 ↓
Identify figures/diagrams
 ↓
Cross-check with other authoritative references
 ↓
Create original lesson structure
 ↓
Write original explanation
 ↓
Create original examples
 ↓
Create original diagrams/simulations
 ↓
Create MDX
 ↓
Validate
```

The agent should not simply convert PDF text into Markdown.

The goal is:

> **Understand the source and teach the concept independently.**

---

# 4. Copyright and Source Transformation Rules

If a PDF is provided by the user, the agent may use it as a reference for creating original educational material.

However, RoboAtlas content must not become a substitute copy of the book.

Do not:

- copy paragraphs verbatim
- translate paragraphs line-by-line
- reproduce entire chapters
- reproduce exercises verbatim
- reproduce tables without permission
- reproduce copyrighted figures without permission
- recreate a book's structure so closely that it becomes a replacement
- copy publisher text

Prefer:

- original explanations
- original examples
- original diagrams
- original simulations
- original code
- concise factual summaries
- citations to the source

For formulas, standard mathematical expressions and algorithm definitions may be explained when necessary, while surrounding explanatory text should remain original.

When uncertain about whether an asset or passage can be reused:

> Do not reuse it. Create an original explanation or visualization instead.

---

# 5. Agentic MDX Responsibilities

The agent must be able to:

### Create

Create a new lesson from a source or topic.

### Expand

Add deeper explanations, derivations, examples, simulations, or references to an existing lesson.

### Refactor

Improve an existing lesson without unnecessarily changing its educational meaning.

### Translate

Create or update the English/Indonesian version.

### Validate

Check formulas, references, metadata, links, components, and prerequisites.

### Maintain

Update lessons when algorithms, components, or references change.

### Connect

Update related lessons and learning dependencies when a new concept is introduced.

---

# 6. Never Blindly Overwrite Existing MDX

Before modifying an existing lesson:

1. Read the existing MDX.
2. Understand its structure.
3. Identify existing components.
4. Identify references.
5. Identify prerequisites.
6. Identify current language.
7. Determine what the user wants changed.
8. Preserve valid existing content.
9. Modify only the necessary sections.
10. Run validation.

Do not regenerate an entire lesson if a targeted edit is sufficient.

---

# 7. MDX Directory Structure

Recommended structure:

```text
content/
├── id/
│   ├── fundamentals/
│   ├── mathematics/
│   ├── kinematics/
│   ├── perception/
│   ├── localization/
│   ├── mapping/
│   ├── planning/
│   ├── control/
│   ├── slam/
│   └── multi-agent/
│
└── en/
    ├── fundamentals/
    ├── mathematics/
    ├── kinematics/
    ├── perception/
    ├── localization/
    ├── mapping/
    ├── planning/
    ├── control/
    ├── slam/
    └── multi-agent/
```

Example:

```text
content/id/planning/a-star.mdx
content/en/planning/a-star.mdx
```

---

# 8. Lesson Identity

Indonesian and English versions must share the same stable lesson ID.

Example:

```yaml
id: a-star
```

Do not use translated IDs.

Correct:

```text
id: a-star
```

Incorrect:

```text
id: algoritma-a-star
id: algoritma-a-bintang
```

This allows both languages to represent the same conceptual lesson.

---

# 9. Frontmatter

Every lesson should contain frontmatter.

Example:

```yaml
---
id: a-star
title: A* Path Planning
slug: a-star
category: path-planning
difficulty: intermediate
language: id
interactive: true
estimatedMinutes: 20

prerequisites:
  - graphs
  - dijkstra

references:
  - lavalle-planning
  - elements-of-robotics

components:
  - FormulaBlock
  - GraphSimulator
  - Derivation
---
```

The exact fields may evolve, but the schema must remain consistent.

---

# 10. Content Metadata

Recommended metadata:

```text
id
title
slug
category
difficulty
language
interactive
estimatedMinutes
prerequisites
references
components
```

Optional:

```text
tags
relatedLessons
lastReviewed
version
author
```

Do not add metadata without a clear purpose.

---

# 11. Standard MDX Lesson Structure

Major lessons should generally follow:

```text
Frontmatter

# Title

Short introduction

## Learning Objectives

## What Problem Does It Solve?

## Intuition

## Mathematical Foundation

## Why Does the Formula Look Like This?

## Derivation

## Example

## Interactive Simulation

## How the Algorithm Works

## Pseudocode

## TypeScript Implementation

## Experiment

## Advantages

## Limitations

## Real Robotics Applications

## Related Concepts

## References
```

Not every lesson needs every section.

The agent should adapt the structure to the concept.

---

# 12. Educational Sequence

Prefer:

```text
Problem
 ↓
Intuition
 ↓
Physical system
 ↓
Mathematics
 ↓
Formula
 ↓
Derivation
 ↓
Algorithm
 ↓
Visualization
 ↓
Implementation
 ↓
Experiment
```

Do not start difficult lessons with code.

---

# 13. Formula Components

Use reusable MDX components.

Example:

```mdx
<FormulaBlock
  title="A* Evaluation Function"
  formula="f(n) = g(n) + h(n)"
/>
```

The component should support, where appropriate:

- formula
- title
- explanation
- variables
- units
- derivation
- notes

The exact component API is defined by the application codebase.

Do not invent incompatible component APIs if existing components already exist.

---

# 14. Derivation Components

Example:

```mdx
<Derivation title="Why does this equation work?">

### Step 1

...

### Step 2

...

### Step 3

...

</Derivation>
```

Use progressive disclosure when the derivation is long.

Beginners should be able to understand the concept without immediately reading every mathematical detail.

---

# 15. Graph Components

When graph algorithms are taught, prefer an interactive graph component.

Example:

```mdx
<GraphSimulator
  algorithm="astar"
  defaultGraph="simple"
  showCosts
  showSteps
/>
```

The actual component API must match the implementation.

The simulator should allow learners to see:

- nodes
- edges
- weights
- start
- goal
- current node
- explored nodes
- candidate nodes
- final path
- algorithm state

---

# 16. Simulation Components

Example:

```mdx
<RobotSimulator
  algorithm="differential-drive"
  interactive
/>
```

Simulation components should:

- have sensible defaults
- work on mobile
- support light/dark themes
- expose educational parameters
- provide reset
- provide step/play controls where appropriate

---

# 17. Code Components

Use a reusable code component.

Example:

```mdx
<CodeBlock language="typescript" filename="a-star.ts">

const result = aStar(grid, start, goal);

</CodeBlock>
```

The actual API must match the application.

Code should be:

- readable
- tested
- independent from UI where possible
- consistent with the actual implementation

Do not create code examples that differ fundamentally from the simulator's implementation without explaining why.

---

# 18. Connecting Mathematics and Code

Whenever practical, connect the formula to implementation.

Example:

```mdx
<FormulaBlock
  formula="f(n) = g(n) + h(n)"
/>

In the implementation:

```ts
const f = g + h;
```

The mathematical expression and code should reinforce each other.
```

The learner should be able to see:

```text
Mathematics
    ↕
Algorithm
    ↕
Code
    ↕
Simulation
```

---

# 19. Source Citation

When a lesson is substantially based on a source, cite it.

Example:

```mdx
## References

1. LaValle, S. M. (2006).
   *Planning Algorithms*.
   Cambridge University Press.

2. Ben-Ari, M., & Mondada, F. (2018).
   *Elements of Robotics*.
   Springer.
```

Prefer reference IDs when the application has a centralized reference database.

Example:

```yaml
references:
  - lavalle-planning
  - elements-of-robotics
```

---

# 20. Central Reference Database

Do not duplicate full bibliographic metadata unnecessarily across every MDX file.

Maintain:

```text
src/
└── references/
    ├── books.ts
    ├── papers.ts
    └── projects.ts
```

MDX references should point to stable IDs.

Example:

```yaml
references:
  - lavalle-planning
```

The UI can render the complete citation.

---

# 21. PDF Source Metadata

When a lesson is derived from a user-provided PDF, optionally record source information in metadata.

Example:

```yaml
sources:
  - type: book
    title: "Planning Algorithms"
    chapter: "Sampling-Based Algorithms"
    pages: "..."
```

This is internal provenance metadata and does not mean the lesson should reproduce the source.

If page numbers are uncertain, do not invent them.

---

# 22. Source-to-Lesson Mapping

For large books, maintain a research map:

```text
Book
│
├── Chapter 1
│    ├── Lesson A
│    └── Lesson B
│
├── Chapter 2
│    ├── Lesson C
│    └── Lesson D
│
└── Chapter 3
     └── Lesson E
```

The mapping is for research and curriculum planning.

Do not automatically make RoboAtlas chapter structure identical to the source book.

---

# 23. Agentic PDF Processing

When given a PDF, the agent should first determine:

```text
What is the requested topic?
What chapters are relevant?
What concepts are prerequisites?
What mathematics is needed?
What algorithms are involved?
What figures are useful?
What can be explained independently?
What additional references should be checked?
```

Then create the lesson.

Do not dump the entire PDF into the MDX.

---

# 24. Figures From PDFs

Do not automatically extract and publish book figures.

Instead:

1. Determine what concept the figure teaches.
2. Recreate the concept using an original diagram when possible.
3. Use an interactive visualization if it is more educational.
4. Only reuse the original figure if licensing clearly permits it.
5. Record attribution when required.

Preferred:

```text
Book figure
   ↓
Understand concept
   ↓
Original RoboAtlas diagram
```

---

# 25. Tables From Sources

Do not reproduce large source tables by default.

Instead:

- summarize
- create an original comparison
- cite the source
- explain the relevant concept

For small factual tables that are necessary for teaching, ensure the presentation is independently authored and appropriately sourced.

---

# 26. Examples Must Be Original

If the source book contains:

```text
Example robot:
Robot A moves from X to Y...
```

do not simply reproduce it.

Create a new example:

```text
A warehouse robot moves between storage locations...
```

This makes RoboAtlas an independent educational resource.

---

# 27. Derivations From Sources

If a source derives an equation, the agent may explain the mathematical derivation in its own words and notation where appropriate.

Preferred:

```text
Source derivation
      ↓
Understand mathematical reasoning
      ↓
Simplify where pedagogically appropriate
      ↓
Write original explanation
      ↓
Cite source
```

Do not reproduce long explanatory prose from the source.

---

# 28. Bilingual MDX

Maintain:

```text
content/id/...
content/en/...
```

Example:

```text
content/id/planning/a-star.mdx
content/en/planning/a-star.mdx
```

Both must have:

```yaml
id: a-star
```

and:

```yaml
language: id
```

or:

```yaml
language: en
```

---

# 29. Translation Workflow

When the user requests translation:

```text
Existing MDX
   ↓
Understand structure
   ↓
Translate explanation
   ↓
Preserve formulas
   ↓
Preserve code
   ↓
Preserve algorithm names
   ↓
Preserve references
   ↓
Validate terminology
```

Do not independently redesign the lesson during translation unless requested.

---

# 30. Technical Terminology

Keep established algorithm names unchanged:

```text
A*
Dijkstra
RRT
RRT*
EKF
PID
LQR
MPC
SLAM
```

For the first introduction, bilingual explanation is acceptable.

Example:

> **Path Planning (Perencanaan Jalur)**

Do not translate mathematical variable names or code.

---

# 31. Images and Assets

Prefer original RoboAtlas diagrams and generated visualizations.

Recommended:

```text
public/
└── images/
    ├── lessons/
    └── references/
```

Every third-party asset must be tracked.

Maintain:

```text
THIRD_PARTY_NOTICES.md
```

with:

```text
Asset
Source
Author
License
URL
Attribution
Modification
```

---

# 32. Interactive Content Is Code

If an MDX lesson references:

```mdx
<GraphSimulator />
```

the component must exist in the codebase.

The agent must verify:

- component exists
- props are valid
- TypeScript compiles
- simulator works
- lesson build succeeds

Do not leave placeholder components in production content.

---

# 33. MDX Validation

Every MDX modification should be checked for:

- frontmatter validity
- syntax
- component imports
- component props
- broken links
- missing references
- missing translations
- invalid lesson IDs
- invalid prerequisites
- invalid component names
- malformed LaTeX
- build errors

---

# 34. Content Validation

The agent should also check:

```text
Does the lesson explain the problem?
Does it explain why?
Are formulas understandable?
Are variables defined?
Is the derivation appropriate?
Is the example correct?
Are units correct?
Are assumptions stated?
Are limitations stated?
Are references present?
```

A syntactically valid MDX file is not necessarily an educationally valid lesson.

---

# 35. TypeScript Validation

When MDX embeds a simulator or algorithm:

```text
MDX
 ↓
Component
 ↓
Algorithm
 ↓
Tests
```

All layers should remain compatible.

Run:

```text
typecheck
lint
tests
build
```

where available.

---

# 36. Agentic Update Workflow

When the user says:

> "Tambahkan penjelasan Kalman Filter ke lesson ini."

The agent should:

1. Open the existing MDX.
2. Locate the appropriate section.
3. Check existing mathematical explanation.
4. Check existing references.
5. Check existing simulator.
6. Determine the missing content.
7. Add the explanation.
8. Add derivation if useful.
9. Update simulator if required.
10. Update references.
11. Update translation.
12. Validate.
13. Summarize the changes.

Do not recreate the whole lesson unnecessarily.

---

# 37. Agentic Expansion Workflow

When the user says:

> "Kembangkan materi A* supaya lebih cocok untuk pemula."

The agent should:

```text
Existing A*
   ↓
Identify cognitive gaps
   ↓
Add intuition
   ↓
Add graph basics
   ↓
Explain g/h/f
   ↓
Add simple example
   ↓
Improve simulation
   ↓
Add optional derivation
   ↓
Preserve advanced material
   ↓
Update ID + EN
```

The goal is improvement, not duplication.

---

# 38. Agentic Refactoring

When improving MDX:

- preserve stable lesson ID
- preserve references
- preserve valid links
- preserve simulator contracts
- preserve translation pairing
- preserve prerequisite relationships

If a breaking change is necessary, explain it before applying it.

---

# 39. Lesson Versioning

For major content changes, optionally maintain:

```yaml
version: 1
```

Increment when educational structure changes substantially.

Do not increment for every typo fix.

Git itself remains the primary history mechanism.

---

# 40. Git Workflow

RoboAtlas should treat GitHub as the source of truth.

Recommended:

```text
Agent modifies MDX
       ↓
Git diff
       ↓
Review
       ↓
Commit
       ↓
Push
       ↓
GitHub Actions
       ↓
Build
       ↓
Deploy GitHub Pages
```

Do not maintain a separate hidden content database unless explicitly introduced later.

---

# 41. Agent Should Show Content Diff

For important content changes, the agent should be able to summarize:

```text
Added:
- Derivation of differential-drive velocity

Updated:
- A* explanation
- Indonesian translation

Added:
- Graph visualization

Updated:
- References
```

This makes agentic content development auditable.

---

# 42. Preview Workflow

Before deployment, the agent should support local preview where possible:

```text
MDX
 ↓
Local development server
 ↓
Preview
 ↓
Validation
 ↓
GitHub
```

This is especially important for:

- formulas
- graphs
- simulations
- responsive layout
- bilingual content

---

# 43. Content-to-Component Boundary

MDX should describe **what the learner sees**.

TypeScript components should define **how the interaction works**.

Example:

```mdx
<GraphSimulator
  algorithm="astar"
  defaultGraph="warehouse"
/>
```

The MDX should not contain the full A* implementation.

Instead:

```text
MDX
 ↓
GraphSimulator
 ↓
A* engine
```

---

# 44. Keep Algorithms Independent

Algorithms should be framework-independent.

Example:

```text
src/
└── algorithms/
    └── planning/
        └── a-star.ts
```

The algorithm should not import React.

This allows the same algorithm to be used by:

- simulator
- tests
- future CLI
- educational examples
- benchmarks

---

# 45. Lesson Dependency Graph

Every lesson should identify prerequisites.

Example:

```yaml
prerequisites:
  - graph-basics
  - dijkstra
```

The system can use this later to generate:

```text
Recommended prerequisites
Recommended next lesson
Learning path
```

---

# 46. Source Confidence

When creating content from a PDF or multiple references, distinguish:

```text
Established fact
Mathematical derivation
Implementation choice
Pedagogical simplification
```

Do not present an implementation convention as universal robotics theory.

Example:

> RoboAtlas uses this coordinate convention for consistency.

rather than:

> This is the only correct coordinate convention.

---

# 47. Multiple Sources

When multiple books describe the same concept differently:

1. Identify the difference.
2. Determine whether it is notation, convention, or substantive disagreement.
3. Choose a consistent RoboAtlas convention.
4. State the convention.
5. Cite the relevant references.

Do not silently merge incompatible conventions.

---

# 48. Example Agent Prompt

When the user provides a PDF and says:

> "Buatkan materi tentang differential drive dari buku ini."

The agent should interpret the task as:

```text
Read relevant source
        ↓
Identify differential-drive concepts
        ↓
Extract mathematical relationships
        ↓
Understand derivation
        ↓
Cross-check robotics convention
        ↓
Create original explanation
        ↓
Create original diagram
        ↓
Create interactive simulator
        ↓
Implement/validate TypeScript
        ↓
Create Indonesian MDX
        ↓
Create English MDX
        ↓
Add references
        ↓
Run validation
```

The agent must not simply summarize the PDF paragraph-by-paragraph.

---

# 49. Example MDX

Illustrative structure:

```mdx
---
id: differential-drive
title: Differential Drive
slug: differential-drive
category: kinematics
difficulty: beginner
language: id
interactive: true
prerequisites:
  - vectors
  - coordinate-systems
references:
  - foundations-of-robotics
  - elements-of-robotics
---

# Differential Drive

## Apa itu Differential Drive?

Differential drive adalah ...

## Intuisi

Bayangkan dua roda ...

<RobotSimulator
  algorithm="differential-drive"
  defaultScenario="straight"
/>

## Model Matematis

\[
v = rac{v_R + v_L}{2}
\]

<FormulaBlock
  title="Kecepatan linear robot"
  formula="v = (v_R + v_L) / 2"
/>

## Mengapa Rumusnya Seperti Itu?

...

<Derivation title="Turunan">

...

</Derivation>

## Coba Sendiri

<RobotSimulator
  algorithm="differential-drive"
  interactive
/>

## Implementasi TypeScript

<CodeBlock language="typescript" filename="differential-drive.ts">

...

</CodeBlock>

## References

...
```

This is an architectural example. The actual component APIs must match the application.

---

# 50. Do Not Generate Fake Components

If a component does not exist, the agent must not pretend it exists.

Bad:

```mdx
<MagicRoboticsSimulator />
```

without implementation.

Instead:

1. determine whether the required component exists
2. create it if appropriate
3. test it
4. then reference it from MDX

---

# 51. Content Quality Over Content Volume

The agent should not generate large amounts of material merely to make RoboAtlas appear complete.

Prefer:

```text
10 excellent lessons
```

over:

```text
100 shallow lessons
```

Each lesson should have genuine educational value.

---

# 52. Definition of Done — MDX Lesson

A lesson is complete when:

- [ ] MDX parses.
- [ ] Frontmatter is valid.
- [ ] Stable lesson ID exists.
- [ ] Correct category exists.
- [ ] Difficulty exists.
- [ ] Prerequisites are valid.
- [ ] References exist.
- [ ] Explanation is original.
- [ ] Mathematics is explained.
- [ ] Important formulas explain "why".
- [ ] Useful derivations are included.
- [ ] Numerical examples are correct.
- [ ] Assumptions are stated.
- [ ] Limitations are stated.
- [ ] Interactive components work when appropriate.
- [ ] Graph visualization exists for graph-based topics where useful.
- [ ] TypeScript implementation is valid.
- [ ] Tests pass.
- [ ] Indonesian version exists.
- [ ] English version exists.
- [ ] Both languages use the same lesson ID.
- [ ] Light mode works.
- [ ] Dark mode works.
- [ ] Mobile layout works.
- [ ] Accessibility is considered.
- [ ] No unauthorized third-party assets are used.
- [ ] Source references are recorded.
- [ ] Build passes.

---

# 53. Final Agent Principle

The agent is not a:

> PDF-to-Markdown converter.

It is a:

> **Robotics educational content engineer.**

Given a source:

```text
PDF / Book / Paper
```

the agent should:

```text
Understand
   ↓
Analyze
   ↓
Structure
   ↓
Explain
   ↓
Visualize
   ↓
Implement
   ↓
Validate
   ↓
Publish
```

The resulting MDX must be an original RoboAtlas educational experience that uses the source as scholarly grounding while preserving technical correctness and appropriate attribution.

---

# 54. Long-Term Goal

The MDX architecture should allow RoboAtlas to grow into:

```text
                   RoboAtlas
                      |
              ┌───────┴───────┐
              |               |
           Content          Code
              |               |
             MDX          TypeScript
              |               |
              └───────┬───────┘
                      |
                 Components
                      |
          ┌───────────┼───────────┐
          |           |           |
        Formula      Graph      Robot
       Simulator   Simulator   Simulator
          |           |           |
          └───────────┼───────────┘
                      |
                 Interactive
                  Learning
                      |
                   GitHub
                      |
                GitHub Pages
```

Git remains the source of truth.

MDX remains the source of educational content.

TypeScript remains the source of algorithm and simulation logic.

The agent continuously develops all three while maintaining their separation of responsibilities.
