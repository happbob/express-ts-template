export interface ResponseMessageModel {
    isSuccess: boolean;
    code: number;
    message: string;
}
declare const ResponseMessage: {
    SUCCESS: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    TOKEN_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    TOKEN_VERIFICATION_FAILURE: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    TOKEN_VERIFICATION_SUCCESS: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_EMAIL_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_EMAIL_LENGTH: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_EMAIL_ERROR_TYPE: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_PASSWORD_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_PASSWORD_LENGTH: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_NICKNAME_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_NICKNAME_LENGTH: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_EMAIL_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_EMAIL_LENGTH: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_EMAIL_ERROR_TYPE: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_PASSWORD_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    USER_USERID_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    USER_USERID_NOT_EXIST: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    USER_USEREMAIL_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    USER_USEREMAIL_NOT_EXIST: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    USER_ID_NOT_MATCH: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    USER_NICKNAME_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    USER_STATUS_EMPTY: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_REDUNDANT_EMAIL: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNUP_REDUNDANT_NICKNAME: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_EMAIL_WRONG: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_PASSWORD_WRONG: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_INACTIVE_ACCOUNT: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SIGNIN_WITHDRAWAL_ACCOUNT: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    DB_ERROR: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    SERVER_ERROR: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
    QUERY_ERROR: {
        isSuccess: boolean;
        code: number;
        message: string;
    };
};
export default ResponseMessage;
