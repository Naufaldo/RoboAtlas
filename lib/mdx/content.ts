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

const VALID_CATEGORIES = new Set([
  'fundamentals',
  'mathematics',
  'geometry',
  'kinematics',
  'dynamics',
  'sensors',
  'algorithms',
  'planning',
  'estimation',
  'perception',
  'control',
  'manipulation',
  'mobile',
  'aerial',
  'marine',
  'legged',
  'advanced',
]);

function sanitizeParam(input: string): string {
  return (input || '').replace(/[^a-zA-Z0-9_-]/g, '');
}

function isStrictlyInside(parentDir: string, targetPath: string): boolean {
  const normalizedParent = path.normalize(parentDir) + path.sep;
  const normalizedTarget = path.normalize(targetPath);
  return normalizedTarget.startsWith(normalizedParent) || normalizedTarget === path.normalize(parentDir);
}

export function getLessonSlugs(language: 'en' | 'id', category: string): string[] {
  const safeLang = language === 'id' ? 'id' : 'en';
  const safeCategory = sanitizeParam(category);

  if (!VALID_CATEGORIES.has(safeCategory)) {
    return [];
  }

  const categoryDir = path.resolve(CONTENT_ROOT, safeLang, safeCategory);

  if (!isStrictlyInside(CONTENT_ROOT, categoryDir) || !fs.existsSync(categoryDir)) {
    return [];
  }

  return fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.(mdx|md)$/, ''));
}

export function getLesson(
  language: 'en' | 'id',
  category: string,
  slug: string
): LessonContent | null {
  const safeLang = language === 'id' ? 'id' : 'en';
  const safeCategory = sanitizeParam(category);
  const safeSlug = sanitizeParam(slug);

  if (!VALID_CATEGORIES.has(safeCategory) || !safeSlug) {
    return null;
  }

  const fullPath = path.resolve(CONTENT_ROOT, safeLang, safeCategory, `${safeSlug}.mdx`);
  const fallbackPath = path.resolve(CONTENT_ROOT, safeLang, safeCategory, `${safeSlug}.md`);

  let targetPath = fullPath;
  if (!fs.existsSync(targetPath)) {
    if (fs.existsSync(fallbackPath)) {
      targetPath = fallbackPath;
    } else {
      return null;
    }
  }

  if (!isStrictlyInside(CONTENT_ROOT, targetPath)) {
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
  const langDir = path.resolve(CONTENT_ROOT, safeLang);

  if (!isStrictlyInside(CONTENT_ROOT, langDir) || !fs.existsSync(langDir)) {
    return [];
  }

  const categories = fs.readdirSync(langDir);
  const lessons: LessonContent[] = [];

  for (const category of categories) {
    const safeCategory = sanitizeParam(category);
    if (!VALID_CATEGORIES.has(safeCategory)) continue;

    const categoryPath = path.resolve(langDir, safeCategory);

    if (
      isStrictlyInside(CONTENT_ROOT, categoryPath) &&
      fs.statSync(categoryPath).isDirectory()
    ) {
      const files = fs.readdirSync(categoryPath);
      for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const slug = file.replace(/\.(mdx|md)$/, '');
          const lesson = getLesson(safeLang, safeCategory, slug);
          if (lesson) {
            lessons.push(lesson);
          }
        }
      }
    }
  }

  return lessons;
}
