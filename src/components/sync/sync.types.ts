import { NextFunction, Request, Response } from 'express';

export type RequestQuerySync = {
    userId: string;
    entityId?: string;
    day?: string;
    month?: string | number;
}

export type RequestBodySyncUpdate = {surveys: Array<Survey>, progress: Array<Progress>}

export interface Survey {
    userId: string,
    panelId: number,
    date: Date,
    entityId: number,
    complete: boolean,
    locations: unknown[]
    order: SurveyOrder[],
    data: {
        [key: number | string]: DataEntry
    }
}

export interface Progress {
  entityId: number,
  filled: number,
  id: number,
  informants: Informants[],
  total: number,
}

type Informants = {
  id: number,
  filled: number,
  total: number,
  forms: Forms [],
}

type Forms = {
  id: number,
  filled: number,
  total: number,
}

interface SurveyOrder {
  panelId: number;
  order: number[];
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

export type SyncResponse = {
    success?: boolean;
    meta?: unknown[];
    panels?: Panel[];
    message?: string
}

interface FormItem {
  id: string;
  name: string;
}

interface Attribute {
  id: number;
  name: string;
  label: string;
  attributeDataType: string;
  validations: {
      disabled: string;
      max: number | null;
      min: number | null;
  };
}

interface Variety {
  id: string;
  name: string;
  details: string;
  observation: number;
  attributes: Attribute[];
}

interface Form {
  id: number;
  name: string;
  formItems: FormItem[];
  varieties: Variety[];
}

export interface Informant {
  id: number;
  name: string;
  roadmap: number;
  street: string;
  informantType: string;
  doorNumber: string;
  state: string;
  itemName: string;
  phone: string[];
  forms: Form[];
}

interface Panel {
  id: number;
  name: string;
  roadmaps: Roadmap[];
  entityId: number;
  informants: Informant[];
}

interface Roadmap {
  id: number;
  name: string;
  localities: any[];
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
    surveys?: Survey[];
    message?: string
}

export type SyncGetInformantReasonsRejectedResponse = {
  informantRejections?: unknown[];
  success?: boolean;
  message?: string
}

export type SyncGetReferenceSurveysResponse = {
  success?: boolean;
  referenceSurveys?: unknown[];
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

export type SyncGetPriceVariation = {
  variations?: unknown[];
  success?: boolean;
  message?: string
}

export type GetSurveys = (token: string, queries: RequestQuerySurveys) => Promise<SyncGetSurveysResponse>

export type GetReferenceSurveys = (token: string, queries: RequestQuerySurveys) => Promise<SyncGetReferenceSurveysResponse>

export type GetInformantReasonsRejected = (token: string) => Promise<SyncGetInformantReasonsRejectedResponse>

export type GetPriceTypes = (token: string) => Promise<SyncGetPriceTypesResponse>

export type GetFormRejections = (token: string) => Promise<SyncGetFormRejectionsResponse>

export type GetPriceVariation = (token: string) => Promise<SyncGetPriceVariation>
