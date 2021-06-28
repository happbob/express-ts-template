import pool from "../../../config/database";

import * as userDao from "./userDao";

// Provider: Read 비즈니스 로직 처리

const retrieveUserList = async function (email:string) {
  if (!email) {
    const connection = await (await pool).getConnection();
    const userListResult = await userDao.selectUser(connection);
    await connection.release();

    return userListResult;

  } else {
    const connection = await (await pool).getConnection();
    const userListResult = await userDao.selectUserEmail(connection, email);
    await connection.release();

    return userListResult;
  }
};

const retrieveUser = async function (userId: any) {
  const connection = await (await pool).getConnection();
  const userResult = await userDao.selectUserId(connection, userId);

  await connection.release();

  return userResult;
};

const emailCheck = async function (email: any) {
  const connection = await (await pool).getConnection();
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  await connection.release();

  return emailCheckResult;
};

const passwordCheck = async function (selectUserPasswordParams: any) {
  const connection = await (await pool).getConnection();
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  await connection.release();
  return passwordCheckResult;
};

const accountCheck = async function (email: any) {
  const connection = await (await pool).getConnection();
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  await connection.release();

  return userAccountResult;
};

export {accountCheck, passwordCheck, emailCheck, retrieveUser, retrieveUserList}