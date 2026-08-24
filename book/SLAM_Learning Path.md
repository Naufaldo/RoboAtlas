# RoboAtlas — SLAM, Spatial Perception & Visual Autonomy Master Guide
### Comprehensive Textbook on Point Clouds, Multi-Paradigm Mapping, Monocular/Stereo Visual SLAM & The Grand SLAM Taxonomy
*By RoboAtlas Knowledge Systems — Version 4.0 (2026)*

---

## 1. Executive Architecture: Sense-Plan-Act & Spatial Autonomy

Simultaneous Localization and Mapping (**SLAM**) enables an autonomous agent to navigate unknown environments without GPS or pre-built infrastructure. The pipeline bridges physical photon and acoustic sensing to high-level graph optimization:

```text
                     ┌───────────────────────────────────────────────┐
                     │              Physical Sensors                 │
                     │  Cameras (Mono/Stereo/RGB-D), LiDAR, IMU      │
                     └───────────────────────┬───────────────────────┘
                                             │ Raw Photometric & Geometric Streams
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │     Visual & Spatial Perception Engine        │
                     │  - Pinhole Intrinsic Matrix K                 │
                     │  - Epipolar Essential Matrix E = [t]x R       │
                     │  - Stereo Baseline Disparity: Z = (f * B) / d │
                     │  - Point Cloud Voxel Grid & PCA Normal Est.   │
                     └───────────────────────┬───────────────────────┘
                                             │ 3D Map Points Xj & Extracted Features
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │          Multi-Paradigm Spatial Mapping       │
                     │  - 2D Log-Odds Occupancy Grids (OGM)          │
                     │  - 3D Hierarchical Octree Voxels (OctoMap)    │
                     │  - Truncated Signed Distance Fields (TSDF)    │
                     │  - Normal Distributions Transform (NDT) Grids │
                     └───────────────────────┬───────────────────────┘
                                             │ Spatial Map Representation M_t
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │          Grand SLAM Algorithm Engine          │
                     │  - Visual SLAM: ORB-SLAM3 & DSO (Bundle Adj.) │
                     │  - Filter-Based: EKF-SLAM & FastSLAM 2.0      │
                     │  - Graph SLAM: Factor Graphs (GTSAM / g2o)    │
                     │  - 3D LiDAR SLAM: LOAM & LIO-SAM              │
                     └───────────────────────┬───────────────────────┘
                                             │ Trajectory {x_0, ..., x_t} & Metric Map
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │        Global Planning & Motion Control       │
                     │  - Costmap 2D Inflation Layers                │
                     │  - A* & RRT* Graph/Continuous Search          │
                     │  - Pure Pursuit & Stanley Path Trackers       │
                     └───────────────────────────────────────────────┘
```

---

## 2. Visual SLAM (V-SLAM): 1-Camera vs 2-Camera Principles & Mathematical Derivations

![Prinsip Visual SLAM: Monokular, Stereo, Triangulasi 3D, dan Bundle Adjustment Reprojection Error](/images/sensors/vslam-monocular-stereo-triangulation.jpg)

### 2.1 The Pinhole Camera Model & Pixel Coordinate Transformation

A camera sensor captures 3D world points $\mathbf{X}^W = [X, Y, Z, 1]^T$ and projects them onto a 2D digital image matrix $[u, v]^T$ measured in integer pixel coordinates:

```text
3D World Point X^W ──► [ Extrinsics T_CW = (R, t) ] ──► 3D Camera Frame X^C ──► [ Intrinsics K ] ──► 2D Pixel (u, v)
```

#### The Camera Intrinsic Matrix $\mathbf{K}$:
$$
\mathbf{K} = \begin{bmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}
$$

Where:
- $f_x = \frac{F}{p_w}$: Focal length in horizontal pixel units ($F$ is optical focal length in mm, $p_w$ is physical pixel pitch width in mm/pixel).
- $f_y = \frac{F}{p_h}$: Focal length in vertical pixel units.
- $(c_x, c_y)$: Principal point coordinates (the optical center offset where the optical axis pierces the digital sensor plane).

#### Complete Perspective Projection:
$$
Z^C \begin{bmatrix} u \\ v \\ 1 \end{bmatrix} = \mathbf{K} \left( \mathbf{R} \mathbf{X}^W + \mathbf{t} \right) = \begin{bmatrix} f_x X^C + c_x Z^C \\ f_y Y^C + c_y Z^C \\ Z^C \end{bmatrix}
$$
Dividing by depth $Z^C$:
$$
u = f_x \frac{X^C}{Z^C} + c_x, \qquad v = f_y \frac{Y^C}{Z^C} + c_y
$$

---

### 2.2 Monocular V-SLAM (1 Camera): Epipolar Geometry & Scale Ambiguity

With a **single camera**, depth $Z$ is lost during perspective projection. A single 2D pixel $[u, v]^T$ corresponds to an infinite 3D optical ray projecting into space:

$$
\mathbf{r}(\lambda) = \lambda \cdot \mathbf{K}^{-1} \begin{bmatrix} u \\ v \\ 1 \end{bmatrix}, \quad \lambda > 0
$$

#### 1. Estimating Motion Across Time ($t_1 \to t_2$) via Epipolar Geometry
When the single camera moves from pose 1 to pose 2, feature point $\mathbf{p}_1$ in image 1 and $\mathbf{p}_2$ in image 2 satisfy the **Epipolar Constraint**:

$$
\mathbf{x}_2^T \mathbf{E} \mathbf{x}_1 = 0 \quad \iff \quad \mathbf{p}_2^T \mathbf{F} \mathbf{p}_1 = 0
$$

Where:
- $\mathbf{x}_1 = \mathbf{K}^{-1} \mathbf{p}_1$ and $\mathbf{x}_2 = \mathbf{K}^{-1} \mathbf{p}_2$ are normalized image coordinates.
- $\mathbf{E} = [\mathbf{t}]_\times \mathbf{R} \in \mathbb{R}^{3 \times 3}$ is the **Essential Matrix** ($[\mathbf{t}]_\times$ is the skew-symmetric matrix of translation $\mathbf{t}$).
- $\mathbf{F} = \mathbf{K}^{-T} \mathbf{E} \mathbf{K}^{-1}$ is the **Fundamental Matrix** (operates directly on raw pixel coordinates without requiring intrinsic calibration).

Decomposing $\mathbf{E}$ via SVD extracts relative rotation $\mathbf{R}$ and up-to-scale translation unit vector $\hat{\mathbf{t}} = \frac{\mathbf{t}}{\|\mathbf{t}\|}$.

#### 2. Triangulation
By calculating the intersection of the two calibrated optical rays from camera pose 1 and pose 2, the 3D position of map point $\mathbf{X}$ is computed using Linear Triangulation (Direct Linear Transformation / DLT).

#### 3. The Physical Nature of Monocular Scale Ambiguity (*Skala Relatif*)
> **Why 1 camera cannot know metric scale alone:**
> Moving $10\text{ cm}$ in a miniature dollhouse produces the **exact same pixel optical flow** as moving $10\text{ meters}$ in a giant airplane hangar!

A monocular SLAM system estimates trajectory and map up to an unknown scalar scale factor $s \in \mathbb{R}^+$ (7-DOF $\text{Sim}(3)$ manifold). To recover true metric scale ($s = 1.0$), monocular cameras must be paired with:
1. An **IMU (Visual-Inertial Odometry / VIO)**: Using the known physical acceleration of Earth's gravity ($\|\mathbf{g}\| \approx 9.81\text{ m/s}^2$) to calibrate absolute metric scale.
2. **Known Geometric Fiducial Markers**: Detecting markers with known real-world physical dimensions (e.g. ArUco / AprilTags).

---

### 2.3 Stereo V-SLAM (2 Cameras): Instantaneous Metric Triangulation & Disparity

A **Stereo Camera rig** mounts two identical synchronized cameras separated by a known, fixed physical **Baseline distance $B$** (e.g. $B = 12\text{ cm}$):

```text
       Left Camera {L}                       Right Camera {R}
        ┌──────────┐                          ┌──────────┐
        │  (u_L)   │                          │  (u_R)   │
        └────┬─────┘                          └────┬─────┘
             │ ◄────────── Baseline B ───────────► │
             │                                     │
              \                                   /
               \                                 /
                \                               /
                 \                             /
                  ▼                           ▼
                 3D Physical World Target P(X, Y, Z)
```

#### Derivation of the Stereo Metric Depth Formula:
After epipolar stereo rectification, both camera image planes are coplanar and horizontally aligned. A 3D point $\mathbf{P}(X, Y, Z)$ projects to pixel $u_L$ in the left camera and pixel $u_R$ in the right camera.

From similar triangles in the epipolar plane:
$$
\frac{Z}{B} = \frac{f}{u_L - u_R}
$$

Defining **Horizontal Disparity $d = u_L - u_R$** (the pixel shift between left and right images):

$$
Z = \frac{f \cdot B}{d}
$$

The full 3D metric coordinates $(X, Y, Z)$ in meters relative to the left camera are computed directly:
$$
X = \frac{(u_L - c_x) \cdot Z}{f_x} = \frac{(u_L - c_x) \cdot B}{d}, \qquad Y = \frac{(v_L - c_y) \cdot Z}{f_y} = \frac{(v_L - c_y) \cdot B}{d}
$$

#### Key Advantages of Stereo over Monocular V-SLAM:
1. **Instant Metric Scale**: Scale is known in exact meters immediately upon powering on ($s \equiv 1.0$).
2. **Zero Motion Requirement**: Depth can be measured even when the robot is completely stationary ($v = 0$).
3. **No Initialization Delay**: 3D feature points are inserted into the map on the very first frame.

---

### 2.4 Multi-Camera Surround Vision Rigs (360° Omnidirectional V-SLAM)

Autonomous passenger vehicles (e.g. Tesla FSD, Waymo) and multi-directional drones employ multi-camera arrays (e.g. 4 to 8 cameras providing 360° surround vision):

- Each camera $C_i$ has its own calibrated static rigid transform $\mathbf{T}_{C_i}^B = [\mathbf{R}_{C_i}^B \mid \mathbf{t}_{C_i}^B]$ relative to the robot base body $\{B\}$.
- **Generalized Camera Model (GCM)**: Rather than treating each camera as an isolated perspective center, visual rays from all cameras are unified into a single coordinate frame using Plücker ray lines $(\mathbf{q}, \mathbf{v})$.
- **Zero Blind Spots**: When the vehicle rotates or turns sharply, forward-facing features leave the front camera but are immediately tracked by side-facing cameras, preventing tracking loss.

---

### 2.5 Non-Linear Optimization: Bundle Adjustment (BA) & Reprojection Error

Whether using Monocular, Stereo, or Multi-Camera configurations, visual SLAM optimizes camera trajectory poses $\mathbf{T}_i = [\mathbf{R}_i \mid \mathbf{t}_i]$ and 3D map points $\mathbf{X}_j$ simultaneously by minimizing the **2D Pixel Reprojection Error**:

$$
\min_{\{\mathbf{T}_i\}, \{\mathbf{X}_j\}} \sum_{i} \sum_{j} \rho\left( \left\| \begin{bmatrix} u_{ij} \\ v_{ij} \end{bmatrix} - \pi\left(\mathbf{K}, \mathbf{T}_i \mathbf{X}_j\right) \right\|_{\mathbf{\Sigma}_{ij}}^2 \right)
$$

Where:
- $\begin{bmatrix} u_{ij} \\ v_{ij} \end{bmatrix}$ is the detected 2D pixel coordinate of feature $j$ in camera frame $i$.
- $\pi(\mathbf{K}, \mathbf{T}_i \mathbf{X}_j) = \begin{bmatrix} f_x \frac{X_{ij}^C}{Z_{ij}^C} + c_x \\ f_y \frac{Y_{ij}^C}{Z_{ij}^C} + c_y \end{bmatrix}$ is the analytical 2D perspective projection of 3D point $\mathbf{X}_j$.
- $\rho(\cdot)$ is a robust M-estimator cost function (such as the **Huber Loss**) that downweights outlier feature mismatches.

Solved iteratively via **Levenberg-Marquardt** using sparse Schur complement marginalization (*g2o / Ceres / GTSAM*).

---

## 3. Point Cloud Fundamentals & Geometric Signal Processing

![Pemrosesan Point Cloud, Paradigma Pemetaan Spasial 2D/3D, dan Taksonomi Lengkap Algoritma SLAM](/images/sensors/point-cloud-mapping-slam-taxonomy.jpg)

### 3.1 Mathematical Representation of a Point Cloud

A **Point Cloud** $\mathcal{P}$ is an unorganized collection of $N$ discrete 3D spatial points measured relative to a coordinate frame:

$$
\mathcal{P} = \left\{ \mathbf{p}_i = \begin{bmatrix} x_i \\ y_i \\ z_i \end{bmatrix} \in \mathbb{R}^3 \right\}_{i=1}^N
$$

Depending on the sensor embodiment, each point $\mathbf{p}_i$ can be augmented with multi-modal physical attributes:
- **Optical RGB Color**: $[r_i, g_i, b_i] \in [0, 255]^3$ from aligned camera sensors.
- **Reflectance / Intensity**: $I_i \in [0, 1]$ measuring surface albedo from LiDAR return power.
- **Surface Normal Vector**: $\mathbf{n}_i = [n_{x,i}, n_{y,i}, n_{z,i}]^T$ with $\|\mathbf{n}_i\| = 1$.
- **Local Curvature**: $\kappa_i \in \mathbb{R}_{\ge 0}$ indicating local geometric roughness.

---

### 3.2 Point Cloud Filtering, Denoising & Downsampling

#### 1. Voxel Grid Downsampling Filter
Space is discretized into a 3D grid of cubic voxels with leaf size $\Delta x \times \Delta y \times \Delta z$. All points falling inside voxel $V_k$ are replaced by their single spatial centroid $\mathbf{c}_k$:

$$
\mathbf{c}_k = \frac{1}{|V_k|} \sum_{\mathbf{p}_i \in V_k} \mathbf{p}_i
$$

#### 2. Statistical Outlier Removal (SOR)
For every point $\mathbf{p}_i$, compute its mean Euclidean distance $\bar{d}_i$ to its $k$-nearest neighbors:
$$
\bar{d}_i = \frac{1}{k} \sum_{j=1}^k \left\| \mathbf{p}_i - \mathbf{p}_j \right\|
$$
Point $\mathbf{p}_i$ is kept as a valid inlier if $\bar{d}_i \le \mu + \alpha \cdot \sigma$.

---

### 3.3 Surface Normal & Curvature Estimation via Principal Component Analysis (PCA)

From the neighborhood covariance matrix $\mathbf{C} = \frac{1}{k} \sum (\mathbf{q}_j - \bar{\mathbf{p}})(\mathbf{q}_j - \bar{\mathbf{p}})^T$:
$$
\mathbf{C} \mathbf{v}_m = \lambda_m \mathbf{v}_m \qquad (\lambda_0 \le \lambda_1 \le \lambda_2)
$$
1. **Surface Normal Vector**: $\mathbf{n}_i = \mathbf{v}_0$ (eigenvector of minimum eigenvalue $\lambda_0$).
2. **Local Curvature Surface Roughness**: $\kappa_i = \frac{\lambda_0}{\lambda_0 + \lambda_1 + \lambda_2}$.

---

## 4. Multi-Paradigm Spatial Mapping Algorithms

```text
┌─────────────────────────┬────────────────────────────┬─────────────────────────────┐
│    Mapping Paradigm     │    Internal Data Model     │    Primary Robotic Domain   │
├─────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 2D Occupancy Grid (OGM) │ Discrete Log-Odds Array    │ Wheeled AMR / AGV (2D Nav)  │
│ 3D OctoMap (Octree)     │ Hierarchical Voxel Trees   │ UAV Drones, Manipulators    │
│ TSDF / ESDF             │ Continuous Distance Fields │ GPU Dense Fusion, Planners  │
│ 2D/3D NDT Grid          │ Cell Gaussian Densities    │ High-Speed Automotive LiDAR │
│ Topological Graph       │ Waypoint Nodes + Edges     │ Large-Scale Fleet Logistics │
└─────────────────────────┴────────────────────────────┴─────────────────────────────┘
```

- **2D Occupancy Grid (OGM)**: $l_t(m_i) = l_{t-1}(m_i) + \text{inv\_sensor}(m_i, \mathbf{z}_t) - l_0$.
- **3D OctoMap**: Hierarchical 8-child octree tree with dynamic memory node pruning.
- **TSDF**: Metric distance to surface $D(\mathbf{x}) = \text{sign}(\mathbf{x}) \cdot \min \|\mathbf{x} - \mathbf{p}\|$ for continuous GPU fusion.
- **NDT Grid**: Converts point sets into smooth Gaussian probability density manifolds $\mathcal{N}(\boldsymbol{\mu}_i, \mathbf{\Sigma}_i)$.

---

## 5. Grand Taxonomy of SLAM Algorithms

1. **Filter-Based SLAM**: EKF-SLAM ($O(K^2)$), FastSLAM 2.0 (Rao-Blackwellized $O(M \log K)$), Gmapping.
2. **Graph-Based SLAM**: Pose-Graph SLAM ($\min \sum \mathbf{e}_{ij}^T \mathbf{\Omega}_{ij} \mathbf{e}_{ij}$), Google Cartographer (Submaps + Branch & Bound loop closures).
3. **Visual SLAM**: ORB-SLAM3 (ORB Feature Tracking + Local BA), DSO (Direct Photometric Error Optimization).
4. **3D LiDAR SLAM**: LOAM (Edge/Planar segmentation), LIO-SAM & Fast-LIO2 (LiDAR-Inertial tight coupling with `ik-d tree` at $100+ \text{ Hz}$).

---

## 6. Summary & Universal Learning Path Roadmap

| Milestone | Stage | Algorithmic Paradigm | Primary Mathematical Operator | RoboAtlas Lab |
|---|---|---|---|---|
| **M1** | Vector Foundations | Coordinate Frames & Metrics | $\mathbf{p}^W = \mathbf{T}_B^W \mathbf{p}^B$ | [Transform Sandbox](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M2** | Kinematics | Differential-Drive Unicycle | $R_{\text{ICC}} = \frac{L}{2}\frac{v_R + v_L}{v_R - v_L}$ | [Kinematics Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M3** | Sensor Perception | LiDAR ToF & RGB-D Pinhole | $X = \frac{(u - c_x)Z}{f_x}, \quad d = \frac{c\Delta t}{2}$ | [LiDAR Raycasting](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M4** | Visual V-SLAM | Stereo Disparity & Triangulation | $Z = \frac{f \cdot B}{d}, \quad \mathbf{x}_2^T \mathbf{E} \mathbf{x}_1 = 0$ | [Transform Chaining](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M5** | Point Cloud Proc. | Voxel Grid & PCA Normals | $\mathbf{C}\mathbf{v}_0 = \lambda_0 \mathbf{v}_0, \quad \kappa = \frac{\lambda_0}{\sum \lambda}$ | [Point Cloud Lab](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M6** | State Estimation | EKF & Monte Carlo MCL | $w_t^{[m]} \propto p(\mathbf{z}_t \mid \mathbf{x}_t^{[m]})$ | [MCL Particle Filter](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M7** | Spatial Mapping | Log-Odds OGM & Distance EDT | $l_t(m_i) = l_{t-1} + \text{inv}(m_i) - l_0$ | [Occupancy Mapping](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M8** | Scan Matching | SVD Analytical Closed-Form ICP | $\mathbf{H} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T \implies \mathbf{R}^* = \mathbf{V}\mathbf{U}^T$ | [Slam Simulator](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M9** | Graph Optimization | Pose-Graph SLAM & Loop Closures | $\min \sum \mathbf{e}_{ij}^T \mathbf{\Omega}_{ij} \mathbf{e}_{ij}$ | [Pose Graph SLAM](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
| **M10** | Path Planning & Control | $A^*$ Heuristic & Pure Pursuit | $f(n) = g(n) + h(n), \quad \kappa = \frac{2\sin\alpha}{L_d}$ | [A* Search Sandbox](file:///c:/Users/ASUS/Documents/Personal/RoboAtlas/app/labs/page.tsx) |
