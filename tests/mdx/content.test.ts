import { describe, it, expect } from 'vitest';
import { getAllLessons, getLesson, getLessonSlugs } from '@/lib/mdx/content';

describe('RoboAtlas MDX Content Architecture', () => {
  it('should load all Indonesian MDX lessons', () => {
    const lessons = getAllLessons('id');
    expect(lessons.length).toBeGreaterThan(0);
    for (const lesson of lessons) {
      expect(lesson.frontmatter.id).toBeDefined();
      expect(lesson.frontmatter.title).toBeDefined();
      expect(lesson.frontmatter.language).toBe('id');
      expect(lesson.frontmatter.difficulty).toBeDefined();
      expect(lesson.frontmatter.estimatedMinutes).toBeGreaterThan(0);
    }
  });

  it('should load all English MDX lessons', () => {
    const lessons = getAllLessons('en');
    expect(lessons.length).toBeGreaterThan(0);
    for (const lesson of lessons) {
      expect(lesson.frontmatter.id).toBeDefined();
      expect(lesson.frontmatter.title).toBeDefined();
      expect(lesson.frontmatter.language).toBe('en');
      expect(lesson.frontmatter.difficulty).toBeDefined();
      expect(lesson.frontmatter.estimatedMinutes).toBeGreaterThan(0);
    }
  });

  it('should maintain stable ID parity between Indonesian and English lessons', () => {
    const idLessons = getAllLessons('id');
    const enLessons = getAllLessons('en');

    const idLessonIds = new Set(idLessons.map((l) => l.frontmatter.id));
    const enLessonIds = new Set(enLessons.map((l) => l.frontmatter.id));

    // Check that every ID lesson has a matching EN lesson ID
    idLessonIds.forEach((id) => {
      expect(enLessonIds.has(id)).toBe(true);
    });
  });

  it('should retrieve a specific lesson by category and slug', () => {
    const lesson = getLesson('en', 'planning', 'a-star');
    expect(lesson).not.toBeNull();
    expect(lesson?.frontmatter.id).toBe('a-star');
    expect(lesson?.frontmatter.category).toBe('planning');
    expect(lesson?.content).toContain('Evaluation Function');
  });
});
