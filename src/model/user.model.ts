/*
 * @Author: 李羊
 * @Date: 2023-09-14 23:03:29
 * @FilePath: \MaterialFrow-backend\src\model\user.model.ts
 * @LastEditTime: 2023-09-15 08:21:59
 * @Description:
 */
import { DataTypes } from 'sequelize' // 导入数据类型
import seq from '../database/seq.database'

export type UserModel = {
    username: string
    password?: string
    authority?: number
}

// 创建模型 会自动推导表名，在其后加s 即 users
const Users = seq.define(
    'user',
    {
        // id会被sequlize自动创建
        username: {
            type: DataTypes.STRING,
            allowNull: false, // 字段not null
            unique: true, // 唯一
            comment: '用户名'
        },
        password: {
            type: DataTypes.CHAR(64),
            allowNull: false,
            comment: '密码'
        },
        authority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '区别员工与管理员'
        }
    },
    {
        timestamps: false // 禁止添加其他列
    }
)

// Users.sync({
//     // 模型同步，创建该表
//     force: true // 数据库如果存在该表，则先删除
// })

export default Users
