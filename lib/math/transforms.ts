import { Vector2D, Pose2D, wrapToPi } from './vector2d';

/**
 * 2D SE(2) Rigid Body Transformation Matrix
 * [ cos(theta) -sin(theta)  tx ]
 * [ sin(theta)  cos(theta)  ty ]
 * [     0           0        1 ]
 */
export interface Transform2D {
  position: Vector2D;
  rotation: number; // radians
}

/**
 * Creates a 2D transform from pose
 */
export function createTransform(x: number, y: number, theta: number): Transform2D {
  return {
    position: { x, y },
    rotation: wrapToPi(theta),
  };
}

/**
 * Transforms a point from local robot coordinates to global world coordinates:
 * p_world = R(theta) * p_local + t
 */
export function transformPointToWorld(point: Vector2D, pose: Pose2D): Vector2D {
  const cosT = Math.cos(pose.theta);
  const sinT = Math.sin(pose.theta);
  return {
    x: pose.x + (point.x * cosT - point.y * sinT),
    y: pose.y + (point.x * sinT + point.y * cosT),
  };
}

/**
 * Transforms a point from global world coordinates to local robot coordinates:
 * p_local = R(-theta) * (p_world - t)
 */
export function transformPointToLocal(point: Vector2D, pose: Pose2D): Vector2D {
  const dx = point.x - pose.x;
  const dy = point.y - pose.y;
  const cosT = Math.cos(-pose.theta);
  const sinT = Math.sin(-pose.theta);
  return {
    x: dx * cosT - dy * sinT,
    y: dx * sinT + dy * cosT,
  };
}

/**
 * Composes two poses (T_world_to_b = T_world_to_a * T_a_to_b)
 */
export function composePoses(a: Pose2D, b: Pose2D): Pose2D {
  const cosA = Math.cos(a.theta);
  const sinA = Math.sin(a.theta);
  return {
    x: a.x + (b.x * cosA - b.y * sinA),
    y: a.y + (b.x * sinA + b.y * cosA),
    theta: wrapToPi(a.theta + b.theta),
  };
}
