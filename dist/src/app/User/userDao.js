"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfo = exports.selectUserAccount = exports.selectUserPassword = exports.insertUserInfo = exports.selectUserId = exports.selectUserEmail = exports.selectUser = void 0;
// 모든 유저 조회
function selectUser(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectUserListQuery = `
                  SELECT email, nickname 
                  FROM User;
                  `;
        const userRows = yield connection.query(selectUserListQuery);
        return userRows;
    });
}
exports.selectUser = selectUser;
// 이메일로 회원 조회
function selectUserEmail(connection, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectUserEmailQuery = `
                  SELECT email, nickname 
                  FROM User 
                  WHERE email = ?;
                  `;
        const emailRows = yield connection.query(selectUserEmailQuery, email);
        return emailRows;
    });
}
exports.selectUserEmail = selectUserEmail;
// userId 회원 조회
function selectUserId(connection, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectUserIdQuery = `
                   SELECT idx, email, nickname 
                   FROM User 
                   WHERE idx = ?;
                   `;
        const userRow = yield connection.query(selectUserIdQuery, userId);
        return userRow;
    });
}
exports.selectUserId = selectUserId;
// 유저 생성
function insertUserInfo(connection, insertUserInfoParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertUserInfoQuery = `
          INSERT INTO User(email, password, nickname)
          VALUES (?, ?, ?);
      `;
        yield connection.query(insertUserInfoQuery, insertUserInfoParams);
    });
}
exports.insertUserInfo = insertUserInfo;
// 패스워드 체크
function selectUserPassword(connection, selectUserPasswordParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectUserPasswordQuery = `
          SELECT email, nickname, password
          FROM User 
          WHERE email = ? AND password = ?;`;
        const selectUserPasswordRow = yield connection.query(selectUserPasswordQuery, selectUserPasswordParams);
        return selectUserPasswordRow;
    });
}
exports.selectUserPassword = selectUserPassword;
// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
function selectUserAccount(connection, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectUserAccountQuery = `
          SELECT status, idx
          FROM User 
          WHERE email = ?;`;
        const selectUserAccountRow = yield connection.query(selectUserAccountQuery, email);
        return selectUserAccountRow;
    });
}
exports.selectUserAccount = selectUserAccount;
function updateUserInfo(connection, id, nickname) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateUserQuery = `
    UPDATE User 
    SET nickname = ?
    WHERE idx = ?;`;
        yield connection.query(updateUserQuery, [nickname, id]);
    });
}
exports.updateUserInfo = updateUserInfo;
//# sourceMappingURL=userDao.js.map