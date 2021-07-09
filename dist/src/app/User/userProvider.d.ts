declare const retrieveUserList: (email: string) => Promise<any>;
declare const retrieveUser: (userId: number) => Promise<any>;
declare const emailCheck: (email: any) => Promise<any>;
declare const passwordCheck: (selectUserPasswordParams: any) => Promise<any>;
declare const accountCheck: (email: any) => Promise<any>;
export { accountCheck, passwordCheck, emailCheck, retrieveUser, retrieveUserList };
