# RoboAtlas — Mathematical Foundations for Robotics

This specification defines the next RoboAtlas lesson after `intro-to-robotics`.

The lesson is designed as a **mathematical bridge into robotics**, not as a generic mathematics chapter.

Its purpose is to answer:

> Why does a robot need mathematics, and how do mathematical objects become representations of physical motion?

The lesson should prioritize:

```text
Physical intuition
      ↓
Geometric interpretation
      ↓
Mathematical representation
      ↓
Formula
      ↓
Derivation
      ↓
Interactive experiment
      ↓
Robotics application
```

---

# 1. Lesson Metadata

English:

```yaml
---
id: mathematical-foundations
title: Mathematical Foundations for Robotics
slug: mathematical-foundations
category: mathematics
difficulty: beginner
language: en
interactive: true
estimatedMinutes: 60
prerequisites:
  - intro-to-robotics

references:
  - ben-ari-elements-of-robotics
  - herath-foundations-of-robotics
  - lavalle-planning
  - mit-linear-algebra

components:
  - LessonOrientation
  - MathConceptMap
  - VectorVisualizer
  - CoordinateFrameExplorer
  - MatrixTransformExplorer
  - DotProductExplorer
  - Rotation2DExplorer
  - TransformCompositionExplorer
  - DifferentialMotionExplorer
  - FunctionGraph
  - MathLab
  - ConceptCheck
  - LearningRoadmap
---
```

Indonesian:

```yaml
---
id: mathematical-foundations
title: Fundamental Matematika untuk Robotika
slug: mathematical-foundations
category: mathematics
difficulty: beginner
language: id
interactive: true
estimatedMinutes: 60
prerequisites:
  - intro-to-robotics

references:
  - ben-ari-elements-of-robotics
  - herath-foundations-of-robotics
  - lavalle-planning
  - mit-linear-algebra

components:
  - LessonOrientation
  - MathConceptMap
  - VectorVisualizer
  - CoordinateFrameExplorer
  - MatrixTransformExplorer
  - DotProductExplorer
  - Rotation2DExplorer
  - TransformCompositionExplorer
  - DifferentialMotionExplorer
  - FunctionGraph
  - MathLab
  - ConceptCheck
  - LearningRoadmap
---
```

---

# 2. Educational Goal

This lesson should prevent the common beginner problem:

> "I know how to calculate a matrix, but I don't understand why robotics uses matrices."

The learner should finish the lesson understanding that mathematics is used to represent:

```text
Position
Orientation
Direction
Motion
Uncertainty
Geometry
Relationships
Transformations
Optimization
```

The lesson should establish the foundation for later topics:

```text
Mathematics
   ↓
Coordinate Systems
   ↓
Vectors
   ↓
Matrices
   ↓
Rotations
   ↓
Transformations
   ↓
Kinematics
   ↓
Dynamics
   ↓
Control
   ↓
Localization
   ↓
Planning
```

---

# 3. Important Scope Rule

Do not attempt to teach all mathematics required for robotics in one lesson.

This lesson is a **map and foundation**.

The deeper mathematics should be separated into later lessons.

Recommended future sequence:

```text
01 Mathematical Foundations
02 Scalars, Vectors & Geometry
03 Coordinate Systems & Frames
04 Matrix Operations
05 Rotation in 2D
06 Rotation in 3D
07 Homogeneous Transformations
08 Derivatives & Motion
09 Differential Equations
10 Probability for Robotics
11 Optimization
12 Numerical Methods
13 Linear Algebra for Robotics
14 Lie Groups / SE(2) / SE(3)
```

The current lesson introduces the concepts and provides a few complete examples.

---

# 4. Opening: Why Does a Robot Need Mathematics?

Start with a physical question.

Imagine:

```text
          Goal ●

               ↑
               |
         Robot ●
```

Ask:

> How can the robot tell a computer where it is?

A human can say:

> "The robot is about two meters to the right of the wall."

A computer needs a numerical representation.

For example:

\[
\mathbf{p} =
\begin{bmatrix}
2\\
1
\end{bmatrix}
\]

Now the robot has a mathematical description of position.

The key idea:

> **Mathematics gives the robot a language for describing physical reality.**

---

# 5. Mathematical Objects in Robotics

Introduce the major objects:

```text
Scalar
  ↓
Vector
  ↓
Matrix
  ↓
Function
  ↓
Transformation
  ↓
Probability Distribution
```

Connect each to robotics.

### Scalar

One quantity:

```text
speed = 2 m/s
mass = 10 kg
angle = 30°
```

### Vector

Quantity with direction:

```text
velocity
force
position displacement
acceleration
```

### Matrix

Structured relationship or transformation:

```text
rotation
coordinate transformation
linear system
sensor model
```

### Function

Relationship between quantities:

\[
y=f(x)
\]

Examples:

```text
position → velocity
time → trajectory
sensor reading → estimated state
```

### Probability Distribution

Representation of uncertainty:

```text
robot pose
sensor measurement
landmark position
```

---

# 6. The First Core Concept: Coordinate Systems

Before vectors, introduce coordinates.

A point in 2D can be represented as:

\[
P =
\begin{bmatrix}
x\\
y
\end{bmatrix}
\]

Example:

\[
P =
\begin{bmatrix}
3\\
2
\end{bmatrix}
\]

means:

```text
3 units along x
2 units along y
```

Use an interactive coordinate plane.

```mdx
<CoordinateFrameExplorer
  dimensions="2d"
  showGrid
  showAxes
  draggablePoint
/>
```

The learner should be able to drag the point and see:

```text
x = ...
y = ...
```

The numerical representation should update immediately.

---

# 7. Coordinate Graph

The lesson should include a graph showing a point in the Cartesian plane.

Example concept:

```text
y
↑
4
│
3          ● P(3,3)
│
2
│
1
│
0──────────────→ x
  0 1 2 3 4
```

If the application supports a graphing component, use it.

For equation-based visualization, the application may use the graphable-function learning component.

For interactive coordinate points, prefer a dedicated robotics coordinate-plane component because learners need dragging and frame interaction.

---

# 8. Lab 1 — Move the Robot in a Coordinate Plane

## Purpose

Teach the relationship between:

```text
Physical position
      ↕
Coordinate
      ↕
Vector
```

## Interaction

The lab displays:

```text
        Goal ●
             |
             |
        Robot ●
```

Controls:

```text
X position
Y position
Robot orientation θ
```

The robot should move when the learner changes the values.

Display:

```text
Position:
x = 2.0 m
y = 1.5 m
θ = 30°
```

## Learning objective

The learner should discover:

> A robot's physical pose can be represented numerically.

---

# 9. Scalars

Introduce scalar quantities before vectors.

Examples:

\[
v=2\,m/s
\]

\[
m=10\,kg
\]

\[
t=5\,s
\]

\[
\theta=30^\circ
\]

A scalar has magnitude but no direction.

Important distinction:

```text
Speed
vs
Velocity
```

Speed:

```text
2 m/s
```

Velocity:

```text
2 m/s → east
```

This distinction prepares the learner for vectors.

---

# 10. Vectors

A vector represents magnitude and direction.

Example:

\[
\mathbf{v} =
\begin{bmatrix}
3\\
2
\end{bmatrix}
\]

Interpretation:

```text
3 units in x
2 units in y
```

Visualize the vector as an arrow.

```mdx
<VectorVisualizer
  vector={[3,2]}
  showComponents
  showMagnitude
  showAngle
/>
```

---

# 11. Vector Magnitude

For:

\[
\mathbf{v} =
\begin{bmatrix}
v_x\\
v_y
\end{bmatrix}
\]

the magnitude is:

\[
\|\mathbf{v}\|
=
\sqrt{v_x^2+v_y^2}
\]

Explain the origin of the equation.

The vector creates a right triangle:

```text
       ●
      /|
     / |
    /  | vy
   /   |
  ●────●
     vx
```

By the Pythagorean theorem:

\[
\text{hypotenuse}^2
=
v_x^2+v_y^2
\]

Therefore:

\[
\|\mathbf{v}\|
=
\sqrt{v_x^2+v_y^2}
\]

This is a critical example of:

```text
Geometry
   ↓
Mathematics
   ↓
Robotics
```

---

# 12. Lab 2 — Vector Laboratory

The learner controls:

```text
vx
vy
```

The visualization shows:

```text
Vector
Magnitude
Direction
X component
Y component
```

Example:

```text
vx = 3
vy = 4

magnitude = 5
```

The lab should show the 3-4-5 triangle.

Additional mode:

```text
[Normalize vector]
```

When normalized:

\[
\hat{\mathbf{v}}
=
\frac{\mathbf{v}}{\|\mathbf{v}\|}
\]

Explain that normalization produces a unit vector that preserves direction but has magnitude 1.

---

# 13. Vector Addition

Introduce:

\[
\mathbf{a}+\mathbf{b}
\]

Graphically:

```text
Start
  ●──────→ a
           \
            \
             ●────→ b
                    \
                     ● Result
```

Use head-to-tail visualization.

```mdx
<VectorVisualizer
  mode="addition"
  interactive
/>
```

The learner should be able to move both vectors.

Display:

\[
\mathbf{r}=\mathbf{a}+\mathbf{b}
\]

and its x/y components.

---

# 14. Robotics Application — Combining Motions

Explain why vector addition matters.

A robot may have:

```text
Forward velocity
+
Sideways disturbance
```

The resulting motion is a vector sum.

Similarly:

```text
Robot velocity
+
Wind velocity
=
Ground-relative velocity
```

This establishes the connection to mobile robotics and drones.

---

# 15. Dot Product

Introduce:

\[
\mathbf{a}\cdot\mathbf{b}
=
a_xb_x+a_yb_y
\]

Then explain the geometric form:

\[
\mathbf{a}\cdot\mathbf{b}
=
\|\mathbf{a}\|
\|\mathbf{b}\|
\cos\theta
\]

Do not merely state the equation.

Explain why the dot product measures how much one vector points in the direction of another.

Important cases:

### Same direction

\[
\theta=0^\circ
\]

\[
\cos 0^\circ=1
\]

Maximum positive dot product.

### Perpendicular

\[
\theta=90^\circ
\]

\[
\cos90^\circ=0
\]

Therefore:

\[
\mathbf{a}\cdot\mathbf{b}=0
\]

### Opposite direction

\[
\theta=180^\circ
\]

The dot product is negative.

---

# 16. Lab 3 — Vector Alignment

Create:

```mdx
<DotProductExplorer />
```

The learner controls two vectors.

Display:

```text
Angle
Magnitude A
Magnitude B
Dot Product
```

Visual feedback:

```text
Aligned
Partially aligned
Perpendicular
Opposite
```

Robotics applications should be shown:

```text
Direction comparison
Surface normals
Camera direction
Obstacle avoidance
Force projection
```

---

# 17. Coordinate Frames

Now introduce a deeper robotics concept.

A robot does not live in only one coordinate system.

We may have:

```text
World frame
Robot frame
Sensor frame
Camera frame
Wheel frame
Manipulator frame
```

Example:

```text
WORLD
  │
  └──── ROBOT
          │
          ├──── LiDAR
          │
          └──── Camera
```

The same physical point can have different coordinates depending on the frame.

This is one of the most important ideas in robotics.

---

# 18. Lab 4 — Multiple Coordinate Frames

Use:

```mdx
<CoordinateFrameExplorer
  mode="multi-frame"
  frames={["world","robot","sensor"]}
  interactive
/>
```

The learner can:

- move the robot
- rotate the robot
- move the sensor relative to the robot
- select a point
- switch between coordinate frames

Display:

```text
World frame:
P = (...)

Robot frame:
P = (...)

Sensor frame:
P = (...)
```

The learner should see that the physical point does not move merely because its coordinate representation changes.

---

# 19. Rotation in 2D

Introduce orientation.

A vector can be rotated by angle \(\theta\):

\[
\begin{bmatrix}
x'\\
y'
\end{bmatrix}
=
\begin{bmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{bmatrix}
\begin{bmatrix}
x\\
y
\end{bmatrix}
\]

Define:

\[
R(\theta)=
\begin{bmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{bmatrix}
\]

Then:

\[
\mathbf{v}'=R(\theta)\mathbf{v}
\]

---

# 20. Why Does the Rotation Matrix Have This Form?

This section is mandatory.

Do not simply provide the matrix.

Start with:

\[
x=r\cos\phi
\]

\[
y=r\sin\phi
\]

After rotation:

\[
\phi'=\phi+\theta
\]

Therefore:

\[
x'=r\cos(\phi+\theta)
\]

Using:

\[
\cos(\phi+\theta)
=
\cos\phi\cos\theta
-
\sin\phi\sin\theta
\]

we get:

\[
x'
=
x\cos\theta-y\sin\theta
\]

Similarly:

\[
y'
=
x\sin\theta+y\cos\theta
\]

Therefore:

\[
\begin{bmatrix}
x'\\
y'
\end{bmatrix}
=
\begin{bmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{bmatrix}
\begin{bmatrix}
x\\
y
\end{bmatrix}
\]

This derivation should be shown progressively.

---

# 21. Lab 5 — Rotation Laboratory

Use:

```mdx
<Rotation2DExplorer
  vector={[1,0]}
  angle={0}
  interactive
  showComponents
  showTrail
/>
```

Controls:

```text
Angle θ
Vector x
Vector y
```

Display:

```text
Original vector
Rotated vector
Rotation matrix
Magnitude before
Magnitude after
```

Important observation:

> A pure rotation changes direction but preserves vector magnitude.

The lab should verify:

\[
\|\mathbf{v}'\|=\|\mathbf{v}\|
\]

---

# 22. Graph — Rotation Over Time

Plot:

\[
x(t)=\cos t
\]

\[
y(t)=\sin t
\]

This creates circular motion.

The graph should help connect:

```text
sin/cos
   ↓
rotation
   ↓
circular motion
   ↓
robot orientation
```

For a graphable-function component, use:

```mdx
<FunctionGraph
  expressions={[
    "x(t)=\\cos(t)",
    "y(t)=\\sin(t)"
  ]}
/>
```

If the implementation supports parametric curves, render the trajectory as a parametric curve.

---

# 23. Matrices

Introduce matrices as structured arrays.

Example:

\[
A=
\begin{bmatrix}
1 & 2\\
3 & 4
\end{bmatrix}
\]

Do not begin with determinant calculation.

Begin with:

> A matrix can represent a transformation between numerical spaces.

This is more useful for robotics.

---

# 24. Matrix-Vector Multiplication

Show:

\[
A\mathbf{x}
\]

For:

\[
A=
\begin{bmatrix}
a&b\\
c&d
\end{bmatrix}
\]

and:

\[
\mathbf{x}
=
\begin{bmatrix}
x\\
y
\end{bmatrix}
\]

then:

\[
A\mathbf{x}
=
\begin{bmatrix}
ax+by\\
cx+dy
\end{bmatrix}
\]

Explain this geometrically.

A matrix can:

```text
Rotate
Scale
Reflect
Shear
Transform
```

depending on its structure.

---

# 25. Lab 6 — Matrix Transformation Laboratory

Use:

```mdx
<MatrixTransformExplorer
  dimension="2d"
  interactive
/>
```

The learner controls matrix parameters.

Visualize:

```text
Original grid
       ↓
Transformed grid
```

Allow:

```text
Scale X
Scale Y
Shear
Rotation
```

Display the matrix.

The learner should immediately see how changing a matrix changes geometry.

---

# 26. Determinant — Intuitive Introduction

Do not teach determinants as a calculation exercise only.

Explain the geometric interpretation:

> The absolute value of a determinant describes how a linear transformation scales area in 2D.

For:

\[
A=
\begin{bmatrix}
a&b\\
c&d
\end{bmatrix}
\]

\[
\det(A)=ad-bc
\]

If:

\[
|\det(A)|=2
\]

areas are scaled by a factor of 2.

If:

\[
\det(A)=0
\]

the transformation collapses the plane into a lower-dimensional space.

This becomes useful later for:

- invertibility
- Jacobians
- singularities

---

# 27. Inverse Matrix

Introduce:

\[
A^{-1}A=I
\]

The inverse represents the transformation that reverses another transformation when the inverse exists.

Robotics application:

```text
World → Robot
```

may be reversed as:

```text
Robot → World
```

This is the conceptual bridge toward coordinate transformations.

---

# 28. Composition of Transformations

A robot may perform several transformations:

```text
World
  ↓
Robot pose
  ↓
Sensor pose
  ↓
Measurement
```

Mathematically:

\[
T_{world}^{sensor}
=
T_{world}^{robot}
T_{robot}^{sensor}
\]

The exact notation can be adapted to the project's convention.

Important concept:

> Matrix multiplication lets us compose transformations.

---

# 29. Lab 7 — Transformation Chain

Use:

```mdx
<TransformCompositionExplorer
  frames={["world","robot","sensor"]}
  interactive
/>
```

The learner changes:

```text
Robot x
Robot y
Robot θ

Sensor x
Sensor y
Sensor θ
```

The visualization shows:

```text
World frame
   ↓
Robot frame
   ↓
Sensor frame
```

Then display the combined transformation.

This should become one of RoboAtlas's signature mathematics labs.

---

# 30. Functions

Robotics is full of functions.

Examples:

\[
x(t)
\]

\[
v(t)
\]

\[
u(t)
\]

\[
f(x)
\]

Explain that a function maps an input to an output.

Example:

\[
x(t)=vt
\]

means position depends on time.

---

# 31. Graphs and Physical Meaning

Show:

\[
x(t)=2t
\]

Interpretation:

```text
constant velocity
```

The graph should be a straight line.

Then:

\[
x(t)=t^2
\]

represents a changing velocity.

The learner should compare the graphs.

Use a graphing component.

---

# 32. Derivatives

Introduce derivative as:

> How quickly something changes.

For position:

\[
v(t)=\frac{dx(t)}{dt}
\]

For velocity:

\[
a(t)=\frac{dv(t)}{dt}
\]

Therefore:

\[
x(t)
\rightarrow
v(t)
\rightarrow
a(t)
\]

This is fundamental to:

- kinematics
- trajectory planning
- control
- dynamics

---

# 33. Lab 8 — Position, Velocity, Acceleration

Use:

```mdx
<DifferentialMotionExplorer />
```

The learner selects a trajectory.

Example:

```text
Constant velocity
Acceleration
Stop-and-go
Smooth trajectory
```

Display three synchronized graphs:

```text
Position
Velocity
Acceleration
```

The learner should see how derivatives connect the graphs.

---

# 34. Numerical Derivative

Robots usually receive sampled data.

For measurements:

\[
x_k
\]

at times:

\[
t_k
\]

a simple numerical velocity estimate is:

\[
v_k
\approx
\frac{x_k-x_{k-1}}
{t_k-t_{k-1}}
\]

Explain:

```text
Continuous mathematics
        ↓
Discrete sensor samples
        ↓
Numerical approximation
```

This is a critical bridge from mathematical theory to real robotics.

---

# 35. Lab 9 — Sensor Sampling

Create a small simulated position sensor.

Controls:

```text
Sampling frequency
Noise
Trajectory
```

Display:

```text
True position
Measured position
Estimated velocity
```

The learner should see:

- low sampling frequency
- high sampling frequency
- noisy measurements

and understand why numerical estimation can be difficult.

---

# 36. Probability — Why Robotics Needs It

Introduce uncertainty.

Suppose a sensor says:

```text
distance = 2.0 m
```

It does not necessarily mean:

```text
distance is exactly 2.000000 m
```

Instead:

```text
distance ≈ 2.0 m
```

We can represent uncertainty using probability distributions.

For example:

\[
x\sim\mathcal{N}(\mu,\sigma^2)
\]

Explain:

- \(\mu\): mean
- \(\sigma^2\): variance

Do not immediately teach full probability theory.

The objective is to understand why probability appears in robotics.

---

# 37. Lab 10 — Sensor Uncertainty

Use:

```mdx
<MathLab
  mode="gaussian"
  interactive
/>
```

Controls:

```text
Mean μ
Standard deviation σ
Number of measurements
```

Show:

```text
Probability density
Measurement samples
Mean
±1σ
±2σ
```

This prepares learners for:

- Kalman filtering
- Bayesian localization
- particle filters
- sensor fusion

---

# 38. Optimization — The Basic Idea

Introduce optimization intuitively.

A robot often needs to choose:

> Which solution is best?

Examples:

```text
Shortest path
Lowest energy
Smallest tracking error
Fastest trajectory
Best sensor estimate
```

Mathematically:

\[
\min_x f(x)
\]

means:

> Find \(x\) that makes \(f(x)\) as small as possible.

Do not start with advanced convex optimization.

Use a simple 1D example.

---

# 39. Lab 11 — Find the Minimum

Use:

```mdx
<MathLab
  mode="optimization-1d"
  function="quadratic"
  interactive
/>
```

Show:

\[
f(x)=(x-2)^2+1
\]

The learner moves \(x\).

Display:

```text
Current x
Current cost
Minimum
```

Then optionally demonstrate gradient descent.

This prepares the learner for:

- trajectory optimization
- SLAM optimization
- least squares
- model fitting
- control

---

# 40. Linear Systems

Introduce:

\[
A\mathbf{x}=\mathbf{b}
\]

Explain that many robotics problems can be written as systems of equations.

Example:

\[
\begin{bmatrix}
2&1\\
1&3
\end{bmatrix}
\begin{bmatrix}
x\\
y
\end{bmatrix}
=
\begin{bmatrix}
5\\
6
\end{bmatrix}
\]

The objective is to find \(x,y\).

Do not require advanced matrix theory yet.

Explain that this pattern appears later in:

- calibration
- least squares
- kinematics
- estimation
- control

---

# 41. Numerical Thinking

Robots run on computers.

Computers do not manipulate continuous mathematics exactly.

They use:

```text
samples
finite precision
numerical approximation
iterations
```

This creates practical concerns:

- floating-point error
- numerical stability
- sampling
- discretization

This section should prepare learners for later computational robotics.

---

# 42. The Mathematical Robotics Toolbox

End the lesson with:

```text
Scalar
  ↓
Vector
  ↓
Matrix
  ↓
Coordinate Frame
  ↓
Transformation
  ↓
Function
  ↓
Derivative
  ↓
Probability
  ↓
Optimization
  ↓
Numerical Methods
```

Then connect them to robotics:

```text
Vector
  → velocity / force / position

Matrix
  → transformation / rotation / system model

Derivative
  → velocity / acceleration / control

Probability
  → localization / sensor fusion

Optimization
  → planning / estimation / control
```

---

# 43. Final Integrated Lab — Robot Mathematics Lab

This should be the signature lab of the lesson.

Component:

```mdx
<MathLab
  mode="robot"
  interactive
/>
```

## Scenario

A 2D mobile robot must move from:

```text
Start
(0,0)
```

to:

```text
Goal
(4,3)
```

The learner can control:

```text
Robot position
Robot orientation
Velocity
Target position
Sensor noise
```

The lab displays simultaneously:

### Geometry

```text
Robot
Goal
Trajectory
Coordinate frame
```

### Vectors

```text
Position vector
Velocity vector
Goal vector
```

### Matrices

```text
Rotation matrix
Coordinate transformation
```

### Functions

```text
x(t)
y(t)
```

### Derivatives

```text
velocity
acceleration
```

### Probability

```text
position uncertainty
```

### Optimization

```text
distance-to-goal
```

This lab should make the learner realize:

> These mathematical concepts are not separate subjects. They are different tools for describing the same robot.

---

# 44. Suggested Integrated Lab Flow

The lab should have guided stages.

## Stage 1 — Position

```text
Where is the robot?
```

Learner manipulates \(x,y\).

## Stage 2 — Direction

```text
Which way is it facing?
```

Learner changes \(\theta\).

## Stage 3 — Velocity

```text
How fast is it moving?
```

Introduce:

\[
v=\frac{dx}{dt}
\]

## Stage 4 — Transformation

```text
Where is the sensor relative to the world?
```

Introduce coordinate transformations.

## Stage 5 — Noise

```text
What if the sensor is imperfect?
```

Introduce uncertainty.

## Stage 6 — Optimization

```text
How can we reduce the distance to the goal?
```

Introduce a cost function.

---

# 45. Graph Requirements

This lesson should contain meaningful graphs.

Required graph types:

### Coordinate Plane

For:

- vectors
- robot pose
- coordinate frames

### Vector Diagram

For:

- magnitude
- direction
- addition
- dot product

### Rotation Visualization

For:

- angle
- rotation matrix
- circular motion

### Transformation Grid

For:

- matrix transformations
- scaling
- rotation
- shear

### Time-Series Graph

For:

- position
- velocity
- acceleration

### Probability Distribution

For:

- sensor uncertainty

### Cost Function

For:

- optimization

Do not use decorative graphs.

Every graph must answer a learning question.

---

# 46. Graph Design Rules

Every mathematical graph should show:

- axis labels
- units where applicable
- grid when useful
- legend when multiple quantities exist
- highlighted important values
- interactive tooltips when useful
- dark/light theme compatibility

Avoid:

- unlabeled axes
- unnecessary 3D
- excessive colors
- decorative animation
- graphs without physical interpretation

---

# 47. Formula Design Rules

Every important formula must answer:

```text
What is it?
What does each variable mean?
Why does it have this form?
Where does it come from?
What does it mean physically?
Where is it used in robotics?
```

For example:

\[
\|\mathbf{v}\|
=
\sqrt{v_x^2+v_y^2}
\]

should be explained through:

```text
geometry
   ↓
Pythagorean theorem
   ↓
vector magnitude
   ↓
robot velocity
```

---

# 48. Derivation Depth

Use progressive disclosure:

```text
Quick intuition
      ↓
Formula
      ↓
Step-by-step derivation
      ↓
Advanced mathematical note
```

Do not force a beginner to read every derivation.

But do not hide derivations completely.

The learner should always have access to the reasoning.

---

# 49. Video Recommendations

Include optional external learning resources.

Recommended starting point:

### MIT OpenCourseWare — Linear Algebra

MIT's 18.06 material provides a full linear algebra course with lectures, notes, exercises, and topics including matrix operations, vector spaces, eigenvalues, linear transformations, and pseudoinverses.

Use it as an optional mathematics reference rather than a required prerequisite.

Reference:

https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/

### NPTEL — Kinematics / Coordinate Transformations

The NPTEL Introduction to Robotics lecture on coordinate transformations explains object location and motion, transformation matrices, homogeneous transformations, rotation matrices, and composite rotations.

YouTube video:

https://www.youtube.com/watch?v=XOg1KT6xD04

### MIT — Vectors, Matrices and Coordinate Transformations

MIT OpenCourseWare also provides a dedicated lecture note on vectors, matrices, and coordinate transformations.

This is particularly relevant as supplementary material for the coordinate-frame and transformation sections.

---

# 50. Recommended References

Primary RoboAtlas references:

1. Ben-Ari, M., & Mondada, F. — *Elements of Robotics*.
2. Herath, D., & St-Onge, D. (Eds.) — *Foundations of Robotics: A Multidisciplinary Approach with Python and ROS*.
3. LaValle, S. M. — *Planning Algorithms*.

Additional mathematical references:

4. MIT OpenCourseWare — *Linear Algebra*.
5. MIT OpenCourseWare — *Numerical Computation for Mechanical Engineers*.
6. Siciliano, B., Villani, L., Oriolo, G., & De Luca, A. — *Foundations of Robotics*.
7. Thrun, Burgard, & Fox — *Probabilistic Robotics* for later probability/estimation topics.

---

# 51. Reference Rationale

## Elements of Robotics

Useful because it introduces robotics algorithms using mathematics accessible around high-school and first-year college level and explicitly uses calculus, matrices, and probability in robotics examples.

## Foundations of Robotics

Useful because it provides a more mathematically rigorous robotics foundation and includes background material in linear algebra, mechanics, differential geometry, control, and graph search.

## Planning Algorithms

Useful later for connecting mathematical representations to planning.

## MIT Linear Algebra

Useful for learners who need deeper linear algebra.

## MIT Numerical Computation

Useful for connecting mathematical theory to numerical computation and engineering applications.

## Probabilistic Robotics

Use later when probability, Bayesian estimation, localization, and sensor uncertainty become major topics.

---

# 52. Agent Content Rules

When implementing this lesson:

### Do

- explain formulas
- explain variable meanings
- derive important equations
- use geometric interpretation
- connect equations to robotics
- create interactive labs
- use graphs
- provide optional deeper mathematics
- provide examples with units
- provide numerical examples
- make the simulations responsive
- support ID and EN
- support Light and Dark mode

### Do not

- dump generic mathematics
- present formulas without explanation
- use graphs merely for decoration
- introduce advanced linear algebra without motivation
- overload beginners with proofs
- make every section interactive just for the sake of interaction
- create fake simulation components
- hard-code user-facing text
- create a separate mathematical notation convention for each lesson

---

# 53. Agent Implementation Rules

Before creating a new math component:

1. Search for an existing component.
2. Reuse it if possible.
3. If a new interaction is required, define a reusable component.
4. Keep mathematical logic separate from UI.
5. Write unit tests for mathematical calculations.
6. Validate numerical edge cases.
7. Ensure deterministic simulation behavior where possible.

Example:

```text
UI
 ↓
MathLab
 ↓
Math Engine
 ↓
Tests
```

Do not put mathematical algorithms directly inside visual React components when they can be separated.

---

# 54. Numerical Validation

Every mathematical component should test:

- zero values
- negative values
- large values
- small values
- zero vectors
- normalization of zero vector
- angles near \(0\)
- angles near \(2\pi\)
- singular matrices
- non-invertible transformations

The UI should explain invalid cases rather than silently producing `NaN`.

---

# 55. Accessibility

Mathematical visualizations must have textual explanations.

For example, a graph showing:

```text
v = [3,4]
```

should also expose:

```text
Vector magnitude = 5
Direction ≈ 53.13°
```

Interactive controls must be keyboard accessible where practical.

Do not make understanding dependent solely on animation.

---

# 56. Mobile Requirements

On mobile:

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

Do not place a large simulator beside text on narrow screens.

Interactive mathematical canvases should support:

- touch
- zoom where necessary
- reset view
- large touch targets

---

# 57. Dark / Light Theme

All mathematical graphs and simulators must support:

```text
Light
Dark
```

The same semantic meaning must remain consistent.

Example:

```text
Robot
Goal
Vector
Reference frame
Trajectory
Measurement
Uncertainty
```

Do not use color as the only distinction.

---

# 58. Bilingual Requirements

Maintain:

```text
content/id/mathematics/mathematical-foundations.mdx
content/en/mathematics/mathematical-foundations.mdx
```

Both must use:

```yaml
id: mathematical-foundations
```

Formulas and code remain identical.

Explanations and UI text are translated.

Established technical terms may remain in English with an Indonesian explanation.

---

# 59. Concept Check Questions

Include small checkpoints.

Examples:

### Vector

> A vector has components \(3\) and \(4\). What is its magnitude?

Answer:

\[
5
\]

### Rotation

> What does a pure 2D rotation change?

Answer:

```text
Direction
```

while preserving magnitude.

### Coordinate Frame

> Does changing coordinate frames physically move the object?

Answer:

```text
No.
Only its numerical representation changes.
```

### Probability

> Why does a robot need probability?

Answer:

```text
Because real sensor measurements and state estimates are uncertain.
```

---

# 60. Final Learning Checklist

The learner should be able to explain:

- [ ] scalar vs vector
- [ ] vector magnitude
- [ ] vector direction
- [ ] vector addition
- [ ] dot product
- [ ] coordinate systems
- [ ] coordinate frames
- [ ] why multiple frames exist
- [ ] matrix as a transformation
- [ ] matrix-vector multiplication
- [ ] determinant intuition
- [ ] inverse matrix intuition
- [ ] 2D rotation matrix
- [ ] why the rotation matrix has its form
- [ ] composition of transformations
- [ ] functions in robotics
- [ ] derivative as rate of change
- [ ] position → velocity → acceleration
- [ ] numerical differentiation
- [ ] probability as uncertainty representation
- [ ] optimization as finding a good solution
- [ ] \(A x=b\) as a robotics-relevant linear system
- [ ] why numerical computation matters

---

# 61. Final Integrated Mental Model

End the lesson with:

```text
                ROBOT
                  │
        ┌─────────┼─────────┐
        │         │         │
     Position  Motion   Uncertainty
        │         │         │
     Vectors   Functions  Probability
        │         │         │
     Matrices Derivatives Distributions
        │         │         │
     Frames    Dynamics   Estimation
        │         │         │
        └─────────┼─────────┘
                  │
             ROBOT ALGORITHMS
```

Final message:

> Mathematics is not something added to robotics after the robot is built.
>
> Mathematics is the language we use to describe what the robot is, where it is, how it moves, what it measures, and how uncertain we are about our knowledge.

This should prepare the learner for the next lesson:

> **Coordinate Systems & Transformations**
