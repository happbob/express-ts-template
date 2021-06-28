"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../../../config/logger"));
var database_1 = require("../../../config/database");
var secret_1 = require("../../../config/secret");
var userProvider = require("./userProvider");
var userDao = require("./userDao");
var baseResponse = require("../../../config/baseResponseStatus");
var response = require("../../../config/response").response;
var errResponse = require("../../../config/response").errResponse;
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var connect = require("http2").connect;
// Service: Create, Update, Delete 비즈니스 로직 처리
exports.createUser = function (email, password, nickname) {
    return __awaiter(this, void 0, void 0, function () {
        var emailRows, hashedPassword, insertUserInfoParams, connection, userIdResult, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, userProvider.emailCheck(email)];
                case 1:
                    emailRows = _a.sent();
                    if (emailRows.length > 0)
                        return [2 /*return*/, errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL)];
                    return [4 /*yield*/, crypto
                            .createHash("sha512")
                            .update(password)
                            .digest("hex")];
                case 2:
                    hashedPassword = _a.sent();
                    insertUserInfoParams = [email, hashedPassword, nickname];
                    return [4 /*yield*/, database_1.mysqlUtil.pool.getConnection()];
                case 3:
                    connection = _a.sent();
                    return [4 /*yield*/, userDao.insertUserInfo(connection, insertUserInfoParams)];
                case 4:
                    userIdResult = _a.sent();
                    console.log("\uCD94\uAC00\uB41C \uD68C\uC6D0 : " + userIdResult[0].insertId);
                    connection.release();
                    return [2 /*return*/, response(baseResponse.SUCCESS)];
                case 5:
                    err_1 = _a.sent();
                    logger_1.default.error("App - createUser Service error\n: " + err_1.message);
                    return [2 /*return*/, errResponse(baseResponse.DB_ERROR)];
                case 6: return [2 /*return*/];
            }
        });
    });
};
// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var emailRows, selectEmail, hashedPassword, selectUserPasswordParams, passwordRows, userInfoRows, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, userProvider.emailCheck(email)];
                case 1:
                    emailRows = _a.sent();
                    if (emailRows.length < 1)
                        return [2 /*return*/, errResponse(baseResponse.SIGNIN_EMAIL_WRONG)];
                    selectEmail = emailRows[0].email;
                    return [4 /*yield*/, crypto
                            .createHash("sha512")
                            .update(password)
                            .digest("hex")];
                case 2:
                    hashedPassword = _a.sent();
                    selectUserPasswordParams = [selectEmail, hashedPassword];
                    return [4 /*yield*/, userProvider.passwordCheck(selectUserPasswordParams)];
                case 3:
                    passwordRows = _a.sent();
                    if (passwordRows[0].password !== hashedPassword) {
                        return [2 /*return*/, errResponse(baseResponse.SIGNIN_PASSWORD_WRONG)];
                    }
                    return [4 /*yield*/, userProvider.accountCheck(email)];
                case 4:
                    userInfoRows = _a.sent();
                    if (userInfoRows[0].status === "INACTIVE") {
                        return [2 /*return*/, errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT)];
                    }
                    else if (userInfoRows[0].status === "DELETED") {
                        return [2 /*return*/, errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT)];
                    }
                    console.log(userInfoRows[0].id); // DB의 userId
                    return [4 /*yield*/, jwt.sign({
                            userId: userInfoRows[0].id,
                        }, // 토큰의 내용(payload)
                        secret_1.secret_config.secret, // 비밀키
                        {
                            expiresIn: "365d",
                            subject: "userInfo",
                        } // 유효 기간 365일
                        )];
                case 5:
                    token = _a.sent();
                    return [2 /*return*/, response(baseResponse.SUCCESS, { 'userId': userInfoRows[0].id, 'jwt': token })];
                case 6:
                    err_2 = _a.sent();
                    logger_1.default.error("App - postSignIn Service error\n: " + err_2.message + " \n" + JSON.stringify(err_2));
                    return [2 /*return*/, errResponse(baseResponse.DB_ERROR)];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.editUser = function (id, nickname) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, editUserResult, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(id);
                    return [4 /*yield*/, database_1.mysqlUtil.pool.getConnection()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, userDao.updateUserInfo(connection, id, nickname)];
                case 2:
                    editUserResult = _a.sent();
                    connection.release();
                    return [2 /*return*/, response(baseResponse.SUCCESS)];
                case 3:
                    err_3 = _a.sent();
                    logger_1.default.error("App - editUser Service error\n: " + err_3.message);
                    return [2 /*return*/, errResponse(baseResponse.DB_ERROR)];
                case 4: return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=userService.js.map