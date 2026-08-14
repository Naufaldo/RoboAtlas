# RoboAtlas — UI/UX & Learner-First Design Specification

## 1. Purpose

This document defines the UI/UX direction for **RoboAtlas**, an interactive robotics learning platform.

The primary goal is not to create a visually impressive website alone.

The goal is to create an interface that makes robotics:

- easier to understand
- easier to explore
- easier to experiment with
- less intimidating for beginners
- comfortable for long study sessions
- useful for intermediate and advanced learners
- visually distinctive without becoming distracting

Core product principle:

> **The interface should reduce cognitive load, not increase it.**

RoboAtlas should feel like a combination of:

```text
Interactive Textbook
        +
Robotics Laboratory
        +
Visual Notebook
        +
Algorithm Playground
```

---

# 2. Primary UX Objective

A beginner should be able to open a lesson and understand:

1. Where am I?
2. What am I learning?
3. Why does it matter?
4. What should I look at first?
5. What can I interact with?
6. What should I do next?

The learner should never feel lost inside the interface.

Avoid forcing beginners to understand the entire navigation system before they can learn the first concept.

---

# 3. Target Users

## Primary

### Beginner

Characteristics:

- unfamiliar with robotics terminology
- may know basic programming
- may struggle with mathematics
- needs visual explanations
- benefits from guided progression

UI needs:

- clear hierarchy
- simple language
- visible explanations
- guided interactions
- minimal initial controls
- "why" explanations

### Intermediate

Characteristics:

- understands basic robotics
- wants algorithm details
- wants mathematics
- wants implementation
- wants experiments

UI needs:

- richer controls
- formulas
- algorithm states
- code
- parameter tuning
- comparisons

### Advanced

Characteristics:

- wants mathematical rigor
- wants implementation details
- wants assumptions
- wants references
- wants deeper experiments

UI needs:

- advanced sections
- derivations
- technical metadata
- citations
- detailed simulation controls

The interface must support all three without making the beginner interface intimidating.

---

# 4. Design Personality

RoboAtlas should feel:

- technical
- modern
- educational
- calm
- intelligent
- approachable
- precise
- slightly futuristic
- engineering-oriented

Avoid:

- generic SaaS-dashboard appearance
- excessive glassmorphism
- excessive gradients
- neon overload
- gaming UI
- childish educational aesthetics
- too many floating cards
- excessive animation
- visually dense documentation pages

The UI should communicate:

> "This is a serious robotics learning laboratory that is welcoming to beginners."

---

# 5. Visual Identity

Primary visual metaphor:

**Atlas + Robot + Coordinate System**

Supporting visual language:

- grid lines
- coordinate axes
- nodes
- vectors
- trajectory lines
- path markers
- geometric shapes
- subtle technical diagrams
- compass/atlas motifs

Do not use decorative robotics imagery everywhere.

Graphics should support the learning metaphor.

---

# 6. Color Strategy

Use a restrained technical palette.

Recommended structure:

```text
Primary:
Deep navy / dark technical blue

Secondary:
Blue / cyan family

Accent:
One bright educational accent

Surface:
Neutral light backgrounds

Text:
High-contrast dark neutral

Simulation:
Clear semantic colors
```

Semantic simulation colors should be consistent:

```text
Start
Goal
Robot
Obstacle
Explored
Current
Path
Sensor
Uncertainty
Warning
Success
```

Do not rely on color alone.

Example:

```text
Goal = color + star/icon
Obstacle = color + pattern/solid shape
Current node = color + outline
Selected node = color + border
```

---

# 7. Typography

Prioritize readability over stylistic typography.

Recommended hierarchy:

```text
Display
        ↓
Page Title
        ↓
Section Heading
        ↓
Subheading
        ↓
Body
        ↓
Caption
        ↓
Code / Formula
```

Use a highly readable sans-serif for UI and educational text.

Use a monospace font for code.

Mathematical notation should have enough size and spacing to be readable on mobile.

Avoid overly condensed fonts.

---

# 8. Spacing

Use a consistent spacing scale.

Example:

```text
4px
8px
12px
16px
24px
32px
48px
64px
```

Do not use arbitrary margins throughout the codebase.

Educational content should have generous vertical spacing.

Beginners need visual separation between:

```text
Explanation
Formula
Example
Simulation
Conclusion
```

---

# 9. Layout Philosophy

Desktop should use a clear learning workspace.

Suggested:

```text
┌────────────────────────────────────────────────────────┐
│ RoboAtlas | Learn | Algorithms | Experiments | Search │
├────────────────────────────────────────────────────────┤
│                                                        │
│ Breadcrumb                                             │
│                                                        │
│ A* Path Planning                                       │
│ Short educational introduction                         │
│                                                        │
├───────────────────────┬────────────────────────────────┤
│                       │                                │
│ CONTENT               │ INTERACTIVE LAB               │
│                       │                                │
│ Explanation           │     Simulation                │
│ Formula               │                                │
│ Example               │     Controls                  │
│                       │                                │
│                       │     Algorithm State            │
│                       │                                │
├───────────────────────┴────────────────────────────────┤
│ References / Related Concepts                          │
└────────────────────────────────────────────────────────┘
```

Do not force every lesson into exactly this shape.

The layout should adapt to the content.

---

# 10. Desktop Reading Mode

For long educational text, provide a focused reading column.

Recommended maximum text width:

```text
~65–80 characters per line
```

The simulator can extend wider than the reading text.

Do not stretch paragraphs across the entire viewport.

---

# 11. Mobile-First Requirement

RoboAtlas must be designed from mobile upward.

Do not treat mobile as:

> "desktop but smaller."

Mobile should be a deliberate learning experience.

Recommended mobile sequence:

```text
Breadcrumb
↓
Lesson title
↓
Learning objective
↓
Concept
↓
Formula
↓
Example
↓
Simulation
↓
Simulation controls
↓
Algorithm state
↓
Code
↓
References
```

Keep the learner's main action visible.

---

# 12. Mobile Navigation

Use a simple navigation model.

Recommended:

```text
☰
RoboAtlas
Search
```

Primary navigation can open as a drawer.

Do not place six or seven navigation links in a narrow mobile header.

---

# 13. Desktop Navigation

Desktop header:

```text
[Logo]

Learn
Algorithms
Experiments
References

[Search]
[Theme]
```

Keep the header compact.

Avoid oversized navigation bars.

---

# 14. Learning Sidebar

For lesson pages, use a contextual sidebar when screen width permits.

Example:

```text
A* Path Planning

Overview
Why A*?
Graph Basics
Cost Function
Heuristic
Algorithm
Simulation
Pseudocode
TypeScript
Experiment
Comparison
References
```

The current section should be visually highlighted.

On mobile, convert this into:

- collapsible lesson outline
- floating/table-of-contents button
- or compact dropdown

Do not permanently consume mobile screen space with a sidebar.

---

# 15. Breadcrumbs

Every lesson should have context.

Example:

```text
Learn / Path Planning / A* Path Planning
```

This helps beginners understand where the topic belongs.

---

# 16. Lesson Header

Every lesson should begin with a calm and clear header.

Example:

```text
Path Planning

A* Path Planning

Find a path from start to goal while balancing
the cost already traveled with the estimated remaining cost.

[Begin Interactive Example]
```

Include:

- category
- title
- short description
- difficulty
- estimated learning time when useful
- interactive badge when applicable

Do not overload the header.

---

# 17. Beginner-Friendly Learning Objectives

At the beginning of important lessons, show:

### What you will learn

```text
By the end of this lesson you will be able to:

✓ Explain what A* solves
✓ Understand g(n), h(n), and f(n)
✓ Run A* step-by-step
✓ Compare A* with Dijkstra
✓ Read a TypeScript implementation
```

This improves learner orientation.

---

# 18. Difficulty Indicators

Use simple labels:

```text
Beginner
Intermediate
Advanced
```

Do not use complicated skill meters.

Avoid making difficulty look like a game score.

---

# 19. Learning Progress

Future-ready but initially optional.

Potential:

```text
○ Concept
○ Mathematics
● Interactive
○ Implementation
```

Use progress to show where the learner is in the lesson.

Do not require accounts for basic progress indication.

---

# 20. Hero Section

Homepage hero should communicate the unique value immediately.

Recommended:

> **Learn Robotics by Seeing It Work.**

Subheading:

> Interactive explanations, mathematics, algorithms, and simulations for robotics.

Primary CTA:

> Start Learning

Secondary CTA:

> Explore Algorithms

Include a subtle interactive robotics visualization rather than a generic stock image.

---

# 21. Homepage Structure

Suggested:

```text
Hero
↓
Featured Interactive Demo
↓
Learn by Topic
↓
Mathematics for Robotics
↓
Popular Algorithms
↓
How RoboAtlas Works
↓
Reference Books
↓
Explore RoboAtlas
```

Do not make the homepage a giant feature grid.

The homepage should lead learners into learning.

---

# 22. Topic Cards

Cards should communicate actual learning value.

Example:

```text
┌───────────────────────────┐
│ PATH PLANNING             │
│                           │
│ Learn how robots find     │
│ routes through spaces.    │
│                           │
│ A* · Dijkstra · RRT       │
│                           │
│ Explore →                 │
└───────────────────────────┘
```

Avoid generic marketing copy.

---

# 23. Learning Path

Provide a visual learning path for beginners.

Example:

```text
01
What is Robotics?
   ↓
02
Coordinate Systems
   ↓
03
Robot Motion
   ↓
04
Sensors
   ↓
05
Localization
   ↓
06
Planning
   ↓
07
Control
```

Each step should show prerequisites.

---

# 24. "Start Here" Experience

A beginner-friendly entry point should exist.

Recommended:

```text
New to Robotics?

Start here.

[1] What is a Robot?
[2] How does a Robot Move?
[3] How does a Robot Know Where It Is?
[4] How does a Robot Choose a Path?
[5] How does a Robot Control Its Motion?
```

This removes the fear of choosing the wrong topic.

---

# 25. Explanations

Text should be broken into digestible sections.

Avoid giant paragraphs.

Use:

- short paragraphs
- headings
- callouts
- diagrams
- examples
- formulas
- interactive blocks

Do not turn every sentence into a card.

---

# 26. "Why?" Callouts

Important concepts should have explicit "Why?" blocks.

Example:

```text
┌───────────────────────────────┐
│ WHY?                          │
│                               │
│ A* adds g(n) and h(n) because │
│ it needs an estimate of total │
│ cost, not only the cost already│
│ traveled.                     │
└───────────────────────────────┘
```

Use sparingly.

---

# 27. "In Plain English" Blocks

For complex mathematics, provide a plain-language translation.

Example:

```text
In plain English:

The robot considers how expensive
the path has already been and how
expensive the remaining journey
is likely to be.
```

This is especially useful for beginners.

---

# 28. Formula Cards

Formulas should have visual hierarchy.

Example:

```text
        f(n) = g(n) + h(n)

g(n)  Cost already traveled
h(n)  Estimated remaining cost
f(n)  Estimated total cost
```

The formula itself should be visually prominent.

Variable explanations should be close to the formula.

---

# 29. Derivation UI

Derivations should be expandable.

Example:

```text
Why does this equation work?

[ Show Derivation ]

Step 1
...

Step 2
...

Step 3
...

[ Hide Derivation ]
```

This keeps beginners from being overwhelmed while preserving depth.

---

# 30. Beginner / Deep Dive Toggle

For advanced mathematics:

```text
Quick Explanation | Deep Dive
```

### Quick Explanation

Provides intuitive explanation.

### Deep Dive

Provides:

- derivation
- assumptions
- matrix details
- proofs
- advanced notes

This is one of the most important UX patterns for mixed-level learners.

---

# 31. Interactive Simulation Design

Simulator should feel like a laboratory.

Recommended:

```text
┌───────────────────────────────────────┐
│ Simulation                            │
│                                       │
│          GRID / ROBOT                 │
│                                       │
│                                       │
├───────────────────────────────────────┤
│ ▶ Play  ⏸ Pause  ⏭ Step  ↻ Reset     │
│                                       │
│ Speed: ─────●────                    │
└───────────────────────────────────────┘
```

Controls should be visually separated from the simulation.

---

# 32. Simulation First Interaction

When a learner opens an interactive simulator:

1. Show a sensible default example.
2. Let it run.
3. Explain what is happening.
4. Then invite parameter changes.

Do not show an empty canvas and ask the learner to configure everything before seeing anything.

---

# 33. Simulation Complexity Levels

Provide simple and advanced controls.

Example:

```text
Basic
[Speed]
[Start]
[Goal]
[Obstacle]

Advanced
[Heuristic]
[Diagonal movement]
[Cost function]
[Seed]
```

Hide advanced controls initially.

---

# 34. Simulation State Panel

For algorithm simulations, show understandable state.

Example:

```text
Current Node
C

Open Set
B, D, E

Closed Set
A, C

Path Cost
12

Estimated Cost
18
```

Do not expose raw internal data that has no educational value.

---

# 35. Graph UI

Use a dedicated graph canvas with:

- large clickable nodes
- clear edges
- weight labels
- visible selection states
- start/goal markers
- animated traversal
- step indicators

Nodes should be large enough for touch interaction.

---

# 36. Touch Targets

For mobile:

- buttons should be comfortably tappable
- controls should have sufficient spacing
- graph nodes should have enlarged hit areas
- sliders should be usable by touch

Never require precise mouse movements for essential interactions.

---

# 37. Code UI

Code should not dominate the learning page.

Recommended:

```text
TypeScript Implementation

[Copy]
[Open in Playground]
[Show Full Code]

const result = aStar(...);
```

Highlight important lines.

Allow beginners to collapse advanced implementation details.

---

# 38. Code + Explanation

Where practical, connect code to concepts.

Example:

```text
Formula:
f(n) = g(n) + h(n)

Implementation:

const f = g + h;
```

Then explain:

> This line directly implements the mathematical evaluation function.

This creates a bridge:

```text
Mathematics
    ↕
Code
```

---

# 39. References UI

References should be accessible but not distracting.

Recommended:

```text
References

[1] Elements of Robotics
    Springer · 2018
    DOI

[2] Foundations of Robotics
    Springer · 2022
    DOI

[3] Planning Algorithms
    LaValle · 2006
    Official Website
```

Use a collapsible section where appropriate.

---

# 40. Related Concepts

At the end of a lesson:

```text
You may also want to learn:

[Graph Fundamentals]
[A*]
[Dijkstra]
[Heuristics]
[RRT]
```

This creates a learning graph.

---

# 41. Learning Graph

RoboAtlas should eventually model lessons as a graph:

```text
Graph Basics
     ↓
Dijkstra
     ↓
A*
     ↓
D* Lite
```

and:

```text
Vectors
   ↓
Matrices
   ↓
Transformation
   ↓
Kinematics
   ↓
Control
```

The UI can eventually show:

> Recommended next lesson

based on prerequisites.

---

# 42. Search UX

Search should be learner-oriented.

If the user searches:

```text
Kalman
```

show:

```text
Kalman Filter
What is Kalman Filtering?
Kalman Mathematics
Kalman Simulation
Related:
Probability
Gaussian
Bayesian
Localization
```

Do not only search page titles.

Search:

- concepts
- algorithms
- equations
- references
- related topics

---

# 43. Empty States

Empty states should teach.

Bad:

> No results.

Better:

> No lesson found for "RRT++".

> Try searching for **RRT**, **path planning**, or **motion planning**.

---

# 44. Error States

Errors should never make the learner feel they did something wrong.

Bad:

> Invalid parameter.

Better:

> The robot cannot move because the wheel separation must be greater than zero.

Explain the cause and solution.

---

# 45. Loading States

Simulation startup should be fast.

If loading is necessary:

```text
Preparing simulation...
Loading algorithm...
```

Do not use long generic spinners.

---

# 46. Accessibility

Required:

- semantic HTML
- keyboard navigation
- visible focus
- accessible labels
- sufficient contrast
- reduced motion support
- readable font sizes
- accessible form controls
- screen-reader-friendly headings
- logical tab order

Do not communicate meaning by color alone.

---

# 47. Reduced Motion

Respect:

```css
prefers-reduced-motion
```

When reduced motion is enabled:

- disable continuous animations
- preserve step-by-step mode
- preserve visual state
- provide direct transitions

The learner should still understand the simulation.

---

# 48. Dark Mode

Dark mode can be supported, but it must not reduce readability.

Simulation colors must remain distinguishable in both themes.

Do not make dark mode look like a gaming dashboard.

---

# 49. Responsive Breakpoints

Use responsive behavior based on content, not only device names.

General intent:

```text
Mobile
↓
Single-column learner flow

Tablet
↓
Flexible two-region layouts

Desktop
↓
Reading + simulation workspace
```

Avoid hard-coded assumptions such as:

> "iPhone layout."

---

# 50. Scroll Behavior

Long lessons should use deliberate scrolling.

Potential features:

- sticky lesson outline on desktop
- "Back to top"
- progress marker
- active section indicator

Do not create excessive sticky elements.

---

# 51. Navigation Between Theory and Simulation

Use clear transitions.

Example:

```text
Learn the idea
      ↓
Try it
      ↓
Understand the algorithm
      ↓
See the math
      ↓
Run it again
      ↓
Read the code
```

Buttons should use meaningful labels:

- Try the simulation
- Run step-by-step
- Show derivation
- Compare algorithms
- Open implementation

Avoid vague:

- Learn more
- Explore
- Click here

---

# 52. Comparison UI

For A* vs Dijkstra:

```text
┌──────────────┬──────────────┐
│ Dijkstra     │ A*           │
├──────────────┼──────────────┤
│ no heuristic │ heuristic    │
│ explores ... │ explores ... │
│ path ...     │ path ...     │
└──────────────┴──────────────┘
```

Whenever possible, synchronize simulations so learners can compare behavior.

---

# 53. Simulation Replay

Future-ready:

```text
◀ Previous
▶ Next
⏸ Pause
↻ Restart
```

Allow learners to replay important algorithm states.

This is especially useful for:

- graph search
- localization
- Kalman filter
- control
- multi-agent formation

---

# 54. Learning-Friendly Motion

Animation should explain cause and effect.

Example:

Bad:

> Robot smoothly glides to goal.

Good:

> Robot expands nodes → evaluates costs → selects next node → moves along final path.

Every animation should have educational meaning.

---

# 55. Avoid Visual Overload

On any screen, prioritize:

1. What am I learning?
2. What should I look at?
3. What should I interact with?
4. What should I understand next?

Do not show:

- too many cards
- too many icons
- too many colors
- too many simultaneous animations
- large decorative elements

---

# 56. Progressive Disclosure

Hide complexity until needed.

Examples:

```text
Formula
[Show derivation]

Simulation
[Advanced controls]

Code
[Show full implementation]

References
[Show details]
```

This is especially important for beginners.

---

# 57. Beginner Safety Net

Every difficult lesson should provide a "back to basics" path.

Example:

```text
This concept uses:

[Vectors]
[Matrices]
[Probability]

Need a refresher?

Review these basics →
```

Never assume the learner remembers all prerequisites.

---

# 58. Learning Context Panel

A compact context panel can appear near the lesson:

```text
You are learning:

Path Planning

Before this:
✓ Graphs
✓ Dijkstra

After this:
→ D* Lite
→ RRT
```

This helps beginners understand the curriculum.

---

# 59. Educational Microcopy

Use friendly, direct language.

Prefer:

> Let's see what happens.

over:

> Execute simulation.

Prefer:

> Try changing the obstacle.

over:

> Modify obstacle configuration.

Prefer:

> Why does the robot turn?

over:

> Angular velocity derivation.

Technical language should still be used where appropriate, but explanations should remain approachable.

---

# 60. Tooltips

Use tooltips for unfamiliar UI controls, not for fundamental educational explanations.

Do not hide important learning content behind tooltips.

---

# 61. Icons

Use a consistent icon library.

Icons should reinforce:

- navigation
- simulation controls
- search
- references
- math
- code
- settings

Do not use icons purely as decoration.

Always provide accessible labels.

---

# 62. Visual Robot Language

Use a consistent robot representation across the platform.

Example:

```text
Mobile robot:
  circular body
  orientation arrow
  wheels

Goal:
  star / target

Obstacle:
  block

Sensor:
  rays / cone

Trajectory:
  line

Velocity:
  vector arrow
```

The learner should quickly recognize these elements across lessons.

---

# 63. Canvas and Simulation Rendering

For 2D robotics simulations:

- prefer Canvas or SVG
- use Canvas for large/high-frequency scenes
- use SVG when semantic/interactive vector elements are more useful
- avoid rendering hundreds of grid cells as independent React DOM nodes

Simulation rendering must be separated from layout/UI rendering.

---

# 64. Performance

The learner should feel that the website is immediate.

Rules:

- lazy-load heavy simulations
- do not load Three.js globally
- dynamically load advanced visualization modules
- minimize large assets
- avoid unnecessary re-renders
- clean up animation loops
- clean up event listeners
- keep simulations deterministic where possible

---

# 65. Educational Loading Strategy

The initial page should load its educational text quickly.

Advanced simulation code can load only when needed.

Example:

```text
Lesson loads
   ↓
Text visible
   ↓
Formula visible
   ↓
Simulation module loads
   ↓
Interactive lab becomes active
```

Do not block the entire lesson because a simulator is still loading.

---

# 66. Component Design System

Create reusable UI primitives.

Suggested:

```text
Button
Badge
Card
Callout
FormulaBlock
Derivation
CodeBlock
SimulationPanel
ControlPanel
GraphCanvas
Section
Tabs
Accordion
Tooltip
Progress
Breadcrumb
LessonOutline
ReferenceCard
RelatedTopicCard
```

Build a coherent design system instead of styling every lesson independently.

---

# 67. Design Tokens

Centralize:

- colors
- spacing
- typography
- border radius
- shadows
- animation durations
- breakpoints

Do not hard-code design values throughout components.

---

# 68. Uniqueness

RoboAtlas should be distinctive through **educational interaction**, not excessive visual decoration.

Potential signature design elements:

### Atlas Grid

Subtle background grid inspired by maps and coordinate systems.

### Robotics Coordinates

Small coordinate indicators near interactive diagrams.

### Algorithm Pulse

Subtle visual highlight when an algorithm advances.

### Learning Map

Visual map of robotics topics and prerequisites.

### Experiment Drawer

A reusable drawer for changing simulation parameters.

Use these consistently and sparingly.

---

# 69. Homepage Signature Interaction

The homepage should contain one small interactive demonstration.

Example:

```text
      Start ●

          ↘
      ┌─────────┐
      │ obstacle│
      └─────────┘
               ↘
                ● Goal
```

Let the learner choose:

```text
[A*]
[Dijkstra]
[RRT]
```

and immediately see the different behavior.

This communicates the value of RoboAtlas better than a large marketing section.

---

# 70. Lesson Signature Interaction

Each major lesson should have an early interactive moment.

Do not make the learner read ten screens of text before interacting.

Preferred:

```text
Explain briefly
   ↓
Show small demo
   ↓
Explain deeper
   ↓
Full simulator
```

---

# 71. Mobile Simulation UX

On mobile, simulation controls should be grouped.

Example:

```text
[Run] [Step] [Reset]

Speed
──────●──────

Environment
[Simple ▼]

Advanced controls
[Expand]
```

Do not show a desktop-style control panel with dozens of controls.

---

# 72. Mobile Graph UX

For graph interaction:

- allow pinch/zoom if useful
- allow drag/pan
- enlarge node hit targets
- keep labels readable
- provide a reset-view button
- provide simple node creation controls

Do not require precise tapping.

---

# 73. Tablet UX

Tablet should support:

```text
Lesson content
+
Simulation
```

with adaptive side-by-side layout where sufficient width exists.

Otherwise stack:

```text
Content
↓
Simulation
```

---

# 74. Responsive Tables

Do not allow wide tables to destroy mobile layouts.

For algorithm comparison tables:

- collapse rows
- use horizontal scroll only when necessary
- prefer cards on mobile when content is sparse

---

# 75. Responsive Formulas and Code

Long equations should:

- wrap safely
- scroll horizontally only when unavoidable
- remain readable

Code blocks should use:

- horizontal scrolling
- readable font
- copy button
- line highlighting

Do not shrink code to unreadable sizes.

---

# 76. Learner Feedback

Interactive controls should respond clearly.

Example:

If learner changes heuristic:

```text
Heuristic: Manhattan

✓ Updated simulation

Try running the algorithm again.
```

Avoid unexplained state changes.

---

# 77. Error Prevention

The UI should prevent invalid experiments when possible.

Example:

If the user tries to set:

```text
wheel separation = 0
```

disable or constrain the control rather than allowing meaningless simulation.

Explain why.

---

# 78. Educational Tooltips and Labels

Labels should include units.

Bad:

```text
Speed
```

Better:

```text
Robot speed (m/s)
```

Bad:

```text
Noise
```

Better:

```text
Sensor noise (σ)
```

This reinforces mathematical understanding.

---

# 79. UI for Mathematical Parameters

Parameter panels should connect variables to formulas.

Example:

```text
Wheel radius r
0.05 m

Wheel separation L
0.30 m

Left wheel velocity vL
1.0 m/s

Right wheel velocity vR
1.5 m/s
```

Then show:

```text
v = (vR + vL) / 2
ω = (vR - vL) / L
```

The parameter controls and formula should feel connected.

---

# 80. Agent Design Workflow

When implementing any new UI:

1. Identify learner goal.
2. Identify beginner pain point.
3. Define information hierarchy.
4. Decide what should be visible immediately.
5. Decide what should be progressively disclosed.
6. Determine desktop layout.
7. Determine mobile layout.
8. Define interaction behavior.
9. Implement reusable components.
10. Test keyboard accessibility.
11. Test mobile interaction.
12. Test performance.
13. Verify visual consistency.

Do not start by adding random components.

---

# 81. Agent Rule — Design Before Code

Before implementation, the agent should internally define:

```text
Purpose
Audience
Primary action
Information hierarchy
Desktop layout
Mobile layout
Interaction
States
Errors
Accessibility
```

Then implement.

---

# 82. Agent Rule — Avoid Generic AI UI

Do not generate a website composed of:

```text
hero
+
six cards
+
three feature cards
+
pricing-style section
```

unless the content genuinely requires it.

RoboAtlas should feel like a purpose-built learning environment.

---

# 83. Agent Rule — Reuse Patterns

If two lessons need the same interaction:

```text
Create a reusable component.
```

Do not duplicate the implementation.

Examples:

- Graph simulator
- Formula block
- Derivation
- Simulation control panel
- Robot renderer
- Coordinate frame
- Algorithm state panel

---

# 84. Agent Rule — Educational Priority

When visual beauty conflicts with educational clarity:

> **Choose educational clarity.**

When animation conflicts with performance:

> **Choose performance.**

When complexity conflicts with beginner understanding:

> **Choose progressive disclosure.**

---

# 85. Definition of Done — UI

A major RoboAtlas page is complete when:

- [ ] Purpose is obvious within seconds.
- [ ] Lesson title and context are clear.
- [ ] Learning objectives are visible.
- [ ] Main explanation is readable.
- [ ] Formula hierarchy is clear.
- [ ] Important "why" explanations are visible.
- [ ] Interactive simulation has sensible defaults.
- [ ] Controls are understandable.
- [ ] Advanced controls are progressively disclosed.
- [ ] Mobile layout is intentionally designed.
- [ ] Desktop layout is comfortable.
- [ ] Touch targets are usable.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Reduced-motion mode works.
- [ ] No unnecessary animation exists.
- [ ] No major layout shift occurs during loading.
- [ ] UI follows the design system.
- [ ] Accessibility considerations are met.
- [ ] Performance is acceptable.

---

# 86. Final UX Principle

RoboAtlas should make the learner feel:

> "I understand what I am looking at."

Then:

> "I understand why it works."

Then:

> "I can try it myself."

Then:

> "I can change it and see what happens."

The ideal interface turns:

```text
Abstract concept
      ↓
Visual explanation
      ↓
Interactive experiment
      ↓
Mathematical understanding
      ↓
Implementation
```

The UI is successful when the learner spends less time figuring out the website and more time understanding robotics.



# 89. Theme System — Light and Dark Mode

RoboAtlas must support both:

```text
Light Mode
Dark Mode
```

These are core product features, not optional polish.

The design system must use semantic color tokens rather than hard-coded colors.

Example:

```text
--background
--surface
--surface-elevated
--text-primary
--text-secondary
--border
--accent
--success
--warning
--error
--simulation-robot
--simulation-obstacle
--simulation-path
--simulation-goal
--simulation-sensor
--simulation-uncertainty
```

Components must consume semantic tokens.

Do not write component-specific colors such as:

```css
color: #123456;
```

when the color represents a design-system role.

---

# 90. Theme Behavior

Recommended initial behavior:

```text
First visit
    ↓
Respect operating-system preference
    ↓
User can manually select:
    Light
    Dark
    System
```

Store the user's explicit preference locally.

If the user selects:

```text
System
```

the application follows the OS theme.

Do not flash the wrong theme during page load.

Theme initialization should happen as early as possible to avoid a visible light/dark flash.

---

# 91. Theme Switcher

Provide a simple, accessible control.

Example:

```text
☀ Light
🌙 Dark
```

or:

```text
[☀ / ◐ / 🌙]
```

The exact icon design may vary.

The control must have:

- accessible label
- keyboard support
- visible focus
- tooltip where appropriate
- clear current state

Do not rely on icon-only controls without accessible labeling.

---

# 92. Dark Mode Rules

Dark mode should not simply invert the light theme.

Use a purpose-designed dark palette.

Important:

- avoid pure black backgrounds when unnecessary
- maintain readable contrast
- avoid overly bright text
- reduce visual glare
- preserve hierarchy
- maintain clear borders
- preserve simulation readability

Dark mode should feel like:

> a professional engineering workspace

not:

> a gaming dashboard.

---

# 93. Simulation Colors Across Themes

Simulation semantics must remain consistent.

For example:

```text
Robot
Goal
Obstacle
Path
Sensor
Current Node
Explored Node
Uncertainty
Warning
```

The semantic meaning must remain the same in Light and Dark mode.

Do not depend solely on hue.

Use combinations of:

```text
color
+
shape
+
border
+
icon
+
pattern
```

Example:

```text
Goal
★ + accent color

Obstacle
solid shape + border

Current Node
filled circle + outline

Final Path
line + increased width
```

This also improves accessibility.

---

# 94. Canvas Theme Integration

Canvas/SVG simulations must react to the active theme.

Do not hard-code one theme's colors inside simulation rendering code.

Preferred architecture:

```text
Theme Tokens
     ↓
Simulation Theme Adapter
     ↓
Canvas / SVG Renderer
```

Example:

```ts
interface SimulationTheme {
  robot: string;
  obstacle: string;
  path: string;
  goal: string;
  explored: string;
  current: string;
  sensor: string;
  uncertainty: string;
}
```

This keeps simulations visually consistent with the rest of RoboAtlas.

---

# 95. Theme Testing

Every major UI component must be tested in:

```text
Light
Dark
```

Every major simulator must be tested in both themes.

Check:

- text contrast
- graph edges
- node visibility
- robot visibility
- path visibility
- formulas
- code blocks
- buttons
- sliders
- focus states
- tooltips
- alerts
- loading states

---

# 96. Language Support — Indonesian and English

RoboAtlas must support:

```text
Bahasa Indonesia
English
```

Both are first-class languages.

Do not build Indonesian first and later attempt to "translate the website."

The application architecture must support both from the beginning.

---

# 97. Language Strategy

Recommended locale identifiers:

```text
id
en
```

Suggested routing:

```text
/id/...
/en/...
```

or another consistent routing strategy selected by the framework.

The important requirement is:

> The URL and application state must clearly identify the active language.

---

# 98. Language Switcher

Provide an obvious language switcher.

Example:

```text
ID | EN
```

or:

```text
Bahasa Indonesia
English
```

The active language should be visually indicated.

The switcher must:

- preserve the current lesson
- preserve relevant route/context
- not unexpectedly send the learner to the homepage
- be keyboard accessible
- have accessible labels

Example:

```text
/id/algorithms/a-star
        ↓
/en/algorithms/a-star
```

The learner should remain on the same conceptual page.

---

# 99. Translation Architecture

Never hard-code user-facing text directly inside components.

Bad:

```tsx
<button>Mulai Simulasi</button>
```

Preferred:

```tsx
<button>{t("simulation.start")}</button>
```

Translation files should be structured.

Example:

```text
locales/
├── id/
│   ├── common.json
│   ├── navigation.json
│   ├── lessons.json
│   └── simulation.json
│
└── en/
    ├── common.json
    ├── navigation.json
    ├── lessons.json
    └── simulation.json
```

The exact i18n library can be selected by the agent, but the architecture must remain framework-appropriate and static-hosting compatible.

---

# 100. Translation Keys

Use semantic translation keys.

Example:

```json
{
  "simulation": {
    "start": "Mulai",
    "pause": "Jeda",
    "step": "Langkah",
    "reset": "Atur Ulang"
  }
}
```

English:

```json
{
  "simulation": {
    "start": "Start",
    "pause": "Pause",
    "step": "Step",
    "reset": "Reset"
  }
}
```

Do not use the English sentence itself as the key unless the chosen i18n architecture explicitly requires it.

---

# 101. No Missing Translation Keys

Every new user-facing string must have:

```text
ID translation
+
EN translation
```

A feature is not considered complete if one language is missing.

Development mode should expose missing translation keys clearly.

Production should have a safe fallback.

---

# 102. Translation Rules for Robotics Terminology

Do not blindly translate technical terms.

Some terms should remain in English or be presented bilingually.

Examples:

```text
Robot Operating System (ROS)
Kalman Filter
Particle Filter
Path Planning
SLAM
Simultaneous Localization and Mapping
```

Preferred first introduction:

> **Path Planning (Perencanaan Jalur)**

Then use a consistent terminology convention.

For established algorithm names, preserve the original name:

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

Do not translate algorithm names.

---

# 103. Mathematics Must Remain Language-Neutral

Equations should remain identical between Indonesian and English.

Example:

\[
f(n)=g(n)+h(n)
\]

Variable names should not be translated unnecessarily.

What changes:

```text
Explanation
Variable descriptions
Examples
UI labels
```

What normally remains:

```text
Formula
Algorithm name
Code
API name
Mathematical notation
```

---

# 104. Code Must Not Be Translated

TypeScript code must remain identical across languages unless the code example itself is specifically teaching a localized concept.

Do not translate:

```ts
const currentNode = openSet.pop();
```

into an Indonesian or English-specific variable naming variant.

This allows learners to compare language versions and code references consistently.

---

# 105. References Must Be Consistent

Bibliographic information should remain academically accurate.

Do not translate:

- book titles
- paper titles
- author names
- journal names
- publisher names

unless the official publication itself has an official translated title.

The surrounding explanation may be localized.

---

# 106. Translation and Layout

Indonesian and English text can have different lengths.

The UI must not assume identical text width.

For example:

```text
"Show Derivation"
```

versus:

```text
"Tampilkan Turunan Rumus"
```

may require different button widths.

Therefore:

- buttons should adapt
- cards should accommodate text expansion
- navigation should tolerate longer labels
- headings should wrap naturally
- avoid fixed-width text containers
- do not position UI based on text width

---

# 107. Translation and Mobile

Mobile layouts must be tested in both:

```text
Bahasa Indonesia
English
```

because text expansion can cause:

- button wrapping
- header overflow
- navigation overflow
- card height changes
- simulator control wrapping

Never test mobile only in one language.

---

# 108. Locale-Aware Formatting

Where relevant, use locale-aware formatting for:

- numbers
- dates
- units
- decimal separators

However, mathematical notation and technical units must remain technically correct.

For numerical simulations, prefer predictable formatting and explicitly state units.

Example:

```text
Robot speed
2.50 m/s
```

Do not let locale formatting create ambiguity in equations or code.

---

# 109. Language Persistence

When a learner switches language:

```text
Current lesson
      ↓
Switch ID ↔ EN
      ↓
Same lesson
      ↓
Same section
      ↓
Same simulation state where practical
```

Do not reset the learner unnecessarily.

If preserving a complex simulator state is not practical, preserve the lesson and explain the state reset clearly.

---

# 110. SEO and Metadata for Both Languages

Each language should have appropriate:

- title
- description
- metadata
- Open Graph text
- canonical URL
- alternate language metadata where appropriate

For example:

```text
/id/algorithms/a-star
/en/algorithms/a-star
```

The agent should implement appropriate locale metadata for static deployment.

---

# 111. Accessibility and Language

Language switching must be accessible.

Use semantic attributes where appropriate, such as:

```html
<html lang="id">
```

or:

```html
<html lang="en">
```

The active page language must be accurately communicated to assistive technologies.

Mixed-language technical terms should not unnecessarily confuse screen readers.

---

# 112. Accessibility and Theme

Theme switching must not remove:

- focus visibility
- contrast
- readable text
- keyboard navigation
- semantic meaning

Test:

```text
Light + keyboard
Dark + keyboard
Light + screen reader
Dark + screen reader
```

where practical.

---

# 113. Theme + Language Combination Matrix

Major UI states should be tested in at least:

```text
ID + Light
ID + Dark
EN + Light
EN + Dark
```

For responsive testing:

```text
Mobile
Tablet
Desktop
```

This gives the core matrix:

```text
              Light       Dark
ID            ✓           ✓
EN            ✓           ✓
```

and each combination should be checked on relevant screen sizes.

---

# 114. Agent Rule — Every UI Feature Is Bilingual

When creating a new component or lesson:

1. Add Indonesian translation.
2. Add English translation.
3. Verify both layouts.
4. Verify both themes.
5. Verify mobile.
6. Verify accessibility.

Do not postpone translation.

Do not create:

> "We'll translate this later."

---

# 115. Agent Rule — No Hard-Coded UI Text

Before merging UI code, search for user-facing strings that bypass the translation system.

Examples to detect:

```tsx
<button>Start</button>
<h1>Path Planning</h1>
<p>Click here to continue.</p>
```

These should normally use translation keys.

Exceptions may include:

- mathematical notation
- code examples
- algorithm names
- proper names
- bibliographic titles
- user-generated content

---

# 116. Agent Rule — Theme Tokens Only

Do not introduce random new colors into a component.

Before adding a color, ask:

```text
Does this represent an existing semantic role?
```

If yes:

> Use the existing token.

If no:

> Add a deliberate design-system token and document its purpose.

---

# 117. Agent Rule — Simulation Must Support Both Themes

When implementing a simulator:

```text
Do not:
hard-code renderer colors

Do:
consume simulation theme tokens
```

The simulator must remain understandable in:

```text
Light Mode
Dark Mode
```

---

# 118. Agent Rule — Design Review Before Implementation

For major UI work, the agent should first establish:

```text
Learner goal
      ↓
Content hierarchy
      ↓
Interaction model
      ↓
Theme behavior
      ↓
Language behavior
      ↓
Responsive behavior
      ↓
Accessibility
      ↓
Implementation
```

Do not start with arbitrary visual styling.

---

# 119. UI Definition of Done — Updated

A major RoboAtlas page is complete when:

- [ ] Purpose is obvious within seconds.
- [ ] Lesson title and context are clear.
- [ ] Learning objectives are visible.
- [ ] Main explanation is readable.
- [ ] Formula hierarchy is clear.
- [ ] Important "why" explanations are visible.
- [ ] Interactive simulation has sensible defaults.
- [ ] Controls are understandable.
- [ ] Advanced controls are progressively disclosed.
- [ ] Mobile layout is intentionally designed.
- [ ] Desktop layout is comfortable.
- [ ] Touch targets are usable.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Reduced-motion mode works.
- [ ] No unnecessary animation exists.
- [ ] UI follows the design system.
- [ ] Light mode works.
- [ ] Dark mode works.
- [ ] Indonesian works.
- [ ] English works.
- [ ] No user-facing translation keys are missing.
- [ ] Language switching preserves context.
- [ ] Theme switching preserves context.
- [ ] Simulation works in both themes.
- [ ] Graphs remain readable in both themes.
- [ ] Formulas remain readable in both themes.
- [ ] Mobile works in both languages.
- [ ] Accessibility considerations are met.
- [ ] Performance is acceptable.

---

# 120. Final Product Principle

RoboAtlas should feel equally natural in:

```text
Bahasa Indonesia
        and
English
```

and equally comfortable in:

```text
Light Mode
        and
Dark Mode
```

The learner should never feel that one language or theme is a secondary version.

The final experience should be:

```text
Choose language
      ↓
Choose theme
      ↓
Choose learning path
      ↓
Understand concept
      ↓
See mathematics
      ↓
Interact with simulation
      ↓
Experiment
      ↓
Read implementation
      ↓
Continue learning
```

Localization and theming are part of the RoboAtlas learning experience, not merely interface settings.
