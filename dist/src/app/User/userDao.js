"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfo = exports.selectUserAccount = exports.selectUserPassword = exports.insertUserInfo = exports.selectUserId = exports.selectUserEmail = exports.selectUser = void 0;
// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
                  SELECT email, nickname 
                  FROM User;
                  `;
    const userRows = await connection.query(selectUserListQuery);
    return userRows;
}
exports.selectUser = selectUser;
// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                  SELECT email, nickname 
                  FROM User 
                  WHERE email = ?;
                  `;
    const emailRows = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}
exports.selectUserEmail = selectUserEmail;
// userId 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
                   SELECT idx, email, nickname 
                   FROM User 
                   WHERE idx = ?;
                   `;
    const userRow = await connection.query(selectUserIdQuery, userId);
    return userRow;
}
exports.selectUserId = selectUserId;
// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
          INSERT INTO User(email, password, nickname)
          VALUES (?, ?, ?);
      `;
    await connection.query(insertUserInfoQuery, insertUserInfoParams);
}
exports.insertUserInfo = insertUserInfo;
// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
          SELECT email, nickname, password
          FROM User 
          WHERE email = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(selectUserPasswordQuery, selectUserPasswordParams);
    return selectUserPasswordRow;
}
exports.selectUserPassword = selectUserPassword;
// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
          SELECT status, idx
          FROM User 
          WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(selectUserAccountQuery, email);
    return selectUserAccountRow;
}
exports.selectUserAccount = selectUserAccount;
async function updateUserInfo(connection, id, nickname) {
    const updateUserQuery = `
    UPDATE User 
    SET nickname = ?
    WHERE idx = ?;`;
    await connection.query(updateUserQuery, [nickname, id]);
}
exports.updateUserInfo = updateUserInfo;
//# sourceMappingURL=userDao.js.map