import { Nullable } from '@/types';

export interface Login {
    username: string;
    password: string;
}

export interface RequestBody<ReqBody> extends Express.Request {
    body: ReqBody;
}

export type UserArq = {
    id: string;
    name: string;
    surname: string;
    username: string;
    internalArea: Nullable<string>,
    email: string;
    documentId: string;
    synchronized: boolean;
    deleted: boolean;
    lastAccess: string;
    updatedAt:  string;
    deletedAt: Nullable<string>;
    roles: string[];
    attributes: object
};

export interface UserIPC extends UserArq {
    entities: Entities;
    active: Active;
}

export type ApiResponse<T> = T

export type Entry = {
    value: number;
    label: string;
};

export type Active = boolean;

export type Entities = Entry[];

export type Token = string;

export type UserData = [{ entities: Entities }, { active: Active }];
