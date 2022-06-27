import { voteIsOpen, voteTest, VoteRules } from '../Components/Game/VoteUtils';

describe('voteUtils', () => {
  
  test('voteTest', () => {
    const idx = voteTest('fail', '!투표 1');
    expect(idx).toBe(-1);
  });
  
  const numRule1 = VoteRules('NUMBER_GAME');

  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투표 1');
    expect(idx).toBe(0);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투표 7');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투표  7');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투표7');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투표777');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투표 777');
    expect(idx).toBe(6);
  });
  

  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vote 1');
    expect(idx).toBe(0);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vote 7');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vote  7');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vote7');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vote777');
    expect(idx).toBe(6);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vote 777');
    expect(idx).toBe(6);
  });


  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투 1');
    expect(idx).toBe(-1);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!투1표 1');
    expect(idx).toBe(-1);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vot 2');
    expect(idx).toBe(-1);
  });
  test('voteTest', () => {
    const idx = voteTest(numRule1, '!vot2e 2');
    expect(idx).toBe(-1);
  });
  
});

describe('voteUtils', () => {

  const a = new Date('2022-06-23 15:30:00');
  const b = new Date('2022-06-23 17:30:00');
  const c = new Date('2022-06-23 19:30:00');
  const d = new Date('2022-06-23 21:30:00');
  const e = new Date('2022-06-23 23:30:00');

  jest
    .useFakeTimers()
    .setSystemTime(c);

  test('voteIsOpen 1', () => {
    expect(voteIsOpen({})).toBe(false);
  });
  test('voteIsOpen 2', () => {
    expect(voteIsOpen({ start_date: b })).toBe(true);
  });
  test('voteIsOpen 3', () => {
    expect(voteIsOpen({ start_date: d })).toBe(false);
  });
  test('voteIsOpen 4', () => {
    expect(voteIsOpen({ start_date: b, end_date: e })).toBe(true);
  });
  test('voteIsOpen 5', () => {
    expect(voteIsOpen({ start_date: a, end_date: b })).toBe(false);
  });
  test('voteIsOpen 6', () => {
    expect(voteIsOpen({ end_date: e })).toBe(false);
  });
});