# RoboAtlas — SLAM, State Estimation & Spatial Perception Master Guide
### Comprehensive Textbook on Autonomous Mobile Robotics, Probabilistic Localization, 2D/3D Perception & Mapping Algorithms
*By RoboAtlas Knowledge Systems — Version 2.0 (2026)*

---

## 1. Executive Overview & The Autonomous Robotics Architecture

The challenge of **Simultaneous Localization and Mapping (SLAM)** is the quintessential benchmark of autonomous mobile robotics. An autonomous agent placed in an uncharted environment must simultaneously answer two intrinsically coupled questions:

1. **Where am I?** *(State Estimation, Tracking & Localization)*
2. **What does the world look like?** *(Spatial Perception, 2D/3D Mapping & Costmap Representation)*

```text
                     ┌───────────────────────────────────────┐
                     │          Physical World &             │
                     │         Exteroceptive Sensing         │
                     └───────────────────┬───────────────────┘
                                         │ Raw Measurements: LiDAR (r, θ), RGB-D Depth (u, v, Z), IMU (a, ω)
                                         ▼
                     ┌───────────────────────────────────────┐
                     │      Sensor Perception Engine         │
                     │  - Pinhole Backprojection: (u,v,Z)→3D │
                     │  - LiDAR Raycast Parametric Intersect │
                     │  - Likelihood Field Heatmaps (EDT)    │
                     └───────────────────┬───────────────────┘
                                         │ Point Cloud Pk, Depth Cloud, Obstacle Distances
                                         ▼
                     ┌───────────────────────────────────────┐
                     │     Probabilistic Localization        │
                     │  - Extended Kalman Filter (EKF)       │
                     │  - Monte Carlo Particle Filter (MCL)  │
                     │  - Scan Matching: SVD ICP & NDT       │
                     └───────────────────┬───────────────────┘
                                         │ Optimal Robot State Estimate: x_t = (x, y, θ)^T
                                         ▼
                     ┌───────────────────────────────────────┐
                     │      Spatial Mapping & Costmaps       │
                     │  - 2D Log-Odds Occupancy Grids (OGM)  │
                     │  - 3D Octree Voxel Maps (OctoMap)     │
                     │  - Multi-Layer Costmaps (C-Space)     │
                     └───────────────────┬───────────────────┘
                                         │ Costmap Layers & Inflation Gradients
                                         ▼
                     ┌───────────────────────────────────────┐
                     │         Global Path Planning          │
                     │  - A* Heuristic Graph Search          │
                     │  - RRT & RRT* Continuous Sampling     │
                     └───────────────────┬───────────────────┘
                                         │ Collision-Free Waypoints: (x_ref, y_ref)
                                         ▼
                     ┌───────────────────────────────────────┐
                     │        Local Motion Tracking          │
                     │  - Pure Pursuit Lookahead Steering    │
                     │  - Stanley Non-Linear Cross-Track     │
                     │  - PID Actuator Control Loop          │
                     └───────────────────┬───────────────────┘
                                         │ Wheel Velocities: (v, ω) ──► 10–50 Hz Closed Loop
                                         ▼
                                   [ Actuators ]
```

Every concept in this curriculum is taught through the **RoboAtlas Universal Pedagogical Pipeline**:
$$\mathbf{\text{Problem}} \longrightarrow \mathbf{\text{Physical Intuition}} \longrightarrow \mathbf{\text{Mathematical Model}} \longrightarrow \mathbf{\text{Derivation}} \longrightarrow \mathbf{\text{Algorithm}} \longrightarrow \mathbf{\text{Interactive Lab}} \longrightarrow \mathbf{\text{Application}}$$

---

## 2. Sensor Perception: Pinhole Cameras, RGB-D Depth & Likelihood Heatmaps

![Prinsip Kamera RGB-D, Rekonstruksi Point Cloud 3D, dan Heatmap Likelihood Field](/images/sensors/rgbd-camera-and-heatmap.jpg)

### 2.1 The Pinhole Camera Model & Perspective Projection Matrix

A standard monocular camera maps 3D spatial points $\mathbf{P}^C = [X, Y, Z]^T$ in camera coordinates onto a 2D image plane pixel $(u, v)$ via perspective projection:

$$
\begin{bmatrix} u \\ v \\ 1 \end{bmatrix} = \frac{1}{Z} \mathbf{K} \mathbf{P}^C = \frac{1}{Z} \begin{bmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} X \\ Y \\ Z \end{bmatrix}
$$

Where:
- $f_x, f_y$ are the focal lengths expressed in pixel units ($f_x = \frac{F}{p_w}$, $f_y = \frac{F}{p_h}$).
- $(c_x, c_y)$ is the principal point (optical axis intersection on the CMOS sensor).
- $\mathbf{K}$ is the camera **Intrinsic Matrix**.

---

### 2.2 RGB-D Cameras: Depth Extraction & 3D Point Cloud Backprojection

**RGB-D Sensors** (such as Intel RealSense, Microsoft Kinect, and Orbbec Astra) output synchronized RGB images alongside a dense pixel-aligned 16-bit depth image $Z = \text{Depth}(u, v)$:

- **Structured Light**: Projects an invisible pseudo-random infrared speckle dot pattern. An IR camera observes speckle deformation to calculate depth by triangulation disparity.
- **Time-of-Flight (ToF)**: Emits modulated continuous-wave IR light and measures the phase shift per pixel.

#### Analytical Backprojection Formula (2D Depth $\to$ 3D Point Cloud)
For each valid pixel $(u, v)$ with measured depth $Z > 0$, the corresponding 3D Cartesian coordinates $(X, Y, Z)$ are computed analytically:

$$
X = \frac{(u - c_x) \cdot Z}{f_x}, \qquad Y = \frac{(v - c_y) \cdot Z}{f_y}, \qquad Z = \text{Depth}(u, v)
$$

The full point cloud $\mathcal{P} = \{ [X_i, Y_i, Z_i]^T \}_{i=1}^N$ is transformed into the robot base frame $\{B\}$ and world frame $\{W\}$ via homogeneous rigid transforms:
$$
\mathbf{P}^W = \mathbf{T}_B^W \mathbf{T}_C^B \begin{bmatrix} X \\ Y \\ Z \\ 1 \end{bmatrix}
$$

---

### 2.3 Likelihood Fields & Heatmaps (Euclidean Distance Transforms)

In probabilistic robotics, a **Likelihood Field Heatmap** provides an ultra-fast, continuous measurement model for laser and depth rays without requiring raycasting through every grid cell.

1. **Euclidean Distance Transform (EDT)**: For any spatial point $(x, y)$, calculate the Euclidean distance $d(x, y)$ to the nearest obstacle boundary:
$$
d(x, y) = \min_{\mathbf{p}_{\text{obs}} \in \mathcal{O}} \left\| \begin{bmatrix} x \\ y \end{bmatrix} - \mathbf{p}_{\text{obs}} \right\|
$$

2. **Sensor Measurement Likelihood (Gaussian Mixture)**:
When a sensor ray projected from robot pose $\mathbf{x}_t = (x, y, \theta)$ hits endpoint $(x_{\text{hit}}, y_{\text{hit}})$, the likelihood is evaluated from the precomputed distance field $d(x_{\text{hit}}, y_{\text{hit}})$:

$$
p(z_k \mid \mathbf{x}_t, m) = z_{\text{hit}} \cdot \frac{1}{\sqrt{2\pi\sigma_{\text{hit}}^2}} \exp\left(-\frac{d(x_{\text{hit}}, y_{\text{hit}})^2}{2\sigma_{\text{hit}}^2}\right) + \frac{z_{\text{rand}}}{z_{\text{max}}}
$$

Where:
- $z_{\text{hit}}$ is the probability weight of a valid reflection.
- $\sigma_{\text{hit}}$ is the standard deviation of measurement noise.
- $z_{\text{rand}}$ models random ambient noise.

---

## 3. Localization Deep-Dive: Probabilistic Filtering Algorithms

Because physical sensors and motor actuators are inherently stochastic, state estimation represents robot pose as a probability distribution $\text{bel}(\mathbf{x}_t) = p(\mathbf{x}_t \mid \mathbf{z}_{1:t}, \mathbf{u}_{1:t})$.

```text
               ┌──────────────────────────────────────────────┐
               │    Prior Belief: bel(x_{t-1}) ~ N(μ, Σ)      │
               └──────────────────────┬───────────────────────┘
                                      │
                                      ▼
                        [ PREDICTION: Motion Model ]
                  x̄_t = f(x_{t-1}, u_t),  P̄_t = F_t P_{t-1} F_t^T + Q_t
                                      │
                                      ▼
               ┌──────────────────────────────────────────────┐
               │    Predicted Belief: bel̄(x_t)                │
               └──────────────────────┬───────────────────────┘
                                      │
                                      ▼
                       [ CORRECTION: Sensor Update ]
                  Innovation: y_t = z_t - h(x̄_t)
                  Kalman Gain: K_t = P̄_t H_t^T (H_t P̄_t H_t^T + R_t)^{-1}
                  State Update: μ_t = x̄_t + K_t y_t
                  Covariance Update: P_t = (I - K_t H_t) P̄_t
                                      │
                                      ▼
               ┌──────────────────────────────────────────────┐
               │    Posterior Belief: bel(x_t)                │
               └──────────────────────────────────────────────┘
```

---

### 3.1 Extended Kalman Filter (EKF) Localization

For continuous non-linear robot motion $\mathbf{x}_t = f(\mathbf{x}_{t-1}, \mathbf{u}_t) + \mathbf{w}_t$ and measurement model $\mathbf{z}_t = h(\mathbf{x}_t) + \mathbf{v}_t$:

#### Prediction Step
$$
\bar{\mathbf{\mu}}_t = f(\mathbf{\mu}_{t-1}, \mathbf{u}_t)
$$
$$
\bar{\mathbf{\Sigma}}_t = \mathbf{F}_t \mathbf{\Sigma}_{t-1} \mathbf{F}_t^T + \mathbf{Q}_t
$$
where $\mathbf{F}_t = \left. \frac{\partial f}{\partial \mathbf{x}} \right|_{\mathbf{\mu}_{t-1}, \mathbf{u}_t}$ is the motion Jacobian and $\mathbf{Q}_t$ is the process noise covariance.

#### Correction Step (Measurement Update)
1. **Measurement Innovation**: $\mathbf{y}_t = \mathbf{z}_t - h(\bar{\mathbf{\mu}}_t)$
2. **Innovation Covariance**: $\mathbf{S}_t = \mathbf{H}_t \bar{\mathbf{\Sigma}}_t \mathbf{H}_t^T + \mathbf{R}_t$
3. **Kalman Gain**: $\mathbf{K}_t = \bar{\mathbf{\Sigma}}_t \mathbf{H}_t^T \mathbf{S}_t^{-1}$
4. **Updated State Mean**: $\mathbf{\mu}_t = \bar{\mathbf{\mu}}_t + \mathbf{K}_t \mathbf{y}_t$
5. **Updated Covariance**: $\mathbf{\Sigma}_t = (\mathbf{I} - \mathbf{K}_t \mathbf{H}_t) \bar{\mathbf{\Sigma}}_t$

---

### 3.2 Monte Carlo Localization (MCL) Particle Filter

When the robot's belief distribution is multimodal (e.g. symmetrical rooms or after kidnapping), the parametric Gaussian assumption of EKF fails. **MCL** approximates the belief distribution with $M$ weighted samples (particles):

$$
S_t = \left\{ \left\langle \mathbf{x}_t^{[m]}, w_t^{[m]} \right\rangle \right\}_{m=1}^M
$$

#### Algorithm Steps:
1. **Sampling / Prediction**: Propagate each particle through the stochastic differential-drive motion model:
$$
\mathbf{x}_t^{[m]} \sim p(\mathbf{x}_t \mid \mathbf{x}_{t-1}^{[m]}, \mathbf{u}_t)
$$
2. **Importance Weighting**: Compute measurement likelihood given LiDAR / beacon observations:
$$
w_t^{[m]} = p(\mathbf{z}_t \mid \mathbf{x}_t^{[m]}, m) = \prod_{k=1}^K p(z_t^k \mid \mathbf{x}_t^{[m]}, m)
$$
3. **Low-Variance Systematic Resampling**: Select $M$ new particles with probability proportional to weights $w_t^{[m]}$ in $O(M)$ deterministic linear time using a single random offset $r \in [0, M^{-1})$:
$$
U = r + (m - 1) M^{-1}
$$

---

## 4. Mapping Algorithms Deep-Dive

---

### 4.1 Log-Odds Occupancy Grid Mapping (OGM)

To avoid numerical underflow caused by cascading floating-point multiplications, grid mapping converts cell probabilities $p(m_i)$ into additive **Log-Odds** values:

$$
l(m_i) = \ln\left(\frac{p(m_i)}{1 - p(m_i)}\right) \iff p(m_i) = 1 - \frac{1}{1 + \exp(l(m_i))}
$$

#### The Recursive Bayesian Log-Odds Update
$$
l_t(m_i) = l_{t-1}(m_i) + \text{inv\_sensor}(m_i, \mathbf{z}_t) - l_0
$$

Where the **Inverse Sensor Model** assigns:
- $\text{inv\_sensor}(m_i, \mathbf{z}_t) = l_{\text{occ}} = \ln\left(\frac{0.85}{1 - 0.85}\right) \approx +1.73$ (at the laser reflection endpoint).
- $\text{inv\_sensor}(m_i, \mathbf{z}_t) = l_{\text{free}} = \ln\left(\frac{0.30}{1 - 0.30}\right) \approx -0.85$ (along the traversing ray traced via Bresenham's algorithm).
- $l_0 = \ln\left(\frac{0.5}{1 - 0.5}\right) = 0$ (unobserved prior).

---

### 4.2 Multi-Layer 2D Costmap Architecture & Inflation Layers

For safe motion planning, the raw occupancy grid is transformed into a multi-layered **Costmap**:

1. **Static Layer**: Permanent wall and furniture boundaries extracted from SLAM maps ($0 = \text{Free}$, $100 = \text{Occupied}$, $-1 = \text{Unknown}$).
2. **Obstacle Layer**: Dynamic obstacles detected in real-time by LiDAR and RGB-D depth cameras.
3. **Inflation Layer**: Expands obstacles into Configuration Space ($C$-Space) using continuous cost decay:

$$
\text{Cost}(d) = 
\begin{cases} 
254 & \text{if } d \le r_{\text{inscribed}} \quad \text{(Lethal Collision)} \\
253 \cdot \exp\left(-\alpha (d - r_{\text{inscribed}})\right) & \text{if } r_{\text{inscribed}} < d \le r_{\text{inflation}} \\
0 & \text{if } d > r_{\text{inflation}} \quad \text{(Free Space)}
\end{cases}
$$

---

### 4.3 3D Volumetric Mapping: OctoMap & Truncated Signed Distance Fields (TSDF)

For 3D autonomous navigation (drones, legged robots, and mobile manipulators):

1. **OctoMap (Hierarchical 3D Octree)**: Recursively subdivides 3D space into 8 sub-voxels. Unoccupied large regions collapse into single parent nodes, reducing memory by up to 95% compared to raw point clouds.
2. **Truncated Signed Distance Field (TSDF)**: Stores the signed distance $D(\mathbf{x})$ to the nearest physical surface inside each voxel:
   - $D(\mathbf{x}) > 0$ outside obstacles.
   - $D(\mathbf{x}) = 0$ on the exact obstacle surface.
   - $D(\mathbf{x}) < 0$ inside solid objects.
   - Values are truncated to $[-\delta_{\text{trunc}}, +\delta_{\text{trunc}}]$ for real-time GPU fusion (*KinectFusion / Voxblox*).

---

## 5. SLAM Optimization: Scan Matching & Pose Graph Optimization

---

### 5.1 Iterative Closest Point (ICP) with Closed-Form SVD

Given reference point set $\mathcal{Q} = \{\mathbf{q}_i\}_{i=1}^N$ and current sensor scan $\mathcal{P} = \{\mathbf{p}_i\}_{i=1}^N$:

$$\min_{\mathbf{R} \in \text{SO}(2), \mathbf{t} \in \mathbb{R}^2} \sum_{i=1}^N \left\| \mathbf{R} \mathbf{p}_i + \mathbf{t} - \mathbf{q}_i \right\|^2$$

#### Exact SVD Analytical Steps:
1. Centroids: $\bar{\mathbf{p}} = \frac{1}{N}\sum \mathbf{p}_i, \quad \bar{\mathbf{q}} = \frac{1}{N}\sum \mathbf{q}_i$.
2. Cross-Covariance Matrix: $\mathbf{H} = \sum_{i=1}^N (\mathbf{p}_i - \bar{\mathbf{p}})(\mathbf{q}_i - \bar{\mathbf{q}})^T$.
3. Singular Value Decomposition: $\mathbf{H} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T$.
4. Optimal Rotation: $\mathbf{R}^* = \mathbf{V} \begin{bmatrix} 1 & 0 \\ 0 & \det(\mathbf{V}\mathbf{U}^T) \end{bmatrix} \mathbf{U}^T$.
5. Optimal Translation: $\mathbf{t}^* = \bar{\mathbf{q}} - \mathbf{R}^* \bar{\mathbf{p}}$.

---

### 5.2 Pose Graph SLAM & Non-Linear Least Squares

In Graph SLAM, the history of robot trajectory poses forms a graph $\mathcal{G} = (\mathcal{V}, \mathcal{E})$:
- **Nodes $\mathbf{x}_i \in \mathcal{V}$**: Robot poses at discrete timesteps.
- **Odometry Edges $(i, i+1) \in \mathcal{E}$**: Sequential wheel odometry constraints $\mathbf{z}_{i, i+1}$.
- **Loop Closure Edges $(i, j) \in \mathcal{E}$**: Long-term spatial constraints when revisiting familiar environments, detected via scan matching or visual bag-of-words (DBoW).

#### Non-Linear Optimization Objective
$$
\min_{\mathbf{x}} \sum_{(i,j) \in \mathcal{E}} \mathbf{e}_{ij}(\mathbf{x}_i, \mathbf{x}_j)^T \mathbf{\Omega}_{ij} \mathbf{e}_{ij}(\mathbf{x}_i, \mathbf{x}_j)
$$

Where:
- $\mathbf{e}_{ij}(\mathbf{x}_i, \mathbf{x}_j) = \text{inv}(\mathbf{z}_{ij}) \boxminus (\mathbf{x}_i^{-1} \mathbf{x}_j)$ is the pose difference residual error.
- $\mathbf{\Omega}_{ij} = \mathbf{\Sigma}_{ij}^{-1}$ is the information matrix (inverse covariance).

Solved iteratively using **Levenberg-Marquardt** or **Gauss-Newton** on sparse linear systems:
$$
(\mathbf{J}^T \mathbf{\Omega} \mathbf{J} + \lambda \mathbf{I}) \Delta \mathbf{x}^* = -\mathbf{J}^T \mathbf{\Omega} \mathbf{e}
$$

---

## 6. Complete RoboAtlas Module & Lab Mapping Checklist

| Topic & Pipeline Stage | Core Mathematical Formula | Theory Module | Interactive Lab Workstation |
|---|---|---|---|
| **Vector Geometry** | $\\|\mathbf{v}\\| = \sqrt{v_x^2 + v_y^2}$ | [Vectors & Metrics](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/mathematics/vectors-and-coordinate-geometry.mdx) | [Vector Explorer](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **Rigid SE(2) Transforms** | $\mathbf{p}^W = \mathbf{R}(\theta)\mathbf{p}^B + \mathbf{t}$ | [Coordinate Transforms](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/geometry/coordinate-frames-and-transforms.mdx) | [Transform Sandbox](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **Differential Kinematics** | $R_{\text{ICC}} = \frac{L}{2}\frac{v_R + v_L}{v_R - v_L}$ | [Differential Kinematics](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/kinematics/differential-drive-kinematics.mdx) | [Kinematics 2D Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **LiDAR ToF Raycasting** | $d = \frac{c \cdot \Delta t}{2}$ | [LiDAR Raycasting](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/sensors/lidar-raycasting.mdx) | [LiDAR Raycast Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **Wheel Odometry Drift** | $\Delta\theta = \frac{\Delta s_R - \Delta s_L}{L}$ | [Wheel Odometry Drift](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/sensors/wheel-odometry-and-drift.mdx) | [Odometry Drift Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **Monte Carlo MCL** | $w_t^{[m]} \propto p(z_t \mid x_t^{[m]})$ | [MCL Particle Filter](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/estimation/mcl-particle-filter.mdx) | [MCL Localization Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **Log-Odds Grid Mapping** | $l_t(m_i) = l_{t-1}(m_i) + \text{inv}(m_i) - l_0$ | [Occupancy Grid Mapping](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/perception/occupancy-grid-mapping.mdx) | [Occupancy Mapping Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **SVD ICP Scan Matching** | $\min_{\mathbf{R}, \mathbf{t}}\sum \|\mathbf{R}\mathbf{p}_i + \mathbf{t} - \mathbf{q}_i\|^2$ | [ICP Scan Matching](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/advanced/icp-scan-matching.mdx) | [ICP SLAM Simulator](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **A* Path Search** | $f(n) = g(n) + h(n)$ | [A* Grid Search](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/planning/a-star.mdx) | [A* Planning Sandbox](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **Pure Pursuit Steering** | $\kappa = \frac{2\sin\alpha}{L_d}, \delta = \arctan(\kappa L)$ | [Pure Pursuit Control](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/content/id/control/pure-pursuit-path-tracking.mdx) | [Pure Pursuit Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
