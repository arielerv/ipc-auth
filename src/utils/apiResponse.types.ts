export enum Status {
    success = 'success',
    error = 'error',
    bulk = 'bulk',
}
export interface IErrorResponse {
    message?: string;
}

export interface IErrorResponseStep {
    error?: string;
    message?: string;
}

export type ISuccessResponse = unknown

export enum BulkStatus {
    success = 'success',
    error = 'error',
    partial = 'partial',
}

export type IBulkResponseData = Array<SuccessResponse | ErrorResponse>;

export interface CreateIBulkResponse {
    data: IBulkResponseData;
    message?: string;
}
export interface IBulkResponse extends CreateIBulkResponse {
    bulkStatus: BulkStatus;
}

export type ResponseType = IErrorResponse | ISuccessResponse | IBulkResponse;
export interface IApiResponse {
    status: Status;
    data: ResponseType;
}
export interface SuccessResponse extends IApiResponse {
    success: boolean;
    status: Status.success;
    data: ISuccessResponse;
}

export interface SuccessResponseSurvey extends IApiResponse {
    success: boolean;
    survey: ISuccessResponse;
}

export interface ErrorResponse extends IApiResponse {
    success: boolean;
    status: Status.error;
    data: IErrorResponse;
}

export interface BulkResponse extends IApiResponse {
    status: Status.bulk;
    data: IBulkResponse;
}

export type ApiResponse = SuccessResponse | ErrorResponse | BulkResponse;
