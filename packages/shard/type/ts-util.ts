export type Functional<T> = ((...args: any[]) => T) | T

export interface Recordable<V = any> {
  [K: string]: V
}
