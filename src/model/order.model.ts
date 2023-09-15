/*
 * @Author: 李羊
 * @Date: 2023-09-14 23:03:29
 * @FilePath: \MaterialFrow-backend\src\model\order.model.ts
 * @LastEditTime: 2023-09-15 09:53:22
 * @Description:
 */
import { DataTypes } from 'sequelize' // 导入数据类型
import seq from '../database/seq.database'

export type OrderModel = {
    sender: string,
    senderPhone: string,
    senderAddress: string,
    companyName: string,
    recipient: string,
    recipientPhone: string,
    recipientAddress: string,
    ename: string,
    count: number,
    weight: number,
    date: string,
    status: string,
    price: number,
    goodName: string;
}

// 创建模型 会自动推导表名，在其后加s 即 users
const Orders = seq.define(
    'order',
    {
        // id会被sequlize自动创建
        sender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        recipient: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipientPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipientAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goodName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        acceptAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        count: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false // 禁止添加其他列
    }
)

// Orders.sync({
//     // 模型同步，创建该表
//     force: true // 数据库如果存在该表，则先删除
// })

export default Orders
