import React, { useCallback, useEffect, useState } from "react";
import { useWindowEventListener } from "./useEventListener";

type SetPersistentStateArg<T> = ((old: T) => T) | T;
type SetPersistentState<T> = (arg: SetPersistentStateArg<T>) => void;

class GlobalSync {
  private map = new Map<string, Set<SetPersistentState<any>>>();

  public add(key: string, fn: SetPersistentState<any>) {
    let set = this.map.get(key);
    if (!set) {
      set = new Set();
      this.map.set(key, set);
    }
    set.add(fn);
    console.log('add', fn);
  }
  public remove(key: string, fn: SetPersistentState<any>) {
    const set = this.map.get(key);
    set?.delete(fn);
    console.log('remove', fn);
  }
  public setState(key: string, val: any) {
    const set = this.map.get(key);
    for (const setState of set) {
      setState(val);
      console.log(val);
    }
  }
}
const _gs = new GlobalSync();

export function usePersistedState<T>(key: string, defaultValue: T): [T, SetPersistentState<T>] {

  const [state, setState] = useState<T>(defaultValue);

  useWindowEventListener('storage', (evt) => {
    if (evt.key === key) {
      const newVal = JSON.parse(evt.newValue);
      state !== newVal && setState(newVal);
    }
  });

  useEffect(() => {
    const json = localStorage.getItem(key);
    if (json) {
      const newState = JSON.parse(json);
      setState(newState);
    }
  }, [key]);

  useEffect(() => {
    _gs.add(key, setState);
    return () => {
      _gs.remove(key, setState);
    }
  }, [key]);

  const setPersistentState = useCallback((arg: SetPersistentStateArg<T>) => {
    const isT = (obj: any): obj is T => typeof obj !== 'function';
    const newState = isT(arg) ? arg : arg(state);
    localStorage.setItem(key, JSON.stringify(newState));
    _gs.setState(key, newState);
  }, [key, state]);

  return [state, setPersistentState];
}