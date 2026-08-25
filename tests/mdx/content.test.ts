import { describe, it, expect } from 'vitest';
import { getAllLessons, getLesson } from '@/lib/mdx/content';
import { LESSON_REGISTRY } from '@/lib/curriculum/registry';

describe('RoboAtlas MDX Content Architecture', () => {
  it('should load all Indonesian MDX lessons', () => {
    const lessons = getAllLessons('id');
    expect(lessons.length).toBeGreaterThanOrEqual(11);
    for (const lesson of lessons) {
      expect(lesson.frontmatter.id).toBeDefined();
      expect(lesson.frontmatter.title).toBeDefined();
      expect(lesson.frontmatter.language).toBe('id');
      expect(lesson.frontmatter.difficulty).toBeDefined();
      expect(lesson.frontmatter.estimatedMinutes).toBeGreaterThan(0);
      expect(lesson.content.length).toBeGreaterThan(100);
    }
  });

  it('should load all English MDX lessons', () => {
    const lessons = getAllLessons('en');
    expect(lessons.length).toBeGreaterThanOrEqual(11);
    for (const lesson of lessons) {
      expect(lesson.frontmatter.id).toBeDefined();
      expect(lesson.frontmatter.title).toBeDefined();
      expect(lesson.frontmatter.language).toBe('en');
      expect(lesson.frontmatter.difficulty).toBeDefined();
      expect(lesson.frontmatter.estimatedMinutes).toBeGreaterThan(0);
      expect(lesson.content.length).toBeGreaterThan(100);
    }
  });

  it('should maintain 100% ID parity between Indonesian and English lessons', () => {
    const idLessons = getAllLessons('id');
    const enLessons = getAllLessons('en');

    const idLessonIds = new Set(idLessons.map((l) => l.frontmatter.id));
    const enLessonIds = new Set(enLessons.map((l) => l.frontmatter.id));

    expect(idLessonIds.size).toBe(enLessonIds.size);
    idLessonIds.forEach((id) => {
      expect(enLessonIds.has(id)).toBe(true);
    });
  });

  it('should verify all LESSON_REGISTRY items have corresponding MDX files on disk', () => {
    for (const regItem of LESSON_REGISTRY) {
      const en = getLesson('en', regItem.domain, regItem.slug);
      const id = getLesson('id', regItem.domain, regItem.slug);

      expect(en).not.toBeNull();
      expect(id).not.toBeNull();
      expect(en?.frontmatter.id).toBe(regItem.id);
      expect(id?.frontmatter.id).toBe(regItem.id);
    }
  });

  it('should retrieve a specific lesson by category and slug', () => {
    const lesson = getLesson('en', 'planning', 'a-star');
    expect(lesson).not.toBeNull();
    expect(lesson?.frontmatter.id).toBe('a-star');
    expect(lesson?.frontmatter.category).toBe('planning');
    expect(lesson?.frontmatter.domain).toBe('planning');
    expect(lesson?.content).toContain('Evaluation Function');
  });

  it('should ensure all lessons provide valid domain and category for generateStaticParams', () => {
    const enLessons = getAllLessons('en');
    const idLessons = getAllLessons('id');
    const allLessons = [...enLessons, ...idLessons];

    for (const lesson of allLessons) {
      const domain = lesson.frontmatter.domain || lesson.frontmatter.category;
      const slug = lesson.frontmatter.slug;
      expect(domain, `Lesson ${lesson.frontmatter.id} must have a valid domain`).toBeDefined();
      expect(typeof domain).toBe('string');
      expect(domain?.length).toBeGreaterThan(0);
      expect(slug, `Lesson ${lesson.frontmatter.id} must have a valid slug`).toBeDefined();
      expect(typeof slug).toBe('string');
      expect(slug?.length).toBeGreaterThan(0);
    }
  });
});
