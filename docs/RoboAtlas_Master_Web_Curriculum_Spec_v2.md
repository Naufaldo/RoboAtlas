# RoboAtlas — Master Web & Curriculum Specification
## General Robotics Fundamentals, Interactive Learning, Algorithms & Robot Applications

**Status:** Master Specification  
**Version:** 2.0  
**Product:** RoboAtlas  
**Primary format:** TypeScript + MDX  
**Deployment:** GitHub Pages (initial deployment)  
**Languages:** Indonesian (`id`) and English (`en`)  
**Theme:** Light + Dark  
**Audience:** Beginner → Intermediate → Advanced → Research

---

# 1. Vision

RoboAtlas is an interactive educational platform for learning robotics from its fundamental principles.

The platform should not be designed around one particular robot category.

RoboAtlas is intended to teach:

> **How robots work, how robotics problems are modeled mathematically, how algorithms solve those problems, and how the same fundamental concepts are implemented across different robot platforms.**

The central philosophy is:

```text
FUNDAMENTALS
     ↓
MATHEMATICS
     ↓
GEOMETRY
     ↓
KINEMATICS
     ↓
DYNAMICS
     ↓
SENSORS
     ↓
LOGIC
     ↓
ALGORITHMS
     ↓
CONTROL
     ↓
IMPLEMENTATION
     ↓
ROBOT-SPECIFIC APPLICATION
```

RoboAtlas should therefore be a **general robotics knowledge system**, not merely a mobile robotics, ROS, SLAM, or multi-agent website.

---

# 2. Product Philosophy

RoboAtlas must answer four questions for every important robotics concept:

```text
1. What is it?
2. Why does robotics need it?
3. How does the mathematics / logic / algorithm work?
4. How is it implemented on a real robot?
```

The learner should continuously move between:

```text
THEORY
  ↕
MATHEMATICS
  ↕
VISUALIZATION
  ↕
ALGORITHM
  ↕
SIMULATION
  ↕
ROBOT IMPLEMENTATION
```

---

# 3. Target Learners

RoboAtlas should support multiple learner types.

## Beginner

Someone asking:

> "What exactly is a robot?"

Needs:

- intuitive explanations
- visualizations
- simple mathematics
- terminology
- guided labs

## Engineering Student

Someone learning:

- kinematics
- dynamics
- control
- sensors
- algorithms

Needs:

- equations
- derivations
- simulations
- implementation

## Robotics Developer

Needs:

- algorithms
- TypeScript implementations
- system architecture
- practical examples
- robot-specific implementation

## Researcher

Needs:

- mathematical depth
- algorithmic assumptions
- papers
- advanced topics
- reproducible experiments

---

# 4. Core Learning Model

Every concept should follow:

```text
QUESTION
  ↓
INTUITION
  ↓
PHYSICAL EXAMPLE
  ↓
MATHEMATICAL MODEL
  ↓
FORMULA
  ↓
DERIVATION
  ↓
VISUALIZATION
  ↓
ALGORITHM
  ↓
INTERACTIVE LAB
  ↓
IMPLEMENTATION
  ↓
ROBOT APPLICATION
  ↓
LIMITATIONS
  ↓
NEXT CONCEPT
```

Not every short lesson needs every section, but major concepts should follow this structure.

---

# 5. Website Information Architecture

The primary navigation should be:

```text
RoboAtlas
│
├── Home
├── Curriculum
├── Domains
├── Labs
├── Projects
├── Algorithms
├── Robot Platforms
├── Resources
└── About
```

Secondary utility navigation:

```text
Search
Language
Theme
Progress
```

---

# 6. Homepage / Dashboard

The homepage should immediately communicate:

> Learn robotics from fundamentals to implementation.

It should not look like a generic blog.

---

## 6.1 Hero Section

Recommended content:

```text
ROBOATLAS

Learn Robotics.
Understand the Mathematics.
Build the Algorithms.

An interactive robotics learning platform
from fundamental concepts to real robot implementation.
```

Primary actions:

```text
[ Start Learning ]

[ Explore Curriculum ]
```

Secondary:

```text
Explore Labs
View Robot Platforms
```

---

# 7. Dashboard Layout

After the hero, show a visual overview.

Recommended order:

```text
Hero
 ↓
Learning Progress
 ↓
Start Learning
 ↓
Core Fundamentals
 ↓
Explore by Domain
 ↓
Interactive Labs
 ↓
Robot Platforms
 ↓
Featured Projects
 ↓
Learning Path
 ↓
Resources
 ↓
About RoboAtlas
```

---

# 8. "Start Learning" Section

The first dashboard section should ask:

> Where should I start?

Cards:

```text
┌─────────────────────────┐
│ BEGINNER                │
│                         │
│ Start from zero         │
│                         │
│ [Start]                 │
└─────────────────────────┘

┌─────────────────────────┐
│ FUNDAMENTALS            │
│                         │
│ Mathematics & Kinematics│
│                         │
│ [Explore]               │
└─────────────────────────┘

┌─────────────────────────┐
│ ALGORITHMS              │
│                         │
│ Planning & Estimation   │
│                         │
│ [Explore]               │
└─────────────────────────┘

┌─────────────────────────┐
│ BUILD                   │
│                         │
│ Labs & Projects         │
│                         │
│ [Build]                 │
└─────────────────────────┘
```

---

# 9. Learning Progress

If learner progress exists, show:

```text
Your Robotics Journey

Level 3 / 20

██████████░░░░░░░░░░

Current:
Robot Kinematics

Next:
Inverse Kinematics
```

Show:

```text
Lessons completed
Labs completed
Projects completed
Current streak (optional)
Milestones
```

Do not make gamification dominant.

Learning should remain the primary purpose.

---

# 10. Core Fundamentals Section

This should be one of the most prominent sections.

```text
CORE ROBOTICS FUNDAMENTALS

Mathematics
Geometry
Kinematics
Dynamics
Sensors
Logic
Algorithms
Control
```

Each card should show:

```text
Description
Difficulty
Number of lessons
Labs
Prerequisites
```

---

# 11. Curriculum Page

Route:

```text
/curriculum
```

Purpose:

> Show the complete structured learning journey.

The curriculum page should not merely display a list.

It should provide:

```text
Learning Levels
Domains
Prerequisites
Progress
Lessons
Labs
Projects
```

---

# 12. Curriculum Structure

RoboAtlas uses three dimensions:

```text
LEVEL
DOMAIN
ROBOT PLATFORM
```

They must not be confused.

---

## Level

Represents conceptual depth.

```text
Level 0 → Level 20
```

---

## Domain

Represents the robotics knowledge area.

Examples:

```text
Mathematics
Geometry
Kinematics
Dynamics
Control
Sensors
Algorithms
Planning
Estimation
Perception
```

---

## Robot Platform

Represents where the knowledge is applied.

Examples:

```text
Robotic Arm
Mobile Robot
AGV
AMR
Drone
UAV
ROV
AUV
USV
Quadruped
Humanoid
```

---

# 13. Master Curriculum Levels

## Level 0 — Robotics Orientation

```text
What is Robotics?
Robot vs Automation
Robot Architecture
Sense–Plan–Act
Sensors
Actuators
Computation
Robot Types
Autonomy
```

---

## Level 1 — Mathematical Foundations

```text
Scalars
Units
Angles
Vectors
Dot Product
Cross Product
Matrices
Matrix Multiplication
Functions
Graphs
Derivatives
Integrals
Probability
Statistics
Optimization
```

---

## Level 2 — Geometry & Transformations

```text
Coordinate Systems
2D Geometry
3D Geometry
Translation
Rotation
Rotation Matrices
Homogeneous Coordinates
Transformations
Euler Angles
Axis-Angle
Quaternions
SE(2)
SE(3)
```

---

## Level 3 — Kinematics

```text
Configuration
Degrees of Freedom
Joint Models
Forward Kinematics
Inverse Kinematics
Jacobian
Velocity Kinematics
Differential Drive
Unicycle
Mecanum
Ackermann
Manipulator Kinematics
```

---

## Level 4 — Robot Motion & Constraints

```text
Configuration Space
Motion Constraints
Holonomic Systems
Nonholonomic Systems
Body Velocity
World Velocity
Curvature
Instantaneous Center of Rotation
Differential Motion
```

---

## Level 5 — Sensors & Perception

```text
Sensor Fundamentals
Sampling
Noise
Accuracy
Precision
Calibration
Encoders
IMU
LiDAR
Camera
Depth Camera
Stereo Vision
Ultrasonic
Radar
GNSS
Basic Computer Vision
```

---

## Level 6 — Algorithms & Planning

```text
Algorithmic Thinking
Graphs
Trees
Search
BFS
DFS
Dijkstra
A*
Heuristics
Configuration-Space Planning
PRM
RRT
RRT*
Potential Fields
Trajectory Generation
Optimization-Based Planning
```

---

## Level 7 — Dynamics & Control

```text
Mass
Force
Torque
Energy
Friction
Newton-Euler
Lagrangian Mechanics
Motor Dynamics
Feedback
P Control
PI
PD
PID
Trajectory Tracking
State Space
LQR
MPC
Nonlinear Control
```

---

## Level 8 — State Estimation

```text
State Representation
Odometry
Dead Reckoning
Probability
Bayes Filter
Kalman Filter
EKF
UKF
Particle Filter
MCL
Sensor Fusion
```

---

## Level 9 — Mapping & Spatial Representation

```text
Occupancy Grid
Costmap
Distance Transform
SDF
Point Cloud
Voxel Map
Topological Map
Roadmap
```

---

## Level 10 — Perception & Computer Vision

```text
Image Formation
Image Processing
Features
Optical Flow
Stereo Vision
Depth
Object Detection
Segmentation
Visual Odometry
Feature Matching
```

---

## Level 11 — SLAM & Spatial Estimation

```text
SLAM Fundamentals
EKF-SLAM
FastSLAM
ICP
Scan Matching
Pose Graph
Graph-SLAM
Loop Closure
LiDAR SLAM
Visual SLAM
Visual-Inertial SLAM
```

---

## Level 12 — Navigation & Autonomous Systems

```text
Global Planning
Local Planning
Navigation
Obstacle Avoidance
Dynamic Window Approach
Velocity Obstacles
Decision Making
State Machines
Behavior Trees
Task Planning
Mission Planning
```

---

## Level 13 — Robotics Software & Simulation

```text
Software Architecture
Simulation
Numerical Simulation
ROS Concepts
Nodes
Topics
Services
Actions
Messages
TF
Logging
Visualization
Robot Middleware
```

---

## Level 14 — Manipulation Robotics

```text
Industrial Arms
Collaborative Robots
Manipulator Dynamics
Grasping
End Effectors
Force Control
Impedance Control
Operational Space
Motion Planning
Pick and Place
Dexterous Manipulation
```

---

## Level 15 — Mobile Robotics

```text
Wheeled Robots
Differential Drive
Mecanum
Ackermann
AGV
AMR
Odometry
Localization
Mapping
Navigation
Obstacle Avoidance
Mobile Robot Control
```

---

## Level 16 — Aerial Robotics

```text
UAV
Drone
Multirotor
Fixed Wing
VTOL
Attitude
Roll
Pitch
Yaw
Flight Dynamics
Thrust
Position Control
Attitude Control
Flight Planning
```

---

## Level 17 — Marine & Underwater Robotics

```text
ROV
AUV
USV
Marine Sensors
Thrusters
Buoyancy
Hydrodynamics
Underwater Navigation
Depth Control
Heading Control
Underwater Localization
Marine Mapping
```

---

## Level 18 — Legged & Humanoid Robotics

```text
Legged Locomotion
Contact
Gait
Stability
ZMP
Quadruped
Hexapod
Humanoid
Whole-Body Control
Balance
Walking
```

---

## Level 19 — Advanced Robotics

```text
Lie Groups
Lie Algebra
SE(2)
SE(3)
Manifold Optimization
Factor Graphs
Optimal Control
Belief-Space Planning
POMDP
Advanced Motion Planning
Advanced Estimation
```

---

## Level 20 — Robotics Research & Emerging Topics

This level is intentionally dynamic.

Possible areas:

```text
Robot Learning
Reinforcement Learning
Imitation Learning
Sim-to-Real
Embodied AI
Vision-Language-Action Models
Foundation Models
Human-Robot Interaction
Dexterous Robotics
Soft Robotics
Swarm Robotics
Multi-Agent Robotics
Safety-Critical Robotics
Formal Methods
Active SLAM
Multi-Robot SLAM
Distributed Robotics
Space Robotics
Research Topics
```

Important:

> Multi-Agent Robotics is an advanced domain, not the destination of RoboAtlas.

---

# 14. Domain Architecture

Domains represent reusable robotics knowledge.

Recommended domains:

```text
D01 Robotics Fundamentals
D02 Mathematics
D03 Geometry
D04 Kinematics
D05 Dynamics
D06 Sensors
D07 Perception
D08 Logic & Algorithms
D09 Planning
D10 State Estimation
D11 Mapping
D12 SLAM
D13 Control
D14 Navigation
D15 Autonomous Systems
D16 Robotics Software
D17 Manipulation
D18 Mobile Robotics
D19 Aerial Robotics
D20 Marine Robotics
D21 Legged Robotics
D22 Robot Learning
D23 Multi-Agent Robotics
D24 Advanced Robotics
D25 Robotics Research
```

---

# 15. The Most Important Design Principle: Cross-Platform Learning

RoboAtlas should teach concepts first and applications second.

Example:

## Concept

```text
Forward Kinematics
```

Then:

```text
How does it apply to:

Robotic Arm?
Mobile Robot?
Drone?
ROV?
Quadruped?
```

This should be visible through an:

> **Apply to Robot** panel.

---

# 16. Robot Platform Page

Route examples:

```text
/robots/arm
/robots/mobile
/robots/uav
/robots/rov
/robots/auv
/robots/usv
/robots/quadruped
/robots/humanoid
```

Each page should contain:

```text
Overview
Architecture
Degrees of Freedom
Typical Sensors
Actuators
Kinematics
Dynamics
Control
Algorithms
Applications
Recommended Lessons
Interactive Labs
Projects
```

---

# 17. Example Robot Platform — Robotic Arm

```text
ROBOTIC ARM

Fundamentals:
✓ Mathematics
✓ Geometry
✓ Kinematics
✓ Dynamics
✓ Control

Specialized:
✓ Jacobian
✓ Inverse Kinematics
✓ Motion Planning
✓ Grasping
✓ Force Control

Advanced:
○ Learning
○ Vision
○ Dexterous Manipulation
```

---

# 18. Example Robot Platform — Mobile Robot

```text
MOBILE ROBOT

Fundamentals:
✓ Mathematics
✓ Geometry
✓ Kinematics
✓ Sensors
✓ Control

Specialized:
✓ Odometry
✓ Localization
✓ Mapping
✓ Planning
✓ Navigation
```

---

# 19. Example Robot Platform — UAV

```text
UAV

Fundamentals:
✓ Mathematics
✓ 3D Geometry
✓ Dynamics
✓ Sensors
✓ Control

Specialized:
✓ Attitude
✓ Flight Dynamics
✓ State Estimation
✓ Trajectory Planning
✓ Flight Control
```

---

# 20. Example Robot Platform — ROV

```text
ROV

Fundamentals:
✓ Mathematics
✓ 3D Geometry
✓ Dynamics
✓ Sensors
✓ Control

Specialized:
✓ Buoyancy
✓ Hydrodynamics
✓ Thruster Allocation
✓ Depth Control
✓ Heading Control
✓ Underwater Navigation
```

---

# 21. Lesson Architecture

Every major lesson should follow:

```text
1. Orientation
2. Problem
3. Why It Matters
4. Intuition
5. Physical Example
6. Mathematical Model
7. Formula
8. Derivation
9. Visualization
10. Algorithm
11. Interactive Lab
12. TypeScript Implementation
13. Robot Application
14. Experiment
15. Failure Cases
16. Summary
17. Prerequisites
18. Next Lesson
19. References
```

---

# 22. Mathematical Content Rule

For important equations:

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
Physical Meaning
 ↓
Robot Application
 ↓
Limitations
```

Never introduce a major equation without explaining why it exists.

---

# 23. Algorithm Content Rule

For every important algorithm:

```text
Problem
Input
Output
Intuition
Mathematical Model
Algorithm Steps
Pseudocode
Complexity
Visualization
Interactive Lab
Implementation
Example
Failure Cases
Applications
Variants
References
```

---

# 24. Logic & Algorithm Thinking

RoboAtlas must explicitly teach logical thinking.

Examples:

```text
IF / ELSE
State Machines
Decision Trees
Finite State Machines
Behavior Trees
Graph Search
Priority Queues
Optimization
Heuristics
Planning
Decision Making
```

The learner should understand that robotics is not only:

```text
motors + sensors
```

but also:

```text
perception
reasoning
decision
planning
control
```

---

# 25. Interactive Visualization System

Interactive visualizations are a core feature, not decoration.

Examples:

```text
Vector Explorer
Matrix Transformation
Coordinate Frame Explorer
FK Simulator
IK Simulator
Jacobian Visualizer
Differential Drive Simulator
LiDAR Simulator
Sensor Noise Explorer
Kalman Filter
A*
RRT
PID
SLAM
Formation Control
```

---

# 26. Lab System

Route:

```text
/labs
```

Lab categories:

```text
Mathematics
Geometry
Kinematics
Dynamics
Sensors
Algorithms
Planning
Estimation
Control
Robot Platforms
Advanced
```

Each lab should contain:

```text
Objective
Background
Controls
Simulation
Observations
Questions
Explanation
Takeaway
```

---

# 27. Project System

Route:

```text
/projects
```

Projects should combine concepts.

Recommended progression:

```text
Project 1
2D Robot Mathematics

Project 2
Coordinate Transformation System

Project 3
Differential Drive Simulator

Project 4
2-Link Robotic Arm

Project 5
PID Robot Controller

Project 6
A* Path Planner

Project 7
Robot Localization

Project 8
LiDAR Mapping

Project 9
SLAM

Project 10
Autonomous Robot

Project 11
UAV Flight Controller

Project 12
ROV Control System

Project 13
Quadruped Motion

Project 14
Multi-Robot System
```

Multi-robot is only one advanced project.

---

# 28. Algorithm Library

Route:

```text
/algorithms
```

Categories:

```text
Geometry
Kinematics
Dynamics
Control
Search
Planning
Optimization
Estimation
Perception
SLAM
Decision Making
Multi-Agent
```

Each algorithm page should provide:

```text
What problem does it solve?
Intuition
Mathematics
Pseudocode
Complexity
Visualization
Interactive Demo
TypeScript Implementation
Applications
Limitations
References
```

---

# 29. Resources Page

Route:

```text
/resources
```

Sections:

```text
Books
Papers
University Courses
Open Courses
Documentation
Videos
Datasets
Simulation Tools
Software
Glossary
```

Primary books:

```text
Elements of Robotics
Foundations of Robotics
Planning Algorithms
```

Additional sources may be added later.

---

# 30. About Page

Route:

```text
/about
```

Purpose:

Explain RoboAtlas.

Suggested structure:

```text
What is RoboAtlas?
Why RoboAtlas?
Learning Philosophy
Curriculum Philosophy
Technology
Open Knowledge / References
Creator
Future Vision
```

The About page should explain that RoboAtlas aims to bridge:

```text
Theory
  +
Mathematics
  +
Algorithms
  +
Simulation
  +
Implementation
```

---

# 31. Search

Global search should search:

```text
Lessons
Domains
Algorithms
Labs
Projects
Robot Platforms
Glossary
References
```

Search results should display:

```text
Title
Type
Level
Domain
Difficulty
Language
```

---

# 32. Glossary

Route:

```text
/glossary
```

Every technical term should be searchable.

Examples:

```text
DOF
Jacobian
Pose
Odometry
SLAM
PID
Quaternion
RRT
EKF
LiDAR
ROV
UAV
AUV
```

Each glossary entry should link to lessons.

---

# 33. Learning Graph

RoboAtlas should eventually provide a visual dependency graph.

Example:

```text
Mathematics
    ↓
Vectors
    ↓
Matrices
    ↓
Transformations
    ↓
Kinematics
    ↓
Control
```

Another branch:

```text
Probability
    ↓
Bayes
    ↓
Kalman Filter
    ↓
Localization
    ↓
SLAM
```

Learners can click nodes.

Each node shows:

```text
Definition
Prerequisites
Lessons
Labs
Applications
Next Topics
```

---

# 34. Content Cross-Reference

A lesson should show:

```text
Prerequisites
Related Concepts
Used By
Applications
Recommended Labs
Recommended Projects
Robot Platforms
```

Example:

```text
Forward Kinematics

Prerequisites:
Vectors
Matrices
Coordinate Frames

Used By:
Inverse Kinematics
Jacobian
Manipulation

Applications:
Robot Arm
Quadruped
Humanoid
```

---

# 35. MDX Architecture

MDX is the primary content format.

Recommended structure:

```text
content/
├── en/
│   ├── fundamentals/
│   ├── mathematics/
│   ├── geometry/
│   ├── kinematics/
│   ├── dynamics/
│   ├── sensors/
│   ├── algorithms/
│   ├── planning/
│   ├── estimation/
│   ├── perception/
│   ├── control/
│   ├── manipulation/
│   ├── mobile/
│   ├── aerial/
│   ├── marine/
│   └── advanced/
│
└── id/
    └── same structure
```

---

# 36. MDX Frontmatter

Minimum:

```yaml
---
id: differential-drive-kinematics
title: Differential Drive Kinematics
slug: differential-drive-kinematics
level: 3
domain: kinematics
platforms:
  - mobile
difficulty: intermediate
language: en
interactive: true
estimatedMinutes: 30
prerequisites:
  - vectors-for-robotics
  - coordinate-frames
learningObjectives:
  - Understand differential-drive geometry
  - Derive the robot velocity model
  - Relate wheel velocity to body velocity
components:
  - DifferentialDriveSimulator
  - EquationBlock
  - InteractiveGraph
labs:
  - differential-drive-lab
projects:
  - mobile-robot-simulator
references:
  - elements-of-robotics
status: draft
---
```

---

# 37. Platform Tagging

A lesson may apply to multiple robot platforms.

Example:

```yaml
platforms:
  - manipulator
  - mobile
  - quadruped
```

This is important.

Do not duplicate the same fundamental lesson for each robot.

Instead:

```text
One fundamental lesson
        ↓
Multiple applications
```

---

# 38. Example Cross-Platform Lesson

Lesson:

```text
Rotation Matrices
```

Applications:

```text
Robot Arm
UAV
ROV
Quadruped
Mobile Robot
```

The lesson explains the common mathematics.

Then application sections explain:

```text
Arm:
Joint orientation

UAV:
Attitude

ROV:
Vehicle orientation

Quadruped:
Body and leg frames
```

---

# 39. UI Design Philosophy

RoboAtlas UI should feel:

```text
Technical
Modern
Calm
Precise
Interactive
Educational
Accessible
```

Avoid:

```text
generic corporate dashboard
overly flashy gaming UI
excessive gradients
dense academic PDF appearance
```

The design should communicate:

> "This is a laboratory for learning robotics."

---

# 40. Theme

Support:

```text
Light Mode
Dark Mode
```

Theme should apply consistently to:

```text
Text
Code
Math
Charts
3D Simulations
Canvas
Graphs
Cards
Navigation
```

Interactive visualizations must adapt to the selected theme.

---

# 41. Responsive Design

Desktop:

```text
Sidebar + Main Content + Optional Context Panel
```

Tablet:

```text
Main Content
Collapsible Navigation
```

Mobile:

```text
Single Column
Bottom / Collapsible Controls
Readable Mathematics
Scrollable Graphs
```

---

# 42. Lesson UI

Recommended layout:

```text
┌────────────────────────────────────────────┐
│ Breadcrumb                                  │
│ Kinematics / Mobile Robotics               │
├────────────────────────────────────────────┤
│ Differential Drive Kinematics              │
│                                              │
│ Short orientation                          │
├────────────────────────────────────────────┤
│ Learning Objectives                        │
├────────────────────────────────────────────┤
│ THEORY                                     │
│                                              │
│ explanation                                 │
│                                              │
│ FORMULA                                    │
│                                              │
│ graph / diagram                             │
├────────────────────────────────────────────┤
│ INTERACTIVE LAB                            │
│                                              │
│ [ simulation ]                              │
│                                              │
├────────────────────────────────────────────┤
│ IMPLEMENTATION                             │
│                                              │
│ TypeScript                                  │
├────────────────────────────────────────────┤
│ ROBOT APPLICATIONS                         │
│                                              │
│ Mobile | Arm | UAV | ROV                  │
├────────────────────────────────────────────┤
│ References                                 │
└────────────────────────────────────────────┘
```

---

# 43. Interactive Components

Reusable components should include:

```text
<EquationBlock />
<InteractiveGraph />
<VectorVisualizer />
<MatrixVisualizer />
<CoordinateFrameExplorer />
<RobotSimulator />
<DifferentialDriveSimulator />
<ManipulatorSimulator />
<LiDARSimulator />
<KalmanFilterVisualizer />
<PathPlannerVisualizer />
<PIDSimulator />
<SLAMVisualizer />
<RobotPlatformCard />
<Lab />
<AlgorithmSteps />
<Derivation />
<ConceptCheck />
```

---

# 44. TypeScript Architecture

Separate mathematics/algorithms from UI.

```text
src/
├── robotics/
│   ├── math/
│   ├── geometry/
│   ├── kinematics/
│   ├── dynamics/
│   ├── sensors/
│   ├── estimation/
│   ├── perception/
│   ├── planning/
│   ├── control/
│   ├── slam/
│   └── multiagent/
│
├── simulations/
│   ├── mobile/
│   ├── manipulator/
│   ├── aerial/
│   ├── marine/
│   └── legged/
│
└── components/
    └── robotics/
```

---

# 45. Algorithm Engine Rule

The algorithm engine must not depend on React/DOM/UI where possible.

Preferred:

```text
Pure TypeScript Algorithm
        ↓
Unit Tests
        ↓
Simulation Adapter
        ↓
Visualization Component
```

This allows algorithms to be reused in:

```text
lesson
lab
project
simulation
future application
```

---

# 46. GitHub Pages Deployment

Initial deployment target:

```text
GitHub Pages
```

The website must therefore be compatible with static hosting.

Recommended architecture:

```text
MDX
 ↓
Static Site Generator
 ↓
Static HTML / JS / CSS
 ↓
GitHub Pages
```

Avoid requiring a permanent server for the initial version.

---

# 47. Static-First Principle

The initial RoboAtlas platform should prioritize:

```text
Static content
Client-side simulations
Client-side algorithms
Local progress where possible
```

Avoid depending on:

```text
server database
authentication
backend APIs
CMS backend
```

for the first release unless genuinely necessary.

---

# 48. Future Backend

The architecture should remain extensible for future:

```text
User Accounts
Cloud Progress
Bookmarks
Learning Analytics
Content CMS
Community
Achievements
Assignments
```

But these are not required for the GitHub Pages MVP.

---

# 49. Content Management

MDX is the initial content source of truth.

Workflow:

```text
Author / Agent
      ↓
MDX
      ↓
Git
      ↓
Pull Request
      ↓
Review
      ↓
CI
      ↓
Build
      ↓
GitHub Pages
```

This makes curriculum content version-controlled.

---

# 50. Agentic Content Workflow

When the agent receives a new source such as a PDF/book:

```text
SOURCE
  ↓
Understand content
  ↓
Identify concepts
  ↓
Map concepts to RoboAtlas
  ↓
Check existing lessons
  ↓
Detect duplicates
  ↓
Determine level
  ↓
Determine domain
  ↓
Determine platform applications
  ↓
Create / extend lesson
  ↓
Add mathematics
  ↓
Add derivation
  ↓
Add visualization
  ↓
Add lab
  ↓
Add implementation
  ↓
Add references
  ↓
Validate ID
  ↓
Validate EN
  ↓
Run tests
  ↓
Build
```

---

# 51. Agentic Rule: Fundamentals First

If a source discusses a robot-specific topic, the agent must ask:

> Is there a general robotics concept underneath this?

Example:

```text
UAV attitude control
```

Underlying concepts:

```text
Rotation
Angular velocity
Dynamics
Feedback
PID
State estimation
```

The agent should link to those fundamentals rather than creating isolated knowledge.

---

# 52. Agentic Rule: Generalize Before Specializing

Example:

Do not create only:

```text
Differential Drive Kinematics
```

without connecting it to:

```text
General Robot Kinematics
Velocity Kinematics
Nonholonomic Constraints
```

Likewise:

```text
Robot Arm IK
```

should connect to:

```text
Inverse Kinematics
Configuration Space
Jacobian
```

---

# 53. Agentic Rule: One Concept, Multiple Applications

Whenever possible:

```text
Fundamental Concept
       ↓
Application 1
       ↓
Application 2
       ↓
Application 3
```

rather than:

```text
Duplicate Concept A
Duplicate Concept B
Duplicate Concept C
```

---

# 54. Agentic Rule: No Forced Multi-Agent Content

Multi-agent robotics is optional.

The agent must not introduce multi-agent concepts into unrelated lessons simply because RoboAtlas supports them.

Multi-agent belongs primarily to:

```text
Advanced Robotics
Multi-Agent Robotics
Swarm Robotics
Distributed Robotics
Research
```

---

# 55. Source Hierarchy

Preferred:

## Tier 1

```text
Textbooks
University courses
Peer-reviewed papers
Official documentation
```

## Tier 2

```text
Open educational resources
Established robotics projects
Technical tutorials
```

## Tier 3

```text
Blogs
Forums
Community explanations
```

Tier 3 sources should not be the sole authority for important mathematical or scientific claims.

---

# 56. Primary Books

Current core references:

```text
Elements of Robotics
Foundations of Robotics
Planning Algorithms
```

Additional books may be added when they improve coverage.

---

# 57. PythonRobotics

PythonRobotics should be treated as:

```text
Algorithm Reference
Implementation Reference
Visualization Inspiration
```

It should not define RoboAtlas's curriculum.

Workflow:

```text
PythonRobotics
 ↓
Understand Algorithm
 ↓
Independent Explanation
 ↓
Mathematical Explanation
 ↓
TypeScript Implementation
 ↓
Interactive Visualization
 ↓
Robot Applications
```

Do not mechanically translate PythonRobotics source code.

---

# 58. Video Integration

Lessons may contain videos when they materially improve understanding.

Recommended sources:

```text
University lectures
Official robotics channels
Educational demonstrations
Open educational videos
```

Video should support the lesson rather than replace the explanation.

A lesson should remain understandable if the video is unavailable.

---

# 59. Reference Integration

Every major lesson should have a References section.

Example:

```md
## References

- Elements of Robotics
- Foundations of Robotics
- Planning Algorithms
- Relevant university course
- Relevant research paper
```

---

# 60. Progress System

Future learner progress may track:

```text
Lessons completed
Labs completed
Projects completed
Domains explored
Levels completed
Milestones
```

Do not make streaks or gamification the central feature.

---

# 61. Milestone System

Recommended milestones:

```text
M1 — Robotics Foundations
M2 — Mathematical Foundations
M3 — Geometry & Modeling
M4 — Kinematics Ready
M5 — Algorithm Ready
M6 — Dynamics & Control Ready
M7 — Sensing & Estimation Ready
M8 — Planning Ready
M9 — Autonomous Systems Ready
M10 — Robot Platform Ready
M11 — Advanced Robotics Ready
M12 — Research Ready
```

A milestone may be achieved through different domain paths.

---

# 62. Example Learning Paths

## General Robotics Beginner

```text
Level 0
 ↓
Level 1
 ↓
Level 2
 ↓
Level 3
 ↓
Level 5
 ↓
Level 6
 ↓
Level 7
```

## Robotic Arm

```text
Level 1
 ↓
Level 2
 ↓
Level 3
 ↓
Level 4
 ↓
Level 7
 ↓
Manipulation
```

## Mobile Robot

```text
Level 1
 ↓
Level 2
 ↓
Level 3
 ↓
Sensors
 ↓
Estimation
 ↓
Planning
 ↓
Control
 ↓
Navigation
```

## UAV

```text
Mathematics
 ↓
3D Geometry
 ↓
Dynamics
 ↓
Sensors
 ↓
State Estimation
 ↓
Control
 ↓
Flight Planning
```

## ROV

```text
Mathematics
 ↓
3D Geometry
 ↓
Dynamics
 ↓
Sensors
 ↓
Hydrodynamics
 ↓
Thruster Control
 ↓
Underwater Navigation
```

---

# 63. About Page Content

The About page should communicate:

## What is RoboAtlas?

An interactive robotics education platform focused on fundamentals, mathematics, algorithms, simulation, and implementation.

## Why?

Robotics is often taught as disconnected subjects.

RoboAtlas connects:

```text
Mathematics
+
Physics
+
Algorithms
+
Control
+
Programming
+
Robot Systems
```

## Philosophy

```text
Understand
→
Visualize
→
Experiment
→
Implement
→
Build
```

---

# 64. Homepage Final Composition

Recommended final homepage:

```text
─────────────────────────────────────────────

ROBOATLAS

Learn Robotics.
Understand the Mathematics.
Build the Algorithms.

[ Start Learning ] [ Explore Curriculum ]

─────────────────────────────────────────────

YOUR ROBOTICS JOURNEY

Level 0 → Level 20

─────────────────────────────────────────────

CORE FUNDAMENTALS

Mathematics
Geometry
Kinematics
Dynamics
Sensors
Algorithms
Control

─────────────────────────────────────────────

EXPLORE ROBOTICS

🤖 Robotic Arm
🚗 Mobile Robot
🚁 UAV / Drone
🌊 ROV / AUV
🦿 Legged Robot
🧍 Humanoid
🚢 USV
...

─────────────────────────────────────────────

INTERACTIVE LABS

Vector
Kinematics
A*
PID
Kalman
SLAM
...

─────────────────────────────────────────────

BUILD PROJECTS

2D Robot
Robot Arm
Mobile Robot
UAV
ROV
Autonomous Robot
...

─────────────────────────────────────────────

EXPLORE ALGORITHMS

Planning
Estimation
Control
Perception
Optimization
...

─────────────────────────────────────────────

LEARNING RESOURCES

Books
Papers
Courses
Videos
Datasets

─────────────────────────────────────────────

ABOUT ROBOATLAS

Theory → Mathematics → Algorithms → Simulation → Robot

─────────────────────────────────────────────
```

---

# 65. Final Product Principle

RoboAtlas should not become:

```text
"Website about mobile robots"
```

or:

```text
"Website about SLAM"
```

or:

```text
"Website about multi-agent systems"
```

Instead:

> **RoboAtlas is a general robotics learning atlas centered on fundamental robotics knowledge and its implementation across different robot platforms.**

The central learning structure is:

```text
             ROBOTICS FUNDAMENTALS
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   MATHEMATICS    PHYSICS       LOGIC
       │             │             │
       └─────────────┼─────────────┘
                     ↓
                 ALGORITHMS
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   KINEMATICS     CONTROL      PERCEPTION
       │             │             │
       └─────────────┼─────────────┘
                     ↓
               ROBOT SYSTEMS
                     │
       ┌───────┬─────┼─────┬───────┐
       ↓       ↓     ↓     ↓       ↓
      ARM    MOBILE  UAV   ROV   LEGGED
       │       │     │     │       │
       └───────┴─────┴─────┴───────┘
                     ↓
              ADVANCED ROBOTICS
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Robot AI      Multi-Agent    Research
```

This is the architectural identity of RoboAtlas.

The website should always prioritize:

> **Fundamental understanding before robot-specific implementation.**

And:

> **Mathematics + logic + algorithms + visualization + implementation = RoboAtlas learning experience.**
