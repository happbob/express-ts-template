declare function selectUser(connection: any): Promise<any>;
declare function selectUserEmail(connection: any, email: string): Promise<any>;
declare function selectUserId(connection: any, userId: number): Promise<any>;
declare function insertUserInfo(connection: any, insertUserInfoParams: any): Promise<void>;
declare function selectUserPassword(connection: any, selectUserPasswordParams: any): Promise<any>;
declare function selectUserAccount(connection: any, email: string): Promise<any>;
declare function updateUserInfo(connection: any, id: string, nickname: string): Promise<void>;
export { selectUser, selectUserEmail, selectUserId, insertUserInfo, selectUserPassword, selectUserAccount, updateUserInfo, };
