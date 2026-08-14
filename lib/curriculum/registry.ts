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
    titleEn: 'Robotics Foundations & Mathematics',
    titleId: 'Fondasi Robotika & Matematika',
    descriptionEn: 'Cyber-physical architectures, 2D/3D coordinate transformations SE(2)/SE(3), spatial geometry, and velocity kinematics.',
    descriptionId: 'Arsitektur siber-fisik, transformasi koordinat 2D/3D SE(2)/SE(3), geometri spasial, dan kinematika kecepatan.',
    levelRange: 'Levels 0 – 4',
    iconName: 'Compass',
    primaryEmbodiment: 'All Embodiments',
  },
  {
    id: 'planning',
    slug: 'planning',
    titleEn: 'Path Planning & Graph Search',
    titleId: 'Perencanaan Jalur & Pencarian Graf',
    descriptionEn: 'Discrete graph search, Dijkstra, A* heuristics, configuration space expansion, and obstacle collision checking.',
    descriptionId: 'Pencarian graf diskrit, Dijkstra, heuristik A*, ekspansi ruang konfigurasi, dan pemeriksaan tabrakan rintangan.',
    levelRange: 'Level 6',
    iconName: 'Navigation',
    primaryEmbodiment: 'Mobile & Arms',
  },
  {
    id: 'control',
    slug: 'control',
    titleEn: 'Feedback Dynamics & Trajectory Control',
    titleId: 'Dinamika Umpan Balik & Kendali Trajektori',
    descriptionEn: 'Non-linear feedback control, geometric Pure Pursuit, and Stanley cross-track steering controllers.',
    descriptionId: 'Kendali umpan balik non-linier, kemudi geometris Pure Pursuit, dan kontroler lateral Stanley.',
    levelRange: 'Level 7',
    iconName: 'Cpu',
    primaryEmbodiment: 'Mobile, Aerial, Legged',
  },
  {
    id: 'localization',
    slug: 'localization',
    titleEn: 'State Estimation & Localization',
    titleId: 'Estimasi Status & Lokalisasi',
    descriptionEn: 'Recursive Bayesian filtering, Monte Carlo Localization (MCL) Particle Filters, and sensor fusion.',
    descriptionId: 'Filter Bayesian rekursif, Filter Partikel Monte Carlo Localization (MCL), dan fusi sensor.',
    levelRange: 'Level 8',
    iconName: 'MapPin',
    primaryEmbodiment: 'Mobile, Marine, Aerial',
  },
  {
    id: 'mapping',
    slug: 'mapping',
    titleEn: 'Sensors & Spatial Occupancy Mapping',
    titleId: 'Sensor & Pemetaan Okupansi Spasial',
    descriptionEn: '360° LiDAR raycasting, Gaussian noise models, and Log-Odds Bayesian Occupancy Grid Mapping.',
    descriptionId: 'Raycasting LiDAR 360°, model derau Gaussian, dan Pemetaan Grid Okupansi Log-Odds Bayesian.',
    levelRange: 'Levels 5 & 9',
    iconName: 'Layers',
    primaryEmbodiment: 'Mobile & Aerial',
  },
  {
    id: 'slam',
    slug: 'slam',
    titleEn: 'Simultaneous Localization & Mapping (SLAM)',
    titleId: 'Lokalisasi & Pemetaan Simultan (SLAM)',
    descriptionEn: 'Iterative Closest Point (ICP) scan matching, closed-form SVD rotation, and spatial loop closure.',
    descriptionId: 'Pencocokan pindaian Iterative Closest Point (ICP), rotasi analitik SVD, dan loop closure spasial.',
    levelRange: 'Level 10',
    iconName: 'RotateCcw',
    primaryEmbodiment: 'Mobile & Subsea',
  },
  {
    id: 'multi-agent',
    slug: 'multi-agent',
    titleEn: 'Multi-Agent Robotics & Swarm Intelligence',
    titleId: 'Robotika Multi-Agent & Kecerdasan Kawanan',
    descriptionEn: 'Decentralized communication graph topologies, Graph Laplacian consensus dynamics, and flocking.',
    descriptionId: 'Topologi graf komunikasi terdesentralisasi, dinamika konsensus Graph Laplacian, dan kawanan.',
    levelRange: 'Level 18',
    iconName: 'Users',
    primaryEmbodiment: 'Drone & Rover Swarms',
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
    domain: 'fundamentals',
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
    domain: 'fundamentals',
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
    domain: 'fundamentals',
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
    domain: 'fundamentals',
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
    domain: 'localization',
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
    domain: 'mapping',
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
    domain: 'slam',
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
    domain: 'multi-agent',
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
