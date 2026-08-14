# RoboAtlas — Master Curriculum
## Robotics Learning Architecture, Domains, Levels, Modules, Lessons, Labs & Projects

> **Status:** Master Curriculum Specification  
> **Version:** 1.0  
> **Purpose:** Single source of truth for RoboAtlas content organization  
> **Format:** Markdown / repository documentation  
> **Primary content format:** MDX  
> **Languages:** Indonesian (`id`) and English (`en`)

---

# 1. Purpose

This document is the **master curriculum and content architecture** for RoboAtlas.

RoboAtlas is not intended to be a conventional blog or a collection of unrelated robotics articles.

It is an:

> **Interactive, mathematically grounded, project-oriented robotics learning platform.**

The curriculum must therefore organize knowledge as a structured learning system:

```text
LEVEL
  ↓
DOMAIN
  ↓
MODULE
  ↓
LESSON
  ↓
LAB
  ↓
PROJECT
  ↓
CAPSTONE
```

The curriculum must support:

- complete beginners
- engineering students
- robotics practitioners
- university learners
- developers learning robotics
- researchers
- advanced multi-agent robotics learners

---

# 2. Core Curriculum Philosophy

RoboAtlas should not ask:

> "What articles should we publish?"

It should ask:

> "What does the learner need to understand next?"

Every concept must have a reason for existing in the curriculum.

The default learning flow is:

```text
Problem
   ↓
Why does it matter?
   ↓
Physical intuition
   ↓
Mathematical representation
   ↓
Formula
   ↓
Derivation
   ↓
Visualization
   ↓
Interactive experiment
   ↓
Algorithm
   ↓
Implementation
   ↓
Failure cases
   ↓
Real-world application
   ↓
Project
```

This sequence is the central pedagogical principle of RoboAtlas.

---

# 3. Curriculum Hierarchy

RoboAtlas uses six primary content layers.

```text
LEVEL
  │
  ├── DOMAIN
  │     │
  │     └── MODULE
  │           │
  │           └── LESSON
  │                 │
  │                 ├── LAB
  │                 │
  │                 └── PROJECT
  │
  └── MILESTONE
```

## 3.1 Level

A **Level** represents increasing technical depth.

There are exactly 21 levels:

```text
Level 0 → Level 20
```

Levels represent learning progression, not publication order.

---

## 3.2 Domain

A **Domain** represents a robotics discipline.

Examples:

```text
Kinematics
Localization
Mapping
SLAM
Path Planning
Control
Multi-Agent Robotics
Manipulation
Aerial Robotics
```

A domain may span multiple levels.

---

## 3.3 Module

A Module groups closely related concepts inside a domain.

Example:

```text
Domain: Localization

Module:
Bayesian Estimation

Lessons:
- Bayes Filter
- Measurement Update
- Prediction Step
- Sensor Fusion
```

---

## 3.4 Lesson

A Lesson is the primary educational unit.

A lesson should answer one coherent learning objective.

Avoid lessons that attempt to explain an entire domain.

Bad:

```text
Everything About SLAM
```

Better:

```text
Why SLAM Is Difficult
EKF-SLAM
FastSLAM
Pose Graph SLAM
Loop Closure
```

---

## 3.5 Lab

A Lab is an interactive experiment.

The learner changes parameters and observes the effect.

Example:

```text
A* Path Planning Lab

Controls:
- obstacle density
- heuristic
- start
- goal

Observe:
- nodes explored
- path length
- computation time
```

---

## 3.6 Project

A Project combines multiple concepts.

Example:

```text
Project:
Build a Differential-Drive Navigator

Uses:
- vectors
- coordinate frames
- kinematics
- odometry
- planning
- control
```

---

# 4. Milestones Are Not Levels

This is an important architectural rule.

Do **not** use Milestone numbers as the curriculum hierarchy.

Levels describe:

> **What the learner is learning.**

Milestones describe:

> **What the learner is now capable of building or explaining.**

Example:

```text
LEVEL 0
Introduction

LEVEL 1
Mathematics

LEVEL 2
Coordinate Frames

LEVEL 3
Kinematics

...

MILESTONE
Can model and simulate a mobile robot
```

---

# 5. Master Level Map

RoboAtlas has the following 21 levels.

```text
LEVEL 0
Robotics Orientation

LEVEL 1
Mathematical & Geometric Foundations

LEVEL 2
Coordinate Frames & Transformations

LEVEL 3
Robot Modeling & Kinematics

LEVEL 4
Robot Motion & Differential Geometry

LEVEL 5
Sensors & Perception

LEVEL 6
Path & Trajectory Planning

LEVEL 7
Robot Dynamics & Control

LEVEL 8
Localization & State Estimation

LEVEL 9
Mapping

LEVEL 10
SLAM

LEVEL 11
Navigation

LEVEL 12
Autonomous Systems

LEVEL 13
Robotics Software & ROS

LEVEL 14
Manipulation Robotics

LEVEL 15
Aerial Robotics

LEVEL 16
Legged Robotics

LEVEL 17
Learning-Based Robotics

LEVEL 18
Multi-Agent Robotics

LEVEL 19
Advanced Robotics Mathematics & Algorithms

LEVEL 20
Robotics Research & Emerging Topics
```

---

# 6. LEVEL 0 — Robotics Orientation

## Objective

Introduce robotics as an interdisciplinary field.

The learner should understand:

```text
Robot
Sensor
Computation
Actuator
Environment
Autonomy
Feedback
```

## Modules

### 0.1 Introduction to Robotics

```text
0.1.1 What Is Robotics?
0.1.2 What Is a Robot?
0.1.3 Robot vs Automation
0.1.4 Autonomous Systems
```

### 0.2 Robot Architecture

```text
0.2.1 Sense–Plan–Act
0.2.2 Sensors
0.2.3 State
0.2.4 Planning
0.2.5 Control
0.2.6 Actuation
```

### 0.3 Robot Types

```text
0.3.1 Manipulators
0.3.2 Mobile Robots
0.3.3 Aerial Robots
0.3.4 Marine Robots
0.3.5 Legged Robots
```

### 0.4 Robotics as an Interdisciplinary Field

```text
0.4.1 Mathematics
0.4.2 Mechanics
0.4.3 Electronics
0.4.4 Control
0.4.5 Computer Science
0.4.6 Artificial Intelligence
```

## Labs

```text
Sense–Plan–Act Explorer
Robot Architecture Explorer
Robot Classification Explorer
```

## Project

```text
Project 0:
Design a Conceptual Autonomous Robot
```

---

# 7. LEVEL 1 — Mathematical & Geometric Foundations

## Objective

Teach mathematics specifically because robotics needs it.

## Modules

### 1.1 Mathematical Language

```text
1.1.1 Scalars
1.1.2 Units
1.1.3 Dimensions
1.1.4 Angles
1.1.5 Radians
1.1.6 Functions
1.1.7 Graphs
```

### 1.2 Vectors

```text
1.2.1 Vector Representation
1.2.2 Magnitude
1.2.3 Direction
1.2.4 Vector Addition
1.2.5 Vector Subtraction
1.2.6 Normalization
1.2.7 Dot Product
1.2.8 Cross Product
```

### 1.3 Matrices

```text
1.3.1 Matrix Representation
1.3.2 Matrix Addition
1.3.3 Matrix Multiplication
1.3.4 Matrix–Vector Multiplication
1.3.5 Identity Matrix
1.3.6 Determinant
1.3.7 Inverse
1.3.8 Rank
```

### 1.4 Calculus

```text
1.4.1 Functions of Time
1.4.2 Derivative
1.4.3 Integral
1.4.4 Position
1.4.5 Velocity
1.4.6 Acceleration
1.4.7 Differential Equations
```

### 1.5 Probability

```text
1.5.1 Random Variables
1.5.2 Probability
1.5.3 Probability Density
1.5.4 Mean
1.5.5 Variance
1.5.6 Gaussian Distribution
1.5.7 Conditional Probability
1.5.8 Bayes Rule
```

### 1.6 Optimization

```text
1.6.1 Cost Function
1.6.2 Gradient
1.6.3 Local Minimum
1.6.4 Global Minimum
1.6.5 Gradient Descent
1.6.6 Least Squares
```

## Labs

```text
Vector Lab
Coordinate Plane Lab
Matrix Transformation Lab
Position–Velocity–Acceleration Lab
Probability Distribution Lab
Optimization Lab
```

## Project

```text
2D Robot Mathematics Laboratory
```

---

# 8. LEVEL 2 — Coordinate Frames & Transformations

## Objective

Teach how robots describe position and orientation.

## Modules

### 2.1 Coordinate Systems

```text
2.1.1 Cartesian Coordinates
2.1.2 Polar Coordinates
2.1.3 World Frame
2.1.4 Robot Frame
2.1.5 Sensor Frame
```

### 2.2 2D Transformations

```text
2.2.1 Translation
2.2.2 Rotation
2.2.3 Rotation Matrix
2.2.4 Homogeneous Coordinates
2.2.5 Homogeneous Transformation
2.2.6 Inverse Transformation
2.2.7 Transformation Composition
```

### 2.3 3D Geometry

```text
2.3.1 3D Coordinates
2.3.2 Roll
2.3.3 Pitch
2.3.4 Yaw
2.3.5 Euler Angles
2.3.6 Axis–Angle
2.3.7 Quaternions
```

### 2.4 Rigid Transformations

```text
2.4.1 SE(2)
2.4.2 SE(3)
2.4.3 Frame Chains
2.4.4 Relative Pose
```

## Labs

```text
Coordinate Frame Explorer
2D Rotation Lab
Transformation Chain Lab
Euler Angle Explorer
Quaternion Rotation Lab
```

## Project

```text
Build a Multi-Frame Robot
```

---

# 9. LEVEL 3 — Robot Modeling & Kinematics

## Objective

Understand how robot geometry determines configuration and motion.

## Modules

### 3.1 Robot Configuration

```text
3.1.1 Configuration
3.1.2 Degrees of Freedom
3.1.3 Joint
3.1.4 Link
3.1.5 Joint Limits
3.1.6 Configuration Space
```

### 3.2 Forward Kinematics

```text
3.2.1 Kinematics
3.2.2 Forward Kinematics
3.2.3 Planar Manipulator
3.2.4 Transformation-Based Kinematics
3.2.5 DH Parameters
3.2.6 DH Convention
```

### 3.3 Inverse Kinematics

```text
3.3.1 Inverse Kinematics
3.3.2 Analytical IK
3.3.3 Multiple Solutions
3.3.4 Numerical IK
3.3.5 IK Constraints
3.3.6 Singularities
```

### 3.4 Jacobian

```text
3.4.1 Jacobian Intuition
3.4.2 Velocity Mapping
3.4.3 Geometric Jacobian
3.4.4 Analytical Jacobian
3.4.5 Pseudoinverse
3.4.6 Jacobian Singularities
```

### 3.5 Mobile Robot Kinematics

```text
3.5.1 Differential Drive
3.5.2 Unicycle Model
3.5.3 Wheel Velocity
3.5.4 Body Velocity
3.5.5 Mecanum Drive
3.5.6 Ackermann Steering
```

## Labs

```text
2-Link Arm FK
2-Link Arm IK
Jacobian Visualizer
Workspace Explorer
Differential-Drive Simulator
Mecanum Velocity Simulator
```

## Project

```text
Build a Differential-Drive Robot Simulator
```

---

# 10. LEVEL 4 — Robot Motion & Differential Geometry

## Objective

Connect kinematics to continuous motion and physical constraints.

## Modules

```text
4.1 Position vs Velocity
4.2 Body Velocity
4.3 World Velocity
4.4 Differential Motion
4.5 Velocity Fields
4.6 Nonholonomic Constraints
4.7 Holonomic Constraints
4.8 Configuration-Space Motion
4.9 Motion Constraints
4.10 Differential Drive Motion
4.11 Curvature
4.12 Instantaneous Center of Rotation
```

## Labs

```text
Velocity Field Explorer
Nonholonomic Robot Explorer
Instantaneous Center of Rotation
Differential Motion Lab
```

## Project

```text
Simulate Constrained Mobile Motion
```

---

# 11. LEVEL 5 — Sensors & Perception

## Objective

Understand how robots acquire information about themselves and their environment.

## Modules

### 5.1 Sensor Fundamentals

```text
5.1.1 Measurement
5.1.2 Sampling
5.1.3 Resolution
5.1.4 Accuracy
5.1.5 Precision
5.1.6 Noise
5.1.7 Calibration
```

### 5.2 Proprioceptive Sensors

```text
5.2.1 Encoders
5.2.2 IMU
5.2.3 Joint Sensors
5.2.4 Motor Current
5.2.5 Force/Torque Sensors
```

### 5.3 Exteroceptive Sensors

```text
5.3.1 LiDAR
5.3.2 Ultrasonic
5.3.3 Camera
5.3.4 Depth Camera
5.3.5 Stereo Camera
5.3.6 Radar
5.3.7 GNSS
```

### 5.4 Computer Vision

```text
5.4.1 Image Formation
5.4.2 Pixels
5.4.3 Image Filtering
5.4.4 Edges
5.4.5 Features
5.4.6 Optical Flow
5.4.7 Stereo Vision
5.4.8 Object Detection
5.4.9 Segmentation
```

## Labs

```text
Sensor Noise Lab
LiDAR Ray Simulator
Camera Projection Lab
Stereo Depth Lab
Feature Detection Lab
```

## Project

```text
Build a Simulated Sensor Suite
```

---

# 12. LEVEL 6 — Path & Trajectory Planning

## Objective

Teach how a robot finds and generates feasible motion toward a goal.

## Modules

### 6.1 Graph Search

```text
6.1.1 Graph Representation
6.1.2 BFS
6.1.3 DFS
6.1.4 Dijkstra
6.1.5 A*
6.1.6 Heuristics
6.1.7 Weighted A*
```

### 6.2 Grid Planning

```text
6.2.1 Occupancy Grid
6.2.2 Grid Search
6.2.3 Cost
6.2.4 Obstacle Inflation
6.2.5 Costmap
```

### 6.3 Sampling-Based Planning

```text
6.3.1 Configuration Space
6.3.2 PRM
6.3.3 RRT
6.3.4 RRT*
6.3.5 Kinodynamic Planning
```

### 6.4 Potential Fields

```text
6.4.1 Attractive Potential
6.4.2 Repulsive Potential
6.4.3 Artificial Potential Field
6.4.4 Local Minima
```

### 6.5 Trajectory Generation

```text
6.5.1 Path vs Trajectory
6.5.2 Time Parameterization
6.5.3 Velocity Profile
6.5.4 Acceleration Constraints
6.5.5 Jerk Constraints
6.5.6 Smooth Trajectories
```

### 6.6 Optimization-Based Planning

```text
6.6.1 Cost Functions
6.6.2 Smoothness Cost
6.6.3 Collision Cost
6.6.4 Constraint Optimization
6.6.5 Trajectory Optimization
```

## Labs

```text
BFS Visualizer
Dijkstra Visualizer
A* Visualizer
Heuristic Explorer
RRT Visualizer
RRT* Visualizer
Potential Field Lab
Trajectory Generator
```

## Project

```text
Collision-Free Robot Path Planner
```

---

# 13. LEVEL 7 — Robot Dynamics & Control

## Objective

Understand why robots move and how motion is controlled.

## Module 7A — Dynamics

```text
7A.1 Mass
7A.2 Force
7A.3 Torque
7A.4 Momentum
7A.5 Energy
7A.6 Friction
7A.7 Newton–Euler
7A.8 Lagrangian Mechanics
7A.9 Kinetic Energy
7A.10 Potential Energy
7A.11 Robot Dynamics
7A.12 Motor Dynamics
```

## Module 7B — Feedback Control

```text
7B.1 Open Loop
7B.2 Closed Loop
7B.3 Error
7B.4 Feedback
7B.5 Stability
7B.6 P Control
7B.7 PI Control
7B.8 PD Control
7B.9 PID
7B.10 Anti-Windup
```

## Module 7C — Advanced Control

```text
7C.1 State Space
7C.2 Controllability
7C.3 Observability
7C.4 Pole Placement
7C.5 LQR
7C.6 Nonlinear Control
7C.7 Model Predictive Control
```

## Labs

```text
Motor Model Lab
PID Lab
Trajectory Tracking Lab
LQR Lab
MPC Lab
```

## Project

```text
Build a Trajectory Tracking Robot
```

---

# 14. LEVEL 8 — Localization & State Estimation

## Objective

Estimate where the robot is and how uncertain that estimate is.

## Modules

### 8.1 Odometry

```text
8.1.1 Dead Reckoning
8.1.2 Wheel Odometry
8.1.3 IMU Odometry
8.1.4 Drift
8.1.5 Odometry Error
```

### 8.2 Bayesian Estimation

```text
8.2.1 State Representation
8.2.2 Prediction
8.2.3 Measurement
8.2.4 Bayes Filter
8.2.5 Sensor Fusion
```

### 8.3 Kalman Filtering

```text
8.3.1 Kalman Filter Intuition
8.3.2 Prediction Step
8.3.3 Measurement Update
8.3.4 Covariance
8.3.5 Extended Kalman Filter
8.3.6 Unscented Kalman Filter
```

### 8.4 Particle Filtering

```text
8.4.1 Particle Representation
8.4.2 Sampling
8.4.3 Importance Weighting
8.4.4 Resampling
8.4.5 Monte Carlo Localization
```

## Labs

```text
Odometry Drift Lab
Bayesian Localization Lab
Kalman Filter Explorer
EKF Robot Localization
Particle Filter Explorer
MCL Lab
Sensor Fusion Lab
```

## Project

```text
Localize a Robot in a Known Map
```

---

# 15. LEVEL 9 — Mapping

## Objective

Represent an environment using robot sensor measurements.

## Modules

```text
9.1 Environment Representation
9.2 Occupancy Grid
9.3 Probabilistic Occupancy
9.4 Distance Transform
9.5 Costmap
9.6 Signed Distance Field
9.7 Point Cloud
9.8 Voxel Map
9.9 Topological Map
9.10 Roadmap
```

## Labs

```text
Occupancy Grid Builder
LiDAR Mapping Lab
Distance Transform Explorer
Costmap Explorer
SDF Explorer
Point Cloud Viewer
```

## Project

```text
Build a 2D Environment Map
```

---

# 16. LEVEL 10 — SLAM

## Objective

Estimate robot pose while simultaneously constructing an unknown map.

## Modules

```text
10.1 Why SLAM?
10.2 SLAM Problem Formulation
10.3 Landmark SLAM
10.4 EKF-SLAM
10.5 FastSLAM
10.6 Scan Matching
10.7 ICP
10.8 Pose Graph
10.9 Graph-SLAM
10.10 Loop Closure
10.11 LiDAR SLAM
10.12 Visual SLAM
10.13 Visual-Inertial SLAM
```

## Labs

```text
SLAM Problem Explorer
ICP Visualizer
Pose Graph Explorer
Loop Closure Lab
Simplified LiDAR SLAM
```

## Project

```text
Build a Simple SLAM System
```

---

# 17. LEVEL 11 — Navigation

## Objective

Combine planning, localization, mapping, and control into navigation.

## Modules

```text
11.1 Navigation Architecture
11.2 Global Planner
11.3 Local Planner
11.4 Costmaps
11.5 Obstacle Inflation
11.6 Dynamic Obstacles
11.7 Dynamic Window Approach
11.8 Velocity Obstacles
11.9 Collision Avoidance
11.10 Recovery Behaviors
```

## Labs

```text
Global vs Local Planner
DWA Simulator
Dynamic Obstacle Lab
Collision Avoidance Lab
Navigation Stack Explorer
```

## Project

```text
Autonomous Navigation in a Dynamic Environment
```

---

# 18. LEVEL 12 — Autonomous Systems

## Objective

Integrate the components into a complete autonomous robotic architecture.

## Modules

```text
12.1 Autonomous Architecture
12.2 Perception Pipeline
12.3 State Estimation
12.4 World Model
12.5 Planning
12.6 Decision Making
12.7 State Machines
12.8 Behavior Trees
12.9 Task Planning
12.10 Mission Planning
12.11 Reactive Behavior
12.12 Deliberative Behavior
12.13 Hybrid Architectures
```

## Project

```text
Build an Autonomous Mobile Robot
```

---

# 19. LEVEL 13 — Robotics Software & ROS

## Objective

Teach how robotics algorithms become software systems.

ROS should be taught after learners understand the underlying robotics concepts.

## Modules

```text
13.1 Robotics Software Architecture
13.2 ROS Concepts
13.3 Nodes
13.4 Topics
13.5 Services
13.6 Actions
13.7 Messages
13.8 Parameters
13.9 TF
13.10 Simulation
13.11 Logging
13.12 Visualization
13.13 Navigation Software
13.14 Package Architecture
```

## Labs

```text
ROS Topic Lab
ROS Service Lab
TF Explorer
Simulated LiDAR
Simulated Differential Drive
Navigation Pipeline
```

## Project

```text
Build a ROS-Based Mobile Robot
```

---

# 20. LEVEL 14 — Manipulation Robotics

## Objective

Teach robotic arm systems.

## Modules

```text
14.1 Manipulator Architecture
14.2 Links and Joints
14.3 Forward Kinematics
14.4 Inverse Kinematics
14.5 DH Parameters
14.6 Jacobian
14.7 Workspace
14.8 Singularities
14.9 Dynamics
14.10 Trajectory Planning
14.11 Joint Control
14.12 Cartesian Control
14.13 Operational Space Control
14.14 Force Control
14.15 Impedance Control
14.16 Grasping
14.17 Manipulator Motion Planning
```

## Projects

```text
2D Robotic Arm
3D Manipulator
Pick-and-Place Simulation
```

---

# 21. LEVEL 15 — Aerial Robotics

## Modules

```text
15.1 3D Motion
15.2 Attitude
15.3 Roll
15.4 Pitch
15.5 Yaw
15.6 Quadrotor Model
15.7 Thrust
15.8 Flight Dynamics
15.9 Attitude Control
15.10 Position Control
15.11 Trajectory Planning
15.12 Visual-Inertial Navigation
15.13 Autonomous Drone Navigation
```

## Labs

```text
Quadrotor Attitude Lab
Thrust Allocation
Flight Control Lab
3D Trajectory Lab
```

---

# 22. LEVEL 16 — Legged Robotics

## Modules

```text
16.1 Legged Locomotion
16.2 Contact Modeling
16.3 Gait
16.4 Stability
16.5 ZMP
16.6 Leg Kinematics
16.7 Inverse Kinematics
16.8 Whole-Body Control
16.9 Quadruped Locomotion
16.10 Humanoid Robotics
16.11 Dynamic Locomotion
```

## Labs

```text
Gait Explorer
Leg IK
ZMP Visualizer
Quadruped Simulation
```

---

# 23. LEVEL 17 — Learning-Based Robotics

Classical robotics foundations should come before advanced learning-based robotics.

## Modules

### 17.1 Machine Learning

```text
17.1.1 Dataset
17.1.2 Features
17.1.3 Training
17.1.4 Validation
17.1.5 Regression
17.1.6 Classification
```

### 17.2 Deep Learning

```text
17.2.1 Neural Networks
17.2.2 CNN
17.2.3 Object Detection
17.2.4 Segmentation
17.2.5 Depth Estimation
```

### 17.3 Robot Learning

```text
17.3.1 Imitation Learning
17.3.2 Reinforcement Learning
17.3.3 Policy
17.3.4 Reward
17.3.5 Model-Based RL
17.3.6 Learning-Based Control
17.3.7 Sim-to-Real
17.3.8 Foundation Models for Robotics
```

---

# 24. LEVEL 18 — Multi-Agent Robotics

This is a flagship RoboAtlas domain.

## Modules

### 18.1 Multi-Agent Foundations

```text
18.1.1 Agent Modeling
18.1.2 Multi-Agent Systems
18.1.3 Communication
18.1.4 Distributed Systems
```

### 18.2 Graph-Based Multi-Agent Systems

```text
18.2.1 Graph Representation
18.2.2 Graph Laplacian
18.2.3 Connectivity
18.2.4 Network Topology
```

### 18.3 Consensus

```text
18.3.1 Consensus Problem
18.3.2 Average Consensus
18.3.3 Discrete-Time Consensus
18.3.4 Continuous-Time Consensus
18.3.5 Convergence
```

### 18.4 Formation Control

```text
18.4.1 Formation Representation
18.4.2 Leader-Follower
18.4.3 Leaderless Formation
18.4.4 Distance-Based Formation
18.4.5 Position-Based Formation
18.4.6 Formation Stability
```

### 18.5 Flocking

```text
18.5.1 Alignment
18.5.2 Cohesion
18.5.3 Separation
18.5.4 Flocking Dynamics
```

### 18.6 Cooperative Robotics

```text
18.6.1 Distributed Estimation
18.6.2 Cooperative Localization
18.6.3 Cooperative Mapping
18.6.4 Multi-Robot Exploration
18.6.5 Task Allocation
18.6.6 Multi-Agent Path Planning
18.6.7 Collision Avoidance
```

## Labs

```text
Consensus Simulator
Graph Laplacian Explorer
Leader-Follower Simulator
Formation Control Simulator
Flocking Simulator
Multi-Robot Localization
Multi-Robot Exploration
```

## Project

```text
Multi-Robot Autonomous Exploration
```

---

# 25. LEVEL 19 — Advanced Robotics Mathematics & Algorithms

This level is intended for advanced learners and graduate students.

## Modules

```text
19.1 Advanced Linear Algebra
19.2 Eigenvalues
19.3 Eigenvectors
19.4 Singular Value Decomposition
19.5 Pseudoinverse
19.6 Numerical Optimization
19.7 Nonlinear Optimization
19.8 Lie Groups
19.9 Lie Algebra
19.10 SE(2)
19.11 SE(3)
19.12 Manifold Optimization
19.13 Factor Graphs
19.14 Bundle Adjustment
19.15 Optimal Control
19.16 Belief-Space Planning
19.17 POMDP
19.18 Information-Theoretic Planning
```

## Project

```text
Advanced State Estimation / Planning Research Lab
```

---

# 26. LEVEL 20 — Robotics Research & Emerging Topics

Level 20 is a research frontier.

It should evolve over time.

Possible topics:

```text
20.1 Active SLAM
20.2 Information Gathering
20.3 Multi-Agent SLAM
20.4 Distributed Optimization
20.5 Distributed Control
20.6 Safety-Critical Robotics
20.7 Formal Methods
20.8 Human-Robot Interaction
20.9 Human-Aware Navigation
20.10 Robot Learning
20.11 Vision-Language-Action Models
20.12 Embodied AI
20.13 Foundation Models for Robotics
20.14 Dexterous Manipulation
20.15 Soft Robotics
20.16 Bio-Inspired Robotics
20.17 Swarm Intelligence
20.18 Long-Horizon Autonomous Systems
```

Level 20 content should be reviewed more frequently than foundational content.

---

# 27. Master Domain Catalog

Domains are cross-level subject areas.

A domain can reference lessons from multiple levels.

## Core Domains

```text
D01 Robotics Fundamentals
D02 Mathematics for Robotics
D03 Geometry & Transformations
D04 Kinematics
D05 Mobile Robotics
D06 Dynamics
D07 Robot Control
D08 Sensors & Perception
D09 Localization
D10 Mapping
D11 SLAM
D12 Path Planning
D13 Motion Planning
D14 Navigation
D15 Autonomous Systems
D16 Robotics Software & ROS
D17 Manipulation
D18 Aerial Robotics
D19 Legged Robotics
D20 Learning-Based Robotics
D21 Multi-Agent Robotics
D22 Advanced Robotics
D23 Robotics Research
```

---

# 28. Domain: Robotics Fundamentals

## Description

Orientation, robot architecture, sensing, actuation, autonomy, and problem decomposition.

## Primary Levels

```text
Level 0
```

## Core Topics

```text
Introduction
Sense–Plan–Act
Robot Architecture
Robot Classification
Autonomy
```

---

# 29. Domain: Mathematics for Robotics

## Description

Mathematical language required to understand robotic systems.

## Primary Levels

```text
Level 1
Level 19
```

## Core Topics

```text
Vectors
Matrices
Calculus
Probability
Optimization
Linear Algebra
Numerical Methods
```

---

# 30. Domain: Geometry & Transformations

## Primary Levels

```text
Level 1
Level 2
Level 19
```

## Core Topics

```text
2D Geometry
3D Geometry
Coordinate Frames
Rotation
Translation
Homogeneous Transformations
Euler Angles
Quaternions
SE(2)
SE(3)
```

---

# 31. Domain: Kinematics

## Primary Levels

```text
Level 3
Level 4
```

## Core Topics

```text
Forward Kinematics
Inverse Kinematics
Jacobian
Velocity Kinematics
Differential Motion
Singularities
```

---

# 32. Domain: Mobile Robotics

## Primary Levels

```text
Level 3
Level 4
Level 5
Level 6
Level 7
Level 8
Level 11
```

## Core Topics

```text
Differential Drive
Unicycle
Mecanum
Ackermann
Odometry
Localization
Navigation
Control
```

---

# 33. Domain: Dynamics

## Primary Levels

```text
Level 7
```

## Core Topics

```text
Force
Torque
Mass
Energy
Newton–Euler
Lagrangian
Motor Dynamics
Friction
```

---

# 34. Domain: Robot Control

## Primary Levels

```text
Level 7
Level 14
Level 15
Level 16
Level 18
```

## Core Topics

```text
PID
Trajectory Tracking
State Space
LQR
Nonlinear Control
MPC
Operational Space Control
Formation Control
```

---

# 35. Domain: Sensors & Perception

## Primary Levels

```text
Level 5
Level 8
Level 10
Level 17
```

## Core Topics

```text
LiDAR
Camera
IMU
Encoder
Radar
GNSS
Computer Vision
Sensor Fusion
```

---

# 36. Domain: Localization

## Primary Levels

```text
Level 8
Level 10
Level 18
```

## Core Topics

```text
Odometry
Bayesian Filtering
Kalman Filter
EKF
UKF
Particle Filter
MCL
Sensor Fusion
Cooperative Localization
```

---

# 37. Domain: Mapping

## Primary Levels

```text
Level 9
Level 10
Level 18
```

## Core Topics

```text
Occupancy Grid
Costmap
Distance Transform
SDF
Point Cloud
Voxel Map
Topological Map
Cooperative Mapping
```

---

# 38. Domain: SLAM

## Primary Levels

```text
Level 10
Level 19
Level 20
```

## Core Topics

```text
EKF-SLAM
FastSLAM
ICP
Pose Graph
Graph-SLAM
Loop Closure
LiDAR SLAM
Visual SLAM
Visual-Inertial SLAM
Active SLAM
Multi-Agent SLAM
```

---

# 39. Domain: Path Planning

## Primary Levels

```text
Level 2
Level 6
Level 11
Level 19
```

## Core Topics

```text
BFS
Dijkstra
A*
RRT
RRT*
PRM
Potential Fields
Trajectory Optimization
Multi-Agent Planning
```

---

# 40. Domain: Robot Navigation

## Primary Levels

```text
Level 6
Level 8
Level 9
Level 11
Level 12
```

## Core Topics

```text
Localization
Mapping
Global Planning
Local Planning
Obstacle Avoidance
Trajectory Tracking
Recovery
Autonomous Navigation
```

---

# 41. Domain: Autonomous Systems

## Primary Levels

```text
Level 0
Level 8
Level 9
Level 10
Level 11
Level 12
```

## Core Topics

```text
Perception
Estimation
Mapping
Planning
Decision Making
Control
Mission Planning
Behavior Trees
```

---

# 42. Domain: Manipulation

## Primary Levels

```text
Level 3
Level 7
Level 14
Level 19
Level 20
```

## Core Topics

```text
Manipulator Kinematics
IK
Jacobian
Dynamics
Trajectory Planning
Force Control
Impedance
Grasping
Dexterous Manipulation
```

---

# 43. Domain: Aerial Robotics

## Primary Levels

```text
Level 2
Level 4
Level 7
Level 8
Level 15
```

## Core Topics

```text
3D Pose
Attitude
Quadrotor
Flight Dynamics
Flight Control
Trajectory Planning
Visual-Inertial Navigation
```

---

# 44. Domain: Legged Robotics

## Primary Levels

```text
Level 3
Level 7
Level 16
```

## Core Topics

```text
Leg Kinematics
Contact
Gait
Stability
ZMP
Whole-Body Control
Quadruped
Humanoid
```

---

# 45. Domain: Learning-Based Robotics

## Primary Levels

```text
Level 5
Level 12
Level 17
Level 20
```

## Core Topics

```text
Computer Vision
Machine Learning
Deep Learning
Imitation Learning
Reinforcement Learning
Learning-Based Control
Sim-to-Real
Foundation Models
```

---

# 46. Domain: Multi-Agent Robotics

## Primary Levels

```text
Level 6
Level 7
Level 12
Level 18
Level 19
Level 20
```

## Core Topics

```text
Graph Theory
Consensus
Graph Laplacian
Leader-Follower
Formation Control
Flocking
Distributed Estimation
Cooperative Mapping
Exploration
Task Allocation
Multi-Agent Planning
Swarm Robotics
```

---

# 47. Domain: Robotics Software & ROS

## Primary Levels

```text
Level 12
Level 13
Level 17
Level 18
```

## Core Topics

```text
ROS
Simulation
TF
Navigation
Software Architecture
Distributed Robotics Software
```

---

# 48. Domain Dependency Graph

The domain graph should be represented conceptually as:

```text
                  FUNDAMENTALS
                       │
                  MATHEMATICS
                       │
              GEOMETRY / FRAMES
                       │
                 KINEMATICS
                  /          \
                 /            \
       MOBILE ROBOTICS      MANIPULATION
              │                  │
              │              DYNAMICS
              │                  │
              └──────┬───────────┘
                     │
                   CONTROL
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     SENSORS    PERCEPTION      MOTION
        │                         │
        └──────────┬──────────────┘
                   ↓
              LOCALIZATION
                   │
                   ↓
                MAPPING
                   │
                   ↓
                  SLAM
                   │
                   ↓
              PATH PLANNING
                   │
                   ↓
               NAVIGATION
                   │
                   ↓
          AUTONOMOUS SYSTEMS
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
    MULTI-AGENT          LEARNING
        │                     │
        └──────────┬──────────┘
                   ↓
             ADVANCED / RESEARCH
```

---

# 49. Existing RoboAtlas Milestones — Migration

The current RoboAtlas domain cards should be migrated into the new architecture.

## Current Milestone 1 — Robotics Fundamentals

Current topics:

```text
Introduction to Robotics
2D Geometry & Planar Transforms
3D Spatial Geometry & Euler Angles
Path & Trajectory Generation
Velocity Kinematics in 2D
Velocity Kinematics in 3D
Matrix Foundations
Mathematical Modeling & Automata
Robot Dynamics
```

Migration:

```text
Introduction
→ Level 0

2D Geometry
→ Level 1 / Level 2

3D Geometry
→ Level 2

Matrix Foundations
→ Level 1

Velocity Kinematics
→ Level 3 / Level 4

Path & Trajectory
→ Level 6

Robot Dynamics
→ Level 7

Mathematical Modeling
→ Level 1 / Level 3
```

Do not keep these as one large domain.

---

# 50. Current Localization Domain — Migration

Current:

```text
Extended Kalman Filter
Particle Filter
Monte Carlo Localization
```

New structure:

```text
Level 8 — Localization & State Estimation

Modules:
Odometry
Bayesian Filtering
Kalman Filtering
Particle Filtering
Sensor Fusion
```

---

# 51. Current Mapping Domain — Migration

Current:

```text
Occupancy Grid Mapping
Distance Transforms
Costmaps
```

New:

```text
Level 9 — Mapping

Modules:
Occupancy Maps
Distance Fields
Costmaps
Spatial Representations
```

---

# 52. Current SLAM Domain — Migration

Current:

```text
ICP
FastSLAM
Graph-SLAM
```

New:

```text
Level 10 — SLAM

Modules:
SLAM Fundamentals
Scan Matching
Landmark SLAM
Particle SLAM
Graph SLAM
Loop Closure
Visual SLAM
```

---

# 53. Current Path Planning Domain — Migration

Current:

```text
Graph Search
Sampling-Based Planners
Potential Fields
```

New:

```text
Level 6 — Path & Trajectory Planning

Modules:
Graph Search
Grid Planning
Sampling-Based Planning
Potential Fields
Trajectory Generation
Optimization-Based Planning
```

---

# 54. Current Robot Control Domain — Migration

Current:

```text
Geometric Path Trackers
Classical & Optimal Control
```

New:

```text
Level 7 — Robot Dynamics & Control

Modules:
Feedback
PID
Trajectory Tracking
State-Space
LQR
Nonlinear Control
MPC
```

---

# 55. Current Multi-Agent Domain — Migration

Current:

```text
Consensus Protocols
Leader-Follower
Formations
```

New:

```text
Level 18 — Multi-Agent Robotics

Modules:
Graph Theory
Consensus
Formation Control
Flocking
Distributed Estimation
Cooperative Robotics
Multi-Robot Planning
Exploration
```

---

# 56. Milestone System

Milestones should measure capabilities.

Recommended milestones:

```text
M1 — Robotics Foundations
Understands robotic system architecture.

M2 — Mathematical Modeling Ready
Can represent robot position, orientation, vectors and transformations.

M3 — Robot Motion Ready
Can model robot kinematics and motion.

M4 — Planning Ready
Can generate collision-free paths.

M5 — Localization Ready
Can estimate robot state from uncertain measurements.

M6 — Control Ready
Can track desired motion using feedback control.

M7 — Mapping Ready
Can construct spatial representations.

M8 — SLAM Ready
Can reason about simultaneous localization and mapping.

M9 — Autonomous Navigation Ready
Can integrate localization, mapping, planning and control.

M10 — Multi-Robot Ready
Can reason about distributed robotic systems.

M11 — Research Ready
Can read and reproduce advanced robotics algorithms.
```

---

# 57. Curriculum Tracks

Learners should not be forced to follow every level.

## Beginner Mobile Robotics

```text
0
 ↓
1
 ↓
2
 ↓
3
 ↓
4
 ↓
5
 ↓
8
 ↓
9
 ↓
6
 ↓
7
 ↓
11
 ↓
12
```

## Robotic Manipulation

```text
0
 ↓
1
 ↓
2
 ↓
3
 ↓
7
 ↓
14
```

## Autonomous Robotics

```text
0
 ↓
1
 ↓
2
 ↓
3
 ↓
5
 ↓
8
 ↓
9
 ↓
10
 ↓
6
 ↓
7
 ↓
11
 ↓
12
```

## Multi-Agent Robotics

```text
1
 ↓
3
 ↓
4
 ↓
6
 ↓
7
 ↓
8
 ↓
12
 ↓
18
 ↓
19
 ↓
20
```

---

# 58. Lesson Metadata Standard

Every MDX lesson must contain at least:

```yaml
---
id: unique-lesson-id
title: Lesson Title
slug: lesson-slug
category: domain
level: 1
difficulty: beginner
language: en
interactive: true
estimatedMinutes: 30
prerequisites: []
learningObjectives: []
references: []
components: []
relatedLessons: []
nextLessons: []
status: draft
---
```

Optional:

```yaml
domain: mathematics
module: vectors
lab: vector-laboratory
project: null
tags: []
```

---

# 59. Domain Metadata Standard

Domain metadata should contain:

```yaml
---
id: localization
title: Localization
slug: localization
description: State estimation and probabilistic localization
primaryLevels:
  - 8
difficulty: intermediate
prerequisites:
  - mathematical-foundations
  - coordinate-frames
  - sensors
status: stable
---
```

---

# 60. Module Metadata Standard

```yaml
---
id: kalman-filtering
domain: localization
level: 8
title: Kalman Filtering
difficulty: intermediate
prerequisites:
  - probability-foundations
  - state-estimation
---
```

---

# 61. Project Metadata Standard

```yaml
---
id: autonomous-navigation-project
title: Autonomous Navigation
type: capstone
minimumLevel: 11
prerequisites:
  - localization
  - mapping
  - path-planning
  - robot-control
difficulty: advanced
---
```

---

# 62. Content Rules for Agentic Development

The agent must treat this document as the **curriculum authority**.

Before creating new content:

```text
1. Read this curriculum.
2. Identify the concept.
3. Identify its domain.
4. Identify the appropriate level.
5. Check prerequisites.
6. Search existing lessons.
7. Check for duplication.
8. Decide whether to:
   - create
   - extend
   - split
   - merge
   - cross-reference
9. Create/update MDX.
10. Update curriculum metadata if necessary.
```

---

# 63. No Duplicate Lessons

The agent must not create multiple lessons explaining substantially the same concept.

For example, do not create:

```text
Coordinate Transformations
Coordinate Frame Transformations
Understanding Coordinate Frames
Robot Coordinate Transformations
```

if they cover the same material.

Instead use:

```text
Coordinate Frames
```

and create specialized lessons only when the context is genuinely different:

```text
Coordinate Frames for LiDAR
Coordinate Frames for Manipulators
Coordinate Frames in ROS TF
```

---

# 64. Source-to-Content Workflow

When a user provides a book, PDF, paper, or other source:

```text
SOURCE
  ↓
Extract relevant concepts
  ↓
Map to curriculum
  ↓
Check existing content
  ↓
Identify missing knowledge
  ↓
Create / extend lesson
  ↓
Explain independently
  ↓
Add formulas
  ↓
Add derivations
  ↓
Add graph
  ↓
Add interactive lab
  ↓
Add implementation
  ↓
Add references
  ↓
Validate
```

The agent must not simply copy source material.

---

# 65. Reference Rules

Primary references:

```text
Elements of Robotics
Foundations of Robotics
Planning Algorithms
```

Additional sources may include:

```text
university courses
open textbooks
peer-reviewed papers
official documentation
high-quality open educational resources
```

References should be attached to the relevant lesson.

Do not add a book to every lesson merely because it is part of the RoboAtlas library.

---

# 66. PythonRobotics Role

PythonRobotics is an important implementation/reference source.

However:

> PythonRobotics is not the RoboAtlas curriculum.

The workflow should be:

```text
PythonRobotics
      ↓
Understand implementation
      ↓
Explain problem
      ↓
Explain mathematics
      ↓
Explain algorithm
      ↓
Create RoboAtlas visualization
      ↓
Implement TypeScript version
      ↓
Create interactive lab
      ↓
Reference source
```

Do not blindly translate Python code line-by-line.

---

# 67. Mathematical Explanation Standard

For every important equation:

```text
1. What problem does it solve?
2. What does each variable mean?
3. What are the units?
4. What is the intuition?
5. Why does the equation have this form?
6. Can it be derived?
7. What assumptions are made?
8. What does it mean physically?
9. Where is it used in robotics?
10. What happens when assumptions fail?
```

Example:

\[
\|\mathbf v\|
=
\sqrt{v_x^2+v_y^2}
\]

must be connected:

```text
Pythagorean theorem
       ↓
Vector magnitude
       ↓
Velocity magnitude
       ↓
Robot speed
```

---

# 68. Graph Standard

Graphs must have educational purpose.

Possible graphs:

```text
Coordinate Plane
Vector Diagram
Rotation
Trajectory
Position vs Time
Velocity vs Time
Acceleration vs Time
Probability Distribution
Cost Function
Search Graph
Occupancy Grid
SLAM Map
Control Response
Formation Graph
```

Every graph should include:

```text
axis labels
units
legend when necessary
important values
light/dark compatibility
responsive layout
```

Never use a graph merely as decoration.

---

# 69. Interactive Lab Standard

Every significant algorithm should have an interactive experiment where appropriate.

A Lab should define:

```text
Objective
Scenario
Inputs
Controls
Visualization
Expected Observation
Questions
Explanation
Takeaway
```

Example:

```text
A* Lab

Objective:
Understand how heuristic choice affects search.

Controls:
- map size
- obstacle density
- heuristic
- start
- goal

Visualize:
- explored nodes
- final path
- path length
- computation steps
```

---

# 70. Simulation Standard

A simulation must answer a clear question.

Examples:

```text
Kalman Filter:
What happens when sensor noise increases?

PID:
What happens when Kp becomes too large?

A*:
What happens when the heuristic changes?

RRT:
How does sampling explore configuration space?

SLAM:
How does loop closure reduce drift?

Consensus:
How quickly do agents converge?
```

---

# 71. TypeScript Implementation Standard

Because RoboAtlas is web-first, algorithms intended for browser interaction should have TypeScript implementations where practical.

Recommended architecture:

```text
MDX
 │
 ├── Explanation
 │
 ├── Formula
 │
 └── Interactive Component
          │
          ↓
      TypeScript
          │
          ↓
      Math / Algorithm Engine
          │
          ↓
      Visualization
```

Mathematical logic should be separated from UI.

Example:

```text
src/
  robotics/
    geometry/
    kinematics/
    planning/
    localization/
    control/
    multiagent/
  components/
    robotics/
  simulations/
```

---

# 72. Testing Standard

Algorithms must be tested independently from the UI.

Test:

```text
normal cases
zero values
negative values
boundary cases
degenerate cases
numerical precision
invalid input
```

Examples:

```text
zero vector normalization
singular matrix
zero timestep
negative timestep
angle wrap-around
empty graph
unreachable goal
empty particle set
```

The UI must not silently return:

```text
NaN
Infinity
undefined
```

without explaining the issue.

---

# 73. Bilingual Standard

Every stable lesson should eventually have:

```text
content/en/...
content/id/...
```

Both must preserve:

```text
same concept
same formulas
same examples
same learning objectives
same interactive behavior
```

Only language-specific explanation and UI text should differ.

---

# 74. Language Rules

Indonesian content may preserve established technical terms in English.

Example:

```text
State Estimation
(Estimasi Keadaan)
```

or:

```text
Path Planning
(Perencanaan Jalur)
```

Do not translate technical terms into unnatural Indonesian merely to avoid English.

---

# 75. Visualization Rules

All visualizations must support:

```text
Light mode
Dark mode
Desktop
Tablet
Mobile
```

Do not rely on color alone.

For example, distinguish:

```text
Robot
Goal
Obstacle
Trajectory
Sensor
Uncertainty
```

using a combination of:

```text
shape
line style
labels
icons
color
```

---

# 76. Accessibility

Interactive components should provide:

- keyboard accessibility where practical
- readable labels
- textual values
- reset controls
- meaningful ARIA labels where appropriate
- non-animation explanation

A learner must not need to understand an animation to understand the concept.

---

# 77. Mobile Learning Rule

On mobile, use:

```text
Explanation
      ↓
Formula
      ↓
Visualization
      ↓
Controls
      ↓
Interpretation
```

Do not force a two-column simulator layout on small screens.

---

# 78. Content Status

Allowed statuses:

```text
draft
review
stable
experimental
deprecated
```

Definitions:

### draft

Content exists but is not ready for public learning.

### review

Technical and educational review required.

### stable

Approved for public learning.

### experimental

New visualization or research topic.

### deprecated

Kept for historical/reference purposes but not recommended.

---

# 79. Quality Gate for Stable Lessons

A lesson may become `stable` only when:

```text
Technical correctness
        +
Mathematical correctness
        +
Pedagogical clarity
        +
Reference quality
        +
Interactive correctness
        +
Responsive UI
        +
Accessibility
        +
ID/EN parity
```

are satisfied.

---

# 80. Recommended Initial Public Curriculum

Do not implement all 21 levels immediately.

The first public RoboAtlas version should demonstrate the complete learning cycle.

Recommended first 20 lessons:

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

This gives RoboAtlas a complete vertical slice:

```text
Concept
  ↓
Mathematics
  ↓
Geometry
  ↓
Kinematics
  ↓
Sensors
  ↓
Localization
  ↓
Mapping
  ↓
Planning
  ↓
Control
  ↓
Autonomy
```

---

# 81. Recommended First Capstone

The first major capstone should be:

## Autonomous Mobile Robot

The learner combines:

```text
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
Trajectory
        ↓
PID
        ↓
Navigation
```

The final simulation should allow:

```text
Start
Goal
Obstacles
Robot
Sensor
Map
Planner
Controller
Trajectory
```

This becomes the first major proof that RoboAtlas can teach a complete robotic system.

---

# 82. Advanced Capstone Ladder

After the first capstone:

```text
CAPSTONE 1
Autonomous Mobile Robot

CAPSTONE 2
Robotic Arm Manipulation

CAPSTONE 3
SLAM Robot

CAPSTONE 4
Autonomous Drone

CAPSTONE 5
Quadruped Robot

CAPSTONE 6
Multi-Robot Exploration

CAPSTONE 7
Research Robotics Project
```

---

# 83. Research Frontier Rule

Level 20 must remain flexible.

New research topics can be added without restructuring earlier levels.

Example:

```text
New Research Topic
      ↓
Determine prerequisites
      ↓
Assign Level 20
      ↓
Assign Domain
      ↓
Create Module
      ↓
Create Lesson
```

The research frontier should not destabilize foundational curriculum.

---

# 84. Agentic Decision Rules

When the agent receives a request such as:

> "Add a lesson about EKF."

It must determine:

```text
Domain:
Localization

Level:
8

Module:
Kalman Filtering

Prerequisites:
Probability
State Estimation

Related:
Odometry
Bayes Filter
Particle Filter

Next:
SLAM
```

When the agent receives:

> "Create a lesson from this PDF about coordinate transformations."

It should map it to:

```text
Domain:
Geometry & Transformations

Level:
2

Module:
2D / 3D Transformations
```

and check whether the concept already exists.

---

# 85. Agentic Content Placement Rule

The agent must never place content based solely on the order in which it was requested.

Placement must be based on:

```text
Concept
Prerequisite
Difficulty
Domain
Learning dependency
```

---

# 86. Agentic Duplication Rule

Before creating a lesson:

```text
SEARCH EXISTING CONTENT
        ↓
SIMILAR CONTENT?
    /        \
  YES        NO
   ↓          ↓
EXTEND /     CREATE
LINK / SPLIT
```

---

# 87. Agentic Curriculum Update Rule

The agent may update this curriculum only when:

```text
a genuinely new domain appears
OR
a new level is required
OR
a dependency is incorrect
OR
existing content must be reorganized
```

Adding a normal lesson should **not** require modifying the master curriculum.

---

# 88. Agentic Source Rule

When content comes from a book/PDF:

The agent must distinguish:

```text
Source-derived knowledge
```

from:

```text
RoboAtlas original explanation
```

Do not reproduce long source passages.

Use the source to understand and synthesize the concept.

Cite the source appropriately.

---

# 89. Curriculum Integrity

The following must remain stable:

```text
Level 0–20
Domain IDs
Lesson IDs
Prerequisite relationships
```

Avoid changing identifiers after publication.

If a lesson must be renamed, preserve its stable `id`.

---

# 90. Recommended Repository Structure

```text
roboatlas/
│
├── content/
│   ├── en/
│   │   ├── fundamentals/
│   │   ├── mathematics/
│   │   ├── geometry/
│   │   ├── kinematics/
│   │   ├── sensors/
│   │   ├── localization/
│   │   ├── mapping/
│   │   ├── slam/
│   │   ├── planning/
│   │   ├── control/
│   │   ├── navigation/
│   │   ├── manipulation/
│   │   ├── multi-agent/
│   │   └── research/
│   │
│   └── id/
│       ├── fundamentals/
│       ├── mathematics/
│       ├── geometry/
│       ├── kinematics/
│       ├── sensors/
│       ├── localization/
│       ├── mapping/
│       ├── slam/
│       ├── planning/
│       ├── control/
│       ├── navigation/
│       ├── manipulation/
│       ├── multi-agent/
│       └── research/
│
├── src/
│   ├── robotics/
│   │   ├── geometry/
│   │   ├── kinematics/
│   │   ├── dynamics/
│   │   ├── planning/
│   │   ├── localization/
│   │   ├── mapping/
│   │   ├── slam/
│   │   ├── control/
│   │   └── multiagent/
│   │
│   └── components/
│       └── robotics/
│
├── curriculum/
│   ├── master-curriculum.md
│   ├── levels/
│   ├── domains/
│   └── milestones/
│
└── docs/
    ├── content-guidelines.md
    ├── mdx-guidelines.md
    └── agentic-content-rules.md
```

---

# 91. Final Curriculum Model

The complete RoboAtlas system should be understood as:

```text
                         ROBOATLAS
                             │
              ┌──────────────┴──────────────┐
              │                             │
           LEVELS                         DOMAINS
         0 → 20                 Robotics Specializations
              │                             │
              └──────────────┬──────────────┘
                             │
                          MODULES
                             │
                          LESSONS
                             │
                     ┌───────┴───────┐
                     │               │
                   LABS           PROJECTS
                     │               │
                     └───────┬───────┘
                             │
                         CAPSTONES
                             │
                         MILESTONES
```

The learner can navigate through:

```text
LEARN
   ↓
FOLLOW LEVELS

EXPLORE
   ↓
CHOOSE DOMAIN

PRACTICE
   ↓
RUN LAB

BUILD
   ↓
COMPLETE PROJECT

MASTER
   ↓
ACHIEVE MILESTONE

RESEARCH
   ↓
LEVEL 19–20
```

---

# 92. Final Principle

RoboAtlas should become:

> **A living, version-controlled, interactive robotics textbook and laboratory.**

The content should not be organized as a blog.

It should not be organized only by algorithm.

It should not be organized only by books.

It should not be organized only by difficulty.

Instead:

```text
LEVEL
    defines depth

DOMAIN
    defines subject

MODULE
    defines concept group

LESSON
    teaches the concept

LAB
    lets the learner experiment

PROJECT
    integrates concepts

CAPSTONE
    demonstrates competence

MILESTONE
    records achievement
```

This structure allows RoboAtlas to grow from a beginner robotics website into a comprehensive robotics learning platform without destroying the organization of existing content.
