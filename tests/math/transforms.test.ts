import { describe, it, expect } from 'vitest';
import {
  transformPointToWorld,
  transformPointToLocal,
  composePoses,
  createTransform,
} from '@/lib/math/transforms';
import { vec2 } from '@/lib/math/vector2d';

describe('2D SE(2) Coordinate Transformation Engine', () => {
  it('should transform a local point to world frame without rotation', () => {
    const pose = { x: 10, y: 20, theta: 0 };
    const localPt = vec2(5, 2);
    const worldPt = transformPointToWorld(localPt, pose);
    expect(worldPt.x).toBeCloseTo(15);
    expect(worldPt.y).toBeCloseTo(22);
  });

  it('should transform a local point with 90 degree counter-clockwise rotation', () => {
    const pose = { x: 0, y: 0, theta: Math.PI / 2 };
    const localPt = vec2(1, 0); // pointing in robot front
    const worldPt = transformPointToWorld(localPt, pose);
    expect(worldPt.x).toBeCloseTo(0);
    expect(worldPt.y).toBeCloseTo(1); // mapped to world +Y
  });

  it('should perform round-trip transform (world -> local -> world)', () => {
    const pose = { x: 12.5, y: -8.3, theta: 0.75 };
    const originalWorldPt = vec2(42.1, 19.8);

    const localPt = transformPointToLocal(originalWorldPt, pose);
    const recoveredWorldPt = transformPointToWorld(localPt, pose);

    expect(recoveredWorldPt.x).toBeCloseTo(originalWorldPt.x);
    expect(recoveredWorldPt.y).toBeCloseTo(originalWorldPt.y);
  });

  it('should compose two poses correctly', () => {
    const poseA = { x: 10, y: 0, theta: Math.PI / 2 };
    const poseB = { x: 5, y: 0, theta: 0 }; // 5 units in A's local x direction

    const composed = composePoses(poseA, poseB);
    expect(composed.x).toBeCloseTo(10);
    expect(composed.y).toBeCloseTo(5);
    expect(composed.theta).toBeCloseTo(Math.PI / 2);
  });
});
