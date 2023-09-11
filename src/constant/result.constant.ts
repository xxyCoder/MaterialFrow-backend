interface ReturnType {
    code: number;
    message: string;
    result?: Object;
}
const tokenExpiredError: ReturnType = {
    code: 1401,
    message: "token过期"
};
const invalidToken: ReturnType = {
    code: 1402,
    message: "token无效"
};

const PasswordsNotSame: ReturnType = {
    code: 1403,
    message: "两次密码不一致"
}

const UserisExists: ReturnType = {
    code: 2601,
    message: "用户存在"
}

const UserIsNotExists: ReturnType = {
    code: 2602,
    message: "用户不存在"
}

const PasswordError: ReturnType = {
    code: 2401,
    message: "密码错误"
}

const ArgsHasNull: ReturnType = {
    code: 1601,
    message: "参数存在空值"
}

const serviceError: ReturnType = {
    code: 1501,
    message: "服务端出错了"
}

const successRequest: ReturnType = {
    code: 0,
    message: "请求成功",
    result: {}
}

export {
    tokenExpiredError,
    invalidToken,
    PasswordsNotSame,
    UserisExists,
    UserIsNotExists,
    PasswordError,
    ArgsHasNull,
    serviceError,
    successRequest
}