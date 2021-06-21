import {ResponseMessageModel} from './baseResponseStatus';
export interface ResponseModel {
    isSuccess: boolean;
    code: number;
    message: string;
    result?: any;
}

const response = function response(
    data:ResponseMessageModel,
    result?: unknown,
): ResponseModel {
    if (result)
        return {
            isSuccess: data.isSuccess,
            code: data.code,
            message: data.message,
            result: result,
        };
    else {
        return {
            isSuccess: data.isSuccess,
            code: data.code,
            message: data.message,
        };
    }
};


export { response };
