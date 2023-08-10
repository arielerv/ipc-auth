import { NextFunction, Request, Response } from 'express';


export type RequestQuerySync = {
    userId: string;
    entityId: string;
    day?: string;
}

export type RequestBodySyncUpdate = {
 surveys: Array<Survey>;
}

interface Survey {
    userId: string,
    panelId: number,
    date: string,
    entityId: number,
    complete: boolean,
    data: {
        [key: number | string]: DataEntry
    }
}

interface DataEntry {
    [key: number | string]: {
      [key: number | string]: {
        [key: number | string]: {
          [key: number | string]: {
            [key: number | string]: number | string;
            price: number;
            type: string;
          };
        };
      };
    };
  }

export type HandlerSync = (req: Request<null, null, null, RequestQuerySync>, res: Response, next: NextFunction) => Promise<Response>

export type HandlerSyncUpdate = (req: Request<null, null, RequestBodySyncUpdate>, res: Response, next: NextFunction) => Promise<Response>


type SyncResponse = {
    success?: boolean;
    panels?: unknown[];
    message?: string
}

type SyncUpdateResponse = {
    success?: boolean;
    message?: string
}

export type SyncUpdate = (token: string, body: RequestBodySyncUpdate) => Promise<SyncUpdateResponse>

export type Sync = (token: string, queries: RequestQuerySync) => Promise<SyncResponse>

export type RequestQuerySurveys = {
    userId: string;
    day: string;
}

export type HandlerGetSurveys  = (req: Request<null, null, null, RequestQuerySurveys>, res: Response, next: NextFunction) => Promise<Response>

export type SyncGetSurveysResponse = {
    success?: boolean;
    surveys?: unknown[];
    message?: string
}

export type GetSurveys = (token: string, queries: RequestQuerySurveys) => Promise<SyncGetSurveysResponse>
