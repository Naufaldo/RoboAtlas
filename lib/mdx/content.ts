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

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getLessonSlugs(language: 'en' | 'id', category: string): string[] {
  const categoryDir = path.join(CONTENT_DIR, language, category);
  if (!fs.existsSync(categoryDir)) return [];
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
  const fullPath = path.join(CONTENT_DIR, language, category, `${slug}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, language, category, `${slug}.md`);

  let targetPath = fullPath;
  if (!fs.existsSync(targetPath)) {
    if (fs.existsSync(fallbackPath)) {
      targetPath = fallbackPath;
    } else {
      return null;
    }
  }

  const fileContents = fs.readFileSync(targetPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as LessonFrontmatter,
    content,
  };
}

export function getAllLessons(language: 'en' | 'id'): LessonContent[] {
  const langDir = path.join(CONTENT_DIR, language);
  if (!fs.existsSync(langDir)) return [];

  const categories = fs.readdirSync(langDir);
  const lessons: LessonContent[] = [];

  for (const category of categories) {
    const categoryPath = path.join(langDir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const fileContents = fs.readFileSync(path.join(categoryPath, file), 'utf8');
          const { data, content } = matter(fileContents);
          lessons.push({
            frontmatter: data as LessonFrontmatter,
            content,
          });
        }
      }
    }
  }

  return lessons;
}
