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
const user = __importStar(require("./userController"));
const jwtMiddleware_1 = __importDefault(require("../../../config/jwtMiddleware"));
const UserRoute = function (app) {
    // const jwtMiddleware = require('../../../config/jwtMiddleware');
    // 0. 테스트 API
    app.route('/app/test').get(user.getTest);
    // 1. 유저 생성 (회원가입) API
    app.route('/app/users').post(user.postUsers);
    // 2. 유저 조회 API (+ 검색)
    app.get('/app/users', user.getUsers);
    // 3. 특정 유저 조회 API
    app.get('/app/users/:userId', user.getUserById);
    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/app/login', user.login);
    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    // app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)
    // TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
    // JWT 검증 API
    app.get('/app/auto-login', jwtMiddleware_1.default, user.check);
    // TODO: 탈퇴하기 API
};
exports.default = UserRoute;
//# sourceMappingURL=userRoute.js.map