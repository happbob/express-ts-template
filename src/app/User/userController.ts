import { Request, Response } from "express";

import { postUserDto } from "./userTypes";
import * as userProvider from "./userProvider";
import * as userService from "./userService";
import ResponseMessage from "../../../config/baseResponseStatus";
import {response} from "../../../config/response";
import {emailRegex} from "types-regex";
import { validate, ValidationError } from "class-validator";
import Logger from "../../../config/logger";

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
const getTest = async function (req: Request, res: Response) {
    return res.send(response(ResponseMessage.SUCCESS))
}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
const postUsers = async function (req: Request, res: Response) {

    /**
     * Body: email, password, nickname
     */
    const request = req.body;
    const body = new postUserDto(request);
    const errors: ValidationError[] = await validate(body);
    
    if (errors.length > 0) {
        Logger.error(`App - postSignIn Service error\n: ${errors[0]} \n ${JSON.stringify(errors[0].constraints)}`);
        return res.send(response(ResponseMessage.VALIDATION_ERROR));
    } else {
        console.log('validation succeed');
    }


    const signUpResponse = await userService.createUser(
        body.email,
        body.password,
        body.nickname
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
 const getUsers = async function (req: Request, res: Response) {

    /**
     * Query String: email
     */
    const email:string = req.query.email as string;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList(email);
        return res.send(response(ResponseMessage.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(ResponseMessage.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
 const getUserById = async function (req: Request, res: Response) {

    /**
     * Path Variable: userId
     */
    const userId = parseInt(req.params.userId);


    if (!userId) return res.send(response(ResponseMessage.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(ResponseMessage.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
 const login = async function (req: Request, res: Response) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
const patchUsers = async function (req: Request, res: Response) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(response(ResponseMessage.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(response(ResponseMessage.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};











/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
 const check = async function (req:Request, res:Response) {
    const userIdResult = req.verifiedToken.userIdx;
    const verifiedToken = req.verifiedToken;
    console.log(userIdResult);
    return res.send(response(ResponseMessage.TOKEN_VERIFICATION_SUCCESS,verifiedToken));
};

export {getTest, postUsers,getUsers,getUserById,patchUsers, login, check}
