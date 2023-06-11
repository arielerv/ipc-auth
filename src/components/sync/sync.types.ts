import { NextFunction, Request, Response } from 'express';


export type RequestQuerySync = {
    userId: string;
    entityId: string;
    day?: string;
}

export type HandlerSync = (req: Request<null, null, null, RequestQuerySync>, res: Response, next: NextFunction) => Promise<Response>

type SyncResponse = {
    success?: boolean;
    panels?: unknown[];
    message?: string
}

export type Sync = (token: string, queries: RequestQuerySync) => Promise<SyncResponse>
