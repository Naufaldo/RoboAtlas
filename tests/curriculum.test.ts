import { describe, it, expect } from 'vitest';
import { DOMAINS, ALGORITHMS } from '@/lib/navigation/curriculum';

describe('Curriculum Structure & Integrity', () => {
  it('should contain all 11 canonical robotics domains', () => {
    expect(DOMAINS.length).toBe(11);
    const slugs = DOMAINS.map((d) => d.slug);
    expect(slugs).toContain('fundamentals');
    expect(slugs).toContain('mathematics');
    expect(slugs).toContain('geometry');
    expect(slugs).toContain('kinematics');
    expect(slugs).toContain('sensors');
    expect(slugs).toContain('planning');
    expect(slugs).toContain('control');
    expect(slugs).toContain('estimation');
    expect(slugs).toContain('perception');
    expect(slugs).toContain('manipulation');
    expect(slugs).toContain('advanced');
  });

  it('each domain should have topics and valid mathematical equations', () => {
    for (const domain of DOMAINS) {
      expect(domain.title).toBeTruthy();
      expect(domain.description).toBeTruthy();
      expect(domain.topics.length).toBeGreaterThan(0);
      expect(domain.primaryEquations.length).toBeGreaterThan(0);
      for (const eq of domain.primaryEquations) {
        expect(eq.latex).toBeTruthy();
        expect(eq.explanation).toBeTruthy();
      }
    }
  });

  it('algorithm registry should contain required reference algorithms', () => {
    expect(ALGORITHMS.length).toBeGreaterThanOrEqual(8);
    const ids = ALGORITHMS.map((a) => a.id);
    expect(ids).toContain('dijkstra');
    expect(ids).toContain('a-star');
    expect(ids).toContain('potential-field');
    expect(ids).toContain('rrt');
    expect(ids).toContain('particle-filter');
    expect(ids).toContain('pure-pursuit');
    expect(ids).toContain('icp');
    expect(ids).toContain('consensus');
  });
});
