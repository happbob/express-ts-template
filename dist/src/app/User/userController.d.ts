import { Request, Response } from "express";
/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
declare const getTest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
declare const postUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
declare const getUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
declare const getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
declare const patchUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
declare const check: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { getTest, postUsers, getUsers, getUserById, patchUsers, login, check };
