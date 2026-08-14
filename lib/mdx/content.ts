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
  'en/mathematics/mathematical-foundations': 'en/mathematics/mathematical-foundations.mdx',
  'en/geometry/2d-geometry': 'en/geometry/2d-geometry.mdx',
  'en/geometry/3d-geometry': 'en/geometry/3d-geometry.mdx',
  'en/kinematics/velocity-kinematics-2d': 'en/kinematics/velocity-kinematics-2d.mdx',
  'en/planning/a-star': 'en/planning/a-star.mdx',
  'en/control/pure-pursuit-and-stanley': 'en/control/pure-pursuit-and-stanley.mdx',
  'en/estimation/mcl-particle-filter': 'en/estimation/mcl-particle-filter.mdx',
  'en/perception/occupancy-grid-mapping': 'en/perception/occupancy-grid-mapping.mdx',
  'en/advanced/icp-scan-matching': 'en/advanced/icp-scan-matching.mdx',
  'en/advanced/laplacian-consensus': 'en/advanced/laplacian-consensus.mdx',

  // Indonesian Lessons
  'id/fundamentals/intro-to-robotics': 'id/fundamentals/intro-to-robotics.mdx',
  'id/mathematics/mathematical-foundations': 'id/mathematics/mathematical-foundations.mdx',
  'id/geometry/2d-geometry': 'id/geometry/2d-geometry.mdx',
  'id/geometry/3d-geometry': 'id/geometry/3d-geometry.mdx',
  'id/kinematics/velocity-kinematics-2d': 'id/kinematics/velocity-kinematics-2d.mdx',
  'id/planning/a-star': 'id/planning/a-star.mdx',
  'id/control/pure-pursuit-and-stanley': 'id/control/pure-pursuit-and-stanley.mdx',
  'id/estimation/mcl-particle-filter': 'id/estimation/mcl-particle-filter.mdx',
  'id/perception/occupancy-grid-mapping': 'id/perception/occupancy-grid-mapping.mdx',
  'id/advanced/icp-scan-matching': 'id/advanced/icp-scan-matching.mdx',
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
