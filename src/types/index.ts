export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type NonOptional<T> = Exclude<T, undefined>;

export type FirstParameter<T extends (...args: any) => any> = Parameters<T>[0];

export type StringKeyOf<T> = Extract<keyof T, string>;
