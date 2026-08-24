# RoboAtlas --- Agentic Content & Knowledge Base Specification

## 1. Purpose

This document defines the content architecture, educational rules,
reference policy, and agent workflow for building **RoboAtlas**.

RoboAtlas is an original interactive robotics learning platform:

> **Understand Robotics. See Algorithms. Experiment.**

It combines robotics fundamentals, mathematics, algorithms, interactive
simulations, visual explanations, TypeScript implementations, and
academic references.

Primary academic references:

1.  **Elements of Robotics** --- Marco Ben-Ari & Francesco Mondada
2.  **Foundations of Robotics: A Multidisciplinary Approach with Python
    and ROS** --- Deepak Herath & David St-Onge (Eds.)
3.  **Planning Algorithms** --- Steven M. LaValle

Additional algorithm/reference project:

-   PythonRobotics: https://github.com/AtsushiSakai/PythonRobotics
-   PythonRobotics textbook:
    https://atsushisakai.github.io/PythonRobotics/index.html

PythonRobotics is a reference source, not content to copy.

------------------------------------------------------------------------

## 2. Core Principle

RoboAtlas is an **original educational work**.

External books, papers, and projects may be used as:

-   academic references
-   conceptual references
-   algorithm references
-   validation sources
-   curriculum inspiration

The agent must NOT:

-   copy textbook paragraphs
-   translate textbook paragraphs line-by-line
-   reproduce textbook figures without license verification
-   reproduce textbook exercises verbatim
-   copy PythonRobotics documentation verbatim
-   copy PythonRobotics GIFs or diagrams without checking their license
-   copy source code without checking its license and preserving
    required notices

Write original explanations, examples, visualizations, and TypeScript
implementations.

------------------------------------------------------------------------

## 3. Primary Reference Books

### 3.1 Elements of Robotics

**Citation**

Ben-Ari, M., & Mondada, F. (2018). *Elements of Robotics*. Springer.

DOI: https://doi.org/10.1007/978-3-319-62533-1

Primary uses:

-   introduction to robotics
-   robotics terminology
-   robot components
-   sensors
-   actuators
-   robot behavior
-   motion
-   odometry
-   control
-   localization
-   mapping
-   kinematics
-   computer vision
-   machine learning
-   swarm robotics

Use this as the main beginner-friendly robotics reference.

### 3.2 Foundations of Robotics

**Citation**

Herath, D., & St-Onge, D. (Eds.). (2022). *Foundations of Robotics: A
Multidisciplinary Approach with Python and ROS*. Springer.

DOI: https://doi.org/10.1007/978-981-19-1983-1

Primary uses:

-   mathematical foundations
-   geometry
-   vectors
-   matrices
-   transformations
-   Euler angles
-   quaternions
-   derivatives
-   probability
-   Gaussian distributions
-   Bayesian concepts
-   sensors
-   actuators
-   control
-   navigation
-   path planning
-   localization
-   mapping
-   ROS

Use this as the main bridge between mathematics, programming, and
practical robotics.

### 3.3 Planning Algorithms

**Citation**

LaValle, S. M. (2006). *Planning Algorithms*. Cambridge University
Press.

Official website: https://lavalle.pl/planning/

Primary uses:

-   search
-   graph search
-   Dijkstra
-   A\*
-   motion planning
-   configuration spaces
-   sampling-based planning
-   PRM
-   RRT
-   RRT\*
-   planning under uncertainty
-   differential constraints
-   trajectory planning
-   kinodynamic planning

Use this as the primary advanced reference for Path Planning.

------------------------------------------------------------------------

## 4. Reference Hierarchy

``` text
                    RoboAtlas
                        |
        +---------------+----------------+
        |               |                |
    Robotics        Mathematics      Planning
        |               |                |
        v               v                v
 Elements of        Foundations      Planning
 Robotics           of Robotics      Algorithms
        |               |                |
        +---------------+----------------+
                        |
                        v
               Interactive Content
                        |
                        v
              TypeScript Simulation
```

Reference priority:

-   General robotics: Elements of Robotics, then Foundations of Robotics
-   Mathematics: Foundations of Robotics, then Elements of Robotics
-   Mobile robotics: Elements of Robotics, then Foundations of Robotics
-   Localization/mapping: Foundations of Robotics, Elements of Robotics,
    then PythonRobotics
-   Path planning: Planning Algorithms, Foundations of Robotics,
    Elements of Robotics, then PythonRobotics
-   Advanced planning: Planning Algorithms
-   Multi-agent/swarm: Elements of Robotics plus relevant research
    papers

------------------------------------------------------------------------

## 5. RoboAtlas Curriculum

Initial knowledge architecture:

``` text
RoboAtlas
|
+-- 01 Fundamentals
+-- 02 Mathematics for Robotics
+-- 03 Robot Modeling & Kinematics
+-- 04 Sensors & Perception
+-- 05 Localization
+-- 06 Mapping
+-- 07 SLAM
+-- 08 Path Planning
+-- 09 Path Tracking & Control
+-- 10 Manipulator Robotics
+-- 11 Multi-Agent Robotics
+-- 12 Advanced Robotics
```

Build incrementally. Do not attempt the entire curriculum at once.

------------------------------------------------------------------------

## 6. Mathematics for Robotics

Recommended structure:

``` text
Mathematics for Robotics
|
+-- Numbers and Units
+-- Vectors
+-- Coordinate Systems
+-- Geometry
+-- Trigonometry
+-- Matrices
+-- Linear Algebra
+-- Rotation
+-- Transformation
+-- Homogeneous Transformation
+-- Calculus
+-- Differential Equations
+-- Probability
+-- Gaussian Distribution
+-- Bayesian Reasoning
+-- Optimization
+-- Numerical Methods
```

Every mathematics lesson should follow:

**Concept → Mathematical Definition → Simple Example → Robotics
Interpretation → Interactive Visualization → Application**

Do not teach mathematics as isolated theory.

### Mathematics-to-Robotics mapping

``` text
Vector
  -> Position / Velocity

Matrix
  -> Transformation

Rotation Matrix
  -> Orientation

Homogeneous Transformation
  -> Forward Kinematics

Calculus
  -> Velocity / Acceleration / Dynamics / Control

Probability
  -> Sensor Noise / Estimation

Gaussian
  -> Kalman Filter

Bayesian Reasoning
  -> Localization / Particle Filter / SLAM

Optimization
  -> Trajectory Optimization / MPC / Optimal Control
```

------------------------------------------------------------------------

## 7. Standard Educational Page

Major lessons should use this structure:

``` text
# Topic

## 1. What is it?
## 2. Why does it matter?
## 3. Intuition
## 4. Mathematical Foundation
## 5. How It Works
## 6. Interactive Visualization
## 7. Example
## 8. Pseudocode
## 9. TypeScript Implementation
## 10. Experiment
## 11. Advantages
## 12. Limitations
## 13. Real Robotics Applications
## 14. Related Concepts
## 15. References
```

Not every beginner topic needs every section, but algorithm pages should
follow it closely.

------------------------------------------------------------------------

## 8. Interactive Learning Philosophy

Do not only show final results.

Show intermediate algorithm state.

For A\*:

``` text
Start
  -> Open Set
  -> Current Node
  -> Neighbor Expansion
  -> Cost Evaluation
  -> Heuristic Evaluation
  -> Node Selection
  -> Goal
  -> Final Path
```

Users should be able to:

-   Play
-   Pause
-   Step
-   Reset
-   Change parameters
-   Inspect state
-   Observe results

------------------------------------------------------------------------

## 9. Simulation Architecture

Algorithms must be independent from UI.

Bad:

``` ts
setRobotPosition(...)
```

inside an algorithm.

Good:

``` ts
const result = aStar(grid, start, goal);
```

Architecture:

``` text
Algorithm
    |
    v
Algorithm State
    |
    v
Simulation Engine
    |
    v
Renderer
    |
    v
React UI
```

Algorithms must not import React, manipulate Canvas, or depend on the
DOM.

------------------------------------------------------------------------

## 10. TypeScript Rules

All new algorithm implementations use TypeScript.

Rules:

-   strict TypeScript
-   avoid unnecessary `any`
-   pure functions where possible
-   deterministic simulations by default
-   seeded randomness for randomized algorithms
-   explicit interfaces
-   no React imports inside algorithm modules
-   no Canvas manipulation inside algorithm modules
-   no DOM dependencies inside mathematical functions

Example:

``` ts
export interface PathPlanningResult {
  path: GridNode[];
  exploredNodes: GridNode[];
  cost: number;
  success: boolean;
}
```

------------------------------------------------------------------------

## 11. Algorithm Correctness

Validate algorithms against:

-   mathematical definitions
-   textbook descriptions
-   established references
-   known edge cases
-   expected outputs

A visually plausible animation does not prove correctness.

Every algorithm requires automated tests.

------------------------------------------------------------------------

## 12. Interactive Simulation Requirements

Where applicable provide:

``` text
[Run]
[Pause]
[Step]
[Reset]
[Randomize]
```

Useful parameters may include:

-   grid size
-   obstacle density
-   start
-   goal
-   robot speed
-   sensor range
-   noise
-   number of particles
-   control gains
-   time step
-   heuristic
-   random seed

Every exposed parameter must have an educational purpose.

------------------------------------------------------------------------

## 13. Visual Explanation Rules

Visualizations must communicate concepts.

### A\*

Show:

-   explored nodes
-   open set
-   current node
-   final path

### Particle Filter

Show:

-   particles
-   true robot
-   estimated pose
-   sensor observations
-   particle weights

### EKF

Show:

-   predicted state
-   measurement
-   covariance ellipse
-   corrected state

### PID

Show:

-   reference
-   actual trajectory
-   error
-   control signal

### Formation Control

Show:

-   agents
-   communication links
-   desired formation
-   formation error
-   control vectors

------------------------------------------------------------------------

## 14. References and Citations

Every lesson that substantially relies on an external source must
include references.

Example:

``` text
## References

1. Ben-Ari, M., & Mondada, F. (2018).
   Elements of Robotics. Springer.
   https://doi.org/10.1007/978-3-319-62533-1

2. Herath, D., & St-Onge, D. (Eds.). (2022).
   Foundations of Robotics: A Multidisciplinary Approach with Python and ROS.
   Springer.
   https://doi.org/10.1007/978-981-19-1983-1

3. LaValle, S. M. (2006).
   Planning Algorithms.
   Cambridge University Press.
   https://lavalle.pl/planning/
```

Prefer DOI and official publisher/author URLs.

------------------------------------------------------------------------

## 15. Structured Reference Metadata

Maintain:

``` text
content/references/
+-- books.ts
+-- papers.ts
+-- projects.ts
```

Suggested interface:

``` ts
export interface Reference {
  id: string;
  type: "book" | "paper" | "website" | "software";
  title: string;
  authors: string[];
  year?: number;
  publisher?: string;
  doi?: string;
  url?: string;
  license?: string;
}
```

This allows references to be reused throughout the website.

------------------------------------------------------------------------

## 16. Third-Party Content Policy

Create:

``` text
THIRD_PARTY_NOTICES.md
```

Track reused:

-   code
-   images
-   diagrams
-   icons
-   fonts
-   datasets
-   animations

Record:

``` text
Asset
Source
Author
License
URL
Modification
Attribution Requirement
```

If the license is unclear:

**Do not reuse the asset. Create an original replacement.**

------------------------------------------------------------------------

## 17. Book Usage Policy

The agent may:

-   read the books
-   summarize concepts
-   compare concepts
-   use them to design curriculum
-   derive original examples
-   validate explanations
-   cite them

The agent must not:

-   copy paragraphs
-   reproduce chapter text
-   reproduce exercises verbatim
-   reproduce figures without license permission
-   reproduce tables without checking rights
-   create near-verbatim translations
-   claim textbook content as original RoboAtlas content

Core rule:

> **Learn from the references, then explain independently.**

------------------------------------------------------------------------

## 18. PythonRobotics Usage Policy

PythonRobotics may be used to:

-   identify algorithms
-   compare algorithm behavior
-   validate implementation concepts
-   identify practical examples
-   identify references and papers

Do not:

-   copy README explanations
-   copy textbook sections
-   copy GIFs without checking their license
-   copy code without license compliance
-   reproduce the project structure as RoboAtlas

RoboAtlas must have independent:

-   TypeScript implementations
-   educational explanations
-   simulations
-   visual design
-   content structure

------------------------------------------------------------------------

## 19. Research Paper References

For algorithms with canonical research papers, cite the paper as well as
the book.

Examples:

-   A\*
-   Dijkstra
-   D\* Lite
-   RRT
-   RRT\*
-   EKF
-   Particle Filter
-   ICP
-   LQR
-   MPC
-   Consensus
-   Formation Control

Prefer primary research papers when explaining historical origin.

For beginner pages, avoid excessive citations. Use one primary reference
and supporting references where appropriate.

------------------------------------------------------------------------

## 20. Content Quality Rules

### Accuracy

Do not simplify into technical inaccuracies.

### Clarity

Use short paragraphs and concrete explanations.

### Progression

Start with intuition before formal mathematics.

### Context

Explain why the concept matters to a robot.

### Example

Use original robotics scenarios.

### Visualization

Provide interactive visualization when it meaningfully improves
understanding.

### Limitations

Explain when and why an algorithm may fail.

------------------------------------------------------------------------

## 21. Avoid Magic Mathematics

Do not introduce an equation without context.

Bad:

``` text
K = PH^T(HPH^T + R)^-1
```

Better progression:

``` text
Why do we need estimation?
        |
        v
What is uncertainty?
        |
        v
Prediction
        |
        v
Measurement
        |
        v
How should they be combined?
        |
        v
Kalman Gain
        |
        v
Equation
```

Every major equation should have an intuitive explanation and variable
definitions.

------------------------------------------------------------------------

## 22. Avoid Code-First Teaching

Do not begin a lesson with implementation.

Preferred:

``` text
Problem
  ↓
Intuition
  ↓
Mathematics
  ↓
Algorithm
  ↓
Visualization
  ↓
Pseudocode
  ↓
TypeScript
```

------------------------------------------------------------------------

## 23. Curriculum Dependencies

Maintain explicit prerequisites.

Example:

``` text
Vectors
  ↓
Matrices
  ↓
Coordinate Frames
  ↓
Rotation
  ↓
Transformation
  ↓
Kinematics
```

``` text
Probability
  ↓
Gaussian
  ↓
Bayesian
  ↓
Kalman Filter
  ↓
Localization
  ↓
SLAM
```

``` text
Graph
  ↓
Search
  ↓
Dijkstra
  ↓
A*
  ↓
D* Lite
```

``` text
Optimization
  ↓
Trajectory Optimization
  ↓
LQR
  ↓
MPC
```

The content agent must preserve these dependencies.

------------------------------------------------------------------------

## 24. Lesson Metadata

Every lesson should have metadata.

``` ts
interface LessonMetadata {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  references: string[];
  interactive: boolean;
  estimatedMinutes?: number;
}
```

Example:

``` ts
{
  id: "astar",
  slug: "a-star",
  title: "A* Path Planning",
  category: "path-planning",
  difficulty: "intermediate",
  prerequisites: ["graphs", "dijkstra"],
  references: ["lavalle-planning", "elements-robotics"],
  interactive: true
}
```

------------------------------------------------------------------------

## 25. Agentic Content Workflow

When creating a new lesson:

### Step 1

Identify prerequisites.

### Step 2

Select relevant references.

### Step 3

Create an original outline.

### Step 4

Write the intuition.

### Step 5

Add only the mathematics required.

### Step 6

Create an original robotics example.

### Step 7

Design the visualization.

### Step 8

Implement the algorithm as framework-independent TypeScript.

### Step 9

Connect it to the simulation engine.

### Step 10

Add automated tests.

### Step 11

Add references.

### Step 12

Verify accuracy, accessibility, mobile layout, performance, and build.

Do not produce a huge article or huge implementation in one step unless
explicitly requested.

------------------------------------------------------------------------

## 26. Agentic Research Rules

When researching:

1.  Prefer primary sources.
2.  Prefer official publisher pages.
3.  Prefer DOI metadata.
4.  Prefer original research papers for algorithms.
5.  Use the three primary books as the main educational references.
6.  Use PythonRobotics for implementation comparison.
7.  Do not treat random blogs as authoritative.
8.  Clearly distinguish established facts from implementation choices.

For current or changing information, verify with current sources.

------------------------------------------------------------------------

## 27. Initial Content Priority

### Phase A --- Fundamentals

1.  What is Robotics?
2.  What is a Robot?
3.  Sensors
4.  Actuators
5.  Robot Controllers
6.  Robot Types
7.  Autonomous Robotics

### Phase B --- Mathematics

1.  Vectors
2.  Coordinate Systems
3.  Matrices
4.  Rotation
5.  Transformation
6.  Probability
7.  Gaussian Distribution
8.  Bayesian Reasoning
9.  Calculus for Robotics

### Phase C --- Mobile Robotics

1.  Differential Drive
2.  Pose
3.  Odometry
4.  Kinematics
5.  Velocity
6.  Trajectory

### Phase D --- Planning

1.  Graphs
2.  Search
3.  Dijkstra
4.  A\*
5.  D\* Lite
6.  Configuration Space
7.  PRM
8.  RRT
9.  RRT\*

### Phase E --- Localization

1.  Sensor Noise
2.  State Estimation
3.  Bayesian Localization
4.  Particle Filter
5.  EKF

### Phase F --- Control

1.  Feedback
2.  Error
3.  PID
4.  Trajectory Tracking
5.  LQR
6.  MPC

### Phase G --- SLAM

1.  Mapping
2.  Localization + Mapping
3.  ICP
4.  FastSLAM

### Phase H --- Multi-Agent Robotics

1.  Multi-Agent Systems
2.  Consensus
3.  Leader-Follower
4.  Formation Control
5.  Distributed Control

------------------------------------------------------------------------

## 28. Recommended First Interactive Lessons

Start with:

### Coordinate System

Visualize:

-   x-axis
-   y-axis
-   orientation
-   vectors
-   coordinate transformation

### Differential Drive

Allow:

-   left wheel velocity
-   right wheel velocity
-   robot trajectory

### Dijkstra

Show:

-   grid
-   exploration
-   shortest path

### A\*

Show:

-   g
-   h
-   f
-   exploration
-   final path

### Particle Filter

Show:

-   particles
-   robot
-   noisy sensor
-   estimated pose

### PID

Show:

-   target
-   actual response
-   error
-   control output

These demos establish the RoboAtlas interaction model.

------------------------------------------------------------------------

## 29. References Page

Create:

``` text
/references
```

Group:

``` text
Books
Papers
Open Source Projects
Courses
Tools
```

Book cards should contain:

``` text
Title
Authors
Year
Publisher
DOI
Official Link
Used In
```

------------------------------------------------------------------------

## 30. Content Identity

RoboAtlas should feel:

-   educational
-   engineering-oriented
-   rigorous
-   visual
-   interactive
-   approachable
-   research-aware

Avoid making it:

-   overly academic
-   overly simplified
-   a copy of a textbook
-   a copy of PythonRobotics
-   a generic programming tutorial

Core objective:

> **Make difficult robotics concepts visually understandable without
> sacrificing technical correctness.**

------------------------------------------------------------------------

## 31. Definition of Done

A new lesson is complete only when:

-   [ ] Explanation is original.
-   [ ] Claims are technically correct.
-   [ ] Relevant references are cited.
-   [ ] Primary paper is cited when appropriate.
-   [ ] No copyrighted text was copied.
-   [ ] Third-party images/assets have verified licenses.
-   [ ] Mathematics is explained.
-   [ ] Robotics relevance is clear.
-   [ ] Example is original.
-   [ ] Interactive visualization works when applicable.
-   [ ] TypeScript implementation is tested.
-   [ ] Mobile layout works.
-   [ ] Accessibility is considered.
-   [ ] Reduced-motion behavior is considered.
-   [ ] References are present.
-   [ ] Build passes.

------------------------------------------------------------------------

## 32. Important Agent Instruction

When the user asks:

> "Create a lesson about X"

the agent must first determine:

1.  target audience
2.  prerequisites
3.  relevant references
4.  learning objectives
5.  minimum mathematics
6.  interactive component
7.  algorithm/API requirements
8.  implementation plan
9.  tests
10. references

If the topic does not require simulation, do not force one.

If interactive visualization substantially improves understanding,
prioritize it.

------------------------------------------------------------------------

## 33. Source Boundaries

Use the three books according to their strengths:

``` text
Elements of Robotics
→ robotics introduction
→ sensors
→ motion
→ localization
→ mapping
→ swarm robotics

Foundations of Robotics
→ mathematics
→ geometry
→ probability
→ Bayesian reasoning
→ ROS
→ navigation
→ localization
→ mapping
→ control

Planning Algorithms
→ graph search
→ path planning
→ motion planning
→ configuration space
→ PRM
→ RRT
→ advanced planning
```

When sources use different conventions:

-   identify the convention
-   explain the difference
-   choose one convention for RoboAtlas
-   document it clearly

Do not silently mix incompatible coordinate or sign conventions.

------------------------------------------------------------------------

## 34. Long-Term Vision

RoboAtlas should evolve into:

``` text
                    RoboAtlas
                       |
          +------------+------------+
          |            |            |
        Learn       Simulate      Experiment
          |            |            |
          v            v            v
      Textbook      Browser       Algorithm
      Content      Simulation      Lab
          |            |            |
          +------------+------------+
                       |
                       v
                Robotics Knowledge
```

Future possibilities:

-   interactive courses
-   quizzes
-   exercises
-   experiment sharing
-   saved configurations
-   progress tracking
-   multi-agent simulation
-   3D simulation
-   ROS integration
-   advanced research topics

These must not complicate the initial static GitHub Pages architecture.

------------------------------------------------------------------------

## 35. Final Agent Principle

Every RoboAtlas feature should answer:

> **Can the learner understand something better because this exists?**

If not, do not add it.

The central learning loop is:

``` text
Understand
    ↓
Visualize
    ↓
Experiment
    ↓
Observe
    ↓
Modify
    ↓
Understand Again
```

RoboAtlas should make robotics algorithms something learners can **see,
manipulate, and reason about**, not merely read about.
