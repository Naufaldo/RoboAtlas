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
    subtitle: 'Orientation, Geometry, Kinematics & Modeling',
    description:
      'Master the foundational mathematical representations of robotics: 2D/3D coordinate transformations, forward and inverse kinematics, differential-drive models, and sensor principles.',
    level: 0,
    levelBadge: 'Levels 0, 1, 3',
    iconName: 'Compass',
    milestone: 'Milestone 1',
    status: 'Foundation Ready',
    topics: [
      {
        title: '1. Introduction to Robotics (Level 0)',
        description: 'Autonomy definitions, Sense-Plan-Act loops, robot classification (fixed vs mobile).',
        algorithms: ['Braitenberg Vehicles', 'Reactive State Controller'],
      },
      {
        title: '2. 2D Geometry & Planar Transforms (Level 1)',
        description: 'Cartesian and polar coordinates, vector rotations in SO(2), triangulation sensors.',
        algorithms: ['2D Rigid Transform', 'Triangulation Localization'],
      },
      {
        title: '3. 3D Spatial Geometry & Euler Angles (Level 1)',
        description: 'Right-hand rule, SO(3) 3D rotation matrices, roll-pitch-yaw, and quaternions.',
        algorithms: ['Euler ZYX Rotations', 'Quaternion Slerp'],
      },
      {
        title: '4. Path & Trajectory Generation (Level 6)',
        description: 'Distinction between geometric path and time-parameterized trajectory with quintic splines.',
        algorithms: ['Quintic Polynomial Spline', 'Velocity Profiler'],
      },
      {
        title: '5. Velocity Kinematics in 2D (Level 3)',
        description: 'Differential-drive unicycle velocity mappings, ICC radius, and no-slip non-holonomic constraints.',
        algorithms: ['Unicycle Integrator', 'Instantaneous Center of Curvature'],
      },
      {
        title: '6. Velocity Kinematics in 3D (Level 3)',
        description: 'Spatial twist, angular velocity skew-symmetric matrix, and manipulator Geometric Jacobians.',
        algorithms: ['Geometric Jacobian Mapping', 'Skew-Symmetric Operator'],
      },
      {
        title: '7. Matrix Foundations for Robotics (Level 1)',
        description: '4x4 SE(3) homogeneous transforms, matrix inverses, sensor covariance matrices, and SVD.',
        algorithms: ['SE(3) Homogeneous Transform', 'Covariance Estimator'],
      },
      {
        title: '8. Mathematical Modeling & Automata (Level 3)',
        description: 'Non-linear state-space continuous/discrete formulations, Bayes filters, and Finite State Machines.',
        algorithms: ['Discrete State-Space Model', 'Finite State Machine (FSM)'],
      },
      {
        title: '9. Robot Dynamics, Forces & Torques (Level 7)',
        description: 'Newton-Euler translative/rotative motion equations, Euler-Lagrange manipulator dynamics.',
        algorithms: ['Newton-Euler Integrator', 'Euler-Lagrange Equation'],
      },
    ],
    primaryEquations: [
      {
        title: 'Differential Drive Forward Kinematics',
        latex: '\\begin{bmatrix} \\dot{x} \\\\ \\dot{y} \\\\ \\dot{\\theta} \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & 0 \\\\ \\sin\\theta & 0 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} v \\\\ \\omega \\end{bmatrix}',
        explanation: 'Relates linear velocity v and angular velocity omega to the time derivatives of global coordinates.',
      },
      {
        title: '2D Rigid Body Coordinate Transformation',
        latex: 'p^{W} = R(\\theta) p^{R} + t = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} x^R \\\\ y^R \\end{bmatrix} + \\begin{bmatrix} x_0 \\\\ y_0 \\end{bmatrix}',
        explanation: 'Transforms a local point in the robot frame into the global world reference frame.',
      },
    ],
  },
  {
    slug: 'localization',
    title: 'Localization',
    subtitle: 'State Estimation & Probabilistic Filtering',
    description:
      'Determine where a robot is located within a known environment by fusing odometry with noisy sensor measurements using Bayesian filters.',
    level: 5,
    levelBadge: 'Level 5',
    iconName: 'MapPin',
    milestone: 'Milestone 5',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Extended Kalman Filter (EKF)',
        description: 'Nonlinear state estimation through first-order Taylor expansion linearization.',
        algorithms: ['EKF Localization'],
      },
      {
        title: 'Particle Filter (Monte Carlo MCL)',
        description: 'Non-parametric Bayesian filter using a cloud of weighted particles to represent multimodal belief distributions.',
        algorithms: ['MCL Particle Filter'],
      },
    ],
    primaryEquations: [
      {
        title: 'Bayes Filter Recursive State Update',
        latex: 'p(x_t \\mid z_{1:t}, u_{1:t}) = \\eta \\, p(z_t \\mid x_t) \\int p(x_t \\mid x_{t-1}, u_t) p(x_{t-1} \\mid z_{1:t-1}, u_{1:t-1}) \\, dx_{t-1}',
        explanation: 'Fundamental recursion of probabilistic robotics: prediction via motion model, update via measurement likelihood.',
      },
      {
        title: 'MCL Gaussian Particle Weight Update',
        latex: 'w_t^{[i]} = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left(-\\frac{(z_t - \\hat{z}_t^{[i]})^2}{2\\sigma^2}\\right)',
        explanation: 'Updates importance weights of candidate state hypotheses according to Gaussian measurement error.',
      },
    ],
  },
  {
    slug: 'mapping',
    title: 'Mapping',
    subtitle: 'Spatial Representations & Environment Models',
    description:
      'Construct spatial representations of environments from sensor streams, including Occupancy Grids, Signed Distance Fields (SDF), and topological roadmaps.',
    level: 5,
    levelBadge: 'Level 5',
    iconName: 'Layers',
    milestone: 'Milestone 7',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Occupancy Grid Mapping',
        description: 'Discretizing continuous space into probabilistic cells using log-odds updates.',
        algorithms: ['Log-Odds Ray Casting', 'Grid Inversion'],
      },
      {
        title: 'Distance Transforms & Costmaps',
        description: 'Euclidean distance fields for collision checking and inflation layers.',
        algorithms: ['Euclidean Distance Transform (EDT)', 'Costmap Inflation'],
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
    slug: 'slam',
    title: 'SLAM',
    subtitle: 'Simultaneous Localization and Mapping',
    description:
      'Solve the chicken-or-egg problem of robotics: estimating robot pose while simultaneously building an accurate map of an unknown environment.',
    level: 8,
    levelBadge: 'Level 8',
    iconName: 'RotateCcw',
    milestone: 'Milestone 7',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Iterative Closest Point (ICP)',
        description: 'Point cloud scan matching to compute relative rigid-body transformation between LiDAR frames.',
        algorithms: ['Point-to-Point ICP', 'Point-to-Plane ICP'],
      },
      {
        title: 'FastSLAM & Graph-SLAM',
        description: 'Rao-Blackwellized particle filtering and nonlinear pose-graph optimization.',
        algorithms: ['FastSLAM 1.0', 'Pose Graph Optimization'],
      },
    ],
    primaryEquations: [
      {
        title: 'ICP Least-Squares Objective',
        latex: '\\min_{R, t} \\sum_{i=1}^{N} \\| R p_i + t - q_i \\|^2',
        explanation: 'Minimizes the sum of squared Euclidean distances between source points p_i and corresponding target points q_i.',
      },
    ],
  },
  {
    slug: 'planning',
    title: 'Path Planning',
    subtitle: 'Graph Search, Sampling & Trajectory Generation',
    description:
      'Compute collision-free, optimal, or dynamically feasible trajectories from start configuration to goal in grid worlds and continuous state spaces.',
    level: 6,
    levelBadge: 'Level 2 & 6',
    iconName: 'Navigation',
    milestone: 'Milestone 2 - 4',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Graph-Based Search (Level 2 & 6)',
        description: 'Exact grid-based shortest paths using heuristic-guided node expansions.',
        algorithms: ['Dijkstra', 'A* Search', 'D* Lite'],
      },
      {
        title: 'Sampling-Based Planners (Level 6)',
        description: 'Random exploration of high-dimensional configuration spaces with asymptotic optimality.',
        algorithms: ['RRT', 'RRT*', 'Informed RRT*'],
      },
      {
        title: 'Potential Fields (Level 6)',
        description: 'Virtual attractive forces toward goal and repulsive forces away from obstacles.',
        algorithms: ['Artificial Potential Field (APF)'],
      },
    ],
    primaryEquations: [
      {
        title: 'A* Evaluation Function',
        latex: 'f(n) = g(n) + h(n)',
        explanation: 'Total estimated cost through node n: g(n) is actual cost from start, h(n) is admissible heuristic estimate to goal.',
      },
      {
        title: 'Artificial Potential Field Gradient',
        latex: 'F_{\\text{net}}(q) = -\\nabla U_{\\text{att}}(q) - \\nabla U_{\\text{rep}}(q)',
        explanation: 'Net virtual force acting on the robot towards the target while pushing away from obstacle boundaries.',
      },
    ],
  },
  {
    slug: 'control',
    title: 'Robot Control',
    subtitle: 'Feedback Systems, Path Tracking & Motion Control',
    description:
      'Execute planned trajectories with precision and stability using feedback control laws designed for kinematic and dynamic robot models.',
    level: 7,
    levelBadge: 'Level 7',
    iconName: 'Cpu',
    milestone: 'Milestone 6',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Geometric Path Trackers',
        description: 'Look-ahead geometric path following for autonomous mobile robots.',
        algorithms: ['Pure Pursuit', 'Stanley Controller'],
      },
      {
        title: 'Classical & Optimal Control',
        description: 'Proportional-Integral-Derivative and Linear Quadratic Regulators.',
        algorithms: ['PID Controller', 'LQR Path Tracking'],
      },
    ],
    primaryEquations: [
      {
        title: 'Pure Pursuit Steering Angle',
        latex: '\\delta = \\arctan\\left(\\frac{2 L \\sin\\alpha}{L_f}\\right)',
        explanation: 'Computes steering angle delta given wheelbase L, lookahead distance L_f, and heading angle alpha to lookahead point.',
      },
      {
        title: 'Stanley Cross-Track Steering Control',
        latex: '\\delta(t) = \\theta_e(t) + \\arctan\\left(\\frac{k \\cdot e(t)}{v(t)}\\right)',
        explanation: 'Combines heading error theta_e with nonlinear cross-track error compensation term scaled by forward speed v.',
      },
    ],
  },
  {
    slug: 'multi-agent',
    title: 'Multi-Agent Robotics',
    subtitle: 'Swarm Intelligence, Consensus & Distributed Formations',
    description:
      'Coordinate teams of autonomous robots using decentralized communication protocols, graph Laplacian consensus, and flocking dynamics.',
    level: 9,
    levelBadge: 'Level 9',
    iconName: 'Users',
    milestone: 'Milestone 8',
    status: 'Foundation Ready',
    topics: [
      {
        title: 'Consensus Protocols',
        description: 'Reaching agreement on state or orientation over communication graph topologies.',
        algorithms: ['Laplacian Consensus', 'Average Consensus'],
      },
      {
        title: 'Leader-Follower & Formations',
        description: 'Maintaining geometric patterns during navigation with dynamic obstacle avoidance.',
        algorithms: ['Leader-Follower Virtual Structure', 'Flocking (Reynolds Rules)'],
      },
    ],
    primaryEquations: [
      {
        title: 'Continuous Consensus Dynamics',
        latex: '\\dot{x}_i(t) = -\\sum_{j \\in \\mathcal{N}_i} a_{ij} (x_i(t) - x_j(t)) = -[L x(t)]_i',
        explanation: 'Decentralized state evolution driven by neighbor communication weights and the graph Laplacian matrix L.',
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
    name: 'Artificial Potential Field (APF)',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Reactive Navigation',
    difficulty: 'Intermediate',
    description: 'Simulates physics-based attractive and repulsive force vectors for continuous real-time reactive obstacle avoidance.',
    milestone: 'Milestone 4',
    path: '/learn/planning',
    paperRef: 'Khatib, O. (1986). Real-time obstacle avoidance for manipulators and mobile robots.',
    keyEquation: 'F = -\\nabla U_{att} - \\nabla U_{rep}',
    tags: ['Reactive', 'Continuous', 'Physics-Based'],
  },
  {
    id: 'rrt',
    name: 'Rapidly-exploring Random Tree (RRT)',
    category: 'Path Planning',
    categorySlug: 'planning',
    level: 6,
    levelTitle: 'Level 6 — Path Planning & Sampling',
    difficulty: 'Intermediate',
    description: 'Randomly samples high-dimensional configuration spaces to rapidly build a search tree without requiring fine discretization.',
    milestone: 'Milestone 4',
    path: '/learn/planning',
    paperRef: 'LaValle, S. M. (1998). Rapidly-exploring random trees: A new tool for path planning.',
    keyEquation: 'q_{new} = q_{near} + \\frac{\\Delta q}{\\|q_{rand} - q_{near}\\|}(q_{rand} - q_{near})',
    tags: ['Sampling-Based', 'Kinodynamic', 'Non-Holonomic'],
  },
  {
    id: 'particle-filter',
    name: 'Particle Filter (Monte Carlo MCL)',
    category: 'Localization',
    categorySlug: 'localization',
    level: 5,
    levelTitle: 'Level 5 — Probabilistic Localization',
    difficulty: 'Intermediate',
    description: 'Estimates robot position using importance-sampled belief distributions, handling non-Gaussian noise and global localization.',
    milestone: 'Milestone 5',
    path: '/learn/localization',
    paperRef: 'Fox, D., Burgard, W., & Thrun, S. (1999). Monte Carlo localization: Efficient position estimation for mobile robots.',
    keyEquation: 'w_t^{[i]} = p(z_t \\mid x_t^{[i]})',
    tags: ['Probabilistic', 'Bayesian', 'Monte Carlo'],
  },
  {
    id: 'occupancy-grid',
    name: 'Log-Odds Occupancy Grid Mapping',
    category: 'Mapping',
    categorySlug: 'mapping',
    level: 5,
    levelTitle: 'Level 5 — Spatial Mapping Models',
    difficulty: 'Intermediate',
    description: 'Discretizes continuous 2D space into probabilistic cells using numerically stable additive log-odds updates from LiDAR raycasts.',
    milestone: 'Milestone 7',
    path: '/learn/mapping',
    paperRef: 'Moravec, H., & Elfes, A. (1985). High resolution maps from wide angle sonar.',
    keyEquation: 'l_t(m_i) = l_{t-1}(m_i) + \\Delta l_{sensor}',
    tags: ['Grid Mapping', 'Log-Odds', 'Raycasting'],
  },
  {
    id: 'pure-pursuit',
    name: 'Pure Pursuit Controller',
    category: 'Control',
    categorySlug: 'control',
    level: 7,
    levelTitle: 'Level 7 — Trajectory Tracking Control',
    difficulty: 'Beginner',
    description: 'Geometric path tracking algorithm calculating curvature commands to intercept a forward lookahead point on the path.',
    milestone: 'Milestone 6',
    path: '/learn/control',
    paperRef: 'Coulter, R. C. (1992). Implementation of the pure pursuit path tracking algorithm.',
    keyEquation: '\\delta = \\arctan\\left(\\frac{2 L \\sin\\alpha}{L_f}\\right)',
    tags: ['Geometric', 'Trajectory Tracking', 'Kinematic'],
  },
  {
    id: 'stanley',
    name: 'Stanley Steering Controller',
    category: 'Control',
    categorySlug: 'control',
    level: 7,
    levelTitle: 'Level 7 — Trajectory Tracking Control',
    difficulty: 'Intermediate',
    description: 'Non-linear feedback control law eliminating heading error and velocity-scaled lateral cross-track error.',
    milestone: 'Milestone 6',
    path: '/learn/control',
    paperRef: 'Thrun, S. et al. (2006). Stanley: The Robot that Won the DARPA Grand Challenge.',
    keyEquation: '\\delta(t) = \\theta_e(t) + \\arctan\\left(\\frac{k \\cdot e(t)}{v(t)}\\right)',
    tags: ['Non-Linear Feedback', 'Autonomous Vehicles', 'Tracking'],
  },
  {
    id: 'icp',
    name: 'Iterative Closest Point (ICP)',
    category: 'SLAM',
    categorySlug: 'slam',
    level: 8,
    levelTitle: 'Level 8 — SLAM & Spatial Autonomy',
    difficulty: 'Intermediate',
    description: 'Aligns 2D/3D LiDAR point clouds iteratively to estimate relative translation and rotation between consecutive frames.',
    milestone: 'Milestone 7',
    path: '/learn/slam',
    paperRef: 'Besl, P. J., & McKay, N. D. (1992). A method for registration of 3-D shapes.',
    keyEquation: 'E(R, t) = \\sum \\| R p_i + t - q_i \\|^2',
    tags: ['Point Cloud', 'Scan Matching', 'Optimization'],
  },
  {
    id: 'consensus',
    name: 'Graph Laplacian Consensus',
    category: 'Multi-Agent',
    categorySlug: 'multi-agent',
    level: 9,
    levelTitle: 'Level 9 — Multi-Agent & Swarm Intelligence',
    difficulty: 'Advanced',
    description: 'Enables a swarm of decentralized robots to reach global agreement on position, orientation, or geometric formation.',
    milestone: 'Milestone 8',
    path: '/learn/multi-agent',
    paperRef: 'Olfati-Saber, R., & Murray, R. M. (2004). Consensus problems in networks of agents with switching topology.',
    keyEquation: '\\dot{x} = -L x',
    tags: ['Distributed', 'Swarm', 'Graph Theory'],
  },
];
