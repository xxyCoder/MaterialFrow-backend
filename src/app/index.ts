import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import users from '../router/user.router'
import orders from '../router/order.router'

const app = express();
// 允许跨域
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 挂载路由
app.use('/users', users);
app.use('/orders', orders)

export default app;