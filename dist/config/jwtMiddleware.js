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
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("./secret");
const response_1 = require("./response");
const baseResponseStatus_1 = __importDefault(require("./baseResponseStatus"));
// declare global {
//     namespace Express {
//       interface Request {
//         verifiedToken: any
//       }
//     }
//   }
const jwtMiddleware = (req, res, next) => {
    // read the token from header or url
    const token = req.headers['x-access-token'] || req.query.token;
    // token does not exist
    if (!token) {
        return res.send(response_1.response(baseResponseStatus_1.default.TOKEN_EMPTY));
    }
    // create a promise that decodes the token
    const p = new Promise((resolve, reject) => {
        jwt.verify(token, secret_1.secret_config.secret, (err, verifiedToken) => {
            if (err)
                reject(err);
            resolve(verifiedToken);
        });
    });
    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        return res.send(response_1.response(baseResponseStatus_1.default.TOKEN_VERIFICATION_FAILURE));
    };
    // process the promise
    p.then((verifiedToken) => {
        //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
        req.verifiedToken = verifiedToken;
        next();
    }).catch(onError);
};
exports.default = jwtMiddleware;
//# sourceMappingURL=jwtMiddleware.js.map