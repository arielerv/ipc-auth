import { Nullable, RequestBody } from '@/types';
import { NextFunction, Response } from 'express';

export interface UserIPC extends Omit<UserArq, 'roles'> {
    email: string;
    birthDate: string;
    expiredDate: string;
    headquarter: number;
    taskDetails: Nullable<string>;
    department: Nullable<string>;
    locality: Nullable<string>;
    zipCode: Nullable<string>;
    street: Nullable<string>;
    streetNumber: Nullable<string>;
    observations: Nullable<string>;
    active: Active;
    entities: Entities;
    emails: Email[];
    telephones: Telephone[];
    roles: Role[];
}

export type Telephone = {
    type: string;
    number: string;
    areaCode: string;
}

export type Email = {
    type: string;
    email: string;
}


export type Role = {
    id: string;
    name: string;
    order: number;
};

export type Entry = {
    value: number;
    label: string;
};

export type Active = boolean;

export type Entities = Entry[];

export interface Login {
    username: string;
    password: string;
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

export type Token = string;

export type HandlerLogin = (req: RequestBody<Login>, res: Response, next: NextFunction) => Promise<Response<{user: object}>>

 type ArqLoginResponse = {
    user?: UserArq,
    token?: Token,
    message?: string
    error?: string
}

export type LoginService = (body: Login) => Promise<ArqLoginResponse>

type IPCUserResponse = {
    user?: UserIPC,
    message?: string
}

export type GetUserData = (token: string, userId: string) => Promise<IPCUserResponse>

