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

function sanitizeParam(input: string): string {
  return input.replace(/[^a-zA-Z0-9_-]/g, '');
}

function isSafeSubpath(parentDir: string, targetPath: string): boolean {
  const relative = path.relative(parentDir, targetPath);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
}

export function getLessonSlugs(language: 'en' | 'id', category: string): string[] {
  const safeLang = language === 'id' ? 'id' : 'en';
  const safeCategory = sanitizeParam(category);
  const categoryDir = path.resolve(CONTENT_ROOT, safeLang, safeCategory);

  if (!isSafeSubpath(CONTENT_ROOT, categoryDir) || !fs.existsSync(categoryDir)) {
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

  if (!isSafeSubpath(CONTENT_ROOT, targetPath)) {
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

  if (!isSafeSubpath(CONTENT_ROOT, langDir) || !fs.existsSync(langDir)) {
    return [];
  }

  const categories = fs.readdirSync(langDir);
  const lessons: LessonContent[] = [];

  for (const category of categories) {
    const safeCategory = sanitizeParam(category);
    const categoryPath = path.resolve(langDir, safeCategory);

    if (
      isSafeSubpath(CONTENT_ROOT, categoryPath) &&
      fs.existsSync(categoryPath) &&
      fs.statSync(categoryPath).isDirectory()
    ) {
      const files = fs.readdirSync(categoryPath);
      for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const safeFilePath = path.resolve(categoryPath, file);
          if (isSafeSubpath(CONTENT_ROOT, safeFilePath) && fs.existsSync(safeFilePath)) {
            const fileContents = fs.readFileSync(safeFilePath, 'utf8');
            const { data, content } = matter(fileContents);
            lessons.push({
              frontmatter: data as LessonFrontmatter,
              content,
            });
          }
        }
      }
    }
  }

  return lessons;
}
