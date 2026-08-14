# RoboAtlas — Master Robotics Curriculum & Content Organization

## 1. Purpose

This document is the master curriculum specification for RoboAtlas.

RoboAtlas is intended to become an interactive robotics learning platform rather than a collection of disconnected articles.

The curriculum must therefore be organized as a dependency graph:

```text
Fundamentals
     ↓
Mathematics
     ↓
Robot Representation
     ↓
Kinematics
     ↓
Dynamics / Control
     ↓
Sensors & Perception
     ↓
Localization
     ↓
Mapping / SLAM
     ↓
Planning / Navigation
     ↓
Autonomy
     ↓
Advanced Robotics
```

The curriculum should support both:

- beginners who start from zero
- engineering students who already know mathematics/programming
- robotics practitioners who want a focused algorithm reference
- researchers who want deeper mathematical and algorithmic material

---

# 2. Curriculum Philosophy

RoboAtlas should not imitate a conventional textbook chapter-by-chapter.

The learning experience should follow:

```text
Question
   ↓
Intuition
   ↓
Physical Example
   ↓
Mathematical Model
   ↓
Algorithm
   ↓
Visualization
   ↓
Interactive Experiment
   ↓
Implementation
   ↓
Robotics Application
   ↓
Further Reading
```

Every important concept should answer:

1. What problem does it solve?
2. Why does the robot need it?
3. What is the intuition?
4. What is the mathematical representation?
5. Why does the formula have that form?
6. How is the algorithm derived?
7. How does it behave visually?
8. How is it implemented?
9. What are its assumptions?
10. When does it fail?
11. What comes next?

---

# 3. Curriculum Architecture

RoboAtlas should use **learning levels** rather than treating every topic as equally difficult.

```text
LEVEL 0 — Orientation
       ↓
LEVEL 1 — Foundations
       ↓
LEVEL 2 — Mathematical & Computational Tools
       ↓
LEVEL 3 — Robot Modeling
       ↓
LEVEL 4 — Sensing & Perception
       ↓
LEVEL 5 — Localization & Mapping
       ↓
LEVEL 6 — Planning & Navigation
       ↓
LEVEL 7 — Control & Dynamic Robotics
       ↓
LEVEL 8 — Autonomous Systems
       ↓
LEVEL 9 — Advanced Robotics
       ↓
LEVEL 10 — Research & Multi-Agent Robotics
```

---

# 4. Level 0 — Robotics Orientation

## Goal

Answer:

> What is robotics?

The learner should understand the overall architecture before seeing difficult mathematics.

### Lessons

```text
00.1 Introduction to Robotics
00.2 What Makes a Robot Autonomous?
00.3 Sense–Plan–Act
00.4 Robot Hardware
00.5 Robot Software
00.6 Robot Types
00.7 Robotics Problem Decomposition
00.8 How to Learn Robotics
```

### Interactive content

- Sense–Plan–Act explorer
- Robot system diagram
- Robot classification explorer
- simple autonomous robot simulation

### Final project

**Build a Mental Robot**

The learner identifies:

```text
Sensor
State
Planner
Controller
Actuator
Environment
```

---

# 5. Level 1 — Mathematical Foundations

## Goal

Build enough mathematics to understand robotics equations without turning RoboAtlas into a pure mathematics course.

### Module 1 — Mathematical Language

```text
01.1 Scalars
01.2 Units and Dimensions
01.3 Angles and Radians
01.4 Coordinate Planes
01.5 Functions
01.6 Graphs
```

### Module 2 — Vectors

```text
01.7 Vectors
01.8 Vector Magnitude
01.9 Direction
01.10 Vector Addition
01.11 Vector Subtraction
01.12 Normalization
01.13 Dot Product
01.14 Cross Product
```

### Module 3 — Matrices

```text
01.15 Matrices
01.16 Matrix Addition
01.17 Matrix Multiplication
01.18 Matrix–Vector Multiplication
01.19 Identity Matrix
01.20 Inverse
01.21 Determinant
01.22 Rank
```

### Module 4 — Coordinate Transformations

```text
01.23 Coordinate Frames
01.24 2D Rotation
01.25 Rotation Matrices
01.26 Translation
01.27 Homogeneous Coordinates
01.28 Transformation Composition
```

### Module 5 — Calculus for Robotics

```text
01.29 Derivatives
01.30 Integrals
01.31 Position → Velocity → Acceleration
01.32 Numerical Differentiation
01.33 Differential Equations
```

### Module 6 — Probability

```text
01.34 Random Variables
01.35 Mean
01.36 Variance
01.37 Gaussian Distribution
01.38 Conditional Probability
01.39 Bayes' Rule
```

### Module 7 — Optimization

```text
01.40 Cost Functions
01.41 Gradients
01.42 Local vs Global Minimum
01.43 Gradient Descent
01.44 Least Squares
```

### Labs

```text
Vector Lab
Coordinate Frame Lab
Rotation Lab
Matrix Transformation Lab
Position–Velocity–Acceleration Lab
Sensor Noise Lab
Gaussian Distribution Lab
Optimization Lab
```

### Final project

**2D Robot Mathematics Lab**

A robot moves through a coordinate system while the learner observes:

```text
position
orientation
velocity
transformation
noise
cost
```

---

# 6. Level 2 — Computational Foundations

## Goal

Teach the computational concepts required to turn mathematical models into algorithms.

### Module 2.1 — Programming for Robotics

```text
02.1 Variables
02.2 Functions
02.3 Arrays
02.4 Objects
02.5 Classes
02.6 Numerical Programming
02.7 TypeScript for Robotics
02.8 Python for Robotics
```

### Module 2.2 — Algorithms

```text
02.9 Complexity
02.10 Searching
02.11 Sorting
02.12 Recursion
02.13 Graphs
02.14 Trees
02.15 Queues / Stacks
02.16 Priority Queues
02.17 Hash Maps
```

### Module 2.3 — Numerical Computing

```text
02.18 Floating Point
02.19 Numerical Error
02.20 Sampling
02.21 Discretization
02.22 Stability
02.23 Simulation Time Step
```

### Module 2.4 — Graph Theory

```text
02.24 Nodes and Edges
02.25 Weighted Graphs
02.26 Directed Graphs
02.27 Connectivity
02.28 Shortest Path
```

### Labs

- Graph explorer
- BFS/DFS visualizer
- Priority queue visualizer
- numerical error explorer
- sampling explorer

### Final project

**Build a Grid Graph**

The learner creates a grid map and visualizes graph connectivity.

---

# 7. Level 3 — Robot Representation & Modeling

## Goal

Teach how physical robots are represented mathematically.

This level is the bridge between mathematics and actual robot mechanics.

---

## Module 3.1 — Robot Pose

```text
03.1 Position
03.2 Orientation
03.3 Pose
03.4 2D Pose
03.5 3D Pose
03.6 Degrees of Freedom
```

---

## Module 3.2 — Coordinate Frames

```text
03.7 World Frame
03.8 Robot Frame
03.9 Sensor Frame
03.10 Tool Frame
03.11 Frame Transformations
03.12 Transformation Chains
```

---

## Module 3.3 — Rigid Body Transformations

```text
03.13 Rotation
03.14 Translation
03.15 Homogeneous Transformation
03.16 SE(2)
03.17 SE(3)
```

Advanced:

```text
03.18 Exponential Coordinates
03.19 Lie Groups
03.20 Lie Algebra
```

---

## Module 3.4 — Robot Geometry

```text
03.21 Link
03.22 Joint
03.23 Revolute Joint
03.24 Prismatic Joint
03.25 Joint Limits
03.26 Workspace
```

### Labs

- Pose visualizer
- coordinate-frame explorer
- 2D robot arm
- transformation-chain simulator
- workspace visualizer

---

# 8. Level 4 — Kinematics

## Goal

Teach how robot geometry determines motion.

Stanford's CS223A is a useful benchmark for the ordering here: its introductory robotics course covers spatial transformations, forward/inverse kinematics, Jacobians, dynamics, trajectory planning, and control. citeturn0search0turn0search7

---

## Module 4.1 — Forward Kinematics

```text
04.1 What is Kinematics?
04.2 Joint Space
04.3 Cartesian Space
04.4 Forward Kinematics
04.5 2-Link Planar Arm
04.6 3-Link Arm
04.7 Transformation-Based Kinematics
```

---

## Module 4.2 — Denavit–Hartenberg

```text
04.8 DH Parameters
04.9 DH Frames
04.10 DH Table
04.11 Forward Kinematics Using DH
```

---

## Module 4.3 — Inverse Kinematics

```text
04.12 What is Inverse Kinematics?
04.13 Analytical IK
04.14 Multiple Solutions
04.15 Singularities
04.16 Numerical IK
04.17 Jacobian-Based IK
```

---

## Module 4.4 — Jacobian

```text
04.18 Jacobian Intuition
04.19 Velocity Mapping
04.20 Geometric Jacobian
04.21 Analytical Jacobian
04.22 Jacobian Inverse
04.23 Pseudoinverse
04.24 Singularities
```

Stanford's CS223A places Jacobians after the core kinematics material and uses them for instantaneous kinematics and velocity relationships. citeturn0search5

### Labs

- 2-link arm simulator
- FK explorer
- IK explorer
- workspace plot
- Jacobian velocity visualizer
- singularity explorer

### Final project

**Interactive 2D Manipulator**

Input:

```text
joint angles
```

Output:

```text
end-effector position
velocity
workspace
Jacobian
```

---

# 9. Level 5 — Mobile Robot Kinematics

This is a dedicated branch because mobile robotics differs significantly from fixed-base manipulation.

## Module 5.1 — Wheeled Robots

```text
05.1 Differential Drive
05.2 Unicycle Model
05.3 Wheel Velocities
05.4 Robot Velocity
05.5 Forward Kinematics
05.6 Inverse Wheel Kinematics
```

---

## Module 5.2 — Nonholonomic Constraints

```text
05.7 What is a Constraint?
05.8 Holonomic vs Nonholonomic
05.9 No-Slip Constraint
05.10 Differential Drive Constraint
```

---

## Module 5.3 — Other Platforms

```text
05.11 Mecanum Drive
05.12 Omnidirectional Robots
05.13 Ackermann Steering
05.14 Tracked Robots
05.15 Legged Robots
```

### Labs

- differential-drive simulator
- wheel-to-body velocity simulator
- Mecanum velocity simulator
- Ackermann steering simulator

### Final project

**Navigate a Differential-Drive Robot**

---

# 10. Level 6 — Dynamics

## Goal

Move from:

> How does the robot move?

to:

> Why does the robot move that way?

---

## Module 6.1 — Physical Foundations

```text
06.1 Mass
06.2 Force
06.3 Torque
06.4 Momentum
06.5 Energy
06.6 Friction
```

---

## Module 6.2 — Robot Dynamics

```text
06.7 Newton–Euler
06.8 Lagrangian Mechanics
06.9 Kinetic Energy
06.10 Potential Energy
06.11 Equations of Motion
```

Stanford CS223A includes dynamics after kinematics and covers Lagrange equations and robot dynamics. citeturn0search3

---

## Module 6.3 — Practical Dynamics

```text
06.12 Motor Model
06.13 Torque
06.14 Inertia
06.15 Friction
06.16 Load
06.17 Actuator Limits
```

### Labs

- pendulum
- 2-link arm dynamics
- motor torque simulator
- friction experiment

---

# 11. Level 7 — Control Systems for Robotics

## Goal

Teach the robot how to turn desired behavior into physical behavior.

---

## Module 7.1 — Feedback

```text
07.1 Open Loop
07.2 Closed Loop
07.3 Error
07.4 Feedback
07.5 Stability
```

---

## Module 7.2 — PID

```text
07.6 Proportional Control
07.7 Integral Control
07.8 Derivative Control
07.9 PID
07.10 Tuning
07.11 Anti-Windup
```

---

## Module 7.3 — Advanced Control

```text
07.12 State-Space
07.13 Controllability
07.14 Observability
07.15 Pole Placement
07.16 LQR
07.17 Nonlinear Control
07.18 Model Predictive Control
```

Stanford's CS223A explicitly covers trajectory planning, dynamics, and control, including PD control. citeturn0search6turn0search9

### Labs

- PID temperature-like system
- motor speed control
- position control
- trajectory tracking
- LQR simulation
- MPC visualization

### Final project

**Make a Robot Follow a Trajectory**

---

# 12. Level 8 — Sensors & Perception

## Goal

Teach how robots acquire information from the physical world.

Stanford's Principles of Robot Autonomy curriculum provides a useful reference structure here: perception, localization, SLAM, planning, decision-making, uncertainty, and control are treated as connected parts of autonomous robotics. citeturn0search4

---

## Module 8.1 — Sensor Fundamentals

```text
08.1 Sensors
08.2 Sampling
08.3 Noise
08.4 Resolution
08.5 Accuracy
08.6 Precision
08.7 Calibration
```

---

## Module 8.2 — Proprioceptive Sensors

```text
08.8 Encoders
08.9 IMU
08.10 Joint Sensors
08.11 Motor Current
08.12 Force / Torque
```

---

## Module 8.3 — Exteroceptive Sensors

```text
08.13 LiDAR
08.14 Camera
08.15 Stereo Vision
08.16 Depth Camera
08.17 Ultrasonic
08.18 Radar
08.19 GNSS
```

---

## Module 8.4 — Computer Vision

```text
08.20 Image Formation
08.21 Pixels
08.22 Color
08.23 Filtering
08.24 Edges
08.25 Features
08.26 Optical Flow
08.27 Stereo
08.28 Object Detection
```

### Labs

- sensor noise lab
- LiDAR ray simulator
- camera projection simulator
- stereo depth simulator
- feature detection demo

---

# 13. Level 9 — State Estimation & Localization

## Goal

Answer:

> Where am I, and how certain am I?

---

## Module 9.1 — Probability for Robotics

```text
09.1 Random Variables
09.2 Probability Density
09.3 Bayes Rule
09.4 Conditional Probability
09.5 Gaussian
09.6 Covariance
```

---

## Module 9.2 — Odometry

```text
09.7 Wheel Odometry
09.8 IMU Odometry
09.9 Dead Reckoning
09.10 Drift
```

---

## Module 9.3 — Bayesian Estimation

```text
09.11 Bayes Filter
09.12 Prediction
09.13 Measurement Update
09.14 Sensor Fusion
```

---

## Module 9.4 — Kalman Filters

```text
09.15 Kalman Filter Intuition
09.16 Prediction
09.17 Update
09.18 Covariance
09.19 Extended Kalman Filter
09.20 Unscented Kalman Filter
```

---

## Module 9.5 — Particle Filters

```text
09.21 Particle Representation
09.22 Sampling
09.23 Importance Weighting
09.24 Resampling
09.25 Monte Carlo Localization
```

### Labs

- Bayesian update simulator
- Kalman filter visualizer
- EKF robot localization
- particle filter localization

### Final project

**Localize a Robot in a Known Map**

---

# 14. Level 10 — Mapping & SLAM

## Goal

Teach how robots construct and use maps.

---

## Module 10.1 — Mapping

```text
10.1 Occupancy Grid
10.2 Grid Maps
10.3 Point Clouds
10.4 Feature Maps
10.5 Topological Maps
```

---

## Module 10.2 — Scan Matching

```text
10.6 ICP
10.7 Scan Matching
10.8 Point Cloud Alignment
```

---

## Module 10.3 — SLAM

```text
10.9 Why SLAM?
10.10 Landmark SLAM
10.11 EKF-SLAM
10.12 Graph SLAM
10.13 Pose Graphs
10.14 Loop Closure
10.15 Visual SLAM
10.16 LiDAR SLAM
```

### Labs

- occupancy grid builder
- LiDAR mapping simulator
- ICP visualizer
- pose graph
- loop closure
- simplified SLAM simulator

### Final project

**Build a Map While Localizing**

---

# 15. Level 11 — Path Planning

This is one of the core RoboAtlas branches and should be strongly connected to the PythonRobotics inspiration.

---

## Module 11.1 — Graph Search

```text
11.1 Graph Representation
11.2 BFS
11.3 DFS
11.4 Dijkstra
11.5 A*
11.6 Heuristics
```

---

## Module 11.2 — Grid Planning

```text
11.7 Occupancy Grid
11.8 Grid Search
11.9 Costmaps
11.10 Obstacle Inflation
```

---

## Module 11.3 — Sampling-Based Planning

```text
11.11 Configuration Space
11.12 PRM
11.13 RRT
11.14 RRT*
11.15 Kinodynamic Planning
```

---

## Module 11.4 — Optimization-Based Planning

```text
11.16 Cost Functions
11.17 Trajectory Optimization
11.18 Smoothness
11.19 Collision Cost
11.20 Constraint Optimization
```

### Labs

- BFS visualizer
- Dijkstra visualizer
- A* visualizer
- heuristic comparison
- RRT explorer
- RRT* explorer
- obstacle inflation explorer

### Final project

**Plan a Collision-Free Path**

---

# 16. Level 12 — Motion Planning & Navigation

Path planning alone is not enough.

The robot must actually execute a feasible trajectory.

---

## Module 12.1 — Path vs Trajectory

```text
12.1 Path
12.2 Trajectory
12.3 Time Parameterization
12.4 Velocity Profile
12.5 Acceleration Limits
```

---

## Module 12.2 — Local Planning

```text
12.6 Local Planner
12.7 Dynamic Window Approach
12.8 Velocity Obstacles
12.9 Collision Checking
```

---

## Module 12.3 — Navigation Architecture

```text
Global Planner
      ↓
Local Planner
      ↓
Controller
      ↓
Robot
```

### Labs

- trajectory generator
- DWA simulator
- obstacle avoidance
- global/local planner comparison

### Final project

**Autonomous Navigation in a Dynamic Environment**

---

# 17. Level 13 — Autonomous Systems

## Goal

Move from individual algorithms to complete robotic systems.

Stanford's Principles of Robot Autonomy course is a useful benchmark because it combines perception, localization, SLAM, planning, decision-making, uncertainty, nonlinear control, learning-based control, and ROS-based hands-on work. citeturn0search4

---

## Module 13.1 — Architecture

```text
Sensors
   ↓
Perception
   ↓
State Estimation
   ↓
World Model
   ↓
Planning
   ↓
Decision
   ↓
Control
   ↓
Actuation
```

---

## Module 13.2 — Behavior

```text
13.1 Finite State Machines
13.2 Behavior Trees
13.3 Task Planning
13.4 Mission Planning
```

---

## Module 13.3 — Decision Making

```text
13.5 Utility
13.6 Cost
13.7 MDP
13.8 POMDP
13.9 Decision Under Uncertainty
```

### Final project

**Build a Complete Autonomous Robot**

---

# 18. Level 14 — Robot Operating System & Robotics Software

ROS should be introduced after learners understand the underlying robotics concepts.

Do not make ROS the foundation of the entire curriculum.

---

## Module 14.1 — ROS Concepts

```text
14.1 Nodes
14.2 Topics
14.3 Services
14.4 Actions
14.5 Messages
14.6 Parameters
14.7 TF / Frames
```

---

## Module 14.2 — Robotics Software

```text
14.8 Simulation
14.9 Logging
14.10 Visualization
14.11 Sensor Drivers
14.12 Navigation Stack
14.13 Launch Systems
14.14 Package Architecture
```

### Labs

- ROS publisher/subscriber
- TF explorer
- simulated LiDAR
- simulated differential-drive robot
- navigation pipeline

---

# 19. Level 15 — Manipulation Robotics

A separate branch for robotic arms.

---

## Module 15.1 — Manipulator Fundamentals

```text
15.1 Links
15.2 Joints
15.3 DOF
15.4 Workspace
15.5 End Effector
```

---

## Module 15.2 — Kinematics

```text
15.6 Forward Kinematics
15.7 Inverse Kinematics
15.8 DH Parameters
15.9 Jacobian
```

---

## Module 15.3 — Dynamics

```text
15.10 Newton-Euler
15.11 Lagrangian
15.12 Gravity
15.13 Inertia
```

---

## Module 15.4 — Manipulation Control

```text
15.14 Joint Control
15.15 Cartesian Control
15.16 Operational Space
15.17 Force Control
15.18 Impedance Control
```

Stanford's current CS223A explicitly emphasizes spatial transformations, FK/IK, Jacobians, dynamics, joint/Cartesian/operational-space control, force control, and vision-based control. citeturn0search2

---

# 20. Level 16 — Aerial Robotics

```text
16.1 3D Motion
16.2 Attitude
16.3 Roll / Pitch / Yaw
16.4 Quadrotor Model
16.5 Thrust
16.6 Flight Dynamics
16.7 Position Control
16.8 Attitude Control
16.9 Trajectory Planning
16.10 Visual-Inertial Navigation
```

### Labs

- quadrotor attitude simulator
- thrust allocation
- trajectory tracking

---

# 21. Level 17 — Legged Robotics

```text
17.1 Legged Locomotion
17.2 Contact
17.3 Gait
17.4 Stability
17.5 ZMP
17.6 Inverse Kinematics
17.7 Whole-Body Control
17.8 Quadruped Locomotion
17.9 Humanoid Robotics
```

---

# 22. Level 18 — Learning-Based Robotics

Machine learning should be introduced after classical robotics foundations.

---

## Module 18.1 — Machine Learning Foundations

```text
18.1 Dataset
18.2 Features
18.3 Training
18.4 Validation
18.5 Regression
18.6 Classification
```

---

## Module 18.2 — Deep Learning for Robotics

```text
18.7 Neural Networks
18.8 CNN
18.9 Object Detection
18.10 Semantic Segmentation
18.11 Depth Estimation
```

---

## Module 18.3 — Learning Control

```text
18.12 Imitation Learning
18.13 Reinforcement Learning
18.14 Policy
18.15 Reward
18.16 Model-Based RL
18.17 Sim-to-Real
```

---

# 23. Level 19 — Multi-Agent Robotics

This should become one of RoboAtlas's advanced/specialized branches.

```text
19.1 Multi-Agent Systems
19.2 Agent Modeling
19.3 Consensus
19.4 Formation Control
19.5 Leader-Follower
19.6 Flocking
19.7 Distributed Estimation
19.8 Multi-Robot Localization
19.9 Cooperative Mapping
19.10 Multi-Robot Exploration
19.11 Task Allocation
19.12 Multi-Agent Path Planning
19.13 Collision Avoidance
19.14 Swarm Robotics
```

### Labs

- consensus simulator
- formation simulator
- leader-follower
- multi-robot exploration
- distributed coverage

### Final project

**Multi-Robot Exploration**

---

# 24. Level 20 — Advanced / Research Robotics

This level should not be required for beginners.

Topics may include:

```text
20.1 Lie Groups
20.2 SE(2) / SE(3)
20.3 Manifold Optimization
20.4 Factor Graphs
20.5 Bundle Adjustment
20.6 Nonlinear Observers
20.7 Nonlinear Control
20.8 MPC
20.9 Optimal Control
20.10 Belief-Space Planning
20.11 POMDP
20.12 Active SLAM
20.13 Information-Theoretic Planning
20.14 Multi-Agent Estimation
20.15 Distributed Optimization
20.16 Formal Methods
20.17 Safety-Critical Control
20.18 Human-Robot Interaction
```

---

# 25. Curriculum Tracks

Do not force every learner through the entire curriculum linearly.

Provide tracks.

---

## Track A — Robotics Beginner

```text
Introduction
   ↓
Mathematics
   ↓
Robot Representation
   ↓
Mobile Robot Kinematics
   ↓
Sensors
   ↓
Localization
   ↓
Planning
   ↓
Navigation
```

---

## Track B — Robotic Manipulation

```text
Mathematics
   ↓
Frames
   ↓
Kinematics
   ↓
Jacobian
   ↓
Dynamics
   ↓
Control
   ↓
Manipulation
```

---

## Track C — Autonomous Mobile Robot

```text
Mathematics
   ↓
Mobile Kinematics
   ↓
Sensors
   ↓
Odometry
   ↓
Localization
   ↓
Mapping
   ↓
SLAM
   ↓
Planning
   ↓
Navigation
```

---

## Track D — Robotics Research

```text
All Foundations
   ↓
Advanced Mathematics
   ↓
Probabilistic Robotics
   ↓
Optimization
   ↓
Advanced Planning
   ↓
Advanced Control
   ↓
Research Topic
```

---

## Track E — Multi-Agent Robotics

```text
Foundations
   ↓
Control
   ↓
Mobile Robotics
   ↓
Graph Theory
   ↓
Consensus
   ↓
Formation Control
   ↓
Distributed Estimation
   ↓
Exploration
   ↓
Multi-Agent Planning
```

---

# 26. Content Types

Every RoboAtlas topic should be categorized.

## Concept

Short explanation.

Example:

```text
What is a vector?
```

## Lesson

Complete educational unit.

Example:

```text
Introduction to Robotics
```

## Mathematical Derivation

Focused mathematical explanation.

Example:

```text
Deriving the 2D rotation matrix
```

## Algorithm

Detailed algorithm explanation.

Example:

```text
A*
```

## Interactive Lab

Experiment.

Example:

```text
A* Path Planning Lab
```

## Simulator

Reusable interactive system.

Example:

```text
Differential Drive Simulator
```

## Reference

Short technical reference.

Example:

```text
Rotation Matrix Reference
```

## Project

Integrated learning activity.

Example:

```text
Build a Mobile Robot Navigator
```

---

# 27. Lesson Difficulty

Use four levels:

```text
beginner
intermediate
advanced
research
```

### Beginner

Assume little robotics knowledge.

### Intermediate

Assume mathematics and basic robotics.

### Advanced

Assume substantial robotics background.

### Research

Assume graduate-level mathematics and robotics.

---

# 28. Lesson Duration

Use approximate:

```text
micro     5–10 min
short    10–20 min
medium   20–40 min
long     40–90 min
deep     90+ min
```

Do not make every lesson long.

---

# 29. Learning Objectives

Every lesson must define explicit outcomes.

Example:

```yaml
learningObjectives:
  - Explain the meaning of a coordinate frame.
  - Calculate a 2D rotation.
  - Compose two transformations.
  - Interpret a transformation geometrically.
```

---

# 30. Prerequisites

Every non-foundational lesson should have prerequisites.

Example:

```yaml
prerequisites:
  - mathematical-foundations
  - coordinate-frames
```

Prerequisites form a graph.

```text
math
 ├── kinematics
 │      └── control
 │
 ├── probability
 │      └── localization
 │
 └── graph theory
        └── planning
```

---

# 31. Recommended Lesson Template

Every major lesson should follow:

```text
1. Problem
2. Why It Matters
3. Intuition
4. Physical Example
5. Mathematical Representation
6. Formula
7. Why the Formula Works
8. Derivation
9. Visualization
10. Interactive Lab
11. Algorithm
12. TypeScript Implementation
13. Experiment
14. Failure Cases
15. Applications
16. Concept Check
17. Summary
18. Next Lesson
19. References
```

Not every section must appear, but this is the default structure.

---

# 32. Mathematics Rule

For every important equation:

```text
Formula
   ↓
Variables
   ↓
Units
   ↓
Intuition
   ↓
Derivation
   ↓
Physical meaning
   ↓
Robotics application
```

Never introduce a major equation without explaining why it exists.

---

# 33. Graph Rule

Graphs should be used when they improve understanding.

Examples:

```text
Vector → coordinate graph
Rotation → trajectory graph
Velocity → time series
Probability → distribution
Optimization → cost curve
Planning → graph/grid
SLAM → map
Control → response curve
```

Do not create graphs only because the lesson is technical.

---

# 34. Simulation Rule

A simulator should answer one clear question.

Examples:

```text
A* simulator:
"What happens when the heuristic changes?"

Kalman simulator:
"What happens when sensor noise increases?"

PID simulator:
"What happens when Kp increases?"

RRT simulator:
"How does sampling explore the configuration space?"

SLAM simulator:
"How does loop closure correct drift?"
```

---

# 35. Lab Structure

Every lab should contain:

```text
Lab title

Objective

Scenario

Controls

Expected observation

Experiment steps

Questions

Explanation

Takeaway
```

Example:

```text
## Lab — A* Heuristic

Objective:
Understand the effect of heuristic choice.

Controls:
- obstacle density
- heuristic weight
- start
- goal

Observe:
- nodes explored
- path length
- computation time

Questions:
1. What happens when h(n)=0?
2. What happens when h(n) becomes larger?
3. Does the path remain optimal?
```

---

# 36. Algorithm Content Structure

Every algorithm should explain:

```text
Problem
Input
Output
Intuition
Data Structure
Algorithm Steps
Mathematics
Pseudocode
Complexity
Visualization
Interactive Simulation
Implementation
Example
Failure Cases
Applications
Variants
References
```

---

# 37. PythonRobotics Integration

PythonRobotics should be treated as an **algorithm reference and implementation inspiration**, not as the curriculum structure itself.

For each relevant algorithm:

```text
PythonRobotics
      ↓
Understand implementation
      ↓
Explain algorithm independently
      ↓
Create TypeScript implementation
      ↓
Create visualization
      ↓
Create interactive lab
      ↓
Reference source
```

Do not simply translate PythonRobotics code into TypeScript line-by-line.

The learner should understand the algorithm first.

---

# 38. Source Hierarchy

Preferred sources:

### Tier 1

- textbooks
- university courses
- peer-reviewed papers
- official documentation

### Tier 2

- high-quality open educational resources
- established robotics projects
- official project documentation

### Tier 3

- tutorials
- blogs
- community explanations

Use lower-tier sources for supplementary intuition, not as the sole authority for important mathematical claims.

---

# 39. Primary RoboAtlas Books

The curriculum should use these as major references:

```text
Elements of Robotics
Foundations of Robotics
Planning Algorithms
```

They should not dictate the entire structure.

RoboAtlas should synthesize multiple authoritative sources.

---

# 40. External Academic Anchors

Useful curriculum anchors include:

### Stanford CS223A

Useful for:

```text
Spatial transformations
Kinematics
Jacobian
Dynamics
Trajectory planning
Control
```

Stanford describes CS223A as covering modeling, design, planning, and control and explicitly organizes its materials around kinematics, Jacobians, trajectory planning, dynamics, and control. citeturn0search0

### Stanford Principles of Robot Autonomy

Useful for:

```text
Perception
Localization
SLAM
Planning
Decision-making
Uncertainty
Control
Learning
ROS
```

The course explicitly combines these topics and expects linear algebra and probability foundations. citeturn0search4turn0search10

---

# 41. Project Ladder

RoboAtlas should gradually increase project complexity.

## Project 1

**2D Robot Coordinate Explorer**

Learn:

```text
position
orientation
vectors
```

## Project 2

**Differential Drive Simulator**

Learn:

```text
kinematics
velocity
odometry
```

## Project 3

**PID Trajectory Tracker**

Learn:

```text
feedback
error
control
```

## Project 4

**LiDAR Mapping**

Learn:

```text
sensor
coordinate frame
mapping
```

## Project 5

**Robot Localization**

Learn:

```text
odometry
probability
Kalman / particle filter
```

## Project 6

**A* Navigation**

Learn:

```text
graphs
planning
cost
heuristics
```

## Project 7

**RRT Motion Planning**

Learn:

```text
configuration space
sampling
collision checking
```

## Project 8

**SLAM**

Learn:

```text
localization
mapping
loop closure
```

## Project 9

**Autonomous Navigation**

Integrate:

```text
sensors
localization
mapping
planning
control
```

## Project 10

**Multi-Robot Exploration**

Integrate:

```text
multi-agent
communication
formation
exploration
planning
```

---

# 42. Capstone Projects

RoboAtlas should eventually have major capstones.

## Capstone A — Autonomous Warehouse Robot

```text
LiDAR
   ↓
Localization
   ↓
Map
   ↓
Global Planning
   ↓
Local Planning
   ↓
Control
```

## Capstone B — Robotic Arm

```text
Pose
 ↓
FK
 ↓
IK
 ↓
Trajectory
 ↓
Dynamics
 ↓
Control
```

## Capstone C — Autonomous Drone

```text
IMU
 ↓
State Estimation
 ↓
3D Planning
 ↓
Trajectory
 ↓
Flight Control
```

## Capstone D — Multi-Robot Exploration

```text
Multiple Robots
      ↓
Distributed Localization
      ↓
Map Sharing
      ↓
Exploration
      ↓
Task Allocation
```

---

# 43. Content Dependency Graph

The website should eventually generate a visual learning graph.

Example:

```text
                    Introduction
                         │
                 Mathematical Basics
                         │
             ┌───────────┴───────────┐
             │                       │
        Robot Frames             Probability
             │                       │
        Kinematics              Estimation
             │                       │
        ┌────┴────┐              Localization
        │         │                   │
   Manipulator  Mobile               SLAM
   Kinematics  Kinematics              │
        │         │                    │
     Control    Planning ──────────────┘
        │         │
        └────┬────┘
             │
        Autonomous Robot
```

This graph should be interactive.

A learner can click a node and see:

```text
What is this?
Prerequisites
Lessons
Labs
Projects
Next topics
```

---

# 44. Curriculum Navigation

The UI should provide three navigation modes.

## Explore

Browse by topic.

```text
Robotics
 ├── Mathematics
 ├── Kinematics
 ├── Sensors
 ├── Planning
 └── Control
```

## Learn

Follow prerequisites.

```text
Current lesson
   ↓
Recommended next
   ↓
Next
```

## Build

Start from projects.

```text
"I want to build a navigation robot."
          ↓
Required concepts
          ↓
Lessons
          ↓
Labs
          ↓
Project
```

---

# 45. Content Status

Every lesson should have a development status.

```yaml
status: draft
```

Allowed:

```text
draft
review
stable
deprecated
```

Optional:

```text
experimental
```

---

# 46. Content Quality Levels

Every lesson may also have:

```yaml
contentLevel: foundational
```

Allowed:

```text
orientation
foundational
core
advanced
research
```

---

# 47. Review System

A lesson should be considered `stable` only when:

```text
Technical correctness
        +
Mathematical correctness
        +
Educational clarity
        +
Interactive correctness
        +
References
        +
ID/EN parity
        +
Accessibility
        +
Responsive UI
```

are satisfied.

---

# 48. Agentic Content Workflow

When the agent receives a book/PDF:

```text
PDF
 ↓
Identify relevant concepts
 ↓
Map concepts to curriculum
 ↓
Check existing lessons
 ↓
Determine whether lesson exists
 ↓
Create / extend / split lesson
 ↓
Write original explanation
 ↓
Add mathematics
 ↓
Add derivation
 ↓
Add visualization
 ↓
Add lab
 ↓
Add references
 ↓
Update dependency graph
 ↓
Create/update ID
 ↓
Create/update EN
 ↓
Validate
 ↓
Git diff
```

---

# 49. Avoid Duplicate Content

Before creating a lesson, the agent must search the curriculum.

Example:

If:

```text
Coordinate Frames
```

already exists, do not create:

```text
Understanding Coordinate Systems
```

with the same material.

Instead:

```text
Expand existing lesson
```

or:

```text
Create a specialized lesson
```

such as:

```text
Coordinate Frames for LiDAR
```

---

# 50. Content Splitting Rule

Split a lesson when:

- it exceeds reasonable beginner cognitive load
- it introduces a new prerequisite
- it contains multiple distinct algorithms
- the interactive simulation becomes a separate learning objective
- the mathematics becomes substantially more advanced

Example:

Instead of:

```text
Everything About Localization
```

use:

```text
Odometry
Probability for Localization
Bayesian Localization
Kalman Filter
Particle Filter
Monte Carlo Localization
```

---

# 51. Content Linking

Every lesson should expose:

```yaml
relatedLessons:
  - ...
```

and:

```yaml
nextLessons:
  - ...
```

The application should automatically generate:

```text
Prerequisites
Related
Continue Learning
```

---

# 52. Recommended Initial MVP Curriculum

Do not build the entire curriculum immediately.

The first public RoboAtlas version should contain approximately:

```text
Level 0
  1–3 lessons

Level 1
  5–8 lessons

Level 3
  3–5 lessons

Level 5
  3–5 lessons

Level 8
  3–5 lessons

Level 9
  3–5 lessons

Level 11
  5–8 lessons
```

The goal is to demonstrate the complete learning loop:

```text
Concept
 ↓
Math
 ↓
Visualization
 ↓
Algorithm
 ↓
Simulation
 ↓
Project
```

rather than having hundreds of incomplete lessons.

---

# 53. Suggested First 20 Lessons

For the initial content build:

```text
01 Introduction to Robotics
02 Mathematical Foundations
03 Coordinate Systems & Frames
04 Vectors for Robotics
05 Matrices & Transformations
06 2D Rotation & Pose
07 Differential Drive Kinematics
08 Odometry
09 Sensors & Measurement
10 Sensor Noise & Uncertainty
11 Probability for Robotics
12 Bayes Filter
13 Kalman Filter
14 Occupancy Grid Mapping
15 Introduction to Path Planning
16 BFS & Dijkstra
17 A* Path Planning
18 RRT & RRT*
19 PID Trajectory Control
20 Autonomous Navigation
```

This sequence creates a coherent first learning path.

---

# 54. First Major RoboAtlas Milestone

The first major milestone should be:

> **A learner can understand and simulate a simple autonomous mobile robot from zero.**

The learner should progress:

```text
Introduction
   ↓
Mathematics
   ↓
Coordinate Frames
   ↓
Differential Drive
   ↓
Odometry
   ↓
Sensors
   ↓
Localization
   ↓
Mapping
   ↓
A*
   ↓
Control
   ↓
Autonomous Navigation
```

At the end, the learner should have a working conceptual model of an autonomous robot.

---

# 55. Final Curriculum Principle

RoboAtlas should not ask:

> "What articles should we publish?"

It should ask:

> "What does a learner need to understand next?"

Therefore every new content proposal should be evaluated against:

```text
Where does this concept belong?
What are its prerequisites?
What does it unlock?
Does it duplicate existing content?
What visualization does it need?
What lab demonstrates it?
What project uses it?
What should the learner learn next?
```

The curriculum is therefore a **knowledge graph**, not a blog.

---

# 56. Final Architecture

The long-term RoboAtlas structure:

```text
                         ROBOATLAS
                             │
             ┌───────────────┼───────────────┐
             │               │               │
          Concepts         Labs            Projects
             │               │               │
             └───────────────┼───────────────┘
                             │
                           MDX
                             │
                    Interactive Components
                             │
                    TypeScript Algorithms
                             │
                    Simulation / Visualization
                             │
                         References
                             │
                       Learning Graph
                             │
                           GitHub
                             │
                       GitHub Pages
```

The goal is to make RoboAtlas:

> **An interactive, mathematically grounded, project-oriented robotics textbook that grows as a version-controlled knowledge base.**
