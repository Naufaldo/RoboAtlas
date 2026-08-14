# RoboAtlas — Expanded Intro to Robotics Content

This file contains the proposed expanded content for the first RoboAtlas lesson:

- `content/en/fundamentals/intro-to-robotics.mdx`
- `content/id/fundamentals/intro-to-robotics.mdx`

The lesson is intentionally more comprehensive than the initial draft. It introduces robotics from physical intuition first, then moves toward autonomy, sensing, computation, actuation, robot classifications, mathematical representation, and the learning roadmap.

Recommended videos are embedded as external YouTube references. RoboAtlas should embed the original YouTube player rather than download or redistribute the video.

---

# English MDX

```mdx
---
id: intro-to-robotics
title: Introduction to Robotics & Autonomous Systems
slug: intro-to-robotics
category: fundamentals
difficulty: beginner
language: en
interactive: true
estimatedMinutes: 30
prerequisites: []
references:
  - ben-ari-elements-of-robotics
  - herath-foundations-of-robotics
components:
  - LessonOrientation
  - VideoEmbed
  - SensePlanActExplorer
  - RobotClassificationExplorer
  - RobotSystemDiagram
  - ConceptCheck
  - LearningRoadmap
---

# Introduction to Robotics & Autonomous Systems

## What is Robotics?

When you hear the word **robot**, you might imagine a humanoid, a robotic arm in a factory, a delivery robot, or a drone.

But robotics is much broader than humanoid robots.

Robotics is an interdisciplinary field concerned with building machines that can **sense, compute, and act in the physical world**.

A useful way to think about a robot is:

> A robot is a physical machine that uses sensing, computation, and actuation to perform tasks in the physical world.

There is no single definition of "robot" that is universally accepted. Different fields emphasize different properties such as embodiment, sensing, computation, autonomy, programmability, and interaction with the environment.

The important idea for this course is that a robot is not simply a computer and not simply a machine.

It is a system that connects:

```text
Physical World
      ↕
    Robot
      ↕
Computation
```

### A robot combines several disciplines

Robotics brings together:

```text
Mechanical Engineering
        +
Electrical / Electronics
        +
Control Systems
        +
Computer Science
        +
Artificial Intelligence
        +
Mathematics
        +
Physics
```

That is why robotics can initially feel difficult: a robot is a complete system rather than a single subject.

---

## Start With a Simple Question

Imagine a mobile robot in a warehouse.

Its task is:

> Move from its charging station to a storage location without hitting people or shelves.

What does the robot need to do?

It must:

1. Know something about itself.
2. Observe its environment.
3. Understand where it is.
4. Decide where it should go.
5. Determine how to get there.
6. Move its motors.
7. Observe what happened.
8. Correct its behavior when reality differs from the plan.

This creates the central idea of autonomous robotics:

```text
Sense
  ↓
Understand
  ↓
Plan
  ↓
Act
  ↓
Observe Again
  ↺
```

This is the beginning of the **sense-plan-act** view of robotics.

---

## Video: What Is a Robot?

For a short introduction, watch this discussion from Oregon State University in which robotics professor Kagan Tumer discusses what qualifies as a robot and why the definition is not always obvious.

<VideoEmbed
  title="What is a robot?"
  provider="youtube"
  videoId="-nGlDsk1rS4"
  sourceUrl="https://www.youtube.com/watch?v=-nGlDsk1rS4"
/>

The video is especially useful before continuing into the technical definition.

---

## What Makes a Robot Different From Ordinary Automation?

Consider a washing machine.

A washing machine may:

- measure water level
- measure temperature
- control a motor
- follow a programmed sequence
- react to some sensor readings

So is it a robot?

There is no universally accepted yes/no definition.

The more useful distinction for RoboAtlas is **closed-loop physical interaction and autonomy**.

Compare:

### Fixed sequence

```text
Start
  ↓
Fill water
  ↓
Heat
  ↓
Wash
  ↓
Spin
  ↓
Stop
```

The sequence is largely predetermined.

### Autonomous robot

```text
Observe
   ↓
Estimate state
   ↓
Interpret environment
   ↓
Choose action
   ↓
Move
   ↓
Observe result
   ↓
Update state
   ↺
```

The second system continuously uses information from the environment to influence future actions.

This does not mean every robot must use advanced AI.

A robot can be autonomous using relatively simple algorithms.

---

# The Sense–Plan–Act Loop

The simplest mental model for autonomous robotics is:

```text
             ┌───────────────┐
             │   ENVIRONMENT │
             └───────┬───────┘
                     │
                  SENSE
                     │
                     ▼
             ┌───────────────┐
             │   ESTIMATE    │
             │  / PERCEIVE   │
             └───────┬───────┘
                     │
                   PLAN
                     │
                     ▼
             ┌───────────────┐
             │     ACT       │
             │  Motor/Servo  │
             └───────┬───────┘
                     │
                     ▼
                ENVIRONMENT
                     │
                     └───────────↺
```

In practice, modern robots often use a more detailed pipeline:

```text
Sensors
   ↓
Signal Processing
   ↓
State Estimation
   ↓
Perception
   ↓
Mapping / Localization
   ↓
Planning
   ↓
Control
   ↓
Actuators
   ↓
Robot Motion
   ↓
Sensors
```

The exact architecture depends on the robot.

---

## Interactive: Build the Robot Loop

<SensePlanActExplorer />

Try changing the task or sensor configuration.

Observe how information flows from:

```text
Environment
     ↓
Sensors
     ↓
Computation
     ↓
Decision
     ↓
Actuators
     ↓
Physical Motion
```

The purpose of this interaction is not to simulate a complete robot.

It is to understand the **information flow** inside a robotic system.

---

# 1. Sense — How Does a Robot Know What Is Happening?

A robot cannot directly "see the world" in the human sense.

It receives measurements from sensors.

Sensors convert physical phenomena into information that a computer can process.

---

## Proprioceptive Sensors

**Proprioception** refers to information about the robot's own internal state.

Examples:

- wheel encoders
- joint encoders
- IMU
- motor current
- battery voltage
- joint torque sensors

For example:

A wheel encoder may tell the robot how much a wheel has rotated.

An IMU may provide measurements related to:

- acceleration
- angular velocity
- orientation estimation

This information helps answer:

> "What is happening to the robot itself?"

---

## Exteroceptive Sensors

**Exteroceptive sensors** measure the environment around the robot.

Examples:

- LiDAR
- RGB cameras
- stereo cameras
- depth cameras
- ultrasonic sensors
- radar
- GPS/GNSS

These help answer:

> "What is happening around me?"

---

## Sensors Are Not Perfect

A critical robotics concept is:

> **Measurements are uncertain.**

A LiDAR measurement can contain noise.

A camera can be affected by:

- lighting
- shadows
- reflections
- occlusion

An encoder can be affected by:

- wheel slip
- quantization
- mechanical errors

Therefore:

```text
Sensor measurement
       ↓
uncertainty
       ↓
estimation
       ↓
decision
```

This is why robotics later requires topics such as:

- probability
- Bayesian estimation
- Kalman filters
- particle filters
- sensor fusion

---

# 2. Estimate and Understand

Raw sensor data is rarely enough.

Suppose a robot receives:

```text
Left wheel encoder = 1250 ticks
Right wheel encoder = 1310 ticks
IMU angular velocity = ...
LiDAR scan = ...
Camera image = ...
```

The robot must convert these measurements into useful information.

For example:

```text
Raw measurements
       ↓
Processing
       ↓
Estimated robot pose
       ↓
Environment representation
```

A robot's **state** may contain:

\[
x =
\begin{bmatrix}
x \\
y \\
\theta
\end{bmatrix}
\]

where:

- \(x\) = position along one axis
- \(y\) = position along another axis
- \(\theta\) = orientation

This is one of the first mathematical representations used in mobile robotics.

Later, RoboAtlas will derive where this representation comes from and how a robot estimates it.

---

# 3. Plan — What Should the Robot Do?

Once the robot has information about itself and the environment, it must decide what to do.

Planning can happen at different levels.

### High-level planning

```text
Warehouse
   ↓
Storage Area A
   ↓
Aisle 4
   ↓
Shelf 12
```

### Path planning

Find a collision-free path:

```text
Start ●
      \
       \
     ████
     ████
          \
           \
            ● Goal
```

### Motion planning

Consider the robot's physical constraints:

- turning radius
- wheel configuration
- velocity
- acceleration
- obstacles

### Task planning

A robot may need to decide:

```text
Pick object
   ↓
Move to station
   ↓
Place object
   ↓
Return
```

These are different planning problems.

RoboAtlas will later separate:

```text
Task Planning
Path Planning
Motion Planning
Trajectory Planning
Control
```

---

# 4. Act — How Does the Robot Move?

A plan is useless unless the robot can physically execute it.

Actuators convert commands into physical motion.

Examples:

- DC motors
- BLDC motors
- servo motors
- stepper motors
- hydraulic actuators
- pneumatic actuators

For a wheeled robot:

```text
Command
   ↓
Motor Controller
   ↓
Motor
   ↓
Wheel
   ↓
Robot Motion
```

The robot must also deal with physical limitations.

A command such as:

```text
"Move forward at 10 m/s"
```

may be impossible for a small robot.

Therefore planning and control must consider:

- maximum velocity
- maximum acceleration
- motor torque
- friction
- wheel slip
- battery limitations
- mechanical constraints

---

# The Complete Robotic System

A useful abstraction is:

```text
                ENVIRONMENT
                     │
                     ▼
                  SENSORS
                     │
                     ▼
              PERCEPTION
                     │
                     ▼
           STATE ESTIMATION
                     │
                     ▼
          MAPPING / LOCALIZATION
                     │
                     ▼
                 PLANNING
                     │
                     ▼
                  CONTROL
                     │
                     ▼
                ACTUATORS
                     │
                     ▼
                  ROBOT
                     │
                     └──────────→ ENVIRONMENT
```

Notice something important:

> The robot does not simply calculate a command once.

It repeatedly interacts with the physical world.

This is why robotics is fundamentally a **closed-loop systems problem**.

---

# Open Loop vs Closed Loop

This distinction is essential.

## Open Loop

```text
Command
  ↓
Actuator
  ↓
Robot
  ↓
Result
```

The system does not use the result to correct the next command.

Example:

> Rotate the motor for exactly 2 seconds.

What if:

- the load changes?
- the wheel slips?
- the battery voltage changes?
- the motor is blocked?

The command does not automatically compensate.

---

## Closed Loop

```text
Desired State
      ↓
    Error ←────────────┐
      ↓                │
   Controller          │
      ↓                │
   Actuator            │
      ↓                │
     Robot             │
      ↓                │
    Sensor ────────────┘
```

The robot measures what actually happened and uses that information to correct its behavior.

This concept becomes fundamental when we study:

- feedback control
- PID
- localization
- trajectory tracking
- state estimation

---

# Robot Classification

Robots can be classified in many ways.

One useful approach is by how they interact with the physical world.

<RobotClassificationExplorer />

## 1. Fixed-Base Manipulators

Examples:

- industrial robot arms
- welding robots
- assembly robots
- collaborative robot arms

They are usually mounted to a fixed base.

Their main task is often manipulating objects.

Typical topics:

```text
Forward Kinematics
Inverse Kinematics
Jacobian
Dynamics
Force Control
Motion Planning
```

---

## 2. Mobile Ground Robots

Examples:

- differential-drive robots
- mecanum robots
- Ackermann vehicles
- tracked robots
- quadrupeds
- humanoids

They must solve additional problems:

```text
Localization
Mapping
Navigation
Path Planning
Obstacle Avoidance
Motion Control
```

A mobile robot's position changes continuously in the environment.

---

## 3. Aerial Robots

Examples:

- quadrotors
- fixed-wing UAVs
- autonomous helicopters

They operate in three-dimensional space and often require:

- 3D localization
- attitude estimation
- trajectory planning
- flight control

---

## 4. Marine Robots

Examples:

- Autonomous Underwater Vehicles (AUVs)
- Autonomous Surface Vehicles (ASVs)

They face additional challenges:

- underwater localization
- water currents
- limited communication
- pressure
- buoyancy
- environmental uncertainty

---

# Degrees of Freedom

A useful concept for describing robot motion is **degree of freedom (DOF)**.

A degree of freedom describes an independent way a system can move.

For a rigid body in 2D:

```text
        y
        ↑
        |
        |     ↗ orientation
        |    /
        |   ●
        |
        +────────→ x
```

It can have:

```text
x translation
y translation
rotation θ
```

Therefore:

\[
\mathbf{x} =
\begin{bmatrix}
x\\
y\\
\theta
\end{bmatrix}
\]

This is a **3-DOF planar pose**.

For a rigid body in 3D, the pose generally contains:

```text
x
y
z

roll
pitch
yaw
```

giving:

\[
6\text{ DOF}
\]

This concept becomes important later when learning coordinate transformations and robot kinematics.

---

# Why Robotics Needs Mathematics

A robot interacts with a physical world.

To control that interaction, we need mathematical models.

For example:

```text
Physical robot
      ↓
Position
      ↓
Velocity
      ↓
Acceleration
      ↓
Force / Torque
      ↓
Mathematical model
      ↓
Controller
```

Important mathematical topics include:

```text
Vectors
Matrices
Geometry
Trigonometry
Coordinate Systems
Transformations
Calculus
Differential Equations
Probability
Statistics
Optimization
```

But you do not need to learn all of them before starting robotics.

RoboAtlas will introduce them when they become useful.

---

# Robotics as a Stack

One useful way to organize robotics is:

```text
                    ROBOTICS
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Hardware      Algorithms      Mathematics
        │              │              │
        │              │              │
   Sensors         Perception       Vectors
   Actuators       Localization     Matrices
   Motors          Mapping          Geometry
   Mechanics       Planning         Probability
                   Control          Optimization
```

At a higher level:

```text
Hardware
   ↓
Low-Level Control
   ↓
State Estimation
   ↓
Perception
   ↓
Localization / Mapping
   ↓
Planning
   ↓
Decision Making
   ↓
Autonomy
```

These layers are connected.

Changing the hardware can change the algorithms.

Changing the algorithm can change the computational requirements.

Changing the environment can change the planning strategy.

---

# Robotics Is Not Just AI

Artificial intelligence is important in modern robotics, but robotics is broader than AI.

A robot may use:

- classical control
- geometry
- optimization
- probability
- graph algorithms
- computer vision
- machine learning
- reinforcement learning

For example:

A robot can use A* for path planning without using machine learning.

A PID controller does not require AI.

An encoder-based odometry system does not require deep learning.

Therefore:

> **Robotics is an interdisciplinary field, not simply physical AI.**

---

# Interactive Experiment: Build Your Robot

<RobotSystemDiagram />

Try identifying:

```text
Sensor
   ↓
Computation
   ↓
Decision
   ↓
Actuator
```

Ask yourself:

> If the sensor becomes noisy, which part of the system is affected?

> If the motor becomes weaker, which part of the system is affected?

> If the map is wrong, can the planner still produce a safe path?

These questions are the foundation of robotic system thinking.

---

# A First Mathematical Example

Suppose a mobile robot moves:

\[
\Delta x = 2\text{ m}
\]

in:

\[
\Delta t = 1\text{ s}
\]

Its average speed is:

\[
v = \frac{\Delta x}{\Delta t}
\]

Therefore:

\[
v = \frac{2}{1}=2\text{ m/s}
\]

Why does the equation make sense?

Because velocity describes how much position changes per unit time.

```text
2 meters
────────
1 second

= 2 m/s
```

This simple equation becomes the foundation for much more advanced concepts:

```text
Position
   ↓ derivative
Velocity
   ↓ derivative
Acceleration
```

Later we will connect this to:

- robot kinematics
- wheel velocity
- trajectory generation
- feedback control

---

# Your Robotics Learning Map

<LearningRoadmap />

A suggested learning progression is:

```text
01 Fundamentals
       ↓
02 Mathematics
       ↓
03 Robot Motion & Kinematics
       ↓
04 Sensors & Perception
       ↓
05 Localization
       ↓
06 Mapping & SLAM
       ↓
07 Path Planning
       ↓
08 Control
       ↓
09 Advanced Robotics
       ↓
10 Multi-Agent Robotics
```

You do not need to master everything before building robots.

The important skill is learning how the pieces connect.

---

# Concept Check

<ConceptCheck
  question="Which sequence best represents the core loop of an autonomous robot?"
  options={[
    "Sense → Plan → Act",
    "Act → Sense → Stop",
    "Plan → Build → Stop",
    "Compute → Ignore → Act"
  ]}
  answer="Sense → Plan → Act"
/>

---

# What You Should Understand Now

After this lesson, you should be able to explain:

- what robotics is
- why there is no single universal definition of a robot
- the difference between automation and autonomous interaction
- what sensors do
- the difference between proprioceptive and exteroceptive sensing
- why sensor measurements are uncertain
- what state estimation means
- what planning means
- what actuators do
- the sense-plan-act loop
- open-loop vs closed-loop behavior
- common robot classifications
- what degrees of freedom mean
- why mathematics is important in robotics
- why robotics is broader than AI

You do **not** need to memorize every term yet.

The goal is to build a mental model of the field.

---

# What Comes Next?

Now that we understand the basic architecture of a robot, we can begin studying the mathematical language robots use to describe the world.

Next:

> **Coordinate Systems & Vectors**

We will start with something simple:

```text
Where is the robot?
Where is the object?
Which direction is the robot facing?
```

Those questions lead directly to vectors, coordinates, transformations, and eventually robot kinematics.

---

## Recommended Videos

### Short introduction

**Oregon State University — What is a robot?**

A short discussion about the definition of a robot and autonomy.

<VideoEmbed
  title="Expert Answers | What is a robot?"
  provider="youtube"
  videoId="-nGlDsk1rS4"
  sourceUrl="https://www.youtube.com/watch?v=-nGlDsk1rS4"
/>

### University lecture

**Stanford CS223A — Lecture 1: Introduction to Robotics**

A much deeper university-level introduction by Professor Oussama Khatib.

<VideoEmbed
  title="Lecture 1 | Introduction to Robotics"
  provider="youtube"
  videoId="0yD3uBshJB0"
  sourceUrl="https://www.youtube.com/watch?v=0yD3uBshJB0"
/>

The Stanford lecture is more mathematical and should be treated as an optional deeper resource rather than a prerequisite for this beginner lesson.

---

## References

1. Ben-Ari, M., & Mondada, F. (2018). *Elements of Robotics*. Springer. https://doi.org/10.1007/978-3-319-62533-1
2. Herath, D., & St-Onge, D. (Eds.). (2022). *Foundations of Robotics: A Multidisciplinary Approach with Python and ROS*. Springer. https://doi.org/10.1007/978-981-19-1983-1
3. Stanford University, CS223A, *Introduction to Robotics*.
4. Oregon State University, *What is a robot?*
```

---

# Indonesian MDX

```mdx
---
id: intro-to-robotics
title: Pengantar Robotika & Sistem Otonom
slug: intro-to-robotics
category: fundamentals
difficulty: beginner
language: id
interactive: true
estimatedMinutes: 30
prerequisites: []
references:
  - ben-ari-elements-of-robotics
  - herath-foundations-of-robotics
components:
  - LessonOrientation
  - VideoEmbed
  - SensePlanActExplorer
  - RobotClassificationExplorer
  - RobotSystemDiagram
  - ConceptCheck
  - LearningRoadmap
---

# Pengantar Robotika & Sistem Otonom

## Apa Itu Robotika?

Ketika mendengar kata **robot**, mungkin yang terbayang adalah humanoid, lengan robot di pabrik, robot pengantar barang, atau drone.

Namun, robotika jauh lebih luas daripada robot humanoid.

Robotika merupakan bidang interdisipliner yang mempelajari bagaimana membangun mesin yang dapat **merasakan, menghitung, dan bertindak di dunia fisik**.

Cara sederhana untuk memandang sebuah robot adalah:

> Robot adalah mesin fisik yang menggunakan sensing, komputasi, dan aktuasi untuk melakukan tugas di dunia fisik.

Tidak ada satu definisi "robot" yang diterima secara universal. Berbagai bidang menekankan aspek yang berbeda seperti embodiment, sensing, komputasi, otonomi, kemampuan diprogram, dan interaksi dengan lingkungan.

Hal yang penting untuk RoboAtlas adalah memahami bahwa robot bukan hanya komputer dan bukan hanya mesin.

Robot merupakan sistem yang menghubungkan:

```text
Dunia Fisik
     ↕
   Robot
     ↕
Komputasi
```

### Robot Menggabungkan Banyak Disiplin

Robotika menggabungkan:

```text
Teknik Mesin
     +
Elektronika
     +
Sistem Kendali
     +
Ilmu Komputer
     +
Kecerdasan Buatan
     +
Matematika
     +
Fisika
```

Inilah salah satu alasan robotika pada awalnya terasa sulit: robot merupakan sebuah sistem yang utuh, bukan satu bidang yang berdiri sendiri.

---

## Mulai Dengan Pertanyaan Sederhana

Bayangkan sebuah robot bergerak di dalam gudang.

Tugasnya:

> Bergerak dari charging station menuju lokasi penyimpanan tanpa menabrak manusia atau rak.

Apa yang harus dilakukan robot?

Robot harus:

1. Mengetahui kondisi dirinya sendiri.
2. Mengamati lingkungan.
3. Mengetahui atau memperkirakan posisinya.
4. Menentukan apa yang harus dilakukan.
5. Menentukan bagaimana cara menuju tujuan.
6. Menggerakkan motor.
7. Mengamati hasil gerakannya.
8. Memperbaiki perilakunya ketika kenyataan berbeda dari rencana.

Inilah ide dasar robotika otonom:

```text
Sense
  ↓
Understand
  ↓
Plan
  ↓
Act
  ↓
Observe Again
  ↺
```

Ini menjadi dasar cara kita memahami **sense-plan-act** dalam robotika.

---

## Video: Apa Itu Robot?

Untuk pengantar singkat, Anda dapat menonton video dari Oregon State University. Profesor robotika Kagan Tumer membahas apa yang dapat disebut robot dan mengapa definisi robot ternyata tidak selalu sederhana.

<VideoEmbed
  title="What is a robot?"
  provider="youtube"
  videoId="-nGlDsk1rS4"
  sourceUrl="https://www.youtube.com/watch?v=-nGlDsk1rS4"
/>

Video ini cocok ditonton sebelum masuk ke penjelasan teknis.

---

# Apa yang Membuat Robot Berbeda dari Otomasi Biasa?

Bayangkan sebuah mesin cuci.

Mesin cuci dapat:

- mengukur ketinggian air
- mengukur temperatur
- mengendalikan motor
- mengikuti urutan program
- merespons beberapa sensor

Apakah mesin cuci merupakan robot?

Tidak ada jawaban universal yang sederhana.

Untuk RoboAtlas, perbedaan yang lebih berguna adalah memahami **interaksi fisik closed-loop dan otonomi**.

### Urutan Tetap

```text
Start
  ↓
Isi air
  ↓
Panaskan
  ↓
Cuci
  ↓
Spin
  ↓
Stop
```

Sebagian besar perilaku telah ditentukan sebelumnya.

### Robot Otonom

```text
Amati
   ↓
Estimasi keadaan
   ↓
Pahami lingkungan
   ↓
Pilih aksi
   ↓
Bergerak
   ↓
Amati hasil
   ↓
Perbarui keadaan
   ↺
```

Sistem kedua terus menggunakan informasi dari lingkungan untuk memengaruhi tindakan berikutnya.

Ini tidak berarti setiap robot harus menggunakan AI canggih.

Robot dapat bersifat otonom dengan algoritma yang relatif sederhana.

---

# Siklus Sense–Plan–Act

Model mental paling sederhana untuk robotika otonom adalah:

```text
             ┌───────────────┐
             │   LINGKUNGAN  │
             └───────┬───────┘
                     │
                   SENSE
                     │
                     ▼
             ┌───────────────┐
             │   ESTIMASI    │
             │  / PERSEPSI   │
             └───────┬───────┘
                     │
                   PLAN
                     │
                     ▼
             ┌───────────────┐
             │     ACT       │
             │ Motor / Servo │
             └───────┬───────┘
                     │
                     ▼
                  ROBOT
                     │
                     └───────────↺
```

Pada robot modern, arsitekturnya sering lebih detail:

```text
Sensor
   ↓
Pemrosesan Sinyal
   ↓
Estimasi Keadaan
   ↓
Persepsi
   ↓
Mapping / Localization
   ↓
Planning
   ↓
Control
   ↓
Aktuator
   ↓
Gerakan Robot
   ↓
Sensor
```

Arsitektur sebenarnya bergantung pada jenis robot dan tugasnya.

---

## Interaktif: Bangun Siklus Robot

<SensePlanActExplorer />

Coba ubah konfigurasi tugas atau sensor.

Perhatikan bagaimana informasi mengalir:

```text
Lingkungan
     ↓
Sensor
     ↓
Komputasi
     ↓
Keputusan
     ↓
Aktuator
     ↓
Gerakan Fisik
```

Tujuan simulasi ini bukan membuat simulator robot lengkap.

Tujuannya adalah memahami **aliran informasi dalam sistem robotik**.

---

# 1. Sense — Bagaimana Robot Mengetahui Apa yang Terjadi?

Robot tidak secara langsung "melihat dunia" seperti manusia.

Robot menerima pengukuran dari sensor.

Sensor mengubah fenomena fisik menjadi informasi yang dapat diproses komputer.

---

## Sensor Proprioseptif

**Propriosepsi** adalah informasi mengenai keadaan internal robot.

Contohnya:

- wheel encoder
- joint encoder
- IMU
- arus motor
- tegangan baterai
- torque sensor

Misalnya:

Wheel encoder dapat memberi tahu robot seberapa jauh roda telah berputar.

IMU dapat memberikan informasi yang berkaitan dengan:

- percepatan
- kecepatan sudut
- estimasi orientasi

Sensor tersebut membantu menjawab:

> "Apa yang sedang terjadi pada robot saya sendiri?"

---

## Sensor Eksteroseptif

**Sensor eksteroseptif** mengukur lingkungan di sekitar robot.

Contohnya:

- LiDAR
- kamera RGB
- kamera stereo
- depth camera
- sensor ultrasonik
- radar
- GPS/GNSS

Sensor ini membantu menjawab:

> "Apa yang sedang terjadi di sekitar saya?"

---

## Sensor Tidak Sempurna

Salah satu konsep paling penting dalam robotika adalah:

> **Pengukuran selalu memiliki ketidakpastian.**

Pengukuran LiDAR dapat mengandung noise.

Kamera dapat dipengaruhi:

- pencahayaan
- bayangan
- refleksi
- occlusion

Encoder dapat dipengaruhi:

- wheel slip
- kuantisasi
- kesalahan mekanis

Karena itu:

```text
Pengukuran Sensor
       ↓
Ketidakpastian
       ↓
Estimasi
       ↓
Keputusan
```

Inilah alasan robotika membutuhkan topik seperti:

- probabilitas
- Bayesian estimation
- Kalman filter
- particle filter
- sensor fusion

---

# 2. Estimate and Understand

Data sensor mentah biasanya belum cukup.

Misalnya robot menerima:

```text
Left wheel encoder = 1250 ticks
Right wheel encoder = 1310 ticks
IMU angular velocity = ...
LiDAR scan = ...
Camera image = ...
```

Robot perlu mengubah pengukuran tersebut menjadi informasi yang berguna.

Contohnya:

```text
Pengukuran mentah
       ↓
Pemrosesan
       ↓
Estimasi pose robot
       ↓
Representasi lingkungan
```

Keadaan atau **state** robot dapat direpresentasikan sebagai:

\[
x =
\begin{bmatrix}
x \\
y \\
\theta
\end{bmatrix}
\]

dengan:

- \(x\) = posisi pada satu sumbu
- \(y\) = posisi pada sumbu lainnya
- \(\theta\) = orientasi

Ini merupakan salah satu representasi matematika awal dalam mobile robotics.

Nantinya RoboAtlas akan menjelaskan dari mana representasi ini berasal dan bagaimana robot mengestimasi nilainya.

---

# 3. Plan — Apa yang Harus Dilakukan Robot?

Setelah memiliki informasi tentang dirinya dan lingkungan, robot harus menentukan apa yang harus dilakukan.

Planning dapat terjadi pada beberapa tingkat.

### High-Level Planning

```text
Gudang
   ↓
Area Penyimpanan A
   ↓
Aisle 4
   ↓
Shelf 12
```

### Path Planning

Mencari jalur yang bebas tabrakan:

```text
Start ●
      \
       \
     ████
     ████
          \
           \
            ● Goal
```

### Motion Planning

Mempertimbangkan batasan fisik robot:

- turning radius
- velocity
- acceleration
- konfigurasi roda
- obstacle

### Task Planning

Robot dapat perlu menentukan:

```text
Ambil objek
   ↓
Pergi ke station
   ↓
Letakkan objek
   ↓
Kembali
```

Ini adalah jenis masalah planning yang berbeda.

RoboAtlas nantinya akan membedakan:

```text
Task Planning
Path Planning
Motion Planning
Trajectory Planning
Control
```

---

# 4. Act — Bagaimana Robot Bergerak?

Planning tidak berguna jika robot tidak dapat menjalankan perintah secara fisik.

Aktuator mengubah perintah menjadi gerakan fisik.

Contohnya:

- DC motor
- BLDC motor
- servo motor
- stepper motor
- hydraulic actuator
- pneumatic actuator

Untuk robot beroda:

```text
Command
   ↓
Motor Controller
   ↓
Motor
   ↓
Wheel
   ↓
Gerakan Robot
```

Robot juga harus menghadapi keterbatasan fisik.

Perintah:

```text
"Bergerak maju dengan kecepatan 10 m/s"
```

mungkin tidak mungkin dilakukan oleh robot kecil.

Karena itu planning dan control harus mempertimbangkan:

- maximum velocity
- maximum acceleration
- motor torque
- friction
- wheel slip
- battery limitation
- mechanical constraints

---

# Sistem Robot Secara Keseluruhan

Abstraksi yang berguna:

```text
                 LINGKUNGAN
                      │
                      ▼
                    SENSOR
                      │
                      ▼
                  PERSEPSI
                      │
                      ▼
              STATE ESTIMATION
                      │
                      ▼
          MAPPING / LOCALIZATION
                      │
                      ▼
                   PLANNING
                      │
                      ▼
                    CONTROL
                      │
                      ▼
                  AKTUATOR
                      │
                      ▼
                    ROBOT
                      │
                      └──────────→ LINGKUNGAN
```

Perhatikan hal penting:

> Robot tidak sekadar menghitung perintah satu kali.

Robot terus berinteraksi dengan dunia fisik.

Inilah alasan robotika pada dasarnya merupakan masalah **closed-loop system**.

---

# Open Loop vs Closed Loop

Perbedaan ini sangat penting.

## Open Loop

```text
Command
  ↓
Actuator
  ↓
Robot
  ↓
Result
```

Hasilnya tidak digunakan untuk memperbaiki perintah berikutnya.

Contoh:

> Putar motor selama tepat 2 detik.

Bagaimana jika:

- beban berubah?
- roda mengalami slip?
- tegangan baterai turun?
- motor terhambat?

Perintah tersebut tidak otomatis mengompensasi perubahan.

---

## Closed Loop

```text
Desired State
      ↓
    Error ←────────────┐
      ↓                │
 Controller            │
      ↓                │
 Actuator              │
      ↓                │
 Robot                 │
      ↓                │
 Sensor ───────────────┘
```

Robot mengukur apa yang benar-benar terjadi dan menggunakan informasi tersebut untuk memperbaiki perilakunya.

Konsep ini menjadi dasar:

- feedback control
- PID
- localization
- trajectory tracking
- state estimation

---

# Klasifikasi Robot

Robot dapat diklasifikasikan dengan berbagai cara.

Salah satu pendekatan adalah berdasarkan bagaimana robot berinteraksi dengan dunia fisik.

<RobotClassificationExplorer />

## 1. Fixed-Base Manipulator

Contoh:

- industrial robot arm
- welding robot
- assembly robot
- collaborative robot arm

Robot biasanya dipasang pada base yang tetap.

Tugas utamanya sering berkaitan dengan manipulasi objek.

Topik yang umum:

```text
Forward Kinematics
Inverse Kinematics
Jacobian
Dynamics
Force Control
Motion Planning
```

---

## 2. Mobile Ground Robot

Contoh:

- differential-drive robot
- mecanum robot
- Ackermann vehicle
- tracked robot
- quadruped
- humanoid

Robot bergerak di lingkungan sehingga harus menangani:

```text
Localization
Mapping
Navigation
Path Planning
Obstacle Avoidance
Motion Control
```

---

## 3. Aerial Robot

Contoh:

- quadrotor
- fixed-wing UAV
- autonomous helicopter

Robot beroperasi dalam ruang tiga dimensi dan sering membutuhkan:

- 3D localization
- attitude estimation
- trajectory planning
- flight control

---

## 4. Marine Robot

Contoh:

- Autonomous Underwater Vehicle (AUV)
- Autonomous Surface Vehicle (ASV)

Robot menghadapi tantangan seperti:

- underwater localization
- water currents
- limited communication
- pressure
- buoyancy
- environmental uncertainty

---

# Degrees of Freedom

Konsep penting untuk menggambarkan gerakan robot adalah **degree of freedom (DOF)**.

Degree of freedom menggambarkan cara independen sebuah sistem dapat bergerak.

Untuk rigid body dalam 2D:

```text
        y
        ↑
        |
        |     ↗ orientasi
        |    /
        |   ●
        |
        +────────→ x
```

Robot dapat memiliki:

```text
translasi x
translasi y
rotasi θ
```

Sehingga:

\[
\mathbf{x} =
\begin{bmatrix}
x\\
y\\
\theta
\end{bmatrix}
\]

Ini merupakan **pose 3-DOF pada bidang 2D**.

Untuk rigid body dalam 3D, pose umumnya terdiri dari:

```text
x
y
z

roll
pitch
yaw
```

sehingga:

\[
6\text{ DOF}
\]

Konsep ini akan menjadi dasar untuk coordinate transformation dan robot kinematics.

---

# Mengapa Robotika Membutuhkan Matematika?

Robot berinteraksi dengan dunia fisik.

Untuk mengendalikan interaksi tersebut, kita membutuhkan model matematis.

Contohnya:

```text
Robot Fisik
      ↓
Posisi
      ↓
Kecepatan
      ↓
Percepatan
      ↓
Gaya / Torsi
      ↓
Model Matematis
      ↓
Controller
```

Beberapa topik matematika penting:

```text
Vector
Matrix
Geometry
Trigonometry
Coordinate Systems
Transformations
Calculus
Differential Equations
Probability
Statistics
Optimization
```

Namun Anda tidak perlu menguasai semuanya sebelum mulai belajar robotika.

RoboAtlas akan memperkenalkannya ketika memang diperlukan.

---

# Robotika sebagai Sebuah Stack

Cara lain untuk melihat robotika:

```text
                    ROBOTIKA
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Hardware      Algorithms      Mathematics
        │              │              │
     Sensor         Perception       Vector
     Aktuator       Localization     Matrix
     Motor          Mapping          Geometry
     Mekanik        Planning         Probability
                    Control          Optimization
```

Pada tingkat yang lebih tinggi:

```text
Hardware
   ↓
Low-Level Control
   ↓
State Estimation
   ↓
Perception
   ↓
Localization / Mapping
   ↓
Planning
   ↓
Decision Making
   ↓
Autonomy
```

Lapisan-lapisan ini saling berhubungan.

Perubahan hardware dapat memengaruhi algoritma.

Perubahan algoritma dapat memengaruhi kebutuhan komputasi.

Perubahan lingkungan dapat mengubah strategi planning.

---

# Robotika Bukan Sekadar AI

AI penting dalam robotika modern, tetapi robotika lebih luas daripada AI.

Robot dapat menggunakan:

- classical control
- geometry
- optimization
- probability
- graph algorithms
- computer vision
- machine learning
- reinforcement learning

Contohnya:

Robot dapat menggunakan A* untuk path planning tanpa machine learning.

PID controller tidak membutuhkan AI.

Odometry berbasis encoder tidak membutuhkan deep learning.

Jadi:

> **Robotika adalah bidang interdisipliner, bukan sekadar physical AI.**

---

# Eksperimen Interaktif: Bangun Robot Anda

<RobotSystemDiagram />

Coba identifikasi:

```text
Sensor
   ↓
Komputasi
   ↓
Keputusan
   ↓
Aktuator
```

Kemudian pikirkan:

> Jika sensor menjadi sangat noisy, bagian sistem mana yang terdampak?

> Jika motor menjadi lebih lemah, bagian mana yang terdampak?

> Jika map salah, apakah planner masih dapat menghasilkan jalur yang aman?

Pertanyaan-pertanyaan tersebut merupakan dasar dari cara berpikir sebagai roboticist.

---

# Contoh Matematika Pertama

Misalkan sebuah robot bergerak sejauh:

\[
\Delta x = 2\text{ m}
\]

dalam:

\[
\Delta t = 1\text{ s}
\]

Kecepatan rata-ratanya:

\[
v = \frac{\Delta x}{\Delta t}
\]

Sehingga:

\[
v = \frac{2}{1}=2\text{ m/s}
\]

Mengapa rumus ini masuk akal?

Karena velocity menggambarkan perubahan posisi terhadap waktu.

```text
2 meter
────────
1 detik

= 2 m/s
```

Persamaan sederhana ini nantinya menjadi dasar untuk konsep yang jauh lebih kompleks:

```text
Position
   ↓ derivative
Velocity
   ↓ derivative
Acceleration
```

Kemudian kita hubungkan dengan:

- robot kinematics
- wheel velocity
- trajectory generation
- feedback control

---

# Peta Pembelajaran Robotika

<LearningRoadmap />

Urutan pembelajaran yang disarankan:

```text
01 Fundamentals
       ↓
02 Mathematics
       ↓
03 Robot Motion & Kinematics
       ↓
04 Sensors & Perception
       ↓
05 Localization
       ↓
06 Mapping & SLAM
       ↓
07 Path Planning
       ↓
08 Control
       ↓
09 Advanced Robotics
       ↓
10 Multi-Agent Robotics
```

Anda tidak harus menguasai semuanya sebelum membuat robot.

Kemampuan pentingnya adalah memahami bagaimana setiap bagian saling berhubungan.

---

# Concept Check

<ConceptCheck
  question="Urutan mana yang paling tepat menggambarkan loop utama robot otonom?"
  options={[
    "Sense → Plan → Act",
    "Act → Sense → Stop",
    "Plan → Build → Stop",
    "Compute → Ignore → Act"
  ]}
  answer="Sense → Plan → Act"
/>

---

# Yang Harus Dipahami Setelah Lesson Ini

Setelah menyelesaikan lesson ini, Anda seharusnya dapat menjelaskan:

- apa itu robotika
- mengapa tidak ada satu definisi robot yang universal
- perbedaan otomasi dan interaksi otonom
- fungsi sensor
- perbedaan sensor proprioseptif dan eksteroseptif
- mengapa sensor memiliki ketidakpastian
- apa yang dimaksud state estimation
- apa yang dimaksud planning
- fungsi aktuator
- sense-plan-act loop
- open-loop dan closed-loop
- klasifikasi robot
- arti degrees of freedom
- mengapa matematika penting dalam robotika
- mengapa robotika lebih luas daripada AI

Anda belum perlu menghafal semua istilah.

Tujuan lesson ini adalah membangun **mental model tentang robotika**.

---

# Apa Selanjutnya?

Sekarang kita sudah memahami arsitektur dasar sebuah robot.

Selanjutnya kita mulai mempelajari bahasa matematika yang digunakan robot untuk menggambarkan dunia.

Lesson berikutnya:

> **Coordinate Systems & Vectors**

Kita mulai dari pertanyaan sederhana:

```text
Di mana robot berada?
Di mana objek berada?
Ke arah mana robot menghadap?
```

Pertanyaan tersebut akan membawa kita menuju:

```text
Vectors
   ↓
Coordinate Systems
   ↓
Rotation
   ↓
Transformation
   ↓
Kinematics
```

---

## Video Rekomendasi

### Pengantar Singkat

**Oregon State University — What is a robot?**

Diskusi singkat mengenai definisi robot dan autonomy.

<VideoEmbed
  title="Expert Answers | What is a robot?"
  provider="youtube"
  videoId="-nGlDsk1rS4"
  sourceUrl="https://www.youtube.com/watch?v=-nGlDsk1rS4"
/>

### Pengantar Akademik

**Stanford CS223A — Lecture 1: Introduction to Robotics**

Kuliah pengantar yang lebih mendalam oleh Professor Oussama Khatib.

<VideoEmbed
  title="Lecture 1 | Introduction to Robotics"
  provider="youtube"
  videoId="0yD3uBshJB0"
  sourceUrl="https://www.youtube.com/watch?v=0yD3uBshJB0"
/>

Kuliah Stanford lebih matematis sehingga sebaiknya dianggap sebagai materi pendalaman, bukan prasyarat lesson pemula ini.

---

## References

1. Ben-Ari, M., & Mondada, F. (2018). *Elements of Robotics*. Springer. https://doi.org/10.1007/978-3-319-62533-1
2. Herath, D., & St-Onge, D. (Eds.). (2022). *Foundations of Robotics: A Multidisciplinary Approach with Python and ROS*. Springer. https://doi.org/10.1007/978-981-19-1983-1
3. Stanford University, CS223A, *Introduction to Robotics*.
4. Oregon State University, *What is a robot?*
```

---

# Video Recommendation Notes

The two videos above are intentionally different.

## 1. Oregon State University

**Best for: beginner orientation**

The video is short and directly addresses the deceptively difficult question "What is a robot?" Professor Kagan Tumer discusses examples such as humanoids, quadrupeds, airplanes, elevators, home assistants, and autonomous systems. citeturn1youtube48

## 2. Stanford CS223A

**Best for: optional academic depth**

Stanford's first CS223A lecture gives a university-level overview and leads into topics including spatial descriptions, forward/inverse kinematics, Jacobians, dynamics, motion planning, trajectory generation, control, and manipulator design. citeturn1youtube49

The Stanford course is publicly available through YouTube; it is much more extensive than this first beginner lesson. citeturn1search0

YouTube supports embedding videos in websites, so RoboAtlas can embed the original player instead of copying or hosting the video itself. citeturn0search9

---

# Recommended Content Architecture

This lesson should eventually be split into several reusable components:

```text
intro-to-robotics.mdx
        │
        ├── LessonOrientation
        │
        ├── VideoEmbed
        │
        ├── SensePlanActExplorer
        │
        ├── SensorExplorer
        │
        ├── RobotSystemDiagram
        │
        ├── RobotClassificationExplorer
        │
        ├── OpenClosedLoopExplorer
        │
        ├── DOFVisualizer
        │
        ├── FormulaBlock
        │
        ├── ConceptCheck
        │
        └── LearningRoadmap
```

Do not implement all components immediately if the first version of the application does not have them.

Build the reusable components incrementally.

---

# Important Content Decision

The first lesson should **not try to teach all of robotics**.

Its job is to answer:

```text
What is robotics?
        ↓
What is a robot?
        ↓
How does a robot interact with the world?
        ↓
What are sensors?
        ↓
What are actuators?
        ↓
What is computation?
        ↓
What is autonomy?
        ↓
What is the basic robot loop?
        ↓
What subjects will I learn next?
```

The deeper mathematics and algorithms should be taught in subsequent lessons.

This prevents the introduction lesson from becoming an overwhelming encyclopedia.
