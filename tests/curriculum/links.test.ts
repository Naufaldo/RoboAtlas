import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { MASTER_CURRICULUM_LEVELS } from '@/lib/navigation/master-curriculum-levels';
import { LEARNING_PATHS } from '@/lib/navigation/learning-paths';
import { DOMAINS, ALGORITHMS } from '@/lib/navigation/curriculum';
import { LESSON_REGISTRY, DOMAIN_REGISTRY } from '@/lib/curriculum/registry';

const CONTENT_DIR = path.join(process.cwd(), 'content');

describe('Full Navigation & Learn Link Audit (Zero 404s)', () => {
  // Helper to verify if an internal /learn/... link maps to actual physical MDX files
  function verifyLearnLink(href: string, contextDescription: string) {
    expect(href, `${contextDescription}: href must be defined`).toBeTruthy();

    if (href.startsWith('/learn/')) {
      const parts = href.replace('/learn/', '').split('/');
      if (parts.length === 1) {
        // It's a domain overview link, e.g., /learn/fundamentals
        const domainSlug = parts[0];
        const domainExists = DOMAIN_REGISTRY.some((d) => d.slug === domainSlug);
        expect(
          domainExists,
          `${contextDescription}: Domain '/learn/${domainSlug}' must exist in DOMAIN_REGISTRY`
        ).toBe(true);
      } else if (parts.length === 2) {
        // It's a specific lesson, e.g., /learn/fundamentals/aerial-drone-principles
        const [domain, slug] = parts;
        const idPath = path.join(CONTENT_DIR, 'id', domain, `${slug}.mdx`);
        const enPath = path.join(CONTENT_DIR, 'en', domain, `${slug}.mdx`);

        const idExists = fs.existsSync(idPath);
        const enExists = fs.existsSync(enPath);

        expect(
          idExists,
          `${contextDescription}: Indonesian MDX file not found at ${idPath} (Link: ${href})`
        ).toBe(true);
        expect(
          enExists,
          `${contextDescription}: English MDX file not found at ${enPath} (Link: ${href})`
        ).toBe(true);
      } else {
        throw new Error(`${contextDescription}: Unexpected route depth for ${href}`);
      }
    } else if (href.startsWith('/labs') || href.startsWith('/algorithms') || href.startsWith('/robots') || href.startsWith('/resources') || href.startsWith('/projects') || href.startsWith('/about')) {
      // Standard static pages are valid
      expect(true).toBe(true);
    } else {
      throw new Error(`${contextDescription}: Unrecognized route scheme for ${href}`);
    }
  }

  it('should verify all Master Curriculum Levels link to real MDX lessons', () => {
    expect(MASTER_CURRICULUM_LEVELS.length).toBeGreaterThan(0);

    for (const lvl of MASTER_CURRICULUM_LEVELS) {
      expect(lvl.modules.length, `Level ${lvl.level} must have at least one module`).toBeGreaterThan(0);
      for (const mod of lvl.modules) {
        verifyLearnLink(mod.href, `Master Curriculum Level ${lvl.level} Module "${mod.titleEn}"`);
      }
    }
  });

  it('should verify all 6 Learning Paths (Foundations, Control, SLAM, Arms, etc.) link to real MDX lessons', () => {
    expect(LEARNING_PATHS.length).toBe(6);

    for (const track of LEARNING_PATHS) {
      expect(track.steps.length, `Learning track ${track.id} must have steps`).toBeGreaterThan(0);
      for (const step of track.steps) {
        verifyLearnLink(step.theoryHref, `Learning Path "${track.titleEn}" Step "${step.titleEn}"`);
      }
    }
  });

  it('should verify all Canonical Domains in DOMAINS exist in DOMAIN_REGISTRY', () => {
    expect(DOMAINS.length).toBeGreaterThanOrEqual(15);
    for (const domain of DOMAINS) {
      const exists = DOMAIN_REGISTRY.some((d) => d.slug === domain.slug);
      expect(exists, `Domain slug "${domain.slug}" must exist in DOMAIN_REGISTRY`).toBe(true);
    }
  });

  it('should verify all Algorithms in ALGORITHMS matrix link to real MDX lessons or valid routes', () => {
    for (const algo of ALGORITHMS) {
      verifyLearnLink(algo.path, `Algorithm Matrix Item "${algo.name}"`);
    }
  });

  it('should verify all LESSON_REGISTRY entries have matching physical MDX files in both id and en', () => {
    for (const item of LESSON_REGISTRY) {
      const idPath = path.join(CONTENT_DIR, 'id', item.domain, `${item.slug}.mdx`);
      const enPath = path.join(CONTENT_DIR, 'en', item.domain, `${item.slug}.mdx`);

      expect(fs.existsSync(idPath), `Lesson Registry item "${item.id}" missing ID MDX at ${idPath}`).toBe(true);
      expect(fs.existsSync(enPath), `Lesson Registry item "${item.id}" missing EN MDX at ${enPath}`).toBe(true);
    }
  });

  it('should verify all robot platform fundamentals and projects link to existing MDX lessons', () => {
    // Check robot platforms
    const robotPlatforms = [
      { name: '3D Spatial Geometry & SO(3)', href: '/learn/geometry/3d-geometry' },
      { name: 'Matrix Foundations SE(3)', href: '/learn/mathematics/mathematical-foundations' },
      { name: '2-DOF Forward Kinematics', href: '/learn/manipulation/2dof-forward-kinematics' },
      { name: 'Jacobian & Singularity', href: '/learn/manipulation/jacobian-and-singularity' },
      { name: '2D Geometry & Planar Transforms', href: '/learn/geometry/2d-geometry' },
      { name: 'Differential Drive Kinematics', href: '/learn/kinematics/differential-drive-kinematics' },
      { name: 'A* Path Planning', href: '/learn/planning/astar-vs-dijkstra-search' },
      { name: 'Pure Pursuit & Stanley Control', href: '/learn/control/pure-pursuit-and-stanley' },
      { name: 'Extended Kalman Filter (EKF)', href: '/learn/estimation/ekf-localization' },
      { name: 'Occupancy Grid Mapping', href: '/learn/perception/occupancy-grid-mapping' },
      { name: 'Aerial Drone Principles & 6-DOF Dynamics', href: '/learn/fundamentals/aerial-drone-principles' },
      { name: 'Marine Robotics & Fossen 6-DOF Equations', href: '/learn/fundamentals/marine-robotics-fundamentals' },
      { name: 'Zero Moment Point (ZMP) & LIPM Locomotion', href: '/learn/fundamentals/legged-robotics-fundamentals' },
    ];

    for (const item of robotPlatforms) {
      verifyLearnLink(item.href, `Robot Platform link "${item.name}"`);
    }

    // Check capstone projects
    const projectHrefs = [
      '/learn/kinematics/velocity-kinematics-2d',
      '/learn/geometry/2d-geometry',
      '/learn/geometry/3d-geometry',
      '/learn/fundamentals/marine-robotics-fundamentals',
      '/learn/advanced/icp-scan-matching',
      '/learn/advanced/formation-control-and-swarms',
    ];

    for (const href of projectHrefs) {
      verifyLearnLink(href, `Project Theory Link "${href}"`);
    }
  });
});
