import { DataTypes } from 'sequelize' // 导入数据类型
import seq from '../database/seq.database';

export type OrderModel = Partial<{
    ship_contact: string,
    ship_contact_number: string,
    ship_address: string,
    Receive_contact: string,
    delivery_address: string,
    quantity: number,
    weight: number,
    date: Date,
    goodname: string
}>

// 创建模型 会自动推导表名，在其后加s 即 users
const Orders = seq.define('order', {
    // id会被sequlize自动创建
    ship_contact: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "发货联系人"
    },
    ship_contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "发货联系人号码"
    },
    ship_address: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "发货地址"
    },
    Receive_contact: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收货联系人"
    },
    delivery_address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收货地址"
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
        comment: "数量"
    },
    weight: {
        type: DataTypes.NUMBER,
        allowNull: false,
        comment: "重量"
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "日期"
    },
    goodname: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "货物名称"
    }
}, {
    timestamps: false   // 禁止添加其他列
});

Orders.sync({ // 模型同步，创建该表
    force: true // 数据库如果存在该表，则先删除
});

export default Orders;