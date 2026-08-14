/**
 * 2D Vector & Kinematic Mathematics Engine for RoboAtlas
 * Pure TypeScript functions with no UI/framework dependencies.
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface Pose2D extends Vector2D {
  theta: number; // in radians
}

/**
 * Creates a new 2D vector
 */
export function vec2(x: number, y: number): Vector2D {
  return { x, y };
}

/**
 * Adds two 2D vectors: a + b
 */
export function vecAdd(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

/**
 * Subtracts vector b from a: a - b
 */
export function vecSub(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x - b.x, y: a.y - b.y };
}

/**
 * Multiplies vector by scalar: v * s
 */
export function vecScale(v: Vector2D, s: number): Vector2D {
  return { x: v.x * s, y: v.y * s };
}

/**
 * Euclidean norm (magnitude) of vector: ||v||
 */
export function vecNorm(v: Vector2D): number {
  return Math.hypot(v.x, v.y);
}

/**
 * Squared norm of vector: ||v||^2
 */
export function vecNormSq(v: Vector2D): number {
  return v.x * v.x + v.y * v.y;
}

/**
 * Normalizes vector to unit length. Returns zero vector if norm is near zero.
 */
export function vecNormalize(v: Vector2D): Vector2D {
  const n = vecNorm(v);
  if (n < 1e-9) {
    return { x: 0, y: 0 };
  }
  return { x: v.x / n, y: v.y / n };
}

/**
 * Dot product of two vectors: a · b
 */
export function vecDot(a: Vector2D, b: Vector2D): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * 2D Cross product (z-component of 3D cross product): a.x * b.y - a.y * b.x
 */
export function vecCross(a: Vector2D, b: Vector2D): number {
  return a.x * b.y - a.y * b.x;
}

/**
 * Euclidean distance between two points
 */
export function vecDistance(a: Vector2D, b: Vector2D): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Manhattan distance between two points
 */
export function vecManhattanDistance(a: Vector2D, b: Vector2D): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * Octile distance between two points (grid diagonal motion)
 */
export function vecOctileDistance(a: Vector2D, b: Vector2D, diagonalCost = Math.SQRT2): number {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return (dx + dy) + (diagonalCost - 2) * Math.min(dx, dy);
}

/**
 * Angle of vector from positive X axis [-pi, pi]
 */
export function vecAngle(v: Vector2D): number {
  return Math.atan2(v.y, v.x);
}

/**
 * Wraps angle to range (-pi, pi]
 */
export function wrapToPi(angle: number): number {
  let a = (angle + Math.PI) % (2 * Math.PI);
  if (a <= 0) a += 2 * Math.PI;
  return a - Math.PI;
}

/**
 * Linear interpolation between two vectors
 */
export function vecLerp(a: Vector2D, b: Vector2D, t: number): Vector2D {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}
