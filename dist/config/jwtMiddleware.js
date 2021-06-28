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
var jwt = __importStar(require("jsonwebtoken"));
var secret_1 = require("./secret");
var response_1 = require("./response");
var baseResponseStatus_1 = __importDefault(require("./baseResponseStatus"));
var jwtMiddleware = function (req, res, next) {
    // read the token from header or url
    var token = req.headers['x-access-token'] || req.query.token;
    // token does not exist
    if (!token) {
        return res.send(response_1.response(baseResponseStatus_1.default.TOKEN_EMPTY));
    }
    // create a promise that decodes the token
    var p = new Promise(function (resolve, reject) {
        jwt.verify(token, secret_1.secret_config.secret, function (err, verifiedToken) {
            if (err)
                reject(err);
            resolve(verifiedToken);
        });
    });
    // if it has failed to verify, it will return an error message
    var onError = function (error) {
        return res.send(response_1.response(baseResponseStatus_1.default.TOKEN_VERIFICATION_FAILURE));
    };
    // process the promise
    p.then(function (verifiedToken) {
        //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
        req.verifiedToken = verifiedToken;
        next();
    }).catch(onError);
};
module.exports = jwtMiddleware;
//# sourceMappingURL=jwtMiddleware.js.map