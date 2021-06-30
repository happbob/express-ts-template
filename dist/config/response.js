"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = function response(data, result) {
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
exports.response = response;
//# sourceMappingURL=response.js.map