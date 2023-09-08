import bcrpty from 'bcryptjs';     // 用于将密码散列（哈希）为安全的字符串
import { PasswordsNotSame, UserisExists, UserIsNotExists, PasswordError, ArgsHasNull } from "../constant/result.constant";
import UsersService from "../service/user.service";
import { Request, Response, NextFunction } from 'express'

const { userIsExists } = UsersService;

const checkTwicePasswordIsSame = async (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    const confirmPassowrd = req.body.confirmPassword;
    if (password !== confirmPassowrd) {
        res.send(PasswordsNotSame);
    }
    next();
}

const checkArgsIsNotNull = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.send(ArgsHasNull);
    }
    next();
}

const checkUserIsExists = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    if (username) {
        let user = await userIsExists({ username });
        if (user !== null) { // 说明该用户存在，不可以修改成该用户名或以该用户名注册
            res.send(UserisExists);
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
            return;
        } else if (!bcrpty.compareSync(password, data.password)) {    // 判断密码
            res.send(PasswordError);
            return;
        } else {
            next();
        }
    } catch (e) {
        console.error(e);
    }
}


export {
    checkTwicePasswordIsSame,
    checkArgsIsNotNull,
    checkUserIsExists,
    crpytPassword,
    verifyLogin
};