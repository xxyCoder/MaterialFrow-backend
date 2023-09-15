/*
 * @Author: 李羊
 * @Date: 2023-09-14 23:03:29
 * @FilePath: \MaterialFrow-backend\src\middleware\order.middleware.ts
 * @LastEditTime: 2023-09-15 16:06:23
 * @Description:
 */
import { NextFunction, Request, Response } from 'express'
import { ArgsHasInvalid, ArgsHasNull } from '../constant/result.constant'
import OrderService from '../service/order.service'
const { searchGoodById } = OrderService

const checkEntryArgs = async (req: Request, res: Response, next: NextFunction) => {
    const {
        customerName,
        customerPhone,
        customerAddress,
        firmName,
        dispatchAssociates,
        dispatchPhone,
        dispatchAddress,
        acceptPhone,
        acceptAddress,
        goodName,
        count,
        weight,
        date,
        status,
        price
    } = req.body

    if (
        !customerName ||
        !customerPhone ||
        !customerAddress ||
        !firmName ||
        !dispatchAssociates ||
        !dispatchPhone ||
        !dispatchAddress ||
        !acceptPhone ||
        !acceptAddress ||
        !goodName ||
        !count ||
        !weight ||
        !date ||
        !status ||
        !price
    ) {
        res.send(ArgsHasNull)
        return
    }
    if (weight <= 0 || price <= 0 || count <= 0) {
        res.send(ArgsHasInvalid)
        return
    }
    next()
}

const checkModifyArgs = async (req: Request, res: Response, next: NextFunction) => {
    const { id, status } = req.body
    if (!id || !status) {
        res.send(ArgsHasNull)
        return
    }
    if (status !== '已入库' && status !== '运输中' && status !== '已送达') {
        res.send(ArgsHasInvalid)
        return
    }
    next()
}

const checkGoodIsExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    const data = await searchGoodById(id)
    if (data === '') {
        res.send(ArgsHasInvalid)
        return;
    }
    next()
}

const checkEnameNotNull = async (req: Request, res: Response, next: NextFunction) => {
    const { ename } = req.query;
    if (!ename) {
        res.send(ArgsHasInvalid)
        return;
    }
    next();
}

export { checkEntryArgs, checkGoodIsExists, checkModifyArgs, checkEnameNotNull }
