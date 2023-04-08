export interface Login {
    username: string;
    password: string;
}

export interface RequestBody<ReqBody> extends Express.Request {
    body: ReqBody;
}

export type User = {
    id: string;
    name: string;
};

export interface ApiResponse<User> {
    user: User;
    token: string;
}

export type Entry = {
    value: number;
    label: string;
};

export type Entities = Entry[];

export type Token = {
    token: string;
};

export type UserData = [{ entities: Entities }, { active: boolean }];
