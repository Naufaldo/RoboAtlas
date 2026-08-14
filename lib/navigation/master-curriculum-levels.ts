export interface CurriculumLevel {
  level: number;
  id: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  badge: string;
  estimatedHours: number;
  prerequisites: string[];
  modules: {
    id: string;
    titleEn: string;
    titleId: string;
    topicsCount: number;
    href: string;
    isInteractive: boolean;
  }[];
}

export const MASTER_CURRICULUM_LEVELS: CurriculumLevel[] = [
  {
    level: 0,
    id: 'orientation',
    titleEn: 'Level 0 — Robotics Orientation',
    titleId: 'Level 0 — Orientasi Robotika',
    descriptionEn: 'Introduction to cyber-physical autonomy, Sense-Plan-Act loops, hardware/software anatomy, and robot taxonomy.',
    descriptionId: 'Pengantar sistem siber-fisik otonom, siklus Sense-Plan-Act, anatomi perangkat keras/lunak, dan klasifikasi robot.',
    badge: 'Beginner Friendly',
    estimatedHours: 2,
    prerequisites: ['None'],
    modules: [
      {
        id: 'intro',
        titleEn: 'Introduction to Autonomous Robotics & Classifications',
        titleId: 'Pengantar Robotika Otonom & Klasifikasinya',
        topicsCount: 8,
        href: '/learn/fundamentals',
        isInteractive: true,
      },
    ],
  },
  {
    level: 1,
    id: 'mathematics',
    titleEn: 'Level 1 — Mathematical Foundations',
    titleId: 'Level 1 — Fondasi Matematika',
    descriptionEn: 'Vectors, Matrices in SE(2)/SE(3), Euler Angles, Quaternions, Probability Distributions, and Least Squares Optimization.',
    descriptionId: 'Vektor, Matriks SE(2)/SE(3), Sudut Euler, Kuaternion, Distribusi Probabilitas, dan Optimasi Kuadrat Terkecil.',
    badge: 'Core Prerequisite',
    estimatedHours: 6,
    prerequisites: ['Level 0'],
    modules: [
      {
        id: 'geometry-2d',
        titleEn: '2D Planar Geometry & Homogeneous Transforms SE(2)',
        titleId: 'Geometri Planar 2D & Transformasi Homogen SE(2)',
        topicsCount: 6,
        href: '/learn/fundamentals',
        isInteractive: true,
      },
      {
        id: 'geometry-3d',
        titleEn: '3D Spatial Geometry, Euler Angles & SO(3)',
        titleId: 'Geometri Spasial 3D, Sudut Euler & SO(3)',
        topicsCount: 6,
        href: '/learn/fundamentals',
        isInteractive: true,
      },
      {
        id: 'matrix-foundations',
        titleEn: 'Matrix Foundations, Covariance & SVD Decomposition',
        titleId: 'Fondasi Matriks, Kovarians & Dekomposisi SVD',
        topicsCount: 5,
        href: '/learn/fundamentals',
        isInteractive: true,
      },
    ],
  },
  {
    level: 2,
    id: 'computation',
    titleEn: 'Level 2 — Computational Foundations & Graph Theory',
    titleId: 'Level 2 — Fondasi Komputasi & Teori Graf',
    descriptionEn: 'Numerical floating-point errors, simulation integration timesteps, graph structures, and priority queues.',
    descriptionId: 'Galat floating-point numerik, langkah waktu integrasi simulasi, struktur graf, dan antrean prioritas.',
    badge: 'Algorithms',
    estimatedHours: 4,
    prerequisites: ['Level 1'],
    modules: [
      {
        id: 'graphs',
        titleEn: 'Graph Search & Priority Queue Mechanics',
        titleId: 'Pencarian Graf & Mekanisme Antrean Prioritas',
        topicsCount: 5,
        href: '/learn/planning',
        isInteractive: true,
      },
    ],
  },
  {
    level: 3,
    id: 'kinematics',
    titleEn: 'Level 3 — Robot Kinematics & Velocity Modeling',
    titleId: 'Level 3 — Kinematika Robot & Pemodelan Kecepatan',
    descriptionEn: 'Differential-drive unicycle kinematics, Instantaneous Center of Curvature (ICC), non-holonomic constraints, and Geometric Jacobians.',
    descriptionId: 'Kinematika unicycle roda diferensial, Pusat Kurvatur Seketika (ICC), kendala non-holonomik, dan Jacobian Geometris.',
    badge: 'Mechanical Modeling',
    estimatedHours: 5,
    prerequisites: ['Level 1', 'Level 2'],
    modules: [
      {
        id: 'vel-kin-2d',
        titleEn: 'Velocity Kinematics in 2D & Unicycle Models',
        titleId: 'Kinematika Kecepatan 2D & Model Unicycle',
        topicsCount: 6,
        href: '/learn/fundamentals',
        isInteractive: true,
      },
      {
        id: 'vel-kin-3d',
        titleEn: 'Velocity Kinematics in 3D & Geometric Jacobians',
        titleId: 'Kinematika Kecepatan 3D & Jacobian Geometris',
        topicsCount: 5,
        href: '/learn/fundamentals',
        isInteractive: true,
      },
    ],
  },
  {
    level: 4,
    id: 'perception',
    titleEn: 'Level 4 — Sensing, Perception & Rangefinding',
    titleId: 'Level 4 — Penginderaan, Persepsi & Pengukuran Jarak',
    descriptionEn: 'Wheel encoders, Inertial Measurement Units (IMU), 2D/3D LiDAR raycasting, and depth camera point clouds.',
    descriptionId: 'Enkoder roda, Unit Pengukuran Inersia (IMU), raycasting LiDAR 2D/3D, dan awan titik kamera kedalaman.',
    badge: 'Hardware Sensor Fusion',
    estimatedHours: 4,
    prerequisites: ['Level 1'],
    modules: [
      {
        id: 'raycast-lidar',
        titleEn: 'LiDAR Raycasting & Sensor Noise Models',
        titleId: 'Raycasting LiDAR & Model Derau Sensor',
        topicsCount: 4,
        href: '/learn/mapping',
        isInteractive: true,
      },
    ],
  },
  {
    level: 5,
    id: 'localization-mapping',
    titleEn: 'Level 5 — Probabilistic Localization & Occupancy Mapping',
    titleId: 'Level 5 — Lokalisasi Probabilistik & Pemetaan Okupansi',
    descriptionEn: 'Recursive Bayesian Filtering, Monte Carlo Particle Filters (MCL), and Log-Odds Bayesian Occupancy Grid Mapping.',
    descriptionId: 'Filter Bayesian Rekursif, Filter Partikel Monte Carlo (MCL), dan Pemetaan Grid Okupansi Log-Odds.',
    badge: 'Probabilistic Robotics',
    estimatedHours: 6,
    prerequisites: ['Level 3', 'Level 4'],
    modules: [
      {
        id: 'mcl-filter',
        titleEn: 'Monte Carlo Localization (MCL) Particle Filters',
        titleId: 'Filter Partikel Monte Carlo Localization (MCL)',
        topicsCount: 5,
        href: '/learn/localization',
        isInteractive: true,
      },
      {
        id: 'occupancy-grid',
        titleEn: 'Bayesian Log-Odds Occupancy Grid Mapping',
        titleId: 'Pemetaan Grid Okupansi Log-Odds Bayesian',
        topicsCount: 4,
        href: '/learn/mapping',
        isInteractive: true,
      },
    ],
  },
  {
    level: 6,
    id: 'planning-navigation',
    titleEn: 'Level 6 — Path Planning & Trajectory Generation',
    titleId: 'Level 6 — Perencanaan Jalur & Pembuatan Trajektori',
    descriptionEn: 'Dijkstra, A* Heuristic Search, Octile/Euclidean distances, C-Space expansion, and Quintic Polynomial Splines.',
    descriptionId: 'Dijkstra, Pencarian Heuristik A*, Jarak Octile/Euclidean, Ekspansi C-Space, dan Spline Polinomial Kuintik.',
    badge: 'Navigation Engine',
    estimatedHours: 6,
    prerequisites: ['Level 2', 'Level 5'],
    modules: [
      {
        id: 'a-star-planning',
        titleEn: 'A* Grid Path Planning & Admissible Heuristics',
        titleId: 'Perencanaan Jalur Grid A* & Heuristik Admisibel',
        topicsCount: 6,
        href: '/learn/planning',
        isInteractive: true,
      },
    ],
  },
  {
    level: 7,
    id: 'control-dynamics',
    titleEn: 'Level 7 — Trajectory Tracking Control & Dynamic Feedback',
    titleId: 'Level 7 — Kendali Pelacakan Trajektori & Umpan Balik Dinamis',
    descriptionEn: 'Geometric Pure Pursuit steering, Stanley non-linear cross-track error feedback, and Newton-Euler/Euler-Lagrange dynamics.',
    descriptionId: 'Kemudi geometris Pure Pursuit, umpan balik kesalahan lateral Stanley, dan dinamika Newton-Euler/Euler-Lagrange.',
    badge: 'Motion Control',
    estimatedHours: 5,
    prerequisites: ['Level 3', 'Level 6'],
    modules: [
      {
        id: 'pure-pursuit-stanley',
        titleEn: 'Pure Pursuit & Stanley Steering Controllers',
        titleId: 'Kontroler Kemudi Pure Pursuit & Stanley',
        topicsCount: 5,
        href: '/learn/control',
        isInteractive: true,
      },
      {
        id: 'robot-dynamics',
        titleEn: 'Newton-Euler & Euler-Lagrange Robot Dynamics',
        titleId: 'Dinamika Robot Newton-Euler & Euler-Lagrange',
        topicsCount: 5,
        href: '/learn/fundamentals',
        isInteractive: true,
      },
    ],
  },
  {
    level: 8,
    id: 'slam',
    titleEn: 'Level 8 — Simultaneous Localization & Mapping (SLAM)',
    titleId: 'Level 8 — Lokalisasi & Pemetaan Simultan (SLAM)',
    descriptionEn: 'Solving the chicken-and-egg spatial dilemma, Iterative Closest Point (ICP) scan matching, SVD alignment, and loop closure.',
    descriptionId: 'Menyelesaikan dilema spasial ayam-dan-telur, pencocokan scan Iterative Closest Point (ICP), perataan SVD, dan loop closure.',
    badge: 'Full Spatial Autonomy',
    estimatedHours: 7,
    prerequisites: ['Level 5', 'Level 7'],
    modules: [
      {
        id: 'icp-slam',
        titleEn: 'Iterative Closest Point (ICP) Scan Matching',
        titleId: 'Pencocokan Pindaian Iterative Closest Point (ICP)',
        topicsCount: 5,
        href: '/learn/slam',
        isInteractive: true,
      },
    ],
  },
  {
    level: 9,
    id: 'multi-agent',
    titleEn: 'Level 9 — Multi-Agent Robotics & Swarm Intelligence',
    titleId: 'Level 9 — Robotika Multi-Agent & Kecerdasan Kawanan',
    descriptionEn: 'Decentralized communication graph topologies, Graph Laplacian consensus dynamics, and leader-follower flocking formations.',
    descriptionId: 'Topologi graf komunikasi terdesentralisasi, dinamika konsensus Graph Laplacian, dan formasi kawanan leader-follower.',
    badge: 'Swarm Coordination',
    estimatedHours: 5,
    prerequisites: ['Level 1', 'Level 7'],
    modules: [
      {
        id: 'laplacian-consensus',
        titleEn: 'Graph Laplacian Consensus & Swarm Coordination',
        titleId: 'Konsensus Graf Laplacian & Koordinasi Kawanan',
        topicsCount: 5,
        href: '/learn/multi-agent',
        isInteractive: true,
      },
    ],
  },
];
