import React from "react"
import { useAnimTime01 } from "../useAnimTime01"
import { create, act } from 'react-test-renderer';

interface WrapperProps {
  options: Parameters<typeof useAnimTime01>['0'];
  setup?: (arg: ReturnType<typeof useAnimTime01>) => void;
  someId?: string;
}
const Wrapper = (props: WrapperProps) => {
  const { ctrl, t } = props.someId ? useAnimTime01(props.options, [props.someId]) : useAnimTime01(props.options);

  props.setup?.({ ctrl, t });
  return <>{t}</>;
}

describe('', () => {

  jest.useFakeTimers();
  const st = jest.spyOn(window, 'requestAnimationFrame');

  let anim: ReturnType<typeof useAnimTime01> | null;
  const setup = (arg: ReturnType<typeof useAnimTime01>) => (anim = arg);

  beforeEach(() => {
    anim = null;
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    create(<Wrapper options={{ duration: 1000 }} />);
  });

  it('advances timer', () => {
    const digit = 1;
    const elem = create(<Wrapper options={{ duration: 5000 }} setup={setup} />);
    expect(anim!.t).toBeCloseTo(0);

    act(() => { jest.advanceTimersByTime(500); });
    expect(anim!.t).toBeCloseTo(0.1, digit);

    act(() => { jest.advanceTimersByTime(500); });
    expect(anim!.t).toBeCloseTo(0.2, digit);

    act(() => { jest.advanceTimersByTime(1000); });
    expect(anim!.t).toBeCloseTo(0.4, digit);

    act(() => { jest.advanceTimersByTime(7000); });
    expect(anim!.t).toBeCloseTo(1.0, digit);
  });

  it('changes options', () => {
    const elem = create(<Wrapper options={{ duration: 5000 }} setup={setup} />);
    expect(anim!.t).toBeCloseTo(0);

    act(() => { jest.advanceTimersByTime(3000); });
    expect(anim!.t).not.toBeCloseTo(0);

    // not to be changed
    elem.update(<Wrapper options={{ duration: 5000 }} setup={setup} />);
    expect(anim!.t).not.toBeCloseTo(0);

    // to be changed
    elem.update(<Wrapper options={{ duration: 1500 }} setup={setup} />);
    expect(anim!.t).toBeCloseTo(0);
  });

  it('changes deps', () => {
    const elem = create(<Wrapper options={{ duration: 5000 }} setup={setup} someId={'old id'} />);
    expect(anim!.t).toBeCloseTo(0);

    act(() => { jest.advanceTimersByTime(3000); });
    expect(anim!.t).not.toBeCloseTo(0);

    // not to be changed
    elem.update(<Wrapper options={{ duration: 5000 }} setup={setup} someId={'old id'} />);
    expect(anim!.t).not.toBeCloseTo(0);

    // to be changed
    elem.update(<Wrapper options={{ duration: 5000 }} setup={setup} someId={'new id'} />);
    expect(anim!.t).toBeCloseTo(0);
  });
})