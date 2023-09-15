import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/config.default'
import { serviceError, successRequest } from '../constant/result.constant'
import type { UserModel } from '../model/user.model'
import UserService from '../service/user.service'

const { createUser, getUserId } = UserService
const { JWT_SECRET } = env

class UsersController {
    async registry(req: Request, res: Response) {
        const { username, password }: UserModel = req.body
        try {
            await createUser({ username, password, authority: 0 })
            res.send(successRequest)
        } catch (e) {
            console.error(e)
            res.send(serviceError)
        }
    }
    async login(req: Request, res: Response) {
        const { username, authority } = req.body
        try {
            const id = await getUserId(username)
            const result = successRequest
            result.result = {
                token: jwt.sign({ id, username }, JWT_SECRET!, { expiresIn: '1d' }),
                authority
            }
            res.send(result)
        } catch (e) {
            console.error(e)
            res.send(serviceError)
        }
    }
}

export default new UsersController()
