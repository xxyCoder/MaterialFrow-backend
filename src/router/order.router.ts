import express from 'express';
import { checkArgs } from '../middleware/order.middleware';
import OrderController from '../controller/order.controller'

const router = express.Router();
const { entry } = OrderController;

// 订单入库
router.post('/entry', checkArgs, entry)
// 