
import BaseX from 'base-x';
import Config from '../config';

export const Base62 = BaseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

export function WaitFor(sec: number) {
  return new Promise(resolve => setTimeout(resolve, sec * 1e3));
}

function SimpleHash(str: string, N: number): number {
  if (!str) return 0;

  str = str.toString();
  let hash = 0;
  for (let i = 0; i < str.length; ++i) {
    let ch = str.charCodeAt(i);
    hash = hash * 31 + ch;
    hash |= 0;
  }
  return ((hash % N) + N) % N;
}
export function arbitraryColor(str: string): string {
  const { UserColors } = Config.Twitch;
  return UserColors[SimpleHash(str, UserColors.length)];
}

// export function uuidv4() {
//   const a = '10000000-1000-4000-8000-100000000000';
//   return a.replace(/[018]/g, (c: string) => {
//     const n = parseInt(c);
//     return (n ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> n / 4).toString(16);
//   });
// }

export function compareUint8Array_unsafe(a: Uint8Array, b: Uint8Array): number {
  let diff = a.length - b.length;
  let i = 0, j = 0;
  for (i = 0, j = 0; i < a.length && j < b.length;) {
    if (diff === 0) {
      let c = a[i++] - b[j++];
      if (c === 0) continue;
      return c < 0 ? -1 : 1;
    }
    else if (diff > 0) {
      if (a[i++] != 0)
        return 1;
      --diff;
      continue;
    }
    else { // (diff < 0)
      if (b[j++] != 0)
        return -1;
      ++diff;
      continue;
    }
  }
  return 0;
}

/**
 * [0-9a-zA-Z]{8} base62 random string
 */
export const generateShortId: (() => string) = (function () {
  const MIN = 4;
  const MAX = 197;
  const BUF_LEN = 6;
  if (window.crypto && window.crypto.getRandomValues) {
    return (): string => {
      const RE_ROLL = 20;
      let rnd = crypto.getRandomValues(new Uint8Array(BUF_LEN));
      if (rnd[0] < MIN || rnd[0] > MAX) {
        let a = crypto.getRandomValues(new Uint8Array(RE_ROLL)).filter(e => MIN <= e && e <= MAX)[0];
        rnd[0] = a ? a : MAX;
      }
      return Base62.encode(rnd);
    };
  }
  else {
    function getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return (): string => {
      let rnd = new Uint8Array(BUF_LEN);
      rnd[0] = getRandomInt(MIN, MAX);
      for (let i = 1; i < rnd.length; ++i) {
        rnd[i] = getRandomInt(0, 0xFF);
      }
      return Base62.encode(rnd);
    };
  }
})();

/**
 * 
 * @returns [perfect | includes] := 0 , [distance] > 0 (lower is better)
 */
export function testKeyword(keyword: string, targets: string[]): number {
  if (!keyword || !targets || targets.length === 0) return Infinity;

  for (const str of targets) {
    if (str === keyword || str.includes(keyword)) {
      return 0;
    }
  }

  let minDistance = Infinity;
  for (const str of targets) {
    const lenDiff = str.length - keyword.length;
    if (lenDiff > 0) {
      for (let i = 0; i < lenDiff; ++i) {
        for (let k = keyword.length; k <= str.length; ++k) {
          const d = levenshtein(str.slice(i, k), keyword);
          minDistance = Math.min(d, minDistance);
        }
      }
    }
    const d = levenshtein(str, keyword);
    minDistance = Math.min(d, minDistance);
  }
  return minDistance;
}

export function levenshtein(str1: string, str2: string): number {
  if (!str1 && !str2) return Infinity;
  if (!str1 || !str2) return Math.max(str1.length, str2.length);

  const cols = str1.length + 1;
  const rows = str2.length + 1;

  let data = new Array(cols);
  let next = new Array(cols);

  for (let i = 0; i < cols; ++i)
    data[i] = i;

  for (let i = 1; i < rows; ++i) {
    next[0] = i;
    for (let k = 1; k < cols; ++k) {
      const match = str1[k - 1] === str2[i - 1] ? data[k - 1] - 1 : data[k - 1];
      next[k] = Math.min(match, data[k], next[k - 1]) + 1;
    }

    let swap = data;
    data = next;
    next = swap;
  }

  return data[data.length - 1];
}

export function lerp(min: number, max: number, t: number) {
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return (max - min) * t + min;
}

export function lerpUnclamped(min: number, max: number, t: number) {
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return (max - min) * t + min;
}
