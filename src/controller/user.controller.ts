import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import UserService from '../service/user.service'
import { serviceError } from '../constant/result.constant'
import env from '../config/config.default';
import type { UserModel } from '../model/user.model'

const { createUser, getUserId } = UserService;
const { JWT_SECRET } = env;

class UsersController {
    async registry(req: Request, res: Response) {
        const { username, password }: UserModel = req.body;
        try {
            await createUser({ username, password });
            res.send({
                code: 2201,
                message: "创建成功"
            });
        } catch (e) {
            console.error(e);
            res.send(serviceError)
        }
    }
    async login(req: Request, res: Response) {
        const { username } = req.body;
        try {
            const id = await getUserId(username);
            const result = {
                code: 1201,
                message: "登录成功",
                token: jwt.sign({ id, username }, JWT_SECRET!, { expiresIn: '1d' })
            }
            res.send(result);
        } catch (e) {
            console.error(e);
            res.send(serviceError)
        }
    }
}

export default new UsersController();