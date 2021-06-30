declare const createUser: (email: string, password: string, nickname: string) => Promise<import("../../../config/response").ResponseModel>;
declare const postSignIn: (email: string, password: string) => Promise<import("../../../config/response").ResponseModel>;
declare const editUser: (id: string, nickname: string) => Promise<import("../../../config/response").ResponseModel>;
export { createUser, postSignIn, editUser };
