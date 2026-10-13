export type Point = { x: number; y: number };

const fmt = (n: number) => Math.round(n * 100) / 100;

/** Angle (degrees) of the i-th axis of a hexagon, the first one pointing straight up. */
export const axisAngle = (index: number, count = 6) => -90 + (360 / count) * index;

/** Point on axis `index` at distance `radius` from the centre. */
export function axisPoint(cx: number, cy: number, radius: number, index: number, count = 6): Point {
  const angle = (axisAngle(index, count) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

/** Regular hexagon whose corners are rounded with quadratic curves of size `corner`. */
export function roundedHexPath(cx: number, cy: number, radius: number, corner: number): string {
  const vertices = Array.from({ length: 6 }, (_, i) => axisPoint(cx, cy, radius, i));
  const parts: string[] = [];
  vertices.forEach((v, i) => {
    const prev = vertices[(i + 5) % 6] as Point;
    const next = vertices[(i + 1) % 6] as Point;
    const towards = (to: Point) => {
      const dx = to.x - v.x;
      const dy = to.y - v.y;
      const len = Math.hypot(dx, dy);
      return { x: v.x + (dx / len) * corner, y: v.y + (dy / len) * corner };
    };
    const a = towards(prev);
    const b = towards(next);
    parts.push(
      `${i === 0 ? 'M' : 'L'}${fmt(a.x)} ${fmt(a.y)}Q${fmt(v.x)} ${fmt(v.y)} ${fmt(b.x)} ${fmt(b.y)}`,
    );
  });
  return `${parts.join('')}Z`;
}

/** Closed Catmull-Rom spline through `points`, written as cubic Béziers. */
export function smoothClosedPath(points: Point[], tension = 1 / 5): string {
  const n = points.length;
  const at = (i: number) => points[(i + n) % n] as Point;
  let d = `M${fmt(at(0).x)} ${fmt(at(0).y)}`;
  for (let i = 0; i < n; i += 1) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1 = { x: p1.x + (p2.x - p0.x) * tension, y: p1.y + (p2.y - p0.y) * tension };
    const c2 = { x: p2.x - (p3.x - p1.x) * tension, y: p2.y - (p3.y - p1.y) * tension };
    d += `C${fmt(c1.x)} ${fmt(c1.y)} ${fmt(c2.x)} ${fmt(c2.y)} ${fmt(p2.x)} ${fmt(p2.y)}`;
  }
  return `${d}Z`;
}
