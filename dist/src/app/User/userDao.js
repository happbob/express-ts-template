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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// 모든 유저 조회
function selectUser(connection) {
    return __awaiter(this, void 0, void 0, function () {
        var selectUserListQuery, userRows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectUserListQuery = "\n                  SELECT email, nickname \n                  FROM User;\n                  ";
                    return [4 /*yield*/, connection];
                case 1: return [4 /*yield*/, (_a.sent()).query(selectUserListQuery)];
                case 2:
                    userRows = _a.sent();
                    return [2 /*return*/, [userRows]];
            }
        });
    });
}
// 이메일로 회원 조회
function selectUserEmail(connection, email) {
    return __awaiter(this, void 0, void 0, function () {
        var selectUserEmailQuery, emailRows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectUserEmailQuery = "\n                  SELECT email, nickname \n                  FROM UserInfo \n                  WHERE email = ?;\n                  ";
                    return [4 /*yield*/, connection];
                case 1: return [4 /*yield*/, (_a.sent()).query(selectUserEmailQuery, email)];
                case 2:
                    emailRows = _a.sent();
                    return [2 /*return*/, emailRows];
            }
        });
    });
}
// userId 회원 조회
function selectUserId(connection, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var selectUserIdQuery, userRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectUserIdQuery = "\n                   SELECT id, email, nickname \n                   FROM UserInfo \n                   WHERE id = ?;\n                   ";
                    return [4 /*yield*/, connection];
                case 1: return [4 /*yield*/, (_a.sent()).query(selectUserIdQuery, userId)];
                case 2:
                    userRow = _a.sent();
                    return [2 /*return*/, userRow];
            }
        });
    });
}
// 유저 생성
function insertUserInfo(connection, insertUserInfoParams) {
    return __awaiter(this, void 0, void 0, function () {
        var insertUserInfoQuery, insertUserInfoRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    insertUserInfoQuery = "\n          INSERT INTO UserInfo(email, password, nickname)\n          VALUES (?, ?, ?);\n      ";
                    return [4 /*yield*/, connection];
                case 1: return [4 /*yield*/, (_a.sent()).query(insertUserInfoQuery, insertUserInfoParams)];
                case 2:
                    insertUserInfoRow = _a.sent();
                    return [2 /*return*/, insertUserInfoRow];
            }
        });
    });
}
// 패스워드 체크
function selectUserPassword(connection, selectUserPasswordParams) {
    return __awaiter(this, void 0, void 0, function () {
        var selectUserPasswordQuery, selectUserPasswordRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectUserPasswordQuery = "\n          SELECT email, nickname, password\n          FROM UserInfo \n          WHERE email = ? AND password = ?;";
                    return [4 /*yield*/, connection];
                case 1: return [4 /*yield*/, (_a.sent()).query(selectUserPasswordQuery, selectUserPasswordParams)];
                case 2:
                    selectUserPasswordRow = _a.sent();
                    return [2 /*return*/, selectUserPasswordRow];
            }
        });
    });
}
// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
function selectUserAccount(connection, email) {
    return __awaiter(this, void 0, void 0, function () {
        var selectUserAccountQuery, selectUserAccountRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectUserAccountQuery = "\n          SELECT status, id\n          FROM UserInfo \n          WHERE email = ?;";
                    return [4 /*yield*/, connection];
                case 1: return [4 /*yield*/, (_a.sent()).query(selectUserAccountQuery, email)];
                case 2:
                    selectUserAccountRow = _a.sent();
                    return [2 /*return*/, selectUserAccountRow];
            }
        });
    });
}
function updateUserInfo(connection, id, nickname) {
    return __awaiter(this, void 0, void 0, function () {
        var updateUserQuery, updateUserRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateUserQuery = "\n    UPDATE UserInfo \n    SET nickname = ?\n    WHERE id = ?;";
                    return [4 /*yield*/, connection];
                case 1: return [4 /*yield*/, (_a.sent()).query(updateUserQuery, [nickname, id])];
                case 2:
                    updateUserRow = _a.sent();
                    return [2 /*return*/, updateUserRow];
            }
        });
    });
}
module.exports = {
    selectUser: selectUser,
    selectUserEmail: selectUserEmail,
    selectUserId: selectUserId,
    insertUserInfo: insertUserInfo,
    selectUserPassword: selectUserPassword,
    selectUserAccount: selectUserAccount,
    updateUserInfo: updateUserInfo,
};
//# sourceMappingURL=userDao.js.map