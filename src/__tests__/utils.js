import { Base62, compareUint8Array_unsafe, lerp, levenshtein, testKeyword } from '../common/utils';

describe('base-x', () => {
  test('sample', () => {
    let result = Base62.encode([1]);
    expect(result).toBe('1');
  });
  test('sample', () => {
    let result = Base62.encode([3, 5]); // 256 * 3 + 5 == 773
    expect(result).toBe('ct'); // 62 * 12 + 29
  });
  test('length:6 test', () => {
    const LENGTH = 6;
    let arr = new Uint8Array([0, 0, 0, 0, 0]);
    for (let i = 1; i <= 13; ++i) {
      arr[0] = i;
      let result = Base62.encode(arr);
      expect(result.length).toBe(LENGTH);
    }
    arr = new Uint8Array([12, 0xFF, 0xFF, 0xFF, 0xFF]);
    let result = Base62.encode(arr);
    expect(result.length).toBe(LENGTH);
  });
});

describe('compare uint8 array', () => {
  test('same length 1', () => {
    const a = new Uint8Array([0, 0, 0, 1, 0]);
    const b = new Uint8Array([0, 0, 0, 2, 0]);
    expect(compareUint8Array_unsafe(a, b)).toBeLessThan(0);
  });
  test('same length 2', () => {
    const a = new Uint8Array([0, 8, 0, 1, 0]);
    const b = new Uint8Array([0, 7, 0, 2, 0]);
    expect(compareUint8Array_unsafe(a, b)).toBeGreaterThan(0);
  });
  test('same length 2', () => {
    const a = new Uint8Array([5, 17, 3, 21, 3]);
    const b = new Uint8Array([5, 17, 3, 21, 3]);
    expect(compareUint8Array_unsafe(a, b)).toBe(0);
  });
  test('diff length 1', () => {
    const a = new Uint8Array([0, 5, 0]);
    const b = new Uint8Array([0, 0, 0, 2, 0]);
    expect(compareUint8Array_unsafe(a, b)).toBeGreaterThan(0);
  });
  test('diff length 2', () => {
    const a = new Uint8Array([0, 5, 0]);
    const b = new Uint8Array([0, 1, 0, 2, 0]);
    expect(compareUint8Array_unsafe(a, b)).toBeLessThan(0);
  });
  test('diff length 2', () => {
    const a = new Uint8Array([7, 25, 10]);
    const b = new Uint8Array([0, 0, 7, 25, 10]);
    expect(compareUint8Array_unsafe(a, b)).toBe(0);
  });
});

describe('levenshtein', () => {
  test('', () => {
    const d = levenshtein('sdfkajlwefjakwe', 'sdfkajlwefjakwe');
    expect(d).toBe(0);
  });
  test('', () => {
    const d = levenshtein('league of legends', 'league of legenos');
    expect(d).toBe(1);
  });
  test('', () => {
    const d = levenshtein('leagueoflegends', 'league of legends');
    expect(d).toBe(2);
  });
  test('', () => {
    const d = levenshtein('league of legends', 'leagueoflegends');
    expect(d).toBe(2);
  });
  test('', () => {
    const d = levenshtein('league of legends', 'laegueoflegenos');
    expect(d).toBe(5);
  });
  test('', () => {
    const d = levenshtein('', '');
    expect(d).toBe(Infinity);
  });
  test('', () => {
    const d = levenshtein('asdf', '');
    expect(d).toBe(4);
  });
  test('', () => {
    const d = levenshtein('', 'asdf');
    expect(d).toBe(4);
  });
});

describe('testKeyword', () => {
  test('', () => {
    const d = testKeyword('sdqw', ['asdfqwer', 'ghjktyu']);
    expect(d).toBe(1);
  });
  test('', () => {
    const d = testKeyword('dfwq', ['asdfqwer', 'ghjktyu']);
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThanOrEqual(2);
  });
  test('', () => {
    const d = testKeyword('물과벡두', ['동해물과백두산이', 'ghjktyu']);
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThanOrEqual(1);
  });
  test('', () => {
    const d = testKeyword('물괴벡두', ['동해물과백두산이', 'ghjktyu']);
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThanOrEqual(2);
  });
  test('', () => {
    const d = testKeyword('애국가', ['동해물과백두산이', 'ghjktyu']);
    expect(d).toBeGreaterThanOrEqual(3);
  });
});

describe('lerp & lerpUnclamped', () => {
  test('lerp', () => {
    expect(lerp(2, 9, 0)).toBeCloseTo(2);
  });
  test('lerp', () => {
    expect(lerp(2, 9, 1)).toBeCloseTo(9);
  });
  test('lerp', () => {
    expect(lerp(2, 9, 0.5)).toBeCloseTo(5.5);
  });
  test('lerp', () => {
    expect(lerp(2, 9, -0.5)).toBeCloseTo(2);
  });
  test('lerp', () => {
    expect(lerp(2, 9, 1.5)).toBeCloseTo(9);
  });
  test('lerp', () => {
    expect(lerp(2, 9, Infinity)).toBeCloseTo(9);
  });
  test('lerp', () => {
    expect(lerp(2, 9, -Infinity)).toBeCloseTo(2);
  });
  test('lerp', () => {
    expect(lerp(-5, 5, 0)).toBeCloseTo(-5);
  });
  test('lerp', () => {
    expect(lerp(-5, 5, 0.5)).toBeCloseTo(0);
  });
  test('lerp', () => {
    expect(lerp(-5, 5, 1)).toBeCloseTo(5);
  });
});