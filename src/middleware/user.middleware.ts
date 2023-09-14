import bcrpty from 'bcryptjs';     // 用于将密码散列（哈希）为安全的字符串
import { PasswordsNotSame, UserisExists, UserIsNotExists, PasswordError, ArgsHasNull, serviceError } from "../constant/result.constant";
import UsersService from "../service/user.service";
import { Request, Response, NextFunction } from 'express'

const { userIsExists } = UsersService;

const checkTwicePasswordIsSame = async (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassowrd } = req.body;
    if (password !== confirmPassowrd) {
        res.send(PasswordsNotSame);
    } else {
        next();
    }
}

const checkArgsIsNotNull = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log(username, password)
    if (!username || !password) {
        res.send(ArgsHasNull);
    } else {
        next();
    }
}

const checkUserIsExists = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    if (username) {
        let user = await userIsExists({ username });
        if (user !== null) { // 说明该用户存在，不可以修改成该用户名或以该用户名注册
            res.send(UserisExists);
            return;
        }
    }
    next();
}

const crpytPassword = async (req: Request, res: Response, next: NextFunction) => {   // 密码加密
    const { password } = req.body;
    if (password) { // 有密码就加密
        const salt = bcrpty.genSaltSync(10);
        const hash = bcrpty.hashSync(password, salt);    // hash保存的是密文
        req.body.password = hash;
    }
    next();
}

const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {    // 验证登录
    const { username, password } = req.body;
    try {
        const data = await userIsExists({ username });   // 判断用户是否存在
        if (!data) {
            console.warn(`${username}不存在`);
            res.send(UserIsNotExists);
        } else if (!bcrpty.compareSync(password, data.password)) {    // 判断密码
            res.send(PasswordError);
        } else {
            req.body.authority = data.authority;
            next();
        }
    } catch (e) {
        console.error(e);
        res.send(serviceError);
    }
}


export {
    checkTwicePasswordIsSame,
    checkArgsIsNotNull,
    checkUserIsExists,
    crpytPassword,
    verifyLogin
};