import { ResponseMessageModel } from './baseResponseStatus';
export interface ResponseModel {
    isSuccess: boolean;
    code: number;
    message: string;
    result?: any;
}
declare const response: (data: ResponseMessageModel, result?: unknown) => ResponseModel;
export { response };
