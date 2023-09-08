const tokenExpiredError = {
    code: 1401,
    message: "token过期"
};
const invalidToken = {
    code: 1402,
    message: "token无效"
};

const PasswordsNotSame = {
    code: 1403,
    message: "两次密码不一致"
}

const UserisExists = {
    code: 2601,
    message: "用户存在"
}

const UserIsNotExists = {
    code: 2602,
    message: "用户不存在"
}

const PasswordError = {
    code: 2401,
    message: "密码错误"
}

const ArgsHasNull = {
    code: 1601,
    message: "参数存在空值"
}

const serviceError = {
    code: 1501,
    message: "服务端出错了"
}

export {
    tokenExpiredError,
    invalidToken,
    PasswordsNotSame,
    UserisExists,
    UserIsNotExists,
    PasswordError,
    ArgsHasNull,
    serviceError
}