import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/config.default'
import {
    invalidToken,
    noToken,
    successRequest,
    tokenExpiredError
} from '../constant/result.constant'

const { JWT_SECRET } = env

const auth = async (req: Request, res: Response, next: NextFunction) => {
    // 验证用户
    const { authorization } = req.headers // token 在放在authorization中
    if (!authorization) {
        res.send(noToken)
        return
    }
    const token = authorization.replace('Bearer ', '')
    try {
        jwt.verify(token, JWT_SECRET!)
        next()
    } catch (err: any) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token过期')
                res.send(tokenExpiredError)
                break
            case 'JsonWebTokenError':
                console.error('无效token')
                res.send(invalidToken)
                break
        }
    }
}

const check = async (req: Request, res: Response, next: NextFunction) => {
    res.send(successRequest)
}

export { auth, check }
