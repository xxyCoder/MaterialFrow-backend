import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import UserService from '../service/user.service'
import { serviceError, successRequest } from '../constant/result.constant'
import env from '../config/config.default';
import type { UserModel } from '../model/user.model'

const { createUser, getUserId } = UserService;
const { JWT_SECRET } = env;

class UsersController {
    async registry(req: Request, res: Response) {
        const { username, password }: UserModel = req.body;
        try {
            await createUser({ username, password, authority: 0 });
            res.send(successRequest);
        } catch (e) {
            console.error(e);
            res.send(serviceError)
        }
    }
    async login(req: Request, res: Response) {
        const { username, authority } = req.body;
        try {
            const id = await getUserId(username);
            const result = successRequest;
            result.result = {
                token: jwt.sign({ id, username, authority }, JWT_SECRET!, { expiresIn: '1d' })
            }
            res.send(result);
        } catch (e) {
            console.error(e);
            res.send(serviceError)
        }
    }
}

export default new UsersController();