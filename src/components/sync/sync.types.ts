import { NextFunction, Request, Response } from 'express';

export type RequestQuerySync = {
    userId: string;
    entityId?: string;
    day?: string;
    month?: string | number;
}

export type RequestBodySyncUpdate = {surveys: Array<Survey>}

export interface Survey {
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

export type SyncUpdate = (token: string, surveys: Array<Survey>) => Promise<SyncUpdateResponse>

export type Sync = (token: string, queries: RequestQuerySync) => Promise<SyncResponse>

export type RequestQuerySurveys = {
    month?: number;
    userId: string;
    day: string;
}

export type HandlerGetSurveys  = (req: Request<null, null, RequestBodySyncUpdate, RequestQuerySurveys>, res: Response, next: NextFunction) => Promise<Response>

export type SyncGetSurveysResponse = {
    success?: boolean;
    surveys?: unknown[];
    message?: string
}

export type SyncGetInformantReasonsRejectedResponse = {
  informantRejections?: unknown[];
  success?: boolean;
  message?: string
}

export type SyncGetReferenceValuesResponse = {
  success?: boolean;
  referenceValues?: unknown[];
  message?: string
}


export type SyncGetPriceTypesResponse = {
  priceTypes?: unknown[];
  success?: boolean;
  message?: string
}

export type SyncGetFormRejectionsResponse = {
  formRejections?: unknown[];
  success?: boolean;
  message?: string
}

export type GetSurveys = (token: string, queries: RequestQuerySurveys) => Promise<SyncGetSurveysResponse>

export type GetReferenceValues = (token: string, queries: RequestQuerySurveys) => Promise<SyncGetReferenceValuesResponse>

export type GetInformantReasonsRejected = (token: string) => Promise<SyncGetInformantReasonsRejectedResponse>

export type GetPriceTypes = (token: string) => Promise<SyncGetPriceTypesResponse>

export type GetFormRejections = (token: string) => Promise<SyncGetFormRejectionsResponse>


