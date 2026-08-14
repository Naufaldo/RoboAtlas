import { describe, it, expect } from 'vitest';
import {
  vec2,
  vecAdd,
  vecSub,
  vecScale,
  vecNorm,
  vecNormSq,
  vecNormalize,
  vecDot,
  vecCross,
  vecDistance,
  vecManhattanDistance,
  vecOctileDistance,
  wrapToPi,
  vecLerp,
} from '@/lib/math/vector2d';

describe('2D Vector Math Engine', () => {
  it('should add vectors correctly', () => {
    const a = vec2(3, 4);
    const b = vec2(1, 2);
    const res = vecAdd(a, b);
    expect(res).toEqual({ x: 4, y: 6 });
  });

  it('should subtract vectors correctly', () => {
    const a = vec2(5, 7);
    const b = vec2(2, 3);
    const res = vecSub(a, b);
    expect(res).toEqual({ x: 3, y: 4 });
  });

  it('should scale vectors correctly', () => {
    const a = vec2(2, -3);
    const res = vecScale(a, 2.5);
    expect(res).toEqual({ x: 5, y: -7.5 });
  });

  it('should compute euclidean norm and norm squared', () => {
    const a = vec2(3, 4);
    expect(vecNorm(a)).toBe(5);
    expect(vecNormSq(a)).toBe(25);
  });

  it('should normalize vector to unit length', () => {
    const a = vec2(0, 10);
    const unit = vecNormalize(a);
    expect(unit.x).toBeCloseTo(0);
    expect(unit.y).toBeCloseTo(1);
    expect(vecNorm(unit)).toBeCloseTo(1);
  });

  it('should compute dot product and cross product', () => {
    const a = vec2(1, 0);
    const b = vec2(0, 1);
    expect(vecDot(a, b)).toBe(0); // orthogonal
    expect(vecCross(a, b)).toBe(1); // z-component 1*1 - 0*0
  });

  it('should calculate distance metrics', () => {
    const a = vec2(0, 0);
    const b = vec2(3, 4);
    expect(vecDistance(a, b)).toBe(5);
    expect(vecManhattanDistance(a, b)).toBe(7);
  });

  it('should calculate octile distance for grid planning', () => {
    const a = vec2(0, 0);
    const b = vec2(2, 2);
    expect(vecOctileDistance(a, b)).toBeCloseTo(2 * Math.SQRT2);
  });

  it('should wrap angles correctly to (-pi, pi]', () => {
    expect(wrapToPi(0)).toBe(0);
    expect(wrapToPi(Math.PI)).toBeCloseTo(Math.PI);
    expect(wrapToPi(3 * Math.PI)).toBeCloseTo(Math.PI);
    expect(wrapToPi(-3 * Math.PI)).toBeCloseTo(Math.PI);
    expect(wrapToPi(2.5 * Math.PI)).toBeCloseTo(0.5 * Math.PI);
    expect(wrapToPi(-2.5 * Math.PI)).toBeCloseTo(-0.5 * Math.PI);
  });

  it('should interpolate linearly between vectors', () => {
    const a = vec2(0, 0);
    const b = vec2(10, 20);
    const mid = vecLerp(a, b, 0.5);
    expect(mid).toEqual({ x: 5, y: 10 });
  });
});
