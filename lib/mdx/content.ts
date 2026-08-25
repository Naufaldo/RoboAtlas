import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LessonFrontmatter {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'en' | 'id';
  interactive: boolean;
  estimatedMinutes: number;
  prerequisites?: string[];
  references?: string[];
  components?: string[];
}

export interface LessonContent {
  frontmatter: LessonFrontmatter;
  content: string;
}

const CONTENT_ROOT = path.resolve(process.cwd(), 'content');

// Canonical pre-registered lesson index mapping language/category/slug to relative path
const LESSON_INDEX: Record<string, string> = {
  // English Lessons
  'en/fundamentals/intro-to-robotics': 'en/fundamentals/intro-to-robotics.mdx',
  'en/fundamentals/aerial-drone-principles': 'en/fundamentals/aerial-drone-principles.mdx',
  'en/fundamentals/marine-robotics-fundamentals': 'en/fundamentals/marine-robotics-fundamentals.mdx',
  'en/fundamentals/legged-robotics-fundamentals': 'en/fundamentals/legged-robotics-fundamentals.mdx',
  'en/mathematics/mathematical-foundations': 'en/mathematics/mathematical-foundations.mdx',
  'en/mathematics/vectors-and-coordinate-geometry': 'en/mathematics/vectors-and-coordinate-geometry.mdx',
  'en/mathematics/dot-product-and-projection': 'en/mathematics/dot-product-and-projection.mdx',
  'en/mathematics/probability-for-robotics': 'en/mathematics/probability-for-robotics.mdx',
  'en/geometry/2d-geometry': 'en/geometry/2d-geometry.mdx',
  'en/geometry/lie-groups-and-lie-algebras': 'en/geometry/lie-groups-and-lie-algebras.mdx',
  'en/geometry/3d-geometry': 'en/geometry/3d-geometry.mdx',
  'en/geometry/2d-rotation-matrices': 'en/geometry/2d-rotation-matrices.mdx',
  'en/geometry/coordinate-frames-and-transforms': 'en/geometry/coordinate-frames-and-transforms.mdx',
  'en/geometry/transform-composition-and-chains': 'en/geometry/transform-composition-and-chains.mdx',
  'en/geometry/configuration-space-and-minkowski': 'en/geometry/configuration-space-and-minkowski.mdx',
  'en/kinematics/velocity-kinematics-2d': 'en/kinematics/velocity-kinematics-2d.mdx',
  'en/kinematics/differential-drive-kinematics': 'en/kinematics/differential-drive-kinematics.mdx',
  'en/kinematics/non-holonomic-constraints': 'en/kinematics/non-holonomic-constraints.mdx',
  'en/sensors/sensor-fundamentals': 'en/sensors/sensor-fundamentals.mdx',
  'en/sensors/sensor-noise-and-uncertainty': 'en/sensors/sensor-noise-and-uncertainty.mdx',
  'en/sensors/lidar-raycasting': 'en/sensors/lidar-raycasting.mdx',
  'en/sensors/wheel-odometry-and-drift': 'en/sensors/wheel-odometry-and-drift.mdx',
  'en/planning/a-star': 'en/planning/a-star.mdx',
  'en/planning/astar-vs-dijkstra-search': 'en/planning/astar-vs-dijkstra-search.mdx',
  'en/planning/rrt-and-rrt-star': 'en/planning/rrt-and-rrt-star.mdx',
  'en/planning/rrt-sampling-planner': 'en/planning/rrt-sampling-planner.mdx',
  'en/planning/autonomous-exploration-lags': 'en/planning/autonomous-exploration-lags.mdx',
  'en/planning/3d-frontier-exploration-mav': 'en/planning/3d-frontier-exploration-mav.mdx',
  'en/control/path-tracking-error-geometry': 'en/control/path-tracking-error-geometry.mdx',
  'en/control/pure-pursuit-path-tracking': 'en/control/pure-pursuit-path-tracking.mdx',
  'en/control/pure-pursuit-and-stanley': 'en/control/pure-pursuit-and-stanley.mdx',
  'en/control/pid-and-lqr-control': 'en/control/pid-and-lqr-control.mdx',
  'en/control/state-space-and-feedback': 'en/control/state-space-and-feedback.mdx',
  'en/control/discrete-time-simulation': 'en/control/discrete-time-simulation.mdx',
  'en/estimation/localization-fundamentals': 'en/estimation/localization-fundamentals.mdx',
  'en/estimation/ekf-localization': 'en/estimation/ekf-localization.mdx',
  'en/estimation/histogram-filter-localization': 'en/estimation/histogram-filter-localization.mdx',
  'en/estimation/bayes-filter-and-kalman': 'en/estimation/bayes-filter-and-kalman.mdx',
  'en/estimation/mcl-particle-filter': 'en/estimation/mcl-particle-filter.mdx',
  'en/perception/occupancy-grid-mapping': 'en/perception/occupancy-grid-mapping.mdx',
  'en/perception/gaussian-grid-map': 'en/perception/gaussian-grid-map.mdx',
  'en/perception/raycasting-grid-map': 'en/perception/raycasting-grid-map.mdx',
  'en/perception/lidar-to-grid-map': 'en/perception/lidar-to-grid-map.mdx',
  'en/perception/kmeans-object-clustering': 'en/perception/kmeans-object-clustering.mdx',
  'en/perception/rectangle-fitting': 'en/perception/rectangle-fitting.mdx',
  'en/manipulation/2dof-forward-kinematics': 'en/manipulation/2dof-forward-kinematics.mdx',
  'en/manipulation/2dof-inverse-kinematics': 'en/manipulation/2dof-inverse-kinematics.mdx',
  'en/manipulation/jacobian-and-singularity': 'en/manipulation/jacobian-and-singularity.mdx',
  'en/manipulation/forward-inverse-kinematics': 'en/manipulation/forward-inverse-kinematics.mdx',
  'en/advanced/icp-scan-matching': 'en/advanced/icp-scan-matching.mdx',
  'en/advanced/slam-fundamentals': 'en/advanced/slam-fundamentals.mdx',
  'en/advanced/fastslam-1': 'en/advanced/fastslam-1.mdx',
  'en/advanced/2d-lidar-slam': 'en/advanced/2d-lidar-slam.mdx',
  'en/advanced/3d-lidar-and-vslam': 'en/advanced/3d-lidar-and-vslam.mdx',
  'en/advanced/factor-graph-optimization': 'en/advanced/factor-graph-optimization.mdx',
  'en/advanced/3d-gaussian-splatting-slam': 'en/advanced/3d-gaussian-splatting-slam.mdx',
  'en/advanced/sim-to-real-and-domain-randomization': 'en/advanced/sim-to-real-and-domain-randomization.mdx',
  'en/advanced/vla-and-diffusion-policies': 'en/advanced/vla-and-diffusion-policies.mdx',
  'en/advanced/laplacian-consensus': 'en/advanced/laplacian-consensus.mdx',

  // Indonesian Lessons
  'id/fundamentals/intro-to-robotics': 'id/fundamentals/intro-to-robotics.mdx',
  'id/fundamentals/aerial-drone-principles': 'id/fundamentals/aerial-drone-principles.mdx',
  'id/fundamentals/marine-robotics-fundamentals': 'id/fundamentals/marine-robotics-fundamentals.mdx',
  'id/fundamentals/legged-robotics-fundamentals': 'id/fundamentals/legged-robotics-fundamentals.mdx',
  'id/mathematics/mathematical-foundations': 'id/mathematics/mathematical-foundations.mdx',
  'id/mathematics/vectors-and-coordinate-geometry': 'id/mathematics/vectors-and-coordinate-geometry.mdx',
  'id/mathematics/dot-product-and-projection': 'id/mathematics/dot-product-and-projection.mdx',
  'id/mathematics/probability-for-robotics': 'id/mathematics/probability-for-robotics.mdx',
  'id/geometry/2d-geometry': 'id/geometry/2d-geometry.mdx',
  'id/geometry/lie-groups-and-lie-algebras': 'id/geometry/lie-groups-and-lie-algebras.mdx',
  'id/geometry/3d-geometry': 'id/geometry/3d-geometry.mdx',
  'id/geometry/2d-rotation-matrices': 'id/geometry/2d-rotation-matrices.mdx',
  'id/geometry/coordinate-frames-and-transforms': 'id/geometry/coordinate-frames-and-transforms.mdx',
  'id/geometry/transform-composition-and-chains': 'id/geometry/transform-composition-and-chains.mdx',
  'id/geometry/configuration-space-and-minkowski': 'id/geometry/configuration-space-and-minkowski.mdx',
  'id/kinematics/velocity-kinematics-2d': 'id/kinematics/velocity-kinematics-2d.mdx',
  'id/kinematics/differential-drive-kinematics': 'id/kinematics/differential-drive-kinematics.mdx',
  'id/kinematics/non-holonomic-constraints': 'id/kinematics/non-holonomic-constraints.mdx',
  'id/sensors/sensor-fundamentals': 'id/sensors/sensor-fundamentals.mdx',
  'id/sensors/sensor-noise-and-uncertainty': 'id/sensors/sensor-noise-and-uncertainty.mdx',
  'id/sensors/lidar-raycasting': 'id/sensors/lidar-raycasting.mdx',
  'id/sensors/wheel-odometry-and-drift': 'id/sensors/wheel-odometry-and-drift.mdx',
  'id/planning/a-star': 'id/planning/a-star.mdx',
  'id/planning/astar-vs-dijkstra-search': 'id/planning/astar-vs-dijkstra-search.mdx',
  'id/planning/rrt-and-rrt-star': 'id/planning/rrt-and-rrt-star.mdx',
  'id/planning/rrt-sampling-planner': 'id/planning/rrt-sampling-planner.mdx',
  'id/planning/autonomous-exploration-lags': 'id/planning/autonomous-exploration-lags.mdx',
  'id/planning/3d-frontier-exploration-mav': 'id/planning/3d-frontier-exploration-mav.mdx',
  'id/control/path-tracking-error-geometry': 'id/control/path-tracking-error-geometry.mdx',
  'id/control/pure-pursuit-path-tracking': 'id/control/pure-pursuit-path-tracking.mdx',
  'id/control/pure-pursuit-and-stanley': 'id/control/pure-pursuit-and-stanley.mdx',
  'id/control/pid-and-lqr-control': 'id/control/pid-and-lqr-control.mdx',
  'id/control/state-space-and-feedback': 'id/control/state-space-and-feedback.mdx',
  'id/control/discrete-time-simulation': 'id/control/discrete-time-simulation.mdx',
  'id/estimation/localization-fundamentals': 'id/estimation/localization-fundamentals.mdx',
  'id/estimation/ekf-localization': 'id/estimation/ekf-localization.mdx',
  'id/estimation/histogram-filter-localization': 'id/estimation/histogram-filter-localization.mdx',
  'id/estimation/bayes-filter-and-kalman': 'id/estimation/bayes-filter-and-kalman.mdx',
  'id/estimation/mcl-particle-filter': 'id/estimation/mcl-particle-filter.mdx',
  'id/perception/occupancy-grid-mapping': 'id/perception/occupancy-grid-mapping.mdx',
  'id/perception/gaussian-grid-map': 'id/perception/gaussian-grid-map.mdx',
  'id/perception/raycasting-grid-map': 'id/perception/raycasting-grid-map.mdx',
  'id/perception/lidar-to-grid-map': 'id/perception/lidar-to-grid-map.mdx',
  'id/perception/kmeans-object-clustering': 'id/perception/kmeans-object-clustering.mdx',
  'id/perception/rectangle-fitting': 'id/perception/rectangle-fitting.mdx',
  'id/manipulation/2dof-forward-kinematics': 'id/manipulation/2dof-forward-kinematics.mdx',
  'id/manipulation/2dof-inverse-kinematics': 'id/manipulation/2dof-inverse-kinematics.mdx',
  'id/manipulation/jacobian-and-singularity': 'id/manipulation/jacobian-and-singularity.mdx',
  'id/manipulation/forward-inverse-kinematics': 'id/manipulation/forward-inverse-kinematics.mdx',
  'id/advanced/icp-scan-matching': 'id/advanced/icp-scan-matching.mdx',
  'id/advanced/slam-fundamentals': 'id/advanced/slam-fundamentals.mdx',
  'id/advanced/fastslam-1': 'id/advanced/fastslam-1.mdx',
  'id/advanced/2d-lidar-slam': 'id/advanced/2d-lidar-slam.mdx',
  'id/advanced/3d-lidar-and-vslam': 'id/advanced/3d-lidar-and-vslam.mdx',
  'id/advanced/factor-graph-optimization': 'id/advanced/factor-graph-optimization.mdx',
  'id/advanced/3d-gaussian-splatting-slam': 'id/advanced/3d-gaussian-splatting-slam.mdx',
  'id/advanced/sim-to-real-and-domain-randomization': 'id/advanced/sim-to-real-and-domain-randomization.mdx',
  'id/advanced/vla-and-diffusion-policies': 'id/advanced/vla-and-diffusion-policies.mdx',
  'id/advanced/laplacian-consensus': 'id/advanced/laplacian-consensus.mdx',
};

function sanitizeParam(input: string): string {
  return (input || '').replace(/[^a-zA-Z0-9_-]/g, '');
}

export function getLessonSlugs(language: 'en' | 'id', category: string): string[] {
  const safeLang = language === 'id' ? 'id' : 'en';
  const safeCategory = sanitizeParam(category);
  const prefix = `${safeLang}/${safeCategory}/`;

  return Object.keys(LESSON_INDEX)
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.replace(prefix, ''));
}

export function getLesson(
  language: 'en' | 'id',
  category: string,
  slug: string
): LessonContent | null {
  const safeLang = language === 'id' ? 'id' : 'en';
  const safeCategory = sanitizeParam(category);
  const safeSlug = sanitizeParam(slug);

  const key = `${safeLang}/${safeCategory}/${safeSlug}`;
  const relativePath = LESSON_INDEX[key];

  if (!relativePath) {
    return null;
  }

  const targetPath = path.resolve(CONTENT_ROOT, relativePath);

  if (!fs.existsSync(targetPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(targetPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as LessonFrontmatter,
    content,
  };
}

export function getAllLessons(language: 'en' | 'id'): LessonContent[] {
  const safeLang = language === 'id' ? 'id' : 'en';
  const prefix = `${safeLang}/`;
  const lessons: LessonContent[] = [];

  const matchedKeys = Object.keys(LESSON_INDEX).filter((key) => key.startsWith(prefix));

  for (const key of matchedKeys) {
    const relativePath = LESSON_INDEX[key];
    const targetPath = path.resolve(CONTENT_ROOT, relativePath);

    if (fs.existsSync(targetPath)) {
      const fileContents = fs.readFileSync(targetPath, 'utf8');
      const { data, content } = matter(fileContents);
      lessons.push({
        frontmatter: data as LessonFrontmatter,
        content,
      });
    }
  }

  return lessons;
}
