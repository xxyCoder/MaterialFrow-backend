import { NextFunction, Request, Response } from 'express'
import { ArgsHasInvalid, ArgsHasNull } from '../constant/result.constant'
import OrderService from '../service/order.service'
const { searchGoodById } = OrderService

const checkEntryArgs = async (req: Request, res: Response, next: NextFunction) => {
    const {
        sender,
        senderPhone,
        senderAddress,
        recipient,
        recipientPhone,
        recipientAddress,
        ename,
        count,
        weight,
        date,
        status,
        price,
        goodName
    } = req.body

    if (
        !sender ||
        !senderPhone ||
        !senderAddress ||
        !recipient ||
        !recipientPhone ||
        !recipientAddress ||
        !ename ||
        !count ||
        !weight ||
        !date ||
        !status ||
        !price ||
        !goodName
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
        return
    }
    next()
}

const checkAuthIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { authority } = req.query
    const auth = +authority!
    if (!auth) {
        res.send({
            code: 1405,
            message: '没有管理员权限'
        })
        return
    }
    next()
}

export { checkAuthIsAdmin, checkEntryArgs, checkGoodIsExists, checkModifyArgs }
