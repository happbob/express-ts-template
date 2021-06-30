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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserList = exports.retrieveUser = exports.emailCheck = exports.passwordCheck = exports.accountCheck = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const userDao = __importStar(require("./userDao"));
// Provider: Read 비즈니스 로직 처리
const retrieveUserList = async function (email) {
    if (!email) {
        const connection = await (await database_1.default).getConnection();
        const userListResult = await userDao.selectUser(connection);
        await connection.release();
        return userListResult;
    }
    else {
        const connection = await (await database_1.default).getConnection();
        const userListResult = await userDao.selectUserEmail(connection, email);
        await connection.release();
        return userListResult;
    }
};
exports.retrieveUserList = retrieveUserList;
const retrieveUser = async function (userId) {
    const connection = await (await database_1.default).getConnection();
    const userResult = await userDao.selectUserId(connection, userId);
    await connection.release();
    return userResult;
};
exports.retrieveUser = retrieveUser;
const emailCheck = async function (email) {
    const connection = await (await database_1.default).getConnection();
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    await connection.release();
    return emailCheckResult;
};
exports.emailCheck = emailCheck;
const passwordCheck = async function (selectUserPasswordParams) {
    const connection = await (await database_1.default).getConnection();
    const passwordCheckResult = await userDao.selectUserPassword(connection, selectUserPasswordParams);
    await connection.release();
    return passwordCheckResult;
};
exports.passwordCheck = passwordCheck;
const accountCheck = async function (email) {
    const connection = await (await database_1.default).getConnection();
    const userAccountResult = await userDao.selectUserAccount(connection, email);
    await connection.release();
    return userAccountResult;
};
exports.accountCheck = accountCheck;
//# sourceMappingURL=userProvider.js.map