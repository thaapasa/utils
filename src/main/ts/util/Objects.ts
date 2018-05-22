export interface Map<T> {
  [key: string]: T;
}

export function toKeyMap<T extends string>(arr: T[]): { [P in T]: T } {
  const res = {} as any;
  arr.forEach((k: any) => (res[k as any] = k as any));
  return res as any;
}
