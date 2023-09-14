import Users, { type UserModel } from '../model/user.model';  // 导入视图，对数据库进行操作

class UsersService {
    async createUser({ username, password, authority }: UserModel) {
        // 创建用户并保存在数据库中
        await Users.create({ username, password, authority });
    }
    async userIsExists({ username, password }: UserModel) {    // 即可查询是否存在该用户，也可以验证用户名密码是否正确
        const whereOp = {};
        username && Object.assign(whereOp, { username });
        password && Object.assign(whereOp, { password });
        const res = await Users.findOne({
            where: whereOp
        });
        return res ? res.dataValues : null;
    }
    async getUserId(username: string) {
        const res = await Users.findOne({
            where: {
                username
            }
        });
        return res ? res.dataValues.id : null;
    }
}

export default new UsersService();