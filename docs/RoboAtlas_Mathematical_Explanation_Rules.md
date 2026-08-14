# RoboAtlas — Mathematical Explanation & Graph Visualization Rules

## Purpose

RoboAtlas must not merely state robotics formulas. Every important formula must be explained so the learner understands:

1. What the formula is.
2. What every variable means.
3. Why the formula has that form.
4. How it is used in robotics.
5. Where it comes from, when a useful derivation exists.
6. What assumptions and limitations apply.

The preferred learning flow is:

```text
Problem
  ↓
Physical intuition
  ↓
Mathematical model
  ↓
Formula
  ↓
Why the formula works
  ↓
Derivation when useful
  ↓
Numerical example
  ↓
Visualization
  ↓
Algorithm
  ↓
Interactive experiment
```

---

## 1. Formula Explanation Standard

For every major equation, use:

### Formula

Show the equation clearly.

Example:

\[
v = \frac{\Delta x}{\Delta t}
\]

### Meaning

Explain it in plain language.

> Velocity describes how quickly position changes with time.

### Variables

```text
v  = velocity
Δx = change in position
Δt = change in time
```

### Why?

Explain the physical reasoning.

> Moving farther in the same amount of time means a greater velocity. Taking longer to travel the same distance means a lower velocity.

### Numerical Example

```text
Δx = 4 m
Δt = 2 s

v = 4 / 2
  = 2 m/s
```

### Robotics Application

Explain where a real robot uses the quantity.

### Visualization

Show the physical or geometric meaning whenever useful.

---

## 2. "Why Is It Like That?" Is Mandatory

Do not teach formulas as things to memorize.

For:

\[
f(n)=g(n)+h(n)
\]

explain:

```text
g(n)
= cost already paid

h(n)
= estimated remaining cost

therefore:

estimated total cost
= cost already paid
+ estimated remaining cost
```

Only then introduce:

\[
f(n)=g(n)+h(n)
\]

The learner should understand the reason behind the equation.

---

## 3. Derivation Rules

Use three levels.

### Level 1 — Intuitive

For beginner material:

```text
Distance
   ↓
Distance per time
   ↓
Velocity
```

Use diagrams and simple algebra.

### Level 2 — Step-by-Step

For central robotics equations.

Example differential drive:

```text
Wheel rotation
      ↓
Wheel circumference
      ↓
Distance travelled
      ↓
Robot displacement
```

Show the algebra step-by-step.

### Level 3 — Formal

For advanced material where derivation substantially improves understanding:

- differential-drive kinematics
- homogeneous transformation
- Jacobians
- Kalman filter
- LQR
- optimization
- probability
- robot dynamics

Do not force formal proofs when they do not improve understanding.

---

## 4. Physical System → Mathematical Model

Whenever possible, derive equations from the physical system.

Example differential drive:

```text
       v
       ↑
       |
   ----●----
  left     right
 wheel     wheel
```

Define:

```text
vL = left wheel velocity
vR = right wheel velocity
L  = wheel separation
```

Explain:

```text
vL = vR
→ straight motion

vL ≠ vR
→ rotational motion
```

Then introduce:

\[
v = \frac{v_R+v_L}{2}
\]

and:

\[
\omega = \frac{v_R-v_L}{L}
\]

Then explain why averaging the wheel velocities produces linear velocity and why their difference produces angular velocity.

Do not present equations before establishing the physical meaning.

---

## 5. Numerical Examples

Important formulas should have at least one small numerical example.

Prefer numbers that are easy to calculate.

Show intermediate steps for complex equations.

---

## 6. Units

Use units as part of the explanation.

Example:

\[
v = \frac{\Delta x}{\Delta t}
\]

```text
m / s = m/s
```

Common robotics quantities:

```text
Position       → m
Velocity       → m/s
Acceleration   → m/s²
Angle          → rad
Angular velocity → rad/s
Angular acceleration → rad/s²
Force          → N
Torque         → N·m
```

Check units when introducing important equations.

---

## 7. Matrix Dimension Checking

For matrix mathematics, explain dimensions.

Example:

\[
y=Ax
\]

If:

```text
A = 2 × 2
x = 2 × 1
```

then:

```text
(2 × 2)(2 × 1) = 2 × 1
```

Explain why the operation is valid.

This is important for:

- transformations
- Jacobians
- Kalman filters
- state-space models
- optimization

---

# Graph Visualization Rules

## 8. Graphs Must Be Visual

When a robotics concept uses a graph, show the graph.

Especially for:

- Dijkstra
- A*
- D*
- D* Lite
- BFS/DFS
- graph search
- PRM
- roadmap planning
- state graphs
- topological navigation

Do not explain graph algorithms using text alone when a visual graph would improve understanding.

---

## 9. Graph Fundamentals

Before Dijkstra/A*, teach:

```text
Graph
├── Node / Vertex
├── Edge
├── Weight
├── Path
├── Cost
├── Neighbor
├── Start
└── Goal
```

Example:

```text
       B
      /      /       A-----C
     \           \            D-----E
```

Explain:

```text
A, B, C, D, E
= nodes

connections
= edges

edge value
= weight / cost
```

Where practical, make the graph interactive.

---

## 10. Interactive Graph

A reusable graph simulator should support, where relevant:

- add node
- remove node
- move node
- connect nodes
- remove edge
- change edge weight
- select start
- select goal
- run algorithm
- step algorithm
- reset

Highlight:

```text
Start
Goal
Current Node
Open Set
Closed Set
Candidate Edges
Final Path
```

---

## 11. Dijkstra Visualization

Dijkstra should visually demonstrate:

> Expand the node with the smallest known accumulated cost.

Example:

```text
        2
   A -------- B
   |          |
  5|          |2
   |          |
   C -------- D
        1
```

During execution, show:

```text
Step 1
A = 0

Step 2
expand A

B = 2
C = 5

Step 3
expand B

D = 4
```

Show both:

- graph state
- distance/cost table

---

## 12. A* Visualization

For every candidate node show:

```text
Node: C

g = 7
h = 4
f = 11
```

Connect the visual node to its numerical values.

Explain:

\[
f(n)=g(n)+h(n)
\]

The learner should see why a node is selected.

---

## 13. Graph + Table + Formula

Use this pattern for algorithm lessons when useful:

```text
+-------------------+----------------------+
|                   | Algorithm State      |
|       GRAPH       |                      |
|                   | Open Set             |
|      ●---●        | Closed Set           |
|     /     \       | Current Node         |
|    ●-------●      | Cost Table           |
|                   |                      |
+-------------------+----------------------+

Formula:

f(n) = g(n) + h(n)
```

The goal is:

```text
Visual node
    ↕
Algorithm state
    ↕
Mathematical value
```

---

## 14. Graph vs Grid vs Continuous Space

Explain representation choices.

### Grid

```text
+---+---+---+---+
|   |   |   |   |
+---+---+---+---+
|   | X |   |   |
+---+---+---+---+
|   |   |   | G |
+---+---+---+---+
```

Useful for:

- Dijkstra
- A*
- occupancy-grid planning

### Graph

```text
A ---- B
|      |
C ---- D ---- E
```

Useful for:

- graph search
- roadmap planning
- topological navigation
- PRM
- state graphs

### Continuous Space

```text
start ● ~~~~~~~~~~~~~~~~> ● goal
```

Useful for:

- RRT
- trajectory optimization
- control
- vehicle planning

Always explain why the representation is appropriate.

---

## 15. Configuration Space

For motion planning, distinguish:

```text
Workspace
```

from:

```text
Configuration Space
```

Show both visually.

Explain why a robot can sometimes be represented as a point in configuration space and how obstacles are transformed.

---

## 16. Coordinate and Transformation Visualization

Whenever transformations are introduced, show coordinate frames.

```text
World Frame

     X
     ↑
     |
     +------→ Y


Robot Frame

     xr
     ↑
     |
     +------→ yr
```

Show:

- translation
- rotation
- transformed point
- before/after coordinates

For:

\[
T=
\begin{bmatrix}
R&t\\
0&1
\end{bmatrix}
\]

explain:

```text
R = rotation
t = translation
```

Then visualize the geometric meaning.

---

## 17. Probability Visualization

For probability-based robotics, show the distribution.

For a Gaussian:

\[
p(x)=
\frac{1}{\sqrt{2\pi\sigma^2}}
e^{-\frac{(x-\mu)^2}{2\sigma^2}}
\]

Explain:

```text
μ = center / expected value
σ = spread / uncertainty
```

Allow interactive changes to μ and σ where useful.

---

## 18. Kalman Filter Visualization

Show:

```text
Previous State
      ↓
Prediction
      ↓
Predicted Uncertainty
      ↓
Sensor Measurement
      ↓
Measurement Uncertainty
      ↓
Fusion
      ↓
Updated State
```

Visualize uncertainty/covariance where appropriate.

Explain the intuition before introducing the full matrix equations.

---

## 19. Control Visualization

For PID:

\[
u(t)=K_p e(t)+K_i\int e(t)dt+K_d\frac{de(t)}{dt}
\]

Explain:

```text
P → present error
I → accumulated error
D → rate of error change
```

Then visualize:

- target
- actual response
- error
- control signal

Allow Kp, Ki, Kd to be adjusted and show the effect.

---

## 20. Assumptions

Every important mathematical model must state its assumptions.

Example differential drive:

```text
- wheels do not slip
- wheel radius is known
- wheel separation is known
- planar motion
- ideal kinematic model
```

Explain what happens when assumptions fail.

---

## 21. Models Are Not Reality

Teach that equations are models of physical systems.

Real robots may have:

- wheel slip
- sensor noise
- actuator limits
- latency
- discretization
- model uncertainty

The learner should understand that robotics involves building useful mathematical approximations of physical systems.

---

## 22. Interactive Derivation

Where useful, allow the learner to manipulate quantities.

Example:

```text
Distance:
[──────●────]

Time:
[───●────────]

Velocity:
2.0 m/s
```

For transformations:

```text
Translation X
[────●────]

Translation Y
[──────●──]

Rotation
[──●──────]
```

Then show the resulting geometry.

---

## 23. Difficulty-Based Mathematical Depth

### Beginner

Use:

- intuition
- diagrams
- simple algebra
- numerical examples
- basic graph visualization

### Intermediate

Use:

- step-by-step derivations
- geometry
- matrices
- probability
- algorithm state

### Advanced

Use:

- formal derivations
- differential equations
- Jacobians
- optimization
- state-space models
- stability
- proofs where useful

Do not overwhelm beginner lessons with graduate-level derivations.

---

## 24. Reusable Components

Create reusable educational components conceptually such as:

```text
FormulaBlock
FormulaVariables
DerivationSteps
NumericalExample
UnitCheck
GraphCanvas
GraphNode
GraphEdge
GraphControls
GraphStatePanel
CostTable
AlgorithmStepPanel
CoordinateFrame
ProbabilityPlot
SimulationControls
```

Keep mathematical logic and algorithm logic independent from React rendering.

---

## 25. Educational Algorithm State

Algorithms should expose intermediate state when an interactive lesson needs it.

Example:

```ts
interface SearchStep {
  currentNode: string;
  openSet: string[];
  closedSet: string[];
  distances: Record<string, number>;
  selectedEdge?: {
    from: string;
    to: string;
  };
}
```

And:

```ts
interface SearchResult {
  path: string[];
  cost: number;
  steps: SearchStep[];
}
```

This enables step-by-step replay.

---

## 26. Micro-Exercises

After important mathematical explanations, provide a small optional interactive check.

Example:

> A robot moves 6 m in 3 s. What is its average velocity?

Then reveal:

\[
v=\frac{6}{3}=2\text{ m/s}
\]

Use micro-exercises when they reinforce understanding. Do not turn every page into a quiz.

---

## 27. Agent Rules for Mathematical Lessons

Before creating mathematical/algorithmic content, the agent must internally answer:

```text
What physical problem is being modeled?
What assumptions are made?
What variables are required?
Why does this equation make sense?
Can it be derived?
What is the simplest useful derivation?
What numerical example demonstrates it?
What visualization represents it?
What algorithm uses it?
What happens when assumptions fail?
```

These answers should shape the lesson.

---

## 28. Mathematical Lesson Definition of Done

A mathematical lesson is complete when appropriate items are present:

- [ ] Problem introduced.
- [ ] Physical intuition explained.
- [ ] Variables defined.
- [ ] Formula clearly shown.
- [ ] Reason for formula explained.
- [ ] Units explained where relevant.
- [ ] Derivation included when useful.
- [ ] Numerical example provided.
- [ ] Robotics application shown.
- [ ] Assumptions stated.
- [ ] Limitations stated.
- [ ] Visualization provided when beneficial.
- [ ] Graph visualization used for graph-based concepts.
- [ ] Interactive experiment added when it materially improves understanding.
- [ ] References included.

---

## 29. Final Principle

RoboAtlas must never encourage:

> "Memorize this formula."

The goal is:

> **Understand where the formula comes from, what it represents physically, why it works, and when a robot needs it.**

Ideal learner experience:

```text
I see the problem.
       ↓
I understand the physical situation.
       ↓
I see the variables.
       ↓
I understand why the equation has this form.
       ↓
I follow the derivation.
       ↓
I test it numerically.
       ↓
I see it visually.
       ↓
I run the algorithm.
       ↓
I change the parameters.
       ↓
I understand the behavior.
```

This is the mathematical and visualization standard for RoboAtlas.
