export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

export function lerp(from: number, to: number, t: number) {
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return from + (to - from) * t;
}

export function lerpUnclamped(from: number, to: number, t: number) {
  return from + (to - from) * t;
}