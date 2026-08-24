# RoboAtlas — Agentic Material & Laboratory Backlog
## Audit-driven recommended next materials — 2026-08-14

## Objective

Build RoboAtlas as:

**interactive robotics textbook + mathematical laboratory + algorithm laboratory + robot embodiment atlas**

The repository already defines the universal pipeline:

`Problem → Physical Intuition → Mathematical Model → Formula & Derivation → Visualization → Algorithm → Interactive Lab → Robot Application`

The next work should therefore prioritize **general robotics fundamentals**, not immediately add more SLAM/navigation content.

---

# 1. Recommended first batch

| ID | Material | Level | Lab | Priority |
|---|---|---:|---|---|
| M01 | Vectors & Coordinate Geometry | 1 | Vector Explorer | P0 |
| M02 | Dot Product & Projection | 1 | Vector Projection Lab | P0 |
| M03 | 2D Rotation | 1–2 | Rotation Explorer | P0 |
| M04 | Coordinate Frames | 2 | Frame Explorer | P0 |
| M05 | Homogeneous Transform Composition | 2 | Transform Chain Lab | P0 |
| M06 | Differential Drive Kinematics | 3 | Differential Drive Simulator | P0 |
| M07 | Non-Holonomic Constraints | 3 | Constraint Explorer | P1 |
| M08 | Sensor Noise & Uncertainty | 5 | Sensor Noise Laboratory | P0 |
| M09 | Wheel Odometry | 5 | Odometry Drift Lab | P0 |
| M10 | Probability for Robotics | 1/8 | Bayesian Robot Lab | P0 |
| M11 | Bayesian Filtering | 8 | 1D Localization Lab | P0 |
| M12 | PID Control | 7 | PID Control Lab | P0 |
| M13 | Pure Pursuit | 7 | Path Tracking Lab | P1 |
| M14 | Path Tracking Error Geometry | 7 | Error Geometry Lab | P0 |
| M15 | A* vs Dijkstra | 6 | Search Comparison Lab | P1 |
| M16 | Configuration Space | 6 | C-Space Inflation Lab | P0 |
| M17 | RRT | 6 | Sampling Planner Lab | P1 |
| M18 | 2DOF Forward Kinematics | 14 | Arm FK Lab | P0 |
| M19 | Inverse Kinematics | 14 | 2DOF IK Lab | P1 |
| M20 | Jacobian & Singularity | 4/14/19 | Velocity Ellipse Lab | P1 |
| M21 | LiDAR Raycasting | 5 | LiDAR Lab | P0 |
| M22 | Occupancy Grid Mapping | 9 | Mapping Lab | P0 |
| M23 | ICP Scan Matching | 10 | Step-by-Step ICP Lab | P1 |
| M24 | Monte Carlo Localization | 8 | Particle Filter Lab | P1 |
| M25 | Multi-Agent Consensus | 18 | Graph Consensus Lab | P2 |
| M26 | Formation Control | 18 | Formation Lab | P2 |
| M27 | State Space & Feedback | 7 | Mass-Spring-Damper Lab | P1 |
| M28 | Discrete-Time Simulation | 1/7 | Numerical Integration Lab | P1 |
| M29 | Numerical Stability | 1/7 | Euler vs RK4 Lab | P2 |
| M30 | Sensor Fusion | 8 | Multi-Sensor Lab | P2 |

---

# 2. M01 — Vectors & Coordinate Geometry

### Concepts
- scalar vs vector
- magnitude
- normalization
- position and displacement
- direction
- Cartesian/polar representation

### Core equations

```text
v = [vx, vy]^T
||v|| = sqrt(vx² + vy²)
v_hat = v / ||v||
```

### Laboratory: Vector Explorer

Controls:
- vx
- vy

Visualize:
- vector
- magnitude
- angle
- normalized vector
- Cartesian/polar form

Use a draggable vector endpoint.

### Robot applications
- waypoint direction
- velocity
- force
- LiDAR ray direction

---

# 3. M02 — Dot Product & Projection

### Concepts
- dot product
- angle
- orthogonality
- scalar projection
- vector projection

```text
a · b = ax bx + ay by
a · b = ||a|| ||b|| cos(theta)

proj_b(a) = ((a · b) / ||b||²)b
```

### Laboratory

Show:

```text
A = A_parallel + A_perpendicular
```

Interactive vectors and projection.

### Future dependencies

This becomes the mathematical foundation for:
- path tracking
- cross-track error
- Pure Pursuit
- Stanley

---

# 4. M03 — 2D Rotation

### Concepts
- radians
- orientation
- rotation matrix
- active/passive rotation

```text
R(theta) =
[ cos(theta)  -sin(theta) ]
[ sin(theta)   cos(theta) ]
```

### Laboratory

Controls:
- theta
- x
- y

Visualize:
- original point
- rotated point
- axes
- rotation arc
- matrix

This should become a canonical lesson reused by arms, mobile robots, UAVs, ROVs and legged robots.

---

# 5. M04 — Coordinate Frames

### Goal

Answer:

> Where is this object relative to which coordinate frame?

Frames:

```text
World
 └── Robot
      └── LiDAR
```

### Laboratory

Controls:
- robot x/y/theta
- sensor x/y/theta

Display all frames and resulting sensor pose.

### Applications

- ROS TF
- cameras
- LiDAR
- robot arms
- UAV body/world frame

---

# 6. M05 — Transform Composition

```text
T_world_sensor =
T_world_robot T_robot_sensor
```

### Laboratory

Create two transforms and show:

```text
T1 T2
vs
T2 T1
```

Demonstrate visually why order matters.

### Applications

- TF chains
- manipulator links
- sensor mounting
- camera calibration

---

# 7. M06 — Differential Drive Kinematics

Existing RoboAtlas kinematics material should be migrated/reused rather than duplicated.

```text
v = r/2 (omega_R + omega_L)
omega = r/L (omega_R - omega_L)

x_dot = v cos(theta)
y_dot = v sin(theta)
theta_dot = omega
```

### Laboratory

Controls:
- wheel radius
- wheel separation
- left velocity
- right velocity

Display:
- wheel motion
- robot velocity
- angular velocity
- ICC
- trajectory

Experiments:
1. equal wheel speeds → straight line
2. one wheel stopped → circular motion
3. opposite speeds → rotation in place

---

# 8. M07 — Non-Holonomic Constraints

Teach why a differential-drive robot cannot instantaneously move sideways.

Compare:

```text
Holonomic
vs
Non-holonomic
```

### Laboratory

Draw the set of allowed instantaneous velocity directions.

Introduce:

```text
A(q) q_dot = 0
```

as an advanced mathematical extension.

---

# 9. M08 — Sensor Noise & Uncertainty

### Model

```text
z = h(x) + v
```

where `v` is measurement noise.

Teach:
- bias
- variance
- Gaussian noise
- repeatability
- uncertainty

### Laboratory

Controls:
- true position
- bias
- standard deviation
- sample count

Display:
- measurements
- histogram
- mean
- variance
- error

Compare low/high noise.

Applications:
- encoder
- IMU
- LiDAR
- GPS
- camera

---

# 10. M09 — Wheel Odometry

Pipeline:

```text
Encoder
 ↓
Wheel Rotation
 ↓
Distance
 ↓
Velocity
 ↓
Pose Integration
 ↓
Estimated Pose
```

### Laboratory

Controls:
- wheel radius error
- wheel separation error
- encoder noise

Display:
- ground truth
- estimated trajectory
- position error
- heading error

Key experiment:

**small systematic error → large accumulated drift**

---

# 11. M10 — Probability for Robotics

Teach:
- random variables
- distributions
- mean
- variance
- conditional probability
- Bayes theorem

```text
P(A|B) = P(B|A)P(A) / P(B)
```

### Laboratory

Robot is in Room A or B.

User changes:
- prior
- sensor accuracy

Display:
- prior
- measurement likelihood
- posterior

This becomes the prerequisite for Bayesian filtering, MCL and EKF.

---

# 12. M11 — Bayesian Filtering

Pipeline:

```text
Previous Belief
 ↓
Prediction
 ↓
Measurement
 ↓
Correction
 ↓
Updated Belief
```

### Laboratory: 1D Localization

Robot moves along:

```text
0 ───────────────────── 100
```

Display:
- belief distribution
- true position
- measurement
- posterior

Compare:
- high motion uncertainty
- high sensor uncertainty

This should visually lead into MCL and Kalman filtering.

---

# 13. M12 — PID Control

```text
u(t) = Kp e(t) + Ki∫e(t)dt + Kd de(t)/dt
```

### Laboratory

Simple motor/position plant.

Controls:
- Kp
- Ki
- Kd
- target

Display:
- target
- actual response
- error
- control signal

Experiments:
- P only
- high Kp
- add Ki
- add Kd

Applications:
- motor
- arm joint
- wheel velocity
- temperature
- drone attitude

---

# 14. M13 — Pure Pursuit

Connect geometry to practical mobile robot tracking.

### Laboratory

Controls:
- lookahead distance
- speed
- initial pose
- path

Display:
- robot
- path
- lookahead circle
- lookahead point
- curvature

Compare:

```text
small Ld → aggressive
large Ld → smoother
```

---

# 15. M14 — Path Tracking Error Geometry

Before Pure Pursuit/Stanley, teach:

- closest path point
- cross-track error
- heading error
- longitudinal error
- curvature

Diagram:

```text
reference path
       • closest point
       |       |        |         |   ROBOT
       ↑
 cross-track error
```

### Laboratory

Drag robot position/orientation and calculate:

```text
e_y
e_theta
```

This becomes a prerequisite for Pure Pursuit, Stanley and MPC.

---

# 16. M15 — A* vs Dijkstra

A* already exists, so **extend the current implementation**.

Compare:

```text
Dijkstra
A*
```

Display:
- visited nodes
- final path
- path cost
- expanded-node count

Test heuristics:

```text
h(n)=0
Manhattan
Euclidean
Octile
```

Key lesson:

```text
A* with h(n)=0 ≈ Dijkstra
```

---

# 17. M16 — Configuration Space

Teach why planning a robot is different from planning a point.

```text
Real obstacle
      ↓
inflate by robot geometry
      ↓
Configuration space
      ↓
plan robot center
```

### Laboratory

Controls:
- robot radius
- obstacle geometry

Display:
- original obstacle
- inflated obstacle
- robot
- path

Applications:
- mobile robots
- arms
- drones

---

# 18. M17 — RRT

### Laboratory

Controls:
- goal bias
- step size
- max iterations
- obstacles

Display:
- samples
- tree
- collision checks
- goal
- final path

Compare low/high:
- step size
- goal bias

Explain why RRT becomes useful in high-dimensional configuration spaces.

---

# 19. M18 — 2DOF Forward Kinematics

Start with a planar arm.

```text
x = L1 cos(q1) + L2 cos(q1+q2)
y = L1 sin(q1) + L2 sin(q1+q2)
```

### Laboratory

Controls:
- L1
- L2
- q1
- q2

Display:
- joints
- end effector
- coordinate frames
- workspace

Sweep q1/q2 to reveal workspace.

Learning bridge:

```text
Rotation
 ↓
Transform
 ↓
Transform Chain
 ↓
Forward Kinematics
```

---

# 20. M19 — Inverse Kinematics

Reverse problem:

```text
target position
 ↓
joint angles
```

### Laboratory

Drag target.

Show:
- elbow-up
- elbow-down
- no solution outside workspace

Teach reachability and workspace.

---

# 21. M20 — Jacobian & Singularity

```text
x_dot = J(q) q_dot
```

### Laboratory

Controls:
- q1
- q2

Display:
- Jacobian
- determinant
- velocity ellipse

Approach a singular configuration and show:

```text
det(J) → 0
```

Explain why certain Cartesian velocities become unavailable.

---

# 22. M21 — LiDAR Raycasting

### Laboratory

User draws obstacles.

Robot emits 360° rays.

Display:
- rays
- intersections
- ranges
- point cloud

Add optional range noise.

This becomes the foundation for occupancy mapping, ICP and SLAM.

---

# 23. M22 — Occupancy Grid Mapping

Teach:
- unknown
- free
- occupied
- grid cells
- inverse sensor model
- log odds

Pipeline:

```text
LiDAR
 ↓
Ray tracing
 ↓
Free cells
 ↓
Occupied endpoint
 ↓
Occupancy Grid
```

### Laboratory

Move robot around an environment and watch the map form.

Add toggle:

```text
Probability
vs
Log-Odds
```

Reuse the existing mapping simulator.

---

# 24. M23 — ICP Scan Matching

Do not create a second simulator.

Turn the existing ICP simulator into a complete lesson:

```text
Scan A + Scan B
 ↓
Correspondence
 ↓
Centroids
 ↓
Cross-covariance
 ↓
SVD
 ↓
Rotation
 ↓
Translation
 ↓
Alignment
```

### Step laboratory

Buttons:

```text
1 Correspondence
2 Centroids
3 Covariance
4 SVD
5 Transform
6 Apply
```

This is one of the strongest mathematical laboratories RoboAtlas can have.

---

# 25. M24 — Monte Carlo Localization

Reuse the existing localization simulator.

Step mode:

```text
Predict
 ↓
Measure
 ↓
Weight
 ↓
Resample
```

Controls:
- particle count
- motion noise
- sensor noise

Compare:

```text
100
1000
5000 particles
```

---

# 26. M25 — Multi-Agent Consensus

Advanced Level 18.

```text
x_dot_i = Σ a_ij(x_j - x_i)
```

### Laboratory

Create 3/5/10 agents.

Modify graph:

```text
fully connected
chain
star
disconnected
```

Display:
- agent positions
- communication links
- consensus value
- adjacency matrix
- degree matrix
- Laplacian

```text
L = D - A
```

This is a strong connection to RoboAtlas's multi-agent research direction.

---

# 27. M26 — Formation Control

Progression:

```text
Consensus
 ↓
Distance Consensus
 ↓
Formation
 ↓
Leader-Follower
 ↓
Distributed Formation
```

### Laboratory

Formation:
- line
- triangle
- square
- V

Controls:
- desired distance
- leader velocity
- formation gain

Display formation error.

---

# 28. M27 — State Space & Feedback

Teach:

```text
x_dot = f(x,u)
y = h(x)
```

then:

```text
x_dot = Ax + Bu
y = Cx + Du
```

### Laboratory

Mass-spring-damper.

Display:
- position
- velocity
- phase plot

This is the bridge toward advanced control.

---

# 29. M28 — Discrete-Time Simulation

Teach how continuous equations become executable algorithms.

```text
x_dot = f(x,u)

x[k+1] = x[k] + dt f(x[k],u[k])
```

### Laboratory

Compare:

```text
dt = 0.001
dt = 0.01
dt = 0.1
```

Display numerical error.

This explains why simulation timestep and rendering FPS are different concepts.

---

# 30. M29 — Numerical Stability

Compare:

```text
Euler
vs
RK4
```

on a simple dynamical system.

Display:
- ground truth
- Euler
- RK4
- error

This gives RoboAtlas a valuable numerical-methods layer often missing from robotics tutorials.

---

# 31. M30 — Sensor Fusion

Concept:

```text
Encoder
 +
IMU
 +
GPS
 ↓
State Estimate
```

### Laboratory

Toggle individual sensors and compare:
- individual measurement
- fused estimate
- ground truth

This becomes the conceptual bridge toward EKF.

---

# 32. Recommended implementation batches

## Batch A — highest priority

```text
M01 Vectors
M02 Dot Product
M03 Rotation
M04 Coordinate Frames
M05 Transform Composition
M06 Differential Drive
M08 Sensor Noise
M09 Odometry
M10 Probability
M11 Bayesian Filtering
M12 PID
M14 Path Tracking Error
M16 C-Space
M18 Forward Kinematics
M21 LiDAR
```

## Batch B

```text
M07 Non-Holonomic Constraints
M13 Pure Pursuit
M15 A* vs Dijkstra
M17 RRT
M19 IK
M20 Jacobian
M22 Occupancy Grid
M23 ICP
M24 MCL
M27 State Space
M28 Discrete Simulation
```

## Batch C — advanced

```text
M25 Consensus
M26 Formation
M29 Numerical Stability
M30 Sensor Fusion
```

---

# 33. Reuse existing simulators

Before creating a new component:

```text
Search existing component
        ↓
Can it be extended?
   ┌────┴────┐
  YES       NO
   ↓         ↓
extend     create
```

Known reuse opportunities:

```text
TransformSandbox
→ M03/M04/M05

KinematicsSimulator
→ M06/M07/M09

ControlSimulator
→ M12/M13/M14

PathPlanningSimulator
→ M15/M16/M17

LocalizationSimulator
→ M11/M24

MappingSimulator
→ M21/M22

SlamSimulator
→ M23
```

This is important: **do not create duplicate simulators just to create new lessons.**

---

# 34. Standard MDX frontmatter

Every lesson should eventually use:

```yaml
---
id: stable-id
title: ...
slug: ...
level: 1
domain: mathematics
difficulty: beginner
language: en
interactive: true
estimatedMinutes: 30

prerequisites:
  - ...

learningObjectives:
  - ...
  - ...

components:
  - LessonOrientation
  - FormulaExplainer
  - MathCodeBridge
  - ConceptCheck
  - AcademicReferences

labs:
  - ...

references:
  - ...
---
```

EN and ID must share the same stable `id`, prerequisites, lab IDs and references unless intentionally localized.

---

# 35. Standard laboratory contract

Every lab should provide:

### Parameters
Sliders, numeric inputs and toggles.

### Visualization
Canvas/SVG.

### Numerical results
Formula values, tables and error metrics.

### Simulation control

```text
Reset
Play
Pause
Step
```

### Presets

```text
Normal
Noisy
Extreme
```

### Observation prompts

```text
What do you observe?
Why does this happen?
What parameter caused the change?
```

### Concept check

The learner answers after the experiment.

---

# 36. Diagram / image policy

For mathematical and engineering diagrams, prefer **programmatic SVG/Canvas** over generated raster images.

Use code-generated diagrams for:

```text
vectors
rotation
coordinate frames
transform chains
path errors
LiDAR rays
Jacobian ellipses
kinematic geometry
```

Advantages:
- mathematically accurate
- responsive
- interactive
- theme-aware
- accessible
- sharp on mobile

Use image generation only for supplemental static illustrations such as:

```text
robot anatomy
robot embodiment overview
historical robotics concepts
physical apparatus
hero illustrations
```

---

# 37. Static illustration backlog

If needed later, generate:

1. **Robot Anatomy** — sensors → compute → controller → actuator → environment.
2. **Universal Robotics Pipeline** — Sense → Estimate → Plan → Control → Act → Feedback.
3. **Robot Embodiments** — arm, AMR, UAV, ROV, quadruped.
4. **Coordinate Frames** — world/body/sensor frames on a physical robot.
5. **Differential Drive Anatomy** — wheel radius, wheel separation, velocities, ICC.
6. **2DOF Arm Frames** — base, joint and end-effector frames.

These should supplement, not replace, interactive diagrams.

---

# 38. Agentic implementation contract

For every material:

```text
1. Read curriculum
2. Inspect existing implementation
3. Check whether lesson already exists
4. Reuse simulator where possible
5. Author EN MDX
6. Author matching ID MDX
7. Implement/review pure TypeScript algorithm
8. Implement/reuse laboratory
9. Add ConceptCheck
10. Add references
11. Add navigation
12. Validate EN/ID parity
13. Run tests
14. Run typecheck
15. Run build
16. Update CHANGELOG
```

Required:

```bash
npm test
npm run typecheck
npm run build
```

---

# 39. Content dependency graph

```text
Vectors
  ↓
Dot Product
  ↓
Rotation
  ↓
Coordinate Frames
  ↓
Transform Composition
  ├──→ Forward Kinematics → Inverse Kinematics → Jacobian
  │
  └──→ Differential Drive → Odometry
                          ↓
                     Sensor Noise
                          ↓
                      Probability
                          ↓
                  Bayesian Filtering
                          ↓
                         MCL
```

Planning:

```text
Vectors
 ↓
Path Error
 ↓
PID
 ↓
Pure Pursuit
 ↓
A*/Dijkstra
 ↓
C-Space
 ↓
RRT
```

Perception:

```text
Rotation
 ↓
Frames
 ↓
Sensor Noise
 ↓
LiDAR
 ↓
Occupancy Grid
 ↓
ICP
 ↓
SLAM
```

Multi-agent:

```text
Vectors
 ↓
Graph Concepts
 ↓
Consensus
 ↓
Formation
 ↓
Leader-Follower
 ↓
Distributed Formation Control
```

---

# 40. Final recommendation

Do **not** immediately expand RoboAtlas with another large SLAM/navigation section.

The highest-value work now is:

```text
Mathematics
 ↓
Geometry
 ↓
Transformations
 ↓
Kinematics
 ↓
Sensors
 ↓
Uncertainty
 ↓
Estimation
 ↓
Control
 ↓
Planning
 ↓
Perception
 ↓
SLAM
 ↓
Robot Platforms
 ↓
Multi-Agent
 ↓
Research
```

This makes the platform genuinely general robotics rather than a TypeScript reproduction of PythonRobotics.

The most important first implementation target is:

**M01 → M05**, followed by **M06 → M12**.

Those lessons create the mathematical and physical vocabulary needed by almost everything else in RoboAtlas.
