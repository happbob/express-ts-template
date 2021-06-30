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
exports.editUser = exports.postSignIn = exports.createUser = void 0;
const logger_1 = __importDefault(require("../../../config/logger"));
const database_1 = __importDefault(require("../../../config/database"));
const secret_1 = require("../../../config/secret");
const userDao = __importStar(require("./userDao"));
const userProvider = __importStar(require("./userProvider"));
const baseResponseStatus_1 = __importDefault(require("../../../config/baseResponseStatus"));
const response_1 = require("../../../config/response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
// Service: Create, Update, Delete 비즈니스 로직 처리
let connection;
const createUser = async function (email, password, nickname) {
    try {
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return response_1.response(baseResponseStatus_1.default.SIGNUP_REDUNDANT_EMAIL);
        // 비밀번호 암호화
        const hashedPassword = await crypto_1.default
            .createHash("sha512")
            .update(password)
            .digest("hex");
        const insertUserInfoParams = [email, hashedPassword, nickname];
        connection = await (await database_1.default).getConnection();
        // 트랜잭션 처리
        await connection.beginTransaction();
        // 유저 생성
        await userDao.insertUserInfo(connection, insertUserInfoParams);
        // DB 트랜잭션 Commit
        await connection.commit();
        await connection.release();
        return response_1.response(baseResponseStatus_1.default.SUCCESS);
    }
    catch (err) {
        connection.rollback();
        logger_1.default.error(`App - createUser Service error\n: ${err.message} \n ${err}`);
        return response_1.response(baseResponseStatus_1.default.DB_ERROR);
    }
    ;
};
exports.createUser = createUser;
// TODO: After 로그인 인증 방법 (JWT)
const postSignIn = async function (email, password) {
    try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailCheck(email);
        console.log(`email Rows : `, emailRows);
        if (emailRows.length < 1)
            return response_1.response(baseResponseStatus_1.default.SIGNIN_EMAIL_WRONG);
        const selectEmail = emailRows[0].email;
        // 비밀번호 확인
        const hashedPassword = await crypto_1.default
            .createHash("sha512")
            .update(password)
            .digest("hex");
        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);
        console.log(`password Rows : `, passwordRows);
        if (passwordRows.length < 1)
            return response_1.response(baseResponseStatus_1.default.SIGNIN_PASSWORD_WRONG);
        if (passwordRows[0].password !== hashedPassword) {
            return response_1.response(baseResponseStatus_1.default.SIGNIN_PASSWORD_WRONG);
        }
        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);
        if (userInfoRows[0].status === "INACTIVE") {
            return response_1.response(baseResponseStatus_1.default.SIGNIN_INACTIVE_ACCOUNT);
        }
        else if (userInfoRows[0].status === "DELETED") {
            return response_1.response(baseResponseStatus_1.default.SIGNIN_WITHDRAWAL_ACCOUNT);
        }
        console.log(`user Rows : `, userInfoRows); // DB의 userId
        //토큰 생성 Service
        let token = await jsonwebtoken_1.default.sign({
            userIdx: userInfoRows[0].idx,
        }, // 토큰의 내용(payload)
        secret_1.secret_config.secret, // 비밀키
        {
            expiresIn: "365d",
            subject: "userInfo",
        } // 유효 기간 365일
        );
        return response_1.response(baseResponseStatus_1.default.SUCCESS, { 'userId': userInfoRows.idx, 'jwt': token });
    }
    catch (err) {
        logger_1.default.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return response_1.response(baseResponseStatus_1.default.DB_ERROR);
    }
};
exports.postSignIn = postSignIn;
const editUser = async function (id, nickname) {
    try {
        console.log(id);
        const connection = await (await database_1.default).getConnection();
        (fn) => async (...args) => {
            /* DB 커넥션을 한다. */
            const con = await (await database_1.default).getConnection();
            /* 로직에 con과 args(넘겨받은 paramter)를 넘겨준다. */
            const editUserResult = await userDao.updateUserInfo(con, id, nickname);
            /* con을 닫아준다. */
            console.log(`추가된 회원 : ${editUserResult}`);
            con.release();
            return response_1.response(baseResponseStatus_1.default.SUCCESS);
        };
        connection.release();
        return response_1.response(baseResponseStatus_1.default.SUCCESS);
    }
    catch (err) {
        logger_1.default.error(`App - editUser Service error\n: ${err.message}`);
        return response_1.response(baseResponseStatus_1.default.DB_ERROR);
    }
};
exports.editUser = editUser;
//# sourceMappingURL=userService.js.map