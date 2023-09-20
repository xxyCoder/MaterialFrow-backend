import Users, { type UserModel } from '../model/user.model';  // 导入视图，对数据库进行操作

class UsersService {    // 用户服务层
    async createUser({ username, password, authority }: UserModel) {    // 创建用户，拿到用户名、密码、权限
        // 创建用户并保存在数据库中
        await Users.create({ username, password, authority });
    }
    async userIsExists({ username, password }: { username: string, password?: string }) {    // 即可查询是否存在该用户，也可以验证用户名密码是否正确
        const whereOp = {};
        username && Object.assign(whereOp, { username });   // 存在用户名则加入where条件
        password && Object.assign(whereOp, { password });   // 存在密码则加入where条件
        const res = await Users.findOne({
            where: whereOp
        });
        return res ? res.dataValues : null; // 拿到数据则返回dataValues（因为数据都在dataValues中，第三方库是这样将数据放在dataValues中）
    }
    async getUserId(username: string) { // 拿到用户的id值，可以判断是否存在该用户，没有id则没有用户，可以避免重复创建同名用户
        const res = await Users.findOne({
            where: {
                username
            }
        });
        return res ? res.dataValues.id : null;
    }
}

export default new UsersService();