declare type DeepReadonly<T> = { readonly [key in keyof T]: DeepReadonly<T[key]> };
declare type DeepMutable<T> = { -readonly [key in keyof T]: DeepMutable<T[key]> };
declare type DeepKeepMutable<T, K extends keyof T> = DeepReadonly<Omit<T, K>> & DeepMutable<Pick<T, K>>;