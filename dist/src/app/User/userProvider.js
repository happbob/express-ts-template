"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserList = exports.retrieveUser = exports.emailCheck = exports.passwordCheck = exports.accountCheck = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const logger_1 = __importDefault(require("../../../config/logger"));
const response_1 = require("../../../config/response");
const userDao = __importStar(require("./userDao"));
const baseResponseStatus_1 = __importDefault(require("../../../config/baseResponseStatus"));
// Provider: Read 비즈니스 로직 처리
const retrieveUserList = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (yield database_1.default).getConnection();
            try {
                if (!email) {
                    const userListResult = yield userDao.selectUser(connection);
                    yield connection.release();
                    return userListResult;
                }
                else {
                    const userListResult = yield userDao.selectUserEmail(connection, email);
                    yield connection.release();
                    return userListResult;
                }
            }
            catch (err) {
                logger_1.default.error(`App - retrieve user list provider Query error\n: ${err.message} \n ${err}`);
                return response_1.response(baseResponseStatus_1.default.QUERY_ERROR);
            }
        }
        catch (err) {
            logger_1.default.error(`App - retrieve user list provider DB error\n: ${err.message} \n ${err}`);
            return response_1.response(baseResponseStatus_1.default.DB_ERROR);
        }
    });
};
exports.retrieveUserList = retrieveUserList;
const retrieveUser = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (yield database_1.default).getConnection();
            try {
                const userResult = yield userDao.selectUserId(connection, userId);
                yield connection.release();
                return userResult;
            }
            catch (err) {
                logger_1.default.error(`App - retrieve user provider Query error\n: ${err.message} \n ${err}`);
                return response_1.response(baseResponseStatus_1.default.QUERY_ERROR);
            }
        }
        catch (err) {
            logger_1.default.error(`App - retrieve user provider DB error\n: ${err.message} \n ${err}`);
            return response_1.response(baseResponseStatus_1.default.DB_ERROR);
        }
    });
};
exports.retrieveUser = retrieveUser;
const emailCheck = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (yield database_1.default).getConnection();
            try {
                const emailCheckResult = yield userDao.selectUserEmail(connection, email);
                yield connection.release();
                return emailCheckResult;
            }
            catch (err) {
                logger_1.default.error(`App - email check provider Query error\n: ${err.message} \n ${err}`);
                return response_1.response(baseResponseStatus_1.default.QUERY_ERROR);
            }
        }
        catch (err) {
            logger_1.default.error(`App - email check provider DB error\n: ${err.message} \n ${err}`);
            return response_1.response(baseResponseStatus_1.default.DB_ERROR);
        }
    });
};
exports.emailCheck = emailCheck;
const passwordCheck = function (selectUserPasswordParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (yield database_1.default).getConnection();
        const passwordCheckResult = yield userDao.selectUserPassword(connection, selectUserPasswordParams);
        yield connection.release();
        return passwordCheckResult;
    });
};
exports.passwordCheck = passwordCheck;
const accountCheck = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (yield database_1.default).getConnection();
        const userAccountResult = yield userDao.selectUserAccount(connection, email);
        yield connection.release();
        return userAccountResult;
    });
};
exports.accountCheck = accountCheck;
//# sourceMappingURL=userProvider.js.map