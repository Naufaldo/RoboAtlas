export interface LessonRegistryItem {
  id: string;
  slug: string;
  domain: string;
  level: number;
  tier: 'Foundations' | 'Core Autonomy' | 'Spatial Intelligence' | 'Advanced Embodiments';
  titleEn: string;
  titleId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  prerequisites: string[];
  platforms: ('manipulator' | 'mobile' | 'aerial' | 'marine' | 'legged')[];
  components: string[];
  interactive: boolean;
  references: string[];
}

export interface DomainRegistryItem {
  id: string;
  slug: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  levelRange: string;
  iconName: string;
  primaryEmbodiment: string;
}

export const DOMAIN_REGISTRY: DomainRegistryItem[] = [
  {
    id: 'fundamentals',
    slug: 'fundamentals',
    titleEn: 'Robotics Fundamentals',
    titleId: 'Fondasi Robotika',
    descriptionEn: 'Cyber-physical systems, Sense-Plan-Act loops, hardware/software anatomy, and robot morphology.',
    descriptionId: 'Sistem siber-fisik, siklus Sense-Plan-Act, anatomi perangkat keras/lunak, dan morfologi robot.',
    levelRange: 'Level 0',
    iconName: 'Compass',
    primaryEmbodiment: 'All Embodiments',
  },
  {
    id: 'mathematics',
    slug: 'mathematics',
    titleEn: 'Mathematical Foundations',
    titleId: 'Fondasi Matematika',
    descriptionEn: 'Scalars, 2D/3D vectors, Pythagorean geometry, unit directions, dot product projections, and matrix algebra.',
    descriptionId: 'Skalar, vektor 2D/3D, geometri Pythagoras, arah satuan, proyeksi perkalian titik, dan aljabar matriks.',
    levelRange: 'Level 1',
    iconName: 'Grid',
    primaryEmbodiment: 'All Embodiments',
  },
  {
    id: 'geometry',
    slug: 'geometry',
    titleEn: 'Geometry & Transformations',
    titleId: 'Geometri & Transformasi',
    descriptionEn: 'Coordinate frames, Homogeneous transforms in SE(2)/SE(3), SO(3) Euler rotations, and unit quaternions.',
    descriptionId: 'Kerangka acuan, transformasi homogen SE(2)/SE(3), rotasi Euler SO(3), dan kuaternion satuan.',
    levelRange: 'Level 2',
    iconName: 'Box',
    primaryEmbodiment: 'Manipulator, Mobile, UAV, Marine',
  },
  {
    id: 'kinematics',
    slug: 'kinematics',
    titleEn: 'Robot Kinematics',
    titleId: 'Kinematika Robot',
    descriptionEn: 'Differential unicycle modeling, Instantaneous Center of Curvature (ICC), and Pfaffian non-holonomic constraints.',
    descriptionId: 'Pemodelan unicycle diferensial, Pusat Kurvatur Seketika (ICC), dan kendala non-holonomik Pfaffian.',
    levelRange: 'Level 3',
    iconName: 'Cpu',
    primaryEmbodiment: 'Mobile & Arms',
  },
  {
    id: 'planning',
    slug: 'planning',
    titleEn: 'Path Planning & Graph Search',
    titleId: 'Perencanaan Jalur & Pencarian Graf',
    descriptionEn: 'Discrete graph search, Dijkstra, A* heuristics, configuration space expansion, and obstacle avoidance.',
    descriptionId: 'Pencarian graf diskrit, Dijkstra, heuristik A*, ekspansi ruang konfigurasi, dan penghindaran rintangan.',
    levelRange: 'Level 6',
    iconName: 'Navigation',
    primaryEmbodiment: 'Mobile, Arms, Aerial',
  },
  {
    id: 'control',
    slug: 'control',
    titleEn: 'Dynamics & Control',
    titleId: 'Dinamika & Kendali',
    descriptionEn: 'Pure Pursuit geometric steering, Stanley cross-track error feedback, PID loops, and trajectory tracking.',
    descriptionId: 'Kemudi geometris Pure Pursuit, umpan balik lateral Stanley, loop PID, dan pelacakan trajektori.',
    levelRange: 'Level 7',
    iconName: 'Activity',
    primaryEmbodiment: 'Mobile, Aerial, Legged',
  },
  {
    id: 'estimation',
    slug: 'estimation',
    titleEn: 'State Estimation & Localization',
    titleId: 'Estimasi Status & Lokalisasi',
    descriptionEn: 'Recursive Bayesian filtering, Monte Carlo Localization (MCL) Particle Filters, and sensor fusion.',
    descriptionId: 'Filter Bayesian rekursif, Filter Partikel Monte Carlo Localization (MCL), dan fusi sensor.',
    levelRange: 'Level 8',
    iconName: 'MapPin',
    primaryEmbodiment: 'Mobile, Marine, Aerial',
  },
  {
    id: 'perception',
    slug: 'perception',
    titleEn: 'Sensors & Perception',
    titleId: 'Sensor & Persepsi',
    descriptionEn: '360° LiDAR raycasting, Gaussian measurement noise models, and Log-Odds Bayesian Occupancy Grid Mapping.',
    descriptionId: 'Raycasting LiDAR 360°, model derau Gaussian, dan Pemetaan Grid Okupansi Log-Odds Bayesian.',
    levelRange: 'Level 9',
    iconName: 'Layers',
    primaryEmbodiment: 'Mobile & Aerial',
  },
  {
    id: 'advanced',
    slug: 'advanced',
    titleEn: 'Advanced Systems & Swarm Intelligence',
    titleId: 'Sistem Lanjutan & Kecerdasan Kawanan',
    descriptionEn: 'Iterative Closest Point (ICP) SLAM, Graph Laplacian consensus dynamics, and decentralized multi-agent swarms.',
    descriptionId: 'SLAM Iterative Closest Point (ICP), dinamika konsensus Graf Laplacian, dan kawanan multi-agent.',
    levelRange: 'Levels 10 & 18',
    iconName: 'Users',
    primaryEmbodiment: 'Swarms & Frontier Robots',
  },
];

export const LESSON_REGISTRY: LessonRegistryItem[] = [
  {
    id: 'intro-to-robotics',
    slug: 'intro-to-robotics',
    domain: 'fundamentals',
    level: 0,
    tier: 'Foundations',
    titleEn: 'Introduction to Autonomous Robotics & Classifications',
    titleId: 'Pengantar Robotika Otonom & Klasifikasinya',
    difficulty: 'Beginner',
    estimatedMinutes: 30,
    prerequisites: [],
    platforms: ['mobile', 'manipulator', 'aerial', 'marine', 'legged'],
    components: ['SensePlanActExplorer', 'RobotClassificationExplorer', 'ConceptCheck'],
    interactive: true,
    references: ['Elements of Robotics (Ben-Ari & Mondada)', 'Foundations of Robotics (Herath & St-Onge)'],
  },
  {
    id: 'mathematical-foundations',
    slug: 'mathematical-foundations',
    domain: 'mathematics',
    level: 1,
    tier: 'Foundations',
    titleEn: 'Mathematical & Geometric Foundations for Robotics',
    titleId: 'Fundamental Matematika & Geometri untuk Robotika',
    difficulty: 'Beginner',
    estimatedMinutes: 45,
    prerequisites: ['intro-to-robotics'],
    platforms: ['manipulator', 'mobile', 'aerial', 'marine', 'legged'],
    components: ['CoordinateFrameExplorer', 'VectorVisualizer', 'DotProductExplorer', 'ConceptCheck'],
    interactive: true,
    references: ['Elements of Robotics', 'Foundations of Robotics', 'Planning Algorithms'],
  },
  {
    id: '2d-geometry',
    slug: '2d-geometry',
    domain: 'geometry',
    level: 2,
    tier: 'Foundations',
    titleEn: '2D Planar Geometry & Homogeneous Transforms SE(2)',
    titleId: 'Geometri Planar 2D & Transformasi Homogen SE(2)',
    difficulty: 'Beginner',
    estimatedMinutes: 35,
    prerequisites: ['mathematical-foundations'],
    platforms: ['mobile', 'manipulator'],
    components: ['TransformSandbox', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Foundations of Robotics (Chapter 2)'],
  },
  {
    id: '3d-geometry',
    slug: '3d-geometry',
    domain: 'geometry',
    level: 2,
    tier: 'Foundations',
    titleEn: '3D Spatial Geometry, Euler Angles & SO(3) Rotations',
    titleId: 'Geometri Spasial 3D, Sudut Euler & Rotasi SO(3)',
    difficulty: 'Intermediate',
    estimatedMinutes: 40,
    prerequisites: ['2d-geometry'],
    platforms: ['manipulator', 'aerial', 'marine', 'legged'],
    components: ['SpatialRotation3D', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Foundations of Robotics (Chapter 3)'],
  },
  {
    id: 'velocity-kinematics-2d',
    slug: 'velocity-kinematics-2d',
    domain: 'kinematics',
    level: 3,
    tier: 'Foundations',
    titleEn: '2D Velocity Kinematics & Differential Drive Unicycle',
    titleId: 'Kinematika Kecepatan 2D & Unicycle Roda Diferensial',
    difficulty: 'Intermediate',
    estimatedMinutes: 45,
    prerequisites: ['2d-geometry'],
    platforms: ['mobile'],
    components: ['KinematicsSimulator', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Elements of Robotics (Chapter 5)'],
  },
  {
    id: 'a-star',
    slug: 'a-star',
    domain: 'planning',
    level: 6,
    tier: 'Core Autonomy',
    titleEn: 'A* Grid Search & Admissible Heuristics',
    titleId: 'Pencarian Grid A* & Heuristik Admisibel',
    difficulty: 'Intermediate',
    estimatedMinutes: 45,
    prerequisites: ['velocity-kinematics-2d'],
    platforms: ['mobile', 'manipulator'],
    components: ['PathPlanningSimulator', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Planning Algorithms (LaValle, Chapter 2)'],
  },
  {
    id: 'pure-pursuit-and-stanley',
    slug: 'pure-pursuit-and-stanley',
    domain: 'control',
    level: 7,
    tier: 'Core Autonomy',
    titleEn: 'Pure Pursuit & Stanley Trajectory Tracking Control',
    titleId: 'Kendali Pelacakan Trajektori Pure Pursuit & Stanley',
    difficulty: 'Intermediate',
    estimatedMinutes: 45,
    prerequisites: ['velocity-kinematics-2d', 'a-star'],
    platforms: ['mobile', 'aerial'],
    components: ['ControlSimulator', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Foundations of Robotics (Chapter 6)'],
  },
  {
    id: 'mcl-particle-filter',
    slug: 'mcl-particle-filter',
    domain: 'estimation',
    level: 8,
    tier: 'Core Autonomy',
    titleEn: 'Monte Carlo Localization (MCL) Particle Filters',
    titleId: 'Filter Partikel Monte Carlo Localization (MCL)',
    difficulty: 'Intermediate',
    estimatedMinutes: 45,
    prerequisites: ['mathematical-foundations', 'velocity-kinematics-2d'],
    platforms: ['mobile', 'marine', 'aerial'],
    components: ['LocalizationSimulator', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Probabilistic Robotics (Thrun et al., Chapter 8)'],
  },
  {
    id: 'occupancy-grid-mapping',
    slug: 'occupancy-grid-mapping',
    domain: 'perception',
    level: 9,
    tier: 'Spatial Intelligence',
    titleEn: 'Log-Odds Bayesian Occupancy Grid Mapping',
    titleId: 'Pemetaan Grid Okupansi Log-Odds Bayesian',
    difficulty: 'Intermediate',
    estimatedMinutes: 40,
    prerequisites: ['mathematical-foundations', 'velocity-kinematics-2d'],
    platforms: ['mobile', 'aerial'],
    components: ['MappingSimulator', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Probabilistic Robotics (Thrun et al., Chapter 9)'],
  },
  {
    id: 'icp-scan-matching',
    slug: 'icp-scan-matching',
    domain: 'advanced',
    level: 10,
    tier: 'Spatial Intelligence',
    titleEn: 'Iterative Closest Point (ICP) Scan Matching in SLAM',
    titleId: 'Pencocokan Pindaian ICP dalam SLAM',
    difficulty: 'Advanced',
    estimatedMinutes: 45,
    prerequisites: ['2d-geometry', 'mathematical-foundations'],
    platforms: ['mobile', 'marine'],
    components: ['SlamSimulator', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['A Method for Registration of 3-D Shapes (Besl & McKay)'],
  },
  {
    id: 'laplacian-consensus',
    slug: 'laplacian-consensus',
    domain: 'advanced',
    level: 18,
    tier: 'Advanced Embodiments',
    titleEn: 'Graph Laplacian Consensus & Swarm Coordination',
    titleId: 'Konsensus Graf Laplacian & Koordinasi Kawanan',
    difficulty: 'Advanced',
    estimatedMinutes: 45,
    prerequisites: ['mathematical-foundations', 'velocity-kinematics-2d'],
    platforms: ['aerial', 'mobile'],
    components: ['MultiAgentSimulator', 'FormulaExplainer', 'ConceptCheck'],
    interactive: true,
    references: ['Consensus Problems in Networks of Agents (Olfati-Saber)'],
  },
];

export function getLessonById(id: string): LessonRegistryItem | undefined {
  return LESSON_REGISTRY.find((l) => l.id === id);
}

export function getLessonsByDomain(domain: string): LessonRegistryItem[] {
  return LESSON_REGISTRY.filter((l) => l.domain === domain);
}

export function getLessonsByLevel(level: number): LessonRegistryItem[] {
  return LESSON_REGISTRY.filter((l) => l.level === level);
}

export function getLessonsByPlatform(platform: 'manipulator' | 'mobile' | 'aerial' | 'marine' | 'legged'): LessonRegistryItem[] {
  return LESSON_REGISTRY.filter((l) => l.platforms.includes(platform));
}
