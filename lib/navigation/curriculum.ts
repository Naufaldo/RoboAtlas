export interface AlgorithmMeta {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  level: number;
  levelTitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  milestone: string;
  path: string;
  paperRef?: string;
  keyEquation?: string;
  tags: string[];
}

export interface DomainMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: number;
  levelBadge: string;
  iconName: string;
  milestone: string;
  status: 'Foundation Ready' | 'In Progress' | 'Roadmap';
  topics: {
    title: string;
    description: string;
    algorithms: string[];
  }[];
  primaryEquations: {
    title: string;
    latex: string;
    explanation: string;
  }[];
}

export const DOMAINS: DomainMeta[] = [
  {
    slug: 'fundamentals',
    title: 'Robotics Fundamentals',
    subtitle: 'Orientation, Systems & Robot Morphology',
    description:
      'Master the foundational principles of robotics: autonomy loops, Sense-Plan-Act architecture, hardware/software anatomy, and multi-platform morphology.',
    level: 0,
    levelBadge: 'Level 0',
    iconName: 'Compass',
    milestone: 'Milestone 1',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Introduction to Robotics (Level 0)',
        description: 'Autonomy definitions, Sense-Plan-Act loops, robot classification (fixed vs mobile).',
        algorithms: ['Braitenberg Vehicles', 'Reactive State Controller'],
      },
    ],
    primaryEquations: [
      {
        title: 'Sense-Plan-Act Control Loop',
        latex: 'u_t = \\pi(z_{1:t}, x_0)',
        explanation: 'Maps past sensor observations to optimal actuator control commands.',
      },
    ],
  },
  {
    slug: 'mathematics',
    title: 'Mathematical Foundations',
    subtitle: 'Vectors, Metrics, Projections & Probability',
    description:
      'Master the mathematical language of robotics: vector spaces, Pythagorean metrics, unit direction vectors, dot product projections, and probability fundamentals.',
    level: 1,
    levelBadge: 'Level 1',
    iconName: 'Grid',
    milestone: 'Milestone 1',
    status: 'Foundation Ready',
    topics: [
      {
        title: '2D & 3D Vector Geometry',
        description: 'Vector norms, unit directions, and Pythagorean Euclidean distance metrics.',
        algorithms: ['Vector Decomposition', 'Norm Calculation'],
      },
      {
        title: 'Dot Product & Projection',
        description: 'Directional cosine similarity, orthogonal decompositions, and coordinate projections.',
        algorithms: ['Dot Product Projection', 'Orthogonality Test'],
      },
    ],
    primaryEquations: [
      {
        title: 'Euclidean Vector Norm',
        latex: '\\|\\mathbf{v}\\| = \\sqrt{\\sum_{i=1}^n v_i^2}',
        explanation: 'Calculates the true geometric magnitude of position or displacement in n-dimensional Euclidean space.',
      },
      {
        title: 'Vector Dot Product',
        latex: '\\mathbf{a} \\cdot \\mathbf{b} = \\|\\mathbf{a}\\|\\|\\mathbf{b}\\|\\cos\\theta',
        explanation: 'Measures directional alignment and projection of vector a onto vector b.',
      },
    ],
  },
  {
    slug: 'geometry',
    title: 'Geometry & Transformations',
    subtitle: 'Coordinate Frames, Rotations & SE(2)/SE(3) Transforms',
    description:
      'Understand spatial reference frames, orthogonal SO(2)/SO(3) rotations, homogeneous SE(2)/SE(3) transforms, and kinematic frame chaining.',
    level: 2,
    levelBadge: 'Level 2',
    iconName: 'Box',
    milestone: 'Milestone 1',
    status: 'Foundation Ready',
    topics: [
      {
        title: '2D Rotation Matrices SO(2)',
        description: 'Orthogonal transformation matrices and planar coordinate frame rotations.',
        algorithms: ['SO(2) Rotation', 'Direction Cosines'],
      },
      {
        title: 'Homogeneous Rigid Transforms SE(2)',
        description: '3x3 homogeneous transformation matrices combining rotation and translation.',
        algorithms: ['SE(2) Transform', 'Frame Tree Chaining'],
      },
    ],
    primaryEquations: [
      {
        title: '2D Rigid Transformation Matrix',
        latex: '\\mathbf{p}^W = \\mathbf{R}(\\theta) \\mathbf{p}^R + \\mathbf{t} = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} x^R \\\\ y^R \\end{bmatrix} + \\begin{bmatrix} x_0 \\\\ y_0 \\end{bmatrix}',
        explanation: 'Transforms local robot coordinates into the global inertial reference frame.',
      },
    ],
  },
  {
    slug: 'kinematics',
    title: 'Robot Kinematics',
    subtitle: 'Differential Drive, ICC & Non-Holonomic Constraints',
    description:
      'Analyze the geometric motion of mobile wheeled robots: forward and inverse kinematics, Instantaneous Center of Curvature (ICC), and Pfaffian no-slip constraints.',
    level: 3,
    levelBadge: 'Level 3',
    iconName: 'Cpu',
    milestone: 'Milestone 2',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Differential-Drive Unicycle Kinematics',
        description: 'Wheel velocity mapping to forward linear speed v and rotational speed omega.',
        algorithms: ['Unicycle Integrator', 'Instantaneous Center of Curvature'],
      },
    ],
    primaryEquations: [
      {
        title: 'Differential Drive Forward Kinematics',
        latex: '\\begin{bmatrix} \\dot{x} \\\\ \\dot{y} \\\\ \\dot{\\theta} \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & 0 \\\\ \\sin\\theta & 0 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} v \\\\ \\omega \\end{bmatrix}',
        explanation: 'Relates linear velocity v and angular velocity omega to the time derivatives of global coordinates.',
      },
    ],
  },
  {
    slug: 'sensors',
    title: 'Sensors & Hardware Perception',
    subtitle: 'Encoders, Odometry Drift & LiDAR Raycasting',
    description:
      'Model physical sensor hardware: Gaussian electronic noise, wheel encoder dead reckoning drift, and 360° LiDAR Time-of-Flight beam intersections.',
    level: 5,
    levelBadge: 'Level 5',
    iconName: 'Radio',
    milestone: 'Milestone 5',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Wheel Odometry & Dead Reckoning',
        description: 'Encoder pulse integration and systematic heading drift divergence over time.',
        algorithms: ['Odometry Dead Reckoning', 'Encoder Integration'],
      },
      {
        title: 'LiDAR Raycasting & Point Clouds',
        description: 'Time-of-Flight laser range measurement and 2D/3D point cloud extraction.',
        algorithms: ['LiDAR Raycasting', 'Point Cloud Extraction'],
      },
    ],
    primaryEquations: [
      {
        title: 'Time-of-Flight Distance Measurement',
        latex: 'd = \\frac{c \\cdot \\Delta t}{2}',
        explanation: 'Calculates round-trip reflection distance from laser pulse travel duration.',
      },
    ],
  },
  {
    slug: 'planning',
    title: 'Path Planning & Graph Search',
    subtitle: 'Graph Search, C-Space Inflation & Randomized Sampling',
    description:
      'Compute collision-free shortest paths and trajectories: Configuration Space Minkowski inflation, A* heuristic graph search, Dynamic Window Approach (DWA), and continuous space RRT/RRT* sampling.',
    level: 6,
    levelBadge: 'Level 6',
    iconName: 'Navigation',
    milestone: 'Milestone 3',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'A* Heuristic Graph Search & Hybrid A*',
        description: 'Goal-directed shortest path search using admissible distance heuristics and kinematic vehicle primitives.',
        algorithms: ['Dijkstra', 'A* Search', 'Hybrid A*'],
      },
      {
        title: 'Sampling-Based Planners (RRT / PRM)',
        description: 'Rapidly-exploring random tree search and probabilistic roadmaps in continuous obstacle spaces.',
        algorithms: ['RRT', 'RRT*', 'Informed RRT*', 'PRM'],
      },
      {
        title: 'Local Collision Avoidance (DWA)',
        description: 'Dynamic Window Approach searching optimal velocity pairs (v, omega) within acceleration limits.',
        algorithms: ['Dynamic Window Approach (DWA)', 'Artificial Potential Field'],
      },
    ],
    primaryEquations: [
      {
        title: 'A* Evaluation Function',
        latex: 'f(n) = g(n) + h(n)',
        explanation: 'Total estimated path cost through node n, combining exact cost g(n) and heuristic estimate h(n).',
      },
    ],
  },
  {
    slug: 'control',
    title: 'Dynamics & Motion Control',
    subtitle: 'Feedback Systems, Pure Pursuit, Stanley & LQR/MPC Tuning',
    description:
      'Execute planned paths with high precision: Pure Pursuit lookahead steering, Stanley cross-track non-linear feedback, classical PID, and optimal LQR/MPC controllers.',
    level: 7,
    levelBadge: 'Level 7',
    iconName: 'Activity',
    milestone: 'Milestone 6',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Geometric Path Trackers',
        description: 'Look-ahead geometric path following for autonomous mobile robots.',
        algorithms: ['Pure Pursuit', 'Stanley Controller', 'Rear-Wheel Feedback'],
      },
      {
        title: 'Optimal & Predictive Control',
        description: 'Linear Quadratic Regulators (LQR) and Model Predictive Control (MPC) trajectory tracking.',
        algorithms: ['PID Controller', 'LQR Path Tracking', 'Model Predictive Control (MPC)'],
      },
    ],
    primaryEquations: [
      {
        title: 'Pure Pursuit Steering Law',
        latex: '\\kappa = \\frac{2\\sin\\alpha}{L_d}, \\quad \\delta = \\arctan(\\kappa L)',
        explanation: 'Computes vehicle steering angle delta to track reference path waypoints.',
      },
    ],
  },
  {
    slug: 'estimation',
    title: 'Localization & State Estimation',
    subtitle: 'Recursive Bayesian Filtering, EKF/UKF & Monte Carlo MCL',
    description:
      'Estimate robot position in known environments by fusing noisy odometry and exteroceptive sensor streams using Bayesian, EKF, UKF, and particle filters.',
    level: 8,
    levelBadge: 'Level 8',
    iconName: 'MapPin',
    milestone: 'Milestone 5',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Kalman Filtering (EKF & UKF)',
        description: 'Non-linear state estimation using Taylor series Jacobians (EKF) and Unscented Transform sigma points (UKF).',
        algorithms: ['EKF Localization', 'UKF Localization', '1D Bayes Filter'],
      },
      {
        title: 'Monte Carlo Localization (MCL)',
        description: 'Non-parametric particle filtering maintaining multimodal position hypothesis clouds.',
        algorithms: ['MCL Particle Filter', 'Importance Resampling'],
      },
    ],
    primaryEquations: [
      {
        title: 'Bayes Filter Recursive State Update',
        latex: 'p(x_t \\mid z_{1:t}, u_{1:t}) = \\eta \\, p(z_t \\mid x_t) \\int p(x_t \\mid x_{t-1}, u_t) p(x_{t-1} \\mid z_{1:t-1}, u_{1:t-1}) \\, dx_{t-1}',
        explanation: 'Fundamental recursion of probabilistic robotics: prediction via motion model, update via measurement likelihood.',
      },
    ],
  },
  {
    slug: 'perception',
    title: 'Spatial Mapping & Costmaps',
    subtitle: 'Log-Odds Occupancy Grids, NDT & Distance Transforms',
    description:
      'Construct spatial grid maps from raw laser range scans using recursive log-odds updates, Normal Distributions Transform (NDT) Gaussian cells, and compute distance transform costmaps.',
    level: 9,
    levelBadge: 'Level 9',
    iconName: 'Eye',
    milestone: 'Milestone 7',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Occupancy Grid Mapping',
        description: 'Discretizing continuous space into probabilistic cells using log-odds updates.',
        algorithms: ['Log-Odds Ray Casting', 'Grid Inversion', 'NDT Mapping'],
      },
    ],
    primaryEquations: [
      {
        title: 'Log-Odds Occupancy Update',
        latex: 'l_t(m_i) = l_{t-1}(m_i) + \\text{inv\\_sensor}(m_i, z_t) - l_0',
        explanation: 'Enables numerically stable addition instead of repeated Bayesian probability multiplications for grid cells.',
      },
    ],
  },
  {
    slug: 'manipulation',
    title: 'Manipulation & Articulated Arms',
    subtitle: 'Forward & Inverse Kinematics, Jacobians & Obstacle Avoidance',
    description:
      'Model articulated robotic arms: Denavit-Hartenberg parameters, forward kinematics, analytical inverse kinematics, Jacobian velocity ellipsoids, and obstacle-avoiding arm planners.',
    level: 14,
    levelBadge: 'Level 14',
    iconName: 'Crosshair',
    milestone: 'Milestone 9',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Forward & Inverse Kinematics',
        description: 'Mapping between joint angles (theta_1, theta_2) and end-effector Cartesian coordinates.',
        algorithms: ['Analytical IK Solver', 'Workspace Sweeper', 'N-Joint IK'],
      },
      {
        title: 'Jacobians & Singularity Detection',
        description: 'Velocity mapping and singularity posture detection via det(J) analysis.',
        algorithms: ['Jacobian Mapper', 'Singularity Detector'],
      },
    ],
    primaryEquations: [
      {
        title: 'Manipulator Differential Kinematics',
        latex: '\\dot{\\mathbf{x}} = \\mathbf{J}(\\boldsymbol{\\theta}) \\dot{\\boldsymbol{\\theta}}',
        explanation: 'Relates joint motor angular velocities to end-effector Cartesian velocities.',
      },
    ],
  },
  {
    slug: 'advanced',
    title: 'Advanced Robotics & Swarms',
    subtitle: 'ICP Scan Matching SLAM & Graph Laplacian Consensus',
    description:
      'Explore frontier robotics topics: Iterative Closest Point (ICP) laser scan registration, EKF-SLAM, FastSLAM, Pose-Graph SLAM, and decentralized multi-robot swarm consensus.',
    level: 10,
    levelBadge: 'Level 10 & 18',
    iconName: 'Zap',
    milestone: 'Milestone 8',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Scan Matching & SLAM',
        description: 'Point cloud scan matching with closed-form SVD rotation alignment, EKF-SLAM, and Pose Graph Optimization.',
        algorithms: ['Point-to-Point ICP', 'EKF-SLAM', 'FastSLAM 2.0', 'Pose Graph Optimization'],
      },
      {
        title: 'Multi-Agent Swarm Consensus',
        description: 'Decentralized flocking and formation control over communication graphs.',
        algorithms: ['Laplacian Consensus', 'Flocking Formation'],
      },
    ],
    primaryEquations: [
      {
        title: 'Continuous Consensus Dynamics',
        latex: '\\dot{\\mathbf{x}} = -\\mathbf{L} \\mathbf{x}',
        explanation: 'Decentralized state evolution driven by neighbor communication and graph Laplacian L.',
      },
    ],
  },
];

export const ALGORITHMS: AlgorithmMeta[] = [
  // 1. Path Planning
  {
    id: 'dijkstra',
    name: 'Dijkstra Shortest Path',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 2,
    levelTitle: 'Level 2 — Graph Theory & Search',
    difficulty: 'Beginner',
    description: 'Guarantees the optimal shortest path in weighted graphs by systematically expanding the lowest-cost frontier.',
    milestone: 'Milestone 2',
    path: '/learn/planning/astar-vs-dijkstra-search',
    paperRef: 'Dijkstra, E. W. (1959). A note on two problems in connexion with graphs.',
    keyEquation: 'd(v) = \\min_{u \\in \\text{adj}(v)} (d(u) + c(u, v))',
    tags: ['Graph Search', 'Deterministic', 'Optimal'],
  },
  {
    id: 'a-star',
    name: 'A* Heuristic Search',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Beginner',
    description: 'Directs graph exploration toward the goal using an admissible heuristic function, achieving superior search efficiency.',
    milestone: 'Milestone 3',
    path: '/learn/planning/a-star',
    paperRef: 'Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). A formal basis for heuristic determination of minimum cost paths.',
    keyEquation: 'f(n) = g(n) + h(n)',
    tags: ['Heuristic', 'Graph Search', 'Optimal'],
  },
  {
    id: 'hybrid-a-star',
    name: 'Hybrid A* Kinematic Search',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Advanced',
    description: 'Combines discrete grid graph search with continuous kinematic steering primitives (Reeds-Shepp / Dubins curves) for vehicles.',
    milestone: 'Milestone 3',
    path: '/learn/planning/a-star',
    paperRef: 'Dolgov, D., Thrun, S., Montemerlo, M., & Diebel, S. (2010). Path planning for autonomous vehicles in unknown semi-structured environments.',
    keyEquation: 'f(n) = g(n) + \\max(h_{\\text{holonomic}}(n), h_{\\text{non-holonomic}}(n))',
    tags: ['Kinematics', 'Continuous', 'Autonomous Driving'],
  },
  {
    id: 'dwa',
    name: 'Dynamic Window Approach (DWA)',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Intermediate',
    description: 'Samples safe circular trajectory velocity pairs (v, omega) within actuator acceleration dynamic windows.',
    milestone: 'Milestone 3',
    path: '/learn/planning/a-star',
    paperRef: 'Fox, D., Burgard, W., & Thrun, S. (1997). The dynamic window approach to collision avoidance.',
    keyEquation: 'G(v, \\omega) = \\alpha \\cdot \\text{heading} + \\beta \\cdot \\text{dist} + \\gamma \\cdot \\text{velocity}',
    tags: ['Local Planner', 'Dynamic Window', 'Obstacle Avoidance'],
  },
  {
    id: 'potential-field',
    name: 'Artificial Potential Fields (APF)',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Intermediate',
    description: 'Generates real-time obstacle avoidance forces by modeling targets as attractive wells and obstacles as repulsive peaks.',
    milestone: 'Milestone 3',
    path: '/learn/planning/a-star',
    paperRef: 'Khatib, O. (1986). Real-time obstacle avoidance for manipulators and mobile robots.',
    keyEquation: 'F = -\\nabla U_{\\text{att}} - \\nabla U_{\\text{rep}}',
    tags: ['Reactive', 'Continuous', 'Local Planner'],
  },
  {
    id: 'prm',
    name: 'Probabilistic Roadmaps (PRM)',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Intermediate',
    description: 'Constructs multi-query collision-free topological roadmaps by connecting randomly sampled configurations in C-Space.',
    milestone: 'Milestone 4',
    path: '/learn/planning/rrt-sampling-planner',
    paperRef: 'Kavraki, L. E., Svestka, P., Latombe, J. C., & Overmars, M. H. (1996). Probabilistic roadmaps for path planning in high-dimensional configuration spaces.',
    keyEquation: 'G = (V, E), \\quad e = (q_i, q_j) \\iff \\text{CollisionFree}(q_i, q_j)',
    tags: ['Multi-Query', 'Sampling-Based', 'C-Space'],
  },
  {
    id: 'rrt',
    name: 'Rapidly-Exploring Random Trees (RRT)',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Intermediate',
    description: 'Samples random configurations to incrementally grow a search tree that rapidly covers high-dimensional continuous space.',
    milestone: 'Milestone 4',
    path: '/learn/planning/rrt-sampling-planner',
    paperRef: 'LaValle, S. M. (1998). Rapidly-exploring random trees: A new tool for path planning.',
    keyEquation: 'q_{\\text{new}} = q_{\\text{near}} + \\epsilon \\frac{q_{\\text{rand}} - q_{\\text{near}}}{\\|q_{\\text{rand}} - q_{\\text{near}}\\|}',
    tags: ['Sampling-Based', 'Continuous Space', 'Probabilistic Completeness'],
  },
  {
    id: 'rrt-star',
    name: 'RRT* Asymptotically Optimal Sampling',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Advanced',
    description: 'Enhances RRT with local neighbor rewiring, guaranteeing asymptotic convergence to the theoretical optimal path.',
    milestone: 'Milestone 4',
    path: '/learn/planning/rrt-sampling-planner',
    paperRef: 'Karaman, S., & Frazzoli, E. (2011). Sampling-based algorithms for optimal motion planning.',
    keyEquation: '\\lim_{i \\to \\infty} P(c(T_i) = c^*) = 1',
    tags: ['Optimal', 'Sampling-Based', 'Rewiring'],
  },

  // 2. Localization & State Estimation
  {
    id: 'ekf-localization',
    name: 'Extended Kalman Filter (EKF) Localization',
    category: 'Localization',
    categorySlug: 'estimation',
    level: 8,
    levelTitle: 'Level 8 — Localization & State Estimation',
    difficulty: 'Intermediate',
    description: 'Estimates 2D robot poses by fusing odometry motion models with landmark measurements via first-order Taylor expansion linearization.',
    milestone: 'Milestone 5',
    path: '/learn/estimation/bayes-filter-and-kalman',
    paperRef: 'Smith, R. C., & Cheeseman, P. (1986). On the representation and estimation of spatial uncertainty.',
    keyEquation: 'K_t = \\bar{\\Sigma}_t H_t^T (H_t \\bar{\\Sigma}_t H_t^T + R_t)^{-1}',
    tags: ['Kalman Filter', 'Linearization', 'Gaussian'],
  },
  {
    id: 'ukf-localization',
    name: 'Unscented Kalman Filter (UKF) Localization',
    category: 'Localization',
    categorySlug: 'estimation',
    level: 8,
    levelTitle: 'Level 8 — Localization & State Estimation',
    difficulty: 'Advanced',
    description: 'Captures posterior mean and covariance accurately to 3rd-order Taylor series using deterministically chosen Sigma Points.',
    milestone: 'Milestone 5',
    path: '/learn/estimation/bayes-filter-and-kalman',
    paperRef: 'Julier, S. J., & Uhlmann, J. K. (1997). New extension of the Kalman filter to nonlinear systems.',
    keyEquation: '\\chi^{[i]} = \\bar{x} \\pm \\left(\\sqrt{(n + \\lambda)\\Sigma}\\right)_i',
    tags: ['Sigma Points', 'Unscented Transform', 'Nonlinear'],
  },
  {
    id: 'particle-filter',
    name: 'Monte Carlo Localization (MCL) Particle Filter',
    category: 'Localization',
    categorySlug: 'estimation',
    level: 8,
    levelTitle: 'Level 8 — Localization & State Estimation',
    difficulty: 'Intermediate',
    description: 'Approximates continuous multimodal belief distributions using a cloud of weighted particles that converge as sensor readings arrive.',
    milestone: 'Milestone 5',
    path: '/learn/estimation/mcl-particle-filter',
    paperRef: 'Fox, D., Burgard, W., Dellaert, F., & Thrun, S. (1999). Monte Carlo localization: Efficient position estimation for mobile robots.',
    keyEquation: 'w_t^{[i]} = \\eta \\, p(z_t \\mid x_t^{[i]})',
    tags: ['Probabilistic', 'Particle Filter', 'Global Localization'],
  },

  // 3. Mapping
  {
    id: 'occupancy-grid',
    name: 'Log-Odds Occupancy Grid Mapping',
    category: 'Mapping',
    categorySlug: 'perception',
    level: 9,
    levelTitle: 'Level 9 — Spatial Mapping & Costmaps',
    difficulty: 'Intermediate',
    description: 'Builds a 2D probabilistic map of obstacles by updating cell log-odds values with inverse sensor measurement rays.',
    milestone: 'Milestone 7',
    path: '/learn/perception/occupancy-grid-mapping',
    paperRef: 'Moravec, H., & Elfes, A. (1985). High resolution maps from wide angle sonar.',
    keyEquation: 'l_t(m_i) = l_{t-1}(m_i) + \\text{inv\\_sensor}(m_i, z_t) - l_0',
    tags: ['Grid Mapping', 'Log-Odds', 'Sensor Fusion'],
  },
  {
    id: 'ndt-mapping',
    name: 'Normal Distributions Transform (NDT) Mapping',
    category: 'Mapping',
    categorySlug: 'perception',
    level: 9,
    levelTitle: 'Level 9 — Spatial Mapping & Costmaps',
    difficulty: 'Advanced',
    description: 'Models point cloud clusters inside spatial cells as local Gaussian probability densities for smooth, differentiable scan matching.',
    milestone: 'Milestone 7',
    path: '/learn/perception/occupancy-grid-mapping',
    paperRef: 'Biber, P., & Straßer, W. (2003). The normal distributions transform: A new approach to laser scan matching.',
    keyEquation: 'p(x) = \\frac{1}{(2\\pi)^{d/2}\\sqrt{\\det\\Sigma_i}} \\exp\\left(-\\frac{1}{2}(x - \\mu_i)^T\\Sigma_i^{-1}(x - \\mu_i)\\right)',
    tags: ['NDT', 'Continuous Density', 'Laser Mapping'],
  },

  // 4. SLAM
  {
    id: 'icp',
    name: 'Iterative Closest Point (ICP)',
    category: 'SLAM',
    categorySlug: 'advanced',
    level: 10,
    levelTitle: 'Level 10 — Simultaneous Localization & Mapping',
    difficulty: 'Intermediate',
    description: 'Aligns successive laser point clouds by iteratively finding correspondences and solving for optimal rigid body transform via SVD.',
    milestone: 'Milestone 7',
    path: '/learn/advanced/icp-scan-matching',
    paperRef: 'Besl, P. J., & McKay, N. D. (1992). A method for registration of 3-D shapes.',
    keyEquation: '\\min_{R, t} \\sum \\| R p_i + t - q_i \\|^2',
    tags: ['Scan Matching', 'Point Cloud', 'SVD Registration'],
  },
  {
    id: 'ekf-slam',
    name: 'EKF-SLAM (Landmark-Based)',
    category: 'SLAM',
    categorySlug: 'advanced',
    level: 10,
    levelTitle: 'Level 10 — Simultaneous Localization & Mapping',
    difficulty: 'Advanced',
    description: 'Jointly estimates robot pose and landmark positions in a unified state vector with cross-correlation covariances.',
    milestone: 'Milestone 8',
    path: '/learn/advanced/icp-scan-matching',
    paperRef: 'Dissanayake, M. W. M. G., et al. (2001). A solution to the simultaneous localization and map building (SLAM) problem.',
    keyEquation: 'x = [x_R, y_R, \\theta_R, m_{1,x}, m_{1,y}, \\dots, m_{K,x}, m_{K,y}]^T',
    tags: ['Landmark SLAM', 'EKF', 'Classical'],
  },
  {
    id: 'fastslam',
    name: 'FastSLAM 2.0 (Rao-Blackwellized)',
    category: 'SLAM',
    categorySlug: 'advanced',
    level: 10,
    levelTitle: 'Level 10 — Simultaneous Localization & Mapping',
    difficulty: 'Advanced',
    description: 'Decomposes the full SLAM posterior into a particle filter for trajectory and independent 2x2 EKFs for landmark positions.',
    milestone: 'Milestone 8',
    path: '/learn/advanced/icp-scan-matching',
    paperRef: 'Montemerlo, M., Thrun, S., Koller, D., & Wegbreit, B. (2003). FastSLAM 2.0: An improved particle filtering algorithm for simultaneous localization and mapping.',
    keyEquation: 'p(x_{1:t}, m \\mid z_{1:t}, u_{1:t}) = p(x_{1:t} \\mid z_{1:t}, u_{1:t}) \\prod_{k=1}^K p(m_k \\mid x_{1:t}, z_{1:t})',
    tags: ['Rao-Blackwellized', 'Particle SLAM', 'O(M log K)'],
  },

  // 5. Tracking & Control
  {
    id: 'pure-pursuit',
    name: 'Pure Pursuit Path Tracking',
    category: 'Control',
    categorySlug: 'control',
    level: 7,
    levelTitle: 'Level 7 — Robot Dynamics & Control',
    difficulty: 'Beginner',
    description: 'Calculates the steering curvature required to chase a moving lookahead target on a pre-planned geometric path.',
    milestone: 'Milestone 6',
    path: '/learn/control/pure-pursuit-path-tracking',
    paperRef: 'Coulter, R. C. (1992). Implementation of the pure pursuit path tracking algorithm.',
    keyEquation: '\\delta = \\arctan\\left(\\frac{2 L \\sin\\alpha}{L_f}\\right)',
    tags: ['Geometric Control', 'Lookahead', 'Path Tracking'],
  },
  {
    id: 'stanley',
    name: 'Stanley Front-Wheel Steering Controller',
    category: 'Control',
    categorySlug: 'control',
    level: 7,
    levelTitle: 'Level 7 — Robot Dynamics & Control',
    difficulty: 'Intermediate',
    description: 'Non-linear feedback control law combining heading error with front-wheel cross-track error compensation.',
    milestone: 'Milestone 6',
    path: '/learn/control/pure-pursuit-path-tracking',
    paperRef: 'Hoffmann, G. M., Tomlin, C. J., Montemerlo, M., & Thrun, S. (2007). Autonomous automobile trajectory tracking for off-road driving.',
    keyEquation: '\\delta(t) = \\theta_e(t) + \\arctan\\left(\\frac{k \\cdot e(t)}{v(t)}\\right)',
    tags: ['Stanley', 'Cross-Track Error', 'Autonomous Driving'],
  },
  {
    id: 'lqr-control',
    name: 'Linear Quadratic Regulator (LQR) Tracking',
    category: 'Control',
    categorySlug: 'control',
    level: 7,
    levelTitle: 'Level 7 — Robot Dynamics & Control',
    difficulty: 'Advanced',
    description: 'Computes optimal state feedback gain matrix K by minimizing quadratic cost over trajectory error and actuator effort.',
    milestone: 'Milestone 6',
    path: '/learn/control/pid-and-lqr-control',
    paperRef: 'Kalman, R. E. (1960). A new approach to linear filtering and prediction problems.',
    keyEquation: 'J = \\int_0^\\infty (x^T Q x + u^T R u) dt, \\quad u = -K x',
    tags: ['Optimal Control', 'LQR', 'Riccati Equation'],
  },
  {
    id: 'mpc-control',
    name: 'Model Predictive Control (MPC)',
    category: 'Control',
    categorySlug: 'control',
    level: 7,
    levelTitle: 'Level 7 — Robot Dynamics & Control',
    difficulty: 'Advanced',
    description: 'Solves constrained finite-horizon quadratic optimization problems in real-time to generate optimal control sequences.',
    milestone: 'Milestone 6',
    path: '/learn/control/pid-and-lqr-control',
    paperRef: 'Garcia, C. E., Prett, D. M., & Morari, M. (1989). Model predictive control: Theory and practice—A survey.',
    keyEquation: '\\min_U \\sum_{k=0}^{N-1} \\left( x_k^T Q x_k + u_k^T R u_k \\right) + x_N^T P x_N',
    tags: ['Predictive Control', 'Optimization', 'Constraints'],
  },

  // 6. Arm Manipulation
  {
    id: 'arm-ik',
    name: 'N-Joint Analytical & Jacobian Inverse Kinematics',
    category: 'Control',
    categorySlug: 'manipulation',
    level: 14,
    levelTitle: 'Level 14 — Manipulation Robotics & Articulated Arms',
    difficulty: 'Intermediate',
    description: 'Computes joint angles to place end-effector at target Cartesian pose and maps joint velocities via the Jacobian.',
    milestone: 'Milestone 9',
    path: '/learn/manipulation/2dof-inverse-kinematics',
    paperRef: 'Paul, R. P. (1981). Robot Manipulators: Mathematics, Programming, and Control. MIT Press.',
    keyEquation: '\\dot{\\mathbf{x}} = \\mathbf{J}(\\boldsymbol{\\theta}) \\dot{\\boldsymbol{\\theta}}, \\quad \\boldsymbol{\\theta}_{k+1} = \\boldsymbol{\\theta}_k + \\mathbf{J}^{\\dagger} \\Delta \\mathbf{x}',
    tags: ['Manipulator', 'Inverse Kinematics', 'Jacobian'],
  },

  // 7. Multi-Agent
  {
    id: 'consensus',
    name: 'Graph Laplacian Swarm Consensus',
    category: 'Multi-Agent',
    categorySlug: 'advanced',
    level: 18,
    levelTitle: 'Level 18 — Multi-Agent Robotics & Swarms',
    difficulty: 'Advanced',
    description: 'Enables decentralized groups of robots to reach consensus on position, velocity, or heading using local communication links.',
    milestone: 'Milestone 8',
    path: '/learn/advanced/laplacian-consensus',
    paperRef: 'Olfati-Saber, R., & Murray, R. M. (2004). Consensus problems in networks of agents with directed topologies and time-delays.',
    keyEquation: '\\dot{x} = -L x',
    tags: ['Swarm Robotics', 'Decentralized', 'Graph Theory'],
  },
];
