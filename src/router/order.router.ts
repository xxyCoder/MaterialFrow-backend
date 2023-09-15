/*
 * @Author: 李羊
 * @Date: 2023-09-14 23:03:29
 * @FilePath: \MaterialFrow-backend\src\router\order.router.ts
 * @LastEditTime: 2023-09-15 20:56:00
 * @Description:
 */
import express from 'express'
import OrderController from '../controller/order.controller'
import { auth } from '../middleware/auth.middleware'
import {
    checkAuthIsAdmin,
    checkEntryArgs,
    checkGoodIsExists,
    checkModifyArgs
} from '../middleware/order.middleware'

const router = express.Router()
const { entry, getAllInfo, modify, searchAllCount } = OrderController

// 订单入库
router.post('/entry', auth, checkEntryArgs, entry)
// 查询所有订单
router.get('/getAllInfo', getAllInfo)
// 修改订单状态
router.post('/modifyGoodStatus', auth, checkModifyArgs, checkGoodIsExists, modify)
// 根据员工姓名查询业绩
router.get('/performance', auth, checkAuthIsAdmin, searchAllCount)

export default router
