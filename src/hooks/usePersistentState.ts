import React, { useCallback, useEffect, useState } from "react";

type Callback<T> = (val: T) => void;

class Container<S extends Storage, T = any> {
  private key: string;
  private value: T;
  private defaultValue: T;
  private subscribers: Array<Callback<T>>;
  private storage: Storage;
  constructor(key: string, defaultValue: T, storage: S) {
    this.key = key;
    this.defaultValue = defaultValue;
    this.subscribers = [];
    this.storage = storage;
    const storedValue = JSON.parse(this.storage.getItem(key));
    this.value = storedValue !== null ? storedValue : defaultValue;
  }
  public getValue(): T {
    return this.value;
  }
  public setValue(arg: React.SetStateAction<T>) {
    const isT = (arg: any): arg is T => typeof arg !== 'function';
    let newValue: T = isT(arg) ? arg : arg(this.value);
    this.value = newValue = newValue !== null ? newValue : this.defaultValue;
    this.subscribers.forEach(callback => callback(newValue));
    this.storage.setItem(this.key, JSON.stringify(newValue));
  }
  public clear() {
    this.setValue(this.defaultValue);
  }
  public subscribe(callback: Callback<T>) {
    this.subscribers.push(callback);
    callback(this.value);
  }
  public unsubscribe(callback: Callback<T>) {
    const idx = this.subscribers.indexOf(callback);
    if (idx >= 0) this.subscribers.splice(idx, 1);
  }
}

class GlobalState<S extends Storage> {
  private storage: S;
  constructor(storage: S) {
    this.storage = storage;
  }
  public equalTo(storageArea: Storage) {
    return this.storage === storageArea;
  }
  private all: Record<string, Container<S, any>> = {};
  private ensureContainer<T>(key: string, defaultValue: T) {
    let container = this.all[key];
    if (!container) {
      this.all[key] = container = new Container<S, T>(key, defaultValue, this.storage);
    }
    return container;
  }
  private getContainer(key: string) {
    return this.all[key];
  }
  public onClear() {
    Object.values(this.all).forEach(con => con.clear());
  }
  public setValue<T>(key: string, arg: React.SetStateAction<T>) {
    this.getContainer(key).setValue(arg);
  }
  public getValue<T = any>(key: string, defaultValue?: T) {
    if (defaultValue)
      return this.ensureContainer<T>(key, defaultValue).getValue() as T;
    return this.getContainer(key)?.getValue() as T;
  }
  public subscribe<T>(key: string, callback: Callback<T>, defaultValue: T) {
    this.ensureContainer(key, defaultValue).subscribe(callback);
  }
  public unsubscribe<T>(key: string, callback: Callback<T>) {
    this.getContainer(key)?.unsubscribe(callback);
  }
}

const globalState = {
  local: new GlobalState(window.localStorage),
  session: new GlobalState(window.sessionStorage),
};

window.addEventListener('storage', evt => {
  const { storageArea, key, newValue } = evt;
  Object.values(globalState).forEach(gs => {
    if (gs.equalTo(storageArea)) {
      if (key) {
        gs.setValue(key, JSON.parse(newValue));
      }
      else {
        gs.onClear();
      }
    }
  });
});

function usePersistentState<S extends keyof typeof globalState, T>(area: S, key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {

  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const callback: Callback<T> = newValue => setState(newValue);
    const gs = globalState[area];

    gs.subscribe(key, callback, defaultValue);
    return () => {
      gs.unsubscribe(key, callback);
    }
  }, [key, area]);

  const setPersistentState = useCallback((newValue: T) => {
    globalState[area].setValue(key, newValue);
  }, [key, area]);

  return [state, setPersistentState];
}

export function useLocalStorageState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return usePersistentState<'local', T>('local', key, defaultValue);
}

export function useSessionStorageState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return usePersistentState<'session', T>('session', key, defaultValue);
}