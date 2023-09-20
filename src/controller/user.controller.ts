import { Request, Response } from 'express' // 引入类型
import jwt from 'jsonwebtoken'
import env from '../config/config.default'  // 拿到环境.env变量
import { serviceError, successRequest } from '../constant/result.constant'  // 引入通用常量
import UserService from '../service/user.service'

const { createUser, getUserId } = UserService   // 从用户服务层对象拿到其方法
const { JWT_SECRET } = env

class UsersController {
    async registry(req: Request, res: Response) {
        const { username, password } = req.body
        try {
            await createUser({ username, password, authority: 0 })  // 一开始创建用户，默认权限是0，后续要改权限，需要在数据库表中修改即可
            res.send(successRequest)    // 创建成功就发送请求成功
        } catch (e) {
            console.error(e)    // 错误打印
            res.send(serviceError)  // 失败就发送服务器出错
        }
    }
    async login(req: Request, res: Response) {
        const { username, authority } = req.body
        try {
            const id = await getUserId(username)
            const result = successRequest
            // 颁发token，将权限也返回给前端，前端如果是管理员（权限authority:1）登录，可以看见第三个页面，也可以查询所有员工业绩
            result.result = {
                token: jwt.sign({ id, username }, JWT_SECRET!, { expiresIn: '1d' }),    // jwt颁发，第一个参数是携带的数据，第二个是密钥（加密使用），第三个是过期时间（一天 1d），也可以添加其他参数 algorithm 使用什么算法加密
                authority
            }
            res.send(result)    // 将结果发送回去
        } catch (e) {
            console.error(e)
            res.send(serviceError)  // 同上
        }
    }
}

export default new UsersController()
