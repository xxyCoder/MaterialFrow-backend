import { Request, Response } from 'express'
import { serviceError, successRequest } from '../constant/result.constant'
import OrderService from '../service/order.service'

const { entryGood, searchAllGood, modifyGoodStatus, getOrderCountByName, getAllEmployeeName } =
    OrderService

class OrderController {
    async entry(req: Request, res: Response) {
        const {
            sender,
            senderPhone,
            senderAddress,
            companyName,
            recipient,
            recipientPhone,
            recipientAddress,
            goodName,
            ename,
            count,
            weight,
            date,
            status,
            price
        } = req.body

        try {
            await entryGood({
                sender,
                senderPhone,
                senderAddress,
                companyName,
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
            })
            res.send(successRequest)
        } catch (e: any) {
            console.error(e)
            res.send(serviceError)
        }
    }
    async getAllInfo(req: Request, res: Response) {
        try {
            const data = await searchAllGood()
            const result = successRequest
            result.result = data
            res.send(result)
        } catch (e: any) {
            console.error(e)
            res.send(serviceError)
        }
    }
    async modify(req: Request, res: Response) {
        try {
            const { id, status } = req.body
            await modifyGoodStatus({ id, status })
            res.send(successRequest)
        } catch (e: any) {
            console.error(e)
            res.send(serviceError)
        }
    }
    async searchAllCount(req: Request, res: Response) {
        try {
            const usernames = await getAllEmployeeName()
            console.log(usernames)
            let result = successRequest
            let map = {}
            Promise.all(
                usernames.map(
                    user =>
                        new Promise((resolve, reject) => {
                            getOrderCountByName(user.username).then((count: number) => {
                                map = {
                                    ...map,
                                    [user.username]: count
                                }
                                resolve(count)
                            })
                        })
                )
            )
                .then(() => {
                    result.result = map
                    res.send(result)
                })
                .catch(err => {
                    console.error(err)
                    res.send(serviceError)
                })
        } catch (e: any) {
            console.error(e)
            res.send(serviceError)
        }
    }
}

export default new OrderController()
