import express from 'express';
import { checkEntryArgs, checkModifyArgs, checkGoodIsExists, checkEnameNotNull } from '../middleware/order.middleware';
import OrderController from '../controller/order.controller'
import { auth } from '../middleware/auth.middleware';

const router = express.Router();
const { entry, getAllInfo, modify, searchCount } = OrderController;

// 订单入库
router.post('/entry', auth, checkEntryArgs, entry)
// 查询所有订单
router.get("/getAllInfo", getAllInfo)
// 修改订单状态
router.post("/modifyGoodStatus", auth, checkModifyArgs, checkGoodIsExists, modify);
// 根据员工姓名查询业绩
router.get("/performance", checkEnameNotNull, searchCount)

export default router;