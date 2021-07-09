import * as jwt from 'jsonwebtoken';
import {secret_config} from './secret';
import { response } from './response';
import ResponseMessage from './baseResponseStatus';
import { NextFunction,Request, Response } from 'express';

const jwtMiddleware = (req:Request, res:Response, next:NextFunction) => {
    // read the token from header or url
    const token:string = req.headers['x-access-token'] as string || req.query.token as string;
    // token does not exist
    if(!token) {
        return res.send(response(ResponseMessage.TOKEN_EMPTY))
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret_config.secret , (err:jwt.VerifyErrors | null, verifiedToken:any) => {
                if(err) reject(err);
                resolve(verifiedToken)
            })
        }
    );

    // if it has failed to verify, it will return an error message
    const onError = (error:jwt.VerifyErrors | null) => {
        return res.send(response(ResponseMessage.TOKEN_VERIFICATION_FAILURE))
    };
    // process the promise
    p.then((verifiedToken:any): void | PromiseLike<void>=>{
        //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
        req.verifiedToken = verifiedToken;
        next();
    }).catch(onError)
};

export default jwtMiddleware;