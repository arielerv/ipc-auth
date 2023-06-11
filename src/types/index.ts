export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type NonOptional<T> = Exclude<T, undefined>;

export type StringKeyOf<T> = Extract<keyof T, string>;

export interface RequestBody<ReqBody> extends Express.Request {
    body: ReqBody;
}

export interface RequestQuery<ReqQuery> extends Express.Request {
    query: ReqQuery;
}
