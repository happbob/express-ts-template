"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlUtil = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
// TODO: 본인의 DB 계정 입력
var mysqlUtil;
(function (mysqlUtil) {
    mysqlUtil.pool = promise_1.default.createPool({
        host: 'gigl.c6aam9bsw8mj.ap-northeast-2.rds.amazonaws.com',
        user: 'admin',
        port: 3306,
        password: 'hyunbin7231',
        database: 'GIGL_DEV_RDS'
    });
})(mysqlUtil = exports.mysqlUtil || (exports.mysqlUtil = {}));
//# sourceMappingURL=database.js.map