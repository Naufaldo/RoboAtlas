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
      'Compute collision-free shortest paths and trajectories: Configuration Space Minkowski inflation, A* heuristic graph search, and continuous space RRT/RRT* sampling.',
    level: 6,
    levelBadge: 'Level 6',
    iconName: 'Navigation',
    milestone: 'Milestone 3',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'A* Heuristic Graph Search',
        description: 'Goal-directed shortest path search using admissible distance heuristics.',
        algorithms: ['Dijkstra', 'A* Search', 'D* Lite'],
      },
      {
        title: 'Sampling-Based Planners',
        description: 'Rapidly-exploring random tree search in continuous obstacle spaces.',
        algorithms: ['RRT', 'RRT*', 'Informed RRT*'],
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
    subtitle: 'Feedback Systems, Pure Pursuit & PID Tuning',
    description:
      'Execute planned paths with high precision: Pure Pursuit lookahead steering, Stanley cross-track non-linear feedback, and classical PID controllers.',
    level: 7,
    levelBadge: 'Level 7',
    iconName: 'Activity',
    milestone: 'Milestone 6',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Geometric Path Trackers',
        description: 'Look-ahead geometric path following for autonomous mobile robots.',
        algorithms: ['Pure Pursuit', 'Stanley Controller'],
      },
      {
        title: 'PID & Feedback Control',
        description: 'Proportional-Integral-Derivative controllers and step response tuning.',
        algorithms: ['PID Controller', 'State Feedback'],
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
    subtitle: 'Recursive Bayesian Filtering & Monte Carlo MCL',
    description:
      'Estimate robot position in known environments by fusing noisy odometry and exteroceptive sensor streams using Bayesian and particle filters.',
    level: 8,
    levelBadge: 'Level 8',
    iconName: 'MapPin',
    milestone: 'Milestone 5',
    status: 'Foundation Ready',
    topics: [
      {
        title: '1D Bayesian & Kalman Filtering',
        description: 'Prediction-correction state estimation using Gaussian probability density functions.',
        algorithms: ['Bayes Filter', 'Kalman Filter'],
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
    subtitle: 'Log-Odds Occupancy Grids & Distance Transforms',
    description:
      'Construct spatial grid maps from raw laser range scans using recursive log-odds updates and compute distance transform costmaps.',
    level: 9,
    levelBadge: 'Level 9',
    iconName: 'Eye',
    milestone: 'Milestone 7',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Occupancy Grid Mapping',
        description: 'Discretizing continuous space into probabilistic cells using log-odds updates.',
        algorithms: ['Log-Odds Ray Casting', 'Grid Inversion'],
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
    subtitle: 'Forward & Inverse Kinematics, Jacobians & Singularities',
    description:
      'Model articulated robotic arms: Denavit-Hartenberg parameters, forward kinematics, analytical inverse kinematics, and Jacobian velocity ellipsoids.',
    level: 14,
    levelBadge: 'Level 14',
    iconName: 'Crosshair',
    milestone: 'Milestone 9',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Forward & Inverse Kinematics',
        description: 'Mapping between joint angles (theta_1, theta_2) and end-effector Cartesian coordinates.',
        algorithms: ['Analytical IK Solver', 'Workspace Sweeper'],
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
      'Explore frontier robotics topics: Iterative Closest Point (ICP) laser scan registration and decentralized multi-robot swarm consensus.',
    level: 10,
    levelBadge: 'Level 10 & 18',
    iconName: 'Zap',
    milestone: 'Milestone 8',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Iterative Closest Point (ICP) SLAM',
        description: 'Point cloud scan matching with closed-form SVD rotation alignment.',
        algorithms: ['Point-to-Point ICP', 'SVD Closed-Form Solver'],
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
    path: '/learn/planning',
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
    path: '/learn/planning',
    paperRef: 'Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). A formal basis for heuristic determination of minimum cost paths.',
    keyEquation: 'f(n) = g(n) + h(n)',
    tags: ['Heuristic', 'Graph Search', 'Optimal'],
  },
  {
    id: 'potential-field',
    name: 'Artificial Potential Fields',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Navigation',
    difficulty: 'Intermediate',
    description: 'Generates real-time obstacle avoidance forces by modeling targets as attractive wells and obstacles as repulsive peaks.',
    milestone: 'Milestone 3',
    path: '/learn/planning',
    paperRef: 'Khatib, O. (1986). Real-time obstacle avoidance for manipulators and mobile robots.',
    keyEquation: 'F = -\\nabla U_{\\text{att}} - \\nabla U_{\\text{rep}}',
    tags: ['Reactive', 'Continuous', 'Local Planner'],
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
    path: '/learn/planning',
    paperRef: 'LaValle, S. M. (1998). Rapidly-exploring random trees: A new tool for path planning.',
    keyEquation: 'q_{\\text{new}} = q_{\\text{near}} + \\epsilon \\frac{q_{\\text{rand}} - q_{\\text{near}}}{\\|q_{\\text{rand}} - q_{\\text{near}}\\|}',
    tags: ['Sampling-Based', 'Continuous Space', 'Probabilistic Completeness'],
  },
  {
    id: 'particle-filter',
    name: 'Monte Carlo Localization (MCL)',
    category: 'State Estimation',
    categorySlug: 'estimation',
    level: 8,
    levelTitle: 'Level 8 — Localization & State Estimation',
    difficulty: 'Intermediate',
    description: 'Approximates continuous belief distributions using a swarm of weighted particles that converge as sensor readings arrive.',
    milestone: 'Milestone 5',
    path: '/learn/estimation',
    paperRef: 'Fox, D., Burgard, W., Dellaert, F., & Thrun, S. (1999). Monte Carlo localization: Efficient position estimation for mobile robots.',
    keyEquation: 'w_t^{[i]} = \\eta \\, p(z_t \\mid x_t^{[i]})',
    tags: ['Probabilistic', 'Particle Filter', 'Global Localization'],
  },
  {
    id: 'pure-pursuit',
    name: 'Pure Pursuit Path Tracking',
    category: 'Robot Control',
    categorySlug: 'control',
    level: 7,
    levelTitle: 'Level 7 — Robot Dynamics & Control',
    difficulty: 'Beginner',
    description: 'Calculates the steering curvature required to chase a moving lookahead target on a pre-planned geometric path.',
    milestone: 'Milestone 6',
    path: '/learn/control',
    paperRef: 'Coulter, R. C. (1992). Implementation of the pure pursuit path tracking algorithm.',
    keyEquation: '\\delta = \\arctan\\left(\\frac{2 L \\sin\\alpha}{L_f}\\right)',
    tags: ['Geometric Control', 'Lookahead', 'Path Tracking'],
  },
  {
    id: 'icp',
    name: 'Iterative Closest Point (ICP)',
    category: 'SLAM',
    categorySlug: 'advanced',
    level: 10,
    levelTitle: 'Level 10 — Simultaneous Localization & Mapping',
    difficulty: 'Intermediate',
    description: 'Aligns successive laser point clouds by iteratively finding correspondences and solving for optimal rigid body transform.',
    milestone: 'Milestone 7',
    path: '/learn/advanced',
    paperRef: 'Besl, P. J., & McKay, N. D. (1992). A method for registration of 3-D shapes.',
    keyEquation: '\\min_{R, t} \\sum \\| R p_i + t - q_i \\|^2',
    tags: ['Scan Matching', 'Point Cloud', 'SVD Registration'],
  },
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
    path: '/learn/advanced',
    paperRef: 'Olfati-Saber, R., & Murray, R. M. (2004). Consensus problems in networks of agents with directed topologies and time-delays.',
    keyEquation: '\\dot{x} = -L x',
    tags: ['Swarm Robotics', 'Decentralized', 'Graph Theory'],
  },
];
