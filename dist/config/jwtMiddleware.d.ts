import { NextFunction, Request, Response } from 'express';
declare const jwtMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default jwtMiddleware;
