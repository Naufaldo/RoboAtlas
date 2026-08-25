import { describe, it, expect } from 'vitest';
import {
  LESSON_REGISTRY,
  DOMAIN_REGISTRY,
  getLessonById,
  getLessonsByDomain,
  getLessonsByLevel,
  getLessonsByPlatform,
} from '@/lib/curriculum/registry';

describe('RoboAtlas Curriculum Registry Integrity', () => {
  it('should have unique lesson IDs across the registry', () => {
    const ids = LESSON_REGISTRY.map((l) => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique slugs across the registry', () => {
    const slugs = LESSON_REGISTRY.map((l) => l.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('should assign valid curriculum levels (0 through 20)', () => {
    for (const lesson of LESSON_REGISTRY) {
      expect(lesson.level).toBeGreaterThanOrEqual(0);
      expect(lesson.level).toBeLessThanOrEqual(20);
    }
  });

  it('should assign valid domains that exist in DOMAIN_REGISTRY', () => {
    const validDomainIds = new Set(DOMAIN_REGISTRY.map((d) => d.id));
    for (const lesson of LESSON_REGISTRY) {
      expect(validDomainIds.has(lesson.domain)).toBe(true);
    }
  });

  it('should assign valid platform tags', () => {
    const validPlatforms = new Set(['manipulator', 'mobile', 'aerial', 'marine', 'legged']);
    for (const lesson of LESSON_REGISTRY) {
      expect(lesson.platforms.length).toBeGreaterThan(0);
      for (const platform of lesson.platforms) {
        expect(validPlatforms.has(platform)).toBe(true);
      }
    }
  });

  it('should not contain orphan prerequisites (all prerequisites must exist)', () => {
    const allLessonIds = new Set(LESSON_REGISTRY.map((l) => l.id));
    for (const lesson of LESSON_REGISTRY) {
      for (const prereq of lesson.prerequisites) {
        expect(allLessonIds.has(prereq)).toBe(true);
      }
    }
  });

  it('should retrieve lessons by ID, domain, level, and platform properly', () => {
    const intro = getLessonById('intro-to-robotics');
    expect(intro).toBeDefined();
    expect(intro?.level).toBe(0);

    const fundamentalsLessons = getLessonsByDomain('fundamentals');
    expect(fundamentalsLessons.length).toBeGreaterThan(0);

    const level0Lessons = getLessonsByLevel(0);
    expect(level0Lessons.length).toBe(4);
    expect(level0Lessons.some((l) => l.id === 'intro-to-robotics')).toBe(true);

    const mobileLessons = getLessonsByPlatform('mobile');
    expect(mobileLessons.length).toBeGreaterThan(0);
  });
});
