import {
    BulkResponse,
    BulkStatus,
    CreateIBulkResponse,
    ErrorResponse,
    IBulkResponse,
    IErrorResponse, IErrorResponseStep,
    ISuccessResponse,
    Status,
    SuccessResponse, SuccessResponseSurvey,
} from './apiResponse.types';

class ApiResponse {
    static successResponse(data: ISuccessResponse): SuccessResponse {
        return {
            success: true,
            status: Status.success,
            data,
        };
    }

    static successResponseSurvey(data: ISuccessResponse): SuccessResponseSurvey {
        return <SuccessResponseSurvey>data;
    }

    static errorResponseStep(data: IErrorResponseStep): ErrorResponse {
        return {
            success: false,
            status: Status.error,
            data,
        };
    }

    static errorResponse(data: IErrorResponse): ErrorResponse {
        return {
            success: false,
            status: Status.error,
            data,
        };
    }

    static bulkResponse(bulkResponse: CreateIBulkResponse): BulkResponse {
        let bulkStatus = BulkStatus.success;
        const bulkResponses = bulkResponse.data;
        const errors = bulkResponses.filter((response: {status: Status}) => response.status === Status.error).length;
        if (errors && errors === bulkResponses.length)
            bulkStatus = BulkStatus.error;
        else if (errors) {
            bulkStatus = BulkStatus.partial;
        }

        const data = { ...bulkResponse, bulkStatus } as IBulkResponse;

        return {
            status: Status.bulk,
            data,
        };
    }
}

export default ApiResponse;
