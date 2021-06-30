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
exports.check = exports.login = exports.patchUsers = exports.getUserById = exports.getUsers = exports.postUsers = exports.getTest = void 0;
const userProvider = __importStar(require("../../app/User/userProvider"));
const userService = __importStar(require("../../app/User/userService"));
const baseResponseStatus_1 = __importDefault(require("../../../config/baseResponseStatus"));
const response_1 = require("../../../config/response");
const types_regex_1 = require("types-regex");
// declare global {
//     namespace Express {
//       interface Request {
//         verifiedToken: any
//       }
//     }
//   }
/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
const getTest = async function (req, res) {
    return res.send(response_1.response(baseResponseStatus_1.default.SUCCESS));
};
exports.getTest = getTest;
/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
const postUsers = async function (req, res) {
    /**
     * Body: email, password, nickname
     */
    const { email, password, nickname } = req.body;
    // 빈 값 체크
    if (!email)
        return res.send(response_1.response(baseResponseStatus_1.default.SIGNUP_EMAIL_EMPTY));
    // 길이 체크
    if (email.length > 30)
        return res.send(response_1.response(baseResponseStatus_1.default.SIGNUP_EMAIL_LENGTH));
    // 형식 체크 (by 정규표현식)
    if (!types_regex_1.emailRegex.test(email))
        return res.send(response_1.response(baseResponseStatus_1.default.SIGNUP_EMAIL_ERROR_TYPE));
    // 기타 등등 - 추가하기
    const signUpResponse = await userService.createUser(email, password, nickname);
    return res.send(signUpResponse);
};
exports.postUsers = postUsers;
/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
const getUsers = async function (req, res) {
    /**
     * Query String: email
     */
    const email = req.query.email;
    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList(email);
        return res.send(response_1.response(baseResponseStatus_1.default.SUCCESS, userListResult));
    }
    else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response_1.response(baseResponseStatus_1.default.SUCCESS, userListByEmail));
    }
};
exports.getUsers = getUsers;
/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
const getUserById = async function (req, res) {
    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;
    if (!userId)
        return res.send(response_1.response(baseResponseStatus_1.default.USER_USERID_EMPTY));
    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response_1.response(baseResponseStatus_1.default.SUCCESS, userByUserId));
};
exports.getUserById = getUserById;
// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
const login = async function (req, res) {
    const { email, password } = req.body;
    // TODO: email, password 형식적 Validation
    const signInResponse = await userService.postSignIn(email, password);
    return res.send(signInResponse);
};
exports.login = login;
/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
const patchUsers = async function (req, res) {
    // jwt - userId, path variable :userId
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const nickname = req.body.nickname;
    if (userIdFromJWT != userId) {
        res.send(response_1.response(baseResponseStatus_1.default.USER_ID_NOT_MATCH));
    }
    else {
        if (!nickname)
            return res.send(response_1.response(baseResponseStatus_1.default.USER_NICKNAME_EMPTY));
        const editUserInfo = await userService.editUser(userId, nickname);
        return res.send(editUserInfo);
    }
};
exports.patchUsers = patchUsers;
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
const check = async function (req, res) {
    const userIdResult = req.verifiedToken.userIdx;
    const verifiedToken = req.verifiedToken;
    console.log(userIdResult);
    return res.send(response_1.response(baseResponseStatus_1.default.TOKEN_VERIFICATION_SUCCESS, verifiedToken));
};
exports.check = check;
//# sourceMappingURL=userController.js.map