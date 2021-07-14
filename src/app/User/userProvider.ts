import pool from "../../../config/database";
import Logger from "../../../config/logger";
import {response} from "../../../config/response";
import * as userDao from "./userDao";
import baseResponse from "../../../config/baseResponseStatus";
// Provider: Read 비즈니스 로직 처리

const retrieveUserList = async function (email:string) {
  try {
    const connection = await (await pool).getConnection();
    try {
      if (!email) {
        const userListResult = await userDao.selectUser(connection);
        await connection.release();
        
        return userListResult;
      } else {
        const userListResult = await userDao.selectUserEmail(connection, email);
        await connection.release();
    
        return userListResult;
      }
    } catch (err) {
      Logger.error(`App - retrieve user list provider Query error\n: ${err.message} \n ${err}`);
      return response(baseResponse.QUERY_ERROR);
    }
  } catch (err) {
    Logger.error(`App - retrieve user list provider DB error\n: ${err.message} \n ${err}`);
    return response(baseResponse.DB_ERROR);
  }
};

const retrieveUser = async function (userId: number) {
  try {
    const connection = await (await pool).getConnection();
    try {
      const userResult = await userDao.selectUserId(connection, userId);

      await connection.release();
    
      return userResult;   
    } catch (err) {
      Logger.error(`App - retrieve user provider Query error\n: ${err.message} \n ${err}`);
      return response(baseResponse.QUERY_ERROR);
    }
  } catch (err) {
      Logger.error(`App - retrieve user provider DB error\n: ${err.message} \n ${err}`);
      return response(baseResponse.DB_ERROR);
  }
};

const emailCheck = async function (email: any) {
  try {
    const connection = await (await pool).getConnection();  
    try {
      const emailCheckResult = await userDao.selectUserEmail(connection, email);
      await connection.release();

      return emailCheckResult;  
    } catch (err) {
      Logger.error(`App - email check provider Query error\n: ${err.message} \n ${err}`);
      return response(baseResponse.QUERY_ERROR);
    }
  } catch (err) {
    Logger.error(`App - email check provider DB error\n: ${err.message} \n ${err}`);
      return response(baseResponse.DB_ERROR);
  }
};

const passwordCheck = async function (selectUserPasswordParams: any) {
  try {
    const connection = await (await pool).getConnection();
    try {
      
      const passwordCheckResult = await userDao.selectUserPassword(
          connection,
          selectUserPasswordParams
      );
      await connection.release();
      return passwordCheckResult;
    } catch (err) {
      Logger.error(`App - password check provider Query error\n: ${err.message} \n ${err}`);
      return response(baseResponse.QUERY_ERROR);
    }
  } catch (err) {
    Logger.error(`App - password check provider DB error\n: ${err.message} \n ${err}`);
    return response(baseResponse.DB_ERROR);
  }
};

const accountCheck = async function (email: any) {
  try {
    const connection = await (await pool).getConnection();
    try {      
      const userAccountResult = await userDao.selectUserAccount(connection, email);
      await connection.release();

      return userAccountResult;
    } catch (err) {
      Logger.error(`App - account check provider Query error\n: ${err.message} \n ${err}`);
      return response(baseResponse.QUERY_ERROR);
    }
  } catch (err) {
    Logger.error(`App - account check provider DB error\n: ${err.message} \n ${err}`);
    return response(baseResponse.DB_ERROR);
  }
};

export {accountCheck, passwordCheck, emailCheck, retrieveUser, retrieveUserList}