# Robotics Interactive Web --- Agentic Development Specification

## 1. Project Overview

Build a web-based interactive robotics learning platform inspired by the
educational structure and algorithm coverage of
**AtsushiSakai/PythonRobotics**, but implemented as an original
TypeScript-based web application.

The goal is not to translate or copy PythonRobotics. The goal is to
create an independent educational platform where robotics concepts,
mathematics, algorithms, pseudocode, and simulations are explained
visually and interactively.

Primary deployment target for the first phase:

-   GitHub Pages
-   Static frontend only
-   No backend
-   No database
-   No authentication
-   No server-side runtime
-   All simulations run in the browser

The architecture must allow migration later to a full hosting platform
without requiring a major rewrite.

Reference project: https://github.com/AtsushiSakai/PythonRobotics

Reference textbook:
https://atsushisakai.github.io/PythonRobotics/index.html

------------------------------------------------------------------------

# 2. Product Vision

The website should feel like an **interactive robotics textbook +
algorithm laboratory**.

A learner should be able to:

1.  Learn the intuition behind a robotics concept.
2.  Understand the mathematics.
3.  See the algorithm visually.
4.  Manipulate parameters.
5.  Run the algorithm step-by-step.
6.  Inspect the state of the algorithm.
7.  Read pseudocode.
8.  Inspect the TypeScript implementation.
9.  Experiment with different scenarios.
10. Understand practical robotics applications.

The core learning flow is:

**Concept → Mathematics → Algorithm → Visualization → Simulation → Code
→ Experiment**

Do not build this as a conventional static documentation website only.

The interactive simulation is a first-class feature.

------------------------------------------------------------------------

# 3. Target Audience

Primary:

-   Robotics students
-   Mechatronics students
-   Automation students
-   Computer science students learning robotics
-   Engineering researchers
-   Beginners learning mobile robotics
-   Developers implementing robotics algorithms

Secondary:

-   ROS users
-   Hobby robotics developers
-   Autonomous vehicle developers
-   Researchers who need quick algorithm visualization

The explanations should start from intuition and progressively introduce
mathematics.

Avoid assuming that the learner already understands advanced robotics
mathematics.

------------------------------------------------------------------------

# 4. Core Design Principles

## 4.1 Explain before implementing

Every algorithm must first explain:

-   What problem does it solve?
-   Why is the problem difficult?
-   What is the intuition?
-   What assumptions are made?
-   What are the inputs?
-   What are the outputs?
-   What happens internally?
-   What are the limitations?

Only then show implementation details.

## 4.2 Visual-first learning

Whenever possible, use:

-   2D diagrams
-   animated robot movement
-   grid visualization
-   vectors
-   trajectories
-   coordinate frames
-   sensor rays
-   particles
-   probability distributions
-   graphs
-   control signals

## 4.3 Interactivity over decoration

Do not add animations merely for visual appearance.

Every animation should communicate an algorithmic concept.

## 4.4 Deterministic simulations

For educational simulations:

-   Prefer deterministic behavior by default.
-   Provide a seed for random algorithms.
-   Make simulation state reproducible.
-   Allow reset.
-   Allow step-by-step execution.
-   Allow pause/play.
-   Allow speed control.

## 4.5 TypeScript-first

All browser-side algorithm implementations must be written in
TypeScript.

Do not execute Python in the browser.

Do not require a Python runtime.

PythonRobotics is a reference for algorithms and educational
organization, not a runtime dependency.

------------------------------------------------------------------------

# 5. Recommended Technology Stack

Use:

-   Next.js
-   TypeScript
-   React
-   Tailwind CSS
-   MDX for educational content
-   KaTeX or MathJax for mathematics
-   HTML Canvas or SVG for 2D simulations
-   Three.js only when 3D visualization is actually required
-   Vitest for unit tests
-   ESLint
-   Prettier

Avoid unnecessary dependencies.

For the initial version, prefer:

**Canvas/SVG + React**

over introducing a large graphics engine.

Use Three.js later for:

-   3D robot arms
-   3D drones
-   point clouds
-   3D LiDAR
-   3D trajectories

------------------------------------------------------------------------

# 6. GitHub Pages Constraint

The first deployment target is GitHub Pages.

Therefore the application must be compatible with static export.

Hard requirements:

-   No server-only features.
-   No API routes.
-   No server actions.
-   No runtime database.
-   No server-side authentication.
-   No filesystem access at runtime.
-   No secret API keys in the frontend.
-   All educational data must be bundled into the static application.
-   All simulations must execute client-side.

Use a static-export-compatible Next.js architecture.

The build must produce a static output suitable for GitHub Pages.

Do not introduce features that require a persistent backend during Phase
1.

GitHub Pages should be deployed using GitHub Actions rather than
manually committing build artifacts.

Official GitHub Pages documentation:

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

------------------------------------------------------------------------

# 7. Repository Structure

Recommended structure:

``` text
robotics-interactive/
│
├── app/
│   ├── page.tsx
│   ├── learn/
│   │   ├── page.tsx
│   │   ├── fundamentals/
│   │   ├── localization/
│   │   ├── mapping/
│   │   ├── slam/
│   │   ├── planning/
│   │   ├── control/
│   │   └── multi-agent/
│   │
│   └── algorithms/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── learning/
│   ├── mathematics/
│   ├── code/
│   ├── simulation/
│   └── charts/
│
├── content/
│   ├── fundamentals/
│   ├── localization/
│   ├── mapping/
│   ├── slam/
│   ├── planning/
│   ├── control/
│   └── multi-agent/
│
├── algorithms/
│   ├── planning/
│   ├── localization/
│   ├── mapping/
│   ├── slam/
│   ├── control/
│   └── multi-agent/
│
├── simulation/
│   ├── core/
│   ├── grid/
│   ├── mobile-robot/
│   ├── lidar/
│   ├── localization/
│   └── multi-agent/
│
├── lib/
│   ├── math/
│   ├── geometry/
│   ├── random/
│   └── utils/
│
├── public/
│   ├── images/
│   └── icons/
│
├── tests/
│   ├── algorithms/
│   ├── math/
│   └── simulation/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── package.json
```

The exact structure may be adjusted if the framework requires it, but
the separation of concerns must remain.

------------------------------------------------------------------------

# 8. Architecture

Use five major layers.

``` text
Educational Content
        ↓
Algorithm Layer
        ↓
Simulation Engine
        ↓
Visualization Components
        ↓
Interactive UI
```

## 8.1 Educational Content

Contains:

-   explanations
-   equations
-   pseudocode
-   examples
-   references
-   practical applications

Content should not contain algorithm implementation logic.

## 8.2 Algorithm Layer

Pure TypeScript algorithms.

Algorithms should not directly manipulate React state or Canvas.

Example:

``` ts
const result = aStar(grid, start, goal);
```

The algorithm should return structured data.

## 8.3 Simulation Engine

Responsible for:

-   simulation state
-   time steps
-   deterministic random generators
-   robot state
-   sensor state
-   environment state
-   simulation lifecycle

## 8.4 Visualization

Responsible only for rendering state.

Examples:

-   GridRenderer
-   RobotRenderer
-   PathRenderer
-   LidarRenderer
-   ParticleRenderer
-   VectorRenderer

## 8.5 UI

Responsible for:

-   controls
-   sliders
-   buttons
-   parameter panels
-   explanations
-   statistics
-   tabs
-   navigation

------------------------------------------------------------------------

# 9. Algorithm API Design

Algorithms should have predictable interfaces.

Example:

``` ts
export interface Point2D {
  x: number;
  y: number;
}

export interface GridNode {
  x: number;
  y: number;
}

export interface PathPlanningResult {
  path: GridNode[];
  exploredNodes: GridNode[];
  cost: number;
  success: boolean;
}
```

Example:

``` ts
export interface AStarOptions {
  heuristic?: "euclidean" | "manhattan" | "octile";
  allowDiagonal?: boolean;
}
```

The algorithm must not know anything about React.

Bad:

``` ts
setRobotPosition(...)
```

Good:

``` ts
return {
  path,
  exploredNodes,
  cost,
  success,
};
```

------------------------------------------------------------------------

# 10. Interactive Simulation Requirements

Every major interactive algorithm should support:

### Controls

-   Play
-   Pause
-   Step
-   Reset
-   Speed
-   Randomize
-   Clear
-   Run

### Parameters

Depending on the algorithm:

-   Start position
-   Goal position
-   Obstacle placement
-   Grid size
-   Robot speed
-   Sensor range
-   Noise
-   Number of particles
-   Control gains
-   Heuristic
-   Time step

### Visualization

Show algorithm state, not only final output.

For example A\* should show:

-   open set
-   closed set
-   current node
-   explored nodes
-   final path
-   cost

------------------------------------------------------------------------

# 11. First Algorithm Set

Do not implement everything at once.

Phase 1 should focus on highly visual algorithms.

Recommended first algorithms:

## Path Planning

1.  Dijkstra
2.  A\*
3.  D\* Lite
4.  Potential Field
5.  RRT
6.  RRT\*

## Localization

7.  Particle Filter
8.  Extended Kalman Filter

## Control

9.  PID
10. Pure Pursuit
11. Stanley Controller

## SLAM

12. ICP

## Multi-Agent

13. Consensus
14. Leader-Follower
15. Formation Control

The Multi-Agent section should become an important differentiator of the
platform.

------------------------------------------------------------------------

# 12. Educational Page Template

Every algorithm page should follow a consistent structure.

``` text
# A* Path Planning

## 1. What problem does A* solve?

Explanation.

## 2. Intuition

Visual explanation.

## 3. Mathematical Model

Equations.

## 4. How A* works

Step-by-step explanation.

## 5. Interactive Simulation

[Simulation]

## 6. Step-by-Step Execution

[Algorithm state]

## 7. Pseudocode

[Pseudocode]

## 8. TypeScript Implementation

[Code]

## 9. Complexity

Time complexity:
...

Space complexity:
...

## 10. Advantages

...

## 11. Limitations

...

## 12. Real Robotics Application

...

## 13. Experiment

Try changing:
...

## 14. References

...
```

------------------------------------------------------------------------

# 13. Mathematics Rendering

Use KaTeX or MathJax.

Example:

``` text
f(n) = g(n) + h(n)
```

Explain every variable.

Do not present equations without context.

For example:

``` text
g(n)
```

should be explained as:

> Cost accumulated from the starting node to the current node.

Mathematics should be progressive:

1.  intuitive explanation
2.  equation
3.  variable definitions
4.  numerical example
5.  visualization

------------------------------------------------------------------------

# 14. Simulation State

Simulation state should be serializable.

Example:

``` ts
interface SimulationState {
  time: number;
  robot: RobotState;
  obstacles: Obstacle[];
  goal?: Point2D;
  path?: Point2D[];
  status: "idle" | "running" | "paused" | "completed";
}
```

This allows future features such as:

-   shareable simulations
-   saved experiments
-   URL state
-   reproducible examples

Do not implement persistence yet unless it can be done statically.

------------------------------------------------------------------------

# 15. URL-Based Experiment Sharing

Future feature.

A simulation configuration could eventually be encoded in the URL:

``` text
/learn/a-star?grid=20&heuristic=euclidean&diagonal=true
```

This allows students to share experiments without a database.

Do not implement this in the first milestone unless it is trivial.

------------------------------------------------------------------------

# 16. Mobile Responsiveness

The platform must be mobile-first.

The simulator must work on:

-   desktop
-   tablet
-   mobile

On mobile:

``` text
Explanation
↓
Simulation
↓
Controls
↓
Algorithm State
↓
Code
```

Avoid requiring horizontal scrolling for the primary learning
experience.

------------------------------------------------------------------------

# 17. Accessibility

Required:

-   keyboard navigation
-   visible focus states
-   accessible button labels
-   sufficient contrast
-   reduced-motion support
-   semantic HTML
-   readable font sizes
-   simulation descriptions where practical

Animations must respect:

``` css
prefers-reduced-motion
```

When reduced motion is enabled, provide a static or step-based
visualization.

------------------------------------------------------------------------

# 18. Performance Rules

The website must remain lightweight.

Rules:

-   Do not use Three.js for 2D simulations.
-   Do not render thousands of React components for grid cells.
-   Use Canvas for large grids.
-   Avoid unnecessary React re-renders.
-   Use requestAnimationFrame for continuous simulation.
-   Keep algorithm calculations separate from rendering.
-   Avoid memory leaks.
-   Clean up animation loops and event listeners.
-   Avoid large image assets where SVG or Canvas is sufficient.

The initial target is a fast educational website, not a graphics
benchmark.

------------------------------------------------------------------------

# 19. Code Quality Rules

Use strict TypeScript.

Required:

``` json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Rules:

-   No `any` unless absolutely unavoidable.
-   Prefer interfaces/types.
-   Pure functions for algorithms.
-   Small functions.
-   Descriptive names.
-   No duplicated mathematical logic.
-   No algorithm logic inside JSX.
-   No hard-coded magic numbers.
-   Add tests for algorithm correctness.
-   Add tests for edge cases.

------------------------------------------------------------------------

# 20. Testing

Every algorithm must have tests.

For A\*:

-   start equals goal
-   no obstacle
-   blocked path
-   unreachable goal
-   diagonal movement
-   different heuristics
-   deterministic result

For random algorithms:

-   deterministic seed
-   reproducibility
-   valid output
-   boundary conditions

Simulation tests should validate state transitions independently from
rendering.

------------------------------------------------------------------------

# 21. Content Rules

Educational content must be original.

Do not copy paragraphs from PythonRobotics.

Do not translate PythonRobotics documentation line-by-line.

Do not copy its GIFs or diagrams unless their license explicitly permits
the intended use.

Do not copy source code without checking the applicable license and
preserving required notices.

Use PythonRobotics as:

-   algorithm reference
-   inspiration
-   bibliography/reference
-   validation source

Write original explanations.

Where appropriate, cite the original research paper for an algorithm.

Examples:

-   A\*
-   Dijkstra
-   D\* Lite
-   RRT
-   EKF
-   Particle Filter
-   ICP
-   LQR
-   MPC

------------------------------------------------------------------------

# 22. Attribution and Licensing

Before using any third-party:

-   code
-   image
-   GIF
-   diagram
-   mathematical figure
-   text
-   dataset

inspect its license.

Maintain a file:

``` text
THIRD_PARTY_NOTICES.md
```

Record:

``` text
Asset:
Source:
Author:
License:
URL:
Modification:
Required attribution:
```

Do not assume that a public GitHub repository means all content can be
copied without conditions.

The website's original educational content and original TypeScript
implementations should have a clearly defined project license.

If the project is intended to become a proprietary educational product
later, discuss licensing before publishing large amounts of original
content under an open-source license.

------------------------------------------------------------------------

# 23. GitHub Pages Deployment

Use GitHub Actions.

Recommended deployment flow:

``` text
Developer
   ↓
git push
   ↓
GitHub Actions
   ↓
Install dependencies
   ↓
Lint
   ↓
Typecheck
   ↓
Test
   ↓
Build static site
   ↓
Upload Pages Artifact
   ↓
Deploy GitHub Pages
```

Do not commit the build output unless there is a specific reason.

GitHub Pages should use the official Pages deployment actions.

Required workflow permissions include:

``` yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

The deployment should use the `github-pages` environment.

See:

https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

------------------------------------------------------------------------

# 24. GitHub Pages URL Handling

The project may initially be deployed as:

``` text
https://USERNAME.github.io/REPOSITORY/
```

Therefore the application must not assume it is hosted at `/`.

The base path must be configurable.

Use an environment-aware configuration.

Do not hard-code:

``` text
/
```

for assets if doing so breaks project-site deployment.

Test:

-   local development
-   production build
-   GitHub Pages project URL

------------------------------------------------------------------------

# 25. CI/CD Requirements

Pull requests should run:

``` text
lint
typecheck
test
build
```

The main branch should deploy only if these checks pass.

Recommended workflow separation:

``` text
PR
 └── CI

main
 └── CI
      └── GitHub Pages deployment
```

Deployment should not occur when the build fails.

------------------------------------------------------------------------

# 26. Agentic Development Rules

The coding agent must follow these rules.

## Rule 1 --- Inspect before modifying

Before changing an existing file:

1.  Inspect repository structure.
2.  Inspect package.json.
3.  Inspect existing configuration.
4.  Inspect related components.
5.  Understand current architecture.

Do not blindly overwrite files.

## Rule 2 --- Work incrementally

Do not implement the entire platform in one massive change.

Use milestones.

## Rule 3 --- One feature at a time

Each feature should have:

-   implementation
-   tests
-   documentation
-   verification

## Rule 4 --- Preserve working features

Do not refactor unrelated modules while implementing a feature.

## Rule 5 --- Prefer simple architecture

Do not add libraries unless they solve a real problem.

Before adding a dependency, ask:

> Can this be implemented reliably with the existing stack?

## Rule 6 --- No backend creep

Do not introduce:

-   Express
-   Flask
-   FastAPI
-   database
-   Redis
-   server API

during Phase 1.

The first version is intentionally static.

## Rule 7 --- Algorithms must remain framework-independent

Algorithms should not depend on React or Next.js.

## Rule 8 --- Explainability is a feature

Do not optimize away intermediate states that are useful for teaching.

## Rule 9 --- Test mathematical correctness

Visual correctness is not enough.

## Rule 10 --- Do not copy external content

Create original explanations and implementations unless a license
explicitly permits reuse.

------------------------------------------------------------------------

# 27. Agent Workflow

For every task:

### Step 1

Understand the requested feature.

### Step 2

Inspect related files.

### Step 3

Write a short implementation plan.

### Step 4

Implement the smallest correct change.

### Step 5

Run:

``` bash
npm run lint
npm run typecheck
npm test
npm run build
```

Use the project's actual scripts if their names differ.

### Step 6

Fix failures.

### Step 7

Review for:

-   mobile behavior
-   accessibility
-   performance
-   TypeScript safety
-   GitHub Pages compatibility

### Step 8

Report:

-   files changed
-   what was implemented
-   tests executed
-   remaining limitations

------------------------------------------------------------------------

# 28. Development Milestones

## Milestone 0 --- Foundation

Create:

-   Next.js application
-   TypeScript
-   Tailwind
-   MDX
-   basic navigation
-   GitHub Actions
-   GitHub Pages deployment
-   responsive layout

Do not implement algorithms yet.

Success criteria:

The website deploys successfully to GitHub Pages.

------------------------------------------------------------------------

## Milestone 1 --- Robotics Fundamentals

Create:

-   What is Robotics?
-   Robot components
-   Sensors
-   Actuators
-   Coordinate systems
-   Pose
-   Degrees of freedom
-   Mobile robot types

Add simple interactive coordinate-frame visualization.

------------------------------------------------------------------------

## Milestone 2 --- First Interactive Algorithm

Implement:

**Dijkstra**

Requirements:

-   grid
-   start
-   goal
-   obstacles
-   animation
-   step
-   reset
-   explored nodes
-   final path
-   path cost

This becomes the reference architecture for later algorithms.

------------------------------------------------------------------------

## Milestone 3 --- A\*

Implement A\* using the same simulation framework.

Allow:

-   Manhattan heuristic
-   Euclidean heuristic
-   diagonal movement
-   comparison with Dijkstra

Add an educational comparison:

``` text
Dijkstra vs A*
```

------------------------------------------------------------------------

## Milestone 4 --- More Path Planning

Implement:

-   Potential Field
-   RRT
-   RRT\*
-   D\* Lite

Reuse common simulation components.

------------------------------------------------------------------------

## Milestone 5 --- Localization

Implement:

-   Particle Filter
-   EKF

Visualize:

-   true state
-   noisy observation
-   estimated state
-   uncertainty
-   particles

------------------------------------------------------------------------

## Milestone 6 --- Control

Implement:

-   PID
-   Pure Pursuit
-   Stanley

Show:

-   reference trajectory
-   actual trajectory
-   tracking error
-   control input

------------------------------------------------------------------------

## Milestone 7 --- SLAM

Implement:

-   ICP first

Then consider:

-   FastSLAM

Do not attempt full SLAM before the simulation architecture is mature.

------------------------------------------------------------------------

## Milestone 8 --- Multi-Agent Robotics

Implement:

-   consensus
-   leader-follower
-   formation control

This should become a major advanced section.

------------------------------------------------------------------------

# 29. Future Architecture

The platform should eventually support:

``` text
Static educational website
        ↓
Interactive simulations
        ↓
User experiments
        ↓
Saved experiments
        ↓
Accounts
        ↓
Cloud simulation
        ↓
Courses
        ↓
Exercises
        ↓
Quizzes
        ↓
Progress tracking
```

However, none of these backend features should be required for the
initial GitHub Pages version.

------------------------------------------------------------------------

# 30. Future Migration

When the platform outgrows GitHub Pages, the frontend should be
deployable to:

-   Vercel
-   Cloudflare Pages
-   Cloudflare Workers
-   another static hosting platform

Potential future backend:

``` text
Frontend
   ↓
API
   ↓
PostgreSQL
   ↓
Background workers
```

But this is explicitly out of scope for Phase 1.

------------------------------------------------------------------------

# 31. UI/UX Direction

Visual style:

-   modern
-   technical
-   academic
-   clean
-   minimal
-   engineering-oriented

Avoid:

-   excessive gradients
-   excessive glassmorphism
-   distracting animations
-   generic SaaS dashboard aesthetics

The simulator should visually communicate:

``` text
robot
environment
sensor
algorithm
trajectory
state
```

Use a consistent visual language.

------------------------------------------------------------------------

# 32. Navigation

Primary navigation:

``` text
Learn
  ├── Fundamentals
  ├── Localization
  ├── Mapping
  ├── SLAM
  ├── Path Planning
  ├── Control
  └── Multi-Agent

Algorithms
Experiments
About
References
```

Search should eventually support algorithm names.

Example:

``` text
Search: "A*"
```

should find:

-   A\* explanation
-   A\* simulation
-   A\* mathematics
-   A\* implementation
-   related algorithms

------------------------------------------------------------------------

# 33. Comparison Features

A future feature should allow users to compare algorithms.

Example:

``` text
A* vs Dijkstra

Explored Nodes
A*       ████████
Dijkstra ███████████████

Path Cost
A*       21
Dijkstra 21

Speed
A*       faster
Dijkstra slower
```

This makes the platform more useful for education.

------------------------------------------------------------------------

# 34. Experiment Mode

Eventually provide a dedicated:

**Algorithm Lab**

where learners can select:

``` text
Algorithm:
[A* ▼]

Environment:
[Grid World ▼]

Heuristic:
[Euclidean ▼]

Obstacle density:
[──────●──]

Robot:
[Differential Drive ▼]

[ RUN ]
```

This should be separate from explanatory pages.

------------------------------------------------------------------------

# 35. Documentation Requirements

Maintain:

``` text
README.md
CONTRIBUTING.md
ARCHITECTURE.md
THIRD_PARTY_NOTICES.md
```

Every major algorithm should have:

-   educational documentation
-   implementation
-   tests
-   references

------------------------------------------------------------------------

# 36. Definition of Done

A feature is complete only when:

-   [ ] It works locally.
-   [ ] It works in production build.
-   [ ] It works under GitHub Pages base path.
-   [ ] TypeScript has no new errors.
-   [ ] Lint passes.
-   [ ] Tests pass.
-   [ ] Mobile layout works.
-   [ ] Keyboard interaction works where applicable.
-   [ ] Reduced-motion behavior is considered.
-   [ ] Algorithm implementation is separated from UI.
-   [ ] Educational explanation exists.
-   [ ] Mathematical notation renders correctly.
-   [ ] References are provided.
-   [ ] Third-party assets are properly attributed.
-   [ ] No unnecessary dependency was introduced.

------------------------------------------------------------------------

# 37. Important Agent Constraint

Never respond to a feature request by immediately generating a huge
amount of code.

First determine:

1.  What already exists.
2.  What the smallest implementation is.
3.  Which reusable component should be created.
4.  Which tests are required.
5.  Whether the change affects GitHub Pages deployment.

Then implement incrementally.

The platform should evolve as a coherent software system, not as a
collection of unrelated demos.

------------------------------------------------------------------------

# 38. First Task for the Coding Agent

Start with **Milestone 0 only**.

Do not implement robotics algorithms yet.

Tasks:

1.  Initialize the Next.js + TypeScript project.
2.  Configure static export for GitHub Pages.
3.  Create responsive layout.
4.  Create navigation.
5.  Create homepage.
6.  Create placeholder learning categories.
7.  Create MDX content system.
8.  Configure KaTeX/Math rendering.
9.  Configure ESLint and formatting.
10. Configure Vitest.
11. Add GitHub Actions CI.
12. Add GitHub Pages deployment.
13. Verify production build.
14. Verify the site works under a repository subpath.
15. Add README with local development instructions.

After Milestone 0 succeeds, stop.

Do not continue automatically to Milestone 1.

------------------------------------------------------------------------

# 39. First Homepage Concept

The homepage should communicate the core idea immediately.

Hero:

> **Learn Robotics by Seeing It Work.**

Subtitle:

> Interactive explanations, mathematics, algorithms, and simulations for
> robotics.

Primary CTA:

> Start Learning

Secondary CTA:

> Explore Algorithms

Then show categories:

``` text
Localization
Mapping
SLAM
Path Planning
Control
Multi-Agent Robotics
```

Then a featured interactive demo.

The homepage should demonstrate that this is an interactive robotics
learning platform, not merely documentation.

------------------------------------------------------------------------

# 40. Long-Term Goal

The final product should feel like:

**Textbook + Simulator + Algorithm Playground**

A learner should be able to read:

> "A\* chooses the next node based on estimated total cost."

and immediately click:

> **Run Algorithm**

and watch the algorithm demonstrate exactly what the sentence means.

That is the central product principle.

------------------------------------------------------------------------

# 41. Reference and Attribution

Primary inspiration/reference:

Atsushi Sakai --- PythonRobotics

Repository: https://github.com/AtsushiSakai/PythonRobotics

Textbook: https://atsushisakai.github.io/PythonRobotics/index.html

Use the project as a robotics algorithm reference and educational
inspiration. Preserve appropriate attribution and licensing compliance
for any material actually reused.

The resulting website must remain an independent implementation and
educational product.
