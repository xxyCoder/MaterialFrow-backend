/*
 * @Author: 李羊
 * @Date: 2023-09-14 23:03:29
 * @FilePath: \MaterialFrow-backend\src\middleware\user.middleware.ts
 * @LastEditTime: 2023-09-15 09:53:06
 * @Description:
 */
import bcrpty from 'bcryptjs' // 用于将密码散列（哈希）为安全的字符串
import { NextFunction, Request, Response } from 'express'
import {
    ArgsHasNull,
    PasswordError,
    PasswordsNotSame,
    UserIsNotExists,
    UserisExists,
    serviceError
} from '../constant/result.constant'
import UsersService from '../service/user.service'

const { userIsExists } = UsersService

const checkTwicePasswordIsSame = async (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        res.send(PasswordsNotSame)
        return
    }
    if (password === '') {
        res.send(ArgsHasNull)
        return
    }
    next()
}

const checkArgsIsNotNull = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.send(ArgsHasNull)
        return
    }
    next()
}

const checkUserIsExists = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body
    if (username) {
        let user = await userIsExists({ username })
        if (user !== null) {
            // 说明该用户存在，不可以修改成该用户名或以该用户名注册
            res.send(UserisExists)
            return
        }
    }
    next()
}

const crpytPassword = async (req: Request, res: Response, next: NextFunction) => {
    // 密码加密
    const { password } = req.body
    const salt = bcrpty.genSaltSync(10)
    const hash = bcrpty.hashSync(password, salt) // hash保存的是密文
    req.body.password = hash
    next()
}

const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    // 验证登录
    try {
        const { username, password } = req.body
        const data = await userIsExists({ username }) // 判断用户是否存在
        if (!data) {
            console.warn(`${username}不存在`)
            res.send(UserIsNotExists)
        } else if (!bcrpty.compareSync(password, data.password)) {
            // 判断密码
            res.send(PasswordError)
        } else {
            req.body.authority = data.authority // 查询到了将权限挂载，方便后续存储到token中
            next()
        }
    } catch (e) {
        console.error(e)
        res.send(serviceError)
    }
}

export {
    checkArgsIsNotNull,
    checkTwicePasswordIsSame,
    checkUserIsExists,
    crpytPassword,
    verifyLogin
}
