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
exports.check = exports.login = exports.patchUsers = exports.getUserById = exports.getUsers = exports.postUsers = exports.getTest = void 0;
var jwtMiddleware = require("../../../config/jwtMiddleware");
var userProvider = require("../../app/User/userProvider");
var userService = require("../../app/User/userService");
var baseResponseStatus_1 = __importDefault(require("../../../config/baseResponseStatus"));
var _a = require("../../../config/response"), response = _a.response, errResponse = _a.errResponse;
var regexEmail = require("regex-email");
var emit = require("nodemon").emit;
/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
var getTest = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, res.send(response(baseResponseStatus_1.default.SUCCESS))];
        });
    });
};
exports.getTest = getTest;
/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
var postUsers = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, nickname, signUpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password, nickname = _a.nickname;
                    // 빈 값 체크
                    if (!email)
                        return [2 /*return*/, res.send(response(baseResponseStatus_1.default.SIGNUP_EMAIL_EMPTY))];
                    // 길이 체크
                    if (email.length > 30)
                        return [2 /*return*/, res.send(response(baseResponseStatus_1.default.SIGNUP_EMAIL_LENGTH))];
                    // 형식 체크 (by 정규표현식)
                    if (!regexEmail.test(email))
                        return [2 /*return*/, res.send(response(baseResponseStatus_1.default.SIGNUP_EMAIL_ERROR_TYPE))];
                    return [4 /*yield*/, userService.createUser(email, password, nickname)];
                case 1:
                    signUpResponse = _b.sent();
                    return [2 /*return*/, res.send(signUpResponse)];
            }
        });
    });
};
exports.postUsers = postUsers;
/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
var getUsers = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, userListResult, userListByEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.query.email;
                    if (!!email) return [3 /*break*/, 2];
                    return [4 /*yield*/, userProvider.retrieveUserList()];
                case 1:
                    userListResult = _a.sent();
                    return [2 /*return*/, res.send(response(baseResponseStatus_1.default.SUCCESS, userListResult))];
                case 2: return [4 /*yield*/, userProvider.retrieveUserList(email)];
                case 3:
                    userListByEmail = _a.sent();
                    return [2 /*return*/, res.send(response(baseResponseStatus_1.default.SUCCESS, userListByEmail))];
            }
        });
    });
};
exports.getUsers = getUsers;
/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
var getUserById = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, userByUserId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.userId;
                    if (!userId)
                        return [2 /*return*/, res.send(errResponse(baseResponseStatus_1.default.USER_USERID_EMPTY))];
                    return [4 /*yield*/, userProvider.retrieveUser(userId)];
                case 1:
                    userByUserId = _a.sent();
                    return [2 /*return*/, res.send(response(baseResponseStatus_1.default.SUCCESS, userByUserId))];
            }
        });
    });
};
exports.getUserById = getUserById;
// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
var login = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, signInResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, userService.postSignIn(email, password)];
                case 1:
                    signInResponse = _b.sent();
                    return [2 /*return*/, res.send(signInResponse)];
            }
        });
    });
};
exports.login = login;
/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
var patchUsers = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userIdFromJWT, userId, nickname, editUserInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userIdFromJWT = req.verifiedToken.userId;
                    userId = req.params.userId;
                    nickname = req.body.nickname;
                    if (!(userIdFromJWT != userId)) return [3 /*break*/, 1];
                    res.send(errResponse(baseResponseStatus_1.default.USER_ID_NOT_MATCH));
                    return [3 /*break*/, 3];
                case 1:
                    if (!nickname)
                        return [2 /*return*/, res.send(errResponse(baseResponseStatus_1.default.USER_NICKNAME_EMPTY))];
                    return [4 /*yield*/, userService.editUser(userId, nickname)];
                case 2:
                    editUserInfo = _a.sent();
                    return [2 /*return*/, res.send(editUserInfo)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.patchUsers = patchUsers;
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
var check = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userIdResult;
        return __generator(this, function (_a) {
            userIdResult = req.verifiedToken.userId;
            console.log(userIdResult);
            return [2 /*return*/, res.send(response(baseResponseStatus_1.default.TOKEN_VERIFICATION_SUCCESS))];
        });
    });
};
exports.check = check;
//# sourceMappingURL=userController.js.map