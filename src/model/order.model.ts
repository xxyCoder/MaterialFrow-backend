import { DataTypes } from 'sequelize' // 导入数据类型
import seq from '../database/seq.database';

export type OrderModel = {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    firmName: string;
    dispatchAssociates: string;
    dispatchPhone: string;
    dispatchAddress: string;
    acceptPhone: string;
    acceptAddress: string;
    goodName: string;
    count: number;
    weight: number;
    date: string;
    status: string;
    price: number
};

// 创建模型 会自动推导表名，在其后加s 即 users
const Orders = seq.define('order', {
    // id会被sequlize自动创建
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firmName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dispatchAssociates: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dispatchPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dispatchAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acceptPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acceptAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    goodName: {
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
}, {
    timestamps: false   // 禁止添加其他列
});

Orders.sync({ // 模型同步，创建该表
    force: true // 数据库如果存在该表，则先删除
});

export default Orders;